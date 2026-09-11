"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Tag,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Copy,
} from "lucide-react";
import { communityApi } from "@/services";

export default function CommunityPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPost() {
      if (!slug) return;
      try {
        setLoading(true);
        setError(null);
        const res = await communityApi.getBySlug(slug);

        if (res.success && res.data) {
          setPost(res.data);

          const relRes = await communityApi.getAll({
            category: res.data.category,
            limit: 3,
          });
          if (relRes.success && Array.isArray(relRes.data)) {
            setRelatedPosts(
              relRes.data.filter((p: any) => p.id !== res.data.id).slice(0, 3)
            );
          }
        } else {
          setError(res.message || "পোস্টটি খুঁজে পাওয়া যায়নি");
        }
      } catch (err: any) {
        console.error("Failed to load community post:", err);
        setError("পোস্ট লোড করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const calculateReadTime = (content: any) => {
    const wordCount = content ? String(content).trim().split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    return `${minutes} মিনিট পড়ার সময়`;
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("bn-BD", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getRoleBadge = (role: any) => {
    switch (role) {
      case "ADMIN":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            অ্যাডমিন
          </span>
        );
      case "MODERATOR":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
            মডারেটর
          </span>
        );
      case "EMPLOYER":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-50 text-indigo-800 border border-indigo-200">
            নিয়োগকারী
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
            কারিগর / ডিজিটাইজার
          </span>
        );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50 py-16 font-sans">
        <div className="mx-auto max-w-4xl px-4 animate-pulse">
          <div className="h-6 w-36 rounded bg-zinc-200" />
          <div className="mt-6 h-10 w-4/5 rounded bg-zinc-200" />
          <div className="mt-4 h-6 w-1/3 rounded bg-zinc-200" />
          <div className="mt-8 h-80 w-full rounded-2xl bg-zinc-200" />
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-zinc-50 py-20 font-sans">
        <div className="mx-auto max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto h-12 w-12 text-zinc-400" />
          <h2 className="mt-4 text-xl font-bold text-zinc-950">
            আর্টিকেলটি পাওয়া যায়নি
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            {error || "অনুরোধকৃত কমিউনিটি পোস্টটি বর্তমানে দৃশ্যমান নেই বা মুছে ফেলা হয়েছে।"}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/communities"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-zinc-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>কমিউনিটিতে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 pb-24 font-sans">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-zinc-200 bg-white py-3.5">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/communities"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 transition hover:text-zinc-950"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>কমিউনিটিতে ফিরে যান</span>
          </Link>

          {/* Share / Copy Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-bold text-zinc-800 transition hover:bg-zinc-100"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>লিংক কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>শেয়ার করুন</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Moderation Status Banner (if not approved) */}
      {post.status !== "APPROVED" && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-xs font-semibold text-amber-900">
          <div className="mx-auto flex max-w-4xl items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              এই পোস্টটি বর্তমানে <strong>{post.status}</strong> অবস্থায় রয়েছে। অনুমোদন পাওয়ার পর সকলের জন্য প্রকাশিত হবে।
            </span>
          </div>
        </div>
      )}

      {/* Article Container */}
      <article className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-900">
              {post.category}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.createdAt)}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500">
              <Clock className="h-3.5 w-3.5" />
              {calculateReadTime(post.content)}
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700">
              <Eye className="h-3.5 w-3.5" />
              {post.views} বার দেখা হয়েছে
            </span>
          </div>

          {/* Article Title */}
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          {/* Author Header */}
          <div className="mt-6 flex items-center justify-between border-y border-zinc-100 py-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-black text-white shadow-sm">
                {post.author?.name?.charAt(0) || "U"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-950">
                    {post.author?.name}
                  </span>
                  {getRoleBadge(post.author?.role)}
                </div>
                <p className="text-xs text-zinc-500">
                  {post.author?.profile?.title || "এমব্রয়ডারি পেশাদার ও কন্ট্রিবিউটর"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100"
                title="লিংক কপি করুন"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Featured Cover Image */}
          {post.coverImage && (
            <div className="mt-8 overflow-hidden rounded-2xl bg-zinc-100">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-auto max-h-[480px] w-full object-cover"
              />
            </div>
          )}

          {/* Excerpt Callout */}
          {post.excerpt && (
            <div className="mt-8 rounded-2xl border-l-4 border-zinc-950 bg-zinc-50 p-5 text-sm font-medium italic text-zinc-800">
              "{post.excerpt}"
            </div>
          )}

          {/* Article Body Content */}
          <div className="mt-8 leading-relaxed text-zinc-800">
            <div className="whitespace-pre-line text-base leading-8 sm:text-lg sm:leading-9">
              {post.content}
            </div>
          </div>

          {/* Tags List */}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mt-12 border-t border-zinc-100 pt-6">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  সম্পর্কিত বিষয়সমূহ
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/communities?tag=${encodeURIComponent(tag)}`}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author Box */}
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 text-lg font-bold text-white shadow-sm">
                {post.author?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-zinc-950">
                    {post.author?.name}
                  </h4>
                  {getRoleBadge(post.author?.role)}
                </div>
                <p className="mt-1 text-xs text-zinc-600">
                  {post.author?.profile?.bio ||
                    "বাংলাদেশের টেক্সটাইল ও এমব্রয়ডারি সেক্টরে অভিজ্ঞতা ও ডিজাইন শেয়ারিংয়ের একজন সক্রিয় সদস্য।"}
                </p>
                {post.author?.profile?.skills && post.author.profile.skills.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {post.author.profile.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950">
                {post.category} ক্যাটাগরির আরও লেখা
              </h3>
              <Link
                href="/communities"
                className="inline-flex items-center gap-1 text-xs font-bold text-zinc-950 underline-offset-4 hover:underline"
              >
                <span>সবগুলো দেখুন</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedPosts.map((rel: any) => (
                <Link
                  key={rel.id}
                  href={`/communities/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-zinc-400 hover:shadow-md"
                >
                  <div className="h-32 w-full overflow-hidden rounded-xl bg-zinc-100">
                    {rel.coverImage ? (
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white">
                        <BookOpen className="h-8 w-8 opacity-70" />
                      </div>
                    )}
                  </div>
                  <h4 className="mt-3 line-clamp-2 text-sm font-bold text-zinc-950 transition group-hover:text-zinc-700">
                    {rel.title}
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>{formatDate(rel.createdAt)}</span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {rel.views}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
