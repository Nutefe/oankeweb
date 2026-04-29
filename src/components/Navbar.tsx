"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useLang } from "@/lib/LangContext";
import LangToggle from "@/components/LangToggle";
import { ROUTES } from "@/constants/routes";

export default function Navbar() {
  const { t } = useLang();
  const pathname = usePathname();
  // Defer active-link state to client mount to avoid hydration mismatches when
  // a Proxy file is present (see Next.js docs: usePathname + Proxy / rewrites).
  const [activePath, setActivePath] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = [
    { href: ROUTES.SERVICES, label: t.nav.services },
    { href: ROUTES.SUPPORT, label: t.nav.support },
    { href: ROUTES.AIDE, label: t.nav.aide },
    { href: ROUTES.LOGIN, label: t.nav.login },
  ];

  const solutionLinks = [
    { href: ROUTES.SOLUTIONS.COMMERCE, label: t.nav.solutions_commerce },
    { href: ROUTES.SOLUTIONS.ENTREPRISE, label: t.nav.solutions_entreprise },
  ];

  const isSolutionActive =
    activePath === ROUTES.SOLUTIONS.COMMERCE || activePath === ROUTES.SOLUTIONS.ENTREPRISE;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} className="text-2xl font-bold text-blue-700">
            Oanke
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Nos Solutions dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSolutionsOpen((o) => !o)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  isSolutionActive
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-600 hover:text-blue-700"
                }`}
              >
                {t.nav.solutions}
                <svg
                  className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                  {solutionLinks.map((sl) => (
                    <Link
                      key={sl.href}
                      href={sl.href}
                      onClick={() => setSolutionsOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        activePath === sl.href
                          ? "text-blue-700 bg-blue-50 font-semibold"
                          : "text-gray-600 hover:text-blue-700 hover:bg-gray-50"
                      }`}
                    >
                      {sl.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  activePath === link.href
                    ? "text-blue-700 border-b-2 border-blue-700"
                    : "text-gray-600 hover:text-blue-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LangToggle />
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <LangToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 flex flex-col gap-3">
          {/* Nos Solutions accordion */}
          <div>
            <button
              onClick={() => setMobileSolutionsOpen((o) => !o)}
              className={`flex items-center gap-1 w-full text-sm font-medium py-2 transition-colors ${
                isSolutionActive ? "text-blue-700 font-bold" : "text-gray-600 hover:text-blue-700"
              }`}
            >
              {t.nav.solutions}
              <svg
                className={`w-4 h-4 ml-1 transition-transform ${mobileSolutionsOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileSolutionsOpen && (
              <div className="pl-4 flex flex-col gap-2">
                {solutionLinks.map((sl) => (
                  <Link
                    key={sl.href}
                    href={sl.href}
                    onClick={() => { setMenuOpen(false); setMobileSolutionsOpen(false); }}
                    className={`text-sm font-medium py-1 transition-colors ${
                      activePath === sl.href ? "text-blue-700 font-bold" : "text-gray-500 hover:text-blue-700"
                    }`}
                  >
                    {sl.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2 transition-colors ${
                activePath === link.href ? "text-blue-700 font-bold" : "text-gray-600 hover:text-blue-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
