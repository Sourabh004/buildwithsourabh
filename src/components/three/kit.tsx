/**
 * Shared neo-brutalist 3D kit — toon fills, ink outlines, floating "toys".
 * Every scene on the site is assembled from these pieces so they read as one system.
 */
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float, Outlines, RoundedBox } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";

export const C = {
  ink: "#1F271B",
  cream: "#FAF0D7",
  orange: "#F77F1A",
  teal: "#019EA5",
  volt: "#C6F24E",
  purple: "#9B5DE5",
  yellow: "#FCAD50",
  pink: "#FF7A9C",
  gold: "#F5C518",
} as const;

/** 3-step ramp so toon shading reads as flat sticker bands, not a gradient */
export const toonRamp = (() => {
  const tex = new THREE.DataTexture(new Uint8Array([110, 190, 255]), 3, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
})();

type SceneOpts = { still: boolean; line: string };
const SceneContext = createContext<SceneOpts>({ still: false, line: C.ink });
export const useSceneOpts = () => useContext(SceneContext);

/** Flat toon fill + outline. Thickness is in px; outline colour comes from the scene (ink on cream, cream on dark). */
export const Ink = ({ color, outline = 3.5 }: { color: string; outline?: number }) => {
  const { line } = useSceneOpts();
  return (
    <>
      <meshToonMaterial color={color} gradientMap={toonRamp} />
      {outline > 0 && <Outlines thickness={outline} color={line} />}
    </>
  );
};

/** Pointer in NDC, tracked on window so scenes react even when the copy sits on top */
export const pointer = { x: 0, y: 0 };
let pointerListeners = 0;
const onPointerMove = (e: PointerEvent) => {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
};
const usePointerTracking = () => {
  useEffect(() => {
    if (pointerListeners++ === 0) window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      if (--pointerListeners === 0) window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);
};

/** Wraps an object: pops in, floats, grows on hover, spins when clicked */
export const Toy = ({
  children,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  speed = 1.4,
}: {
  children: ReactNode;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  speed?: number;
}) => {
  const { still } = useSceneOpts();
  const ref = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const [hovered, setHovered] = useState(false);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += spin.current * dt;
    spin.current *= Math.pow(0.05, dt);
    const s = scale * (hovered ? 1.14 : 1);
    easing.damp3(g.scale, [s, s, s], 0.18, dt);
  });

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    spin.current += 16;
  };

  return (
    <Float speed={still ? 0 : speed} rotationIntensity={still ? 0 : 0.6} floatIntensity={still ? 0 : 0.9}>
      <group
        ref={ref}
        position={position}
        rotation={rotation}
        scale={0}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {children}
      </group>
    </Float>
  );
};

/** Turns the whole cluster toward the pointer; optional scroll-driven spin */
export const Rig = ({
  children,
  offset = [0, 0, 0],
  scrollSpin = 0,
  strength = 1,
}: {
  children: ReactNode;
  offset?: [number, number, number];
  /** radians of Y rotation per viewport of page scroll */
  scrollSpin?: number;
  strength?: number;
}) => {
  const { still } = useSceneOpts();
  const ref = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const px = still ? 0 : pointer.x * strength;
    const py = still ? 0 : pointer.y * strength;
    const scroll = scrollSpin ? Math.min(window.scrollY / window.innerHeight, 1.5) : 0;
    easing.dampE(g.rotation, [-py * 0.22 + scroll * scrollSpin * 0.3, px * 0.4 + scroll * scrollSpin, 0], 0.3, dt);
    easing.damp3(g.position, [offset[0], offset[1] + scroll * scrollSpin, offset[2]], 0.3, dt);
  });

  return <group ref={ref}>{children}</group>;
};

/** Canvas with the site's defaults. `active` pauses rendering when off-screen. */
export const SceneCanvas = ({
  active,
  children,
  line = C.ink,
  camera = [0, 0, 11],
  fov = 40,
}: {
  active: boolean;
  children: ReactNode;
  line?: string;
  camera?: [number, number, number];
  fov?: number;
}) => {
  usePointerTracking();
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setStill(mq.matches);
    const on = () => setStill(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  const opts = useMemo(() => ({ still, line }), [still, line]);

  return (
    <Canvas
      aria-hidden
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: camera, fov }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <SceneContext.Provider value={opts}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 5]} intensity={2.4} />
        <directionalLight position={[-5, -2, 3]} intensity={0.5} color={C.yellow} />
        {children}
      </SceneContext.Provider>
    </Canvas>
  );
};

