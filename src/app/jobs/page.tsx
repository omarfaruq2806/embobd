"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  location: string | null;
  jobType: string;
  workplaceType: string;
  deadline: string | null;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  company: {
    id: string;
    name: string;
    logo: string | null;
    website: string | null;
  };
  category: {
    id: string;
    name: string;
  };
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedWorkplace, setSelectedWorkplace] = useState("ALL");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/v1/jobs?status=PUBLISHED`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setJobs(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [API_URL]);

  // Extract available categories
  const categories = Array.from(
    new Set(jobs.map((j) => j.category?.name).filter(Boolean))
  );

  // Filtering Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.location && job.location.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "ALL" || job.category?.name === selectedCategory;

    const matchesType =
      selectedType === "ALL" || job.jobType === selectedType;

    const matchesWorkplace =
      selectedWorkplace === "ALL" || job.workplaceType === selectedWorkplace;

    return matchesSearch && matchesCategory && matchesType && matchesWorkplace;
  });

  const formatJobType = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "Full-Time";
      case "PART_TIME":
        return "Part-Time";
      case "FREELANCE":
        return "Freelance";
      case "CONTRACT":
        return "Contract";
      case "INTERNSHIP":
        return "Internship";
      default:
        return type;
    }
  };

  const formatWorkplace = (wp: string) => {
    switch (wp) {
      case "ONSITE":
        return "On-Site";
      case "REMOTE":
        return "Remote";
      case "HYBRID":
        return "Hybrid";
      default:
        return wp;
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50/50 pb-20 dark:bg-black">
      {/* Header Banner */}
      <section className="border-b border-black/10 bg-white px-6 py-12 dark:border-white/10 dark:bg-zinc-950 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-3.5 py-1 text-xs font-semibold text-zinc-800 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-200">
                <Sparkles size={14} className="text-amber-500" />
                Embroidery & Garment Opportunities
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-black dark:text-white sm:text-4xl">
                Explore Embroidery Jobs
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
                Discover Wilcom digitizing roles, factory production shifts, bridal Karchupi positions, and freelance gigs across Bangladesh.
              </p>
            </div>

            <Link
              href="/jobs/post"
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              <PlusCircle size={18} />
              Post an Embroidery Job
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, skill (Wilcom, Tajima), company, or location..."
                className="w-full rounded-xl border border-black/15 bg-white py-2.5 pl-10 pr-4 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
              />
            </div>

            {/* Category Quick Filter Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-zinc-700 focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-white"
            >
              <option value="ALL">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Job Type Dropdown */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-zinc-700 focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-white"
            >
              <option value="ALL">All Job Types</option>
              <option value="FULL_TIME">Full-Time</option>
              <option value="FREELANCE">Freelance</option>
              <option value="PART_TIME">Part-Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>

            {/* Workplace Dropdown */}
            <select
              value={selectedWorkplace}
              onChange={(e) => setSelectedWorkplace(e.target.value)}
              className="rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-zinc-700 focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-white"
            >
              <option value="ALL">All Locations</option>
              <option value="ONSITE">On-Site</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Showing {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"}
          </p>

          {(searchQuery ||
            selectedCategory !== "ALL" ||
            selectedType !== "ALL" ||
            selectedWorkplace !== "ALL") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
                setSelectedType("ALL");
                setSelectedWorkplace("ALL");
              }}
              className="text-xs font-semibold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-48 animate-pulse rounded-2xl border border-black/5 bg-white p-6 dark:border-white/10 dark:bg-zinc-900"
              />
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          /* Empty State */
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/15 bg-white py-16 text-center dark:border-white/15 dark:bg-zinc-950">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5 text-black dark:bg-white/10 dark:text-white">
              <Briefcase size={26} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-black dark:text-white">
              No jobs found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
              Try adjusting your search query or filters to find what you&apos;re looking for.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                  setSelectedType("ALL");
                  setSelectedWorkplace("ALL");
                }}
                className="rounded-xl border border-black/15 px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-100 dark:border-white/15 dark:text-white dark:hover:bg-zinc-900"
              >
                Clear all filters
              </button>
              <Link
                href="/jobs/post"
                className="rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                Post the first job
              </Link>
            </div>
          </div>
        ) : (
          /* Job Cards Grid */
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/jobs/${job.id}`}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-black/30 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/70 dark:hover:border-white/30"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {job.company?.logo ? (
                        <img
                          src={job.company.logo}
                          alt={job.company.name}
                          className="h-11 w-11 rounded-xl object-cover border border-black/10 dark:border-white/10"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                          {job.company?.name ? job.company.name.charAt(0) : "E"}
                        </div>
                      )}
                      <div>
                        <h2 className="text-base font-bold text-black transition group-hover:underline dark:text-white">
                          {job.title}
                        </h2>
                        <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                          {job.company?.name || "Verified Employer"}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {formatJobType(job.jobType)}
                    </span>
                  </div>

                  <p className="mt-4 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {job.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                    {job.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={13} />
                        {job.location} ({formatWorkplace(job.workplaceType)})
                      </span>
                    )}

                    {(job.salaryMin || job.salaryMax) && (
                      <span className="flex items-center gap-1 font-semibold text-black dark:text-white">
                        <DollarSign size={13} />
                        {job.salaryMin && job.salaryMax
                          ? `৳${job.salaryMin.toLocaleString()} - ৳${job.salaryMax.toLocaleString()}`
                          : job.salaryMin
                          ? `৳${job.salaryMin.toLocaleString()}+`
                          : `Up to ৳${job.salaryMax?.toLocaleString()}`}{" "}
                        {job.jobType === "FREELANCE" ? "/ design" : "/ mo"}
                      </span>
                    )}

                    {job.category && (
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {job.category.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 text-xs font-semibold text-black dark:border-white/5 dark:text-white">
                  <span className="text-[11px] font-normal text-zinc-400">
                    Posted {new Date(job.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1 text-black underline underline-offset-4 group-hover:opacity-80 dark:text-white">
                    View Details & Apply <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
