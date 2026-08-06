import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border px-6 py-12 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 sm:flex-row">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          © {new Date().getFullYear()} Mohamed Abdelnasser
        </p>

        <div className="flex items-center gap-5">
          {[
            { href: "https://github.com/abonasserdotwork", Icon: Github, label: "GitHub" },
            { href: "https://www.linkedin.com/in/abonasser/", Icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:hello@mohamedabdelnasser.dev", Icon: Mail, label: "Email" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-muted-foreground transition-colors duration-500 hover:text-primary"
            >
              <Icon size={16} strokeWidth={1.3} />
            </a>
          ))}
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors duration-500 hover:text-primary"
        >
          Back to top
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors duration-500 group-hover:border-primary/50">
            <ArrowUp size={13} strokeWidth={1.4} />
          </span>
        </button>
      </div>
    </footer>
  );
}