import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Blocks,
  MonitorSmartphone,
  Server,
  Network,
  ShieldCheck,
  Database,
  Gauge,
  Rocket,
  LifeBuoy,
} from "lucide-react";
import { Reveal, SectionHeading } from "../Reveal";

const services = [
  { Icon: Blocks, title: "Full Stack Web Development", body: "End-to-end products — data model, API, interface, and the deployment pipeline that carries them." },
  { Icon: MonitorSmartphone, title: "Frontend Engineering", body: "React and Next.js interfaces with disciplined state, composable components, and considered motion." },
  { Icon: Server, title: "Backend Development", body: "Node and Express services built around clear boundaries, validation, and predictable failure handling." },
  { Icon: Network, title: "REST API Development", body: "Versioned, documented, consistent endpoints that client teams can build on without asking questions." },
  { Icon: ShieldCheck, title: "Authentication & Security", body: "JWT and session flows, role-based access, hardened inputs, and sensible secret handling." },
  { Icon: Database, title: "Database Design", body: "MongoDB and SQL schemas modelled on real access patterns, indexed for the queries that matter." },
  { Icon: Gauge, title: "Performance Optimization", body: "Profiling-led work on bundle size, render cost, caching, and query efficiency. Measured, then improved." },
  { Icon: Rocket, title: "Deployment", body: "CI/CD, environment strategy, and zero-drama releases with monitoring wired in from day one." },
  { Icon: LifeBuoy, title: "Maintenance & Support", body: "Ongoing care — dependency health, incident response, and steady incremental improvement." },
];

function Ripple({ x, y }: { x: number; y: number }) {
  return (
    <motion.span
      className="pointer-events-none absolute rounded-full bg-[radial-gradient(circle,oklch(0.755_0.077_82_/_20%),transparent_70%)]"
      style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
      initial={{ width: 0, height: 0, opacity: 0.8 }}
      animate={{ width: 620, height: 620, opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function ServiceCard({ Icon, title, body }: (typeof services)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const [ripple, setRipple] = useState<{ id: number; x: number; y: number } | null>(null);

  return (
    <div
      ref={ref}
      onMouseEnter={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        setRipple({ id: Date.now(), x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setRipple(null)}
      className="ink-card gild-hover paper-grain relative h-full overflow-hidden rounded-sm p-8"
    >
      <AnimatePresence>{ripple && <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />}</AnimatePresence>
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 text-primary">
          <Icon size={17} strokeWidth={1.3} />
        </span>
        <h3 className="mt-6 text-2xl leading-tight">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative px-6 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Chapter II — Services"
          title="What I take on."
          intro="Engagements range from a single hard problem to owning a product end to end. Whatever the shape, the deliverable is the same: something maintainable you can keep building on."
        />
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}