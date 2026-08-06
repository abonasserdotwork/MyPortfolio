import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function InkLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setDone(true), 2600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[oklch(0.02_0_0)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full blur-2xl"
              style={{
                background:
                  i === 1
                    ? "radial-gradient(circle, oklch(0.28 0.03 82 / 55%), transparent 68%)"
                    : "radial-gradient(circle, oklch(0.22 0 0), transparent 66%)",
              }}
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: [0, 900 + i * 300], height: [0, 900 + i * 300], opacity: [0, 0.9, 0.55] }}
              transition={{ duration: 2.6, delay: i * 0.35, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          <motion.div
            className="relative flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.94, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/30">
              <span className="font-display text-4xl font-light tracking-[0.15em] text-primary">MA</span>
            </div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 1.8 }}
            >
              Mohamed Abdelnasser
            </motion.span>
            <motion.div
              className="h-px bg-primary/50"
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 1.6, delay: 1.6, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}