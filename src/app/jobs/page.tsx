"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  Clock,
  Building,
  PlusCircle,
  Filter,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  Loader2,
  Calendar,
} from "lucide-react";
import { jobApi, categoryApi } from "@/services";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedWorkplace, setSelectedWorkplace] = useState("ALL");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Debounce search input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Categories once
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryApi.getAll();
        if (res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Server-Side Query Parameters Fetch
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await jobApi.getAll({
        status: "PUBLISHED",
        search: debouncedSearch || undefined,
        category: selectedCategory !== "ALL" ? selectedCategory : undefined,
        jobType: selectedType !== "ALL" ? selectedType : undefined,
        workplaceType: selectedWorkplace !== "ALL" ? selectedWorkplace : undefined,
        sortBy,
        sortOrder,
      });

      if (res.success && Array.isArray(res.data)) {
        setJobs(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [
    debouncedSearch,
    selectedCategory,
    selectedType,
    selectedWorkplace,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedCategory("ALL");
    setSelectedType("ALL");
    setSelectedWorkplace("ALL");
    setSortBy("createdAt");
    setSortOrder("desc");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "ALL" ||
    selectedType !== "ALL" ||
    selectedWorkplace !== "ALL" ||
    sortBy !== "createdAt";

  const formatJobType = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "ফুল-টাইম";
      case "PART_TIME":
        return "পার্ট-টাইম";
      case "FREELANCE":
        return "ফ্রিল্যান্স";
      case "CONTRACT":
        return "চুক্তিভিত্তিক";
      case "INTERNSHIP":
        return "ইন্টার্নশিপ";
      default:
        return type;
    }
  };

  const formatWorkplace = (wp: string) => {
    switch (wp) {
      case "ONSITE":
        return "অন-সাইট";
      case "REMOTE":
        return "রিমোট (বাসা থেকে)";
      case "HYBRID":
        return "হাইব্রিড";
      default:
        return wp;
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50/60 pb-20 font-sans text-zinc-900">
      {/* Header Banner */}
      <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-semibold text-zinc-800">
                <Sparkles size={14} className="text-amber-500" />
                এমব্রয়ডারি ও গার্মেন্টস ক্যারিয়ার
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                এমব্রয়ডারি চাকরির বিজ্ঞপ্তি
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">
                উইলকম ডিজিটাইজিং, ফ্যাক্টরি প্রোডাকশন শিফট, ব্রাইডাল কারচুপি এবং দেশ-বিদেশের ফ্রিল্যান্স কাজের সেরা সুযোগসমূহ।
              </p>
            </div>

            <Link
              href="/jobs/post"
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-sm font-bold text-white shadow-xs transition hover:bg-zinc-800 shrink-0"
            >
              <PlusCircle size={18} />
              নতুন চাকরির বিজ্ঞপ্তি দিন
            </Link>
          </div>

          {/* Search & Server-Side Filter Controls */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পদবি, দক্ষতা (Wilcom, Tajima), কোম্পানির নাম..."
                className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-800 focus:border-zinc-950 focus:outline-none"
            >
              <option value="ALL">সকল ক্যাটাগরি</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Job Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-800 focus:border-zinc-950 focus:outline-none"
            >
              <option value="ALL">সকল কাজের ধরন</option>
              <option value="FULL_TIME">ফুল-টাইম</option>
              <option value="FREELANCE">ফ্রিল্যান্স</option>
              <option value="PART_TIME">পার্ট-টাইম</option>
              <option value="CONTRACT">চুক্তিভিত্তিক</option>
              <option value="INTERNSHIP">ইন্টার্নশিপ</option>
            </select>

            {/* Workplace Filter */}
            <select
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-800 focus:border-zinc-950 focus:outline-none"
            >
              <option value="ALL">সকল কর্মক্ষেত্র</option>
              <option value="ONSITE">অন-সাইট (ফ্যাক্টরি/অফিস)</option>
              <option value="REMOTE">রিমোট (বাসা থেকে)</option>
              <option value="HYBRID">হাইব্রিড</option>
            </select>
          </div>

          {/* Quick Sort Options Row */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-bold text-zinc-700">
                <ArrowUpDown size={13} /> সাজান:
              </span>
              <button
                type="button"
                onClick={() => {
                  setSortBy("createdAt");
                  setSortOrder("desc");
                }}
                className={`rounded-lg px-2.5 py-1 font-medium transition ${
                  sortBy === "createdAt" && sortOrder === "desc"
                    ? "bg-zinc-950 font-bold text-white"
                    : "hover:bg-zinc-100 text-zinc-700"
                }`}
              >
                সর্বশেষ প্রকাশিত
              </button>
              <button
                type="button"
                onClick={() => {
                  setSortBy("salaryMax");
                  setSortOrder("desc");
                }}
                className={`rounded-lg px-2.5 py-1 font-medium transition ${
                  sortBy === "salaryMax"
                    ? "bg-zinc-950 font-bold text-white"
                    : "hover:bg-zinc-100 text-zinc-700"
                }`}
              >
                সর্বোচ্চ বেতন
              </button>
              <button
                type="button"
                onClick={() => {
                  setSortBy("deadline");
                  setSortOrder("asc");
                }}
                className={`rounded-lg px-2.5 py-1 font-medium transition ${
                  sortBy === "deadline"
                    ? "bg-zinc-950 font-bold text-white"
                    : "hover:bg-zinc-100 text-zinc-700"
                }`}
              >
                দ্রুত শেষ হচ্ছে
              </button>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="font-bold text-zinc-900 underline underline-offset-4 hover:opacity-80"
              >
                সকল ফিল্টার রিসেট করুন
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            মোট {jobs.length}টি চাকরির বিজ্ঞপ্তি পাওয়া গেছে
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <div className="h-5 w-2/3 rounded-lg bg-zinc-100" />
                <div className="mt-2 h-4 w-1/3 rounded-lg bg-zinc-100" />
                <div className="mt-6 h-4 w-1/2 rounded-lg bg-zinc-100" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          /* Empty State */
          <div className="mt-12 rounded-3xl border border-dashed border-zinc-300 bg-white py-16 text-center">
            <Briefcase size={36} className="mx-auto text-zinc-400" />
            <h3 className="mt-4 text-base font-bold text-zinc-900">
              কোনো চাকরি পাওয়া যায়নি
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              আপনার ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন অথবা নতুন চাকরির বিজ্ঞপ্তি দিন।
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-zinc-950 underline underline-offset-4"
              >
                ফিল্টার মুছুন
              </button>
            )}
          </div>
        ) : (
          /* Jobs Grid */
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-400"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-bold text-zinc-950">
                        {job.title}
                      </h2>
                      <p className="mt-1 text-sm font-semibold text-zinc-600">
                        {job.company?.name || "নাম অপ্রকাশিত প্রতিষ্ঠান"}
                      </p>
                    </div>
                    <span className="rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-bold text-zinc-700">
                      {formatJobType(job.jobType)}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin size={14} />
                      {job.location || formatWorkplace(job.workplaceType)}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-zinc-950">
                      <DollarSign size={14} />
                      {job.salaryMin && job.salaryMax
                        ? `৳${job.salaryMin.toLocaleString()} - ৳${job.salaryMax.toLocaleString()} / মাস`
                        : job.salaryMin
                        ? `৳${job.salaryMin.toLocaleString()} / মাস`
                        : "আলোচনা সাপেক্ষে"}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock size={14} />
                      {new Date(job.createdAt).toLocaleDateString("bn-BD", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {job.category && (
                    <div className="mt-4">
                      <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700">
                        {job.category.name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs">
                  <span className="text-zinc-500 font-medium">
                    {job.deadline
                      ? `শেষ সময়: ${new Date(job.deadline).toLocaleDateString("bn-BD")}`
                      : "নিয়োগ চলছে"}
                  </span>
                  <Link
                    href={`/jobs/${job.id}`}
                    className="flex items-center gap-1 font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
                  >
                    বিস্তারিত ও আবেদন <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
