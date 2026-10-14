"use client";

import React, { memo, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CodeBracketIcon, CalendarIcon, TagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const projects = [
  {
    title: "Sammaan Capital - Loan Origination Platform",
    period: "Dec 2025 - Present",
    description: "Enterprise loan origination platform supporting customer onboarding, OCR based KYC verification, and application lifecycle workflows.",
    category: "Full Stack",
    technologies: ["React.js", "Next.js", "TypeScript", "React Hook Form", "Zod", "Node.js", "Azure DevOps", "Cursor IDE", "GitHub Copilot"],
    highlights: [
      "Built customer onboarding and loan processing workflows with complex validation rules",
      "Integrated OCR based KYC verification with client-side image compression",
      "Created role-based dashboards for lead allocation and workflow tracking",
      "Optimized frontend performance and API communication for enterprise workflows",
    ],
    featured: true,
  },
  {
    title: "Ponteo - Healthcare Platform",
    period: "Dec 2025 - Present",
    description: "Enterprise healthcare platform with scalable workflows, responsive UI modules, and optimized frontend API communication.",
    category: "Frontend",
    technologies: ["React.js", "Next.js", "TypeScript", "Redux Toolkit", "Node.js", "REST APIs", "Tailwind CSS"],
    highlights: [
      "Built scalable healthcare workflows and reusable responsive UI modules",
      "Improved frontend API communication across complex application flows",
      "Applied component driven architecture to reduce duplicated implementation",
      "Used AI assisted development tools to accelerate delivery and improve code quality",
    ],
    featured: true,
  },
  {
    title: "OneDAO - Fintech Fundraising Platform",
    period: "June 2024 - Aug 2025",
    description: "Full stack fundraising platform connecting startups and investors through web and React Native mobile applications.",
    category: "Full Stack",
    technologies: ["React.js", "React Native", "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Auth0", "Redis"],
    highlights: [
      "Built web and React Native experiences for startup and investor workflows",
      "Implemented Auth0, JWT, and Google OAuth for secure single sign on",
      "Designed PostgreSQL schemas and REST microservices for platform data",
      "Configured Azure DevOps CI/CD pipelines and mentored junior developers",
    ],
    featured: true,
  },
  {
    title: "Verizon E-commerce Platform",
    period: "May 2020 - May 2023",
    description: "Enterprise e-commerce platform for Verizon covering product catalog, checkout, accounts, and order management.",
    category: "Full Stack",
    technologies: ["Angular", "React Native", "TypeScript", "Node.js", "REST APIs", "Azure DevOps", "AWS", "Microservices"],
    highlights: [
      "Developed web and mobile applications for Verizon's e-commerce platform",
      "Built product catalog, checkout, and order management modules",
      "Consumed REST APIs within a microservices architecture",
      "Wrote automated tests, resolved production bugs, and automated releases",
    ],
    featured: true,
  },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const categories = ["All", "Full Stack", "Frontend", "Mobile", "Backend"];
  const filteredProjects = useMemo(() => activeFilter === "All" ? projects : projects.filter((project) => project.category === activeFilter), [activeFilter]);
  const selectFilter = useCallback((category) => setActiveFilter(category), []);

  return (
    <section className="relative bg-[var(--bg)] py-20 transition-colors duration-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-5xl font-bold text-[var(--fg)] md:text-6xl">Featured <span className="text-[var(--primary)]">Projects</span></h2>
          <p className="mx-auto max-w-2xl text-xl text-[var(--fg)] opacity-70">Enterprise products and platforms I have built across fintech, healthcare, and e-commerce.</p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button key={category} onClick={() => selectFilter(category)} className={`rounded-full px-6 py-2 font-medium transition-all duration-300 ${activeFilter === category ? "scale-105 bg-[var(--primary)] text-white shadow-lg" : "border border-[var(--primary)]/30 bg-white/10 text-[var(--fg)] hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/10 dark:bg-white/5"}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} />)}
        </div>

        <div className="mt-12 text-center"><Link href="https://github.com/Badrish96" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-r from-[var(--primary)] to-blue-500 px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-xl">View All Projects on GitHub</Link></div>
      </div>
    </section>
  );
}

const ProjectCard = memo(function ProjectCard({ project, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} viewport={{ once: true }} className="group overflow-hidden rounded-2xl border border-[var(--primary)]/30 bg-white/80 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-[var(--primary)]/60 hover:shadow-2xl dark:bg-[#1f252c]">
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--primary)]/20 to-blue-500/20">
        <CodeBracketIcon className="h-20 w-20 text-[var(--primary)]/30" />
        {project.featured && <div className="absolute right-4 top-4 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white">Featured</div>}
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-[var(--fg)] transition-colors group-hover:text-[var(--primary)]">{project.title}</h3>
        <div className="mb-3 flex items-center gap-2 text-sm text-[var(--fg)] opacity-60"><CalendarIcon className="h-4 w-4" /><span>{project.period}</span></div>
        <p className="mb-4 line-clamp-2 text-sm text-[var(--fg)] opacity-80">{project.description}</p>
        <div className="mb-4 flex flex-wrap gap-2">{project.technologies.slice(0, 4).map((tech) => <span key={tech} className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs text-[var(--primary)]">{tech}</span>)}{project.technologies.length > 4 && <span className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-xs text-[var(--primary)]">+{project.technologies.length - 4} more</span>}</div>
        <div><h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--fg)]"><TagIcon className="h-4 w-4 text-[var(--primary)]" />Key Highlights</h4><ul className="space-y-1">{project.highlights.slice(0, 3).map((highlight) => <li key={highlight} className="flex items-start gap-2 text-xs text-[var(--fg)] opacity-70"><span className="mt-1 text-[var(--primary)]">•</span><span>{highlight}</span></li>)}</ul></div>
      </div>
    </motion.div>
  );
});
