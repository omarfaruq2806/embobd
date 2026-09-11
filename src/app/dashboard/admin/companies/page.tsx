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
import { companyApi } from "@/services";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<any[]>([]);
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
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">
            নিবন্ধিত কোম্পানি ও গার্মেন্টস ফ্যাক্টরি
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            পোশাক প্রস্তুতকারী প্রতিষ্ঠান, এমব্রয়ডারি প্রোডাকশন হাউস এবং বুটিক ফ্যাশন ব্র্যান্ডসমূহ।
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
            placeholder="কোম্পানির নাম দিয়ে খুঁজুন..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-4 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
          />
        </div>
      </div>

      {/* Companies Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-16 text-center text-zinc-400">
            <Loader2 size={22} className="mx-auto animate-spin text-zinc-600" />
            <p className="mt-2 text-xs text-zinc-500">কোম্পানির তথ্য লোড হচ্ছে...</p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="col-span-full py-12 text-center text-xs text-zinc-500">
            কোনো কোম্পানি খুঁজে পাওয়া যায়নি।
          </p>
        ) : (
          filtered.map((comp) => (
            <div
              key={comp.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs hover:border-zinc-300"
            >
              <div>
                <div className="flex items-center gap-3">
                  {comp.logo ? (
                    <img
                      src={comp.logo}
                      alt={comp.name}
                      className="h-12 w-12 rounded-xl object-cover border border-zinc-200"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white">
                      {comp.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-zinc-950">
                      {comp.name}
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                      <ShieldCheck size={13} /> ভেরিফাইড প্রতিষ্ঠান
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-zinc-600 line-clamp-2">
                  {comp.description || "কোনো বিবরণ প্রদান করা হয়নি।"}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3.5 text-xs text-zinc-500">
                <span className="flex items-center gap-1 font-medium">
                  <Briefcase size={13} />
                  {comp._count?.jobs || 0} টি চাকরির বিজ্ঞপ্তি
                </span>

                {comp.website && (
                  <a
                    href={comp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-semibold text-zinc-900 underline underline-offset-4 hover:text-zinc-600"
                  >
                    ওয়েবসাইট <ExternalLink size={12} />
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
