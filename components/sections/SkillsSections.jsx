"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SkillsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const skills = [
    { name: "React.js", level: 95, icon: "⚛️" },
    { name: "Next.js", level: 90, icon: "▲" },
    { name: "React Native", level: 88, icon: "📱" },
    { name: "Angular", level: 85, icon: "🅰️" },
    { name: "Redux / NgRx", level: 85, icon: "🔄" },
    { name: "Tailwind CSS", level: 92, icon: "🎨" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "Spring Boot", level: 90, icon: "☕" },
    { name: "PostgreSQL", level: 88, icon: "🐘" },
    { name: "MongoDB", level: 85, icon: "🍃" },
    { name: "AWS", level: 80, icon: "☁️" },
    { name: "GitHub", level: 95, icon: "📦" },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Dynamic Background for Light/Dark Theme */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/light-skills-backgroundImg.jpg"
          alt="Skills background light"
          fill
          loading="lazy"
          quality={70}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          sizes="100vw"
          priority={false}
          className="opacity-60 dark:hidden"
        />
        <Image
          src="/images/skills-backgroundImg.jpg"
          alt="Skills background dark"
          fill
          loading="lazy"
          quality={70}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
          sizes="100vw"
          priority={false}
          className="opacity-30 hidden dark:block"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg)]/10 via-[var(--bg)]/20 to-[var(--bg)]/30 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[var(--fg)]">
          Technical <span className="text-[var(--primary)]">Skills</span>
        </h2>
        <p className="text-xl text-[var(--fg)] opacity-70 max-w-2xl mx-auto mb-12">
          Technologies and tools I use to bring ideas to life
        </p>

        {/* Tailwind CSS Carousel Section */}
        <div className="relative group">
          {/* Left Navigation Button */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-[var(--primary)]/20 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronLeftIcon className="w-6 h-6 text-[var(--fg)]" />
          </button>

          {/* Carousel Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory px-8 pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="min-w-[280px] flex-shrink-0 snap-center backdrop-blur-xl bg-white/70 dark:bg-white/5 rounded-2xl border border-[var(--primary)]/30 shadow-xl p-6 hover:border-[var(--primary)]/60 hover:shadow-2xl hover:scale-105 transition-all duration-500"
              >
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-4">{skill.icon}</span>
                  <h3 className="text-xl font-bold text-[var(--fg)] mb-2">
                    {skill.name}
                  </h3>
                  <span className="text-sm text-[var(--primary)] font-semibold mb-4">
                    Proficiency: {skill.level}%
                  </span>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-[var(--primary)] to-blue-500 shadow-lg"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Navigation Button */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-3 shadow-lg hover:bg-[var(--primary)]/20 hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronRightIcon className="w-6 h-6 text-[var(--fg)]" />
          </button>
        </div>

        {/* Extra Skills */}
        <div className="mt-16 text-center">
          <h4 className="text-2xl font-semibold mb-6 text-[var(--fg)]">
            Also Experienced With
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "TypeScript",
              "JavaScript",
              "HTML5",
              "CSS3",
              "SCSS",
              "Bootstrap",
              "Material UI",
              "Web3",
              "Blockchain",
              "Kubernetes",
            ].map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="px-5 py-2 text-sm font-medium rounded-full border border-[var(--primary)]/30 bg-[var(--bg)]/50 backdrop-blur-sm text-[var(--fg)] hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/10 hover:scale-110 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}