"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Loader2,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { communityApi } from "@/services";

export default function ModeratorCommunityPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await communityApi.getAll({
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        search: debouncedSearch || undefined,
      });

      if (res.success && Array.isArray(res.data)) {
        setPosts(res.data);
      }
    } catch (err) {
      console.error("Failed to load community posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [statusFilter, debouncedSearch]);

  const handleApprove = async (id: string) => {
    setUpdatingId(id);
    setMessage(null);
    setError(null);
    try {
      const res = await communityApi.approve(id);
      if (res.success) {
        setPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: "APPROVED" } : p))
        );
        setMessage("Post approved and published to community feed! 🎉");
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(res.message || "Failed to approve post.");
      }
    } catch (err: any) {
      setError(err?.message || "Error approving post.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt(
      "বাতিল করার কারণ লিখুন (ঐচ্ছিক):",
      "কমিউনিটি আচরণবিধি লঙ্ঘন করেছে বা অননুমোদিত বিজ্ঞাপন।"
    );
    if (reason === null) return;

    setUpdatingId(id);
    setMessage(null);
    setError(null);
    try {
      const res = await communityApi.reject(id, reason);
      if (res.success) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, status: "REJECTED", rejectionReason: reason } : p
          )
        );
        setMessage("পোস্ট বাতিল করা হয়েছে।");
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(res.message || "পোস্ট বাতিল করতে ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      setError(err?.message || "পোস্ট বাতিলের সময় সমস্যা হয়েছে।");
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = posts.filter((p) => p.status === "PENDING").length;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">
              কমিউনিটি আলোচনা ও পোস্ট মডারেশন
            </h1>
            <span className="rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-[10px] font-bold text-purple-700">
              মডারেটর স্টেশন
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            কমিউনিটি সদস্যদের শেয়ার করা স্টিচ আর্ট শোকেস, প্রশ্ন ও টিউটোরিয়াল যাচাই এবং অনুমোদন করুন।
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-800 border border-amber-200">
            <Clock size={14} /> {pendingCount}টি পোস্ট পর্যালোচনার অপেক্ষায়
          </div>
        )}
      </div>

      {/* Notifications */}
      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={16} /> {message}
        </div>
      )}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600">
          <XCircle size={16} /> {error}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="পোস্টের শিরোনাম বা ক্যাটাগরি দিয়ে খুঁজুন..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 focus:border-purple-600 focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white p-1">
          {[
            { label: "সকল", value: "ALL" },
            { label: `অপেক্ষমাণ (${pendingCount})`, value: "PENDING" },
            { label: "অনুমোদিত", value: "APPROVED" },
            { label: "বাতিলকৃত", value: "REJECTED" },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                statusFilter === tab.value
                  ? "bg-purple-600 text-white"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-semibold text-zinc-600">
              <tr>
                <th className="px-6 py-3.5">পোস্টের শিরোনাম ও টপিক</th>
                <th className="px-6 py-3.5">লেখক</th>
                <th className="px-6 py-3.5">তারিখ</th>
                <th className="px-6 py-3.5">স্ট্যাটাস</th>
                <th className="px-6 py-3.5 text-right">মডারেশন কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400">
                    <Loader2 size={20} className="mx-auto animate-spin text-purple-600" />
                    <p className="mt-2 text-xs text-zinc-500">পোস্ট তালিকা লোড হচ্ছে...</p>
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-500">
                    কোনো কমিউনিটি পোস্ট খুঁজে পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <p className="font-bold text-zinc-950 truncate">
                          {post.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">
                            {post.category || "সাধারণ"}
                          </span>
                          {post.tags && post.tags.length > 0 && (
                            <span className="text-[10px] text-zinc-400">
                              #{post.tags.slice(0, 2).join(" #")}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-zinc-600">
                      <p className="font-semibold text-zinc-950">
                        {post.author?.name || "বেনামী"}
                      </p>
                      <p className="text-[10px] text-zinc-400">{post.author?.email}</p>
                    </td>

                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(post.createdAt).toLocaleDateString("bn-BD", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          post.status === "APPROVED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : post.status === "PENDING"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {post.status === "APPROVED" ? "অনুমোদিত" : post.status === "PENDING" ? "অপেক্ষমাণ" : "বাতিলকৃত"}
                      </span>
                      {post.rejectionReason && (
                        <p className="mt-1 text-[10px] text-red-600 truncate max-w-[140px]" title={post.rejectionReason}>
                          {post.rejectionReason}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {post.status !== "APPROVED" && (
                          <button
                            type="button"
                            disabled={updatingId === post.id}
                            onClick={() => handleApprove(post.id)}
                            className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
                            title="পোস্ট অনুমোদন করুন"
                          >
                            অনুমোদন
                          </button>
                        )}
                        {post.status !== "REJECTED" && (
                          <button
                            type="button"
                            disabled={updatingId === post.id}
                            onClick={() => handleReject(post.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                            title="পোস্ট বাতিল করুন"
                          >
                            বাতিল
                          </button>
                        )}
                        <Link
                          href={`/communities/${post.slug || post.id}`}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950"
                          title="পোস্ট পড়ুন"
                        >
                          <ExternalLink size={15} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
