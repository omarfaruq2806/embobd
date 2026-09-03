"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  Search,
  CheckCircle2,
  XCircle,
  Trash2,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  MapPin,
  Phone,
  Filter,
  PlusCircle,
} from "lucide-react";
import { businessApi } from "@/services";

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Debounce search input (300ms)
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
        setMessage("Business approved and verified successfully! 🎉");
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
    const reason = prompt("Enter the reason for rejection (optional):", "Information incomplete or duplicate");
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
        setMessage("Business rejected.");
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(res.message || "Failed to reject business.");
      }
    } catch (err: any) {
      setError(err?.message || "Error rejecting business.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this business?")) return;

    try {
      const res = await businessApi.delete(id);
      if (res.success) {
        setBusinesses((prev) => prev.filter((b) => b.id !== id));
        setMessage("Business deleted successfully.");
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete business:", err);
    }
  };

  const filtered = businesses;

  const pendingCount = businesses.filter((b) => b.status === "PENDING").length;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
            Business Directory Moderation
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Review user-submitted embroidery shops, factories, dealerships, and verify authentic businesses.
          </p>
        </div>

        <Link
          href="/businesses/create"
          className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          <PlusCircle size={15} /> Add Business
        </Link>
      </div>

      {/* Notifications */}
      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircle2 size={16} /> {message}
        </div>
      )}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <XCircle size={16} /> {error}
        </div>
      )}

      {/* Search & Status Filter Tabs */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search business by name, district, or phone..."
            className="w-full rounded-xl border border-black/15 bg-white py-2 pl-9 pr-4 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 rounded-xl border border-black/10 bg-white p-1 dark:border-white/10 dark:bg-zinc-900">
          {[
            { label: "All", value: "ALL" },
            { label: `Pending (${pendingCount})`, value: "PENDING" },
            { label: "Approved", value: "APPROVED" },
            { label: "Rejected", value: "REJECTED" },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatusFilter(tab.value)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                statusFilter === tab.value
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Businesses Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/5 bg-zinc-50 text-[11px] font-semibold text-zinc-500 dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-3.5">Business & Category</th>
                <th className="px-6 py-3.5">Contact & Location</th>
                <th className="px-6 py-3.5">Submitted By</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400">
                    <Loader2 size={20} className="mx-auto animate-spin" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-400">
                    No businesses found matching your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                    {/* Business Name & Type */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {b.logo ? (
                          <img
                            src={b.logo}
                            alt={b.name}
                            className="h-9 w-9 rounded-xl object-cover border border-black/10 dark:border-white/10"
                          />
                        ) : (
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                            {b.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-black dark:text-white flex items-center gap-1.5">
                            {b.name}
                            {b.isVerified && (
                              <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                            )}
                          </p>
                          <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                            {b.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Contact & District */}
                    <td className="px-6 py-4 text-zinc-500">
                      <p className="font-medium text-black dark:text-white">{b.phone}</p>
                      <p className="text-[11px] text-zinc-400">{b.district}</p>
                    </td>

                    {/* Submitter */}
                    <td className="px-6 py-4 text-zinc-500">
                      <p className="font-medium text-zinc-700 dark:text-zinc-300">
                        {b.submittedUser?.name || "Direct Submission"}
                      </p>
                      <span className="text-[10px] text-zinc-400 uppercase">
                        Source: {b.source}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          b.status === "APPROVED"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : b.status === "PENDING"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                            : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                        }`}
                      >
                        {b.status}
                      </span>
                      {b.rejectionReason && (
                        <p className="mt-1 text-[10px] text-red-500 truncate max-w-[140px]" title={b.rejectionReason}>
                          Reason: {b.rejectionReason}
                        </p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status !== "APPROVED" && (
                          <button
                            type="button"
                            disabled={updatingId === b.id}
                            onClick={() => handleApprove(b.id)}
                            className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
                            title="Approve & Verify Business"
                          >
                            Approve
                          </button>
                        )}

                        {b.status !== "REJECTED" && (
                          <button
                            type="button"
                            disabled={updatingId === b.id}
                            onClick={() => handleReject(b.id)}
                            className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 hover:bg-red-100 dark:border-red-800/40 dark:bg-red-950/40 dark:text-red-300 disabled:opacity-50"
                            title="Reject Submission"
                          >
                            Reject
                          </button>
                        )}

                        <Link
                          href={`/businesses/${b.slug}`}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
                          title="View live profile"
                        >
                          <ExternalLink size={15} />
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(b.id)}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                          title="Delete business record"
                        >
                          <Trash2 size={15} />
                        </button>
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