/* ─────────────────────────── Models ─────────────────────────── */

/** Chunky game controller */
export const Gamepad = ({ color = C.purple }: { color?: string }) => (
  <group>
    <RoundedBox args={[2, 0.85, 0.45]} radius={0.22} smoothness={4}>
      <Ink color={color} />
    </RoundedBox>
    {[-0.78, 0.78].map((x) => (
      <RoundedBox key={x} args={[0.62, 0.95, 0.42]} radius={0.2} position={[x, -0.42, 0]} rotation={[0, 0, x > 0 ? -0.35 : 0.35]}>
        <Ink color={color} />
      </RoundedBox>
    ))}
    <mesh position={[-0.55, 0.05, 0.25]}>
      <boxGeometry args={[0.42, 0.13, 0.08]} />
      <Ink color={C.cream} outline={2.5} />
    </mesh>
    <mesh position={[-0.55, 0.05, 0.25]}>
      <boxGeometry args={[0.13, 0.42, 0.08]} />
      <Ink color={C.cream} outline={2.5} />
    </mesh>
    {(
      [
        [0.55, 0.2, C.volt],
        [0.72, 0.04, C.orange],
        [0.38, 0.04, C.teal],
        [0.55, -0.12, C.pink],
      ] as const
    ).map(([x, y, c]) => (
      <mesh key={c} position={[x, y, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.08, 20]} />
        <Ink color={c} outline={2} />
      </mesh>
    ))}
  </group>
);

/** CPU chip */
export const Chip = ({ color = C.teal }: { color?: string }) => {
  const pins = useMemo(() => {
    const out: [number, number, number, number][] = [];
    for (let i = 0; i < 5; i++) {
      const t = -0.5 + i * 0.25;
      out.push([t, 0, 0.72, 0], [t, 0, -0.72, 0], [0.72, 0, t, Math.PI / 2], [-0.72, 0, t, Math.PI / 2]);
    }
    return out;
  }, []);

  return (
    <group>
      <RoundedBox args={[1.3, 0.2, 1.3]} radius={0.06}>
        <Ink color={color} />
      </RoundedBox>
      <RoundedBox args={[0.7, 0.08, 0.7]} radius={0.03} position={[0, 0.13, 0]}>
        <Ink color={C.cream} outline={2.5} />
      </RoundedBox>
      {pins.map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[0, r, 0]}>
          <boxGeometry args={[0.09, 0.06, 0.22]} />
          <meshToonMaterial color={C.ink} gradientMap={toonRamp} />
        </mesh>
      ))}
    </group>
  );
};

/** Trophy cup */
export const Trophy = ({ color = C.gold }: { color?: string }) => (
  <group>
    <mesh position={[0, 0.55, 0]}>
      <cylinderGeometry args={[0.62, 0.32, 0.9, 32]} />
      <Ink color={color} />
    </mesh>
    {[-1, 1].map((s) => (
      <mesh key={s} position={[s * 0.62, 0.62, 0]} rotation={[0, 0, s * 0.2]}>
        <torusGeometry args={[0.22, 0.07, 12, 24, Math.PI * 1.2]} />
        <Ink color={color} outline={2.5} />
      </mesh>
    ))}
    <mesh position={[0, -0.05, 0]}>
      <cylinderGeometry args={[0.1, 0.14, 0.4, 16]} />
      <Ink color={color} outline={2.5} />
    </mesh>
    <RoundedBox args={[0.8, 0.28, 0.55]} radius={0.06} position={[0, -0.38, 0]}>
      <Ink color={C.ink} outline={2.5} />
    </RoundedBox>
    <mesh position={[0, -0.38, 0.28]}>
      <boxGeometry args={[0.4, 0.1, 0.02]} />
      <meshToonMaterial color={C.cream} gradientMap={toonRamp} />
    </mesh>
  </group>
);

