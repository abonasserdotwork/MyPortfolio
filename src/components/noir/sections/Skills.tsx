import { motion } from "framer-motion";
import { Reveal, SectionHeading } from "../Reveal";

const frontend = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Redux",
  "Angular",
  "Bootstrap",
  "HTML5",
  "CSS3",
];

const backend = [
  "Node.js",
  "Express.js",
  "Laravel Framework",
  "PHP",
  "MongoDB",
  "MySQL",
  "REST APIs",
  "JWT Auth",
  "Firebase",
  "Git",
  "GitHub",
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

function SkillName({ name, delay }: { name: string; delay: number }) {
  return (
    <motion.div
      className="group flex items-center justify-center"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="border-b border-border px-2 pb-2 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-500 group-hover:border-primary/60 group-hover:text-primary">
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
              {frontend.map((name, i) => (
                <SkillName key={name} name={name} delay={i * 0.05} />
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
              {backend.map((name, i) => (
                <SkillName key={name} name={name} delay={i * 0.05} />
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