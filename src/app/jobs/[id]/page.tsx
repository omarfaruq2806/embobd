"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Briefcase,
  Building,
  MapPin,
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
  Bookmark,
  Send,
  UploadCloud,
  FileText,
  AlertCircle,
  X,
  Phone,
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
          company: job.company?.name || "ভেরিফাইড প্রতিষ্ঠান",
          location: job.location || "বাংলাদেশ",
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
      setApplyError("দয়া করে আপনার পূর্ণ নাম লিখুন।");
      return;
    }
    if (!applyForm.candidateEmail.trim()) {
      setApplyError("দয়া করে সঠিক ইমেইল ঠিকানা দিন।");
      return;
    }

    setSubmittingApply(true);

    try {
      const applicationRecord = {
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.company?.name || "এমব্রয়ডারি নিয়োগকারী",
        location: job.location || "বাংলাদেশ",
        jobType: job.jobType,
        applyEmail: job.applyEmail,
        candidateName: applyForm.candidateName.trim(),
        candidateEmail: applyForm.candidateEmail.trim(),
        candidatePhone: applyForm.candidatePhone.trim(),
        portfolioUrl: applyForm.portfolioUrl.trim(),
        resumeUrl: applyForm.resumeUrl.trim(),
        coverNote: applyForm.coverNote.trim(),
        appliedAt: new Date().toISOString(),
        status: "জমা দেওয়া হয়েছে",
      };

      if (typeof window !== "undefined") {
        const applied = JSON.parse(localStorage.getItem("embobd_applied_jobs") || "[]");
        const updated = [applicationRecord, ...applied.filter((a: any) => a.jobId !== job.id)];
        localStorage.setItem("embobd_applied_jobs", JSON.stringify(updated));
      }

      setHasApplied(true);
      setApplySuccess(true);
    } catch (err: any) {
      setApplyError("আবেদন জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setSubmittingApply(false);
    }
  };

  const formatJobType = (type: string) => {
    switch (type) {
      case "FULL_TIME":
        return "ফুল-টাইম";
      case "PART_TIME":
        return "পার্ট-টাইম";
      case "FREELANCE":
        return "ফ্রিল্যান্স / চুক্তিভিত্তিক";
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
        return "অন-সাইট (ফ্যাক্টরি / স্টুডিও)";
      case "REMOTE":
        return "রিমোট (বাসা থেকে কাজ)";
      case "HYBRID":
        return "হাইব্রিড";
      default:
        return wp;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-zinc-50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center bg-zinc-50 font-sans">
        <h1 className="text-2xl font-bold text-zinc-950">বিজ্ঞপ্তিটি পাওয়া যায়নি</h1>
        <p className="mt-2 text-sm text-zinc-600">
          এই চাকরির বিজ্ঞপ্তির মেয়াদ শেষ হয়ে থাকতে পারে বা সরিয়ে ফেলা হয়েছে।
        </p>
        <Link
          href="/jobs"
          className="mt-6 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white shadow-sm"
        >
          চাকরির তালিকায় ফিরুন
        </Link>
      </div>
    );
  }

  const emailSubject = encodeURIComponent(`চাকরির আবেদন: ${job.title} - ${applyForm.candidateName || "এমব্রয়ডারি কারিগর"} (EMBOBD এর মাধ্যমে)`);
  const emailBody = encodeURIComponent(
    `শ্রদ্ধেয় ${job.company?.name || "হায়ারিং টিম"},\n\n` +
    `আমি EMBOBD প্ল্যাটফর্মে প্রকাশিত আপনার "${job.title}" পদের বিজ্ঞপ্তিতে আবেদন করছি।\n\n` +
    `প্রার্থীর তথ্য:\n` +
    `- নাম: ${applyForm.candidateName || user?.name || "[আপনার নাম]"}\n` +
    `- ইমেইল: ${applyForm.candidateEmail || user?.email || "[আপনার ইমেইল]"}\n` +
    `- মোবাইল: ${applyForm.candidatePhone || "[মোবাইল নম্বর]"}\n` +
    (applyForm.portfolioUrl ? `- পোর্টফোলিও / কাজের স্যাম্পল: ${applyForm.portfolioUrl}\n` : "") +
    (applyForm.resumeUrl ? `- সিভি লিংক: ${applyForm.resumeUrl}\n` : "") +
    (applyForm.coverNote ? `\nঅভিজ্ঞতা ও দক্ষতা বিবরণ:\n${applyForm.coverNote}\n\n` : "\n") +
    `আমার আবেদনটি বিবেচনা করার জন্য ধন্যবাদ।\n\n` +
    `বিনীত,\n${applyForm.candidateName || user?.name || "প্রার্থী"}`
  );

  return (
    <main className="min-h-screen bg-zinc-50 py-10 lg:py-14 font-sans">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft size={14} /> সকল চাকরির বিজ্ঞপ্তিতে ফিরুন
          </Link>

          {hasApplied && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 shadow-xs">
              <CheckCircle2 size={13} className="text-emerald-600" /> আপনি আবেদন করেছেন
            </span>
          )}
        </div>

        {/* Top Header Card */}
        <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="flex items-start gap-4">
              {job.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-zinc-200 shadow-sm"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-xl font-black text-white shadow-sm">
                  {job.company?.name ? job.company.name.charAt(0) : "E"}
                </div>
              )}

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                    {job.title}
                  </h1>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-medium text-zinc-600">
                  <span className="font-bold text-zinc-950">
                    {job.company?.name}
                  </span>
                  {job.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-zinc-400" /> {job.location}
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
                title={isSaved ? "বুকমার্ক মুছুন" : "সেভ করুন"}
                className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                  isSaved
                    ? "border-amber-300 bg-amber-50 text-amber-900 shadow-xs"
                    : "border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <Bookmark size={15} className={isSaved ? "fill-current text-amber-500" : ""} />
                {isSaved ? "সংরক্ষিত" : "সেভ করুন"}
              </button>

              {/* Share Button */}
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-900 transition hover:bg-zinc-100"
              >
                {copied ? (
                  <>
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    লিংক কপি হয়েছে!
                  </>
                ) : (
                  <>
                    <Share2 size={15} />
                    শেয়ার করুন
                  </>
                )}
              </button>

              {/* Apply Button */}
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-sm transition ${
                  hasApplied
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-zinc-950 text-white hover:opacity-90"
                }`}
              >
                {hasApplied ? <CheckCircle2 size={15} /> : <Send size={15} />}
                {hasApplied ? "আবার আবেদন / এডিট" : "কুইক অ্যাপ্লাই করুন"}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-zinc-100 pt-6 sm:grid-cols-4">
            <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
              <span className="text-[11px] font-semibold text-zinc-500">বেতন / পারিশ্রমিক</span>
              <p className="mt-1 text-sm font-bold text-zinc-950">
                {job.salaryMin || job.salaryMax
                  ? `${job.salaryMin ? `৳${job.salaryMin.toLocaleString()}` : ""}${
                      job.salaryMin && job.salaryMax ? " - " : ""
                    }${job.salaryMax ? `৳${job.salaryMax.toLocaleString()}` : ""}`
                  : "আলোচনা সাপেক্ষে"}{" "}
                <span className="text-xs font-normal text-zinc-500">
                  {job.jobType === "FREELANCE" ? "/ ডিজাইন" : "/ মাসিক"}
                </span>
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
              <span className="text-[11px] font-semibold text-zinc-500">চাকরির ধরণ</span>
              <p className="mt-1 text-sm font-bold text-zinc-950">
                {formatJobType(job.jobType)}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
              <span className="text-[11px] font-semibold text-zinc-500">ক্যাটাগরি</span>
              <p className="mt-1 text-sm font-bold text-zinc-950 truncate">
                {job.category?.name}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
              <span className="text-[11px] font-semibold text-zinc-500">আবেদনের শেষ সময়</span>
              <p className="mt-1 text-sm font-bold text-zinc-950">
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString("bn-BD", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "পদ পূরণ না হওয়া পর্যন্ত"}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Job Description Column */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-bold text-zinc-950">
                কাজের দায়িত্ব ও বিস্তারিত বিবরণ
              </h2>

              <div className="mt-6 whitespace-pre-line text-sm leading-relaxed text-zinc-700">
                {job.description}
              </div>

              {/* Direct Application & Email Box */}
              <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-zinc-950">
                    আবেদন করতে প্রস্তুত?
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white shadow-sm"
                  >
                    <Send size={13} /> কুইক অ্যাপ্লাই খুলুন
                  </button>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                  আপনি সরাসরি EMBOBD এর মাধ্যমে আবেদন করতে পারেন অথবা আপনার তৈরি করা স্যাম্পল ফাইল (EMB/DST) সরাসরি কোম্পানির ইমেইলে পাঠাতে পারেন:
                </p>
                <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-3 border border-zinc-200">
                  <span className="text-xs font-mono font-semibold text-zinc-950">
                    {job.applyEmail}
                  </span>
                  <a
                    href={`mailto:${job.applyEmail}?subject=${emailSubject}&body=${emailBody}`}
                    className="text-xs font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
                  >
                    সরাসরি ইমেইল পাঠান
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Column: Company & Safety */}
          <div className="flex flex-col gap-6">
            {/* Company Info Card */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                নিয়োগকারী প্রতিষ্ঠান
              </h3>

              <div className="mt-4 flex items-center gap-3">
                {job.company?.logo ? (
                  <img
                    src={job.company.logo}
                    alt={job.company.name}
                    className="h-12 w-12 rounded-xl object-cover border border-zinc-200"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-sm font-black text-white">
                    {job.company?.name ? job.company.name.charAt(0) : "E"}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-zinc-950">
                    {job.company?.name}
                  </h4>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <ShieldCheck size={13} className="text-emerald-600" /> ভেরিফাইড প্রতিষ্ঠান
                  </span>
                </div>
              </div>

              {job.company?.description && (
                <p className="mt-4 text-xs leading-relaxed text-zinc-600">
                  {job.company.description}
                </p>
              )}

              {job.company?.website && (
                <div className="mt-5 border-t border-zinc-100 pt-4">
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
                  >
                    কোম্পানি ওয়েবসাইট ভিজিট করুন <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>

            {/* Application Safety Tips */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-1.5 text-xs font-bold text-zinc-950">
                <ShieldCheck size={16} className="text-indigo-600" /> চাকরিপ্রার্থীদের নিরাপত্তা সতর্কতা
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-zinc-600">
                <li>• চাকরির আবেদনের জন্য কাউকে কোনো আর্থিক ফি বা অগ্রিম টাকা প্রদান করবেন না।</li>
                <li>• কাজে যোগদানের পূর্বে মেশিনের ধরন (তাজিমা, বারুদান) ও স্যালারি আলোচনা করে নিন।</li>
                <li>• কোনো সন্দেহজনক পোস্ট দেখলে অবিলম্বে আমাদের সাপোর্ট টিমে রিপোর্ট করুন।</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK APPLY MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl sm:p-8 my-8">
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute right-5 top-5 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950"
            >
              <X size={18} />
            </button>

            {applySuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-zinc-950">
                  আবেদন সফলভাবে সম্পন্ন হয়েছে!
                </h3>
                <p className="mt-2 text-xs text-zinc-600 max-w-sm mx-auto">
                  <strong>{job.company?.name}</strong>-এর <strong>{job.title}</strong> পদে আপনার আবেদনটি রেকর্ড করা হয়েছে।
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`mailto:${job.applyEmail}?subject=${emailSubject}&body=${emailBody}`}
                    className="flex items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-xs font-bold text-white transition hover:opacity-90 shadow-sm"
                  >
                    <Mail size={15} /> সরাসরি ইমেইলে স্যাম্পল ফাইল পাঠান
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setIsApplyModalOpen(false);
                      setApplySuccess(false);
                    }}
                    className="rounded-xl border border-zinc-300 py-2.5 text-xs font-bold text-zinc-800 hover:bg-zinc-100"
                  >
                    বন্ধ করুন
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                      কুইক অ্যাপ্লাই
                    </span>
                    <span className="text-xs text-zinc-400">•</span>
                    <span className="text-xs text-zinc-500 truncate">{job.company?.name}</span>
                  </div>
                  <h2 className="mt-1 text-xl font-bold text-zinc-950">
                    {job.title} পদে আবেদন করুন
                  </h2>
                  <p className="text-xs text-zinc-500">
                    আপনার এমব্রয়ডারি কাজের নমুনা ও যোগাযোগের তথ্য প্রদান করুন।
                  </p>
                </div>

                {applyError && (
                  <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                    <AlertCircle size={15} />
                    <span>{applyError}</span>
                  </div>
                )}

                {/* Candidate Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-800">
                      পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={applyForm.candidateName}
                      onChange={(e) => setApplyForm({ ...applyForm, candidateName: e.target.value })}
                      placeholder="যেমন: মো. জাহাঙ্গীর আলম"
                      className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800">
                      ইমেইল ঠিকানা *
                    </label>
                    <input
                      type="email"
                      required
                      value={applyForm.candidateEmail}
                      onChange={(e) => setApplyForm({ ...applyForm, candidateEmail: e.target.value })}
                      placeholder="your.email@example.com"
                      className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone & Portfolio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-800">
                      মোবাইল নম্বর
                    </label>
                    <input
                      type="tel"
                      value={applyForm.candidatePhone}
                      onChange={(e) => setApplyForm({ ...applyForm, candidatePhone: e.target.value })}
                      placeholder="+৮৮০ ১৭০০-০০০০০০"
                      className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800">
                      পোর্টফোলিও / স্যাম্পল ড্রাইভ লিংক
                    </label>
                    <input
                      type="url"
                      value={applyForm.portfolioUrl}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Resume URL */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-800">
                    সিভি / জীবনবৃত্তান্ত লিংক
                  </label>
                  <input
                    type="url"
                    value={applyForm.resumeUrl}
                    onChange={(e) => setApplyForm({ ...applyForm, resumeUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/d/... (সরাসরি লিংক)"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                {/* Cover Note */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-800">
                    সংক্ষিপ্ত বার্তা / অভিজ্ঞতার বিবরণ
                  </label>
                  <textarea
                    rows={3}
                    value={applyForm.coverNote}
                    onChange={(e) => setApplyForm({ ...applyForm, coverNote: e.target.value })}
                    placeholder="আপনার কাজের অভিজ্ঞতা, কোন সফটওয়্যার (উইলকম/তাজিমা) ব্যবহার করেন এবং কবে যোগদান করতে পারবেন লিখুন..."
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white p-3 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="rounded-xl border border-zinc-300 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-100"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={submittingApply}
                    className="flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90 disabled:opacity-50"
                  >
                    {submittingApply ? "জমা হচ্ছে..." : "আবেদন সাবমিট করুন"}
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
