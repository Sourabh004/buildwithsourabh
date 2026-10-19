import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Center, ContactShadows, RoundedBox, Text3D } from "@react-three/drei";
import fontUrl from "three/examples/fonts/helvetiker_bold.typeface.json?url";
import { BarChart, C, Chip, Coin, Database, Dot, Gamepad, Ink, NodeGraph, Rig, SceneCanvas, Toy, Trophy } from "./kit";

type SceneProps = { active: boolean };

const Shadow = ({ y = -3.3, opacity = 0.35 }: { y?: number; opacity?: number }) => (
  <ContactShadows position={[0, y, 0]} opacity={opacity} scale={12} blur={2.4} far={6} color={C.ink} />
);

const Word = ({ text, color, size = 2.4, outline = 5 }: { text: string; color: string; size?: number; outline?: number }) => (
  <Center>
    <Text3D font={fontUrl} size={size} height={size * 0.3} bevelEnabled bevelSize={0.06} bevelThickness={0.08} bevelSegments={4} curveSegments={10}>
      {text}
      <Ink color={color} outline={outline} />
    </Text3D>
  </Center>
);

const sprinkle = (points: [number, number, number][], color: string = C.cream) =>
  points.map((p, i) => (
    <Toy key={i} position={p} scale={0.6} speed={2.4}>
      <Dot color={color} />
    </Toy>
  ));

/* ── Home hero: the S, the gamepad, the chip ── */
export const HeroScene = ({ active }: SceneProps) => {
  // Below lg the scene sits under the copy, so it's only reached after scrolling — keep it mostly upright
  const spin = typeof window !== "undefined" && window.innerWidth < 1024 ? 0.2 : 1.1;

  return (
    <SceneCanvas active={active}>
      <Rig offset={[0.45, 0, 0]} scrollSpin={spin}>
        <Toy position={[0.35, 0.45, 0]} rotation={[0.1, -0.35, 0.05]} speed={1.1}>
          <Word text="S" color={C.orange} />
        </Toy>
        <Toy position={[-0.7, -2.25, 0.7]} rotation={[0.35, 0.4, -0.2]} scale={0.72}>
          <Gamepad />
        </Toy>
        <Toy position={[1.75, -1.55, -0.4]} rotation={[0.7, 0.4, 0.15]} scale={0.95} speed={1.7}>
          <Chip />
        </Toy>
        <Toy position={[1.85, 2.05, -0.8]} rotation={[0.6, 0.3, 0]} speed={2}>
          <mesh>
            <torusGeometry args={[0.48, 0.2, 24, 56]} />
            <Ink color={C.volt} />
          </mesh>
        </Toy>
        <Toy position={[-1.85, 1.95, -1]} speed={1.6}>
          <mesh>
            <icosahedronGeometry args={[0.55, 0]} />
            <Ink color={C.pink} />
          </mesh>
        </Toy>
        <Toy position={[2.25, 0.25, 0.9]} rotation={[0, 0, 0.6]} scale={0.8} speed={2.2}>
          <mesh>
            <capsuleGeometry args={[0.22, 0.6, 8, 20]} />
            <Ink color={C.yellow} />
          </mesh>
        </Toy>
        <Toy position={[-2.2, -0.1, -0.5]} rotation={[0.5, 0.6, 0]} speed={1.3}>
          <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.12}>
            <Ink color={C.teal} />
          </RoundedBox>
        </Toy>
        {sprinkle([
          [-0.6, 2.6, -1.4],
          [0.9, -2.7, 0.2],
          [-2.6, -2.4, -1.2],
          [2.7, -0.9, -1.6],
        ])}
      </Rig>
      <Shadow />
    </SceneCanvas>
  );
};

/* ── Statement: bars rise as you scroll through "messy data → decisions" ── */
const ScrollProgress = ({ target, progress }: { target: RefObject<HTMLElement>; progress: { current: number } }) => {
  useFrame(() => {
    const el = target.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    progress.current = Math.min(Math.max((vh - r.top) / (vh + r.height * 0.4), 0), 1);
  });
  return null;
};

export const StatementScene = ({ active, target }: SceneProps & { target: RefObject<HTMLElement> }) => {
  const progress = useRef(0);

  return (
    <SceneCanvas active={active} camera={[0, 1.2, 10]}>
      <ScrollProgress target={target} progress={progress} />
      <Rig strength={0.6}>
        <group position={[0, -1.9, 0]} rotation={[0.25, -0.5, 0]} scale={1.45}>
          <BarChart progress={progress} />
        </group>
        {/* Messy data floating above, waiting to be sorted */}
        <Toy position={[-2, 2.2, -0.5]} rotation={[0.6, 0.4, 0.2]} scale={0.5} speed={2.4}>
          <RoundedBox args={[0.7, 0.7, 0.7]} radius={0.1}>
            <Ink color={C.purple} />
          </RoundedBox>
        </Toy>
        <Toy position={[1.9, 2.5, -1]} scale={0.6} speed={2}>
          <mesh>
            <icosahedronGeometry args={[0.5, 0]} />
            <Ink color={C.pink} />
          </mesh>
        </Toy>
        <Toy position={[0.2, 2.9, 0.4]} rotation={[0.4, 0, 0.6]} scale={0.55} speed={1.8}>
          <mesh>
            <torusGeometry args={[0.45, 0.18, 20, 40]} />
            <Ink color={C.volt} />
          </mesh>
        </Toy>
        {sprinkle(
          [
            [-2.6, 0.6, 0.4],
            [2.7, 0.9, 0.2],
            [-1.1, 3.4, -1],
          ],
          C.yellow,
        )}
      </Rig>
      <Shadow y={-1.6} opacity={0.3} />
    </SceneCanvas>
  );
};

