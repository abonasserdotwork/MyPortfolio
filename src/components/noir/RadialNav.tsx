import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, User, Layers, Cpu, FolderOpen, Mail, Compass } from "lucide-react";

export const NAV_ITEMS = [
  { id: "home", label: "Home", Icon: Home },
  { id: "about", label: "About", Icon: User },
  { id: "services", label: "Services", Icon: Layers },
  { id: "skills", label: "Skills", Icon: Cpu },
  { id: "projects", label: "Projects", Icon: FolderOpen },
  { id: "contact", label: "Contact", Icon: Mail },
] as const;

const WHEEL = 340;
const RADIUS = 118;

export function RadialNav() {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState("home");
  const [splash, setSplash] = useState<{ id: number; x: number; y: number } | null>(null);

  const open = useCallback((x: number, y: number) => {
    const half = WHEEL / 2 + 16;
    setOrigin({
      x: Math.min(Math.max(x, half), window.innerWidth - half),
      y: Math.min(Math.max(y, half), window.innerHeight - half),
    });
    setHovered(null);
  }, []);

  useEffect(() => {
    const onContext = (e: MouseEvent) => {
      e.preventDefault();
      open(e.clientX, e.clientY);
    };
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "Escape") setOrigin(null);
      if (e.code === "Space" && tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "BUTTON") {
        e.preventDefault();
        setOrigin((o) => (o ? null : { x: window.innerWidth / 2, y: window.innerHeight / 2 }));
      }
    };
    window.addEventListener("contextmenu", onContext);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const select = (id: string) => {
    if (origin) {
      const at = { id: Date.now(), x: origin.x, y: origin.y };
      setSplash(at);
      window.setTimeout(() => setSplash(null), 1400);
    }
    setOrigin(null);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 260);
  };

  const pointerAngle =
    hovered !== null ? (360 / NAV_ITEMS.length) * hovered : (360 / NAV_ITEMS.length) * NAV_ITEMS.findIndex((i) => i.id === active);

  return (
    <>
      {/* Mobile / fallback trigger */}
      <button
        onClick={(e) => open(e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2)}
        aria-label="Open navigation wheel"
        className="fixed bottom-7 right-7 z-[150] flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-[oklch(0.11_0_0)]/90 text-primary shadow-[0_18px_50px_-20px_oklch(0_0_0)] backdrop-blur transition-colors duration-500 hover:border-primary/70 md:h-12 md:w-12"
      >
        <Compass size={20} strokeWidth={1.4} />
      </button>

      <noscript>
        <div className="fixed bottom-7 right-24 z-[150] rounded-full border border-border bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Menu
        </div>
      </noscript>

      {/* Ink splash page transition */}
      <AnimatePresence>
        {splash && (
          <motion.div
            key={splash.id}
            aria-hidden
            className="pointer-events-none fixed z-[160] rounded-full blur-2xl"
            style={{
              left: splash.x,
              top: splash.y,
              translateX: "-50%",
              translateY: "-50%",
              background: "radial-gradient(circle, oklch(0.03 0 0) 40%, oklch(0.2 0.02 82 / 40%) 70%, transparent 76%)",
            }}
            initial={{ width: 0, height: 0, opacity: 0.95 }}
            animate={{ width: 3200, height: 3200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {origin && (
          <motion.div
            className="fixed inset-0 z-[170]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() => setOrigin(null)}
          >
            <div className="absolute inset-0 bg-[oklch(0.02_0_0)]/70 backdrop-blur-[6px]" />

            <motion.div
              className="absolute"
              style={{ left: origin.x, top: origin.y, translateX: "-50%", translateY: "-50%" }}
              initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.6, opacity: 0, rotate: 8 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative"
                style={{ width: WHEEL, height: WHEEL }}
                onMouseLeave={() => setHovered(null)}
              >
                {/* rings */}
                <div className="absolute inset-0 rounded-full border border-primary/15 bg-[radial-gradient(circle,oklch(0.11_0_0)_45%,oklch(0.05_0_0)_100%)] shadow-[0_40px_120px_-40px_oklch(0_0_0)]" />
                <div className="absolute inset-8 rounded-full border border-border" />
                <div className="absolute inset-[42%] rounded-full border border-primary/30 bg-[oklch(0.09_0_0)]" />

                {/* rotating pointer */}
                <motion.div
                  className="absolute left-1/2 top-1/2 origin-top"
                  style={{ width: 1, height: RADIUS - 10, translateX: "-50%" }}
                  animate={{ rotate: pointerAngle + 180 }}
                  transition={{ type: "spring", stiffness: 90, damping: 16 }}
                >
                  <div className="h-full w-px bg-gradient-to-b from-transparent to-primary/70" />
                </motion.div>

                {/* items */}
                {NAV_ITEMS.map(({ id, label, Icon }, i) => {
                  const angle = (360 / NAV_ITEMS.length) * i - 90;
                  const rad = (angle * Math.PI) / 180;
                  const isActive = active === id;
                  const isHover = hovered === i;
                  return (
                    <button
                      key={id}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onClick={() => select(id)}
                      className="absolute flex h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full outline-none"
                      style={{
                        left: WHEEL / 2 + Math.cos(rad) * RADIUS,
                        top: WHEEL / 2 + Math.sin(rad) * RADIUS,
                      }}
                    >
                      <motion.span
                        className="flex h-11 w-11 items-center justify-center rounded-full border"
                        animate={{
                          scale: isHover ? 1.16 : 1,
                          borderColor:
                            isHover || isActive ? "oklch(0.755 0.077 82 / 70%)" : "oklch(1 0 0 / 10%)",
                          backgroundColor: isHover
                            ? "oklch(0.755 0.077 82 / 12%)"
                            : "oklch(0.14 0 0 / 90%)",
                          boxShadow: isHover
                            ? "0 0 30px -6px oklch(0.755 0.077 82 / 55%)"
                            : "0 0 0 0 transparent",
                        }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Icon
                          size={17}
                          strokeWidth={1.3}
                          className={isHover || isActive ? "text-primary" : "text-muted-foreground"}
                        />
                      </motion.span>
                      <motion.span
                        className="font-mono text-[9px] uppercase tracking-[0.18em]"
                        animate={{
                          color: isHover || isActive ? "oklch(0.966 0 0)" : "oklch(0.6 0 0)",
                          opacity: isHover || isActive ? 1 : 0.75,
                        }}
                      >
                        {label}
                      </motion.span>
                    </button>
                  );
                })}

                {/* hub */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-lg font-light tracking-[0.12em] text-primary">
                    {hovered !== null ? (NAV_ITEMS[hovered]?.label ?? "MA") : "MA"}
                  </span>
                  <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
                    Esc to close
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function NavHint() {
  return (
    <div className="pointer-events-none fixed bottom-7 left-7 z-[140] hidden font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/70 md:block">
      Right click anywhere · or press space
    </div>
  );
}