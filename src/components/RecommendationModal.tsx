import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { submitRecommendation } from "../api/recommendations";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Modal form for submitting a recommendation. Conditional-mount (clean
 * open/close), closes on Escape / backdrop / X. Rendered via a portal so it
 * always overlays the page regardless of where it's used. Submissions appear
 * immediately (no approval).
 */
export default function RecommendationModal({
  open,
  onClose,
  onSubmitted,
}: {
  open: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      await submitRecommendation({
        name,
        role,
        text,
        linkedIn: linkedIn.trim() || undefined,
      });
      setStatus("success");
      setName("");
      setRole("");
      setText("");
      setLinkedIn("");
      onSubmitted?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-ink px-4 py-3 text-bone placeholder:text-bone-faint outline-none transition-colors focus:border-ember";

  return createPortal(
    <div className="fixed inset-0 z-[150] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Leave a recommendation"
        data-lenis-prevent
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-line bg-ink-soft p-6 sm:rounded-3xl sm:p-10"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink/40 text-bone backdrop-blur-md transition-colors hover:bg-ink/70"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="py-10 text-center">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-ember/15 text-2xl text-ember">
              ✓
            </div>
            <h3 className="font-display text-2xl font-semibold">Thank you!</h3>
            <p className="mt-3 text-bone-dim">
              Your recommendation is now live on the site. Thank you for the kind
              words!
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-bone px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ember"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow mb-4">Leave a recommendation</span>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              A few words
            </h3>
            <p className="mt-2 text-sm text-bone-dim">
              If we've worked together, I'd genuinely appreciate it. Your words
              appear on the site right away.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs tracking-widest text-bone-faint uppercase">
                    Your name
                  </label>
                  <input
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs tracking-widest text-bone-faint uppercase">
                    Role / context
                  </label>
                  <input
                    required
                    maxLength={160}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={inputClass}
                    placeholder="Colleague at Politehnica"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs tracking-widest text-bone-faint uppercase">
                  Your recommendation
                </label>
                <textarea
                  required
                  maxLength={2000}
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="What was it like working with me?"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs tracking-widest text-bone-faint uppercase">
                  LinkedIn (optional)
                </label>
                <input
                  type="url"
                  maxLength={300}
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                  className={inputClass}
                  placeholder="https://linkedin.com/in/…"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ember disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit recommendation"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
