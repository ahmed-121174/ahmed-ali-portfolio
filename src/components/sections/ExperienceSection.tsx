"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/config/personal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function ExperienceCard({
  role,
  company,
  period,
  type,
  color,
  bullets,
  index,
  isInView,
}: (typeof personalInfo.experience)[0] & { index: number; isInView: boolean }) {
  return (
    <motion.div
      variants={itemVariants}
      className="relative pl-12"
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
        className="absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
        style={{ background: color, boxShadow: `0 0 20px ${color}60` }}
      >
        {index + 1}
      </motion.div>

      {/* Card */}
      <div className="glass-card p-5 ml-2 group hover:border-white/15 transition-all">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-semibold text-white/90 text-base group-hover:text-white transition-colors font-display">
              {role}
            </h3>
            <p className="text-sm font-medium mt-0.5" style={{ color }}>
              {company}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: `${color}20`,
                color,
                border: `1px solid ${color}40`,
              }}
            >
              {type}
            </span>
            <span className="text-xs text-white/35 font-mono">{period}</span>
          </div>
        </div>

        {/* Bullets */}
        <ul className="space-y-1.5">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/55">
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function EducationCard({
  institution,
  degree,
  period,
  icon,
  index,
}: (typeof personalInfo.education)[0] & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="glass-card p-5 flex items-start gap-4"
    >
      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-white/90 font-display">{institution}</h3>
        <p className="text-sm text-indigo-400 mt-0.5">{degree}</p>
        <p className="text-xs text-white/35 font-mono mt-1">{period}</p>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section relative z-10">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">My Journey</span>
          <h2 className="section-title mt-2">Experience & Education</h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Experience Timeline */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-sm font-mono uppercase tracking-widest text-white/35 mb-8 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-white/20" />
              Work Experience
            </motion.h3>

            {/* Timeline line */}
            <div className="relative">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-3.5 top-8 w-px h-[calc(100%-2rem)] origin-top"
                style={{
                  background: "linear-gradient(to bottom, rgba(99,102,241,0.6), rgba(217,70,239,0.2), transparent)",
                }}
              />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-6"
              >
                {personalInfo.experience.map((exp, i) => (
                  <ExperienceCard key={exp.company + i} {...exp} index={i} isInView={isInView} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Education + FYP */}
          <div className="space-y-8">
            <div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="text-sm font-mono uppercase tracking-widest text-white/35 mb-6 flex items-center gap-3"
              >
                <span className="w-8 h-px bg-white/20" />
                Education
              </motion.h3>
              <div className="space-y-4">
                {personalInfo.education.map((edu, i) => (
                  <EducationCard key={edu.institution} {...edu} index={i} />
                ))}
              </div>
            </div>

            {/* FYP Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-indigo-500/25 p-5"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(217,70,239,0.05) 100%)",
              }}
            >
              {/* Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #6366f1, transparent)" }}
              />

              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🚀</span>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                    Final Year Project
                  </span>
                </div>
                <h4 className="font-bold text-white/90 font-display text-sm leading-snug mb-2">
                  DeceptiCloud: AI-Driven Cyber Deception System
                </h4>
                <p className="text-xs text-white/50 leading-relaxed mb-3">
                  Cloud-native honeypot platform with 14 adaptive deployments, 7-model ML pipeline, LLM responses, and blockchain ledger.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "PyTorch", "Docker", "K8s", "SIEM", "Flask"].map((tag) => (
                    <span key={tag} className="tag-pill text-[10px]">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
