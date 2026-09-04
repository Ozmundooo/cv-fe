import Link from "next/link";
import React, { useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "News", href: "/news" },
  { label: "Partners", href: "/partners" },
  { label: "Gallery", href: "/gallery" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar({ active, className = "" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = active === "Home";

  return (
    <nav className={`w-full ${className}`}>
      <div className="mx-auto flex h-[98px] max-w-[1400px] items-center justify-between px-6 md:px-12 lg:px-[275px]">
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className={`font-subtext text-[15px] font-bold tracking-[-0.02em] ${isHome ? "text-white" : "text-black"}`}
          >
            Logoipsum
          </Link>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-[46px] md:flex">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`font-subtext text-[13px] font-medium tracking-[-0.02em] leading-[17px] transition-colors ${
                  active === label
                    ? "rounded-md bg-black/5 px-2 py-1 text-black"
                    : isHome
                      ? "text-white/80 hover:text-white"
                      : "text-[#717171] hover:text-black"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="/forms"
          className="hidden h-[38px] w-[108px] items-center justify-center rounded-md bg-green font-subtext text-[15px] font-medium tracking-[-0.04em] text-cream transition-opacity hover:opacity-90 md:flex"
        >
          Fill out forms
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex flex-col gap-[5px] md:hidden"
        >
          <span
            className={`block h-[2px] w-6 transition-transform ${isHome ? "bg-white" : "bg-black"} ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 transition-opacity ${isHome ? "bg-white" : "bg-black"} ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[2px] w-6 transition-transform ${isHome ? "bg-white" : "bg-black"} ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-sand/60 bg-cream px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-1 pt-4">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`block rounded-md px-3 py-2 font-subtext text-[13px] font-medium tracking-[-0.02em] transition-colors ${
                    active === label
                      ? "bg-sand/60 text-black"
                      : "text-[#717171] hover:text-black"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="mt-4 flex h-[38px] w-full items-center justify-center rounded-md bg-green font-subtext text-[15px] font-medium tracking-[-0.04em] text-cream transition-opacity hover:opacity-90"
          >
            Fill out forms
          </a>
        </div>
      )}
    </nav>
  );
}
