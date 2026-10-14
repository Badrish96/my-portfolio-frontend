"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [pendingRequests, setPendingRequests] = useState(0);
  const startLoading = useCallback(() => setPendingRequests((count) => count + 1), []);
  const stopLoading = useCallback(() => setPendingRequests((count) => Math.max(0, count - 1)), []);
  const value = useMemo(() => ({ startLoading, stopLoading, isLoading: pendingRequests > 0 }), [pendingRequests, startLoading, stopLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {pendingRequests > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px] dark:bg-slate-950/45" aria-live="polite" aria-busy="true">
          <div className="w-[min(90vw,28rem)] rounded-2xl border border-slate-200 bg-white/95 p-6 text-slate-800 shadow-2xl shadow-slate-900/20 dark:border-white/20 dark:bg-slate-900/95 dark:text-white dark:shadow-black/40">
            <div className="mb-4 h-3 w-32 animate-pulse rounded-full bg-slate-200 dark:bg-white/20" />
            <div className="space-y-3">
              <div className="h-3 animate-pulse rounded-full bg-slate-100 dark:bg-white/10" />
              <div className="h-3 w-4/5 animate-pulse rounded-full bg-slate-100 dark:bg-white/10" />
              <div className="h-10 animate-pulse rounded-xl bg-[#0ea5a1]/15 dark:bg-[#12F7D6]/20" />
            </div>
            <p className="mt-5 text-center text-sm text-slate-600 dark:text-white/75">Please wait while we finish processing your request…</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useLoading must be used inside LoadingProvider");
  return context;
}
