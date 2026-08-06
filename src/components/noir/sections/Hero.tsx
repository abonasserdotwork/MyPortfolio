import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import portrait from "@/assets/portrait.png";
import { MagneticButton } from "../MagneticButton";

export function Hero() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });

  const goto = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="home"
      onMouseMove={(e) => {
        px.set((e.clientX / window.innerWidth - 0.5) * 26);
        py.set((e.clientY / window.innerHeight - 0.5) * 20);
      }}
      className="relative flex min-h-screen items-center px-6 pb-24 pt-32 sm:px-10 lg:px-20"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <div>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8 }}
          >
            Portfolio — ABONASSERX
          </motion.span>

          <motion.h1
            className="mt-7 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, delay: 2.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Mohamed
            <br />
            <span className="italic text-primary">Abdelnasser</span>
          </motion.h1>

          <motion.div
            className="mt-7 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 3.2 }}
          >
            <div className="h-px w-12 bg-primary/60" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/85">
              Full Stack - Web Engineer
            </p>
          </motion.div>

          <motion.p
            className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 3.35, ease: [0.16, 1, 0.3, 1] }}
          >
            I build scalable web applications with modern technologies, clean architecture, and intuitive
            user experiences. I enjoy solving complex problems through elegant software solutions and
            creating products that people genuinely enjoy using.
          </motion.p>

          <motion.div
            className="mt-11 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 3.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton variant="gold" onClick={() => goto("projects")}>
              View Projects <ArrowDown size={13} strokeWidth={1.6} />
            </MagneticButton>
            <MagneticButton onClick={() => goto("contact")}>
              Contact Me <Mail size={13} strokeWidth={1.6} />
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              href="/My_Resume.pdf"
            >
              Résumé <Download size={13} strokeWidth={1.6} />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Portrait */}
        <motion.div
          className="relative mx-auto w-full max-w-md"
          style={{ x: sx, y: sy }}
          initial={{ opacity: 0, scale: 0.96, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2, delay: 2.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,oklch(0.755_0.077_82_/_12%),transparent_65%)] blur-2xl" />

          {/* animated ink strokes */}
          <svg
            aria-hidden
            viewBox="0 0 400 500"
            className="pointer-events-none absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)]"
          >
            {[
              "M30,120 C90,40 300,20 370,140",
              "M20,380 C110,470 300,470 380,360",
              "M14,250 C60,180 60,320 20,260",
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="oklch(0.755 0.077 82 / 45%)"
                strokeWidth={i === 2 ? 0.8 : 1.2}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 4.5, delay: 3.3 + i * 0.6, ease: "easeInOut" }}
              />
            ))}
          </svg>

          <div className="paper-grain relative overflow-hidden rounded-[2px] border border-border shadow-[var(--shadow-ink)]">
            <img
              src={portrait}
              width={1024}
              height={1280}
              alt="Portrait of Mohamed Abdelnasser, MERN stack engineer"
              className="w-full grayscale-[35%] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.05_0_0)_4%,transparent_55%)]" />
          </div>

          <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <span>Cairo · Remote</span>
            <span className="text-primary">Available for work</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}