"use client";

import { motion } from "framer-motion";

const experience = [
  {
    role: "Senior Software Developer",
    company: "Programming.com (Client: Appinventiv)",
    period: "Dec 2025 - Present",
    summary: "Engineering enterprise fintech and healthcare applications with React, Next.js, TypeScript, and Node.js.",
    highlights: ["Built loan origination and healthcare workflows", "Implemented OCR/KYC, role based access, multi-step forms, and i18n", "Improved Core Web Vitals with lazy loading, memoization, code splitting, and asset optimization"],
  },
  {
    role: "Senior Software Developer",
    company: "OneDAO",
    period: "June 2024 - Aug 2025",
    summary: "Architected a full stack fundraising platform for startups and investors across web and React Native mobile apps.",
    highlights: ["Implemented Auth0, JWT, and Google OAuth", "Designed PostgreSQL schemas and Node.js REST microservices", "Configured Azure DevOps CI/CD pipelines and mentored junior developers"],
  },
  {
    role: "Senior Software Developer",
    company: "Accenture (Client: Verizon)",
    period: "May 2020 - May 2023",
    summary: "Developed high traffic e-commerce platform modules for product catalog, checkout, and order management.",
    highlights: ["Built Angular and React Native interfaces over REST APIs", "Optimized rendering and resolved critical production issues", "Supported automated releases through CI/CD"],
  },
  {
    role: "Program Ready Trainer II",
    company: "Concentrix",
    period: "June 2016 - May 2020",
    summary: "Delivered technical training and troubleshooting support for AT&T broadband services.",
    highlights: ["Provided operational support and technical training", "Achieved 90%+ customer satisfaction scores"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-[var(--bg)] px-4 py-20 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--primary)]">Career journey</p>
          <h2 className="mt-3 text-5xl font-bold text-[var(--fg)] md:text-6xl">Professional <span className="text-[var(--primary)]">Experience</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-[var(--fg)] opacity-70">5+ years building products across fintech, healthcare, e-commerce, and developer platforms.</p>
        </div>

        <div className="relative ml-3 border-l border-[var(--primary)]/30 pl-8 md:ml-8 md:pl-12">
          {experience.map((item, index) => (
            <motion.article key={`${item.company}-${item.period}`} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="relative mb-8 rounded-2xl border border-[var(--primary)]/25 bg-white/80 p-6 shadow-xl backdrop-blur-xl last:mb-0 dark:bg-[#1f252c]">
              <span className="absolute -left-[2.65rem] top-8 h-4 w-4 rounded-full border-4 border-[var(--bg)] bg-[var(--primary)] md:-left-[3.15rem]" />
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start"><div><h3 className="text-xl font-bold text-[var(--fg)]">{item.role}</h3><p className="mt-1 font-medium text-[var(--primary)]">{item.company}</p></div><span className="text-sm text-[var(--fg)] opacity-60">{item.period}</span></div>
              <p className="mt-4 text-sm leading-6 text-[var(--fg)] opacity-80">{item.summary}</p>
              <ul className="mt-4 grid gap-2 text-sm text-[var(--fg)] opacity-70 md:grid-cols-3">{item.highlights.map((highlight) => <li key={highlight} className="flex gap-2"><span className="text-[var(--primary)]">•</span>{highlight}</li>)}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
