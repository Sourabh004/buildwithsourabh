/**
 * Event globe — dot-matrix land, a pin per event, flight arcs from home.
 * Drag to spin; selecting a city flies the globe round to it and zooms in.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
// Flat [lat, lon, ...] pairs, precomputed by scripts/gen-land-dots.mjs (too slow to do in the browser)
import landDotCoords from "@/data/land-dots.json";
import { C, Ink, SceneCanvas, toonRamp } from "./kit";
import { HOME, alsoVisited, stops, type Stop } from "@/data/events";

const R = 2;
const deg = THREE.MathUtils.degToRad;

/** lat/lon → point on the sphere (three-globe convention) */
const toVec = (lat: number, lon: number, r = R) => {
  const phi = deg(90 - lat);
  const theta = deg(lon + 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
};

/** Globe rotation that brings (lat, lon) to face the camera */
const faceRotation = (lat: number, lon: number): [number, number] => [deg(lat), deg(-lon - 90)];

// Land dots are computed once per page load and shared
let landDots: THREE.Vector3[] | null = null;
const getLandDots = () => {
  if (landDots) return landDots;
  const coords = landDotCoords as number[];
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < coords.length; i += 2) pts.push(toVec(coords[i], coords[i + 1], R * 1.002));
  landDots = pts;
  return pts;
};

const LandDots = () => {
  const ref = useRef<THREE.InstancedMesh>(null);
  const pts = useMemo(getLandDots, []);

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    pts.forEach((p, i) => mesh.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)));
    mesh.instanceMatrix.needsUpdate = true;
  }, [pts]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, pts.length]}>
      <icosahedronGeometry args={[0.016, 0]} />
      <meshBasicMaterial color={C.cream} transparent opacity={0.55} />
    </instancedMesh>
  );
};

/** Faint latitude rings + prime meridians */
const Graticule = () => {
  const lines = useMemo(() => {
    const out: THREE.Vector3[][] = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const ring: THREE.Vector3[] = [];
      for (let lon = -180; lon <= 180; lon += 6) ring.push(toVec(lat, lon, R * 1.001));
      out.push(ring);
    }
    for (let lon = -180; lon < 180; lon += 30) {
      const ring: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 6) ring.push(toVec(lat, lon, R * 1.001));
      out.push(ring);
    }
    return out;
  }, []);
  return (
    <>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={C.cream} lineWidth={1} transparent opacity={0.08} />
      ))}
    </>
  );
};

/** Flight arc from home to a stop, with a pulse travelling along it */
const Arc = ({ stop, offset }: { stop: Stop; offset: number }) => {
  const pulse = useRef<THREE.Mesh>(null);
  const { curve, points } = useMemo(() => {
    const a = toVec(HOME.lat, HOME.lon, R * 1.01);
    const b = toVec(stop.lat, stop.lon, R * 1.01);
    const lift = R + 0.15 + a.distanceTo(b) * 0.55;
    const mid = a.clone().add(b).normalize().multiplyScalar(lift);
    const c = new THREE.QuadraticBezierCurve3(a, mid, b);
    return { curve: c, points: c.getPoints(48) };
  }, [stop]);

  useFrame(({ clock }) => {
    if (pulse.current) pulse.current.position.copy(curve.getPoint((clock.getElapsedTime() * 0.35 + offset) % 1));
  });

  return (
    <>
      <Line points={points} color={stop.color} lineWidth={2} transparent opacity={0.8} />
      <mesh ref={pulse}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color={stop.color} />
      </mesh>
    </>
  );
};