/* ── Contact (dark band): a big HI! ── */
export const ContactScene = ({ active }: SceneProps) => (
  <SceneCanvas active={active} line={C.cream}>
    <Rig strength={0.8}>
      <Toy position={[0, 0.2, 0]} rotation={[0.1, -0.3, -0.06]} speed={1.2}>
        <Word text="HI!" color={C.orange} size={2} outline={4} />
      </Toy>
      <Toy position={[-2.4, -1.6, 0.4]} rotation={[0.4, 0.5, -0.3]} scale={0.6}>
        <Gamepad color={C.teal} />
      </Toy>
      <Toy position={[2.5, 1.7, -0.6]} rotation={[0.5, 0.2, 0]} speed={2}>
        <mesh>
          <torusGeometry args={[0.42, 0.17, 24, 48]} />
          <Ink color={C.volt} />
        </mesh>
      </Toy>
      <Toy position={[2.3, -1.7, 0.2]} scale={0.8} speed={2.2}>
        <Coin />
      </Toy>
      <Toy position={[-2.3, 1.9, -0.8]} speed={1.6}>
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <Ink color={C.pink} />
        </mesh>
      </Toy>
    </Rig>
  </SceneCanvas>
);

/* ── Tech page: a live n8n-style workflow with data hardware around it ── */
export const TechScene = ({ active }: SceneProps) => (
  <SceneCanvas active={active} camera={[0, 0, 12]}>
    <Rig scrollSpin={0.6}>
      <Toy position={[0, 0.2, 0]} rotation={[0.2, -0.3, 0]} speed={0.9} scale={0.9}>
        <NodeGraph />
      </Toy>
      <Toy position={[-2, -2.4, 0.6]} rotation={[0.8, 0.3, 0.1]} scale={0.8} speed={1.6}>
        <Chip />
      </Toy>
      <Toy position={[2.1, -2.2, -0.3]} rotation={[0.2, 0.4, 0]} scale={0.75} speed={1.4}>
        <Database />
      </Toy>
      <Toy position={[-2.3, 2.4, -0.8]} rotation={[0.6, 0.3, 0]} speed={2}>
        <mesh>
          <torusGeometry args={[0.4, 0.16, 20, 40]} />
          <Ink color={C.yellow} />
        </mesh>
      </Toy>
      {sprinkle([
        [2.6, 2.4, -1.2],
        [0.3, -3, 0.4],
        [-3, 0.2, -1.4],
      ])}
    </Rig>
    <Shadow y={-3.6} />
  </SceneCanvas>
);

/* ── Gaming page (dark): controller, trophy, coins ── */
export const GamingScene = ({ active }: SceneProps) => (
  <SceneCanvas active={active} line={C.cream}>
    <Rig offset={[0.3, 0, 0]} scrollSpin={0.8}>
      <Toy position={[0, 0.1, 0.4]} rotation={[0.3, -0.4, 0.15]} scale={1.35} speed={1.1}>
        <Gamepad />
      </Toy>
      <Toy position={[1.9, 1.9, -0.6]} rotation={[0.1, -0.3, 0.1]} scale={1.1} speed={1.5}>
        <Trophy />
      </Toy>
      <Toy position={[-2, 2, -0.8]} scale={0.9} speed={2.2}>
        <Coin />
      </Toy>
      <Toy position={[-1.6, -2.2, 0.2]} scale={0.8} speed={2.6}>
        <Coin color={C.volt} />
      </Toy>
      <Toy position={[2.2, -1.8, 0.6]} speed={1.7}>
        <mesh>
          <icosahedronGeometry args={[0.5, 0]} />
          <Ink color={C.pink} />
        </mesh>
      </Toy>
      <Toy position={[-2.6, 0, -1]} rotation={[0.5, 0.5, 0]} speed={1.3}>
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.1}>
          <Ink color={C.orange} />
        </RoundedBox>
      </Toy>
      {sprinkle(
        [
          [0.6, 2.8, -1.4],
          [0.4, -2.9, -0.6],
          [2.8, 0.3, -1.5],
        ],
        C.volt,
      )}
    </Rig>
  </SceneCanvas>
);

/* ── 404 ── */
export const NotFoundScene = ({ active }: SceneProps) => (
  <SceneCanvas active={active} camera={[0, 0, 12]}>
    <Rig strength={1.2}>
      <Toy position={[0, 0.3, 0]} rotation={[0.1, -0.25, 0]} speed={1.2}>
        <Word text="404" color={C.orange} size={2.2} />
      </Toy>
      <Toy position={[-3.2, -2, 0.4]} rotation={[0.4, 0.5, -0.3]} scale={0.6}>
        <Gamepad />
      </Toy>
      <Toy position={[3.1, 2, -0.6]} speed={2}>
        <mesh>
          <torusGeometry args={[0.42, 0.17, 24, 48]} />
          <Ink color={C.volt} />
        </mesh>
      </Toy>
      <Toy position={[3, -1.9, 0.2]} scale={0.8} speed={1.6}>
        <Chip />
      </Toy>
    </Rig>
    <Shadow y={-3} />
  </SceneCanvas>
);
