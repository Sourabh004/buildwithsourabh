import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

declare global {
  interface Window {
    __lenis?: Lenis | null;
  }
}

export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Lenis owns the scroll position, so anchor links must go through it
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") {
        e.preventDefault();
        lenis.scrollTo(0);
        return;
      }
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
};
