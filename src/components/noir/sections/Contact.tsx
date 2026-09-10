import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Send } from "lucide-react";
import { Reveal, SectionHeading } from "../Reveal";
import { MagneticButton } from "../MagneticButton";

const socials = [
  { label: "GitHub", href: "https://github.com/abonasserdotwork", Icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abonasser/", Icon: Linkedin },
  { label: "Email", href: "mailto:abonasser.work@gmail.com", Icon: Mail },
];

function Field({
  id,
  label,
  type = "text",
  textarea,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "w-full border-b border-border bg-transparent py-3 text-base text-foreground outline-none transition-colors duration-500 placeholder:text-transparent focus:border-primary/70";
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground"
      >
        {label}
      </label>
      {textarea ? (
        <textarea id={id} name={id} rows={4} required className={base} />
      ) : (
        <input id={id} name={id} type={type} required className={base} />
      )}
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");
    const subject = `Portfolio inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:abonasser.work@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative px-6 py-32 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Chapter V — Contact"
          title="Let's build something durable."
          intro="Whether it's a product to start, a system to rescue, or a team to strengthen — tell me the problem and I'll tell you honestly whether I'm the right person for it."
        />

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="ink-card paper-grain space-y-9 rounded-sm p-8 sm:p-10"
            >
              <Field id="name" label="Name" />
              <Field id="email" label="Email" type="email" />
              <Field id="message" label="Message" textarea />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <MagneticButton variant="gold" type="submit">
                  Send Message <Send size={13} strokeWidth={1.6} />
                </MagneticButton>
                <MagneticButton href="/My_Resume.pdf">
                  Download Resume <Download size={13} strokeWidth={1.6} />
                </MagneticButton>
              </div>

              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary"
                >
                  Your email app is ready — send the message to complete delivery.
                </motion.p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex h-full flex-col justify-between gap-12">
              <div>
                <p className="font-display text-3xl leading-snug sm:text-4xl">
                  “Good software feels obvious in hindsight. Getting there is the work.”
                </p>
                <div className="mt-8 h-px w-20 bg-primary/50" />
              </div>

              <div className="space-y-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b border-border py-5 transition-colors duration-500 hover:border-primary/40"
                  >
                    <span className="flex items-center gap-4">
                      <Icon
                        size={16}
                        strokeWidth={1.3}
                        className="text-muted-foreground transition-colors duration-500 group-hover:text-primary"
                      />
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                        {label}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] text-primary/60">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}