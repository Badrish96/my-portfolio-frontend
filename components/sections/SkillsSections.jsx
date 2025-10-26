"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function SkillsSection() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -400 : 400,
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
      {/* ✅ Dynamic Background for Light/Dark Theme */}
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

      {/* ✅ Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--bg)]/10 via-[var(--bg)]/20 to-[var(--bg)]/30 pointer-events-none"></div>

      {/* ✅ Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-[var(--fg)]">
          Technical <span className="text-[var(--primary)]">Skills</span>
        </h2>
        <p className="text-xl text-[var(--fg)] opacity-70 max-w-2xl mx-auto mb-12">
          Technologies and tools I use to bring ideas to life
        </p>

        {/* ✅ Carousel Section */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[var(--bg)]/60 backdrop-blur-md rounded-full p-2 hover:bg-[var(--primary)]/30 transition-all duration-300 z-20"
          >
            <ChevronLeftIcon className="w-6 h-6 text-[var(--fg)]" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-8"
          >
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[260px] flex-shrink-0 backdrop-blur-xl bg-white/70 dark:bg-white/5 rounded-2xl border border-[var(--primary)]/30 shadow-xl p-6 hover:border-[var(--primary)]/60 transition-all duration-500"
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-3">{skill.icon}</span>
                  <h3 className="text-lg font-semibold text-[var(--fg)] mb-1">
                    {skill.name}
                  </h3>
                  <span className="text-sm text-[var(--primary)] font-semibold mb-3">
                    {skill.level}%
                  </span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-[var(--primary)] to-[#0ea5e9]"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[var(--bg)]/60 backdrop-blur-md rounded-full p-2 hover:bg-[var(--primary)]/30 transition-all duration-300 z-20"
          >
            <ChevronRightIcon className="w-6 h-6 text-[var(--fg)]" />
          </button>
        </div>

        {/* Extra Skills */}
        <div className="mt-16 text-center">
          <h4 className="text-xl font-semibold mb-6 text-[var(--fg)]">
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
              <span
                key={i}
                className="px-4 py-2 text-sm rounded-full border border-[var(--primary)]/30 bg-[var(--bg)]/50 text-[var(--fg)] hover:border-[var(--primary)]/60 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
