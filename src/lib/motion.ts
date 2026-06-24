import type { Variants } from "framer-motion";

/** Shared easing curve used across the site. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Fade + rise, good default for blocks entering on scroll. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/** Container that staggers its children. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** Per-word / per-line mask reveal. */
export const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: easeOutExpo },
  },
};
