"use client";

import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/24/outline";

const STARTER_MESSAGE = {
  role: "assistant",
  content: "Hi! I can search jobs already in your portal, compare them with your profile, and prepare an application for your review. Which roles or locations should I look for?",
  jobs: [],
};

export default function JobAssistant({ request, onPrepare, profile = {} }) {
  const [messages, setMessages] = useState([STARTER_MESSAGE]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [preparingId, setPreparingId] = useState("");
  const [error, setError] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    // Keep the effect cleanup return value undefined. Some browsers or
    // embedded page contexts do not expose scrollIntoView on every element.
    endRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(value = draft) {
    const content = String(value || "").trim();
    if (!content || sending) return;
    const nextMessages = [...messages, { role: "user", content, jobs: [] }];
    setMessages(nextMessages);
    setDraft("");
    setSending(true);
    setError("");
    try {
      const result = await request("/api/jobs/assistant/chat", {
        method: "POST",
        body: JSON.stringify({
          message: content,
          history: nextMessages.slice(-9, -1).map(({ role, content: text }) => ({ role, content: text })),
        }),
      });
      setMessages((current) => [...current, {
        role: "assistant",
        content: typeof result?.reply === "string" ? result.reply : "I searched the portal jobs. Review the matches below.",
        jobs: Array.isArray(result?.jobs) ? result.jobs : [],
      }]);
    } catch (requestError) {
      setError(requestError.message || "I couldn’t reach the job assistant.");
      setMessages((current) => [...current, { role: "assistant", content: "I couldn’t search the portal just now. Please try again in a moment.", jobs: [] }]);
    } finally {
      setSending(false);
    }
  }

  async function prepareJob(job) {
    setPreparingId(job.id);
    setError("");
    try {
      const result = await onPrepare(job);
      const missingProfileDetails = [
        !profile?.email && "email",
        !profile?.mobilePhone && "phone number",
        !(profile?.currentLocation || profile?.location) && "current location",
      ].filter(Boolean);
      const profilePrompt = missingProfileDetails.length
        ? ` Your saved profile is missing ${missingProfileDetails.join(", ")}; add these manually if the employer form requires them.`
        : "";
      setMessages((current) => [...current, {
        role: "assistant",
        content: `${result?.message || `I prepared ${job.title} at ${job.company} in your portal.`}${profilePrompt} Open the employer application to continue. Some employer forms may not be readable or fillable here; complete any fields that remain blank or unsupported manually. If a question needs help, send me its exact label and I can help draft an answer. Review everything and submit on the employer’s site.`,
        applicationUrl: job.applicationUrl,
        jobs: [],
      }]);
    } catch (requestError) {
      setError(requestError.message || "Unable to prepare this application.");
    } finally {
      setPreparingId("");
    }
  }

  return <section className="flex min-h-[620px] flex-col overflow-hidden rounded-3xl border border-[var(--primary)]/30 bg-white/80 shadow-xl backdrop-blur-xl dark:bg-[#1f252c]">
    <header className="border-b border-[var(--primary)]/20 p-5">
      <div className="flex items-center gap-3"><span className="rounded-xl bg-[var(--primary)]/10 p-2 text-[var(--primary)]"><SparklesIcon className="h-6 w-6" /></span><div><h2 className="text-lg font-semibold text-[var(--fg)]">Job hunt assistant</h2><p className="text-sm text-[var(--fg)]/65">Search portal jobs and prepare applications for your review</p></div></div>
    </header>

    <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" aria-live="polite">
      {messages.map((message, index) => <article key={`${index}-${message.role}`} className={`max-w-3xl ${message.role === "user" ? "ml-auto" : "mr-auto"}`}>
        <div className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "bg-[var(--primary)] text-slate-950" : "border border-[var(--primary)]/15 bg-[var(--bg)] text-[var(--fg)]"}`}>{message.content}</div>
        {message.applicationUrl && <a href={message.applicationUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-slate-950">Open employer application</a>}
        {Array.isArray(message.jobs) && message.jobs.length > 0 && <div className="mt-3 space-y-3">{message.jobs.map((job) => <div key={job.id} className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--bg)] p-4"><div className="flex flex-wrap items-start justify-between gap-2"><div><h3 className="font-semibold text-[var(--fg)]">{job.title}</h3><p className="text-sm text-[var(--fg)]/65">{job.company} · {job.location || "Location not specified"}</p></div>{job.match && <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-xs font-semibold text-[var(--primary)]">{job.match.matchScore}% match</span>}</div>{Array.isArray(job.match?.matchingSkills) && job.match.matchingSkills.length > 0 && <p className="mt-2 text-xs text-[var(--fg)]/70">Skills matched: {job.match.matchingSkills.join(", ")}</p>}<div className="mt-3 flex flex-wrap gap-2"><button type="button" disabled={Boolean(preparingId)} onClick={() => prepareJob(job)} className="rounded-lg bg-[var(--primary)] px-3 py-2 text-sm font-medium text-slate-950 disabled:cursor-wait disabled:opacity-50">{preparingId === job.id ? "Preparing…" : "Prepare application"}</button>{job.applicationUrl && <a href={job.applicationUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-[var(--primary)]/30 px-3 py-2 text-sm text-[var(--fg)]">View job</a>}</div></div>)}</div>}
      </article>)}
      {sending && <p className="mr-auto rounded-2xl border border-[var(--primary)]/15 bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)]/65">Checking the portal jobs…</p>}
      {error && <p role="alert" className="mx-auto max-w-3xl rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">{error}</p>}
      <div ref={endRef} />
    </div>

    <div className="border-t border-[var(--primary)]/20 p-4">
      <form onSubmit={(event) => { event.preventDefault(); sendMessage(); }} className="mx-auto flex max-w-4xl items-end gap-2">
        <label className="sr-only" htmlFor="job-assistant-message">Message the job assistant</label>
        <textarea id="job-assistant-message" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} maxLength={2000} rows={2} placeholder="Try “Find React roles in Bangalore” or ask about a job application…" className="min-h-12 flex-1 resize-y rounded-xl border border-[var(--primary)]/25 bg-[var(--bg)] px-4 py-3 text-sm text-[var(--fg)] outline-none focus:border-[var(--primary)]" />
        <button type="submit" disabled={sending || !draft.trim()} aria-label="Send message" className="rounded-xl bg-[var(--primary)] p-3 text-slate-950 disabled:opacity-50"><PaperAirplaneIcon className="h-5 w-5" /></button>
      </form>
      <p className="mx-auto mt-2 max-w-4xl text-xs text-[var(--fg)]/55">Applications are prepared in your portal. Employer forms may need manual completion; review and submit them yourself.</p>
    </div>
  </section>;
}
