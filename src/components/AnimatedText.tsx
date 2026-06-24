import { useRef, Fragment } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Character-by-character scroll reveal. Each character fades from dim → full
 * as the paragraph passes through the viewport. Falls back to plain text when
 * the user prefers reduced motion (and stays readable to screen readers).
 */
export default function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");
  // Ranges are sliced over the count of visible (non-space) characters.
  const total = text.replace(/ /g, "").length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block whitespace-nowrap" aria-hidden>
            {word.split("").map((char, ci) => {
              const start = charIndex / total;
              const end = (charIndex + 1) / total;
              charIndex += 1;
              return (
                <Char key={ci} progress={scrollYProgress} range={[start, end]}>
                  {char}
                </Char>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}

function Char({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}
