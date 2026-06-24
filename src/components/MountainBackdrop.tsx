import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * A faint, distant mountain range rendered as layered SVG (no external art).
 * Sits behind the hero content to add depth/atmosphere — deliberately low
 * contrast so it reads as "far away". Drifts slowly on scroll for parallax.
 */
export default function MountainBackdrop({
  className = "",
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={reduce ? undefined : { y }}
      className={`pointer-events-none absolute inset-x-0 top-0 ${className}`}
    >
      <svg
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          {/* warm sunrise glow behind the peaks */}
          <radialGradient id="m-glow" cx="50%" cy="68%" r="55%">
            <stop offset="0%" stopColor="#ff5e3a" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#ffb347" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ff5e3a" stopOpacity="0" />
          </radialGradient>
          {/* warm rim on the far ridge */}
          <linearGradient id="m-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a93c2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3a4368" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="m-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a4a6e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2a2440" stopOpacity="0.2" />
          </linearGradient>
          {/* haze that dissolves the bases into the page */}
          <linearGradient id="m-haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a0f" stopOpacity="0" />
            <stop offset="100%" stopColor="#0a0a0f" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* glow */}
        <rect x="0" y="0" width="1440" height="620" fill="url(#m-glow)" />

        {/* far range — highest, faintest */}
        <path
          d="M0,300 L130,250 L250,295 L370,215 L520,300 L680,235 L840,300 L1000,245 L1160,300 L1300,255 L1440,300 L1440,620 L0,620 Z"
          fill="url(#m-far)"
          opacity="0.5"
        />

        {/* mid range */}
        <path
          d="M0,395 L160,330 L300,400 L450,315 L600,400 L760,330 L920,405 L1080,330 L1240,405 L1440,350 L1440,620 L0,620 Z"
          fill="url(#m-mid)"
          opacity="0.6"
        />

        {/* near range — lowest, darkest, most defined */}
        <path
          d="M0,475 L120,435 L260,495 L400,420 L560,500 L720,445 L880,500 L1040,440 L1200,500 L1360,455 L1440,485 L1440,620 L0,620 Z"
          fill="#12121c"
          opacity="0.85"
        />

        {/* atmospheric haze over everything */}
        <rect x="0" y="120" width="1440" height="500" fill="url(#m-haze)" />
      </svg>
    </motion.div>
  );
}
