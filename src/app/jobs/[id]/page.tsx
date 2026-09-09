"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
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
  Bookmark,
  Send,
  UploadCloud,
  FileText,
  AlertCircle,
  X,
  User,
  Phone,
  Check,
} from "lucide-react";
import { jobApi, userApi } from "@/services";

export default function JobDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: session } = authClient.useSession();
  const user = (session as any)?.user;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [submittingApply, setSubmittingApply] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  const [applyForm, setApplyForm] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    portfolioUrl: "",
    resumeUrl: "",
    coverNote: "",
  });

  // Check saved state and applied state on mount
  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      try {
        const savedJobs = JSON.parse(localStorage.getItem("embobd_saved_jobs") || "[]");
        setIsSaved(savedJobs.some((j: any) => j.id === id || j === id));

        const appliedJobs = JSON.parse(localStorage.getItem("embobd_applied_jobs") || "[]");
        setHasApplied(appliedJobs.some((a: any) => a.jobId === id));
      } catch (e) {
        console.error("Failed to read localStorage:", e);
      }
    }
  }, [id]);

  // Load Job
  useEffect(() => {
    async function fetchJob() {
      if (!id) return;
      try {
        setLoading(true);
        const res = await jobApi.getById(id);
        if (res.success && res.data) {
          setJob(res.data);
        }
      } catch (err) {
        console.error("Failed to load job details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchJob();
  }, [id]);

  // Pre-fill apply form if user logged in
  useEffect(() => {
    if (user && isApplyModalOpen) {
      setApplyForm((prev) => ({
        ...prev,
        candidateName: prev.candidateName || user.name || "",
        candidateEmail: prev.candidateEmail || user.email || "",
      }));

      // Fetch profile to pre-fill phone and portfolio
      userApi.getById(user.id).then((res) => {
        if (res.success && res.data?.profile) {
          const prof = res.data.profile;
          setApplyForm((prev) => ({
            ...prev,
            candidatePhone: prev.candidatePhone || prof.phone || "",
            portfolioUrl: prev.portfolioUrl || prof.portfolioUrl || "",
            resumeUrl: prev.resumeUrl || prof.resumeUrl || "",
          }));
        }
      });
    }
  }, [user, isApplyModalOpen]);

  const handleToggleSave = () => {
    if (typeof window === "undefined" || !job) return;
    try {
      const saved = JSON.parse(localStorage.getItem("embobd_saved_jobs") || "[]");
      let updated;
      if (isSaved) {
        updated = saved.filter((item: any) => (typeof item === "string" ? item !== id : item.id !== id));
        setIsSaved(false);
      } else {
        const jobSummary = {
          id: job.id,
          title: job.title,
          company: job.company?.name || "Verified Factory",
          location: job.location || "Bangladesh",
          jobType: job.jobType,
          salaryMin: job.salaryMin,
          salaryMax: job.salaryMax,
          savedAt: new Date().toISOString(),
        };
        updated = [...saved.filter((item: any) => (typeof item === "string" ? item !== id : item.id !== id)), jobSummary];
        setIsSaved(true);
      }
      localStorage.setItem("embobd_saved_jobs", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to update saved jobs:", e);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplyError(null);

    if (!applyForm.candidateName.trim()) {
      setApplyError("Please enter your full name.");
      return;
    }
    if (!applyForm.candidateEmail.trim()) {
      setApplyError("Please enter a valid email address.");
      return;
    }

    setSubmittingApply(true);

    try {
      // Record application in local store
      const applicationRecord = {
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.company?.name || "Embroidery Employer",
        location: job.location || "Bangladesh",
        jobType: job.jobType,
        applyEmail: job.applyEmail,
        candidateName: applyForm.candidateName.trim(),
        candidateEmail: applyForm.candidateEmail.trim(),
        candidatePhone: applyForm.candidatePhone.trim(),
        portfolioUrl: applyForm.portfolioUrl.trim(),
        resumeUrl: applyForm.resumeUrl.trim(),
        coverNote: applyForm.coverNote.trim(),
        appliedAt: new Date().toISOString(),
        status: "APPLIED",
      };

      if (typeof window !== "undefined") {
        const applied = JSON.parse(localStorage.getItem("embobd_applied_jobs") || "[]");
        const updated = [applicationRecord, ...applied.filter((a: any) => a.jobId !== job.id)];
        localStorage.setItem("embobd_applied_jobs", JSON.stringify(updated));
      }

      setHasApplied(true);
      setApplySuccess(true);
    } catch (err: any) {
      setApplyError("Failed to record application. Please try again.");
    } finally {
      setSubmittingApply(false);
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

  const emailSubject = encodeURIComponent(`Application: ${job.title} - ${applyForm.candidateName || "Embroidery Professional"} (via EMBOBD)`);
  const emailBody = encodeURIComponent(
    `Dear ${job.company?.name || "Hiring Team"},\n\n` +
    `I am applying for the position of "${job.title}" listed on EMBOBD.\n\n` +
    `Candidate Details:\n` +
    `- Name: ${applyForm.candidateName || user?.name || "[Your Name]"}\n` +
    `- Email: ${applyForm.candidateEmail || user?.email || "[Your Email]"}\n` +
    `- Phone: ${applyForm.candidatePhone || "[Your Phone]"}\n` +
    (applyForm.portfolioUrl ? `- Portfolio / Samples: ${applyForm.portfolioUrl}\n` : "") +
    (applyForm.resumeUrl ? `- Resume Link: ${applyForm.resumeUrl}\n` : "") +
    (applyForm.coverNote ? `\nSummary / Pitch:\n${applyForm.coverNote}\n\n` : "\n") +
    `Thank you for considering my application.\n\n` +
    `Best regards,\n${applyForm.candidateName || user?.name || "Candidate"}`
  );

  return (
    <main className="min-h-screen bg-zinc-50/50 py-10 dark:bg-black lg:py-14">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            <ArrowLeft size={14} /> Back to all jobs
          </Link>

          {hasApplied && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
              <CheckCircle2 size={13} /> You applied for this position
            </span>
          )}
        </div>

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
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Bookmark Button */}
              <button
                type="button"
                onClick={handleToggleSave}
                title={isSaved ? "Remove from Saved" : "Save Job"}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                  isSaved
                    ? "border-amber-500 bg-amber-50 text-amber-700 dark:border-amber-500/50 dark:bg-amber-950/40 dark:text-amber-300"
                    : "border-black/15 bg-white text-black hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                }`}
              >
                <Bookmark size={15} className={isSaved ? "fill-current text-amber-500" : ""} />
                {isSaved ? "Saved" : "Save"}
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-xs font-semibold text-black transition hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={15} className="text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Share2 size={15} />
                    Share
                  </>
                )}
              </button>

              {/* Apply Button */}
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold shadow-xs transition ${
                  hasApplied
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-black text-white hover:opacity-90 dark:bg-white dark:text-black"
                }`}
              >
                {hasApplied ? <CheckCircle2 size={15} /> : <Send size={15} />}
                {hasApplied ? "Apply Again / Edit" : "Quick Apply"}
              </button>
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

              {/* Direct Application & Email Box */}
              <div className="mt-10 rounded-2xl border border-black/10 bg-zinc-50 p-6 dark:border-white/10 dark:bg-zinc-900/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-black dark:text-white">
                    Ready to apply?
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs dark:bg-white dark:text-black"
                  >
                    <Send size={13} /> Open Quick Apply
                  </button>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  You can submit your portfolio directly on EMBOBD or send your files (EMB/DST/stitch samples) directly to the employer&apos;s email address:
                </p>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3 border border-black/10 dark:bg-zinc-900 dark:border-white/10">
                  <span className="text-xs font-mono font-semibold text-black dark:text-white">
                    {job.applyEmail}
                  </span>
                  <a
                    href={`mailto:${job.applyEmail}?subject=${emailSubject}&body=${emailBody}`}
                    className="text-xs font-semibold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
                  >
                    Send Direct Email
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

      {/* QUICK APPLY MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-zinc-950 sm:p-8 my-8">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
            >
              <X size={18} />
            </button>

            {applySuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-black dark:text-white">
                  Application Recorded!
                </h3>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
                  Your application for <strong>{job.title}</strong> at <strong>{job.company?.name}</strong> has been saved to your candidate dashboard.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`mailto:${job.applyEmail}?subject=${emailSubject}&body=${emailBody}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    <Mail size={15} /> Send Direct Email with Pre-filled Pitch
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsApplyModalOpen(false);
                      setApplySuccess(false);
                    }}
                    className="rounded-xl border border-black/15 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-bold text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                      Quick Apply
                    </span>
                    <span className="text-xs text-zinc-400">•</span>
                    <span className="text-xs text-zinc-500 truncate">{job.company?.name}</span>
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-black dark:text-white">
                    Apply for {job.title}
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Send your embroidery credentials directly to the hiring manager.
                  </p>
                </div>

                {applyError && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                    <AlertCircle size={15} />
                    <span>{applyError}</span>
                  </div>
                )}

                {/* Candidate Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applyForm.candidateName}
                      onChange={(e) => setApplyForm({ ...applyForm, candidateName: e.target.value })}
                      placeholder="e.g. Md. Jahangir Alam"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applyForm.candidateEmail}
                      onChange={(e) => setApplyForm({ ...applyForm, candidateEmail: e.target.value })}
                      placeholder="your.email@example.com"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Phone & Portfolio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={applyForm.candidatePhone}
                      onChange={(e) => setApplyForm({ ...applyForm, candidatePhone: e.target.value })}
                      placeholder="+880 1700-000000"
                      className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Portfolio / Samples URL
                    </label>
                    <input
                      type="url"
                      value={applyForm.portfolioUrl}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Resume URL with Cloudflare R2 Demo Notice */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Resume / CV Link
                    </label>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      Cloudflare R2 (Demo Mode)
                    </span>
                  </div>
                  <input
                    type="url"
                    value={applyForm.resumeUrl}
                    onChange={(e) => setApplyForm({ ...applyForm, resumeUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/... (Direct Link)"
                    className="mt-1 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                  />
                  <p className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                    💡 <em>Direct file upload will be powered by Cloudflare R2. For now, you can paste any public Google Drive, Dropbox, or PDF link.</em>
                  </p>
                </div>

                {/* Cover Note */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Short Pitch / Message to Hiring Manager
                  </label>
                  <textarea
                    rows={3}
                    value={applyForm.coverNote}
                    onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })}
                    placeholder="Briefly state your embroidery experience, digitizing software mastery (Wilcom/Tajima), and availability..."
                    className="mt-1 w-full rounded-xl border border-black/15 bg-white p-3 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="rounded-xl border border-black/15 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-white/15 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingApply}
                    className="flex items-center gap-2 rounded-xl bg-black px-6 py-2.5 text-xs font-semibold text-white shadow-xs hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
                  >
                    {submittingApply ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
