"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  Building,
  Briefcase,
  Users,
  PlusCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function EmployerDashboardPage() {
  const { data: session } = authClient.useSession();
  const user = (session as any)?.user;

  return (
    <main className="min-h-screen bg-zinc-50/50 py-10 dark:bg-black lg:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white dark:bg-white dark:text-black">
              {user?.name?.charAt(0) || "E"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
                  {user?.name || "Employer Studio"}
                </h1>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  Employer / Factory
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Post jobs, review incoming stitch portfolios, and hire digitizers & operators.
              </p>
            </div>
          </div>

          <Link
            href="/jobs/post"
            className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
          >
            <PlusCircle size={15} /> Post New Job
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Active Job Posts</span>
              <Briefcase size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-zinc-400">Live listings</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Total Applicants</span>
              <Users size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-zinc-400">Candidates applied</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Company Profile</span>
              <Building size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">Active</p>
            <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">Verified status</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Hired Talent</span>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">0</p>
            <p className="mt-1 text-[11px] text-zinc-400">Completed contracts</p>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Posted Jobs Table Scaffold */}
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-black dark:text-white">
                My Job Listings
              </h2>
              <Link
                href="/jobs/post"
                className="text-xs font-semibold text-black underline underline-offset-4 dark:text-white"
              >
                + Post New
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-12 text-center dark:border-white/10">
              <Briefcase size={28} className="text-zinc-300 dark:text-zinc-600" />
              <p className="mt-3 text-xs font-semibold text-black dark:text-white">
                No active jobs posted yet
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
                Post an opening for Wilcom digitizers, factory operators, or bridal artisans.
              </p>
              <Link
                href="/jobs/post"
                className="mt-4 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
              >
                Create Job Listing
              </Link>
            </div>
          </div>

          {/* Quick Actions & Hiring */}
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Hire Talent Directly
              </h3>
              <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                Browse our curated directory of master Wilcom digitizers and bridal Karchupi artists.
              </p>
              <Link
                href="/communities"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-black/15 py-2.5 text-xs font-semibold text-black hover:bg-zinc-50 dark:border-white/15 dark:text-white dark:hover:bg-zinc-900"
              >
                <Users size={15} /> Discover Talent
              </Link>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Employer Account
              </h3>
              <div className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <p>
                  <span className="font-semibold text-black dark:text-white">Contact:</span>{" "}
                  {user?.name || "Employer"}
                </p>
                <p>
                  <span className="font-semibold text-black dark:text-white">Email:</span>{" "}
                  {user?.email || "Not set"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
