"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Briefcase,
  Building,
  DollarSign,
  MapPin,
  Calendar,
  Mail,
  FileText,
  Loader2,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { categoryApi, jobApi } from "@/services";

export default function PostJobPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as any)?.user;

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [jobType, setJobType] = useState<"FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP">("FULL_TIME");
  const [workplaceType, setWorkplaceType] = useState<"ONSITE" | "REMOTE" | "HYBRID">("ONSITE");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [applyEmail, setApplyEmail] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  // Pre-fill user email if available
  useEffect(() => {
    if (user?.email && !applyEmail) {
      setApplyEmail(user.email);
    }
  }, [user, applyEmail]);

  // Fetch Categories from Backend
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryApi.getAll();
        if (res.success && Array.isArray(res.data)) {
          setCategories(res.data);
          if (res.data.length > 0) {
            setCategoryId(res.data[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user?.id) {
      setError("চাকরি পোস্ট করতে অনুগ্রহ করে আগে লগইন করুন।");
      return;
    }

    if (!title.trim() || !companyName.trim() || !description.trim() || !applyEmail.trim() || !categoryId) {
      setError("তারকা (*) চিহ্নিত প্রতিটি ঘর সঠিকভাবে পূরণ করুন।");
      return;
    }

    setLoading(true);

    try {
      const isAutoApproved = user?.role === "ADMIN" || user?.role === "MODERATOR";

      const payload = {
        title: title.trim(),
        description: description.trim(),
        categoryId,
        companyName: companyName.trim(),
        companyWebsite: companyWebsite.trim() || null,
        companyLogo: companyLogo.trim() || null,
        companyDescription: companyDescription.trim() || null,
        jobType,
        workplaceType,
        location: location.trim() || (workplaceType === "REMOTE" ? "রিমোট" : "বাংলাদেশ"),
        salaryMin: salaryMin ? parseInt(salaryMin, 10) : null,
        salaryMax: salaryMax ? parseInt(salaryMax, 10) : null,
        salaryCurrency: "BDT",
        applyEmail: applyEmail.trim(),
        deadline: deadline ? new Date(deadline).toISOString() : null,
        status: isAutoApproved ? "PUBLISHED" : "DRAFT",
        ownerUserId: user.id,
      };

      const res = await jobApi.create(payload as any);

      if (!res.success) {
        throw new Error(res.message || "বিজ্ঞপ্তি পোস্ট করা সম্ভব হয়নি।");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(isAutoApproved ? "/jobs" : "/dashboard/employer");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "চাকরির বিজ্ঞপ্তি দেওয়ার সময় সমস্যা দেখা দিয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 py-10 lg:py-14 font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft size={14} /> চাকরির তালিকায় ফিরে যান
        </Link>

        {/* Header with Hook */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-xs">
            <Sparkles size={14} className="text-amber-500" />
            নিয়োগকারী ও ফ্যাক্টরি পোর্টাল
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            নতুন চাকরির বিজ্ঞপ্তি প্রকাশ করুন 📢
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            বাংলাদেশের শীর্ষস্থানীয় উইলকম ডিজিটাইজার, পাঞ্চার, স্যাম্পল মেকার এবং মেশিন অপারেটরদের সরাসরি নিজের প্রতিষ্ঠানে যুক্ত করুন।
          </p>
        </div>

        {/* Not Logged In Warning */}
        {!isPending && !user && (
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-xs">
            <div className="flex items-center gap-3">
              <Lock size={20} className="shrink-0 text-amber-600" />
              <div>
                <p className="text-sm font-bold">লগইন প্রয়োজন</p>
                <p className="text-xs text-amber-800">
                  বিজ্ঞপ্তি প্রকাশের জন্য আপনার EMBOBD অ্যাকাউন্টে লগইন থাকতে হবে।
                </p>
              </div>
            </div>
            <Link
              href="/login"
              className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-amber-700 shadow-xs"
            >
              এখনই লগইন করুন
            </Link>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900 shadow-xs">
            <CheckCircle2 size={22} className="text-emerald-600" />
            <div>
              <p className="text-sm font-bold">বিজ্ঞপ্তিটি সফলভাবে জমা হয়েছে! ⏳</p>
              <p className="text-xs text-emerald-800">
                আপনার চাকরির বিজ্ঞাপনটি অনুমোদনের জন্য জমা পড়েছে। অ্যাডমিন বা মডারেটর রিভিউ করার সাথে সাথেই এটি লাইভ হবে।
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 shadow-xs">
            {error}
          </div>
        )}

        {/* Job Creation Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          {/* 1. Job Basics */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-950">
              <Briefcase size={18} className="text-zinc-700" /> ১. পদের নাম ও প্রয়োজনীয় তথ্য
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-800">
                  পদের নাম / জব টাইটেল *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: সিনিয়র উইলকম ডিজিটাইজার / পাঞ্চার (এক্সপোর্ট বিভাগ)"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  ক্যাটাগরি *
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  চাকরির ধরণ *
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as any)}
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none"
                >
                  <option value="FULL_TIME">ফুল-টাইম</option>
                  <option value="FREELANCE">ফ্রিল্যান্স / প্রতি ডিজাইন</option>
                  <option value="PART_TIME">পার্ট-টাইম</option>
                  <option value="CONTRACT">চুক্তিভিত্তিক</option>
                  <option value="INTERNSHIP">ইন্টার্নশিপ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  কাজের স্থান *
                </label>
                <select
                  value={workplaceType}
                  onChange={(e) => setWorkplaceType(e.target.value as any)}
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none"
                >
                  <option value="ONSITE">অন-সাইট (ফ্যাক্টরি / স্টুডিও)</option>
                  <option value="REMOTE">রিমোট (বাসা থেকে কাজ)</option>
                  <option value="HYBRID">হাইব্রিড</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  ঠিকানা (শহর / ইপিজেড / এলাকা)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="যেমন: গাজীপুর, ঢাকা অথবা নারায়ণগঞ্জ"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  সর্বনিম্ন বেতন (টাকা)
                </label>
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  placeholder="যেমন: ৩৫০০০"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  সর্বোচ্চ বেতন (টাকা)
                </label>
                <input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  placeholder="যেমন: ৫০০০০"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Company Information */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-950">
              <Building size={18} className="text-zinc-700" /> ২. কোম্পানি বা স্টুডিওর পরিচিতি
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  কোম্পানি বা ফ্যাক্টরির নাম *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="যেমন: অ্যাপেক্স অ্যাপারেলস লি. অথবা অনোখী বুটিক"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  কোম্পানি ওয়েবসাইট (ঐচ্ছিক)
                </label>
                <input
                  type="url"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center justify-between text-xs font-semibold text-zinc-800">
                  <span>কোম্পানি লোগো লিংক (ঐচ্ছিক)</span>
                  <span className="text-[10px] text-zinc-500 font-normal">ছবির সরাসরি লিংক</span>
                </label>
                <input
                  type="url"
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Job Description & How to Apply */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-950">
              <FileText size={18} className="text-zinc-700" /> ৩. কাজের দায়িত্ব ও আবেদনের নিয়ম
            </h2>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  আবেদন গ্রহণের ইমেইল *
                </label>
                <input
                  type="email"
                  required
                  value={applyEmail}
                  onChange={(e) => setApplyEmail(e.target.value)}
                  placeholder="careers@yourcompany.com"
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-zinc-500">
                  প্রার্থীরা এই ইমেইল ঠিকানায় তাদের পোর্টফোলিও ও সিভি পাঠাতে পারবে।
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  আবেদনের শেষ তারিখ (ঐচ্ছিক)
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  কাজের দায়িত্ব ও বিস্তারিত বর্ণনা *
                </label>
                <textarea
                  rows={8}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="মেশিন স্পেসিফিকেশন (তাজিমা, বারুদান), সফটওয়্যার ভার্সন (উইলকম e2/e4), কাজের প্রধান দায়িত্ব, শিফট এবং প্রয়োজনীয় অভিজ্ঞতার বর্ণনা লিখুন..."
                  className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white p-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/jobs"
              className="rounded-xl px-5 py-3 text-sm font-semibold text-zinc-600 hover:text-zinc-950"
            >
              বাতিল করুন
            </Link>

            <button
              type="submit"
              disabled={loading || success || (!isPending && !user)}
              className="flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  বিজ্ঞপ্তি পোস্ট হচ্ছে...
                </>
              ) : (
                "বিজ্ঞপ্তি প্রকাশ করুন"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
