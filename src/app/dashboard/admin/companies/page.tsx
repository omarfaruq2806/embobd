"use client";

import { useState, useEffect } from "react";
import {
  Building,
  Search,
  ExternalLink,
  ShieldCheck,
  Loader2,
  Briefcase,
} from "lucide-react";
import { companyApi, Company } from "@/services";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        setLoading(true);
        const res = await companyApi.getAll();
        if (res.success && Array.isArray(res.data)) {
          setCompanies(res.data);
        }
      } catch (err) {
        console.error("Failed to load companies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
            Registered Companies & Factories
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Garment manufacturing units, embroidery studios, and boutique fashion houses.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-6 max-w-md">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company by name..."
            className="w-full rounded-xl border border-black/15 bg-white py-2 pl-9 pr-4 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
          />
        </div>
      </div>

      {/* Companies Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-16 text-center text-zinc-400">
            <Loader2 size={22} className="mx-auto animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="col-span-full py-12 text-center text-xs text-zinc-400">
            No companies found.
          </p>
        ) : (
          filtered.map((comp) => (
            <div
              key={comp.id}
              className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-5 shadow-xs dark:border-white/10 dark:bg-zinc-950"
            >
              <div>
                <div className="flex items-center gap-3">
                  {comp.logo ? (
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="h-12 w-12 rounded-xl object-cover border border-black/10 dark:border-white/10"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                      {comp.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-black dark:text-white">
                      {comp.name}
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck size={13} /> Verified Entity
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {comp.description || "No description provided."}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-3.5 text-xs text-zinc-500 dark:border-white/5">
                <span className="flex items-center gap-1">
                  <Briefcase size={13} />
                  {comp._count?.jobs || 0} Jobs Posted
                </span>

                {comp.website && (
                  <a
                    href={comp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-semibold text-black underline underline-offset-4 dark:text-white"
                  >
                    Website <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
