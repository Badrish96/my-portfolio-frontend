"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { HomeIcon, SparklesIcon, BriefcaseIcon, CheckCircleIcon, ChartBarIcon, ArrowTrendingUpIcon, PaperClipIcon, PlusIcon, ArrowPathIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Header from "../../../components/layout/Header";
import JobAssistant from "../../../components/dashboard/JobAssistant";
import { useLoading } from "../../../components/ui/LoadingProvider";
import { selectAuth } from "../../../lib/store/authSlice";

const EMPTY_SUMMARY = { jobsDiscovered: 0, applications: 0, shortlisted: 0, interviews: 0, readyForReview: 0 };
const EMPTY_JOB_FORM = { title: "", company: "", location: "", description: "", requiredSkills: "", applicationUrl: "" };
const navigationItems = [
  { name: "Overview", icon: HomeIcon, active: true },
  { name: "Job Assistant", icon: ChatBubbleLeftRightIcon, active: false },
  { name: "AI Matches", icon: SparklesIcon, active: false },
  { name: "Applications", icon: BriefcaseIcon, active: false },
  { name: "Resume", icon: PaperClipIcon, active: false },
  { name: "Analytics", icon: ChartBarIcon, active: false },
];

export default function DashboardPage() {
  const router = useRouter();
  const { token, hydrated, user } = useSelector(selectAuth);
  const { startLoading, stopLoading } = useLoading();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState(EMPTY_JOB_FORM);
  const [processingJobId, setProcessingJobId] = useState(null);
  const [discovering, setDiscovering] = useState(false);
  const [discoveringCareers, setDiscoveringCareers] = useState(false);
  const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const request = useCallback(async (path, options = {}) => {
    const response = await fetch(`${apiBase}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "The request failed.");
    return data;
  }, [apiBase, token]);

  const refreshDashboard = useCallback(async () => {
    if (!token) return;
    setLoading(true); setError(""); startLoading();
    try {
      const [suggestionsResponse, jobsResponse, summaryResponse, applicationsResponse] = await Promise.all([
        request("/api/jobs/suggestions"), request("/api/jobs"), request("/api/jobs/summary"), request("/api/applications"),
      ]);
      const suggestions = Array.isArray(suggestionsResponse.suggestions) ? suggestionsResponse.suggestions : [];
      const discoveredJobs = Array.isArray(jobsResponse.jobs) ? jobsResponse.jobs : [];
      const loadedApplications = Array.isArray(applicationsResponse.applications) ? applicationsResponse.applications : [];
      const submittedJobIds = new Set(
        loadedApplications
          .filter((application) => application.status === "submitted")
          .map((application) => application.job?.id)
          .filter(Boolean),
      );
      const submittedJobKeys = new Set(
        loadedApplications
          .filter((application) => application.status === "submitted" && application.job)
          .map((application) => `${normalizeJobText(application.job.company)}::${normalizeJobText(application.job.title)}`),
      );
      const preferredLocations = Array.isArray(user?.preferredLocations) ? user.preferredLocations : [];
      const allowedSuggestions = suggestions.filter((job) => isAllowedJobLocation(job.location, preferredLocations) && isDisplayableJob(job));
      const allowedDiscoveredJobs = discoveredJobs.filter((job) => isAllowedJobLocation(job.location, preferredLocations) && isDisplayableJob(job));
      // Keep every allowed job returned by the jobs endpoint, then overlay any
      // AI match data returned by suggestions. Previously, the presence of one
      // old suggestion hid newly imported jobs from the dashboard entirely.
      const displayedJobs = deduplicateJobs([...allowedDiscoveredJobs, ...allowedSuggestions]
        .filter((job) => !submittedJobIds.has(job.id)
          && !submittedJobKeys.has(`${normalizeJobText(job.company)}::${normalizeJobText(job.title)}`)));
      setJobs(displayedJobs);
      setSummary({ ...EMPTY_SUMMARY, ...(summaryResponse.summary || {}), jobsDiscovered: displayedJobs.length });
      setApplications(loadedApplications);
    } catch (requestError) {
      setError(requestError.message); setJobs([]); setApplications([]); setSummary(EMPTY_SUMMARY);
    } finally { setLoading(false); stopLoading(); }
  }, [request, startLoading, stopLoading, token, user?.preferredLocations]);

  useEffect(() => {
    if (!hydrated) return;
    if (!token) { router.replace("/login"); return; }
    refreshDashboard();
  }, [hydrated, refreshDashboard, router, token]);

  useEffect(() => {
    if (!token) return undefined;
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refreshDashboard();
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => document.removeEventListener("visibilitychange", refreshWhenVisible);
  }, [refreshDashboard, token]);

  const topMatch = useMemo(() => jobs.find((job) => job.match?.matchScore !== undefined) || jobs[0], [jobs]);
  const visibleJobs = useMemo(() => activeTab === "ai-matches" ? jobs.filter((job) => job.match) : jobs, [activeTab, jobs]);

  const updateApplication = useCallback(async (applicationId, updates) => {
    setError(""); setNotice(""); startLoading();
    try {
      await request(`/api/applications/${applicationId}`, { method: "PATCH", body: JSON.stringify(updates) });
      setNotice("Application updated.");
      await refreshDashboard();
    } catch (requestError) { setError(requestError.message); }
    finally { stopLoading(); }
  }, [refreshDashboard, request, startLoading, stopLoading]);

  const handleJobAction = useCallback(async (job, action) => {
    setProcessingJobId(job.id); setError(""); setNotice(""); startLoading();
    try {
      const response = await request(action === "score" ? `/api/jobs/${job.id}/score` : `/api/jobs/${job.id}/apply`, { method: "POST" });
      if (action === "score" && response.match) {
        setJobs((currentJobs) => currentJobs.map((currentJob) => currentJob.id === job.id
          ? { ...currentJob, match: response.match }
          : currentJob));
        setNotice(`AI match calculated: ${response.match.matchScore}% match (${response.match.recommendation}).`);
      } else {
        setNotice(response.message || "Application prepared for review.");
        await refreshDashboard();
      }
    } catch (requestError) { setError(requestError.message); }
    finally { setProcessingJobId(null); stopLoading(); }
  }, [refreshDashboard, request, startLoading, stopLoading]);

  const prepareAssistantApplication = useCallback(async (job) => {
    setError(""); setNotice(""); startLoading();
    try {
      const response = await request(`/api/jobs/${job.id}/apply`, { method: "POST" });
      await refreshDashboard();
      return response;
    } finally {
      stopLoading();
    }
  }, [refreshDashboard, request, startLoading, stopLoading]);

  const handleCreateJob = useCallback(async (event) => {
    event.preventDefault(); setError(""); setNotice(""); startLoading();
    try {
      const response = await request("/api/jobs", { method: "POST", body: JSON.stringify({ ...jobForm, requiredSkills: jobForm.requiredSkills.split(",").map((skill) => skill.trim()).filter(Boolean) }) });
      setJobForm(EMPTY_JOB_FORM); setShowJobForm(false); setNotice(response.message || "Job added. Run AI matching to see its score."); await refreshDashboard();
    } catch (requestError) { setError(requestError.message); }
    finally { stopLoading(); }
  }, [jobForm, refreshDashboard, request, startLoading, stopLoading]);

  const handleDiscoverJobs = useCallback(async () => {
    setError(""); setNotice(""); setDiscovering(true); startLoading();
    try {
      const response = await request("/api/jobs/discover", { method: "POST", body: JSON.stringify({}) });
      setNotice(response.message || `${response.discovered || 0} jobs discovered.`);
      await refreshDashboard();
    } catch (requestError) { setError(requestError.message); }
    finally { setDiscovering(false); stopLoading(); }
  }, [refreshDashboard, request, startLoading, stopLoading]);

  const handleDiscoverCompanyCareers = useCallback(async () => {
    setError(""); setNotice(""); setDiscoveringCareers(true); startLoading();
    try {
      const response = await request("/api/jobs/discover-careers", { method: "POST", body: JSON.stringify({}) });
      setNotice(response.message || `${response.discovered || 0} company career jobs discovered.`);
      await refreshDashboard();
    } catch (requestError) { setError(requestError.message); }
    finally { setDiscoveringCareers(false); stopLoading(); }
  }, [refreshDashboard, request, startLoading, stopLoading]);

  if (!hydrated || !token) return null;

  return <div className="min-h-screen bg-[var(--bg)] transition-colors duration-200">
    <Header />
    <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10"><div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-2"><div className="sticky top-6"><motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-[var(--primary)]/30 bg-white/80 p-4 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]"><nav className="space-y-2">
        {navigationItems.map((item) => { const tab = item.name.toLowerCase().replace(" ", "-"); return <button key={item.name} type="button" onClick={() => setActiveTab(tab)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 ${activeTab === tab ? "border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]" : "text-[var(--fg)] hover:bg-[var(--primary)]/5"}`}><item.icon className="h-5 w-5" /><span className="hidden font-medium xl:block">{item.name}</span></button>; })}
      </nav></motion.div></div></div>

      <div className="col-span-12 lg:col-span-7"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]">
        <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm uppercase tracking-[0.2em] text-[var(--primary)]">AI Job Hunt</p><h1 className="mt-2 text-3xl font-bold text-[var(--fg)]">{tabTitle(activeTab)}</h1></div><div className="flex flex-wrap gap-2"><button onClick={refreshDashboard} disabled={loading || discovering || discoveringCareers} className="rounded-xl border border-[var(--primary)]/30 px-4 py-2 text-sm font-medium text-[var(--fg)] transition hover:bg-[var(--primary)]/10 disabled:opacity-50"><ArrowPathIcon className={`mr-2 inline h-4 w-4 ${loading ? "animate-spin" : ""}`} />Refresh</button>{(activeTab === "overview" || activeTab === "ai-matches") && <><button onClick={handleDiscoverJobs} disabled={discovering || discoveringCareers} className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90 disabled:opacity-50">{discovering ? "Discovering..." : "Discover jobs"}</button><button onClick={handleDiscoverCompanyCareers} disabled={discovering || discoveringCareers} className="rounded-xl border border-[var(--primary)]/40 px-4 py-2 text-sm font-medium text-[var(--fg)] transition hover:bg-[var(--primary)]/10 disabled:opacity-50">{discoveringCareers ? "Checking careers..." : "Company careers"}</button><button onClick={() => setShowJobForm((visible) => !visible)} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-[var(--primary)]/20 transition hover:opacity-90"><PlusIcon className="mr-2 inline h-4 w-4" />Add job</button></>}</div></div>
        {showJobForm && (activeTab === "overview" || activeTab === "ai-matches") && <JobForm form={jobForm} onChange={setJobForm} onSubmit={handleCreateJob} />}
        <div className="mt-6 grid gap-4 md:grid-cols-3"><StatCard label="Matching jobs" value={summary.jobsDiscovered} /><StatCard label="Shortlisted" value={summary.shortlisted} /><StatCard label="Applications" value={summary.applications} /></div>
      </motion.div>
      {(error || notice) && <div className={`mb-4 rounded-xl border p-3 text-sm ${error ? "border-red-400/30 bg-red-500/10 text-red-600 dark:text-red-300" : "border-emerald-400/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"}`}>{error || notice}</div>}
      {activeTab === "job-assistant" ? <JobAssistant request={request} onPrepare={prepareAssistantApplication} profile={user} /> : activeTab === "applications" ? <ApplicationsPanel applications={applications} onUpdate={updateApplication} /> : activeTab === "resume" ? <ResumePanel /> : activeTab === "analytics" ? <AnalyticsPanel summary={summary} applications={applications} /> : <div className="rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold text-[var(--fg)]">{activeTab === "ai-matches" ? "AI matches" : "Recommended jobs"}</h2><span className="text-sm text-[var(--primary)]">{loading ? "Refreshing..." : `${visibleJobs.length} matching jobs`}</span></div>{visibleJobs.length === 0 ? <EmptyJobsState hasError={Boolean(error)} onAddJob={() => setShowJobForm(true)} /> : <div className="space-y-4">{visibleJobs.map((job) => <JobCard key={job.id} job={job} applicationStatus={applications.find((application) => application.job?.id === job.id)?.status} processing={processingJobId === job.id} onAction={handleJobAction} />)}</div>}</div>}</div>

      <div className="col-span-12 lg:col-span-3"><motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]"><div className="flex items-center gap-2"><ArrowTrendingUpIcon className="h-5 w-5 text-[var(--primary)]" /><h3 className="text-lg font-semibold text-[var(--fg)]">AI Summary</h3></div><div className="mt-5 space-y-4"><InsightRow label="Strongest fit" value={topMatch?.match?.matchingSkills?.join(" + ") || "Run match analysis"} /><InsightRow label="Missing skills" value={topMatch?.match?.missingSkills?.join(", ") || "No gaps reported"} /><InsightRow label="Next action" value={topMatch?.match?.recommendation === "apply" ? "Prepare application" : topMatch ? "Review match" : "Add a job"} /></div><div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4"><div className="flex items-center gap-2 text-emerald-500"><CheckCircleIcon className="h-5 w-5" /><span className="font-medium">Application progress</span></div><p className="mt-2 text-sm text-[var(--fg)]/80">{summary.readyForReview} application{summary.readyForReview === 1 ? " is" : "s are"} ready for your review.</p></div></motion.aside></div>
    </div></div>
  </div>;
}

