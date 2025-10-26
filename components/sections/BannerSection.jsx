"use client";

import React from 'react';
import HeroScene from '../three/HeroScene';

export default function BannerSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg)] transition-colors duration-200">
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-100">
        <HeroScene />
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full py-20">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 tracking-tight text-[var(--primary)]">
          Full Stack Developer
        </h1>
        <p className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto text-[var(--fg)]">
          Building scalable web & mobile applications with modern technologies
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-16">
          <div className="lg:col-span-4 backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-3xl p-8 border border-[var(--primary)]/30 shadow-2xl hover:border-[var(--primary)]/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-[var(--primary)]/30">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#0ea5e9] flex items-center justify-center text-5xl shadow-lg shadow-[var(--primary)]/30">
              👨‍💻
            </div>
            <h3 className="text-3xl font-bold mb-2 text-[var(--fg)]">
              Hey, I'm <span className="text-[var(--primary)]">Badrish</span>
            </h3>
            <p className="text-lg mb-6 font-medium text-[var(--fg)]">Full-Stack Developer & Technical Lead</p>
            
            <div className="space-y-3 text-left mb-6 text-[var(--fg)]">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-colors">
                <span className="text-xl">📧</span>
                <span className="text-sm">badrishchoubeystar@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-colors">
                <span className="text-xl">📍</span>
                <span className="text-sm">Gurugram, India</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-colors">
                <span className="text-xl">💼</span>
                <span className="text-sm">Technical Lead @ OneDAO</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-colors">
                <span className="text-xl">📱</span>
                <span className="text-sm">+91 9540840758</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                Download CV
              </button>
              <a 
                href="https://github.com/Badrish96" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 border border-[var(--primary)]/30 text-[var(--fg)]"
              >
                <span className="text-xl">💻</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-3xl p-10 border border-[var(--primary)]/30 shadow-2xl hover:border-[var(--primary)]/60 transition-all duration-500">
            <div className="text-left">
              <p className="text-sm mb-2 font-mono text-[var(--fg)] opacity-50">&lt;h1&gt;</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-[var(--fg)]">
                Crafting Digital Experiences That{' '}
                <span className="text-[var(--primary)]">Scale</span>
              </h2>
              <p className="text-sm mb-6 font-mono text-[var(--fg)] opacity-50">&lt;/h1&gt;</p>
              
              <p className="mb-6 text-lg leading-relaxed text-[var(--fg)]">
                4+ years of experience building scalable web and mobile applications. Specialized in React.js, React Native, Spring Boot microservices, and cloud deployment.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-4 py-2 border rounded-full text-sm font-medium bg-[var(--primary)]/10 border-[var(--primary)]/40 text-[var(--primary)]">React.js</span>
                <span className="px-4 py-2 border rounded-full text-sm font-medium bg-[var(--primary)]/10 border-[var(--primary)]/40 text-[var(--primary)]">React Native</span>
                <span className="px-4 py-2 border rounded-full text-sm font-medium bg-[var(--primary)]/10 border-[var(--primary)]/40 text-[var(--primary)]">Spring Boot</span>
                <span className="px-4 py-2 border rounded-full text-sm font-medium bg-[var(--primary)]/10 border-[var(--primary)]/40 text-[var(--primary)]">Microservices</span>
                <span className="px-4 py-2 border rounded-full text-sm font-medium bg-[var(--primary)]/10 border-[var(--primary)]/40 text-[var(--primary)]">Angular</span>
                <span className="px-4 py-2 border rounded-full text-sm font-medium bg-[var(--primary)]/10 border-[var(--primary)]/40 text-[var(--primary)]">PostgreSQL</span>
              </div>

              <button className="px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 text-lg shadow-lg hover:shadow-xl hover:scale-105 text-white bg-gradient-to-r from-[var(--primary)] to-[#0ea5e9] hover:from-[var(--primary)]/90 hover:to-[#0ea5e9]/90">
                Let's Build Something Amazing
                <span className="text-2xl">💬</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-3xl p-8 border border-[var(--primary)]/30 shadow-2xl hover:border-[var(--primary)]/60 transition-all duration-500 hover:scale-[1.02] group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-6xl font-black group-hover:scale-110 transition-transform text-[var(--primary)]">4+</h3>
                <span className="text-3xl">⚡</span>
              </div>
              <p className="font-medium text-lg text-[var(--fg)]">Years of Experience</p>
              <p className="text-sm mt-2 text-[var(--fg)] opacity-60">Leading teams & delivering solutions</p>
            </div>

            <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-3xl p-8 border border-[var(--primary)]/30 shadow-2xl hover:border-[var(--primary)]/60 transition-all duration-500 hover:scale-[1.02] group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-6xl font-black group-hover:scale-110 transition-transform text-[var(--primary)]">10+</h3>
                <span className="text-3xl">🚀</span>
              </div>
              <p className="font-medium text-lg text-[var(--fg)]">Tech Stack</p>
              <p className="text-sm mt-2 text-[var(--fg)] opacity-60">Frontend, Backend & DevOps</p>
            </div>

            <div className="backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-3xl p-8 border border-[var(--primary)]/30 shadow-2xl hover:border-[var(--primary)]/60 transition-all duration-500 hover:scale-[1.02] group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-6xl font-black group-hover:scale-110 transition-transform text-[var(--primary)]">10K+</h3>
                <span className="text-3xl">👥</span>
              </div>
              <p className="font-medium text-lg text-[var(--fg)]">Concurrent Users</p>
              <p className="text-sm mt-2 text-[var(--fg)] opacity-60">Optimized performance</p>
            </div>
          </div>
        </div>

        <div className="mt-16 backdrop-blur-xl bg-white/80 dark:bg-white/5 rounded-3xl p-8 border border-[var(--primary)]/30 shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-[var(--fg)]">Recent Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-[var(--primary)]/20 hover:border-[var(--primary)]/50 transition-all hover:shadow-lg">
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="font-bold mb-2 text-[var(--fg)]">Technical Lead @ OneDAO</h4>
              <p className="text-sm text-[var(--fg)] opacity-70">Leading fintech platform development with React, Spring Boot & Web3 integration</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-[var(--primary)]/20 hover:border-[var(--primary)]/50 transition-all hover:shadow-lg">
              <div className="text-3xl mb-3">🎓</div>
              <h4 className="font-bold mb-2 text-[var(--fg)]">Pursuing MCA</h4>
              <p className="text-sm text-[var(--fg)] opacity-70">Lovely Professional University - Continuous learning & growth</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-[var(--primary)]/20 hover:border-[var(--primary)]/50 transition-all hover:shadow-lg">
              <div className="text-3xl mb-3">⚙️</div>
              <h4 className="font-bold mb-2 text-[var(--fg)]">Performance Optimization</h4>
              <p className="text-sm text-[var(--fg)] opacity-70">Improved API response times by 30% through debugging & caching</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}