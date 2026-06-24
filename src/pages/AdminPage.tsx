import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { getContactMessages, type ContactMessage } from "../api/contact";
import {
  getRecommendations,
  deleteRecommendation,
  type Recommendation,
} from "../api/recommendations";
import { getAnalyticsSummary, type AnalyticsSummary } from "../api/analytics";

const KEY_STORAGE = "admin_api_key";

function formatDate(iso: string) {
  const d = new Date(iso.endsWith("Z") ? iso : iso + "Z");
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminPage() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(KEY_STORAGE) ?? "");
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<Recommendation[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  async function loadAll(key: string) {
    setLoading(true);
    try {
      const [m, r, a] = await Promise.all([
        getContactMessages(key),
        getRecommendations(),
        getAnalyticsSummary(key),
      ]);
      setMessages(m);
      setReviews(r);
      setAnalytics(a);
      setAuthed(true);
      setAuthError("");
    } catch {
      setAuthed(false);
      setAuthError("Invalid key, or the backend isn't running.");
      localStorage.removeItem(KEY_STORAGE);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (apiKey) loadAll(apiKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const k = keyInput.trim();
    if (!k) return;
    setApiKey(k);
    localStorage.setItem(KEY_STORAGE, k);
    loadAll(k);
  };

  const handleLogout = () => {
    localStorage.removeItem(KEY_STORAGE);
    setApiKey("");
    setAuthed(false);
    setKeyInput("");
    setMessages([]);
    setReviews([]);
    setAnalytics(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this recommendation?")) return;
    try {
      await deleteRecommendation(id, apiKey);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      window.alert("Delete failed.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-ink px-4 py-3 text-bone placeholder:text-bone-faint outline-none transition-colors focus:border-ember";

  // ---- Login gate ----
  if (!authed) {
    return (
      <main className="grid min-h-dvh place-items-center px-5">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-3xl border border-line bg-ink-soft/60 p-8 backdrop-blur-sm"
        >
          <span className="eyebrow mb-5">Admin</span>
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-bone-dim">
            Enter your admin API key to continue.
          </p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            className={`${inputClass} mt-6`}
            placeholder="X-Api-Key"
            autoFocus
          />
          {authError && <p className="mt-3 text-sm text-red-400">{authError}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-ember disabled:opacity-60"
          >
            {loading ? "Checking…" : "Enter"}
          </button>
          <Link
            to="/"
            className="mt-5 block text-center text-sm text-bone-faint transition-colors hover:text-bone"
          >
            ← Back to site
          </Link>
        </form>
      </main>
    );
  }

  // ---- Dashboard ----
  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-10 border-b border-line bg-ink/80 backdrop-blur-xl">
        <div className="shell flex items-center justify-between py-5">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-xl font-semibold tracking-tight">
              Admin<span className="text-ember">.</span>
            </span>
            <Link
              to="/"
              className="text-sm text-bone-faint transition-colors hover:text-bone"
            >
              View site ↗
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-line px-4 py-2 text-sm text-bone-dim transition-colors hover:border-ember hover:text-bone"
          >
            Log out
          </button>
        </div>
      </header>

      <div className="shell space-y-16 py-12">
        {/* Analytics */}
        <section>
          <h2 className="eyebrow mb-6">Visitors</h2>
          {analytics && (
            <>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                {[
                  { label: "All time", value: analytics.totalAllTime },
                  { label: "Last 30 days", value: analytics.totalLast30Days },
                  { label: "Last 7 days", value: analytics.totalLast7Days },
                ].map((s) => (
                  <div key={s.label} className="bg-ink p-6">
                    <div className="font-display text-4xl font-semibold tracking-tight">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm text-bone-faint">{s.label}</div>
                  </div>
                ))}
              </div>
              {analytics.topPaths.length > 0 && (
                <div className="mt-4 rounded-2xl border border-line p-6">
                  <p className="mb-3 text-xs tracking-widest text-bone-faint uppercase">
                    Top paths
                  </p>
                  <ul className="space-y-2">
                    {analytics.topPaths.map((p) => (
                      <li
                        key={p.path}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="font-mono text-bone-dim">{p.path}</span>
                        <span className="text-bone">{p.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>

        {/* Reviews */}
        <section>
          <h2 className="eyebrow mb-6">Recommendations ({reviews.length})</h2>
          {reviews.length === 0 ? (
            <p className="text-bone-dim">No recommendations yet.</p>
          ) : (
            <div className="grid gap-4">
              {reviews.map((r) => (
                <article
                  key={r.id}
                  className={`rounded-2xl border p-6 ${
                    r.flagged ? "border-red-500/40 bg-red-500/5" : "border-line"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-medium">{r.name}</span>
                        <span className="text-sm text-bone-faint">{r.role}</span>
                        {r.flagged && (
                          <span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-medium text-red-400">
                            Flagged
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-bone-dim">{r.text}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-bone-faint">
                        <span>{formatDate(r.createdAt)}</span>
                        {r.linkedIn && (
                          <a
                            href={r.linkedIn}
                            target="_blank"
                            rel="noreferrer"
                            className="link-underline hover:text-bone"
                          >
                            LinkedIn ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="shrink-0 rounded-full border border-line px-4 py-2 text-sm text-bone-dim transition-colors hover:border-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Messages */}
        <section>
          <h2 className="eyebrow mb-6">Messages ({messages.length})</h2>
          {messages.length === 0 ? (
            <p className="text-bone-dim">No messages yet.</p>
          ) : (
            <div className="grid gap-4">
              {messages.map((m) => (
                <article key={m.id} className="rounded-2xl border border-line p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-xs text-bone-faint">
                      {formatDate(m.createdAt)}
                    </span>
                  </div>
                  <a
                    href={`mailto:${m.email}`}
                    className="mt-1 inline-block text-sm text-ember hover:underline"
                  >
                    {m.email}
                  </a>
                  <p className="mt-3 whitespace-pre-wrap text-bone-dim">
                    {m.message}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
