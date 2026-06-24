import { useEffect, useState } from "react";
import { profile } from "../data/content";

/**
 * A brief intro curtain: counts to 100, then slides away to reveal the page.
 *
 * Completion is driven by time-based timers (not requestAnimationFrame) and a
 * guaranteed unmount timeout, so the curtain can NEVER get stuck covering the
 * page — even if rAF/animations are throttled (background/hidden tab). Skipped
 * entirely for reduced-motion users.
 */
const COUNT_MS = 1400;
const SLIDE_MS = 700;

export default function Loader() {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const start = performance.now();

    // Time-based counter — setInterval still fires when rAF is paused.
    const interval = setInterval(() => {
      const p = Math.min((performance.now() - start) / COUNT_MS, 1);
      const eased = 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p >= 1) clearInterval(interval);
    }, 33);

    // Guaranteed: start the slide-up, then unmount — independent of any
    // animation finishing.
    const leaveTimer = setTimeout(() => setLeaving(true), COUNT_MS + 200);
    const doneTimer = setTimeout(
      () => setDone(true),
      COUNT_MS + 200 + SLIDE_MS,
    );

    return () => {
      clearInterval(interval);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-end justify-between bg-ink p-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-12 ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <span className="font-display text-2xl font-semibold">
        {profile.name}
        <span className="text-ember">.</span>
      </span>
      <span className="font-display text-[clamp(4rem,18vw,16rem)] leading-none font-semibold tracking-tighter tabular-nums">
        {count}
        <span className="text-ember">%</span>
      </span>
    </div>
  );
}
