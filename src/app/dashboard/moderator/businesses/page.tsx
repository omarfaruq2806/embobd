"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Clock,
  MapPin,
  Phone,
} from "lucide-react";
import { businessApi } from "@/services";

export default function ModeratorBusinessesPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
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

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const res = await businessApi.getAll({
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        search: debouncedSearch || undefined,
      });

      if (res.success && Array.isArray(res.data)) {
        setBusinesses(res.data);
      }
    } catch (err) {
      console.error("Failed to load businesses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [statusFilter, debouncedSearch]);

  const handleApprove = async (id: string) => {
    setUpdatingId(id);
    setMessage(null);
    setError(null);
    try {
      const res = await businessApi.approve(id);
      if (res.success) {
        setBusinesses((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: "APPROVED", isVerified: true } : b))
        );
        setMessage("Business listing verified & approved! 🎉");
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(res.message || "Failed to approve business.");
      }
    } catch (err: any) {
      setError(err?.message || "Error approving business.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("বাতিল করার কারণ লিখুন (ঐচ্ছিক):", "অসম্পূর্ণ ঠিকানা বা অপরীক্ষিত ফোন নম্বর");
    if (reason === null) return;

    setUpdatingId(id);
    setMessage(null);
    setError(null);
    try {
      const res = await businessApi.reject(id, reason);
      if (res.success) {
        setBusinesses((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: "REJECTED", rejectionReason: reason } : b))
        );
        setMessage("ব্যবসা বাতিল করা হয়েছে।");
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(res.message || "বাতিল করতে ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      setError(err?.message || "ব্যবসা বাতিলের সময় সমস্যা হয়েছে।");
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = businesses.filter((b) => b.status === "PENDING").length;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">
              ব্যবসা ডিরেক্টরি যাচাই ও অনুমোদন
            </h1>
            <span className="rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-[10px] font-bold text-purple-700">
              মডারেটর স্টেশন
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            দাখিলকৃত এমব্রয়ডারি শপ, কারখানা ও মেশিনারিজ ডিলারদের প্রোফাইল যাচাই করে ডিরেক্টরিতে অন্তর্ভুক্ত করুন।
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-800 border border-amber-200">
            <Clock size={14} /> {pendingCount}টি ব্যবসার আবেদন অপেক্ষমাণ
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
            placeholder="ব্যবসার নাম, জেলা বা ফোন নম্বর দিয়ে খুঁজুন..."
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

      {/* Businesses Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-semibold text-zinc-600">
              <tr>
                <th className="px-6 py-3.5">ব্যবসা ও ক্যাটাগরি</th>
                <th className="px-6 py-3.5">যোগাযোগ ও জেলা</th>
                <th className="px-6 py-3.5">দাখিলকারী ইউজার</th>
                <th className="px-6 py-3.5">ভেরিফিকেশন স্ট্যাটাস</th>
                <th className="px-6 py-3.5 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400">
                    <Loader2 size={20} className="mx-auto animate-spin text-purple-600" />
                    <p className="mt-2 text-xs text-zinc-500">ব্যবসার তালিকা লোড হচ্ছে...</p>
                  </td>
                </tr>
              ) : businesses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-500">
                    কোনো ব্যবসার তথ্য খুঁজে পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                businesses.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {b.logo ? (
                          <img
                            src={b.logo}
                            alt={b.name}
                            className="h-9 w-9 rounded-xl object-cover border border-zinc-200"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-xs font-bold text-white">
                            {b.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-zinc-950 flex items-center gap-1.5">
                            {b.name}
                            {b.isVerified && (
                              <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
                            )}
                          </p>
                          <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600">
                            {b.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-zinc-600">
                      <p className="font-medium text-zinc-950">{b.phone}</p>
                      <p className="text-[11px] text-zinc-500">{b.district}</p>
                    </td>

                    <td className="px-6 py-4 text-zinc-600">
                      <p className="font-medium text-zinc-800">
                        {b.submittedUser?.name || "সরাসরি দাখিল"}
                      </p>
                      <span className="text-[10px] text-zinc-400 uppercase">
                        উৎস: {b.source}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          b.status === "APPROVED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            : b.status === "PENDING"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {b.status === "APPROVED" ? "অনুমোদিত" : b.status === "PENDING" ? "অপেক্ষমাণ" : "বাতিলকৃত"}
                      </span>
                      {b.rejectionReason && (
                        <p className="mt-1 text-[10px] text-red-600 truncate max-w-[140px]" title={b.rejectionReason}>
                          কারণ: {b.rejectionReason}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status !== "APPROVED" && (
                          <button
                            type="button"
                            disabled={updatingId === b.id}
                            onClick={() => handleApprove(b.id)}
                            className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
                            title="অনুমোদন ও ভেরিফাই করুন"
                          >
                            অনুমোদন
                          </button>
                        )}

                        {b.status !== "REJECTED" && (
                          <button
                            type="button"
                            disabled={updatingId === b.id}
                            onClick={() => handleReject(b.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                            title="আবেদন বাতিল করুন"
                          >
                            বাতিল
                          </button>
                        )}

                        <Link
                          href={`/businesses/${b.slug}`}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950"
                          title="লাইভ প্রোফাইল দেখুন"
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
