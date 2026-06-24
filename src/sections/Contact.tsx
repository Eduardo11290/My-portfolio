import { useState } from "react";
import { motion } from "framer-motion";
import { profile, socials } from "../data/content";
import Reveal from "../components/Reveal";
import { sendContactMessage } from "../api/contact";
import { easeOutExpo } from "../lib/motion";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await sendContactMessage({ name, email, message });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-ink px-4 py-3 text-bone placeholder:text-bone-faint outline-none transition-colors focus:border-ember";

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-44">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-ember/15 blur-[150px]"
      />

      <div className="shell relative">
        <div className="text-center">
          <Reveal>
            <span className="eyebrow mx-auto mb-8 justify-center">
              Let's build something
            </span>
          </Reveal>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: easeOutExpo }}
            className="font-display text-[clamp(2.5rem,9vw,9rem)] leading-[0.9] font-semibold tracking-[-0.03em]"
          >
            Get in touch
          </motion.h2>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-flex items-center gap-3 text-lg text-bone-dim transition-colors hover:text-bone"
          >
            {profile.email}
            <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Contact form */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-xl rounded-3xl border border-line bg-ink-soft/60 p-6 backdrop-blur-sm sm:p-10">
            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-ember/15 text-2xl text-ember">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-semibold">
                  Message sent
                </h3>
                <p className="mt-3 text-bone-dim">
                  Thanks for reaching out — I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 rounded-full border border-line px-6 py-2.5 text-sm text-bone-dim transition-colors hover:border-ember hover:text-bone"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs tracking-widest text-bone-faint uppercase">
                      Name
                    </label>
                    <input
                      required
                      maxLength={120}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs tracking-widest text-bone-faint uppercase">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      maxLength={200}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs tracking-widest text-bone-faint uppercase">
                    Message
                  </label>
                  <textarea
                    required
                    maxLength={5000}
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me about your project or just say hi…"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-bone px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-ember disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-bone-faint">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="link-underline transition-colors hover:text-bone"
              >
                {s.label} — {s.handle}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
