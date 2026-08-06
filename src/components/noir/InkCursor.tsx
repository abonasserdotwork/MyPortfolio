import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

type Splash = { id: number; x: number; y: number };

export function InkCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.35 });
  const rx = useSpring(x, { stiffness: 110, damping: 22, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 110, damping: 22, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("a,button,[data-magnetic],[role='button'],input,textarea"));
    };
    const down = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setSplashes((s) => [...s, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setSplashes((s) => s.filter((p) => p.id !== id)), 900);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div
        className="absolute rounded-full bg-foreground"
        style={{ x: sx, y: sy, width: 7, height: 7, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hovering ? 0.4 : 1, opacity: hovering ? 0.7 : 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute rounded-full border border-primary/50"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 54 : 26,
          height: hovering ? 54 : 26,
          opacity: hovering ? 1 : 0.45,
          backgroundColor: hovering ? "oklch(0.755 0.077 82 / 8%)" : "transparent",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <AnimatePresence>
        {splashes.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-[radial-gradient(circle,oklch(0.755_0.077_82_/_45%),transparent_70%)]"
            style={{ left: s.x, top: s.y, translateX: "-50%", translateY: "-50%" }}
            initial={{ width: 6, height: 6, opacity: 0.9 }}
            animate={{ width: 120, height: 120, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}