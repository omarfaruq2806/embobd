"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  ExternalLink,
  CheckCircle2,
  Loader2,
  Clock,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { jobApi } from "@/services";

export default function ModeratorJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await jobApi.getAll({
        status: statusFilter !== "ALL" ? statusFilter : undefined,
        search: debouncedSearch || undefined,
      });

      if (res.success && Array.isArray(res.data)) {
        setJobs(res.data);
      }
    } catch (err) {
      console.error("Failed to load jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, debouncedSearch]);

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    setUpdatingId(jobId);
    setMessage(null);
    try {
      const res = await jobApi.update(jobId, { status: newStatus });
      if (res.success) {
        setJobs((prev) =>
          prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
        );
        setMessage(`বিজ্ঞপ্তির স্ট্যাটাস সফলভাবে পরিবর্তিত হয়েছে: ${newStatus}`);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const draftCount = jobs.filter((j) => j.status === "DRAFT").length;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">
              চাকরির বিজ্ঞপ্তি মডারেশন ও অনুমোদন
            </h1>
            <span className="rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-[10px] font-bold text-purple-700">
              মডারেটর স্টেশন
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            নিয়োগদাতাদের চাকরির বিজ্ঞপ্তি যাচাই করুন এবং লাইভ প্ল্যাটফর্মে প্রকাশের জন্য অনুমোদন দিন।
          </p>
        </div>

        {draftCount > 0 && (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-800 border border-amber-200">
            <Clock size={14} /> {draftCount}টি ড্রাফট বিজ্ঞপ্তি অনুমোদনের অপেক্ষায়
          </div>
        )}
      </div>

      {/* Success Notification */}
      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={16} /> {message}
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
            placeholder="বিজ্ঞপ্তির শিরোনাম, কোম্পানি বা ক্যাটাগরি দিয়ে খুঁজুন..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 focus:border-purple-600 focus:outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white p-1">
          {[
            { label: "সকল", value: "ALL" },
            { label: `ড্রাফট (${draftCount})`, value: "DRAFT" },
            { label: "প্রকাশিত", value: "PUBLISHED" },
            { label: "বন্ধ", value: "CLOSED" },
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

      {/* Jobs Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-semibold text-zinc-600">
              <tr>
                <th className="px-6 py-3.5">বিজ্ঞপ্তির শিরোনাম ও কোম্পানি</th>
                <th className="px-6 py-3.5">ক্যাটাগরি</th>
                <th className="px-6 py-3.5">ধরণ ও অবস্থান</th>
                <th className="px-6 py-3.5">বর্তমান স্ট্যাটাস</th>
                <th className="px-6 py-3.5 text-right">মডারেশন কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400">
                    <Loader2 size={20} className="mx-auto animate-spin text-purple-600" />
                    <p className="mt-2 text-xs text-zinc-500">বিজ্ঞপ্তি তালিকা লোড হচ্ছে...</p>
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-500">
                    কোনো চাকরির বিজ্ঞপ্তি খুঁজে পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-zinc-950">
                        {job.title}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {job.company?.name || "প্রতিষ্ঠান"}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-zinc-700">
                      {job.category?.name || "এমব্রয়ডারি"}
                    </td>

                    <td className="px-6 py-4 text-zinc-600">
                      <p className="font-medium">{job.jobType}</p>
                      <p className="text-[10px] text-zinc-400">{job.location || "রিমোট / অন-সাইট"}</p>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={job.status}
                        disabled={updatingId === job.id}
                        onChange={(e) => handleStatusChange(job.id, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-bold focus:outline-none ${
                          job.status === "PUBLISHED"
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : job.status === "CLOSED"
                            ? "border-red-300 bg-red-50 text-red-800"
                            : "border-amber-300 bg-amber-50 text-amber-800"
                        }`}
                      >
                        <option value="PUBLISHED">লাইভ (PUBLISHED)</option>
                        <option value="DRAFT">ড্রাফট (DRAFT)</option>
                        <option value="CLOSED">বন্ধ (CLOSED)</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {job.status === "DRAFT" && (
                          <button
                            type="button"
                            disabled={updatingId === job.id}
                            onClick={() => handleStatusChange(job.id, "PUBLISHED")}
                            className="rounded-lg bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50"
                            title="বিজ্ঞপ্তি অনুমোদন করুন ও লাইভ বোর্ডে প্রকাশ করুন"
                          >
                            অনুমোদন ও প্রকাশ
                          </button>
                        )}
                        <Link
                          href={`/jobs/${job.id}`}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-950"
                          title="লাইভ বিজ্ঞপ্তি দেখুন"
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
