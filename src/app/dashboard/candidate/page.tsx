"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  User,
  Briefcase,
  Bookmark,
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileText,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function CandidateDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = (session as any)?.user;

  return (
    <main className="min-h-screen bg-zinc-50/50 py-10 dark:bg-black lg:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white dark:bg-white dark:text-black">
              {user?.name?.charAt(0) || "C"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
                  Welcome back, {user?.name || "Artisan"}!
                </h1>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  Candidate
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Manage your job applications, embroidery showcase, and client inquiries.
              </p>
            </div>
          </div>

          <Link
            href="/jobs"
            className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
          >
            <Briefcase size={14} /> Browse New Jobs
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Applied Jobs</span>
              <Briefcase size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-zinc-400">Active applications</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Saved Jobs</span>
              <Bookmark size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-zinc-400">Bookmarked listings</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Portfolio Stitches</span>
              <Sparkles size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-zinc-400">Showcased projects</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Profile Score</span>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">85%</p>
            <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">Good standing</p>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Applications Table Scaffold */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-black dark:text-white">
                Recent Job Applications
              </h2>
              <Link
                href="/jobs"
                className="text-xs font-semibold text-black underline underline-offset-4 dark:text-white"
              >
                Find more
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-12 text-center dark:border-white/10">
              <Briefcase size={28} className="text-zinc-300 dark:text-zinc-600" />
              <p className="mt-3 text-xs font-semibold text-black dark:text-white">
                You haven&apos;t applied to any jobs yet
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                Explore open Wilcom digitizing or factory embroidery positions and apply now.
              </p>
              <Link
                href="/jobs"
                className="mt-4 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
              >
                Browse Job Board
              </Link>
            </div>
          </div>

          {/* Portfolio & Quick Actions */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                My Showcase & Portfolio
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                Upload photos of your best embroidery stitchouts, Aari/Zari work, or Wilcom digitizing samples.
              </p>
              <Link
                href="/communities"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-black/15 py-2.5 text-xs font-semibold text-black hover:bg-zinc-50 dark:border-white/15 dark:text-white dark:hover:bg-zinc-900"
              >
                <UploadCloud size={15} /> Upload Stitch Project
              </Link>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Profile Information
              </h3>
              <div className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <p>
                  <span className="font-semibold text-black dark:text-white">Name:</span>{" "}
                  {user?.name || "Not set"}
                </p>
                <p>
                  <span className="font-semibold text-black dark:text-white">Email:</span>{" "}
                  {user?.email || "Not set"}
                </p>
                <p>
                  <span className="font-semibold text-black dark:text-white">Account Type:</span>{" "}
                  Candidate / Artisan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
