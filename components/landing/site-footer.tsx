import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">

          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-xs font-bold text-white">P</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              Pocket Physio
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            {[
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
              { label: "Contact", href: "mailto:karam@pocketphysio.uk" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-slate-700"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <p className="text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Pocket Physio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
