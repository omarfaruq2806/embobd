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
  Building,
} from "lucide-react";

// Predefined popular embroidery skills for quick tagging
const POPULAR_SKILLS = [
  "Wilcom 2006/e2/e4",
  "Tajima DGML",
  "৩ডি পাফ এমব্রয়ডারি",
  "সিকোয়েন্স ও পুঁতি (Beads)",
  "চেনিল / তোয়ালে স্টিচ",
  "ফ্ল্যাট এমব্রয়ডারি",
  "কর্ডিং ও টেপিং",
  "লেজার কাটিং ও অ্যাপ্লিক",
  "জারদৌসি / কারচুপি মাস্টার",
  "স্যাম্পল ডেভেলপার",
  "মাল্টি-হেড মেশিন অপারেটর",
  "কোয়ালিটি কন্ট্রোল (QC)",
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleRemoveSavedJob = (jobId: string) => {
    if (typeof window === "undefined") return;
    const updated = savedJobs.filter((item: any) => (typeof item === "string" ? item !== jobId : item.id !== jobId));
    setSavedJobs(updated);
    localStorage.setItem("embobd_saved_jobs", JSON.stringify(updated));
  };

  const calculateProfileScore = () => {
    let score = 20;
    if (formData.name?.trim()) score += 15;
    if (formData.title?.trim()) score += 15;
    if (formData.phone?.trim()) score += 10;
    if (formData.location?.trim()) score += 10;
    if (formData.skills?.length > 0) score += 15;
    if (formData.bio?.trim()) score += 5;
    if (formData.resumeUrl?.trim() || formData.portfolioUrl?.trim()) score += 10;
    return Math.min(100, score);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionUser?.id) return;

    try {
      setSaving(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      if (formData.name !== sessionUser.name) {
        await userApi.updateUser(sessionUser.id, { name: formData.name });
      }

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
        setSuccessMessage("আপনার প্রোফাইল তথ্য সফলভাবে সংরক্ষণ করা হয়েছে! 🎉");
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setErrorMessage(res.message || "প্রোফাইল পরিবর্তন সংরক্ষণ করা যায়নি।");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "প্রোফাইল সংরক্ষণ করার সময় একটি ত্রুটি ঘটেছে।");
    } finally {
      setSaving(false);
    }
  };

  const profileScore = calculateProfileScore();

  return (
    <main className="min-h-screen bg-zinc-50 py-10 lg:py-14 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Welcome Header with Content Hook */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-2xl font-black text-white shadow-sm">
              {formData.name?.charAt(0) || sessionUser?.name?.charAt(0) || "C"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                  {formData.name || sessionUser?.name || "এমব্রয়ডারি কারিগর"}
                </h1>
                <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                  প্রার্থী / কারিগর প্রোফাইল
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600">
                {formData.title || "নিচে আপনার পেশাগত পদবী যোগ করুন"} •{" "}
                {formData.location || "ঠিকানা দেওয়া হয়নি"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/jobs"
              className="flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90 shadow-sm"
            >
              <Briefcase size={14} /> চাকরির বিজ্ঞপ্তি দেখুন
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            onClick={() => setActiveTab("applications")}
            className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400"
          >
            <div className="flex items-center justify-between text-zinc-600">
              <span className="text-xs font-semibold">আবেদনকৃত চাকরি</span>
              <Briefcase size={16} className="text-zinc-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950">
              {appliedJobs.length}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">মোট সাবমিট করা আবেদন</p>
          </div>

          <div
            onClick={() => setActiveTab("saved")}
            className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400"
          >
            <div className="flex items-center justify-between text-zinc-600">
              <span className="text-xs font-semibold">সংরক্ষিত চাকরি</span>
              <Bookmark size={16} className="text-amber-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950">
              {savedJobs.length}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">বুকমার্ক করা বিজ্ঞপ্তি</p>
          </div>

          <div
            onClick={() => setActiveTab("profile")}
            className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-400"
          >
            <div className="flex items-center justify-between text-zinc-600">
              <span className="text-xs font-semibold">বিশেষ দক্ষতা</span>
              <Tag size={16} className="text-zinc-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950">
              {formData.skills.length}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">যুক্ত করা টেকনিক</p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-zinc-600">
              <span className="text-xs font-semibold">প্রোফাইল স্কোর</span>
              <CheckCircle2 size={16} className="text-emerald-600" />
            </div>
            <p className="mt-3 text-2xl font-bold text-zinc-950">{profileScore}%</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${profileScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex items-center gap-2 border-b border-zinc-200 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "profile"
                ? "bg-zinc-950 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Edit3 size={14} /> প্রোফাইল ও দক্ষতা
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "applications"
                ? "bg-zinc-950 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Briefcase size={14} /> চাকরির আবেদনসমূহ ({appliedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "saved"
                ? "bg-zinc-950 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Bookmark size={14} /> সংরক্ষিত চাকরি ({savedJobs.length})
          </button>
          <button
            onClick={() => setActiveTab("showcase")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
              activeTab === "showcase"
                ? "bg-zinc-950 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            <Sparkles size={14} /> কাজের শোকেস ও ডিজাইন
          </button>
        </div>

        {/* TAB 1: PROFILE & SKILLS */}
        {activeTab === "profile" && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Form (2 Cols) */}
            <div className="lg:col-span-2">
              {loading ? (
                <div className="flex h-64 items-center justify-center rounded-2xl border border-zinc-200 bg-white">
                  <Loader2 size={24} className="animate-spin text-zinc-500" />
                </div>
              ) : (
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Status Alerts */}
                  {successMessage && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
                      <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {errorMessage && (
                    <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
                      <AlertCircle size={16} className="shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Employer Upgrade Policy Notice */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-100/80 p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-900 shadow-sm border border-zinc-200">
                        <Building size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-950">
                          ফ্যাক্টরির জন্য লোক নিয়োগ বা বিজ্ঞপ্তি দিতে চান?
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-zinc-600">
                          EMBOBD প্ল্যাটফর্মের ভেরিফিকেশন নিয়ম অনুযায়ী, নিয়োগকারী বা ফ্যাক্টরি ওনার রোল পেতে <strong>সাপোর্টে</strong> আবেদন করুন।
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/support"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-zinc-950 px-3.5 py-2 text-xs font-bold text-white transition hover:opacity-90"
                    >
                      সাপোর্টে যোগাযোগ করুন <ArrowRight size={13} />
                    </Link>
                  </div>

                  {/* Basic Information Card */}
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                    <h2 className="text-base font-bold text-zinc-950">
                      ব্যক্তিগত ও যোগাযোগের বিবরণ
                    </h2>
                    <p className="mt-1 text-xs text-zinc-500">
                      আপনার ফোন নম্বর ও অবস্থান আপডেট রাখুন যাতে ফ্যাক্টরি ম্যানেজাররা সহজে যোগাযোগ করতে পারে।
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-zinc-800">
                          পূর্ণ নাম *
                        </label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="যেমন: মো. জাহাঙ্গীর আলম"
                          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-800">
                          পেশাগত পদবী / ভূমিকা
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          placeholder="যেমন: সিনিয়র উইলকম ডিজিটাইজার / পাঞ্চ মাস্টার"
                          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-800">
                          মোবাইল / যোগাযোগ নম্বর
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="যেমন: +৮৮০ ১৭০০-০০০০০০"
                          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-zinc-800">
                          বর্তমান অবস্থান (এলাকা, জেলা)
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="যেমন: গাজীপুর, ঢাকা"
                          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-xs font-bold text-zinc-800">
                        কাজের অভিজ্ঞতা ও সংক্ষিপ্ত সারসংক্ষেপ
                      </label>
                      <textarea
                        rows={3}
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="আপনার কাজের অভিজ্ঞতা, কোন কোন মেশিনে পারদর্শী (তাজিমা, বারুদান, ব্রাদার), এবং বিশেষ স্টিচ সম্পর্কে লিখুন..."
                        className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-4 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Embroidery Skills Editor Card */}
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-zinc-950">
                          এমব্রয়ডারি দক্ষতা ও টেকনিক
                        </h2>
                        <p className="mt-1 text-xs text-zinc-500">
                          আপনি যেসব সফটওয়্যার, মেশিন ও ডিজাইনে পারদর্শী তা নির্বাচন করুন।
                        </p>
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-800">
                        {formData.skills.length}টি নির্বাচিত
                      </span>
                    </div>

                    {/* Quick Popular Suggestions */}
                    <div className="mt-5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                        ⚡ ১-ক্লিকে জনপ্রিয় দক্ষতা যোগ করুন:
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
                                  ? "bg-zinc-950 text-white shadow-xs"
                                  : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
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
                        placeholder="অন্য কোনো দক্ষতা লিখুন (যেমন: বারুদান ২০-হেড, ফটোস্টিচ)..."
                        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkill(customSkillInput)}
                        className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-200 shrink-0"
                      >
                        যুক্ত করুন
                      </button>
                    </div>

                    {/* Active Selected Skills Tags */}
                    {formData.skills.length > 0 && (
                      <div className="mt-5 rounded-2xl bg-zinc-50 p-4 border border-zinc-200">
                        <label className="text-[11px] font-bold text-zinc-600">
                          আপনার সক্রিয় স্কিল ট্যাগসমূহ:
                        </label>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {formData.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-3 py-1.5 text-xs font-bold text-white shadow-xs"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="rounded-full p-0.5 hover:bg-white/20"
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
                  <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 space-y-4">
                    <div>
                      <h2 className="text-base font-bold text-zinc-950">
                        পোর্টফোলিও ও কাজের লিংক
                      </h2>
                      <p className="mt-1 text-xs text-zinc-500">
                        আপনার ডিজিটাইজিং কাজের ছবি, স্যাম্পল স্টিচ ও জীবনবৃত্তান্ত (CV) যুক্ত করুন।
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center justify-between text-xs font-bold text-zinc-800">
                        <span>পোর্টফোলিও / কাজের গ্যালারি লিংক</span>
                        <span className="text-[10px] text-zinc-500 font-normal">বিহান্স, গুগল ড্রাইভ বা ফেসবুক পেজ লিংক</span>
                      </label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        placeholder="https://behance.net/your-embroidery-portfolio"
                        className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="flex items-center justify-between text-xs font-bold text-zinc-800">
                        <span>অনলাইন সিভি / জীবনবৃত্তান্ত লিংক</span>
                        <span className="text-[10px] text-zinc-500 font-normal">গুগল ড্রাইভ বা পিডিএফ ফাইল লিংক</span>
                      </label>
                      <input
                        type="url"
                        name="resumeUrl"
                        value={formData.resumeUrl}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/file/d/your-cv-link"
                        className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-950 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex items-center justify-end pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-xs font-bold text-white transition hover:opacity-90 disabled:opacity-50 shadow-sm"
                    >
                      {saving ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> সংরক্ষণ হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Save size={16} /> প্রোফাইল সংরক্ষণ করুন
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar Profile Preview Card (1 Col) */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  লাইভ প্রোফাইল প্রিভিউ
                </h3>
                
                <div className="mt-6 flex flex-col items-center text-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 text-3xl font-black text-white shadow-sm">
                    {formData.name?.charAt(0) || "C"}
                  </div>
                  <h4 className="mt-3 text-base font-extrabold text-zinc-950">
                    {formData.name || "কারিগর নাম"}
                  </h4>
                  <p className="mt-0.5 text-xs text-zinc-600 font-medium">
                    {formData.title || "এমব্রয়ডারি স্পেশালিস্ট"}
                  </p>
                </div>

                <div className="mt-6 space-y-3 border-t border-zinc-100 pt-4 text-xs text-zinc-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="shrink-0 text-zinc-400" />
                    <span>{formData.location || "ঠিকানা দেওয়া হয়নি"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="shrink-0 text-zinc-400" />
                    <span>{formData.phone || "ফোন নম্বর দেওয়া হয়নি"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserIcon size={14} className="shrink-0 text-zinc-400" />
                    <span>{sessionUser?.email || "ইমেইল"}</span>
                  </div>
                </div>

                {/* Skills Preview */}
                <div className="mt-5 border-t border-zinc-100 pt-4">
                  <p className="text-[11px] font-bold text-zinc-900">
                    দক্ষতা ও টেকনিকসমূহ:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {formData.skills.length === 0 && (
                      <span className="text-[11px] text-zinc-400 italic">এখনও কোনো স্কিল ট্যাগ করা হয়নি</span>
                    )}
                  </div>
                </div>

                {/* Links Preview */}
                {(formData.portfolioUrl || formData.resumeUrl) && (
                  <div className="mt-5 space-y-2 border-t border-zinc-100 pt-4">
                    {formData.portfolioUrl && (
                      <a
                        href={formData.portfolioUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-zinc-200 p-2.5 text-xs font-semibold text-zinc-900 transition hover:bg-zinc-50"
                      >
                        <span className="flex items-center gap-1.5">
                          <Globe size={13} /> পোর্টফোলিও লিংক
                        </span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                    {formData.resumeUrl && (
                      <a
                        href={formData.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-zinc-200 p-2.5 text-xs font-semibold text-zinc-900 transition hover:bg-zinc-50"
                      >
                        <span className="flex items-center gap-1.5">
                          <FileText size={13} /> সিভি দেখুন
                        </span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Notice for Employer Role Upgrade */}
              <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white">
                    <Building size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-950">
                      নিয়োগকারী বা ফ্যাক্টরি একাউন্ট চান?
                    </h4>
                    <span className="text-[10px] font-semibold text-zinc-500">
                      EMBOBD রোল পলিসি
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-zinc-600">
                  আপনি কি গার্মেন্টস ফ্যাক্টরি মালিক, বায়িং হাউস রিক্রুটার বা এমব্রয়ডারি শপ ইনচার্জ? সরাসরি চাকরির বিজ্ঞপ্তি ও লোক নিয়োগের সুবিধা পেতে একাউন্ট আপগ্রেডের জন্য আবেদন করুন।
                </p>

                <div className="mt-4 border-t border-zinc-100 pt-3">
                  <Link
                    href="/support"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white transition hover:opacity-90"
                  >
                    <ShieldCheck size={14} />
                    এমপ্লয়ার রোলের জন্য আবেদন করুন
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: JOB APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-950">
                  আমার চাকরির আবেদনসমূহ
                </h2>
                <p className="text-xs text-zinc-500">
                  বিভিন্ন গার্মেন্টস ও টেক্সটাইল প্রতিষ্ঠানে আপনার জমা দেওয়া আবেদনের বর্তমান অবস্থা দেখুন।
                </p>
              </div>
              <Link
                href="/jobs"
                className="text-xs font-bold text-zinc-950 underline underline-offset-4"
              >
                + আরও চাকরির বিজ্ঞপ্তি খুঁজুন
              </Link>
            </div>

            {appliedJobs.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
                <Briefcase size={32} className="text-zinc-400" />
                <p className="mt-3 text-sm font-bold text-zinc-950">
                  এখনও কোনো চাকরিতে আবেদন করা হয়নি
                </p>
                <p className="mt-1 max-w-sm text-xs text-zinc-500">
                  আমাদের ভেরিফাইড উইলকম ডিজিটাইজার, পাঞ্চ মাস্টার ও মেশিন অপারেটর পদে সরাসরি আবেদন করুন।
                </p>
                <Link
                  href="/jobs"
                  className="mt-5 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white shadow-sm"
                >
                  নতুন চাকরি খুঁজুন
                </Link>
              </div>
            ) : (
              <div className="mt-6 space-y-3">
                {appliedJobs.map((app, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-zinc-950">
                          {app.jobTitle}
                        </h3>
                        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                          {app.status || "জমা দেওয়া হয়েছে"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-600">
                        {app.companyName} • {app.location}
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-500">
                        আবেদনের তারিখ: {new Date(app.appliedAt).toLocaleDateString("bn-BD", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/jobs/${app.jobId}`}
                        className="rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs font-bold text-zinc-900 hover:bg-zinc-100"
                      >
                        বিজ্ঞপ্তি দেখুন
                      </Link>
                      <a
                        href={`mailto:${app.applyEmail}?subject=Follow-up: ${encodeURIComponent(app.jobTitle)} - ${encodeURIComponent(formData.name)}`}
                        className="rounded-xl bg-zinc-950 px-3.5 py-2 text-xs font-bold text-white hover:opacity-90"
                      >
                        ফলো-আপ ইমেইল
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
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-950">
                  সংরক্ষিত বা বুকমার্ক করা চাকরি
                </h2>
                <p className="text-xs text-zinc-500">
                  পরে আবেদন করার জন্য যেসকল সার্কুলার আপনি সেভ করে রেখেছেন।
                </p>
              </div>
              <Link
                href="/jobs"
                className="text-xs font-bold text-zinc-950 underline underline-offset-4"
              >
                + আরও বিজ্ঞপ্তি দেখুন
              </Link>
            </div>

            {savedJobs.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
                <Bookmark size={32} className="text-zinc-400" />
                <p className="mt-3 text-sm font-bold text-zinc-950">
                  এখনও কোনো চাকরি সেভ করা নেই
                </p>
                <p className="mt-1 max-w-sm text-xs text-zinc-500">
                  যেকোনো চাকরির কার্ডের বুকমার্ক আইকনে ক্লিক করে দ্রুত সেভ করে রাখুন।
                </p>
                <Link
                  href="/jobs"
                  className="mt-5 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white shadow-sm"
                >
                  চাকরি এক্সপ্লোর করুন
                </Link>
              </div>
            ) : (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {savedJobs.map((job, idx) => (
                  <div
                    key={job.id || idx}
                    className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-zinc-950">
                          {job.title || "এমব্রয়ডারি জব"}
                        </h3>
                        <button
                          onClick={() => handleRemoveSavedJob(job.id)}
                          title="বুকমার্ক মুছুন"
                          className="rounded-lg p-1 text-zinc-400 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-zinc-600">
                        {job.company || "ভেরিফাইড প্রতিষ্ঠান"} • {job.location || "বাংলাদেশ"}
                      </p>
                      {(job.salaryMin || job.salaryMax) && (
                        <p className="mt-2 text-xs font-bold text-zinc-950">
                          ৳{job.salaryMin ? job.salaryMin.toLocaleString() : ""}
                          {job.salaryMin && job.salaryMax ? " - " : ""}
                          {job.salaryMax ? job.salaryMax.toLocaleString() : ""}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-3">
                      <span className="text-[10px] text-zinc-500">
                        সেভ করা হয়েছে: {job.savedAt ? new Date(job.savedAt).toLocaleDateString("bn-BD") : "সম্প্রতি"}
                      </span>
                      <Link
                        href={`/jobs/${job.id}`}
                        className="flex items-center gap-1 text-xs font-bold text-zinc-950 underline underline-offset-4"
                      >
                        আবেদন করুন <ArrowRight size={13} />
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
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-950">
                  আমার স্টিচ শোকেস ও ডিজাইন প্রোজেক্ট
                </h2>
                <p className="text-xs text-zinc-500">
                  আপনার সেরা ৩ডি পাফ, সিকোয়েন্স অথবা পাঞ্চ ফাইলের ছবি শেয়ার করে নিয়োগকারীদের দৃষ্টি আকর্ষণ করুন।
                </p>
              </div>
              <Link
                href="/communities/create"
                className="flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                <Plus size={14} /> নতুন পোস্ট তৈরি করুন
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 py-16 text-center">
              <Sparkles size={32} className="text-amber-500" />
              <p className="mt-3 text-sm font-bold text-zinc-950">
                আপনার এমব্রয়ডারি কাজের জাদু দেখান
              </p>
              <p className="mt-1 max-w-sm text-xs text-zinc-500">
                উইলকম পাঞ্চ টিউটোরিয়াল, ক্যাপের ৩ডি পাফ স্টিচ বা জারদৌসি কাজের ছবি পোস্ট করুন আমাদের কমিউনিটি বোর্ডে।
              </p>
              <Link
                href="/communities/create"
                className="mt-5 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                প্রথম শোকেস তৈরি করুন
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
