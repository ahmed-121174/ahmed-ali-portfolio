"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getLanguageColor, formatRelativeTime } from "@/lib/github";
import { FaStar, FaCodeBranch, FaGithub, FaExternalLinkAlt, FaSync } from "react-icons/fa";

interface Project {
  id: number | string;
  name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  language?: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  featured?: boolean;
  isManual?: boolean;
  tags?: string[];
}

type FilterType = "all" | "featured" | string;

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [totalRepos, setTotalRepos] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/github", { cache: "no-store" });
      const data = await res.json();
      setProjects(data.repos || []);
      setTotalRepos(data.totalRepos || 0);
      setLastUpdated(data.lastUpdated);
      if (data.error) setError(data.error);
    } catch {
      setError("Failed to load projects. Showing cached data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Get unique languages for filter
  const languages = Array.from(
    new Set(projects.map((p) => p.language).filter(Boolean) as string[])
  ).slice(0, 6);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All Projects" },
    { key: "featured", label: "⭐ Featured" },
    ...languages.map((lang) => ({ key: lang, label: lang })),
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "featured") return p.featured;
    return p.language === filter;
  });

  return (
    <section id="projects" className="section relative z-10">
      <div className="container-custom" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="section-label">My Work</span>
          <h2 className="section-title mt-2">Projects</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Dynamically fetched from GitHub. {totalRepos > 0 && `${totalRepos} public repositories found.`}
          </p>
        </motion.div>

        {/* GitHub link + refresh */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <FaGithub className="w-4 h-4" />
            <span className="font-mono">@ahmed-121174</span>
          </a>
          {lastUpdated && (
            <>
              <span className="text-white/20">·</span>
              <span className="text-xs text-white/30 font-mono">
                Updated {formatRelativeTime(lastUpdated)}
              </span>
            </>
          )}
          <button
            onClick={fetchProjects}
            className="w-7 h-7 rounded-full glass-card flex items-center justify-center text-white/40 hover:text-white/80 transition-colors"
            aria-label="Refresh projects"
            title="Refresh"
          >
            <FaSync className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
          </button>
        </motion.div>

        {/* Error banner */}
        {error && (
          <div className="mb-6 px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 text-sm text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                filter === key
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                  : "glass-card text-white/50 hover:text-white/80"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass-card p-5 h-48 animate-pulse">
                <div className="h-4 bg-white/5 rounded mb-3 w-3/4" />
                <div className="h-3 bg-white/5 rounded mb-2 w-full" />
                <div className="h-3 bg-white/5 rounded mb-2 w-5/6" />
                <div className="h-3 bg-white/5 rounded w-4/6" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} isInView={isInView} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="text-center py-16 text-white/40">
            <div className="text-4xl mb-4">🔭</div>
            <p>No projects found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) {
  const langColor = project.language ? getLanguageColor(project.language) : "#6366f1";
  const tags = project.tags || project.topics?.slice(0, 4) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="relative group"
    >
      {/* Featured indicator */}
      {project.featured && (
        <div
          className="absolute -top-px inset-x-0 h-0.5 rounded-t-2xl"
          style={{ background: "linear-gradient(90deg, #6366f1, #d946ef)" }}
        />
      )}

      <div className="glass-card h-full p-5 flex flex-col group-hover:border-indigo-500/30 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${langColor}20` }}>
              <FaGithub className="w-4 h-4" style={{ color: langColor }} />
            </div>
            <h3 className="font-semibold text-white/90 text-sm truncate group-hover:text-white transition-colors font-display">
              {project.name}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 rounded flex items-center justify-center text-white/30 hover:text-indigo-400 transition-colors"
                aria-label="Live demo"
              >
                <FaExternalLinkAlt className="w-3 h-3" />
              </a>
            )}
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 rounded flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
              aria-label="GitHub repository"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-white/50 leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.description || "No description provided."}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <span key={tag} className="tag-pill text-[10px]">{tag}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-3 text-xs text-white/35">
            {project.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: langColor }}
                />
                {project.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <FaStar className="w-3 h-3" />
              {project.stargazers_count}
            </span>
            <span className="flex items-center gap-1">
              <FaCodeBranch className="w-3 h-3" />
              {project.forks_count}
            </span>
          </div>
          <span className="text-[10px] text-white/25 font-mono">
            {formatRelativeTime(project.updated_at)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
