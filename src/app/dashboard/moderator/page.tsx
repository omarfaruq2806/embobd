"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  ShieldAlert,
  ShieldCheck,
  Briefcase,
  Store,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { businessApi, communityApi, jobApi, categoryApi } from "@/services";

export default function ModeratorOverviewPage() {
  const { data: session } = authClient.useSession();
  const user = (session as any)?.user;

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"businesses" | "posts" | "jobs">("businesses");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [pendingBusinesses, setPendingBusinesses] = useState<any[]>([]);
  const [pendingPosts, setPendingPosts] = useState<any[]>([]);
  const [draftJobs, setDraftJobs] = useState<any[]>([]);

  const [counts, setCounts] = useState({
    pendingBusinesses: 0,
    approvedBusinesses: 0,
    pendingPosts: 0,
    approvedPosts: 0,
    draftJobs: 0,
    publishedJobs: 0,
    categoriesCount: 0,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [bizRes, commRes, jobRes, catRes] = await Promise.all([
        businessApi.getAll(),
        communityApi.getAll(),
        jobApi.getAll(),
        categoryApi.getAll(),
      ]);

      const businesses = bizRes.success && Array.isArray(bizRes.data) ? bizRes.data : [];
      const posts = commRes.success && Array.isArray(commRes.data) ? commRes.data : [];
      const jobs = jobRes.success && Array.isArray(jobRes.data) ? jobRes.data : [];
      const categories = catRes.success && Array.isArray(catRes.data) ? catRes.data : [];

      const pBiz = businesses.filter((b) => b.status === "PENDING");
      const aBiz = businesses.filter((b) => b.status === "APPROVED");
      const pPost = posts.filter((p) => p.status === "PENDING");
      const aPost = posts.filter((p) => p.status === "APPROVED");
      const dJob = jobs.filter((j) => j.status === "DRAFT");
      const pubJob = jobs.filter((j) => j.status === "PUBLISHED");

      setPendingBusinesses(pBiz);
      setPendingPosts(pPost);
      setDraftJobs(dJob);

      setCounts({
        pendingBusinesses: pBiz.length,
        approvedBusinesses: aBiz.length,
        pendingPosts: pPost.length,
        approvedPosts: aPost.length,
        draftJobs: dJob.length,
        publishedJobs: pubJob.length,
        categoriesCount: categories.length,
      });
    } catch (err) {
      console.error("Moderator dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApproveBusiness = async (id: string) => {
    setUpdatingId(id);
    setFeedback(null);
    try {
      const res = await businessApi.approve(id);
      if (res.success) {
        setPendingBusinesses((prev) => prev.filter((b) => b.id !== id));
        setCounts((prev) => ({
          ...prev,
          pendingBusinesses: Math.max(0, prev.pendingBusinesses - 1),
          approvedBusinesses: prev.approvedBusinesses + 1,
        }));
        setFeedback({ type: "success", text: "ব্যবসা সফলভাবে অনুমোদন ও ভেরিফাই করা হয়েছে! 🎉" });
      } else {
        setFeedback({ type: "error", text: res.message || "ব্যবসা অনুমোদন করা যায়নি।" });
      }
    } catch (err: any) {
      setFeedback({ type: "error", text: err?.message || "অনুমোদন করতে সমস্যা হয়েছে।" });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleRejectBusiness = async (id: string) => {
    const reason = prompt("বাতিলের কারণ লিখুন:", "তথ্য অসম্পূর্ণ অথবা একাধিক এন্ট্রি রয়েছে");
    if (reason === null) return;

    setUpdatingId(id);
    setFeedback(null);
    try {
      const res = await businessApi.reject(id, reason);
      if (res.success) {
        setPendingBusinesses((prev) => prev.filter((b) => b.id !== id));
        setCounts((prev) => ({
          ...prev,
          pendingBusinesses: Math.max(0, prev.pendingBusinesses - 1),
        }));
        setFeedback({ type: "success", text: "ব্যবসা আবেদন বাতিল করা হয়েছে।" });
      } else {
        setFeedback({ type: "error", text: res.message || "বাতিল করা যায়নি।" });
      }
    } catch (err: any) {
      setFeedback({ type: "error", text: err?.message || "বাতিল করতে সমস্যা হয়েছে।" });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleApprovePost = async (id: string) => {
    setUpdatingId(id);
    setFeedback(null);
    try {
      const res = await communityApi.approve(id);
      if (res.success) {
        setPendingPosts((prev) => prev.filter((p) => p.id !== id));
        setCounts((prev) => ({
          ...prev,
          pendingPosts: Math.max(0, prev.pendingPosts - 1),
          approvedPosts: prev.approvedPosts + 1,
        }));
        setFeedback({ type: "success", text: "কমিউনিটি পোস্ট সফলভাবে পাবলিশ হয়েছে! 🎉" });
      } else {
        setFeedback({ type: "error", text: res.message || "পোস্ট অনুমোদন করা যায়নি।" });
      }
    } catch (err: any) {
      setFeedback({ type: "error", text: err?.message || "পোস্ট অনুমোদনে সমস্যা হয়েছে।" });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleRejectPost = async (id: string) => {
    const reason = prompt("বাতিলের কারণ লিখুন:", "পোস্টটি কমিউনিটি নির্দেশিকা মেনে হয়নি।");
    if (reason === null) return;

    setUpdatingId(id);
    setFeedback(null);
    try {
      const res = await communityApi.reject(id, reason);
      if (res.success) {
        setPendingPosts((prev) => prev.filter((p) => p.id !== id));
        setCounts((prev) => ({
          ...prev,
          pendingPosts: Math.max(0, prev.pendingPosts - 1),
        }));
        setFeedback({ type: "success", text: "কমিউনিটি পোস্ট বাতিল করা হয়েছে।" });
      } else {
        setFeedback({ type: "error", text: res.message || "পোস্ট বাতিল করা যায়নি।" });
      }
    } catch (err: any) {
      setFeedback({ type: "error", text: err?.message || "পোস্ট বাতিল করতে সমস্যা হয়েছে।" });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleApproveJob = async (id: string) => {
    setUpdatingId(id);
    setFeedback(null);
    try {
      const res = await jobApi.update(id, { status: "PUBLISHED" });
      if (res.success) {
        setDraftJobs((prev) => prev.filter((j) => j.id !== id));
        setCounts((prev) => ({
          ...prev,
          draftJobs: Math.max(0, prev.draftJobs - 1),
          publishedJobs: prev.publishedJobs + 1,
        }));
        setFeedback({ type: "success", text: "চাকরির বিজ্ঞপ্তি বোর্ডে পাবলিশ হয়েছে! 🎉" });
      } else {
        setFeedback({ type: "error", text: res.message || "বিজ্ঞপ্তি পাবলিশ করা যায়নি।" });
      }
    } catch (err: any) {
      setFeedback({ type: "error", text: err?.message || "পাবলিশ করতে সমস্যা হয়েছে।" });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const totalPending = counts.pendingBusinesses + counts.pendingPosts + counts.draftJobs;

  return (
    <div className="mx-auto max-w-7xl font-sans">
      {/* Header Banner with Hook */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-700 text-xl font-bold text-white shadow-sm">
            {user?.name?.charAt(0) || "M"}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
                মডারেটর স্টেশন
              </h1>
              <span className="rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-800 border border-purple-200">
                কনটেন্ট ও ট্রাস্ট কন্ট্রোল
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-600">
              স্বাগতম, <span className="font-semibold text-zinc-950">{user?.name || "মডারেটর"}</span>। আপনার রিভিউয়ের অপেক্ষায় আছে <span className="font-bold text-purple-700">{totalPending} টি সাবমিশন</span>।
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/moderator/businesses"
            className="flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs font-bold text-zinc-800 transition hover:bg-zinc-100 shadow-xs"
          >
            <Store size={14} /> ব্যবসা রিভিউ করুন
          </Link>
          <Link
            href="/dashboard/moderator/jobs"
            className="flex items-center gap-1.5 rounded-xl bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-purple-800"
          >
            <Briefcase size={14} /> চাকরি রিভিউ করুন
          </Link>
        </div>
      </div>

      {/* Notifications */}
      {feedback && (
        <div
          className={`mt-4 flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold border ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200 shadow-xs"
              : "bg-rose-50 text-rose-800 border-rose-200 shadow-xs"
          }`}
        >
          {feedback.type === "success" ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-rose-600" />}
          {feedback.text}
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Pending Businesses */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">ব্যবসা অনুমোদন</span>
            <Store size={16} className="text-amber-500" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {counts.pendingBusinesses}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-amber-700 font-medium">
              {counts.pendingBusinesses} টি অপেক্ষমাণ
            </span>
            <Link
              href="/dashboard/moderator/businesses"
              className="text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
            >
              যাচাই করুন →
            </Link>
          </div>
        </div>

        {/* Pending Community Posts */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">কমিউনিটি পোস্ট</span>
            <MessageSquare size={16} className="text-purple-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {counts.pendingPosts}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-purple-700 font-medium">
              {counts.approvedPosts} টি লাইভ পোস্ট
            </span>
            <Link
              href="/dashboard/moderator/community"
              className="text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
            >
              যাচাই করুন →
            </Link>
          </div>
        </div>

        {/* Pending / Draft Jobs */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">চাকরি সাবমিশন</span>
            <Briefcase size={16} className="text-blue-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {counts.draftJobs}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-blue-700 font-medium">
              {counts.publishedJobs} টি লাইভ সার্কুলার
            </span>
            <Link
              href="/dashboard/moderator/jobs"
              className="text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
            >
              যাচাই করুন →
            </Link>
          </div>
        </div>

        {/* Verified Directory Items */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-zinc-600">
            <span className="text-xs font-semibold">ভেরিফাইড প্রতিষ্ঠান</span>
            <ShieldCheck size={16} className="text-emerald-600" />
          </div>
          <p className="mt-3 text-2xl font-bold text-zinc-950">
            {counts.approvedBusinesses}
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-emerald-700 font-medium">
              অনুমোদিত প্রতিষ্ঠান
            </span>
            <Link
              href="/dashboard/moderator/categories"
              className="text-[11px] font-bold text-zinc-600 hover:text-zinc-950"
            >
              ক্যাটাগরি →
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Urgent Moderation Queue (Live Actions) */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-bold text-zinc-950">
              জরুরি অ্যাকশন কিউ
            </h2>
            <p className="text-xs text-zinc-500">
              এই পেজ থেকেই সরাসরি এক ক্লিকে যেকোনো সাবমিশন অনুমোদন বা বাতিল করুন।
            </p>
          </div>

          {/* Queue Filter Tabs */}
          <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("businesses")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeTab === "businesses"
                  ? "bg-white text-zinc-950 shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              ব্যবসা ও শপ ({pendingBusinesses.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("posts")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeTab === "posts"
                  ? "bg-white text-zinc-950 shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              কমিউনিটি ({pendingPosts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("jobs")}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                activeTab === "jobs"
                  ? "bg-white text-zinc-950 shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              ড্রাফট চাকরি ({draftJobs.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {loading ? (
            <div className="py-12 text-center text-zinc-500">
              <Loader2 size={24} className="mx-auto animate-spin" />
            </div>
          ) : activeTab === "businesses" ? (
            pendingBusinesses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 py-10 text-center">
                <CheckCircle2 size={28} className="mx-auto text-emerald-600" />
                <p className="mt-2 text-xs font-bold text-zinc-950">সব কাজ সম্পন্ন!</p>
                <p className="text-[11px] text-zinc-500">কোনো ব্যবসা আবেদন অপেক্ষমাণ নেই।</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {pendingBusinesses.map((b) => (
                  <div key={b.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-zinc-950">{b.name}</span>
                        <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-700">
                          {b.type}
                        </span>
                        <span className="text-xs text-zinc-500">• {b.district}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-600">
                        ফোন: {b.phone} | জমাকারী: {b.submittedUser?.name || "সরাসরি ফর্ম"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/businesses/${b.slug}`}
                        className="rounded-xl border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100"
                        title="বিস্তারিত দেখুন"
                      >
                        <ExternalLink size={13} className="inline mr-1" /> দেখুন
                      </Link>
                      <button
                        type="button"
                        disabled={updatingId === b.id}
                        onClick={() => handleApproveBusiness(b.id)}
                        className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
                      >
                        অনুমোদন দিন
                      </button>
                      <button
                        type="button"
                        disabled={updatingId === b.id}
                        onClick={() => handleRejectBusiness(b.id)}
                        className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                      >
                        বাতিল করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeTab === "posts" ? (
            pendingPosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 py-10 text-center">
                <CheckCircle2 size={28} className="mx-auto text-emerald-600" />
                <p className="mt-2 text-xs font-bold text-zinc-950">সব পোস্ট মডারেট করা হয়েছে!</p>
                <p className="text-[11px] text-zinc-500">বর্তমানে কোনো অপ্রকাশিত পোস্ট কিউতে নেই।</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {pendingPosts.map((post) => (
                  <div key={post.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-bold text-zinc-950">{post.title}</p>
                      <p className="mt-0.5 text-xs text-zinc-600">
                        ক্যাটাগরি: {post.category} • লেখক: {post.author?.name || "সদস্য"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/communities/${post.slug || post.id}`}
                        className="rounded-xl border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100"
                      >
                        <ExternalLink size={13} className="inline mr-1" /> দেখুন
                      </Link>
                      <button
                        type="button"
                        disabled={updatingId === post.id}
                        onClick={() => handleApprovePost(post.id)}
                        className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
                      >
                        পোস্ট পাবলিশ করুন
                      </button>
                      <button
                        type="button"
                        disabled={updatingId === post.id}
                        onClick={() => handleRejectPost(post.id)}
                        className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                      >
                        বাতিল করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            draftJobs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 py-10 text-center">
                <CheckCircle2 size={28} className="mx-auto text-emerald-600" />
                <p className="mt-2 text-xs font-bold text-zinc-950">কোনো ড্রাফট চাকরি অপেক্ষমাণ নেই!</p>
                <p className="text-[11px] text-zinc-500">সকল নিয়োগ বিজ্ঞপ্তি রিভিউ করা হয়েছে।</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {draftJobs.map((job) => (
                  <div key={job.id} className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="font-bold text-zinc-950">{job.title}</p>
                      <p className="mt-0.5 text-xs text-zinc-600">
                        {job.company?.name || "কোম্পানি"} • {job.category?.name || "ক্যাটাগরি"} • {job.jobType}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/jobs/${job.id}`}
                        className="rounded-xl border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100"
                      >
                        <ExternalLink size={13} className="inline mr-1" /> দেখুন
                      </Link>
                      <button
                        type="button"
                        disabled={updatingId === job.id}
                        onClick={() => handleApproveJob(job.id)}
                        className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
                      >
                        বোর্ডে পাবলিশ করুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* Moderation Tool Shortcuts */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Briefcase size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-950">চাকরি মডারেশন</h3>
              <p className="text-[11px] text-zinc-500">বিজ্ঞপ্তি রিভিউ ও ফিল্টারিং</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-zinc-600">
            পাবলিক জব বোর্ড নিয়ন্ত্রণ করুন, নিয়োগকারীদের দেওয়া ড্রাফট সার্কুলারগুলো অনুমোদন দিন।
          </p>
          <Link
            href="/dashboard/moderator/jobs"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900"
          >
            চাকরি অনুমোদন স্টেশন <ArrowRight size={13} />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
              <Store size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-950">ব্যবসা ডিরেক্টরি</h3>
              <p className="text-[11px] text-zinc-500">ফ্যাক্টরি ও শপ ভেরিফিকেশন</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-zinc-600">
            নতুন এমব্রয়ডারি কারখানা ও সাপ্লাই শপের বিবরণ যাচাই করে ভেরিফায়েড সিল প্রদান করুন।
          </p>
          <Link
            href="/dashboard/moderator/businesses"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900"
          >
            ডিরেক্টরি স্টেশন খুলুন <ArrowRight size={13} />
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 border border-purple-100">
              <MessageSquare size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-950">কমিউনিটি পোস্ট</h3>
              <p className="text-[11px] text-zinc-500">নিরাপদ আলোচনা ও টিপস নিশ্চিতকরণ</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-zinc-600">
            স্টিচ ডিজাইন, মেশিন গাইড ও কমিউনিটি আলোচনাগুলো যাচাই করে স্প্যাম ফিল্টার করুন।
          </p>
          <Link
            href="/dashboard/moderator/community"
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900"
          >
            কমিউনিটি স্টেশন খুলুন <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
