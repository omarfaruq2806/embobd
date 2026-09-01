"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Mail,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Globe,
  Sparkles,
  Layers,
  Copy,
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
  applyEmail: string;
  publishedAt: string | null;
  createdAt: string;
  company: {
    id: string;
    name: string;
    description: string | null;
    website: string | null;
    logo: string | null;
  };
  category: {
    id: string;
    name: string;
    description: string | null;
  };
  owner: {
    id: string;
    name: string;
    email: string;
  };
}

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    async function fetchJob() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/v1/jobs/${id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setJob(json.data);
        }
      } catch (err) {
        console.error("Failed to load job details:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchJob();
    }
  }, [id, API_URL]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
        return "On-Site (Factory/Studio)";
      case "REMOTE":
        return "Remote (Work from Home)";
      case "HYBRID":
        return "Hybrid";
      default:
        return wp;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50/50 dark:bg-black">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-black border-t-transparent dark:border-white dark:border-t-transparent" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-black dark:text-white">Job Not Found</h1>
        <p className="mt-2 text-sm text-zinc-500">
          This embroidery job posting may have expired or been removed.
        </p>
        <Link
          href="/jobs"
          className="mt-6 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black"
        >
          Return to Job Board
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50/50 py-10 dark:bg-black lg:py-14">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={14} /> Back to all jobs
        </Link>

        {/* Top Header Card */}
        <div className="mt-4 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="flex items-start gap-4">
              {job.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-black/10 dark:border-white/10"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-xl font-bold text-white dark:bg-white dark:text-black">
                  {job.company?.name ? job.company.name.charAt(0) : "E"}
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white sm:text-3xl">
                    {job.title}
                  </h1>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-black dark:text-white">
                    {job.company?.name}
                  </span>
                  {job.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </span>
                    </>
                  )}
                  <span>•</span>
                  <span>{formatWorkplace(job.workplaceType)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 size={15} />
                    Share Job
                  </>
                )}
              </button>

              <a
                href={`mailto:${job.applyEmail}?subject=Application for ${encodeURIComponent(job.title)} (via EMBOBD)&body=Hello ${encodeURIComponent(job.company?.name || "Hiring Team")},%0D%0A%0D%0AI am writing to express my interest in the ${encodeURIComponent(job.title)} position posted on EMBOBD.`}
                className="flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                <Mail size={15} />
                Apply Now
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-black/5 pt-6 dark:border-white/5 sm:grid-cols-4">
            <div className="rounded-2xl bg-zinc-50 p-3.5 dark:bg-zinc-900/60">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Salary / Rate</span>
              <p className="mt-1 text-sm font-bold text-black dark:text-white">
                {job.salaryMin || job.salaryMax
                  ? `${job.salaryMin ? `৳${job.salaryMin.toLocaleString()}` : ""}${
                      job.salaryMin && job.salaryMax ? " - " : ""
                    }${job.salaryMax ? `৳${job.salaryMax.toLocaleString()}` : ""}`
                  : "Negotiable"}{" "}
                <span className="text-xs font-normal text-zinc-500">
                  {job.jobType === "FREELANCE" ? "/ design" : "/ mo"}
                </span>
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-3.5 dark:bg-zinc-900/60">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Job Type</span>
              <p className="mt-1 text-sm font-bold text-black dark:text-white">
                {formatJobType(job.jobType)}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-3.5 dark:bg-zinc-900/60">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Category</span>
              <p className="mt-1 text-sm font-bold text-black dark:text-white truncate">
                {job.category?.name}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-3.5 dark:bg-zinc-900/60">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">Deadline</span>
              <p className="mt-1 text-sm font-bold text-black dark:text-white">
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Open until filled"}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Job Description Column */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
              <h2 className="text-lg font-bold text-black dark:text-white">
                Job Overview & Responsibilities
              </h2>

              <div className="mt-6 whitespace-pre-line text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {job.description}
              </div>

              <div className="mt-10 rounded-2xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-zinc-900/60">
                <h3 className="text-sm font-bold text-black dark:text-white">
                  How to Apply:
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Send your updated resume along with sample stitchout photos or digitized files (EMB/DST) to:
                </p>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3 border border-black/10 dark:bg-zinc-900 dark:border-white/10">
                  <span className="text-xs font-mono font-semibold text-black dark:text-white">
                    {job.applyEmail}
                  </span>
                  <a
                    href={`mailto:${job.applyEmail}`}
                    className="text-xs font-semibold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column: Company & Safety */}
          <div className="flex flex-col gap-6">
            {/* Company Info Card */}
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                About the Employer
              </h3>

              <div className="mt-4 flex items-center gap-3">
                {job.company?.logo ? (
                  <img
                    src={job.company.logo}
                    alt={job.company.name}
                    className="h-12 w-12 rounded-xl object-cover border border-black/10"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                    {job.company?.name ? job.company.name.charAt(0) : "E"}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-black dark:text-white">
                    {job.company?.name}
                  </h4>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck size={13} /> Verified Business
                  </span>
                </div>
              </div>

              {job.company?.description && (
                <p className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {job.company.description}
                </p>
              )}

              {job.company?.website && (
                <div className="mt-5 border-t border-black/5 pt-4 dark:border-white/5">
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
                  >
                    Visit Company Website <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>

            {/* Application Safety Tips */}
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
              <h3 className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white">
                <ShieldCheck size={16} className="text-indigo-500" /> EMBOBD Candidate Safety
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li>• Never pay any application or recruitment fees to employers.</li>
                <li>• Always verify machine types (Tajima, Barudan) and sample file requirements before committing.</li>
                <li>• Report any suspicious listings directly to support.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
