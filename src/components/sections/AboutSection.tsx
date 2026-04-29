"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "@/config/personal";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaDownload,
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stats = [
  { value: "5+", label: "Internships" },
  { value: "11+", label: "Projects" },
  { value: "3+", label: "Certs" },
  { value: "3", label: "Languages" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const social = [
    { icon: FaGithub, href: personalInfo.social.github, label: "GitHub" },
    { icon: FaLinkedin, href: personalInfo.social.linkedin, label: "LinkedIn" },
    { icon: FaInstagram, href: personalInfo.social.instagram, label: "Instagram" },
    { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: "Email" },
  ];

  return (
    <section id="about" className="section relative z-10">
      <div className="container-custom" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left: Image + stats */}
          <motion.div variants={itemVariants} className="relative">
            {/* Image container */}
            <div className="relative w-full max-w-md mx-auto">
              {/* BG decoration */}
              <div className="absolute -inset-4 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(217,70,239,0.1) 100%)",
                }}
              />

              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5]">
                <Image
                  src="/Ahmed.png"
                  alt="Ahmed Ali"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 90vw, 400px"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03020d] via-transparent to-transparent opacity-60" />
              </div>

              {/* Status badge */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 glass-card px-4 py-2 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-white/80">Open to Work</span>
              </motion.div>

              {/* Language badges */}
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-3">
                <p className="text-xs text-white/40 mb-1 font-mono">Languages</p>
                <div className="flex gap-2">
                  {personalInfo.languages.map((lang) => (
                    <div key={lang.name} className="text-center">
                      <div className="text-xs font-semibold text-white/80">{lang.name}</div>
                      <div className="text-[10px] text-indigo-400 font-mono">{lang.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-3 mt-12">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="glass-card p-3 text-center"
                >
                  <div className="text-2xl font-bold gradient-text font-display">{stat.value}</div>
                  <div className="text-[10px] text-white/40 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div variants={itemVariants}>
              <span className="section-label">About Me</span>
              <h2 className="section-title mt-2 mb-6">
                Passionate Engineer,<br />Relentless Learner
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 text-white/65 leading-relaxed mb-8">
              {personalInfo.longBio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>

            {/* Info grid */}
            <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: "🎓", label: "University", value: "FAST NUCES" },
                { icon: "📚", label: "Degree", value: "BS Software Engineering" },
                { icon: "📅", label: "Year", value: "2022 – Present" },
                {
                  icon: "📍",
                  label: "Location",
                  value: personalInfo.location,
                },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 glass-card p-3"
                >
                  <span className="text-lg mt-0.5">{icon}</span>
                  <div>
                    <p className="text-[10px] text-white/35 uppercase tracking-wider font-mono">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-white/80">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Extracurriculars */}
            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-xs text-white/40 uppercase tracking-widest font-mono mb-3">
                Extracurriculars
              </p>
              <div className="flex flex-wrap gap-2">
                {personalInfo.extracurriculars.map(({ activity, icon }) => (
                  <span key={activity} className="tag-pill">
                    {icon} {activity}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Social + Resume */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-10 h-10 glass-card flex items-center justify-center text-white/50 hover:text-indigo-400 transition-colors rounded-full"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cosmic ml-2"
              >
                <FaDownload className="w-3 h-3 relative z-10" />
                <span>Download CV</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
