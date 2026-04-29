"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { personalInfo } from "@/config/personal";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaArrowDown,
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const socialLinks = [
  {
    icon: FaGithub,
    href: personalInfo.social.github,
    label: "GitHub",
    color: "hover:text-white",
  },
  {
    icon: FaLinkedin,
    href: personalInfo.social.linkedin,
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: FaInstagram,
    href: personalInfo.social.instagram,
    label: "Instagram",
    color: "hover:text-pink-400",
  },
];

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Build typing sequence from taglines
  const typingSequence = personalInfo.taglines.flatMap((t) => [t, 2500]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
    >
      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(217,70,239,0.07) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-custom relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20"
        >
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
              <span className="glow-dot" />
              <span className="section-label">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight font-display"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">Ahmed Ali</span>
            </motion.h1>

            {/* Typing animation */}
            <motion.div
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-10 font-display"
            >
              <span className="text-white/50">// </span>
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={55}
                deletionSpeed={75}
                repeat={Infinity}
                className="text-indigo-300"
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Location badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 justify-center lg:justify-start mb-8">
              <span className="text-lg">📍</span>
              <span className="text-white/50 text-sm font-mono">{personalInfo.location}</span>
              <span className="mx-2 text-white/20">·</span>
              <span className="text-lg">🎓</span>
              <span className="text-white/50 text-sm font-mono">FAST NUCES</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-cosmic"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-5 justify-center lg:justify-start"
            >
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-white/40 transition-colors text-xl ${color}`}
                >
                  <Icon />
                </motion.a>
              ))}
              <span className="w-px h-5 bg-white/10" />
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-xs font-mono text-white/40 hover:text-indigo-400 transition-colors"
              >
                {personalInfo.email}
              </a>
            </motion.div>
          </div>

          {/* Avatar / Visual */}
          <motion.div
            variants={itemVariants}
            className="relative flex-shrink-0"
          >
            {/* Orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-72 h-72 rounded-full border border-indigo-500/15"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute w-80 h-80 rounded-full border border-purple-500/10"
                style={{ borderStyle: "dashed" }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-96 h-96 rounded-full border border-fuchsia-500/8"
              />
            </div>

            {/* Orbiting dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  background: ["#6366f1", "#d946ef", "#f59e0b"][i],
                  boxShadow: `0 0 10px ${["#6366f1", "#d946ef", "#f59e0b"][i]}`,
                }}
                animate={{
                  x: Math.cos((i * 2 * Math.PI) / 3) * 140,
                  y: Math.sin((i * 2 * Math.PI) / 3) * 140,
                  rotate: 360,
                }}
                transition={{
                  duration: 8 + i * 3,
                  repeat: Infinity,
                  ease: "linear",
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                }}
              />
            ))}

            {/* Avatar image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-56 h-56 sm:w-64 sm:h-64"
            >
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-[3px]">
                <div className="w-full h-full rounded-full bg-[#07052a] overflow-hidden">
                  <Image
                    src="/Ahmed.png"
                    alt="Ahmed Ali"
                    fill
                    className="object-cover rounded-full"
                    priority
                    sizes="(max-width: 768px) 224px, 256px"
                  />
                </div>
              </div>
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow:
                    "0 0 40px rgba(99,102,241,0.35), 0 0 80px rgba(217,70,239,0.15)",
                }}
              />
            </motion.div>

            {/* Floating skill badges */}
            {[
              { label: "Python", emoji: "🐍", pos: "-top-4 -right-8" },
              { label: "Cybersecurity", emoji: "🔒", pos: "-bottom-4 -left-10" },
              { label: "AI/ML", emoji: "🤖", pos: "top-1/2 -right-14" },
            ].map(({ label, emoji, pos }) => (
              <motion.div
                key={label}
                className={`absolute ${pos} glass-card px-3 py-1.5 flex items-center gap-2 text-xs font-medium text-white/80`}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
