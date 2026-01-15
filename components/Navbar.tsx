import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-serif text-2xl font-bold tracking-tighter text-slate-900">
          Dev<span className="text-blue-600">Log</span>.
        </Link>
        <div className="flex gap-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Latest Posts
          </Link>
          <Link href="/studio" className="text-sm font-medium text-slate-600 hover:text-blue-600">
            Studio
          </Link>
        </div>
      </div>
    </nav>
  );
}