"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Layers,
  Building,
  PlusCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    jobsCount: 0,
    usersCount: 0,
    categoriesCount: 0,
    companiesCount: 0,
  });
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [jobsRes, usersRes, catRes, compRes] = await Promise.all([
          fetch(`${API_URL}/api/v1/jobs`).then((r) => r.json()).catch(() => ({ data: [] })),
          fetch(`${API_URL}/api/v1/users`).then((r) => r.json()).catch(() => ({ data: [] })),
          fetch(`${API_URL}/api/v1/categories`).then((r) => r.json()).catch(() => ({ data: [] })),
          fetch(`${API_URL}/api/v1/companies`).then((r) => r.json()).catch(() => ({ data: [] })),
        ]);

        const jobs = Array.isArray(jobsRes.data) ? jobsRes.data : [];
        const users = Array.isArray(usersRes.data) ? usersRes.data : [];
        const categories = Array.isArray(catRes.data) ? catRes.data : [];
        const companies = Array.isArray(compRes.data) ? compRes.data : [];

        setStats({
          jobsCount: jobs.length,
          usersCount: users.length,
          categoriesCount: categories.length,
          companiesCount: companies.length,
        });

        setRecentJobs(jobs.slice(0, 5));
        setRecentUsers(users.slice(0, 5));
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [API_URL]);

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white sm:text-3xl">
            Admin Control Center
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Real-time management for EMBOBD marketplace and community operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/categories"
            className="flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs font-semibold text-black transition hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
          >
            <PlusCircle size={14} />
            Add Category
          </Link>
          <Link
            href="/jobs/post"
            className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
          >
            <PlusCircle size={14} />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Total Users</span>
            <Users size={16} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-black dark:text-white">
            {stats.usersCount}
          </p>
          <Link
            href="/admin/users"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Manage users <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Active Jobs</span>
            <Briefcase size={16} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-black dark:text-white">
            {stats.jobsCount}
          </p>
          <Link
            href="/admin/jobs"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Moderate jobs <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Specialty Categories</span>
            <Layers size={16} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-black dark:text-white">
            {stats.categoriesCount}
          </p>
          <Link
            href="/admin/categories"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            View categories <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
            <span className="text-xs font-medium">Verified Companies</span>
            <Building size={16} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-black dark:text-white">
            {stats.companiesCount}
          </p>
          <Link
            href="/admin/companies"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            Manage companies <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Jobs & Recent Users */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Jobs Table */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-black dark:text-white">
              Recently Posted Jobs
            </h2>
            <Link
              href="/admin/jobs"
              className="text-xs font-semibold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 divide-y divide-black/5 dark:divide-white/5">
            {recentJobs.length === 0 ? (
              <p className="py-6 text-center text-xs text-zinc-400">No jobs posted yet.</p>
            ) : (
              recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between py-3.5">
                  <div className="overflow-hidden pr-3">
                    <p className="truncate text-xs font-bold text-black dark:text-white">
                      {job.title}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {job.company?.name || "Company"} • {job.category?.name || "Category"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        job.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {job.status}
                    </span>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-xs font-semibold text-zinc-500 hover:text-black dark:hover:text-white"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Registered Users */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-black dark:text-white">
              Recent Users
            </h2>
            <Link
              href="/admin/users"
              className="text-xs font-semibold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
            >
              View all
            </Link>
          </div>

          <div className="mt-4 divide-y divide-black/5 dark:divide-white/5">
            {recentUsers.length === 0 ? (
              <p className="py-6 text-center text-xs text-zinc-400">No users found.</p>
            ) : (
              recentUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-3">
                  <div className="overflow-hidden pr-2">
                    <p className="truncate text-xs font-bold text-black dark:text-white">
                      {u.name || "User"}
                    </p>
                    <p className="truncate text-[11px] text-zinc-400">{u.email}</p>
                  </div>
                  <span className="shrink-0 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                    {u.role}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