function JobCard({ job, applicationStatus, processing, onAction }) { const match = job.match; return <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg)] p-4"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><h3 className="text-lg font-semibold text-[var(--fg)]">{job.title}</h3><p className="text-sm text-[var(--fg)]/70">{job.company} · {job.location || "Location not provided"}</p></div><div className="flex flex-wrap items-center gap-2">{match && <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-sm font-medium text-[var(--primary)]">{match.matchScore}% match</span>}{applicationStatus && <span className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-600">{applicationStatus.replaceAll("_", " ")}</span>}</div></div><p className="mt-3 line-clamp-2 text-sm text-[var(--fg)]/70">{job.description}</p><div className="mt-4 flex flex-wrap gap-2">{!match && <button disabled={processing} onClick={() => onAction(job, "score")} className="rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-slate-950 disabled:opacity-50">Analyze match</button>}{job.applicationUrl && <a href={job.applicationUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-[var(--primary)]/30 px-3 py-2 text-sm text-[var(--fg)]">View job</a>}</div></div>; }
function JobForm({ form, onChange, onSubmit }) { const update = (field) => (event) => onChange({ ...form, [field]: event.target.value }); return <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg)] p-4 md:grid-cols-2"><input required value={form.title} onChange={update("title")} placeholder="Job title" className="form-input" /><input required value={form.company} onChange={update("company")} placeholder="Company" className="form-input" /><input value={form.location} onChange={update("location")} placeholder="Location" className="form-input" /><input required type="url" value={form.applicationUrl} onChange={update("applicationUrl")} placeholder="Application URL" className="form-input" /><input value={form.requiredSkills} onChange={update("requiredSkills")} placeholder="Required skills, comma separated" className="form-input md:col-span-2" /><textarea required value={form.description} onChange={update("description")} placeholder="Paste the job description" rows={4} className="form-input md:col-span-2" /><button type="submit" className="rounded-lg bg-[var(--primary)] px-4 py-2 font-medium text-slate-950 md:col-span-2">Save job for AI analysis</button></form>; }
function EmptyJobsState({ hasError, onAddJob }) { return <div className="rounded-2xl border border-dashed border-[var(--primary)]/30 p-8 text-center"><SparklesIcon className="mx-auto h-8 w-8 text-[var(--primary)]" /><p className="mt-3 font-medium text-[var(--fg)]">{hasError ? "Jobs could not be loaded" : "No jobs are available yet"}</p><p className="mt-1 text-sm text-[var(--fg)]/70">Use Discover jobs after adding your preferred roles and skills, or add a listing manually.</p><button onClick={onAddJob} className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-slate-950">Add a job</button></div>; }
function StatCard({ label, value }) { return <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg)] p-4"><p className="text-sm text-[var(--fg)]/70">{label}</p><p className="mt-2 text-2xl font-bold text-[var(--fg)]">{value}</p></div>; }
function InsightRow({ label, value }) { return <div className="rounded-xl border border-[var(--primary)]/15 bg-[var(--bg)] p-3"><p className="text-xs uppercase tracking-[0.18em] text-[var(--fg)]/60">{label}</p><p className="mt-2 text-sm font-medium text-[var(--fg)]">{value}</p></div>; }
function tabTitle(tab) { return { overview: "Application Dashboard", "job-assistant": "Job Hunt Assistant", "ai-matches": "AI Matches", applications: "Applications", resume: "Resume workspace", analytics: "Application Analytics" }[tab] || "Application Dashboard"; }

