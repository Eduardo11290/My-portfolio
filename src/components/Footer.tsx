import { profile } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col items-center justify-between gap-4 py-8 text-sm text-bone-faint md:flex-row">
        <p>
          © {year} {profile.name}. Designed & built with care.
        </p>
        <p className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Crafted in {profile.location}
        </p>
        <a href="#top" className="link-underline transition-colors hover:text-bone">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
