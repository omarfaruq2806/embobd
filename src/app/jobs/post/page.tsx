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

interface Category {
  id: string;
  name: string;
  description?: string;
}

export default function PostJobPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as any)?.user;

  const [categories, setCategories] = useState<Category[]>([]);
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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
        const res = await fetch(`${API_URL}/api/v1/categories`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setCategories(json.data);
          if (json.data.length > 0) {
            setCategoryId(json.data[0].id);
          }
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    fetchCategories();
  }, [API_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user?.id) {
      setError("You must be logged in to post a job. Please log in first.");
      return;
    }

    if (!title.trim() || !companyName.trim() || !description.trim() || !applyEmail.trim() || !categoryId) {
      setError("Please fill in all required fields marked with *.");
      return;
    }

    setLoading(true);

    try {
      // Jobs posted by employers require Admin approval (status: DRAFT / Pending)
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
        location: location.trim() || (workplaceType === "REMOTE" ? "Remote" : "Bangladesh"),
        salaryMin: salaryMin ? parseInt(salaryMin, 10) : null,
        salaryMax: salaryMax ? parseInt(salaryMax, 10) : null,
        salaryCurrency: "BDT",
        applyEmail: applyEmail.trim(),
        deadline: deadline ? new Date(deadline).toISOString() : null,
        status: isAutoApproved ? "PUBLISHED" : "DRAFT",
        ownerUserId: user.id,
      };

      const res = await fetch(`${API_URL}/api/v1/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to post job.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(isAutoApproved ? "/jobs" : "/dashboard/employer");
        router.refresh();
      }, 2000);
    } catch (err: any) {
      setError(err?.message || "Something went wrong while posting the job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50/50 py-12 dark:bg-black lg:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={14} /> Back to Job Board
        </Link>

        {/* Header */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow-xs dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-200">
            <Sparkles size={14} className="text-amber-500" />
            Employer & Recruiter Portal
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-black dark:text-white sm:text-4xl">
            Post an Embroidery Job
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Reach thousands of vetted Wilcom digitizers, factory technicians, and artisanal craftsmen across Bangladesh.
          </p>
        </div>

        {/* Not Logged In Warning */}
        {!isPending && !user && (
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-amber-500/20 bg-amber-50 p-5 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            <div className="flex items-center gap-3">
              <Lock size={20} className="shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-sm font-bold">Authentication Required</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  You need to be logged into your EMBOBD account to publish a job.
                </p>
              </div>
            </div>
            <Link
              href="/login"
              className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-700"
            >
              Log In Now
            </Link>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-50 p-5 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
            <CheckCircle2 size={22} className="text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-sm font-bold">Job Submitted for Review! ⏳</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">
                Your job listing has been submitted. It will become visible on the public job board as soon as an Admin or Moderator approves it.
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Job Creation Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8">
          {/* 1. Job Basics */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-black dark:text-white">
              <Briefcase size={18} /> 1. Job Role & Details
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Wilcom Digitizer (Export Division)"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Specialty Category *
                </label>
                <select
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Job Type *
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value as any)}
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                >
                  <option value="FULL_TIME">Full-Time</option>
                  <option value="FREELANCE">Freelance / Per Design</option>
                  <option value="PART_TIME">Part-Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Workplace Setup *
                </label>
                <select
                  value={workplaceType}
                  onChange={(e) => setWorkplaceType(e.target.value as any)}
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                >
                  <option value="ONSITE">On-Site (Factory / Studio)</option>
                  <option value="REMOTE">Remote (Work from home)</option>
                  <option value="HYBRID">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Location (City / EPZ / Area)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Gazipur, Dhaka or Narayanganj"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Minimum Salary (BDT)
                </label>
                <input
                  type="number"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  placeholder="e.g. 35000"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Maximum Salary (BDT)
                </label>
                <input
                  type="number"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  placeholder="e.g. 50000"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>
            </div>
          </div>

          {/* 2. Company Information */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-black dark:text-white">
              <Building size={18} /> 2. Company / Studio Information
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Apparels Ltd or Anokhi Boutique"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Company Website (Optional)
                </label>
                <input
                  type="url"
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Company Logo URL (Optional)
                </label>
                <input
                  type="url"
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>
            </div>
          </div>

          {/* 3. Job Description & How to Apply */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
            <h2 className="flex items-center gap-2 text-lg font-bold text-black dark:text-white">
              <FileText size={18} /> 3. Requirements & Application
            </h2>

            <div className="mt-6 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Application Email *
                </label>
                <input
                  type="email"
                  required
                  value={applyEmail}
                  onChange={(e) => setApplyEmail(e.target.value)}
                  placeholder="careers@yourcompany.com"
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
                <p className="mt-1 text-[11px] text-zinc-500">
                  Candidates will submit resumes or stitch portfolios directly to this email.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Application Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Job Description & Responsibilities *
                </label>
                <textarea
                  rows={8}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe machine specifications (Tajima, Barudan), software versions (Wilcom ES), key responsibilities, shift requirements, and skills..."
                  className="mt-1.5 w-full rounded-xl border border-black/15 bg-transparent p-3.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/jobs"
              className="rounded-xl px-5 py-3 text-sm font-semibold text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading || success || (!isPending && !user)}
              className="flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-3 text-sm font-semibold text-white shadow-xs transition hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Publishing Job...
                </>
              ) : (
                "Publish Embroidery Job"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
