import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, profile } from "../data/content";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`shell flex items-center justify-between transition-all duration-500 ${
            scrolled ? "py-3" : "py-6"
          }`}
        >
          <a
            href="#top"
            className="font-display text-xl font-semibold tracking-tight"
          >
            {profile.name}
            <span className="text-ember">.</span>
          </a>

          {/* Desktop nav */}
          <nav
            className={`hidden items-center gap-1 rounded-full border border-line/70 px-2 py-2 backdrop-blur-xl transition-colors duration-500 md:flex ${
              scrolled ? "bg-ink-soft/70" : "bg-ink-soft/30"
            }`}
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-sm text-bone-dim transition-colors hover:bg-ink-raised hover:text-bone"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <Magnetic className="hidden md:block">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ember"
            >
              Let's talk
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </Magnetic>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-bone transition-all duration-300 ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-bone transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-bone transition-all duration-300 ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="font-display text-4xl font-medium"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
