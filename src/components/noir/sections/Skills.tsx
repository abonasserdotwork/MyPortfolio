import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "../Reveal";

const frontend = [
  { name: "React", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "TypeScript", level: 88 },
  { name: "JavaScript", level: 95 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Redux", level: 85 },
  { name: "Angular", level: 74 },
  { name: "Bootstrap", level: 86 },
  { name: "HTML5", level: 96 },
  { name: "CSS3", level: 94 },
];

const backend = [
  { name: "Node.js", level: 93 },
  { name: "Express.js", level: 92 },
  { name: "Laravel Framework", level: 92 },
  { name: "PHP", level: 92 },
  { name: "MongoDB", level: 90 },
  { name: "MySQL", level: 82 },
  { name: "REST APIs", level: 94 },
  { name: "JWT Auth", level: 89 },
  { name: "Firebase", level: 80 },
  { name: "Git", level: 92 },
  { name: "GitHub", level: 92 },
];

const soft = [
  "Leadership",
  "Communication",
  "Problem Solving",
  "Critical Thinking",
  "Adaptability",
  "Fast Learning",
  "Teamwork",
  "Time Management",
];

function Dial({ name, level, delay }: { name: string; level: number; delay: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <motion.div
      className="group flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-[76px] w-[76px]">
        <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
          <circle cx="38" cy="38" r={r} fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="1.5" />
          <motion.circle
            cx="38"
            cy="38"
            r={r}
            fill="none"
            stroke="oklch(0.755 0.077 82 / 85%)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c - (c * level) / 100 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 2, delay: delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-muted-foreground transition-colors duration-500 group-hover:text-primary">
          {level}
        </span>
      </div>
      <span className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {name}
      </span>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Chapter III — Skills"
          title="The tools, and the temperament."
          intro="Depth where it counts, familiarity where it helps. The technical side keeps products fast and stable; the rest keeps teams moving."
        />

        <div className="mt-20 space-y-20">
          <div>
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/70">
                Frontend
              </h3>
            </Reveal>
            <div className="mt-10 grid grid-cols-3 gap-y-10 sm:grid-cols-5">
              {frontend.map((s, i) => (
                <Dial key={s.name} {...s} delay={i * 0.05} />
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/70">
                Backend & Tooling
              </h3>
            </Reveal>
            <div className="mt-10 grid grid-cols-3 gap-y-10 sm:grid-cols-5">
              {backend.map((s, i) => (
                <Dial key={s.name} {...s} delay={i * 0.05} />
              ))}
            </div>
          </div>

          {/* Soft skills — orbiting nodes */}
          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-foreground/70">
                Soft Skills
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                Engineering rarely fails on syntax. It fails on unclear ownership, slow decisions, and
                unspoken assumptions — so these matter as much as the stack.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mx-auto aspect-square w-full max-w-[440px]">
                <div className="absolute inset-[12%] rounded-full border border-border" />
                <div className="absolute inset-[26%] rounded-full border border-primary/15" />
                <div className="absolute inset-[44%] flex items-center justify-center rounded-full border border-primary/30 bg-[oklch(0.1_0_0)]">
                  <span className="font-display text-lg italic text-primary">craft</span>
                </div>
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                >
                  {soft.map((s, i) => {
                    const angle = (360 / soft.length) * i - 90;
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <motion.div
                        key={s}
                        className="absolute"
                        style={{
                          left: `${50 + Math.cos(rad) * 44}%`,
                          top: `${50 + Math.sin(rad) * 44}%`,
                          translateX: "-50%",
                          translateY: "-50%",
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="whitespace-nowrap rounded-full border border-border bg-[oklch(0.13_0_0)]/90 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-500 hover:border-primary/50 hover:text-primary">
                          {s}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}