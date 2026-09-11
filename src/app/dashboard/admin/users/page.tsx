"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Shield,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  Filter,
  RefreshCw,
  Mail,
  Calendar,
  UserCheck,
} from "lucide-react";
import { userApi } from "@/services";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await userApi.getAll({
        role: roleFilter !== "ALL" ? roleFilter : undefined,
      });

      if (res.success && Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setError(res.message || "সার্ভার থেকে ব্যবহারকারীদের তালিকা লোড করা যায়নি।");
      }
    } catch (err: any) {
      console.error("Failed to load users:", err);
      setError(err?.message || "ইউজার ডেটা লোড করার সময় একটি ত্রুটি ঘটেছে।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    setMessage(null);
    setError(null);
    try {
      const res = await userApi.updateRole(userId, newRole);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        setMessage(`ব্যবহারকারীর ভূমিকা সফলভাবে ${newRole} এ পরিবর্তন করা হয়েছে! 🎉`);
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(res.message || "রোল পরিবর্তন করা সম্ভব হয়নি।");
      }
    } catch (err: any) {
      setError(err?.message || "রোল আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই ব্যবহারকারী অ্যাকাউন্টটি স্থায়ীভাবে মুছে ফেলতে চান?")) {
      return;
    }

    try {
      const res = await userApi.delete(userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setMessage("ব্যবহারকারী সফলভাবে মুছে ফেলা হয়েছে।");
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(res.message || "মুছে ফেলা যায়নি।");
      }
    } catch (err: any) {
      setError(err?.message || "মুছতে সমস্যা হয়েছে।");
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !debouncedSearch ||
      u.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      u.profile?.title?.toLowerCase().includes(debouncedSearch.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl font-sans">
      {/* Header with Hook */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
              ইউজার ম্যানেজমেন্ট ও রোল নিয়ন্ত্রণ
            </h1>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200">
              সুপার অ্যাডমিন
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-600">
            নিবন্ধিত প্রার্থী, নিয়োগকারী, মডারেটরদের তালিকা দেখুন এবং প্ল্যাটফর্ম রোল পরিবর্তন করুন।
          </p>
        </div>

        <button
          type="button"
          onClick={fetchUsers}
          className="flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-xs font-bold text-zinc-900 transition hover:bg-zinc-100 shadow-xs"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> তালিকা রিফ্রেশ করুন
        </button>
      </div>

      {/* Notifications */}
      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-semibold text-emerald-800 shadow-xs">
          <CheckCircle2 size={16} className="text-emerald-600" /> {message}
        </div>
      )}
      {error && (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2.5 text-xs font-semibold text-rose-800 shadow-xs">
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-rose-600" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={fetchUsers}
            className="underline hover:no-underline font-bold"
          >
            আবার চেষ্টা করুন
          </button>
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
            placeholder="নাম, ইমেইল অথবা পদবী দিয়ে খুঁজুন..."
            className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
          />
        </div>

        {/* Role Filter Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-100 p-1">
          {[
            { label: "সকল", value: "ALL" },
            { label: "প্রার্থী", value: "CANDIDATE" },
            { label: "নিয়োগকারী", value: "EMPLOYER" },
            { label: "মডারেটর", value: "MODERATOR" },
            { label: "অ্যাডমিন", value: "ADMIN" },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setRoleFilter(tab.value)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                roleFilter === tab.value
                  ? "bg-white text-zinc-950 shadow-xs"
                  : "text-zinc-600 hover:text-zinc-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-bold text-zinc-600">
              <tr>
                <th className="px-6 py-3.5">ব্যবহারকারীর পরিচিতি</th>
                <th className="px-6 py-3.5">সিস্টেম রোল</th>
                <th className="px-6 py-3.5">পদবী / প্রোফাইল</th>
                <th className="px-6 py-3.5">প্ল্যাটফর্ম এক্টিভিটি</th>
                <th className="px-6 py-3.5">যুক্ত হওয়ার তারিখ</th>
                <th className="px-6 py-3.5 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500">
                    <Loader2 size={22} className="mx-auto animate-spin text-zinc-950" />
                    <p className="mt-2 text-xs">ইউজার ডিরেক্টরি লোড হচ্ছে...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-zinc-500">
                    <p className="text-xs font-semibold">কোনো ব্যবহারকারী পাওয়া যায়নি।</p>
                    <button
                      type="button"
                      onClick={fetchUsers}
                      className="mt-2 text-xs font-bold text-zinc-950 underline"
                    >
                      রিলোড করুন
                    </button>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {u.image ? (
                          <img
                            src={u.image}
                            alt={u.name || "User"}
                            className="h-9 w-9 rounded-full object-cover border border-zinc-200"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-xs font-black text-white">
                            {u.name?.charAt(0) || u.email?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-zinc-950">
                            {u.name || "নাম দেওয়া হয়নি"}
                          </p>
                          <p className="text-[11px] text-zinc-500 flex items-center gap-1">
                            <Mail size={11} className="text-zinc-400" /> {u.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        disabled={updatingId === u.id}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold focus:outline-none transition ${
                          u.role === "ADMIN"
                            ? "border-amber-300 bg-amber-50 text-amber-800"
                            : u.role === "MODERATOR"
                            ? "border-purple-300 bg-purple-50 text-purple-800"
                            : u.role === "EMPLOYER"
                            ? "border-indigo-300 bg-indigo-50 text-indigo-800"
                            : "border-zinc-300 bg-zinc-50 text-zinc-700"
                        }`}
                      >
                        <option value="CANDIDATE">CANDIDATE (প্রার্থী)</option>
                        <option value="EMPLOYER">EMPLOYER (নিয়োগকারী)</option>
                        <option value="MODERATOR">MODERATOR (মডারেটর)</option>
                        <option value="ADMIN">ADMIN (অ্যাডমিন)</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-zinc-700">
                      <p className="font-semibold text-xs text-zinc-950">
                        {u.profile?.title || "—"}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        {u.profile?.location || "ঠিকানা দেওয়া হয়নি"}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-zinc-600">
                      <div className="flex flex-col gap-0.5 text-[11px]">
                        {u._count?.jobs ? (
                          <span className="font-bold text-zinc-950">
                            {u._count.jobs} টি চাকরির বিজ্ঞাপন
                          </span>
                        ) : null}
                        {u._count?.companies ? (
                          <span>{u._count.companies} টি কোম্পানি</span>
                        ) : null}
                        {!u._count?.jobs && !u._count?.companies && (
                          <span className="text-zinc-400">সাধারণ সদস্য</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-zinc-500">
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar size={12} className="text-zinc-400" />
                        {new Date(u.createdAt).toLocaleDateString("bn-BD", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(u.id)}
                        className="rounded-lg p-1.5 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 transition"
                        title="ইউজার অ্যাকাউন্ট মুছুন"
                      >
                        <Trash2 size={15} />
                      </button>
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
