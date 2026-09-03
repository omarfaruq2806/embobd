"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  ShieldAlert,
  Briefcase,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
} from "lucide-react";

export default function ModeratorDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = (session as any)?.user;

  return (
    <main className="min-h-screen bg-zinc-50/50 py-10 dark:bg-black lg:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white dark:bg-white dark:text-black">
              {user?.name?.charAt(0) || "M"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
                  Moderator Station
                </h1>
                <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-700 dark:bg-purple-950/50 dark:text-purple-300">
                  Moderator
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Review pending job posts, moderate community stitch projects, and verify content.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/admin/jobs"
            className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
          >
            <CheckCircle2 size={15} /> Review Pending Jobs
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Pending Approvals</span>
              <Clock size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-amber-600 dark:text-amber-400">Jobs awaiting review</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Flagged Items</span>
              <ShieldAlert size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-zinc-400">Community reports</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Approved Today</span>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">Live posts</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Active Categories</span>
              <Layers size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">6</p>
            <p className="mt-1 text-[11px] text-zinc-400">Operational sectors</p>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-sm font-bold text-black dark:text-white">
              Job Queue Moderation
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Accept employer submissions to make them publicly visible on the job board.
            </p>
            <Link
              href="/dashboard/admin/jobs"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
            >
              Open Job Moderation Table <ArrowRight size={14} />
            </Link>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-sm font-bold text-black dark:text-white">
              Business Directory Review
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Approve submitted embroidery shops, factories, dealerships, and verify entities.
            </p>
            <Link
              href="/dashboard/admin/businesses"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
            >
              Review Business Queue <ArrowRight size={14} />
            </Link>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <h2 className="text-sm font-bold text-black dark:text-white">
              Categories & Tags
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              Verify embroidery techniques, specialty niches, and machine types.
            </p>
            <Link
              href="/dashboard/admin/categories"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
            >
              Manage Specialty Categories <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
