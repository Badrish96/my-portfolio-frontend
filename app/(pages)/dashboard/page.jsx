"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HomeIcon,
  SparklesIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

import Header from "../../../components/layout/Header";
import { useLoading } from "../../../components/ui/LoadingProvider";

const defaultJobs = [
  { title: "Senior Frontend Engineer", company: "TechNova", location: "Remote", match: 94, stage: "Shortlisted" },
  { title: "React Developer", company: "PixelForge", location: "Gurugram", match: 88, stage: "Under review" },
  { title: "Full Stack Engineer", company: "CloudNest", location: "Bengaluru", match: 81, stage: "Saved" },
  { title: "Next.js Developer", company: "DigitalOrbit", location: "Remote", match: 76, stage: "Ready to apply" },
];

export default function DashboardPage() {
  const [jobs, setJobs] = useState(defaultJobs);
  const [loading, setLoading] = useState(false);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const loadJobs = async () => {
      try {
        setLoading(true);
        startLoading();
        const response = await fetch(`${apiBase}/api/jobs`);
        if (!response.ok) throw new Error("Fetch failed");
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) setJobs(data);
      } catch (error) {
        console.log("Using demo AI job data", error);
      } finally {
        setLoading(false);
        stopLoading();
      }
    };

    loadJobs();
  }, []);

  const navigationItems = [
    { name: "Overview", icon: HomeIcon, active: true },
    { name: "AI Matches", icon: SparklesIcon, active: false },
    { name: "Applications", icon: BriefcaseIcon, active: false },
    { name: "Resume", icon: PaperClipIcon, active: false },
    { name: "Analytics", icon: ChartBarIcon, active: false },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors duration-200">
      <Header />
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
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
                      href="#"
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        item.active
                          ? "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30"
                          : "text-[var(--fg)] hover:bg-[var(--primary)]/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium hidden xl:block">{item.name}</span>
                    </a>
                  ))}
                </nav>
              </motion.div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--primary)]">AI Job Hunt</p>
                  <h1 className="mt-2 text-3xl font-bold text-[var(--fg)]">Application Dashboard</h1>
                </div>
                <button className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-[var(--primary)]/20 transition hover:opacity-90">Discover Jobs</button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <StatCard label="Jobs found" value="128" />
                <StatCard label="Shortlisted" value="36" />
                <StatCard label="Match score" value="92%" />
              </div>
            </motion.div>

            <div className="rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[var(--fg)]">Recommended jobs</h2>
                <span className="text-sm text-[var(--primary)]">{loading ? "Refreshing..." : "Live matches"}</span>
              </div>

              <div className="space-y-4">
                {jobs.map((job, index) => (
                  <div key={`${job.title}-${index}`} className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg)] p-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[var(--fg)]">{job.title}</h3>
                        <p className="text-sm text-[var(--fg)]/70">{job.company} • {job.location}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-sm font-medium text-[var(--primary)]">{job.match}% match</span>
                        <span className="rounded-full border border-[var(--primary)]/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--fg)]">{job.stage}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]"
            >
              <div className="flex items-center gap-2">
                <ArrowTrendingUpIcon className="h-5 w-5 text-[var(--primary)]" />
                <h3 className="text-lg font-semibold text-[var(--fg)]">AI Summary</h3>
              </div>

              <div className="mt-5 space-y-4">
                <InsightRow label="Strongest fit" value="Frontend + React" />
                <InsightRow label="Missing skills" value="System design" />
                <InsightRow label="Next action" value="Tailor resume" />
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircleIcon className="h-5 w-5" />
                  <span className="font-medium">Ready for application</span>
                </div>
                <p className="mt-2 text-sm text-[var(--fg)]/80">4 candidates match your profile and are ready for tailored outreach.</p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg)] p-4">
      <p className="text-sm text-[var(--fg)]/70">{label}</p>
      <p className="mt-2 text-2xl font-bold text-[var(--fg)]">{value}</p>
    </div>
  );
}

function InsightRow({ label, value }) {
  return (
    <div className="rounded-xl border border-[var(--primary)]/15 bg-[var(--bg)] p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--fg)]/60">{label}</p>
      <p className="mt-2 text-sm font-medium text-[var(--fg)]">{value}</p>
    </div>
  );
}
