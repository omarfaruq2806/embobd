"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { userApi } from "@/services/user.service";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Tag,
  Plus,
  X,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Briefcase,
  ArrowLeft,
  Sparkles,
  Camera,
  Calendar,
} from "lucide-react";

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

export default function UniversalProfilePage() {
  const router = useRouter();
  const { data: session, isPending: isSessionLoading } = authClient.useSession();
  const sessionUser = (session as any)?.user;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    title: "",
    phone: "",
    location: "",
    bio: "",
    skills: [] as string[],
    resumeUrl: "",
    portfolioUrl: "",
  });

  const [customSkillInput, setCustomSkillInput] = useState("");

  useEffect(() => {
    if (!isSessionLoading && !sessionUser) {
      router.push("/login");
    }
  }, [sessionUser, isSessionLoading, router]);

  useEffect(() => {
    if (!sessionUser?.id) return;

    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await userApi.getById(sessionUser.id);
        if (res.success && res.data) {
          const u = res.data;
          const p = u.profile || {};
          setFormData({
            name: u.name || sessionUser.name || "",
            image: u.image || sessionUser.image || "",
            title: p.title || "",
            phone: p.phone || "",
            location: p.location || "",
            bio: p.bio || "",
            skills: Array.isArray(p.skills) ? p.skills : [],
            resumeUrl: p.resumeUrl || "",
            portfolioUrl: p.portfolioUrl || "",
          });
        }
      } catch (err: any) {
        console.error("Failed to load user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [sessionUser]);

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (!formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionUser?.id) return;

    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const userRes = await userApi.updateUser(sessionUser.id, {
        name: formData.name.trim(),
        image: formData.image.trim() || null,
      });

      const profileRes = await userApi.updateProfile(sessionUser.id, {
        title: formData.title.trim() || null,
        phone: formData.phone.trim() || null,
        location: formData.location.trim() || null,
        bio: formData.bio.trim() || null,
        skills: formData.skills,
        resumeUrl: formData.resumeUrl.trim() || null,
        portfolioUrl: formData.portfolioUrl.trim() || null,
      });

      if (userRes.success || profileRes.success) {
        setSuccessMessage("আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে! 🎉");
        setTimeout(() => setSuccessMessage(null), 4000);
      } else {
        setErrorMessage(
          profileRes.message || userRes.message || "প্রোফাইল পরিবর্তন সংরক্ষণ করা যায়নি।"
        );
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "প্রোফাইল সংরক্ষণ করার সময় সমস্যা দেখা দিয়েছে।");
    } finally {
      setSaving(false);
    }
  };

  const dashboardHref =
    sessionUser?.role === "ADMIN"
      ? "/dashboard/admin"
      : sessionUser?.role === "MODERATOR"
      ? "/dashboard/moderator"
      : sessionUser?.role === "EMPLOYER"
      ? "/dashboard/employer"
      : "/dashboard/candidate";

  const getRoleBadgeLabel = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return "অ্যাডমিনিস্ট্রেটর";
      case "MODERATOR":
        return "মডারেটর";
      case "EMPLOYER":
        return "কোম্পানি / নিয়োগকারী";
      default:
        return "পেশাদার / কারিগর";
    }
  };

  if (isSessionLoading || loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-zinc-600" />
          <p className="text-xs font-semibold text-zinc-600">প্রোফাইল লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 py-10 lg:py-14 font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href={dashboardHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition"
          >
            <ArrowLeft size={14} /> ড্যাশবোর্ডে ফিরে যান
          </Link>
          <span className={`rounded-full px-3 py-1 text-xs font-bold border ${
            sessionUser?.role === "ADMIN"
              ? "bg-amber-50 text-amber-800 border-amber-200"
              : sessionUser?.role === "MODERATOR"
              ? "bg-purple-50 text-purple-800 border-purple-200"
              : sessionUser?.role === "EMPLOYER"
              ? "bg-indigo-50 text-indigo-800 border-indigo-200"
              : "bg-emerald-50 text-emerald-800 border-emerald-200"
          }`}>
            {getRoleBadgeLabel(sessionUser?.role)} অ্যাকাউন্ট
          </span>
        </div>

        {/* Profile Card Header */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            {formData.image ? (
              <img
                src={formData.image}
                alt={formData.name || "User Avatar"}
                className="h-20 w-20 rounded-2xl object-cover border border-zinc-200 shadow-sm"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 text-2xl font-black text-white shadow-sm">
                {formData.name?.charAt(0) || sessionUser?.email?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                  {formData.name || "আপনার প্রোফাইল"}
                </h1>
                <span className="flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                  <ShieldCheck size={12} className="text-emerald-600" /> সক্রিয় সদস্য
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-zinc-600">
                {formData.title || "এখনও কোনো পেশাগত পদবী যোগ করা হয়নি"}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-zinc-400" /> {sessionUser?.email}
                </span>
                {formData.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-zinc-400" /> {formData.location}
                  </span>
                )}
                {formData.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-zinc-400" /> {formData.phone}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Notifications */}
        {successMessage && (
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-emerald-50 px-5 py-3.5 text-xs font-semibold text-emerald-800 border border-emerald-200 shadow-xs">
            <CheckCircle2 size={16} className="text-emerald-600" /> {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-rose-50 px-5 py-3.5 text-xs font-semibold text-rose-700 border border-rose-200 shadow-xs">
            <AlertCircle size={16} className="text-rose-600" /> {errorMessage}
          </div>
        )}

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Section 1: Basic Information */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-bold text-zinc-950 flex items-center gap-2">
              <UserIcon size={18} className="text-zinc-700" /> প্রাথমিক অ্যাকাউন্ট তথ্য
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              আপনার সঠিক পরিচিতি ও যোগাযোগের তথ্য দিলে নিয়োগকারী ও ক্লায়েন্টরা দ্রুত যোগাযোগ করতে পারবে।
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  পূর্ণ নাম *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="যেমন: মো. রফিকুল ইসলাম"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  ইমেইল অ্যাড্রেস (ভেরিফাইড)
                </label>
                <input
                  type="email"
                  disabled
                  value={sessionUser?.email || ""}
                  className="mt-1.5 w-full rounded-xl border border-zinc-200 bg-zinc-100 px-3.5 py-2.5 text-sm text-zinc-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  পেশাগত পদবী / হেডলাইন
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="যেমন: সিনিয়র উইলকম ডিজিটাইজার / ফ্যাক্টরি ইনচার্জ"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  ফোন / হোয়াটসঅ্যাপ নম্বর
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="যেমন: +৮৮০ ১৭১২ ৩৪৫৬৭৮"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  বর্তমান অবস্থান / জেলা
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="যেমন: গাজীপুর, ঢাকা, নারায়ণগঞ্জ"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  প্রোফাইল ছবি / অ্যাভাটার URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-800">
                  সংক্ষিপ্ত পরিচিতি / বায়ো (Bio)
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="আপনার কাজের অভিজ্ঞতা, বিশেষ দক্ষতা, কোন কোন মেশিনে কাজ করতে পারেন বা আপনার বিশেষ পারদর্শিতা সম্পর্কে লিখুন..."
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Skills & Specialties */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-bold text-zinc-950 flex items-center gap-2">
              <Tag size={18} className="text-zinc-700" /> এমব্রয়ডারি দক্ষতা ও বিশেষ পারদর্শিতা
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              আপনার জানা সফটওয়্যার ও কাজের ক্ষেত্রগুলো নির্বাচন করুন যাতে সঠিক কাজের অফার পেতে পারেন।
            </p>

            {/* Selected Skills Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {formData.skills.length === 0 ? (
                <p className="text-xs text-zinc-400 italic">এখনও কোনো দক্ষতা যোগ করা হয়নি। নিচে ক্লিক করে যোগ করুন।</p>
              ) : (
                formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="rounded-full p-0.5 hover:opacity-75"
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Quick Add Preset Skills */}
            <div className="mt-6 border-t border-zinc-100 pt-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                জনপ্রিয় দক্ষতা ও কাজ (ক্লিক করে যোগ করুন):
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {POPULAR_SKILLS.map((skill) => {
                  const isSelected = formData.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      disabled={isSelected}
                      onClick={() => handleAddSkill(skill)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                        isSelected
                          ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                          : "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950"
                      }`}
                    >
                      + {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Skill Input */}
            <div className="mt-4 flex items-center gap-2 max-w-sm">
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
                placeholder="অন্য কোনো দক্ষতা লিখুন..."
                className="flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(customSkillInput)}
                className="rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-2 text-xs font-bold text-zinc-900 hover:bg-zinc-200 transition-colors"
              >
                যুক্ত করুন
              </button>
            </div>
          </div>

          {/* Section 3: Portfolio & Links */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-bold text-zinc-950 flex items-center gap-2">
              <Globe size={18} className="text-zinc-700" /> পোর্টফোলিও ও কাজের ক্যাটালগ লিংক
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              আপনার ডিজাইন স্যাম্পল, গুগল ড্রাইভ ফোল্ডার অথবা বিহান্স (Behance) লিংক যুক্ত করুন।
            </p>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  পোর্টফোলিও / ওয়েবসাইট লিংক
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://behance.net/your-designs"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  সিভি / জীবনবৃত্তান্ত ড্রাইভ লিংক
                </label>
                <input
                  type="url"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  placeholder="https://drive.google.com/your-cv.pdf"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex items-center justify-between border-t border-zinc-200 pt-6">
            <Link
              href={dashboardHref}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950"
            >
              বাতিল করুন
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "সংরক্ষণ হচ্ছে..." : "প্রোফাইল সংরক্ষণ করুন"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
