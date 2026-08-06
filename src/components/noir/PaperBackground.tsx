import { useEffect, useState } from "react";

type Particle = { left: number; top: number; size: number; delay: number; duration: number };

export function PaperBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 26 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.4,
        delay: Math.random() * 12,
        duration: 22 + Math.random() * 26,
      })),
    );
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* ink diffusion pools */}
      <div className="animate-drift absolute -left-40 top-[-10%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,oklch(0.22_0_0),transparent_65%)] blur-3xl" />
      <div
        className="animate-drift absolute -right-52 top-1/3 h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,oklch(0.2_0.02_82),transparent_62%)] opacity-40 blur-3xl"
        style={{ animationDelay: "-12s" }}
      />
      <div
        className="animate-drift absolute bottom-[-20%] left-1/4 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,oklch(0.18_0_0),transparent_65%)] blur-3xl"
        style={{ animationDelay: "-22s" }}
      />

      {/* paper grain */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* floating motes */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary/30"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animation: `drift ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,oklch(0.02_0_0)_100%)]" />
    </div>
  );
}