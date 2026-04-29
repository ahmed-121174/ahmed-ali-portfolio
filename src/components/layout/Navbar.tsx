"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/config/personal";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navItems.map((item) => item.href.slice(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#03020d]/80 backdrop-blur-xl border-b border-white/5"
            : "py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group"
            aria-label="Go to home"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-indigo-500/40 group-hover:border-indigo-400 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm font-display">
                AA
              </div>
            </div>
            <span className="font-display font-semibold text-white/90 group-hover:text-white transition-colors hidden sm:block">
              Ahmed<span className="text-indigo-400"> Ali</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`nav-link ${
                  activeSection === item.href.slice(1) ? "active" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-cosmic text-xs px-4 py-2"
            >
              <span>Resume</span>
              <svg className="w-3 h-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg border border-white/10 hover:border-indigo-500/50 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <motion.span
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
                className="w-5 h-0.5 bg-white/80 block origin-center transition-all"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                className="w-5 h-0.5 bg-white/80 block"
              />
              <motion.span
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
                className="w-5 h-0.5 bg-white/80 block origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-[#03020d]/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <nav className="container-custom py-6 flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item.href)}
                  className={`text-left py-2 text-lg font-medium transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-indigo-400"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cosmic inline-flex mt-2 self-start"
              >
                <span>Download Resume</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
