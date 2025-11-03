"use client";

import { motion } from "framer-motion";
import {
  HomeIcon,
  UserIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

import TopBlogs from "../../../components/sections/TopBlogs";
import Header from "../../../components/layout/Header";
import BlogsSection from "../../../components/sections/BlogsSection";

export default function DashboardPage() {
  const navigationItems = [
    { name: "Home", icon: HomeIcon, href: "#home", active: false },
    { name: "About", icon: UserIcon, href: "#about", active: false },
    { name: "Skills", icon: CodeBracketIcon, href: "#skills", active: false },
    { name: "Projects", icon: BriefcaseIcon, href: "#projects", active: false },
    { name: "Blog", icon: BookOpenIcon, href: "#blog", active: true },
    { name: "Contact", icon: EnvelopeIcon, href: "#contact", active: false },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors duration-200">
      <Header />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="col-span-12 lg:col-span-2">
            <div className="sticky top-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="backdrop-blur-xl bg-white/80 dark:bg-[#1f252c] rounded-2xl border border-[var(--primary)]/30 shadow-xl p-4"
              >
                <nav className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        item.active
                          ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30"
                          : "text-[var(--fg)] hover:bg-[var(--primary)]/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium hidden xl:block">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </nav>
              </motion.div>
            </div>
          </div>

          {/* Middle - Blog Posts Feed */}
          <BlogsSection />

          {/* Right Sidebar - Top Blogs */}
          <TopBlogs />
        </div>
      </div>
    </div>
  );
}