function ApplicationsPanel({ applications, onUpdate }) {
  return <section className="rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold text-[var(--fg)]">Your applications</h2><span className="text-sm text-[var(--primary)]">{applications.length} from API</span></div>{applications.length === 0 ? <p className="rounded-2xl border border-dashed border-[var(--primary)]/30 p-8 text-center text-sm text-[var(--fg)]/70">Prepare an application from an AI match to see it here.</p> : <div className="space-y-3">{applications.map((application) => <div key={application.id} className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg)] p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-[var(--fg)]">{application.job?.title || "Job unavailable"}</h3><p className="text-sm text-[var(--fg)]/70">{application.job?.company || "Unknown company"} · {application.job?.location || "Location not provided"}</p></div><span className="rounded-full border border-[var(--primary)]/30 px-3 py-1 text-xs uppercase tracking-[0.15em] text-[var(--primary)]">{application.status.replaceAll("_", " ")}</span></div><div className="mt-4 flex flex-wrap gap-2">{application.status !== "submitted" && <button type="button" onClick={() => onUpdate(application.id, { status: "submitted" })} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white">Mark submitted</button>}<button type="button" onClick={() => onUpdate(application.id, { status: "shortlisted" })} className="rounded-lg border border-[var(--primary)]/30 px-3 py-2 text-sm text-[var(--fg)]">Shortlist</button><button type="button" onClick={() => onUpdate(application.id, { status: "interview" })} className="rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-slate-950">Mark interview</button>{application.job?.applicationUrl && <a href={application.job.applicationUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-[var(--primary)]/30 px-3 py-2 text-sm text-[var(--fg)]">Open application</a>}</div></div>)}</div>}</section>;
}

function ResumePanel() {
  return <section className="rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-8 text-center shadow-xl backdrop-blur-xl dark:bg-[#1f252c]"><PaperClipIcon className="mx-auto h-10 w-10 text-[var(--primary)]" /><h2 className="mt-4 text-xl font-semibold text-[var(--fg)]">Resume workspace</h2><p className="mx-auto mt-2 max-w-lg text-sm text-[var(--fg)]/70">Keep your profile skills and experience current so the AI can compare them with every job description.</p><a href="/profile" className="mt-5 inline-block rounded-lg bg-[var(--primary)] px-4 py-2 font-medium text-slate-950">Update profile</a></section>;
}

function AnalyticsPanel({ summary, applications }) {
  return <section className="rounded-3xl border border-[var(--primary)]/30 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]"><h2 className="text-xl font-semibold text-[var(--fg)]">Application analytics</h2><div className="mt-5 grid gap-4 sm:grid-cols-2"><StatCard label="Open jobs" value={summary.jobsDiscovered} /><StatCard label="Applications" value={summary.applications} /><StatCard label="Interviews" value={summary.interviews} /><StatCard label="Ready for review" value={summary.readyForReview} /></div><div className="mt-6 rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg)] p-4"><p className="text-sm text-[var(--fg)]/70">Current pipeline</p><p className="mt-2 text-2xl font-bold text-[var(--fg)]">{applications.filter((application) => ["interview", "approved"].includes(application.status)).length}</p><p className="text-sm text-[var(--fg)]/70">advanced applications</p></div></section>;
}

function isAllowedJobLocation(location, preferredLocations = []) {
  const normalized = String(location || "").toLowerCase();
  const locations = preferredLocations.length ? preferredLocations : ["Gurugram", "Bangalore", "Noida", "Delhi NCR"];
  return locations.some((locationName) => {
    const value = String(locationName || "").toLowerCase().trim();
    const aliases = value === "gurugram" ? ["gurugram", "gurgaon"]
      : value === "bangalore" ? ["bangalore", "bengaluru", "banglore"]
        : value === "noida" ? ["noida", "greater noida"]
          : value === "delhi ncr" ? ["delhi", "new delhi", "delhi ncr", "ncr"]
            : [value];
    return aliases.some((alias) => normalized.includes(alias));
  });
}

function deduplicateJobs(jobList) {
  const jobsByRoleAndCompany = new Map();
  for (const job of jobList) {
    const role = normalizeJobText(job.title).replace(/\b(senior|sr|junior|jr|lead|principal|staff|associate|intern|trainee|i|ii|iii|iv|1|2|3|4)\b/g, " ").replace(/\s+/g, " ").trim();
    const key = `${normalizeJobText(job.company).replace(/\s+/g, "")}::${role}`;
    if (!jobsByRoleAndCompany.has(key)) jobsByRoleAndCompany.set(key, job);
  }
  return [...jobsByRoleAndCompany.values()];
}

function normalizeJobText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function isDisplayableJob(job) {
  const company = normalizeJobText(job.company);
  const title = normalizeJobText(job.title);
  const description = normalizeJobText(job.description);
  return company.replace(/\s+/g, "") !== "dataannotation"
    && company !== "unknown"
    && company !== "unknown company"
    && title
    && title !== "job"
    && title !== "untitled job"
    && !(/review the original/.test(description) && /listing/.test(description));
}
