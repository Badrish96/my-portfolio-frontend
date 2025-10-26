"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CodeBracketIcon,
  CalendarIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      title: "OneDAO - Fintech Fundraising Platform",
      period: "June 2024 – Aug 2025",
      description: "A comprehensive fundraising platform enabling startups to raise funds from global investors through web and mobile applications.",
      image: "/images/onedao-project.jpg",
      category: "Full Stack",
      technologies: [
        "React.js",
        "React Native",
        "Spring Boot",
        "PostgreSQL",
        "Auth0",
        "Azure DevOps",
        "JWT",
        "Microservices"
      ],
      highlights: [
        "Built responsive web platform using React.js (Vite) and mobile app with React Native",
        "Designed Spring Boot microservices for authentication, user management, and campaign workflows",
        "Integrated Google SSO with Auth0 and custom JWT-based authentication",
        "Developed scalable PostgreSQL database schema for complex seeker-investor relationships",
        "Implemented Azure DevOps CI/CD pipelines for seamless deployments",
        "Leading technical architecture and mentoring development team"
      ],
      liveLink: "#",
      githubLink: "#",
      featured: true
    },
    {
      title: "Verizon E-commerce Platform",
      period: "May 2020 – May 2023",
      description: "Enterprise-level e-commerce platform for Verizon, handling product catalog, user accounts, and order management.",
      image: "/images/verizon-project.jpg",
      category: "Full Stack",
      technologies: [
        "Spring Boot",
        "Angular",
        "React Native",
        "REST APIs",
        "Azure DevOps",
        "AWS",
        "Microservices"
      ],
      highlights: [
        "Developed web and mobile apps for Verizon's e-commerce platform",
        "Built and integrated REST APIs for product catalog, user accounts, and order management",
        "Improved system scalability through microservice-based architecture",
        "Streamlined CI/CD pipelines and resolved production issues",
        "Collaborated with cross-functional teams to enhance user experience",
        "Optimized performance to support 10,000+ concurrent users"
      ],
      liveLink: "#",
      featured: true
    },
    {
      title: "Social Media App",
      period: "Personal Project",
      description: "Full-stack social media application with real-time interactions, user authentication, and modern UI/UX design.",
      image: "/images/social-media-project.jpg",
      category: "Full Stack",
      technologies: [
        "React.js",
        "Node.js",
        "MongoDB",
        "JWT",
        "Express",
        "REST APIs"
      ],
      highlights: [
        "Built full-stack social media app with user authentication, posts, likes, and comments",
        "Developed backend APIs using Node.js and MongoDB with Express framework",
        "Integrated secure JWT authentication and data handling for user profiles",
        "Implemented real-time updates and responsive React.js frontend",
        "Deployed on cloud hosting with GitHub version control",
        "Set up CI/CD integration for automated deployments"
      ],
      liveLink: "#",
      githubLink: "#",
      featured: false
    }
  ];

  const categories = ["All", "Full Stack", "Frontend", "Mobile", "Backend"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section className="relative py-20 bg-[var(--bg)] transition-colors duration-200">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[var(--fg)]">
            Featured <span className="text-[var(--primary)]">Projects</span>
          </h2>
          <p className="text-xl text-[var(--fg)] opacity-70 max-w-2xl mx-auto">
            Real-world applications and solutions I've built throughout my career
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? "bg-[var(--primary)] text-white shadow-lg scale-105"
                  : "bg-white/10 dark:bg-white/5 text-[var(--fg)] border border-[var(--primary)]/30 hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className={`group backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl overflow-hidden hover:border-[var(--primary)]/60 hover:shadow-2xl transition-all duration-500 ${
                project.featured ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-[var(--primary)]/20 to-blue-500/20 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <CodeBracketIcon className="w-20 h-20 text-[var(--primary)]/30" />
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-[var(--primary)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Title & Period */}
                <h3 className="text-xl font-bold text-[var(--fg)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[var(--fg)] opacity-60 mb-3">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{project.period}</span>
                </div>

                {/* Description */}
                <p className="text-[var(--fg)] opacity-80 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1 text-xs rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Key Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-[var(--fg)] mb-2 flex items-center gap-2">
                    <TagIcon className="w-4 h-4 text-[var(--primary)]" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-1">
                    {project.highlights.slice(0, 3).map((highlight, i) => (
                      <li key={i} className="text-xs text-[var(--fg)] opacity-70 flex items-start gap-2">
                        <span className="text-[var(--primary)] mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-12">
           <Link href="https://github.com/Badrish96" target="blank" className="px-8 py-3 bg-gradient-to-r from-[var(--primary)] to-blue-500 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
            View All Projects on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}