/** A map pin standing out of the surface */
const Pin = ({
  stop,
  index,
  selected,
  onSelect,
  showCard,
  onHover,
}: {
  stop: Stop;
  index: number;
  selected: boolean;
  onSelect: (i: number) => void;
  /** only one card on the globe at a time */
  showCard: boolean;
  onHover: (i: number | null) => void;
}) => {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { position, quaternion } = useMemo(() => {
    const p = toVec(stop.lat, stop.lon);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());
    return { position: p, quaternion: q };
  }, [stop]);

  useFrame(({ clock }, dt) => {
    const s = selected ? 1.7 : hovered ? 1.35 : 1;
    if (group.current) easing.damp3(group.current.scale, [s, s, s], 0.15, dt);
    if (ring.current) {
      const t = (clock.getElapsedTime() * 0.8 + index * 0.13) % 1;
      ring.current.scale.setScalar(0.6 + t * (selected ? 2.4 : 1.4));
      (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * (selected ? 0.9 : 0.5);
    }
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta > 6) return; // was a drag, not a click
    onSelect(index);
  };

  return (
    <group position={position} quaternion={quaternion}>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[0.05, 0.065, 32]} />
        <meshBasicMaterial color={stop.color} transparent side={THREE.DoubleSide} />
      </mesh>
      <group
        ref={group}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(index);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "";
        }}
      >
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.16, 8]} />
          <meshToonMaterial color={C.cream} gradientMap={toonRamp} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.045, 20, 20]} />
          <Ink color={stop.color} outline={2} />
        </mesh>
        {/* Bigger invisible hit area so pins are easy to hover */}
        <mesh position={[0, 0.14, 0]} visible={false}>
          <sphereGeometry args={[0.11, 8, 8]} />
        </mesh>
        {showCard && (
          <Html position={[0, 0.25, 0]} zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
            {/* Small event card, sitting just above the pin head */}
            <div
              className="w-[220px] overflow-hidden rounded-xl border-2 font-grotesk"
              style={{
                transform: "translate(-50%, calc(-100% - 6px))",
                borderColor: C.ink,
                background: C.cream,
                color: C.ink,
                boxShadow: `4px 4px 0 ${C.ink}`,
              }}
            >
              <div
                className="flex items-center justify-between px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em]"
                style={{ background: stop.color }}
              >
                <span>{stop.pass}</span>
                <span>{stop.year}</span>
              </div>
              <div className="px-3 pb-2.5 pt-2">
                <p className="font-display text-lg uppercase leading-none">{stop.city}</p>
                <p className="mt-1 text-[11px] font-bold leading-tight">{stop.event}</p>
                <p className="mt-1 text-[10px] leading-snug opacity-70">{stop.note}</p>
                {!selected && (
                  <p className="mt-1.5 text-[9px] font-black uppercase tracking-widest opacity-50">Click to zoom in</p>
                )}
              </div>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

type DragState = { rx: number; ry: number; dragging: boolean; hovering: boolean; lastInput: number; zoom: number };

const ZOOM_MIN = 2.9;
const ZOOM_MAX = 9;
const ZOOM_OVERVIEW = 6.6;
const ZOOM_CITY = 4.4;
const clampZoom = (z: number) => THREE.MathUtils.clamp(z, ZOOM_MIN, ZOOM_MAX);

const Globe = ({
  selected,
  onSelect,
  drag,
}: {
  selected: number | null;
  onSelect: (i: number) => void;
  drag: React.MutableRefObject<DragState>;
}) => {
  const group = useRef<THREE.Group>(null);
  const { camera, clock } = useThree();
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  // Fly to the selected city (or back to the overview)
  useEffect(() => {
    const s = selected !== null ? stops[selected] : null;
    const [rx, ry] = s ? faceRotation(s.lat - 6, s.lon) : faceRotation(16, 70);
    drag.current.rx = rx;
    drag.current.ry = ry;
    drag.current.zoom = s ? Math.min(drag.current.zoom, ZOOM_CITY) : ZOOM_OVERVIEW;
    drag.current.lastInput = clock.getElapsedTime();
  }, [selected, drag, clock]);

  useFrame(({ clock: c }, dt) => {
    const g = group.current;
    if (!g) return;
    const d = drag.current;
    if (d.dragging || d.hovering) d.lastInput = c.getElapsedTime();
    // Gentle idle sway once the visitor has left it alone for a while
    const idle = !d.dragging && !d.hovering && selected === null && c.getElapsedTime() - d.lastInput > 4;
    const sway = idle ? Math.sin(c.getElapsedTime() * 0.25) * 0.12 : 0;
    easing.dampE(g.rotation, [d.rx, d.ry + sway, 0], d.dragging ? 0.08 : 0.45, dt);
    easing.damp3(camera.position, [0, 0, d.zoom], 0.35, dt);
  });

  // The ocean swallows pointer events so pins on the far side can't be hovered through the globe
  const block = (e: ThreeEvent<PointerEvent | MouseEvent>) => e.stopPropagation();

  return (
    <group ref={group}>
      <mesh onPointerOver={block} onPointerMove={block} onClick={block}>
        <sphereGeometry args={[R, 64, 64]} />
        <meshToonMaterial color="#2A3423" gradientMap={toonRamp} />
      </mesh>
      {/* Thick cream rim — the sticker outline */}
      <mesh scale={1.012}>
        <sphereGeometry args={[R, 48, 48]} />
        <meshBasicMaterial color={C.cream} side={THREE.BackSide} />
      </mesh>
      <Graticule />
      <LandDots />
      {stops.map((s, i) => s.city !== HOME.city && <Arc key={s.city} stop={s} offset={i * 0.17} />)}
      {alsoVisited.map((c) => (
        <mesh key={c.city} position={toVec(c.lat, c.lon, R * 1.004)}>
          <sphereGeometry args={[0.022, 10, 10]} />
          <meshBasicMaterial color={C.cream} />
        </mesh>
      ))}
      {stops.map((s, i) => (
        <Pin
          key={s.city}
          stop={s}
          index={i}
          selected={selected === i}
          onSelect={onSelect}
          onHover={setHoveredPin}
          showCard={hoveredPin === i || (hoveredPin === null && selected === i)}
        />
      ))}
    </group>
  );
};

export const GlobeScene = ({
  active,
  selected,
  onSelect,
}: {
  active: boolean;
  selected: number | null;
  onSelect: (i: number) => void;
}) => {
  const drag = useRef<DragState>({ rx: 0, ry: 0, dragging: false, hovering: false, lastInput: 0, zoom: ZOOM_OVERVIEW });
  const wrap = useRef<HTMLDivElement>(null);
  // Active pointers — one drags, two pinch-zoom
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<number | null>(null);

  // Wheel zoom only once the visitor has clicked into the globe (or holds Ctrl/⌘),
  // so scrolling the page past it never gets hijacked. Native listener so it can preventDefault.
  const armed = useRef(false);
  const [zoomHint, setZoomHint] = useState(false);
  const hintTimer = useRef<number>();
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!armed.current && !e.ctrlKey && !e.metaKey) {
        setZoomHint(true);
        window.clearTimeout(hintTimer.current);
        hintTimer.current = window.setTimeout(() => setZoomHint(false), 1400);
        return;
      }
      e.preventDefault();
      e.stopPropagation(); // keep Lenis from also scrolling the page
      drag.current.zoom = clampZoom(drag.current.zoom + e.deltaY * 0.0035);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const spread = () => {
    const [a, b] = [...pointers.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    armed.current = true;
    setZoomHint(false);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    drag.current.dragging = true;
    if (pointers.current.size === 2) pinch.current = spread();
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current.hovering = true;
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const now = spread();
      drag.current.zoom = clampZoom(drag.current.zoom * (pinch.current / now));
      pinch.current = now;
      return;
    }
    // Spin slower when zoomed in so the map doesn't fly past
    const k = drag.current.zoom / ZOOM_OVERVIEW;
    drag.current.ry += (e.clientX - prev.x) * 0.006 * k;
    drag.current.rx = THREE.MathUtils.clamp(drag.current.rx + (e.clientY - prev.y) * 0.004 * k, -1.1, 1.1);
  };
  const onUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) drag.current.dragging = false;
  };

  const zoomBy = (f: number) => (drag.current.zoom = clampZoom(drag.current.zoom * f));
  const stop = (e: React.PointerEvent) => e.stopPropagation();

  return (
    <div
      ref={wrap}
      className="relative h-full w-full cursor-grab active:cursor-grabbing"
      style={{ touchAction: "pan-y" }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={(e) => {
        onUp(e);
        drag.current.hovering = false;
        armed.current = false;
        setZoomHint(false);
      }}
    >
      {zoomHint && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FAF0D7] bg-[#1F271B]/90 px-4 py-2 font-grotesk text-[11px] font-bold uppercase tracking-widest text-[#FAF0D7]">
          Click the globe, then scroll to zoom
        </div>
      )}
      <SceneCanvas active={active} line={C.cream} camera={[0, 0, ZOOM_OVERVIEW]} fov={40}>
        <Globe selected={selected} onSelect={onSelect} drag={drag} />
      </SceneCanvas>

      {/* Zoom buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-xl border-2" style={{ borderColor: C.cream, boxShadow: `3px 3px 0 ${C.volt}` }}>
        {[
          { label: "+", aria: "Zoom in", f: 0.8 },
          { label: "−", aria: "Zoom out", f: 1.25 },
        ].map((b, i) => (
          <button
            key={b.label}
            aria-label={b.aria}
            onPointerDown={stop}
            onClick={() => zoomBy(b.f)}
            className={`cursor-hover flex h-9 w-9 items-center justify-center bg-[#1F271B] font-display text-lg leading-none text-[#FAF0D7] transition-colors hover:bg-[#C6F24E] hover:text-[#1F271B] ${
              i === 0 ? "border-b-2 border-[#FAF0D7]" : ""
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
};
