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
  Layers,
  FileText,
  Eye,
  Info,
  Heading,
  Bold,
  List,
  Quote,
} from "lucide-react";
import { communityApi } from "@/services";

const CATEGORY_OPTIONS = [
  "Tutorial",
  "Design Showcase",
  "Machine Tech",
  "Industry News",
  "Job Tips",
  "General",
];

export default function CreateCommunityPostPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as any)?.user;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Tutorial");
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

  // Derived tags array for live preview
  const tagsList = rawTags
    .split(",")
    .map((t: any) => t.trim())
    .filter(Boolean);

  // Formatting tools
  const insertFormatting = (prefix: any, suffix: any = "") => {
    setContent((prev) => prev + `${prefix}${suffix}`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please provide a title for your article.");
      return;
    }
    if (!content.trim()) {
      setError("Article content cannot be empty.");
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
        setError(res.message || "Failed to publish community post.");
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Auth Loading State
  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50/60 dark:bg-black">
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin text-black dark:text-white" />
          <span>Checking authorization...</span>
        </div>
      </main>
    );
  }

  // Not Logged In State
  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-50/60 py-20 dark:bg-black">
        <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-md dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
            <Lock className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">
            Authentication Required
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            You must be signed in to EMBOBD to share articles, Wilcom tutorials, or showcase designs in the community.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/login?redirect=${encodeURIComponent("/communities/create")}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-bold text-white shadow-xs transition hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <span>Sign In to Continue</span>
            </Link>
            <Link
              href="/communities"
              className="text-xs font-semibold text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            >
              Back to Community Feed
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Success Confirmation Screen
  if (success) {
    const isApproved = createdStatus === "APPROVED";
    return (
      <main className="min-h-screen bg-zinc-50/60 py-20 dark:bg-black">
        <div className="mx-auto max-w-lg rounded-3xl border border-zinc-300 bg-white p-8 text-center shadow-lg dark:border-zinc-700 dark:bg-zinc-950">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <h2 className="mt-5 text-2xl font-black text-zinc-900 dark:text-white">
            {isApproved ? "Article Published!" : "Post Submitted for Review!"}
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {isApproved
              ? "Your community post is live and available for everyone in the embroidery community to read."
              : "Thank you for sharing your expertise! Your article has been submitted and will appear on the feed as soon as our moderators approve it."}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {isApproved && createdSlug ? (
              <Link
                href={`/communities/${createdSlug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <span>View Your Live Article</span>
              </Link>
            ) : null}
            <Link
              href="/communities"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-3 text-xs font-bold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
            >
              <span>Back to Community Hub</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isAdminOrMod = user.role === "ADMIN" || user.role === "MODERATOR";

  return (
    <main className="min-h-screen bg-zinc-50/50 pb-24 dark:bg-black">
      {/* Top Header */}
      <div className="border-b border-zinc-200 bg-white py-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/communities"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-700 transition hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Communities</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Author:</span>
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {user.name}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
        {/* Title Banner */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
              <PenSquare className="h-3.5 w-3.5" />
              <span>Community Authoring Studio</span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Write a Community Article
            </h1>
          </div>
        </div>

        {/* Role Notification Banner */}
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-xs dark:border-zinc-800 dark:bg-zinc-900/60">
          <Info className="h-4 w-4 shrink-0 mt-0.5 text-zinc-700 dark:text-zinc-300" />
          <div className="text-zinc-700 dark:text-zinc-300">
            <strong>{isAdminOrMod ? "⚡ Instant Publishing:" : "🛡️ Moderation Note:"}</strong>{" "}
            {isAdminOrMod
              ? "Because of your privileged role (Admin/Moderator), your post will be automatically approved and published immediately."
              : "Your article will be placed in the moderation queue for review before appearing on the public feed."}
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-rose-300 bg-rose-50 p-4 text-xs font-semibold text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
            {/* Post Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Article Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Masterclass on Wilcom 3D Puff Embroidery & Underlay Settings"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base font-bold text-zinc-900 shadow-xs transition placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white"
              />
            </div>

            {/* Category & Cover Image Grid */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 shadow-xs focus:border-black focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
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
                <label className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  <span>Cover Image URL (Optional)</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Direct Link</span>
                </label>
                <div className="relative mt-2">
                  <ImageIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 shadow-xs transition placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white"
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-zinc-500 dark:text-zinc-400">
                  ☁️ <strong>R2 Upload [Demo Mode]:</strong> Direct image upload via Cloudflare R2 coming soon. Enter image URL for now.
                </p>
              </div>
            </div>


            {/* Cover Image Thumbnail Preview */}
            {coverImage && (
              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className="h-44 w-full object-cover"
                  onError={() => {
                    /* silent fallback */
                  }}
                />
              </div>
            )}

            {/* Tags (Comma Separated) with Live Badge Pills */}
            <div className="mt-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Tags (Comma-separated)
              </label>
              <div className="relative mt-2">
                <Tag className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="e.g. wilcom, digitizing, 3dpuff, tajima, sequins"
                  value={rawTags}
                  onChange={(e) => setRawTags(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white py-3 pl-10 pr-4 text-sm text-zinc-900 shadow-xs transition placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white"
                />
              </div>

              {/* Real-time Tags Badges Preview */}
              {tagsList.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-zinc-500 font-bold">Preview:</span>
                  {tagsList.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-md border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  Short Excerpt / Preview Summary
                </label>
                <span className="text-[11px] text-zinc-400">Optional (Auto-generated if empty)</span>
              </div>
              <textarea
                rows={2}
                placeholder="A brief 1-2 sentence overview shown in article cards and search previews..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="mt-2 w-full rounded-xl border border-zinc-300 bg-white p-3.5 text-sm text-zinc-900 shadow-xs transition placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white"
              />
            </div>

            {/* Article Content Editor */}
            <div className="mt-6">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                  Full Article Content <span className="text-rose-500">*</span>
                </label>

                {/* Tabs */}
                <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
                  <button
                    type="button"
                    onClick={() => setActiveTab("write")}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      activeTab === "write"
                        ? "bg-white text-black shadow-xs dark:bg-zinc-800 dark:text-white"
                        : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    Write
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preview")}
                    className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                      activeTab === "preview"
                        ? "bg-white text-black shadow-xs dark:bg-zinc-800 dark:text-white"
                        : "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    }`}
                  >
                    Preview
                  </button>
                </div>
              </div>

              {/* Formatting Toolbar */}
              {activeTab === "write" && (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-900">
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n## Heading Title\n")}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-bold text-zinc-800 hover:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    title="Add Heading"
                  >
                    <Heading className="h-3.5 w-3.5" />
                    <span>Heading</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("**bold text**")}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-bold text-zinc-800 hover:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    title="Bold"
                  >
                    <Bold className="h-3.5 w-3.5" />
                    <span>Bold</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n- Bullet item 1\n- Bullet item 2\n")}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-bold text-zinc-800 hover:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    title="List"
                  >
                    <List className="h-3.5 w-3.5" />
                    <span>List</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormatting("\n> Important tip or quote\n")}
                    className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-bold text-zinc-800 hover:bg-zinc-200 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    title="Quote"
                  >
                    <Quote className="h-3.5 w-3.5" />
                    <span>Quote</span>
                  </button>
                </div>
              )}

              {/* Textarea or Preview View */}
              {activeTab === "write" ? (
                <textarea
                  required
                  rows={14}
                  placeholder="Share your detailed embroidery knowledge, step-by-step digitizing techniques, stitch configurations, or factory experiences..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-zinc-300 bg-white p-4 text-sm leading-relaxed text-zinc-900 shadow-xs transition placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white font-mono text-xs sm:text-sm"
                />
              ) : (
                <div className="mt-2 min-h-[350px] rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  {content.trim() ? (
                    <div className="whitespace-pre-line text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                      {content}
                    </div>
                  ) : (
                    <p className="text-xs italic text-zinc-400">
                      Nothing to preview yet. Switch to "Write" tab and type your content.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100 pt-6 dark:border-zinc-850">
              <Link
                href="/communities"
                className="text-xs font-bold text-zinc-500 transition hover:text-black dark:hover:text-white"
              >
                Cancel and discard
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-black px-8 py-3.5 text-sm font-bold text-white shadow-xs transition hover:bg-zinc-800 disabled:opacity-50 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Publishing Article...</span>
                  </>
                ) : (
                  <>
                    <PenSquare className="h-4 w-4" />
                    <span>{isAdminOrMod ? "Publish Article Now" : "Submit for Review"}</span>
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