/** Stacked database cylinders */
export const Database = ({ color = C.purple }: { color?: string }) => (
  <group>
    {[0.5, 0, -0.5].map((y) => (
      <mesh key={y} position={[0, y, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.38, 32]} />
        <Ink color={color} />
      </mesh>
    ))}
    {[0.5, 0, -0.5].map((y) => (
      <mesh key={`d${y}`} position={[0.3, y, 0.47]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshToonMaterial color={C.volt} gradientMap={toonRamp} />
      </mesh>
    ))}
  </group>
);

/** Coin */
export const Coin = ({ color = C.gold }: { color?: string }) => (
  <group rotation={[Math.PI / 2, 0, 0]}>
    <mesh>
      <cylinderGeometry args={[0.38, 0.38, 0.1, 32]} />
      <Ink color={color} outline={2.5} />
    </mesh>
    <mesh position={[0, 0.06, 0]}>
      <cylinderGeometry args={[0.24, 0.24, 0.02, 32]} />
      <meshToonMaterial color={C.orange} gradientMap={toonRamp} />
    </mesh>
  </group>
);

/** Bar chart whose bars grow with `progress.current` (0..1) */
export const BarChart = ({
  progress,
  heights = [0.6, 1.1, 0.9, 1.6, 2.2],
  colors = [C.teal, C.purple, C.yellow, C.pink, C.orange],
}: {
  progress: { current: number };
  heights?: number[];
  colors?: string[];
}) => {
  const bars = useRef<(THREE.Group | null)[]>([]);

  useFrame((_, dt) => {
    bars.current.forEach((b, i) => {
      if (!b) return;
      // Bars rise one after another
      const local = THREE.MathUtils.clamp(progress.current * 1.6 - i * 0.12, 0.05, 1);
      easing.damp(b.scale, "y", local, 0.2, dt);
    });
  });

  return (
    <group>
      <RoundedBox args={[heights.length * 0.7 + 0.4, 0.14, 1]} radius={0.05} position={[0, -0.07, 0]}>
        <Ink color={C.cream} />
      </RoundedBox>
      {heights.map((h, i) => (
        <group key={i} ref={(el) => (bars.current[i] = el)} position={[(i - (heights.length - 1) / 2) * 0.7, 0, 0]} scale={[1, 0.05, 1]}>
          <RoundedBox args={[0.5, h, 0.5]} radius={0.06} position={[0, h / 2, 0]}>
            <Ink color={colors[i % colors.length]} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
};

/** n8n-style workflow: nodes joined by chunky tubes with pulses travelling along */
export const NodeGraph = () => {
  const nodes = useMemo(
    () =>
      [
        { p: new THREE.Vector3(-2.4, 0.4, 0), c: C.orange },
        { p: new THREE.Vector3(-0.9, 1.3, 0.3), c: C.teal },
        { p: new THREE.Vector3(-0.9, -0.7, -0.3), c: C.purple },
        { p: new THREE.Vector3(0.7, 0.3, 0.2), c: C.volt },
        { p: new THREE.Vector3(2.2, 1.2, -0.2), c: C.pink },
        { p: new THREE.Vector3(2.2, -0.8, 0.3), c: C.yellow },
      ] as const,
    [],
  );
  const curves = useMemo(() => {
    const links: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
      [3, 5],
    ];
    return links.map(([a, b]) => {
      const pa = nodes[a].p;
      const pb = nodes[b].p;
      const mid = pa.clone().lerp(pb, 0.5);
      return new THREE.CubicBezierCurve3(
        pa,
        new THREE.Vector3(mid.x, pa.y, pa.z),
        new THREE.Vector3(mid.x, pb.y, pb.z),
        pb,
      );
    });
  }, [nodes]);
  const pulses = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    pulses.current.forEach((m, i) => {
      if (!m) return;
      const u = (t * 0.45 + i * 0.37) % 1;
      m.position.copy(curves[i].getPoint(u));
    });
  });

  return (
    <group>
      {curves.map((curve, i) => (
        <mesh key={`t${i}`}>
          <tubeGeometry args={[curve, 40, 0.045, 8, false]} />
          <meshToonMaterial color={C.ink} gradientMap={toonRamp} />
        </mesh>
      ))}
      {curves.map((_, i) => (
        <mesh key={`p${i}`} ref={(el) => (pulses.current[i] = el)}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <Ink color={C.volt} outline={2} />
        </mesh>
      ))}
      {nodes.map((n, i) => (
        <group key={i} position={n.p}>
          <RoundedBox args={[0.8, 0.8, 0.5]} radius={0.16}>
            <Ink color={n.c} />
          </RoundedBox>
          <RoundedBox args={[0.34, 0.34, 0.1]} radius={0.05} position={[0, 0, 0.27]}>
            <Ink color={C.cream} outline={2} />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
};

/** Small sphere used as a "data point" sprinkle */
export const Dot = ({ color = C.cream, r = 0.2 }: { color?: string; r?: number }) => (
  <mesh>
    <sphereGeometry args={[r, 24, 24]} />
    <Ink color={color} outline={2.5} />
  </mesh>
);
