"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  PenSquare,
  Eye,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  TrendingUp,
  Layers,
  Flame,
  CheckCircle2,
  X,
  Compass,
  BookOpen,
} from "lucide-react";
import { communityApi } from "@/services";

const CATEGORY_PRESETS = [
  { name: "ALL", label: "All Topics" },
  { name: "Tutorial", label: "Tutorials & Digitizing" },
  { name: "Design Showcase", label: "Design Showcase" },
  { name: "Machine Tech", label: "Machine & Mechanics" },
  { name: "Industry News", label: "Industry & Market" },
  { name: "Job Tips", label: "Career & Job Tips" },
  { name: "General", label: "General Discussion" },
];

export default function CommunitiesPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [popularTags, setPopularTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState<any>(null);
  const [sortBy, setSortBy] = useState("latest");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>({ total: 0, totalPages: 1 });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch Categories & Popular Tags on mount
  useEffect(() => {
    async function fetchMeta() {
      try {
        const [catRes, tagRes] = await Promise.all([
          communityApi.getCategories(),
          communityApi.getTags(),
        ]);
        if (catRes.success && Array.isArray(catRes.data)) {
          setCategories(catRes.data);
        }
        if (tagRes.success && Array.isArray(tagRes.data)) {
          setPopularTags(tagRes.data);
        }
      } catch (err) {
        console.error("Failed to load community meta:", err);
      }
    }
    fetchMeta();
  }, []);

  // Fetch Posts whenever filters change
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await communityApi.getAll({
          status: "APPROVED",
          category: selectedCategory !== "ALL" ? selectedCategory : undefined,
          tag: selectedTag || undefined,
          search: debouncedSearch || undefined,
          sortBy,
          page,
          limit: 9,
        });

        if (res.success && Array.isArray(res.data)) {
          setPosts(res.data);
          if (res.meta) {
            setMeta(res.meta);
          }
        }
      } catch (err) {
        console.error("Failed to fetch community posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [selectedCategory, selectedTag, debouncedSearch, sortBy, page]);

  // Helper: Estimated Read Time
  const calculateReadTime = (content: any) => {
    const wordCount = content ? String(content).trim().split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(wordCount / 180));
    return `${minutes} min read`;
  };

  // Helper: Format Date
  const formatDate = (dateString: any) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
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
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-black text-white dark:bg-white dark:text-black">
            Admin
          </span>
        );
      case "MODERATOR":
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border border-zinc-300 bg-zinc-100 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
            Mod
          </span>
        );
      case "EMPLOYER":
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            Employer
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            Digitizer
          </span>
        );
    }
  };

  const pinnedPost = posts.find((p: any) => p.isPinned);
  const regularPosts = posts.filter((p: any) => !p.isPinned || posts.indexOf(p) > 0);

  return (
    <main className="min-h-screen bg-zinc-50/70 pb-20 dark:bg-black">
      {/* ========================================================================= */}
      {/* 🌟 HERO & SEARCH HEADER (Black & White Aesthetic) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-14 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-100/80 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              <Sparkles className="h-3.5 w-3.5 text-black dark:text-white" />
              <span>Embroidery Community & Knowledge Hub</span>
            </div>

            {/* Main Title */}
            <h1 className="mt-4 text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl dark:text-white">
              Discover, Learn & Share in the Embroidery Universe
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
              Tutorials on Wilcom & digitizing, Tajima machine troubleshooting, stitches & sequins tricks, and masterclass insights shared by Bangladesh’s top professionals.
            </p>

            {/* Action Bar & Search */}
            <div className="mt-8 flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search articles, Wilcom tutorials, machine tips, keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white py-3.5 pl-11 pr-10 text-sm text-zinc-900 shadow-xs transition placeholder:text-zinc-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-white dark:focus:ring-white"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Create Post Button */}
              <Link
                href="/communities/create"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                <PenSquare className="h-4 w-4" />
                <span>Write an Article</span>
              </Link>
            </div>

            {/* Active Tag Filter Indicator */}
            {selectedTag && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                <Tag className="h-3 w-3" />
                <span>Filtered by tag: <strong>#{selectedTag}</strong></span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className="ml-1 rounded-full p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🏷️ CATEGORY PILLS BAR (B&W Minimalist) */}
      {/* ========================================================================= */}
      <section className="sticky top-16 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 overflow-x-auto py-3 no-scrollbar">
            <div className="flex items-center gap-2">
              {CATEGORY_PRESETS.map((cat) => {
                const isActive = selectedCategory === cat.name;
                const countObj = categories.find(
                  (c) => c.name.toLowerCase() === cat.name.toLowerCase()
                );
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setPage(1);
                    }}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-black text-white shadow-xs dark:bg-white dark:text-black"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 hover:text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-white"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {countObj && countObj.count > 0 && (
                      <span
                        className={`ml-1.5 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                          isActive
                            ? "bg-zinc-700 text-white dark:bg-zinc-300 dark:text-black"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {countObj.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Sort Control */}
            <div className="flex items-center gap-2 pl-4">
              <span className="text-xs text-zinc-400 whitespace-nowrap hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-zinc-800 shadow-xs focus:border-black focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:focus:border-white"
              >
                <option value="latest">Latest First</option>
                <option value="most_viewed">Most Viewed</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📰 MAIN FEED & SIDEBAR */}
      {/* ========================================================================= */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ======================================================= */}
          {/* LEFT 8 COLS: ARTICLES FEED */}
          {/* ======================================================= */}
          <div className="lg:col-span-8">
            {/* Pinned Featured Story (if available on page 1) */}
            {pinnedPost && page === 1 && !debouncedSearch && selectedCategory === "ALL" && !selectedTag && (
              <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-300 bg-white p-1 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
                <div className="relative flex flex-col md:flex-row overflow-hidden rounded-xl bg-white dark:bg-zinc-950">
                  {/* Spotlight Banner Image */}
                  <div className="relative h-56 w-full md:h-auto md:w-2/5 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    {pinnedPost.coverImage ? (
                      <img
                        src={pinnedPost.coverImage}
                        alt={pinnedPost.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white dark:bg-zinc-800">
                        <BookOpen className="h-12 w-12 opacity-80" />
                      </div>
                    )}
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/90 px-3 py-1 text-xs font-bold text-white shadow backdrop-blur dark:bg-white/90 dark:text-black">
                      <Flame className="h-3.5 w-3.5 text-amber-400" />
                      <span>Featured Article</span>
                    </div>
                  </div>

                  {/* Spotlight Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                          {pinnedPost.category}
                        </span>
                        <span className="text-xs text-zinc-400">•</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                          <Clock className="h-3 w-3" />
                          {calculateReadTime(pinnedPost.content)}
                        </span>
                        <span className="text-xs text-zinc-400">•</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          <Eye className="h-3 w-3" />
                          {pinnedPost.views} views
                        </span>
                      </div>

                      <Link href={`/communities/${pinnedPost.slug}`}>
                        <h2 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 transition hover:text-zinc-600 sm:text-2xl dark:text-white dark:hover:text-zinc-300">
                          {pinnedPost.title}
                        </h2>
                      </Link>

                      <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
                        {pinnedPost.excerpt || pinnedPost.content.substring(0, 150)}
                      </p>
                    </div>

                    {/* Author & CTA */}
                    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-850">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-white dark:text-black">
                          {pinnedPost.author?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white">
                              {pinnedPost.author?.name}
                            </span>
                            {getRoleBadge(pinnedPost.author?.role)}
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {formatDate(pinnedPost.createdAt)}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/communities/${pinnedPost.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-black underline-offset-4 hover:underline dark:text-white"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid / State */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs animate-pulse dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div className="h-44 w-full rounded-xl bg-zinc-200 dark:bg-zinc-900" />
                    <div className="mt-4 h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-900" />
                    <div className="mt-3 h-6 w-3/4 rounded bg-zinc-200 dark:bg-zinc-900" />
                    <div className="mt-2 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-900" />
                    <div className="mt-6 flex items-center gap-3 pt-4">
                      <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-900" />
                      <div className="h-4 w-28 rounded bg-zinc-200 dark:bg-zinc-900" />
                    </div>
                  </div>
                ))}
              </div>
            ) : regularPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-16 px-4 text-center dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
                  <Compass className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">
                  No articles found
                </h3>
                <p className="mt-1 max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
                  {search || selectedTag || selectedCategory !== "ALL"
                    ? "Try adjusting your search criteria or clear the filters."
                    : "No community articles published yet. Be the first to share your embroidery expertise!"}
                </p>

                <div className="mt-6 flex gap-3">
                  {(search || selectedTag || selectedCategory !== "ALL") && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedTag(null);
                        setSelectedCategory("ALL");
                      }}
                      className="rounded-xl border border-zinc-300 px-4 py-2 text-xs font-bold text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                    >
                      Clear All Filters
                    </button>
                  )}
                  <Link
                    href="/communities/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    <PenSquare className="h-3.5 w-3.5" />
                    <span>Create Post</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {regularPosts.map((post: any) => (
                  <article
                    key={post.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <Link
                        href={`/communities/${post.slug}`}
                        className="relative block h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900"
                      >
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white dark:bg-zinc-850">
                            <BookOpen className="h-10 w-10 opacity-70 transition group-hover:scale-110" />
                          </div>
                        )}
                        <span className="absolute left-3 top-3 rounded-md border border-zinc-300/80 bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-black shadow-xs backdrop-blur-md dark:border-zinc-700 dark:bg-black/90 dark:text-white">
                          {post.category}
                        </span>
                      </Link>

                      {/* Content Body */}
                      <div className="p-5">
                        {/* Meta Line */}
                        <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.createdAt)}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {calculateReadTime(post.content)}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-zinc-700 font-semibold dark:text-zinc-300">
                              <Eye className="h-3 w-3" />
                              {post.views}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <Link href={`/communities/${post.slug}`}>
                          <h3 className="mt-2.5 line-clamp-2 text-base font-bold tracking-tight text-zinc-900 transition group-hover:text-zinc-600 dark:text-white dark:group-hover:text-zinc-300">
                            {post.title}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {post.excerpt || post.content.substring(0, 120)}
                        </p>

                        {/* Tags Badges */}
                        {Array.isArray(post.tags) && post.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 3).map((t: string) => (
                              <button
                                key={t}
                                onClick={() => setSelectedTag(t)}
                                className={`rounded-md px-2 py-0.5 text-[10px] font-semibold transition ${
                                  selectedTag === t
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                                }`}
                              >
                                #{t}
                              </button>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-[10px] text-zinc-400 self-center">
                                +{post.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Author & Footer Line */}
                    <div className="border-t border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-850 dark:bg-zinc-900/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                            {post.author?.name?.charAt(0) || "U"}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">
                              {post.author?.name}
                            </span>
                            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                              {post.author?.profile?.title || "Community Member"}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/communities/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-black transition group-hover:translate-x-0.5 dark:text-white"
                        >
                          <span>Read</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {meta.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-xs font-bold text-zinc-800 shadow-xs transition disabled:opacity-40 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1 px-2 text-xs text-zinc-500">
                  <span>Page</span>
                  <strong className="text-zinc-900 dark:text-white">{page}</strong>
                  <span>of</span>
                  <strong>{meta.totalPages}</strong>
                </div>
                <button
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-xs font-bold text-zinc-800 shadow-xs transition disabled:opacity-40 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* ======================================================= */}
          {/* RIGHT 4 COLS: SIDEBAR & TRENDS (B&W Minimalist) */}
          {/* ======================================================= */}
          <aside className="space-y-6 lg:col-span-4">
            {/* ✍️ CTA CARD: SHARE YOUR EXPERTISE */}
            <div className="rounded-2xl border border-zinc-300 bg-black p-6 text-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="inline-flex rounded-lg border border-zinc-700 bg-zinc-800 p-2.5">
                <PenSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-white">
                Got an Embroidery Tip or Design?
              </h3>
              <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed">
                Share your Wilcom tutorials, machine maintenance solutions, or design collections with thousands of factory owners and punchers across Bangladesh.
              </p>
              <Link
                href="/communities/create"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 px-4 text-xs font-bold text-black shadow-xs transition hover:bg-zinc-200 active:scale-98"
              >
                <span>Publish Your First Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* 🏷️ POPULAR EMBROIDERY TOPICS */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 dark:border-zinc-850">
                <Layers className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Topics & Categories
                </h4>
              </div>
              <div className="mt-3 space-y-1">
                {CATEGORY_PRESETS.slice(1).map((cat) => {
                  const countObj = categories.find(
                    (c) => c.name.toLowerCase() === cat.name.toLowerCase()
                  );
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => {
                        setSelectedCategory(isSelected ? "ALL" : cat.name);
                        setPage(1);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        isSelected
                          ? "bg-black text-white dark:bg-white dark:text-black"
                          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          isSelected
                            ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-black"
                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-850 dark:text-zinc-400"
                        }`}
                      >
                        {countObj?.count || 0}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* #️⃣ TRENDING TAGS CLOUD */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-zinc-850">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-zinc-900 dark:text-zinc-100" />
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                    Trending Tags
                  </h4>
                </div>
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-[11px] font-bold text-black underline dark:text-white"
                  >
                    Reset Tag
                  </button>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {popularTags.length > 0 ? (
                  popularTags.map(({ tag, count }: any) => {
                    const isSelected = selectedTag === tag;
                    return (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(isSelected ? null : tag)}
                        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold transition ${
                          isSelected
                            ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                            : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <span>#{tag}</span>
                        <span
                          className={`text-[10px] font-bold ${
                            isSelected ? "text-zinc-300 dark:text-zinc-700" : "text-zinc-400"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  ["wilcom", "digitizing", "tajima", "3dpuff", "sequins", "embroidery", "garments"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        className={`rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300`}
                      >
                        #{tag}
                      </button>
                    )
                  )
                )}
              </div>
            </div>

            {/* 🛡️ COMMUNITY GUIDELINES WIDGET */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Community Standards
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                  <span>Share authentic embroidery knowledge & techniques.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                  <span>Credit design sources & original punchers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                  <span>Submissions are reviewed by moderators for quality.</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
