"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Briefcase,
  Layers,
  Building,
  Store,
  MessageSquare,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { jobApi, userApi, categoryApi, companyApi, businessApi, communityApi } from "@/services";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({
    jobsCount: 0,
    usersCount: 0,
    categoriesCount: 0,
    companiesCount: 0,
    businessesCount: 0,
    communityPostsCount: 0,
  });
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [jobsRes, usersRes, catRes, compRes, bizRes, commRes] = await Promise.all([
          jobApi.getAll(),
          userApi.getAll(),
          categoryApi.getAll(),
          companyApi.getAll(),
          businessApi.getAll(),
          communityApi.getAll(),
        ]);

        const jobs = jobsRes.success && Array.isArray(jobsRes.data) ? jobsRes.data : [];
        const users = usersRes.success && Array.isArray(usersRes.data) ? usersRes.data : [];
        const categories = catRes.success && Array.isArray(catRes.data) ? catRes.data : [];
        const companies = compRes.success && Array.isArray(compRes.data) ? compRes.data : [];
        const businesses = bizRes.success && Array.isArray(bizRes.data) ? bizRes.data : [];
        const communityPosts = commRes.success && Array.isArray(commRes.data) ? commRes.data : [];

        setStats({
          jobsCount: jobs.length,
          usersCount: users.length,
          categoriesCount: categories.length,
          companiesCount: companies.length,
          businessesCount: businesses.length,
          communityPostsCount: communityPosts.length,
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
  }, []);

  return (
    <div className="mx-auto max-w-7xl font-sans">
      {/* Header with Hook */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              অ্যাডমিন কন্ট্রোল সেন্টার
            </h1>
            <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-800">
              সুপার অ্যাডমিন
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-600">
            EMBOBD প্ল্যাটফর্মের রিয়েল-টাইম ডেটা, ইউজার পারমিশন ও মার্কেটপ্লেস নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin/categories"
            className="flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs font-bold text-zinc-900 transition hover:bg-zinc-100 shadow-xs"
          >
            <PlusCircle size={14} />
            ক্যাটাগরি যোগ করুন
          </Link>
          <Link
            href="/jobs/post"
            className="flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition hover:opacity-90 shadow-sm"
          >
            <PlusCircle size={14} />
            নতুন চাকরি পোস্ট করুন
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-6">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">মোট ব্যবহারকারী</span>
            <Users size={16} className="text-zinc-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {stats.usersCount}
          </p>
          <Link
            href="/dashboard/admin/users"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
          >
            ইউজার পরিচালনা <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">সক্রিয় চাকরি</span>
            <Briefcase size={16} className="text-zinc-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {stats.jobsCount}
          </p>
          <Link
            href="/dashboard/admin/jobs"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
          >
            চাকরি পরিচালনা <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">ফ্যাক্টরি ও ব্যবসা</span>
            <Store size={16} className="text-zinc-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {stats.businessesCount}
          </p>
          <Link
            href="/dashboard/admin/businesses"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
          >
            তালিকা দেখুন <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">কমিউনিটি পোস্ট</span>
            <MessageSquare size={16} className="text-zinc-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {stats.communityPostsCount}
          </p>
          <Link
            href="/dashboard/admin/community"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
          >
            পোস্ট পরিচালনা <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">ক্যাটাগরি</span>
            <Layers size={16} className="text-zinc-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {stats.categoriesCount}
          </p>
          <Link
            href="/dashboard/admin/categories"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
          >
            ক্যাটাগরি দেখুন <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">কোম্পানিসমূহ</span>
            <Building size={16} className="text-zinc-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {stats.companiesCount}
          </p>
          <Link
            href="/dashboard/admin/companies"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
          >
            প্রতিষ্ঠান পরিচালনা <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Two Column Section: Recent Jobs & Recent Users */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Jobs Table */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-950">
              সম্প্রতি পোস্টকৃত চাকরি
            </h2>
            <Link
              href="/dashboard/admin/jobs"
              className="text-xs font-semibold text-zinc-950 underline underline-offset-4 hover:opacity-80"
            >
              সবগুলো দেখুন
            </Link>
          </div>

          <div className="mt-4 divide-y divide-zinc-100">
            {recentJobs.length === 0 ? (
              <p className="py-6 text-center text-xs text-zinc-400">এখনও কোনো চাকরি পোস্ট করা হয়নি।</p>
            ) : (
              recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between py-3.5">
                  <div className="overflow-hidden pr-3">
                    <p className="truncate text-xs font-bold text-zinc-950">
                      {job.title}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {job.company?.name || "কোম্পানি"} • {job.category?.name || "ক্যাটাগরি"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold border ${
                        job.status === "PUBLISHED"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-zinc-100 text-zinc-600 border-zinc-200"
                      }`}
                    >
                      {job.status === "PUBLISHED" ? "পাবলিশড" : "ড্রাফট"}
                    </span>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-xs font-semibold text-zinc-600 hover:text-zinc-950"
                    >
                      দেখুন
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Registered Users */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-950">
              নতুন ব্যবহারকারী
            </h2>
            <Link
              href="/dashboard/admin/users"
              className="text-xs font-semibold text-zinc-950 underline underline-offset-4 hover:opacity-80"
            >
              সবগুলো দেখুন
            </Link>
          </div>

          <div className="mt-4 divide-y divide-zinc-100">
            {recentUsers.length === 0 ? (
              <p className="py-6 text-center text-xs text-zinc-400">কোনো ইউজার পাওয়া যায়নি।</p>
            ) : (
              recentUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between py-3">
                  <div className="overflow-hidden pr-2">
                    <p className="truncate text-xs font-bold text-zinc-950">
                      {u.name || "ব্যবহারকারী"}
                    </p>
                    <p className="truncate text-[11px] text-zinc-500">{u.email}</p>
                  </div>
                  <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-bold ${
                    u.role === "ADMIN"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : u.role === "MODERATOR"
                      ? "bg-purple-50 text-purple-800 border-purple-200"
                      : "bg-zinc-100 text-zinc-700 border-zinc-200"
                  }`}>
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
