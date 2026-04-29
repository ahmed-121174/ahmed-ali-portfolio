"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/config/personal";

type SkillCategory = "languages" | "frameworks" | "tools" | "domains";

const categories: { key: SkillCategory; label: string; emoji: string }[] = [
  { key: "languages", label: "Languages", emoji: "💻" },
  { key: "frameworks", label: "Frameworks & Libs", emoji: "🧩" },
  { key: "tools", label: "Tools & Platforms", emoji: "🔧" },
  { key: "domains", label: "Domains", emoji: "🌐" },
];

function SkillBar({
  name,
  level,
  icon,
  delay,
  isInView,
}: {
  name: string;
  level: number;
  icon?: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-sm">{icon}</span>}
          <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
        <span className="text-xs font-mono text-indigo-400">{level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: delay,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </div>
    </div>
  );
}

function DomainCard({ name, icon, delay, isInView }: { name: string; icon: string; delay: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="glass-card p-4 text-center cursor-default"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-sm font-medium text-white/75">{name}</div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("languages");

  const currentSkills = personalInfo.skills[activeCategory];

  return (
    <section id="skills" className="section relative z-10">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Technical Arsenal</span>
          <h2 className="section-title mt-2">Skills & Expertise</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            A curated stack built through internships, research, and building
            production-grade systems.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === key
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                  : "glass-card text-white/55 hover:text-white/80"
              }`}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </motion.div>

        {/* Skills content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {activeCategory === "domains" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {(currentSkills as typeof personalInfo.skills.domains).map(
                  ({ name, icon }, i) => (
                    <DomainCard
                      key={name}
                      name={name}
                      icon={icon}
                      delay={i * 0.07}
                      isInView={isInView}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {(
                  currentSkills as Array<{
                    name: string;
                    level: number;
                    icon?: string;
                  }>
                ).map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                    delay={i * 0.07}
                    isInView={isInView}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-center text-lg font-semibold text-white/70 mb-8 font-display">
            🏆 Certifications & Achievements
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {personalInfo.certifications.map(({ name, issuer, icon }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="glass-card p-4 flex items-start gap-3 group hover:border-indigo-500/40 transition-all"
              >
                <span className="text-2xl">{icon}</span>
                <div>
                  <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug">
                    {name}
                  </p>
                  <p className="text-xs text-indigo-400 mt-0.5 font-mono">{issuer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
