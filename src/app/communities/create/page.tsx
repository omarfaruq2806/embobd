"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  PenSquare,
  Sparkles,
  Tag,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  Heading,
  Bold,
  List,
  Quote,
  Info,
} from "lucide-react";
import { communityApi } from "@/services";

const CATEGORY_OPTIONS = [
  "টিউটোরিয়াল",
  "ডিজাইন শোকেস",
  "মেশিন টেকনিক",
  "শিল্প সংবাদ",
  "চাকরির টিপস",
  "সাধারণ আলোচনা",
];

export default function CreateCommunityPostPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as any)?.user;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("টিউটোরিয়াল");
  const [coverImage, setCoverImage] = useState("");
  const [rawTags, setRawTags] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("write");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<any>(null);
  const [createdStatus, setCreatedStatus] = useState<any>(null);

  const tagsList = rawTags
    .split(",")
    .map((t: any) => t.trim())
    .filter(Boolean);

  const insertFormatting = (prefix: any, suffix: any = "") => {
    setContent((prev) => prev + `${prefix}${suffix}`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("দয়া করে আর্টিকেলের একটি আকর্ষণীয় শিরোনাম দিন।");
      return;
    }
    if (!content.trim()) {
      setError("আর্টিকেলের মূল বক্তব্য বা কনটেন্ট খালি রাখা যাবে না।");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await communityApi.create({
        title: title.trim(),
        category,
        coverImage: coverImage.trim() || undefined,
        tags: tagsList,
        excerpt: excerpt.trim() || undefined,
        content: content.trim(),
      });

      if (res.success && res.data) {
        setSuccess(true);
        setCreatedSlug(res.data.slug);
        setCreatedStatus(res.data.status);
      } else {
        setError(res.message || "পোস্টটি প্রকাশ করা সম্ভব হয়নি।");
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(err?.message || "সার্ভারে সমস্যা দেখা দিয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          <Loader2 className="h-5 w-5 animate-spin text-zinc-950" />
          <span>অনুমতি যাচাই করা হচ্ছে...</span>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-50 py-20 font-sans">
        <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-sm">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-zinc-950">
            লগইন আবশ্যক
          </h2>
          <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
            কমিউনিটিতে টিউটোরিয়াল, মেশিন টেকনিক বা ডিজাইন শোকেস পোস্ট করতে অনুগ্রহ করে আগে সাইন-ইন করুন।
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/login?redirect=${encodeURIComponent("/communities/create")}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90"
            >
              <span>লগইন করুন</span>
            </Link>
            <Link
              href="/communities"
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-950"
            >
              কমিউনিটিতে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (success) {
    const isApproved = createdStatus === "APPROVED";
    return (
      <main className="min-h-screen bg-zinc-50 py-20 font-sans">
        <div className="mx-auto max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-zinc-950">
            {isApproved ? "পোস্টটি লাইভ প্রকাশিত হয়েছে! 🎉" : "আর্টিকেলটি রিভিউয়ের জন্য জমা পড়েছে! ⏳"}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
            {isApproved
              ? "আপনার পোস্টটি এখন সরাসরি EMBOBD কমিউনিটিতে সকলেই পড়তে ও শিখতে পারবে।"
              : "আপনার মূল্যবান অভিজ্ঞতা শেয়ার করার জন্য ধন্যবাদ! মডারেটর টিম রিভিউ করার সাথে সাথেই এটি কমিউনিটি ফিডে দেখা যাবে।"}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {isApproved && createdSlug ? (
              <Link
                href={`/communities/${createdSlug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-xs font-bold text-white shadow-sm hover:opacity-90"
              >
                <span>প্রকাশিত পোস্টটি দেখুন</span>
              </Link>
            ) : null}
            <Link
              href="/communities"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-xs font-bold text-zinc-900 hover:bg-zinc-100"
            >
              <span>কমিউনিটি হাব-এ ফিরুন</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isAdminOrMod = user.role === "ADMIN" || user.role === "MODERATOR";

  return (
    <main className="min-h-screen bg-zinc-50 pb-24 font-sans">
      {/* Top Header */}
      <div className="border-b border-zinc-200 bg-white py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/communities"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 transition hover:text-zinc-950"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>কমিউনিটিতে ফিরে যান</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">লেখক:</span>
            <span className="text-xs font-bold text-zinc-950">
              {user.name}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
        {/* Title Banner */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800">
              <PenSquare className="h-3.5 w-3.5" />
              <span>কমিউনিটি অথরিং স্টুডিও</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              নতুন আর্টিকেল বা ডিজাইন লিখুন ✍️
            </h1>
          </div>
        </div>

        {/* Role Notification Banner */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-xs shadow-xs">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-zinc-700" />
          <div className="text-zinc-700">
            <strong>{isAdminOrMod ? "⚡ সরাসরি প্রকাশনা:" : "🛡️ মডারেশন পলিসি:"}</strong>{" "}
            {isAdminOrMod
              ? "অ্যাডমিন বা মডারেটর রোল থাকার কারণে আপনার লেখাটি স্বয়ংক্রিয়ভাবে সরাসরি প্রকাশিত হবে।"
              : "আপনার লেখাটি রিভিউ করার জন্য মডারেশন কিউতে জমা হবে এবং যাচাই শেষে সবার জন্য উন্মুক্ত করা হবে।"}
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            {/* Post Title */}
            <div>
              <label className="block text-xs font-semibold text-zinc-800">
                আর্টিকেলের শিরোনাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="যেমন: উইলকম e4-এ ৩ডি পাফ এমব্রয়ডারি ও আন্ডারলে সেটিং মাস্টারক্লাস"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base font-bold text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
              />
            </div>

            {/* Category & Cover Image Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  ক্যাটাগরি
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 focus:border-zinc-950 focus:outline-none"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold text-zinc-800">
                  <span>কভার ছবির URL (ঐচ্ছিক)</span>
                </label>
                <div className="relative mt-2">
                  <ImageIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Cover Image Thumbnail Preview */}
            {coverImage && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="h-44 w-full object-cover"
                />
              </div>
            )}

            {/* Tags (Comma Separated) with Live Badge Pills */}
            <div className="mt-6">
              <label className="block text-xs font-semibold text-zinc-800">
                ট্যাগসমূহ (কমা দিয়ে লিখুন)
              </label>
              <div className="relative mt-2">
                <Tag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="যেমন: wilcom, digitizing, 3dpuff, tajima, sequins"
                  value={rawTags}
                  onChange={(e) => setRawTags(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              {tagsList.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-zinc-500 font-bold">প্রিভিউ:</span>
                  {tagsList.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-900"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Excerpt / Summary */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-zinc-800">
                  সংক্ষিপ্ত প্রিভিউ সারসংক্ষেপ
                </label>
                <span className="text-[11px] text-zinc-400">ঐচ্ছিক</span>
              </div>
              <textarea
                rows={2}
                placeholder="পোস্টের ১-২ লাইনের সংক্ষিপ্ত সারমর্ম যা ফিডে পাঠকদের আকৃষ্ট করবে..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
              />
            </div>

            {/* Article Content Editor */}
            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                <label className="block text-xs font-semibold text-zinc-800">
                  মূল আর্টিকেল বিবরণ <span className="text-rose-500">*</span>
                </label>

                {/* Tabs */}
                <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      activeTab === "write"
                        ? "bg-white text-zinc-950 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    লিখুন
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      activeTab === "preview"
                        ? "bg-white text-zinc-950 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-950"
                    }`}
                  >
                    প্রিভিউ
                  </button>
                </div>
              </div>

              {/* Formatting Toolbar */}
              {activeTab === "write" && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 p-2">
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n## শিরোনাম\n")}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-zinc-800 hover:bg-zinc-200"
                    title="হেডিং"
                  >
                    <Heading className="h-3.5 w-3.5" />
                    <span>হেডিং</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("**বোল্ড টেক্সট**")}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-zinc-800 hover:bg-zinc-200"
                    title="বোল্ড"
                  >
                    <Bold className="h-3.5 w-3.5" />
                    <span>বোল্ড</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n- পয়েন্ট ১\n- পয়েন্ট ২\n")}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-zinc-800 hover:bg-zinc-200"
                    title="তালিকা"
                  >
                    <List className="h-3.5 w-3.5" />
                    <span>লিস্ট</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n> গুরুত্বপূর্ণ টিপস\n")}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-zinc-800 hover:bg-zinc-200"
                    title="কোটেশন"
                  >
                    <Quote className="h-3.5 w-3.5" />
                    <span>কোট</span>
                  </button>
                </div>
              )}

              {/* Textarea or Preview View */}
              {activeTab === "write" ? (
                <textarea
                  required
                  rows={14}
                  placeholder="আপনার এমব্রয়ডারি অভিজ্ঞতা, সফটওয়্যার ট্রিকস, মেশিনের সমস্যা সমাধান বা নতুন ডিজাইন সম্পর্কে বিস্তারিত লিখুন..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white p-4 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              ) : (
                <div className="mt-2 min-h-[350px] rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                  {content.trim() ? (
                    <div className="whitespace-pre-line text-sm leading-relaxed text-zinc-800">
                      {content}
                    </div>
                  ) : (
                    <p className="text-xs italic text-zinc-400">
                      প্রিভিউ দেখার জন্য কিছু লিখুন...
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-6">
              <Link
                href="/communities"
                className="text-xs font-semibold text-zinc-600 hover:text-zinc-950"
              >
                বাতিল করুন
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-zinc-950 px-8 py-3.5 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>পোস্ট হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <PenSquare className="h-4 w-4" />
                    <span>{isAdminOrMod ? "সরাসরি প্রকাশ করুন" : "রিভিউয়ের জন্য জমা দিন"}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
