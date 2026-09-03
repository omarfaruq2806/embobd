"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Search,
  Trash2,
  ExternalLink,
  PlusCircle,
  CheckCircle2,
  Loader2,
  DollarSign,
  MapPin,
} from "lucide-react";
import { jobApi } from "@/services";

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Debounce search input (300ms)
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
        setMessage(`Job status updated to ${newStatus}`);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job posting?")) {
      return;
    }

    try {
      const res = await jobApi.delete(jobId);
      if (res.success) {
        setJobs((prev) => prev.filter((j) => j.id !== jobId));
        setMessage("Job deleted successfully");
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  const filteredJobs = jobs;

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
            Job Moderation & Management
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Review, publish, close, or remove embroidery job listings.
          </p>
        </div>

        <Link
          href="/jobs/post"
          className="flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:opacity-90 dark:bg-white dark:text-black"
        >
          <PlusCircle size={15} />
          Post New Job
        </Link>
      </div>

      {/* Success Notification */}
      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
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
            placeholder="Search jobs by title, company, or category..."
            className="w-full rounded-xl border border-black/15 bg-white py-2 pl-9 pr-4 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-black/15 bg-white px-3 py-2 text-xs text-zinc-700 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <option value="ALL">All Statuses</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      {/* Jobs Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/5 bg-zinc-50 text-[11px] font-semibold text-zinc-500 dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-3.5">Job Title & Company</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Type & Location</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400">
                    <Loader2 size={20} className="mx-auto animate-spin" />
                  </td>
                </tr>
              ) : filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-400">
                    No jobs found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                    <td className="px-6 py-4">
                      <p className="font-bold text-black dark:text-white">
                        {job.title}
                      </p>
                      <p className="text-[11px] text-zinc-500">
                        {job.company?.name || "Company"}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">
                      {job.category?.name}
                    </td>

                    <td className="px-6 py-4 text-zinc-500">
                      <p>{job.jobType}</p>
                      <p className="text-[10px] text-zinc-400">{job.location || "Remote"}</p>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={job.status}
                        disabled={updatingId === job.id}
                        onChange={(e) => handleStatusChange(job.id, e.target.value)}
                        className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none ${
                          job.status === "PUBLISHED"
                            ? "border-emerald-500/30 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : job.status === "CLOSED"
                            ? "border-red-500/30 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300"
                            : "border-black/10 bg-zinc-50 text-zinc-700 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
                        }`}
                      >
                        <option value="PUBLISHED">PUBLISHED</option>
                        <option value="DRAFT">DRAFT</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {job.status === "DRAFT" && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(job.id, "PUBLISHED")}
                            className="rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-emerald-700 shadow-xs"
                            title="Approve & Publish to public board"
                          >
                            Approve
                          </button>
                        )}
                        <Link
                          href={`/jobs/${job.id}`}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white"
                          title="View live job post"
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id)}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                          title="Delete job"
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
