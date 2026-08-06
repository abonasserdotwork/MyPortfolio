import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "gold" | "outline" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

const styles: Record<NonNullable<Props["variant"]>, string> = {
  gold: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline: "border border-border text-foreground hover:border-primary/50 hover:text-primary",
  ghost: "text-muted-foreground hover:text-primary",
};

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "outline",
  className,
  type = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20 });
  const sy = useSpring(y, { stiffness: 220, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 12);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <span className="relative z-10 flex items-center gap-2.5">{children}</span>
  );

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-500",
    styles[variant],
    className,
  );

  return (
    <motion.div
      ref={ref}
      data-magnetic
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className={classes}
        >
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={classes}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}