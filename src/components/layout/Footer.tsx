"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/config/personal";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const social = [
    {
      icon: FaGithub,
      href: personalInfo.social.github,
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: personalInfo.social.linkedin,
      label: "LinkedIn",
    },
    {
      icon: FaInstagram,
      href: personalInfo.social.instagram,
      label: "Instagram",
    },
    {
      icon: FaEnvelope,
      href: `mailto:${personalInfo.email}`,
      label: "Email",
    },
  ];

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#03020d]/60 backdrop-blur-sm">
      <div className="container-custom py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Branding */}
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-white/90">
              Ahmed<span className="text-indigo-400"> Ali</span>
            </p>
            <p className="text-xs text-white/40 mt-1 font-mono">
              Software Engineer · Cybersecurity · AI
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {social.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/30 font-mono">
            © {year} Ahmed Ali. Built with Next.js & ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
