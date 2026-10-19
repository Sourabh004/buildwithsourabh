import { lazy, Suspense, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";

/**
 * Mounts a 3D scene only once it's near the viewport, and tells it when it's
 * actually visible so the render loop can pause off-screen.
 */
export const SceneSlot = ({
  className,
  children,
}: {
  className?: string;
  children: (active: boolean) => ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "400px", once: true });
  const active = useInView(ref, { margin: "120px" });

  return (
    <div ref={ref} className={className}>
      {near && <Suspense fallback={null}>{children(active)}</Suspense>}
    </div>
  );
};

// three.js lives in its own chunk — pages import these lazy handles, never three directly
const scenes = () => import("./scenes");
export const HeroScene = lazy(() => scenes().then((m) => ({ default: m.HeroScene })));
export const StatementScene = lazy(() => scenes().then((m) => ({ default: m.StatementScene })));
export const ContactScene = lazy(() => scenes().then((m) => ({ default: m.ContactScene })));
export const TechScene = lazy(() => scenes().then((m) => ({ default: m.TechScene })));
export const GamingScene = lazy(() => scenes().then((m) => ({ default: m.GamingScene })));
export const NotFoundScene = lazy(() => scenes().then((m) => ({ default: m.NotFoundScene })));
export const GlobeScene = lazy(() => import("./globe").then((m) => ({ default: m.GlobeScene })));
