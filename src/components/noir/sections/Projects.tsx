import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X, ChevronLeft, ChevronRight } from "lucide-react";
import p1 from "@/assets/project-1.png";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import { Reveal, SectionHeading } from "../Reveal";
import { MagneticButton } from "../MagneticButton";

type Project = {
  title: string;
  short: string;
  image: string;
  stack: string[];
  overview: string;
  features: string[];
  challenges: string[];
  github: string;
  demo: string;
};

const projects: Project[] = [
  {
    title: "MediCare",
    short: "A medicine management platform that helps users organize prescriptions, track medications, and monitor adherence.",
    image: p1,
    stack: [
      "Angular",
      "TypeScript",
      "Bootstrap",
      "Animate.css",
      "Font Awesome",
      "Local Storage",
      "Session Storage",
    ],
    overview:
      "MediCare is a medication management web application built to help users stay organized with their treatment plans. Users can create medication categories, add medicines with scheduled times, track whether each dose was taken or missed, and review their medication history. The application also provides adherence statistics, allowing users to monitor how consistently they follow their prescriptions.",
    features: [
      "Create and manage medication categories",
      "Add multiple medications with custom schedules",
      "Mark medications as Taken or Missed",
      "Medication history with adherence tracking",
      "Adherence percentage and progress overview",
      "Profile management",
      "Persistent data using Local Storage and Session Storage",
      "Responsive and user-friendly interface",
    ],
    challenges: [
      "Designed a scalable data structure to organize medication categories, schedules, and history using browser storage.",
      "Built a medication tracking workflow that accurately records Taken and Missed doses while calculating adherence percentages in real time.",
    ],
    github: "https://github.com/abonasserdotwork/NTI-MEDICARE-PROJECT",
    demo: "https://example.com",
  },
  {
    title: "CRUDit",
    short: "A PHP-based college management system focused on performing CRUD operations for employee records.",
    image: p2,
    stack: ["PHP", "MySQL", "HTML", "CSS", "Bootstrap", "JavaScript"],
    overview:
      "Crud It is a college management system built with core PHP to demonstrate complete CRUD functionality for managing employee records. The application allows administrators to add, edit, delete, and search employee information through a clean and responsive interface while reinforcing fundamental backend development concepts and database management.",
    features: [
      "Create, update, and delete employee records",
      "Search and browse employee data",
      "Responsive management dashboard",
      "Input validation for employee forms",
      "Organized PHP project structure",
      "MySQL database integration",
    ],
    challenges: [
      "Designed a clean CRUD workflow that keeps employee records synchronized with the database while maintaining data integrity.",
      "Structured the application using reusable PHP components to simplify maintenance and improve code organization.",
    ],
    github: "https://github.com/abonasserdotwork/CRUDit",
    demo: "https://example.com",
  },
];

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const [slide, setSlide] = useState(0);

  const shots = open ? [open.image, ...projects.filter((p) => p !== open).map((p) => p.image)] : [];

  return (
    <section id="projects" className="relative px-6 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Chapter IV — Selected Work"
          title="Projects worth opening."
          intro="A few systems I've designed and shipped. Each one had a constraint that shaped the whole build — that's usually the interesting part."
        />

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className="h-full">
              <article className="ink-card gild-hover group h-full overflow-hidden rounded-sm">
                <button
                  onClick={() => {
                    setOpen(p);
                    setSlide(0);
                  }}
                  className="block w-full text-left"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.title} interface`}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="h-full w-full object-cover grayscale-[45%] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.08_0_0)_10%,transparent_60%)]" />
                    <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 bg-[oklch(0.08_0_0)]/80 text-primary opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                      <ArrowUpRight size={14} strokeWidth={1.4} />
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-3xl leading-tight">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.short}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
                <div className="flex gap-3 px-8 pb-8">
                  <MagneticButton href={p.github} variant="outline" className="px-5 py-2.5">
                    <Github size={13} strokeWidth={1.5} /> Code
                  </MagneticButton>
                  <MagneticButton href={p.demo} variant="ghost" className="px-5 py-2.5">
                    Live Demo <ArrowUpRight size={13} strokeWidth={1.5} />
                  </MagneticButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[180] flex items-start justify-center overflow-y-auto p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setOpen(null)}
          >
            <div className="fixed inset-0 bg-[oklch(0.02_0_0)]/80 backdrop-blur-[6px]" />
            <motion.div
              role="dialog"
              aria-label={open.title}
              onClick={(e) => e.stopPropagation()}
              className="ink-card paper-grain relative my-6 w-full max-w-4xl rounded-sm"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close project"
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-[oklch(0.1_0_0)]/85 text-muted-foreground transition-colors duration-500 hover:border-primary/50 hover:text-primary"
              >
                <X size={15} strokeWidth={1.4} />
              </button>

              {/* carousel */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={slide}
                    src={shots[slide]}
                    alt={`${open.title} screenshot ${slide + 1}`}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.1_0_0)_6%,transparent_50%)]" />
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-4">
                  <button
                    aria-label="Previous screenshot"
                    onClick={() => setSlide((s) => (s - 1 + shots.length) % shots.length)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[oklch(0.09_0_0)]/85 text-muted-foreground hover:text-primary"
                  >
                    <ChevronLeft size={15} strokeWidth={1.4} />
                  </button>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                    {String(slide + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
                  </span>
                  <button
                    aria-label="Next screenshot"
                    onClick={() => setSlide((s) => (s + 1) % shots.length)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-[oklch(0.09_0_0)]/85 text-muted-foreground hover:text-primary"
                  >
                    <ChevronRight size={15} strokeWidth={1.4} />
                  </button>
                </div>
              </div>

              <div className="space-y-10 p-8 sm:p-12">
                <div>
                  <span className="eyebrow">Case study</span>
                  <h3 className="mt-4 text-4xl">{open.title}</h3>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">{open.overview}</p>
                </div>

                <div className="grid gap-10 sm:grid-cols-2">
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                      Features
                    </h4>
                    <ul className="mt-5 space-y-3">
                      {open.features.map((f) => (
                        <li key={f} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                      Challenges solved
                    </h4>
                    <ul className="mt-5 space-y-3">
                      {open.challenges.map((c) => (
                        <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                    Technologies
                  </h4>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {open.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 border-t border-border pt-8">
                  <MagneticButton href={open.demo} variant="gold">
                    Live Demo <ArrowUpRight size={13} strokeWidth={1.6} />
                  </MagneticButton>
                  <MagneticButton href={open.github}>
                    <Github size={13} strokeWidth={1.6} /> GitHub
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}