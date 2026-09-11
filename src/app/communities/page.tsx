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
  { name: "ALL", label: "সকল বিষয়" },
  { name: "Tutorial", label: "টিউটোরিয়াল ও ডিজিটাইজিং" },
  { name: "Design Showcase", label: "ডিজাইন শোকেস" },
  { name: "Machine Tech", label: "মেশিন ও মেকানিক্স" },
  { name: "Industry News", label: "শিল্প সংবাদ ও মার্কেট" },
  { name: "Job Tips", label: "ক্যারিয়ার ও ইন্টারভিউ টিপস" },
  { name: "General", label: "সাধারণ আলোচনা" },
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
          if ((res as any).meta) {
            setMeta((res as any).meta);
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
    return `${minutes} মিনিট পাঠ`;
  };

  // Helper: Format Date
  const formatDate = (dateString: any) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("bn-BD", {
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
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
            অ্যাডমিন
          </span>
        );
      case "MODERATOR":
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
            মডারেটর
          </span>
        );
      case "EMPLOYER":
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-100 text-indigo-800">
            নিয়োগকারী
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 text-zinc-700">
            ডিজিটাইজার
          </span>
        );
    }
  };

  const pinnedPost = posts.find((p: any) => p.isPinned);
  const regularPosts = posts.filter((p: any) => !p.isPinned || posts.indexOf(p) > 0);

  return (
    <main className="min-h-screen bg-zinc-50/60 pb-20 font-sans text-zinc-900">
      {/* HERO & SEARCH HEADER */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-14">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-zinc-800">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>এমব্রয়ডারি কমিউনিটি ও জ্ঞান ভাণ্ডার</span>
            </div>

            {/* Main Title */}
            <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              জানুন, শিখুন ও শেয়ার করুন আপনার এমব্রয়ডারি অভিজ্ঞতা
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg">
              উইলকম ডিজিটাইজিং গাইড, তাজিমা মেশিন ট্রাবলশুটিং, সুতা ও সিকোয়েন্সের কৌশল এবং দেশের শীর্ষ কারিগরদের সাথে যুক্ত হওয়ার উন্মুক্ত ফোরাম।
            </p>

            {/* Action Bar & Search */}
            <div className="mt-8 flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  placeholder="আর্টিকেল, উইলকম টিউটোরিয়াল, মেশিন টিপস খুঁজুন..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white py-3.5 pl-11 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Create Post Button */}
              <Link
                href="/communities/create"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-zinc-800 shrink-0"
              >
                <PenSquare className="h-4 w-4" />
                <span>নতুন পোস্ট লিখুন</span>
              </Link>
            </div>

            {/* Active Tag Filter Indicator */}
            {selectedTag && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-900">
                <Tag className="h-3 w-3" />
                <span>ট্যাগ ফিল্টার: <strong>#{selectedTag}</strong></span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className="ml-1 rounded-full p-0.5 hover:bg-zinc-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS BAR */}
      <section className="sticky top-16 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
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
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                      isActive
                        ? "bg-zinc-950 text-white shadow-xs"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-100 hover:text-black"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {countObj && countObj.count > 0 && (
                      <span
                        className={`ml-1.5 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                          isActive
                            ? "bg-zinc-700 text-white"
                            : "bg-zinc-100 text-zinc-600"
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
              <span className="text-xs text-zinc-400 whitespace-nowrap hidden sm:inline">সাজান:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs font-bold text-zinc-800 shadow-xs focus:border-zinc-950 focus:outline-none"
              >
                <option value="latest">সর্বশেষ পোস্ট</option>
                <option value="most_viewed">সর্বাধিক পঠিত</option>
                <option value="oldest">পুরাতন পোস্ট</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FEED & SIDEBAR */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT 8 COLS: ARTICLES FEED */}
          <div className="lg:col-span-8">
            {/* Pinned Featured Story */}
            {pinnedPost && page === 1 && !debouncedSearch && selectedCategory === "ALL" && !selectedTag && (
              <div className="mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm transition hover:shadow-md">
                <div className="relative flex flex-col md:flex-row overflow-hidden rounded-xl bg-white">
                  {/* Spotlight Banner Image */}
                  <div className="relative h-56 w-full md:h-auto md:w-2/5 overflow-hidden bg-zinc-100">
                    {pinnedPost.coverImage ? (
                      <img
                        src={pinnedPost.coverImage}
                        alt={pinnedPost.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white">
                        <BookOpen className="h-12 w-12 opacity-80" />
                      </div>
                    )}
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-zinc-950/90 px-3 py-1 text-xs font-bold text-white shadow backdrop-blur">
                      <Flame className="h-3.5 w-3.5 text-amber-400" />
                      <span>হাইলাইট পোস্ট</span>
                    </div>
                  </div>

                  {/* Spotlight Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-xs font-bold text-zinc-900">
                          {pinnedPost.category}
                        </span>
                        <span className="text-xs text-zinc-400">•</span>
                        <span className="flex items-center gap-1 text-xs text-zinc-500">
                          <Clock className="h-3 w-3" />
                          {calculateReadTime(pinnedPost.content)}
                        </span>
                        <span className="text-xs text-zinc-400">•</span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-zinc-700">
                          <Eye className="h-3 w-3" />
                          {pinnedPost.views} বার পঠিত
                        </span>
                      </div>

                      <Link href={`/communities/${pinnedPost.slug}`}>
                        <h2 className="mt-3 text-xl font-bold tracking-tight text-zinc-950 transition hover:text-zinc-600 sm:text-2xl">
                          {pinnedPost.title}
                        </h2>
                      </Link>

                      <p className="mt-2 line-clamp-3 text-sm text-zinc-600 leading-relaxed">
                        {pinnedPost.excerpt || pinnedPost.content.substring(0, 150)}
                      </p>
                    </div>

                    {/* Author & CTA */}
                    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
                          {pinnedPost.author?.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-zinc-900">
                              {pinnedPost.author?.name}
                            </span>
                            {getRoleBadge(pinnedPost.author?.role)}
                          </div>
                          <p className="text-[11px] text-zinc-500">
                            {formatDate(pinnedPost.createdAt)}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={`/communities/${pinnedPost.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
                      >
                        <span>সম্পূর্ণ পড়ুন</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 animate-pulse"
                  >
                    <div className="h-44 w-full rounded-xl bg-zinc-100" />
                    <div className="mt-4 h-4 w-24 rounded bg-zinc-100" />
                    <div className="mt-3 h-6 w-3/4 rounded bg-zinc-100" />
                  </div>
                ))}
              </div>
            ) : regularPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white py-16 px-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-900">
                  <Compass className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-zinc-900">
                  কোনো আর্টিকেল পাওয়া যায়নি
                </h3>
                <p className="mt-1 max-w-sm text-sm text-zinc-500">
                  {search || selectedTag || selectedCategory !== "ALL"
                    ? "অনুগ্রহ করে অন্য শব্দ দিয়ে খুঁজুন অথবা ফিল্টার মুছুন।"
                    : "এখনো কোনো আর্টিকেল প্রকাশিত হয়নি। আপনিই প্রথম আপনার অভিজ্ঞতা শেয়ার করুন!"}
                </p>

                <div className="mt-6 flex gap-3">
                  {(search || selectedTag || selectedCategory !== "ALL") && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedTag(null);
                        setSelectedCategory("ALL");
                      }}
                      className="rounded-xl border border-zinc-300 px-4 py-2 text-xs font-bold text-zinc-800 transition hover:bg-zinc-100"
                    >
                      ফিল্টার রিসেট করুন
                    </button>
                  )}
                  <Link
                    href="/communities/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-zinc-800"
                  >
                    <PenSquare className="h-3.5 w-3.5" />
                    <span>পোস্ট লিখুন</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {regularPosts.map((post: any) => (
                  <article
                    key={post.id}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <Link
                        href={`/communities/${post.slug}`}
                        className="relative block h-48 w-full overflow-hidden bg-zinc-100"
                      >
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-white">
                            <BookOpen className="h-10 w-10 opacity-70 transition group-hover:scale-110" />
                          </div>
                        )}
                        <span className="absolute left-3 top-3 rounded-md border border-zinc-200 bg-white/95 px-2.5 py-0.5 text-[11px] font-bold text-black shadow-xs backdrop-blur-md">
                          {post.category}
                        </span>
                      </Link>

                      {/* Content Body */}
                      <div className="p-5">
                        {/* Meta Line */}
                        <div className="flex items-center justify-between text-[11px] text-zinc-500">
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
                            <span className="flex items-center gap-1 text-zinc-700 font-semibold">
                              <Eye className="h-3 w-3" />
                              {post.views}
                            </span>
                          </div>
                        </div>

                        {/* Title */}
                        <Link href={`/communities/${post.slug}`}>
                          <h3 className="mt-2.5 line-clamp-2 text-base font-bold tracking-tight text-zinc-950 transition group-hover:text-zinc-600">
                            {post.title}
                          </h3>
                        </Link>

                        {/* Excerpt */}
                        <p className="mt-2 line-clamp-2 text-xs text-zinc-600 leading-relaxed">
                          {post.excerpt || post.content.substring(0, 100)}
                        </p>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {post.tags.slice(0, 3).map((tag: any, i: number) => (
                              <button
                                key={i}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedTag(tag);
                                }}
                                className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 hover:bg-zinc-200 transition"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Author Footer */}
                    <div className="flex items-center justify-between border-t border-zinc-100 p-5 pt-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
                          {post.author?.name?.charAt(0) || "U"}
                        </div>
                        <div className="overflow-hidden">
                          <p className="truncate text-xs font-bold text-zinc-900">
                            {post.author?.name}
                          </p>
                          <p className="text-[10px] text-zinc-500">{post.author?.role}</p>
                        </div>
                      </div>

                      <Link
                        href={`/communities/${post.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-zinc-950 hover:underline"
                      >
                        পড়ুন <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT 4 COLS: SIDEBAR */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Write Card */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
              <h3 className="text-base font-bold text-zinc-950">আপনার অভিজ্ঞতা শেয়ার করুন</h3>
              <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                আপনার তৈরি করা নতুন স্টিচিং কৌশল, উইলকম টিপস বা এমব্রয়ডারি ডিজাইন কমিউনিটির সাথে শেয়ার করুন।
              </p>
              <Link
                href="/communities/create"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-zinc-800"
              >
                <PenSquare size={14} /> নতুন পোস্ট তৈরি করুন
              </Link>
            </div>

            {/* Popular Tags Widget */}
            {popularTags.length > 0 && (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  জনপ্রিয় ট্যাগসমূহ
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {popularTags.map((tagObj: any) => (
                    <button
                      key={tagObj.tag}
                      onClick={() => setSelectedTag(tagObj.tag)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                        selectedTag === tagObj.tag
                          ? "bg-zinc-950 text-white font-bold"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                      }`}
                    >
                      #{tagObj.tag} ({tagObj.count})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Guidelines Card */}
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                কমিউনিটি নীতিমালা
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-zinc-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>সকলের সাথে শালীন ও সহযোগিতাপূর্ণ আচরণ করুন।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>অপ্রাসঙ্গিক বিজ্ঞাপন বা স্প্যামিং সম্পূর্ণ নিষিদ্ধ।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>অন্যের কাজের কপিরাইট ও মেধার সম্মান বজায় রাখুন।</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
