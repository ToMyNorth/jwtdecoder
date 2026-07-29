import Link from "next/link";
import { siteConfig, navLinks } from "@/lib/siteConfig";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-2 sm:h-14 sm:flex-row sm:items-center sm:justify-between sm:py-0">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-800">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm">
            J
          </span>
          <span className="text-base">{siteConfig.shortName}</span>
        </Link>
        <nav className="grid w-full grid-cols-5 gap-1 sm:flex sm:w-auto sm:items-center md:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-1 py-1.5 text-center text-xs font-medium text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600 sm:px-3 sm:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
