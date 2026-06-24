import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../lib/motion";

/**
 * Drop-in scroll reveal. Children fade + rise into view once, when ~20%
 * visible. Use `delay` to offset sequential blocks.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
