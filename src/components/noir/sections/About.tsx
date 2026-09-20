import { Reveal, SectionHeading } from "../Reveal";

const pillars = [
  {
    k: "Architecture",
    v: "I design systems before I write them — boundaries, data flow, and failure paths first. Features then land quickly because the foundation already expects them.",
  },
  {
    k: "Performance",
    v: "Fast is a feature. I profile before optimising: query shapes, render cost, payload size, caching layers. Numbers decide, not habits.",
  },
  {
    k: "Leadership",
    v: "I've led feature teams through ambiguous specs — breaking work down, reviewing generously, and keeping standards high without slowing anyone down.",
  },
  {
    k: "Clean Code",
    v: "Code is read far more than it is written. I write for the engineer who arrives six months later, including when that engineer is me.",
  },
];

const facts = [
  { n: "2+", l: "Years building for the web" },
];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Chapter I — About"
          title="Software as craft, not output."
          intro="I've spent the last several years building and maintaining production applications across the JavaScript ecosystem — from the data model up to the last pixel. What I care about most is the part users never see: the architecture that keeps a product fast, understandable, and cheap to change."
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7 text-base leading-relaxed text-muted-foreground">
            <Reveal>
              <p>
                Most of my work starts with a hard problem someone has already tried to solve twice. I like
                that. I map the domain, find the constraint that actually matters, and build the smallest
                honest system that removes it — then let it grow along the seams I left open.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                On the backend that means well-shaped APIs, deliberate database design, and observability
                you can trust at 3am. On the frontend it means interfaces that feel weightless: predictable
                state, considered motion, and accessibility handled as a default rather than a retrofit.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                I read a lot, ship often, and keep a notebook of things that broke and why. That habit is
                probably the single biggest reason my work looks the way it does — every project leaves
                behind a sharper instinct for the next one.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-10">
                {facts.map((f) => (
                  <div key={f.l}>
                    <div className="font-display text-4xl font-light text-primary">{f.n}</div>
                    <div className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
                      {f.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-4">
            {pillars.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.08}>
                <div className="ink-card gild-hover paper-grain rounded-sm p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl">{p.k}</h3>
                    <span className="font-mono text-[10px] text-primary/70">0{i + 1}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}