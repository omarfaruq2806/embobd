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
            title: p.title || "Hiring Manager",
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
        setSuccessMessage(`Job status changed to ${newStatus}`);
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update job status:", err);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    try {
      const res = await jobApi.delete(jobId);
      if (res.success) {
        setMyJobs((prev) => prev.filter((j) => j.id !== jobId));
        setSuccessMessage("Job deleted successfully.");
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

      setSuccessMessage("Company & Employer Profile updated successfully! 🎉");
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50/50 py-10 dark:bg-black lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-2xl font-black text-white dark:bg-white dark:text-black">
              {formData.companyName?.charAt(0) || formData.name?.charAt(0) || "E"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-black dark:text-white">
                  {formData.companyName || formData.name || "Employer Studio"}
                </h1>
                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                  Employer / Factory
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {formData.name} • {formData.title || "Hiring Manager"} •{" "}
                {formData.location || "Location not set"}
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
          <div
            onClick={() => setActiveTab("jobs")}
            className="cursor-pointer rounded-2xl border border-black/10 bg-white p-5 shadow-xs transition hover:border-black/30 dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Active Job Posts</span>
              <Briefcase size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">{myJobs.length}</p>
            <p className="mt-1 text-[11px] text-zinc-400">Total listings</p>
          </div>

          <div
            onClick={() => setActiveTab("applicants")}
            className="cursor-pointer rounded-2xl border border-black/10 bg-white p-5 shadow-xs transition hover:border-black/30 dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Candidates Applied</span>
              <Users size={16} className="text-indigo-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">
              {applicants.length}
            </p>
            <p className="mt-1 text-[11px] text-indigo-600 dark:text-indigo-400">Total applications</p>
          </div>

          <div
            onClick={() => setActiveTab("jobs")}
            className="cursor-pointer rounded-2xl border border-black/10 bg-white p-5 shadow-xs transition hover:border-black/30 dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Published Live</span>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">
              {myJobs.filter((j) => j.status === "PUBLISHED").length}
            </p>
            <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400">Public jobs</p>
          </div>

          <div
            onClick={() => setActiveTab("company")}
            className="cursor-pointer rounded-2xl border border-black/10 bg-white p-5 shadow-xs transition hover:border-black/30 dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Company Profile</span>
              <Building size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">
              {formData.companyName ? "Active" : "Incomplete"}
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">
              {formData.companyName ? "Verified Factory" : "Setup needed"}
            </p>
          </div>
        </div>

        {/* Status Alerts */}
        {successMessage && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
            <CheckCircle2 size={16} className="shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mt-8 flex items-center gap-2 border-b border-black/10 pb-4 dark:border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("jobs")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "jobs"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <Briefcase size={14} /> My Job Listings ({myJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("applicants")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "applicants"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <Users size={14} /> Applicant Tracking ({applicants.length})
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "company"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <Building size={14} /> Company & Factory Profile
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <Edit3 size={14} /> Hiring Contact Details
          </button>
        </div>

        {/* TAB 1: MY JOBS */}
        {activeTab === "jobs" && (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-black dark:text-white">
                  Posted Embroidery Openings
                </h2>
                <p className="text-xs text-zinc-500">
                  Manage your active punch digitizer, machine operator, and sample maker job listings.
                </p>
              </div>
              <Link
                href="/jobs/post"
                className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
              >
                <PlusCircle size={14} /> Post Another Job
              </Link>
            </div>

            {loading ? (
              <div className="flex h-48 items-center justify-center">
                <Loader2 size={24} className="animate-spin text-zinc-500" />
              </div>
            ) : myJobs.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-16 text-center dark:border-white/10">
                <Briefcase size={32} className="text-zinc-300 dark:text-zinc-600" />
                <p className="mt-3 text-sm font-bold text-black dark:text-white">
                  No jobs posted yet
                </p>
                <p className="mt-1 max-w-sm text-xs text-zinc-500">
                  Post your embroidery digitizing or operator requirements to connect with verified candidates.
                </p>
                <Link
                  href="/jobs/post"
                  className="mt-5 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black"
                >
                  Post Your First Job
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {myJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-black/10 bg-zinc-50/50 p-5 dark:border-white/10 dark:bg-zinc-900/40 sm:flex-row sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-black dark:text-white">
                          {job.title}
                        </h3>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            job.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
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
                        <span className="font-semibold text-black dark:text-white">
                          {job.salaryMin || job.salaryMax
                            ? `৳${job.salaryMin || 0} - ৳${job.salaryMax || 0}`
                            : "Negotiable"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleJobStatus(job.id, job.status)}
                        className="rounded-xl border border-black/15 bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                      >
                        {job.status === "PUBLISHED" ? "Unpublish" : "Publish Live"}
                      </button>

                      <Link
                        href={`/jobs/${job.id}`}
                        className="rounded-xl border border-black/15 bg-white p-2 text-black hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                        title="View Public Post"
                      >
                        <Eye size={16} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job.id)}
                        className="rounded-xl border border-rose-200 bg-rose-50 p-2 text-rose-600 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
                        title="Delete Job"
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
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-black dark:text-white">
                  Candidate Applications
                </h2>
                <p className="text-xs text-zinc-500">
                  Review portfolios, resumes, and contacts submitted for your embroidery positions.
                </p>
              </div>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {applicants.length} Total Applicants
              </span>
            </div>

            {applicants.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-16 text-center dark:border-white/10">
                <Users size={32} className="text-zinc-300 dark:text-zinc-600" />
                <p className="mt-3 text-sm font-bold text-black dark:text-white">
                  No applications received yet
                </p>
                <p className="mt-1 max-w-sm text-xs text-zinc-500">
                  Candidates who apply via EMBOBD Quick Apply or send applications will appear right here.
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {applicants.map((app, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-black/10 bg-zinc-50/50 p-6 dark:border-white/10 dark:bg-zinc-900/40"
                  >
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-black dark:text-white">
                            {app.candidateName}
                          </h3>
                          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                            Applied for: {app.jobTitle}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Mail size={13} /> {app.candidateEmail}
                          </span>
                          {app.candidatePhone && (
                            <span className="flex items-center gap-1">
                              <Phone size={13} /> {app.candidatePhone}
                            </span>
                          )}
                          <span className="text-[11px] text-zinc-400">
                            Applied on {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`mailto:${app.candidateEmail}?subject=Regarding your application for ${encodeURIComponent(app.jobTitle)} at ${encodeURIComponent(formData.companyName || "our company")}`}
                          className="flex items-center gap-1.5 rounded-xl bg-black px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                        >
                          <Mail size={13} /> Reply via Email
                        </a>
                        {app.candidatePhone && (
                          <a
                            href={`tel:${app.candidatePhone}`}
                            className="flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                          >
                            <Phone size={13} /> Call
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Pitch Note */}
                    {app.coverNote && (
                      <div className="mt-4 rounded-xl bg-white p-3.5 border border-black/5 dark:bg-zinc-950 dark:border-white/5 text-xs text-zinc-700 dark:text-zinc-300">
                        <strong className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">
                          Candidate Pitch:
                        </strong>
                        <p className="whitespace-pre-line">{app.coverNote}</p>
                      </div>
                    )}

                    {/* Links */}
                    {(app.portfolioUrl || app.resumeUrl) && (
                      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-black/5 pt-3 dark:border-white/5 text-xs">
                        {app.portfolioUrl && (
                          <a
                            href={app.portfolioUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
                          >
                            <Globe size={13} /> View Stitch Portfolio <ExternalLink size={11} />
                          </a>
                        )}
                        {app.resumeUrl && (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
                          >
                            <FileText size={13} /> View Resume Link <ExternalLink size={11} />
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
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8 space-y-4">
              <div>
                <h2 className="text-base font-bold text-black dark:text-white">
                  Garment Factory / Embroidery Studio Information
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  This information will be displayed on all your job postings and verified business cards.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Company / Factory Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="e.g. Apex Embroidery & Apparels Ltd."
                    className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Official Website URL
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleInputChange}
                    placeholder="https://apexembroidery.com"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Company Logo URL
                  </label>
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    Cloudflare R2 (Demo Mode)
                  </span>
                </div>
                <input
                  type="url"
                  name="companyLogo"
                  value={formData.companyLogo}
                  onChange={handleInputChange}
                  placeholder="https://images.unsplash.com/... or direct image link"
                  className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                />
                <p className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                  💡 <em>Direct 1-click photo and company logo upload will connect directly to Cloudflare R2 storage once credentials are configured in .env.</em>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Factory Overview & Machine Capacity
                </label>
                <textarea
                  rows={4}
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  placeholder="Describe your factory setup, machine count (e.g., 10 Tajima 20-head multi-head machines), export specialization, and working environment..."
                  className="mt-2 w-full rounded-xl border border-black/10 bg-transparent p-4 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  Save Company Profile
                </button>
              </div>
            </div>
          </form>
        )}

        {/* TAB 4: HIRING CONTACT DETAILS */}
        {activeTab === "profile" && (
          <form onSubmit={handleSaveCompanyAndProfile} className="mt-8 space-y-6">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8 space-y-4">
              <div>
                <h2 className="text-base font-bold text-black dark:text-white">
                  Hiring Manager / Recruiter Contact Details
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Your direct contact information for managing candidate communications.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Asif Mahmud"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Your Designation
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Head of Production / HR Manager"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +880 1800-000000"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Office / Factory Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Ashulia, Savar, Dhaka"
                    className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
                >
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  Save Contact Information
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
