"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { userApi } from "@/services/user.service";
import { companyApi } from "@/services/company.service";
import { jobApi } from "@/services/job.service";
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
  Globe,
  Phone,
  MapPin,
  Save,
  Loader2,
  AlertCircle,
  UploadCloud,
  Edit3,
  Trash2,
  Mail,
  FileText,
  Eye,
  UserCheck,
} from "lucide-react";

export default function EmployerDashboardPage() {
  const { data: session } = authClient.useSession();
  const sessionUser = (session as any)?.user;

  const [activeTab, setActiveTab] = useState<"jobs" | "applicants" | "company" | "profile">("jobs");

  // State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [myJobs, setMyJobs] = useState<any[]>([]);
  const [company, setCompany] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    phone: "",
    location: "",
    bio: "",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    companyLogo: "",
  });

  // Load applicants from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedApplicants = JSON.parse(localStorage.getItem("embobd_applied_jobs") || "[]");
        setApplicants(storedApplicants);
      } catch (e) {
        console.error("Failed to load applicants:", e);
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (!sessionUser?.id) return;

    const fetchEmployerData = async () => {
      try {
        setLoading(true);

        // Fetch User and Profile
        const userRes = await userApi.getById(sessionUser.id);
        if (userRes.success && userRes.data) {
          const u = userRes.data;
          const p = u.profile || {};
          const userCompanies = u.companies || [];
          const primaryCompany = userCompanies[0] || null;
          setCompany(primaryCompany);

          setFormData({
            name: u.name || sessionUser.name || "",
            title: p.title || "নিয়োগ কর্মকর্তা",
            phone: p.phone || "",
            location: p.location || "",
            bio: p.bio || "",
            companyName: primaryCompany?.name || "",
            companyDescription: primaryCompany?.description || "",
            companyWebsite: primaryCompany?.website || "",
            companyLogo: primaryCompany?.logo || "",
          });
        }

        // Fetch Employer's Jobs
        const jobsRes = await jobApi.getAll({ ownerUserId: sessionUser.id });
        if (jobsRes.success && Array.isArray(jobsRes.data)) {
          setMyJobs(jobsRes.data);
        }
      } catch (err: any) {
        console.error("Failed to load employer dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, [sessionUser?.id, sessionUser?.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleJobStatus = async (jobId: string, currentStatus: string) => {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await jobApi.update(jobId, { status: newStatus });
      if (res.success) {
        setMyJobs((prev) =>
          prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
        );
        setSuccessMessage(newStatus === "PUBLISHED" ? "চাকরির বিজ্ঞপ্তিটি পাবলিশ করা হয়েছে!" : "চাকরির বিজ্ঞপ্তিটি ড্রাফট করা হয়েছে।");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update job status:", err);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই চাকরির বিজ্ঞপ্তিটি মুছে ফেলতে চান?")) return;
    try {
      const res = await jobApi.delete(jobId);
      if (res.success) {
        setMyJobs((prev) => prev.filter((j) => j.id !== jobId));
        setSuccessMessage("বিজ্ঞপ্তিটি সফলভাবে মুছে ফেলা হয়েছে।");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  const handleSaveCompanyAndProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionUser?.id) return;

    try {
      setSaving(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      // 1. Update user name
      if (formData.name !== sessionUser.name) {
        await userApi.updateUser(sessionUser.id, { name: formData.name });
      }

      // 2. Update profile
      await userApi.updateProfile(sessionUser.id, {
        title: formData.title.trim() || null,
        phone: formData.phone.trim() || null,
        location: formData.location.trim() || null,
        bio: formData.bio.trim() || null,
      });

      // 3. Update or create company
      if (formData.companyName.trim()) {
        if (company?.id) {
          await companyApi.update(company.id, {
            name: formData.companyName.trim(),
            description: formData.companyDescription.trim() || null,
            website: formData.companyWebsite.trim() || null,
            logo: formData.companyLogo.trim() || null,
          });
        } else {
          const newComp = await companyApi.create({
            name: formData.companyName.trim(),
            description: formData.companyDescription.trim() || null,
            website: formData.companyWebsite.trim() || null,
            logo: formData.companyLogo.trim() || null,
          });
          if (newComp.success) {
            setCompany(newComp.data);
          }
        }
      }

      setSuccessMessage("কোম্পানি ও নিয়োগকারী প্রোফাইল সফলভাবে আপডেট করা হয়েছে! 🎉");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err?.message || "প্রোফাইল পরিবর্তন সংরক্ষণ করা যায়নি।");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 py-10 lg:py-14 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome Header with Content-Writer Hook */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-2xl font-black text-white shadow-sm">
              {formData.companyName?.charAt(0) || formData.name?.charAt(0) || "E"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                  {formData.companyName || formData.name || "নিয়োগকারী স্টুডিও"}
                </h1>
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[11px] font-bold text-indigo-800">
                  ফ্যাক্টরি / নিয়োগকারী প্রোফাইল
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600">
                {formData.name} • {formData.title || "নিয়োগ কর্মকর্তা"} •{" "}
                {formData.location || "ঠিকানা দেওয়া হয়নি"}
              </p>
            </div>
          </div>

          <Link
            href="/jobs/post"
            className="flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90 shadow-sm"
          >
            <PlusCircle size={15} /> নতুন চাকরি পোস্ট করুন
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            onClick={() => setActiveTab("jobs")}
            className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400"
          >
            <div className="flex items-center justify-between text-zinc-600">
              <span className="text-xs font-semibold">সক্রিয় চাকরির পোস্ট</span>
              <Briefcase size={16} className="text-zinc-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950">{myJobs.length}</p>
            <p className="mt-1 text-[11px] text-zinc-500">মোট সার্কুলার</p>
          </div>

          <div
            onClick={() => setActiveTab("applicants")}
            className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400"
          >
            <div className="flex items-center justify-between text-zinc-600">
              <span className="text-xs font-semibold">আবেদনকারী প্রার্থী</span>
              <Users size={16} className="text-indigo-600" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950">
              {applicants.length}
            </p>
            <p className="mt-1 text-[11px] text-indigo-700">মোট আবেদন জমা হয়েছে</p>
          </div>

          <div
            onClick={() => setActiveTab("jobs")}
            className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400"
          >
            <div className="flex items-center justify-between text-zinc-600">
              <span className="text-xs font-semibold">পাবলিশ করা লাইভ</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950">
              {myJobs.filter((j) => j.status === "PUBLISHED").length}
            </p>
            <p className="mt-1 text-[11px] text-emerald-700">সরাসরি দৃশ্যমান</p>
          </div>

          <div
            onClick={() => setActiveTab("company")}
            className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400"
          >
            <div className="flex items-center justify-between text-zinc-600">
              <span className="text-xs font-semibold">কোম্পানি প্রোফাইল</span>
              <Building size={16} className="text-zinc-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950">
              {formData.companyName ? "সক্রিয়" : "অসম্পূর্ণ"}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">
              {formData.companyName ? "ভেরিফাইড প্রতিষ্ঠান" : "তথ্য পূরণ করুন"}
            </p>
          </div>
        </div>

        {/* Status Alerts */}
        {successMessage && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 shadow-xs">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 shadow-xs">
            <AlertCircle size={16} className="shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mt-8 flex items-center gap-2 border-b border-zinc-200 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "jobs"
                ? "bg-zinc-950 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Briefcase size={14} /> আমার চাকরির বিজ্ঞাপন ({myJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("applicants")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "applicants"
                ? "bg-zinc-950 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Users size={14} /> আবেদনকারী ট্র্যাকিং ({applicants.length})
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "company"
                ? "bg-zinc-950 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Building size={14} /> ফ্যাক্টরি ও প্রতিষ্ঠান প্রোফাইল
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-zinc-950 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Edit3 size={14} /> নিয়োগ কর্মকর্তার তথ্য
          </button>
        </div>

        {/* TAB 1: MY JOBS */}
        {activeTab === "jobs" && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-950">
                  পোস্টকৃত চাকরির বিজ্ঞপ্তিসমূহ
                </h2>
                <p className="text-xs text-zinc-500">
                  উইলকম পাঞ্চার, মেশিন অপারেটর এবং স্যাম্পল মেকারদের জন্য আপনার তৈরি সার্কুলারগুলো নিয়ন্ত্রণ করুন।
                </p>
              </div>
              <Link
                href="/jobs/post"
                className="flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                <PlusCircle size={14} /> আরেকটি চাকরি পোস্ট করুন
              </Link>
            </div>

            {loading ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2 size={24} className="animate-spin text-zinc-500" />
              </div>
            ) : myJobs.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
                <Briefcase size={32} className="text-zinc-400" />
                <p className="mt-3 text-sm font-bold text-zinc-950">
                  এখনও কোনো চাকরি পোস্ট করা হয়নি
                </p>
                <p className="mt-1 max-w-sm text-xs text-zinc-500">
                  আপনার প্রতিষ্ঠানের এমব্রয়ডারি কর্মী নিয়োগ দিতে আজই বিজ্ঞাপন তৈরি করুন।
                </p>
                <Link
                  href="/jobs/post"
                  className="mt-5 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white shadow-sm"
                >
                  প্রথম চাকরি পোস্ট করুন
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {myJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:flex-row sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-zinc-950">
                          {job.title}
                        </h3>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${
                            job.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          {job.status === "PUBLISHED" ? "পাবলিশড" : "ড্রাফট"}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600">
                        <span>{job.jobType}</span>
                        <span>•</span>
                        <span>{job.workplaceType}</span>
                        {job.location && (
                          <>
                            <span>•</span>
                            <span>{job.location}</span>
                          </>
                        )}
                        <span>•</span>
                        <span className="font-semibold text-zinc-950">
                          {job.salaryMin || job.salaryMax
                            ? `৳${job.salaryMin || 0} - ৳${job.salaryMax || 0}`
                            : "আলোচনা সাপেক্ষে"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleJobStatus(job.id, job.status)}
                        className="rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-100"
                      >
                        {job.status === "PUBLISHED" ? "আনপাবলিশ করুন" : "পাবলিশ করুন"}
                      </button>

                      <Link
                        href={`/jobs/${job.id}`}
                        className="rounded-xl border border-zinc-300 bg-white p-2 text-zinc-900 hover:bg-zinc-100"
                        title="বিজ্ঞপ্তিটি দেখুন"
                      >
                        <Eye size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job.id)}
                        className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-600 hover:bg-rose-100"
                        title="বিজ্ঞপ্তি মুছুন"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: APPLICANTS VIEWER */}
        {activeTab === "applicants" && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-950">
                  প্রার্থীদের আবেদনপত্র তালিকা
                </h2>
                <p className="text-xs text-zinc-500">
                  আবেদনকারীদের পোর্টফোলিও, সিভি এবং যোগাযোগের বিবরণ সরাসরি যাচাই করুন।
                </p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-800">
                মোট {applicants.length} জন আবেদনকারী
              </span>
            </div>

            {applicants.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
                <Users size={32} className="text-zinc-400" />
                <p className="mt-3 text-sm font-bold text-zinc-950">
                  এখনও কোনো আবেদন জমা পড়েনি
                </p>
                <p className="mt-1 max-w-sm text-xs text-zinc-500">
                  প্রার্থীরা EMBOBD কুইক অ্যাপ্লাই করলে তাদের প্রোফাইল ও মেসেজ সাথে সাথে এখানে দেখতে পাবেন।
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {applicants.map((app, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-zinc-950">
                            {app.candidateName}
                          </h3>
                          <span className="rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-bold text-indigo-800">
                            পদ: {app.jobTitle}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                          <span className="flex items-center gap-1.5">
                            <Mail size={13} className="text-zinc-400" /> {app.candidateEmail}
                          </span>
                          {app.candidatePhone && (
                            <span className="flex items-center gap-1.5">
                              <Phone size={13} className="text-zinc-400" /> {app.candidatePhone}
                            </span>
                          )}
                          <span className="text-[11px] text-zinc-500">
                            আবেদনের সময়: {new Date(app.appliedAt).toLocaleDateString("bn-BD", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`mailto:${app.candidateEmail}?subject=Regarding your application for ${encodeURIComponent(app.jobTitle)} at ${encodeURIComponent(formData.companyName || "our company")}`}
                          className="flex items-center gap-1.5 rounded-xl bg-zinc-950 px-3.5 py-2 text-xs font-bold text-white transition hover:opacity-90 shadow-sm"
                        >
                          <Mail size={13} /> ইমেইলে উত্তর দিন
                        </a>
                        {app.candidatePhone && (
                          <a
                            href={`tel:${app.candidatePhone}`}
                            className="flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-bold text-zinc-900 hover:bg-zinc-100"
                          >
                            <Phone size={13} /> কল করুন
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Pitch Note */}
                    {app.coverNote && (
                      <div className="mt-4 rounded-xl bg-white p-3.5 border border-zinc-200 text-xs text-zinc-800">
                        <strong className="block text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                          প্রার্থীর বার্তা / অভিজ্ঞতা বিবরণ:
                        </strong>
                        <p className="whitespace-pre-line">{app.coverNote}</p>
                      </div>
                    )}

                    {/* Links */}
                    {(app.portfolioUrl || app.resumeUrl) && (
                      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-zinc-200 pt-3 text-xs">
                        {app.portfolioUrl && (
                          <a
                            href={app.portfolioUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
                          >
                            <Globe size={13} /> স্টিচ পোর্টফোলিও দেখুন <ExternalLink size={11} />
                          </a>
                        )}
                        {app.resumeUrl && (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
                          >
                            <FileText size={13} /> সিভি ডকুমেন্ট দেখুন <ExternalLink size={11} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COMPANY & FACTORY PROFILE */}
        {activeTab === "company" && (
          <form onSubmit={handleSaveCompanyAndProfile} className="mt-8 space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 space-y-4">
              <div>
                <h2 className="text-base font-bold text-zinc-950">
                  গার্মেন্টস ফ্যাক্টরি / এমব্রয়ডারি স্টুডিওর তথ্য
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  এই তথ্যগুলো আপনার সকল চাকরির বিজ্ঞপ্তি এবং ভেরিফাইড বিজনেস প্রোফাইলে প্রদর্শিত হবে।
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-800">
                    কোম্পানি / ফ্যাক্টরির নাম *
                  </label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="যেমন: অ্যাপেক্স এমব্রয়ডারি অ্যান্ড অ্যাপারেলস লি."
                    className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800">
                    অফিসিয়াল ওয়েবসাইট লিংক
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://apexembroidery.com"
                    className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800">
                  কোম্পানি লোগো URL
                </label>
                <input
                  type="url"
                  name="companyLogo"
                  value={formData.companyLogo}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/... অথবা ছবির সরাসরি লিংক"
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-800">
                  ফ্যাক্টরি ওভারভিউ ও মেশিনের সক্ষমতা
                </label>
                <textarea
                  rows={4}
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  placeholder="আপনার ফ্যাক্টরি সেটআপ, কতগুলো তাজিমা/বারুদান মাল্টি-হেড মেশিন আছে, কোন ধরনের এক্সপোর্ট কোয়ালিটি এমব্রয়ডারি তৈরি করেন সে সম্পর্কে লিখুন..."
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50 shadow-sm"
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  কোম্পানি প্রোফাইল সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 4: HIRING CONTACT DETAILS */}
        {activeTab === "profile" && (
          <form onSubmit={handleSaveCompanyAndProfile} className="mt-8 space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 space-y-4">
              <div>
                <h2 className="text-base font-bold text-zinc-950">
                  নিয়োগ কর্মকর্তা / এইচআর ইনচার্জের যোগাযোগের তথ্য
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  প্রার্থীদের সাথে যোগাযোগের জন্য আপনার নিজস্ব বিবরণ এখানে প্রদান করুন।
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-800">
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="যেমন: আসিফ মাহমুদ"
                    className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800">
                    আপনার পদবী
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="যেমন: হেড অব প্রোডাকশন / এইচআর ম্যানেজার"
                    className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800">
                    যোগাযোগের ফোন নম্বর
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="যেমন: +৮৮০ ১৮০০-০০০০০০"
                    className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-800">
                    অফিস বা ফ্যাক্টরির ঠিকানা
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="যেমন: আশুলিয়া, সাভার, ঢাকা"
                    className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50 shadow-sm"
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  যোগাযোগের তথ্য সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
