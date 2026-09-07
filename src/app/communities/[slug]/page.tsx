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

          // Fetch related posts in the same category
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
          setError(res.message || "Article not found");
        }
      } catch (err: any) {
        console.error("Failed to load community post:", err);
        setError("Failed to load article. Please try again.");
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
    return `${minutes} min read`;
  };

  const formatDate = (dateString: any) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
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
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-black text-white dark:bg-white dark:text-black">
            Admin
          </span>
        );
      case "MODERATOR":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
            Moderator
          </span>
        );
      case "EMPLOYER":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            Employer
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            Digitizer
          </span>
        );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-50/60 py-16 dark:bg-black">
        <div className="mx-auto max-w-4xl px-4 animate-pulse">
          <div className="h-6 w-36 rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="mt-6 h-10 w-4/5 rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="mt-4 h-6 w-1/3 rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="mt-8 h-80 w-full rounded-2xl bg-zinc-200 dark:bg-zinc-900" />
          <div className="mt-8 space-y-3">
            <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-900" />
            <div className="h-4 w-5/6 rounded bg-zinc-200 dark:bg-zinc-900" />
            <div className="h-4 w-4/6 rounded bg-zinc-200 dark:bg-zinc-900" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-zinc-50/60 py-20 dark:bg-black">
        <div className="mx-auto max-w-lg rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
          <AlertCircle className="mx-auto h-12 w-12 text-zinc-700 dark:text-zinc-300" />
          <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
            Article Not Found
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {error || "The requested community post could not be loaded or has been removed."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/communities"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Communities</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50/50 pb-24 dark:bg-black">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-zinc-200 bg-white py-3.5 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/communities"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-700 transition hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Communities</span>
          </Link>

          {/* Share / Copy Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Share Article</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Moderation Status Banner (if not approved) */}
      {post.status !== "APPROVED" && (
        <div className="border-b border-zinc-300 bg-zinc-100 px-4 py-3 text-center text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
          <div className="mx-auto flex max-w-4xl items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              This post is currently <strong>{post.status}</strong>. Only authorized moderators and the author can preview it.
            </span>
          </div>
        </div>
      )}

      {/* Article Container */}
      <article className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-10 dark:border-zinc-800 dark:bg-zinc-950">
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md border border-zinc-300 bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
              {post.category}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.createdAt)}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <Clock className="h-3.5 w-3.5" />
              {calculateReadTime(post.content)}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200">
              <Eye className="h-3.5 w-3.5" />
              {post.views} views
            </span>
          </div>

          {/* Article Title */}
          <h1 className="mt-5 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl dark:text-white">
            {post.title}
          </h1>

          {/* Author Header */}
          <div className="mt-6 flex items-center justify-between border-y border-zinc-100 py-4 dark:border-zinc-850">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-bold text-white shadow-xs dark:bg-white dark:text-black">
                {post.author?.name?.charAt(0) || "U"}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">
                    {post.author?.name}
                  </span>
                  {getRoleBadge(post.author?.role)}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {post.author?.profile?.title || "Embroidery Professional & Contributor"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                title="Copy Link"
              >
                {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Featured Cover Image */}
          {post.coverImage && (
            <div className="mt-8 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-auto max-h-[480px] w-full object-cover"
              />
            </div>
          )}

          {/* Excerpt Callout (if available) */}
          {post.excerpt && (
            <div className="mt-8 rounded-2xl border-l-4 border-black bg-zinc-100/80 p-5 text-sm font-medium italic text-zinc-800 dark:border-white dark:bg-zinc-900 dark:text-zinc-200">
              "{post.excerpt}"
            </div>
          )}

          {/* Article Body Content */}
          <div className="mt-8 leading-relaxed text-zinc-800 dark:text-zinc-200">
            <div className="whitespace-pre-line text-base leading-8 sm:text-lg sm:leading-9">
              {post.content}
            </div>
          </div>

          {/* Tags List */}
          {Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="mt-12 border-t border-zinc-100 pt-6 dark:border-zinc-850">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-zinc-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Related Tags
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/communities?tag=${encodeURIComponent(tag)}`}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-700"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Author Box */}
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-black text-lg font-bold text-white shadow-xs dark:bg-white dark:text-black">
                {post.author?.name?.charAt(0) || "U"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                    {post.author?.name}
                  </h4>
                  {getRoleBadge(post.author?.role)}
                </div>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  {post.author?.profile?.bio ||
                    "Passionate contributor sharing expertise and designs in the Bangladesh embroidery sector."}
                </p>
                {post.author?.profile?.skills && post.author.profile.skills.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {post.author.profile.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="rounded border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
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
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
              <h3 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                More from {post.category}
              </h3>
              <Link
                href="/communities"
                className="inline-flex items-center gap-1 text-xs font-bold text-black underline-offset-4 hover:underline dark:text-white"
              >
                <span>View All</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {relatedPosts.map((rel: any) => (
                <Link
                  key={rel.id}
                  href={`/communities/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs transition hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
                >
                  <div className="h-32 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    {rel.coverImage ? (
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white dark:bg-zinc-850">
                        <BookOpen className="h-8 w-8 opacity-70" />
                      </div>
                    )}
                  </div>
                  <h4 className="mt-3 line-clamp-2 text-sm font-bold text-zinc-900 transition group-hover:text-zinc-600 dark:text-white dark:group-hover:text-zinc-300">
                    {rel.title}
                  </h4>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
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
