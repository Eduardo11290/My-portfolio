import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Variant = "sphere" | "ring";
type Tint = "ember" | "iris" | "amber" | "bone";

const TINTS: Record<Tint, { hi: string; mid: string; lo: string; glow: string }> = {
  ember: { hi: "#ffd0bb", mid: "#ff5e3a", lo: "#5e1607", glow: "rgba(255,94,58,0.35)" },
  iris: { hi: "#cfcfff", mid: "#6b6bff", lo: "#1f1f6e", glow: "rgba(107,107,255,0.3)" },
  amber: { hi: "#ffe6c2", mid: "#ffb347", lo: "#6e4310", glow: "rgba(255,179,71,0.3)" },
  bone: { hi: "#ffffff", mid: "#cfc9bd", lo: "#5c544c", glow: "rgba(243,240,233,0.18)" },
};

function shapeStyle(variant: Variant, tint: Tint): React.CSSProperties {
  const c = TINTS[tint];
  if (variant === "ring") {
    return {
      borderRadius: "9999px",
      background: `radial-gradient(closest-side, transparent 56%, ${c.mid} 59%, ${c.hi} 65%, ${c.mid} 71%, transparent 74%)`,
      filter: `drop-shadow(0 24px 40px ${c.glow})`,
    };
  }
  return {
    borderRadius: "9999px",
    background: `radial-gradient(circle at 32% 26%, ${c.hi}, ${c.mid} 46%, ${c.lo} 100%)`,
    boxShadow: `inset -8px -10px 26px rgba(0,0,0,0.55), inset 8px 10px 22px rgba(255,255,255,0.12), 0 36px 64px -22px ${c.glow}`,
  };
}

/**
 * A decorative, generated 3D-looking shape (no external assets). Floats gently
 * and parallaxes on scroll. Size + position come from `className` (w-/h-/top-/…).
 * Purely ornamental — hidden from assistive tech and reduced-motion safe.
 */
export default function FloatingShape({
  className = "",
  variant = "sphere",
  tint = "ember",
  depth = 60,
  delay = 0,
  duration = 9,
}: {
  className?: string;
  variant?: Variant;
  tint?: Tint;
  /** Parallax travel in px across the scroll range. */
  depth?: number;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [depth, -depth]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={reduce ? undefined : { y }}
    >
      <motion.div
        className="relative h-full w-full"
        style={shapeStyle(variant, tint)}
        animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 5, 0] }}
        transition={
          reduce
            ? undefined
            : { duration, repeat: Infinity, ease: "easeInOut", delay }
        }
      >
        {/* Glossy specular highlight for spheres */}
        {variant === "sphere" && (
          <span
            className="absolute left-[18%] top-[14%] h-1/4 w-1/4 rounded-full bg-white/40 blur-md"
            aria-hidden
          />
        )}
      </motion.div>
    </motion.div>
  );
}
