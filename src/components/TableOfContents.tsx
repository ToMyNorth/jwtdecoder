"use client";

export interface TocHeading {
  level: 2 | 3;
  text: string;
  id: string;
}

export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <details
      className="mt-6 mb-8 rounded-xl border border-gray-200 bg-gray-50/80 overflow-hidden open:bg-white open:shadow-sm transition-all"
      open
    >
      <summary className="flex items-center justify-between cursor-pointer px-5 py-3.5 text-sm font-semibold text-gray-800 select-none hover:bg-gray-100/80 transition-colors list-none">
        <span className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 10h16M4 14h10M4 18h7"
            />
          </svg>
          In This Article
        </span>
        <svg
          className="w-4 h-4 text-gray-400 transition-transform duration-200 [[open]>&]:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </summary>
      <nav className="px-5 pb-4 pt-1">
        <ul className="space-y-1.5 text-sm">
          {headings.map((h, i) => (
            <li
              key={`${h.id}-${i}`}
              className={h.level === 3 ? "ml-4" : ""}
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.pushState(null, "", `#${h.id}`);
                  }
                }}
                className={`block py-1 transition-colors ${
                  h.level === 2
                    ? "font-medium text-gray-700 hover:text-indigo-600"
                    : "text-gray-500 hover:text-indigo-500"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
