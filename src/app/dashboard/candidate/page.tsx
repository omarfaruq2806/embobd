"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { userApi } from "@/services/user.service";
import {
  User as UserIcon,
  Briefcase,
  Bookmark,
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileText,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  Globe,
  Tag,
  Plus,
  X,
  Save,
  Loader2,
  AlertCircle,
  ShieldCheck,
  ExternalLink,
  Edit3,
  Trash2,
  Send,
  Building,
} from "lucide-react";

// Predefined popular embroidery skills for quick tagging
const POPULAR_SKILLS = [
  "Wilcom 2006/e2/e4",
  "Tajima DGML",
  "3D Puff Embroidery",
  "Sequins & Beads",
  "Chenille / Towel Stitch",
  "Flat Embroidery",
  "Cording & Taping",
  "Laser Cut & Applique",
  "Karchupi / Zari Work",
  "Sample Making",
  "Multi-Head Machine Operator",
  "Quality Inspection (QC)",
];

export default function CandidateDashboardPage() {
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const sessionUser = (session as any)?.user;

  const [activeTab, setActiveTab] = useState<"profile" | "applications" | "saved" | "showcase">("profile");

  // Profile Form State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    phone: "",
    location: "",
    bio: "",
    skills: [] as string[],
    resumeUrl: "",
    portfolioUrl: "",
  });

  const [customSkillInput, setCustomSkillInput] = useState("");
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  // Load applied and saved jobs from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const apps = JSON.parse(localStorage.getItem("embobd_applied_jobs") || "[]");
        setAppliedJobs(apps);

        const saved = JSON.parse(localStorage.getItem("embobd_saved_jobs") || "[]");
        setSavedJobs(saved);
      } catch (e) {
        console.error("Failed to load applications/saved jobs from storage:", e);
      }
    }
  }, [activeTab]);

  // Fetch full user profile data on mount
  useEffect(() => {
    if (!sessionUser?.id) return;

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await userApi.getById(sessionUser.id);
        if (res.success && res.data) {
          const userData = res.data;
          const profile = userData.profile || {};
          setFormData({
            name: userData.name || sessionUser.name || "",
            title: profile.title || "",
            phone: profile.phone || "",
            location: profile.location || "",
            bio: profile.bio || "",
            skills: Array.isArray(profile.skills) ? profile.skills : [],
            resumeUrl: profile.resumeUrl || "",
            portfolioUrl: profile.portfolioUrl || "",
          });
        }
      } catch (err: any) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [sessionUser?.id, sessionUser?.name]);

  // Handle Input Changese
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add Skill
  const handleAddSkill = (skill: string) => {
    const cleanSkill = skill.trim();
    if (!cleanSkill) return;
    if (!formData.skills.includes(cleanSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, cleanSkill],
      }));
    }
    setCustomSkillInput("");
  };

  // Remove Skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Remove Saved Job
  const handleRemoveSavedJob = (jobId: string) => {
    if (typeof window === "undefined") return;
    const updated = savedJobs.filter((item: any) => (typeof item === "string" ? item !== jobId : item.id !== jobId));
    setSavedJobs(updated);
    localStorage.setItem("embobd_saved_jobs", JSON.stringify(updated));
  };

  // Calculate Profile Completeness (0 to 100%)
  const calculateProfileScore = () => {
    let score = 20; // base score for registered account
    if (formData.name?.trim()) score += 15;
    if (formData.title?.trim()) score += 15;
    if (formData.phone?.trim()) score += 10;
    if (formData.location?.trim()) score += 10;
    if (formData.skills?.length > 0) score += 15;
    if (formData.bio?.trim()) score += 5;
    if (formData.resumeUrl?.trim() || formData.portfolioUrl?.trim()) score += 10;
    return Math.min(100, score);
  };

  // Save Profile Handler
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionUser?.id) return;

    try {
      setSaving(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      // 1. Update user name if changed
      if (formData.name !== sessionUser.name) {
        await userApi.updateUser(sessionUser.id, { name: formData.name });
      }

      // 2. Update profile details
      const profilePayload = {
        title: formData.title.trim() || null,
        phone: formData.phone.trim() || null,
        location: formData.location.trim() || null,
        bio: formData.bio.trim() || null,
        skills: formData.skills,
        resumeUrl: formData.resumeUrl.trim() || null,
        portfolioUrl: formData.portfolioUrl.trim() || null,
      };

      const res = await userApi.updateProfile(sessionUser.id, profilePayload);

      if (res.success) {
        setSuccessMessage("Your profile information has been saved successfully! 🎉");
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(res.message || "Failed to save profile changes.");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  const profileScore = calculateProfileScore();

  return (
    <main className="min-h-screen bg-zinc-50/50 py-10 dark:bg-black lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="flex flex-col justify-between gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-2xl font-black text-white dark:bg-white dark:text-black">
              {formData.name?.charAt(0) || sessionUser?.name?.charAt(0) || "C"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-black dark:text-white">
                  {formData.name || sessionUser?.name || "Embroidery Artisan"}
                </h1>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  Candidate / Artisan
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {formData.title || "Set your professional embroidery title below"} •{" "}
                {formData.location || "Location not set"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/jobs"
              className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
            >
              <Briefcase size={14} /> Browse Jobs
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            onClick={() => setActiveTab("applications")}
            className="cursor-pointer rounded-2xl border border-black/10 bg-white p-5 shadow-xs transition hover:border-black/30 dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Applied Jobs</span>
              <Briefcase size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">
              {appliedJobs.length}
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">Submitted applications</p>
          </div>

          <div
            onClick={() => setActiveTab("saved")}
            className="cursor-pointer rounded-2xl border border-black/10 bg-white p-5 shadow-xs transition hover:border-black/30 dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Saved Jobs</span>
              <Bookmark size={16} className="text-amber-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">
              {savedJobs.length}
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">Bookmarked positions</p>
          </div>

          <div
            onClick={() => setActiveTab("profile")}
            className="cursor-pointer rounded-2xl border border-black/10 bg-white p-5 shadow-xs transition hover:border-black/30 dark:border-white/10 dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Tagged Skills</span>
              <Tag size={16} />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">
              {formData.skills.length}
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">Mastered techniques</p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Profile Score</span>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-black dark:text-white">{profileScore}%</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${profileScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex items-center gap-2 border-b border-black/10 pb-4 dark:border-white/10 overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <Edit3 size={14} /> My Profile & Skills
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "applications"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <Briefcase size={14} /> Job Applications ({appliedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "saved"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <Bookmark size={14} /> Saved Jobs ({savedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("showcase")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "showcase"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            }`}
          >
            <Sparkles size={14} /> Stitch Showcase
          </button>
        </div>

        {/* TAB 1: PROFILE & SKILLS */}
        {activeTab === "profile" && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Form (2 Cols) */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex h-64 items-center justify-center rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950">
                  <Loader2 size={24} className="animate-spin text-zinc-500" />
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Status Alerts */}
                  {successMessage && (
                    <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
                      <CheckCircle2 size={16} className="shrink-0" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Employer Upgrade Policy Notice */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-black/10 bg-zinc-50 p-4.5 dark:border-white/10 dark:bg-zinc-900/60">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/5 text-black dark:bg-white/10 dark:text-white">
                        <Building size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-black dark:text-white">
                          Looking to hire or post vacancies as an Employer?
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                          According to EMBOBD platform verification rules, candidate accounts must apply through <strong>Support</strong> to upgrade their role to Employer / Factory Owner.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/support"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-black px-3.5 py-2 text-[11px] font-bold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                    >
                      Apply via Support <ArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Basic Information Card */}
                  <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
                    <h2 className="text-base font-bold text-black dark:text-white">
                      Personal & Contact Details
                    </h2>
                    <p className="mt-1 text-xs text-zinc-500">
                      Ensure your phone number and location are up to date so factory managers can reach you.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Md. Jahangir Alam"
                          className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          Professional Title / Role
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="e.g. Senior Wilcom Digitizer / Punch Master"
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
                          placeholder="e.g. +880 1700-000000"
                          className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          Current Location (Area, District)
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g. Gazipur, Dhaka"
                          className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Professional Bio / Summary
                      </label>
                      <textarea
                        rows={3}
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="State your years of experience, machine expertise (Tajima, Barudan, Brother), and specialty stitches..."
                        className="mt-2 w-full rounded-xl border border-black/10 bg-transparent p-4 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                      />
                    </div>
                  </div>

                  {/* Embroidery Skills Editor Card */}
                  <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-black dark:text-white">
                          Embroidery Skills & Techniques
                        </h2>
                        <p className="mt-1 text-xs text-zinc-500">
                          Select the software, machines, and stitch types you specialize in.
                        </p>
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                        {formData.skills.length} Selected
                      </span>
                    </div>

                    {/* Quick Popular Suggestions */}
                    <div className="mt-5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                        ⚡ 1-Click Quick Add Suggestions:
                      </label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {POPULAR_SKILLS.map((skill) => {
                          const isSelected = formData.skills.includes(skill);
                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={() =>
                                isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)
                              }
                              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                                isSelected
                                  ? "bg-black text-white dark:bg-white dark:text-black"
                                  : "border border-black/10 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                              }`}
                            >
                              {isSelected ? <CheckCircle2 size={13} /> : <Plus size={13} />}
                              {skill}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Skill Input */}
                    <div className="mt-6 flex gap-2">
                      <input
                        type="text"
                        value={customSkillInput}
                        onChange={(e) => setCustomSkillInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddSkill(customSkillInput);
                          }
                        }}
                        placeholder="Type custom skill (e.g. Barudan 20-Head, Photostitch)..."
                        className="w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkill(customSkillInput)}
                        className="rounded-xl border border-black/15 bg-zinc-100 px-4 py-2.5 text-xs font-bold text-black hover:bg-zinc-200 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 shrink-0"
                      >
                        Add
                      </button>
                    </div>

                    {/* Active Selected Skills Tags */}
                    {formData.skills.length > 0 && (
                      <div className="mt-5 rounded-2xl bg-zinc-50 p-4 border border-black/5 dark:bg-zinc-900/60 dark:border-white/5">
                        <label className="text-[11px] font-bold text-zinc-500">
                          Your Active Skill Tags:
                        </label>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {formData.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-black px-3 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-black"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="rounded-full p-0.5 hover:bg-white/20 dark:hover:bg-black/20"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Portfolio & Resume Links Card */}
                  <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8 space-y-4">
                    <div>
                      <h2 className="text-base font-bold text-black dark:text-white">
                        Portfolio & Online Credentials
                      </h2>
                      <p className="mt-1 text-xs text-zinc-500">
                        Link your digitizing work, sample stitchouts, and resume.
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        <span>Portfolio / Work Gallery Link</span>
                        <span className="text-[10px] text-zinc-400 font-normal">Behance, Drive, or Social URL</span>
                      </label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        placeholder="https://behance.net/your-embroidery-portfolio"
                        className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        <span>Online Resume / CV Link</span>
                        <span className="text-[10px] text-zinc-400 font-normal">Google Drive or PDF URL</span>
                      </label>
                      <input
                        type="url"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/file/d/your-cv-link"
                        className="mt-2 w-full rounded-xl border border-black/10 bg-transparent px-4 py-2.5 text-xs text-black placeholder-zinc-400 focus:border-black focus:outline-hidden dark:border-white/10 dark:text-white dark:focus:border-white"
                      />
                      
                      {/* Cloudflare R2 Storage Demo Note */}
                      <div className="mt-2.5 flex items-start gap-2 rounded-xl border border-dashed border-amber-200 bg-amber-50/60 p-3 text-[11px] text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-300">
                        <UploadCloud size={16} className="shrink-0 mt-0.5 text-amber-600" />
                        <div>
                          <span className="font-bold">Cloudflare R2 Direct Upload [Demo Mode]:</span> You can paste your Google Drive / PDF link above. Direct 1-click Cloudflare R2 PDF file upload will automatically be enabled once R2 storage is activated.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex items-center justify-end pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
                    >
                      {saving ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> Saving Profile...
                        </>
                      ) : (
                        <>
                          <Save size={16} /> Save Profile Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Profile Preview Card (1 Col) */}
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Live Profile Preview
                </h3>
                
                <div className="mt-6 flex flex-col items-center text-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-900 text-3xl font-black text-white dark:bg-zinc-100 dark:text-black">
                    {formData.name?.charAt(0) || "C"}
                  </div>
                  <h4 className="mt-3 text-base font-extrabold text-black dark:text-white">
                    {formData.name || "Artisan Name"}
                  </h4>
                  <p className="mt-0.5 text-xs text-zinc-500 font-medium">
                    {formData.title || "Embroidery Specialist"}
                  </p>
                  
                  {/* Demo Photo Upload Badge */}
                  <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-dashed border-amber-300 bg-amber-50/50 px-2.5 py-1 text-[10px] text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
                    <UploadCloud size={12} /> Avatar Upload [R2 Demo Mode]
                  </span>
                </div>

                <div className="mt-6 space-y-3 border-t border-black/5 pt-4 text-xs text-zinc-600 dark:border-white/5 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="shrink-0 text-zinc-400" />
                    <span>{formData.location || "Location not set"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="shrink-0 text-zinc-400" />
                    <span>{formData.phone || "Phone not set"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserIcon size={14} className="shrink-0 text-zinc-400" />
                    <span>{sessionUser?.email || "Email"}</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="mt-5 border-t border-black/5 pt-4 dark:border-white/5">
                  <p className="text-[11px] font-bold text-black dark:text-white">
                    Specialized Skills:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {formData.skills.length === 0 && (
                      <span className="text-[11px] text-zinc-400 italic">No skills tagged yet</span>
                    )}
                  </div>
                </div>

                {/* Links Preview */}
                {(formData.portfolioUrl || formData.resumeUrl) && (
                  <div className="mt-5 space-y-2 border-t border-black/5 pt-4 dark:border-white/5">
                    {formData.portfolioUrl && (
                      <a
                        href={formData.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-black/10 p-2.5 text-xs font-semibold text-black transition hover:bg-zinc-50 dark:border-white/10 dark:text-white dark:hover:bg-zinc-900"
                      >
                        <span className="flex items-center gap-1.5">
                          <Globe size={13} /> Portfolio Link
                        </span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {formData.resumeUrl && (
                      <a
                        href={formData.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-black/10 p-2.5 text-xs font-semibold text-black transition hover:bg-zinc-50 dark:border-white/10 dark:text-white dark:hover:bg-zinc-900"
                      >
                        <span className="flex items-center gap-1.5">
                          <FileText size={13} /> View Resume (CV)
                        </span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Notice for Employer Role Upgrade */}
              <div className="rounded-3xl border border-dashed border-black/15 bg-zinc-50/80 p-6 shadow-xs dark:border-white/15 dark:bg-zinc-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
                    <Building size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-black dark:text-white">
                      Want to Become an Employer?
                    </h4>
                    <span className="text-[10px] font-semibold text-zinc-500">
                      EMBOBD Role Policy
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Are you a garment factory owner, buying house recruiter, or punch shop manager? According to our platform verification rules, to post job vacancies and access the Employer Dashboard, you must submit an application through <strong>Support</strong> to upgrade your account role.
                </p>

                <div className="mt-4 border-t border-black/5 pt-3 dark:border-white/5">
                  <Link
                    href="/support"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
                  >
                    <ShieldCheck size={14} />
                    Apply for Employer Role
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: JOB APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-black dark:text-white">
                  My Job Applications
                </h2>
                <p className="text-xs text-zinc-500">
                  Track the status of all your submitted job applications across garment factories.
                </p>
              </div>
              <Link
                href="/jobs"
                className="text-xs font-bold text-black underline underline-offset-4 dark:text-white"
              >
                + Find More Openings
              </Link>
            </div>

            {appliedJobs.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-16 text-center dark:border-white/10">
                <Briefcase size={32} className="text-zinc-300 dark:text-zinc-600" />
                <p className="mt-3 text-sm font-bold text-black dark:text-white">
                  No active applications yet
                </p>
                <p className="mt-1 max-w-sm text-xs text-zinc-500">
                  Browse our verified Wilcom digitizer, machine operator, and sample maker job listings and apply directly.
                </p>
                <Link
                  href="/jobs"
                  className="mt-5 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black"
                >
                  Explore Open Jobs
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {appliedJobs.map((app, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-black/10 bg-zinc-50/50 p-4 dark:border-white/10 dark:bg-zinc-900/40 sm:flex-row sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-black dark:text-white">
                          {app.jobTitle}
                        </h3>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                          {app.status || "Submitted"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {app.companyName} • {app.location}
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-400">
                        Applied on: {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/jobs/${app.jobId}`}
                        className="rounded-xl border border-black/15 bg-white px-3.5 py-2 text-xs font-semibold text-black hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                      >
                        View Job
                      </Link>
                      <a
                        href={`mailto:${app.applyEmail}?subject=Follow-up: ${encodeURIComponent(app.jobTitle)} - ${encodeURIComponent(formData.name)}`}
                        className="rounded-xl bg-black px-3.5 py-2 text-xs font-semibold text-white hover:opacity-90 dark:bg-white dark:text-black"
                      >
                        Follow up Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED JOBS */}
        {activeTab === "saved" && (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-black dark:text-white">
                  Saved / Bookmarked Jobs
                </h2>
                <p className="text-xs text-zinc-500">
                  Jobs you have bookmarked to review or apply later.
                </p>
              </div>
              <Link
                href="/jobs"
                className="text-xs font-bold text-black underline underline-offset-4 dark:text-white"
              >
                + Browse More
              </Link>
            </div>

            {savedJobs.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-16 text-center dark:border-white/10">
                <Bookmark size={32} className="text-zinc-300 dark:text-zinc-600" />
                <p className="mt-3 text-sm font-bold text-black dark:text-white">
                  No saved jobs yet
                </p>
                <p className="mt-1 max-w-sm text-xs text-zinc-500">
                  Click the bookmark icon on any job card to save it for quick reference.
                </p>
                <Link
                  href="/jobs"
                  className="mt-5 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black"
                >
                  Explore Jobs
                </Link>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {savedJobs.map((job, idx) => (
                  <div
                    key={job.id || idx}
                    className="flex flex-col justify-between rounded-2xl border border-black/10 bg-zinc-50/50 p-5 dark:border-white/10 dark:bg-zinc-900/40"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-black dark:text-white">
                          {job.title || "Embroidery Job"}
                        </h3>
                        <button
                          onClick={() => handleRemoveSavedJob(job.id)}
                          title="Remove bookmark"
                          className="rounded-lg p-1 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                        {job.company || "Verified Employer"} • {job.location || "Bangladesh"}
                      </p>
                      {(job.salaryMin || job.salaryMax) && (
                        <p className="mt-2 text-xs font-bold text-black dark:text-white">
                          ৳{job.salaryMin ? job.salaryMin.toLocaleString() : ""}
                          {job.salaryMin && job.salaryMax ? " - " : ""}
                          {job.salaryMax ? job.salaryMax.toLocaleString() : ""}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-3 dark:border-white/5">
                      <span className="text-[10px] text-zinc-400">
                        Saved: {job.savedAt ? new Date(job.savedAt).toLocaleDateString() : "Recently"}
                      </span>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="flex items-center gap-1 text-xs font-bold text-black underline underline-offset-4 dark:text-white"
                      >
                        Apply Now <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: STITCH SHOWCASE */}
        {activeTab === "showcase" && (
          <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-black dark:text-white">
                  My Stitch Showcase & Projects
                </h2>
                <p className="text-xs text-zinc-500">
                  Showcase photos of your best 3D puff, sequins, or punch digitizing files to impress employers.
                </p>
              </div>
              <Link
                href="/communities/create"
                className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
              >
                <Plus size={14} /> New Showcase Post
              </Link>
            </div>

            {/* Cloudflare R2 Storage Demo Banner */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-amber-200 bg-amber-50/60 p-4 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
              <UploadCloud size={18} className="shrink-0 text-amber-600 mt-0.5" />
              <div>
                <strong className="font-bold">Cloudflare R2 Direct Attachment [Demo Mode]:</strong>
                <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-300">
                  Once Cloudflare R2 credentials are plugged in, direct DST/EMB machine files, stitch preview photos, and raw digitized vectors will upload directly to R2 bucket.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 py-16 text-center dark:border-white/10">
              <Sparkles size={32} className="text-zinc-300 dark:text-zinc-600" />
              <p className="mt-3 text-sm font-bold text-black dark:text-white">
                Share your embroidery masterpiece
              </p>
              <p className="mt-1 max-w-sm text-xs text-zinc-500">
                Share your Wilcom punch tutorial, photo of 3D puff cap stitchouts, or zari work on the community board.
              </p>
              <Link
                href="/communities/create"
                className="mt-5 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black"
              >
                Create First Showcase
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
