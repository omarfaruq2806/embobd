"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  Building2,
  Factory,
  Layers,
  MapPin,
  Phone,
  Mail,
  Globe,
  Search,
  CheckCircle2,
  ShieldCheck,
  PlusCircle,
  ExternalLink,
  Sparkles,
  Filter,
  Loader2,
  Tag,
  ArrowRight,
} from "lucide-react";
import { businessApi } from "@/services";

const BUSINESS_TYPES = [
  { label: "All Types", value: "ALL" },
  { label: "Shops & Retail", value: "SHOP" },
  { label: "Factories & Units", value: "FACTORY" },
  { label: "Companies", value: "COMPANY" },
  { label: "Machinery Dealers", value: "DEALER" },
  { label: "Distributors", value: "DISTRIBUTOR" },
  { label: "Material Suppliers", value: "SUPPLIER" },
];

const POPULAR_DISTRICTS = [
  "All Locations",
  "Dhaka",
  "Narayanganj",
  "Gazipur",
  "Chittagong",
  "Narsingdi",
  "Sylhet",
  "Rajshahi",
  "Comilla",
];

export default function BusinessDirectoryPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("All Locations");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Debounce search input (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  // Server-Side Fetch with Query Parameters
  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);
        const res = await businessApi.getAll({
          status: "APPROVED",
          search: debouncedSearch || undefined,
          type: selectedType !== "ALL" ? selectedType : undefined,
          district: selectedDistrict !== "All Locations" ? selectedDistrict : undefined,
          isVerified: verifiedOnly ? "true" : undefined,
        });

        if (res.success && Array.isArray(res.data)) {
          setBusinesses(res.data);
        }
      } catch (err) {
        console.error("Failed to load businesses:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, [debouncedSearch, selectedType, selectedDistrict, verifiedOnly]);

  const filteredBusinesses = businesses;

  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "SHOP":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40";
      case "FACTORY":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40";
      case "DEALER":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40";
      case "SUPPLIER":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40";
      case "DISTRIBUTOR":
        return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/40";
      default:
        return "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50/60 pb-20 pt-8 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero & Title Banner */}
        <div className="flex flex-col justify-between gap-6 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-10 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-bold text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
                <Store size={13} />
                Embroidery Ecosystem
              </span>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Verified Directory
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-black tracking-tight text-black dark:text-white sm:text-4xl">
              Embroidery Business Directory
            </h1>
            <p className="mt-2 max-w-2xl text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
              Discover verified embroidery machinery dealers, thread & fabric suppliers, digital punching studios, and garment factories across Bangladesh.
            </p>
          </div>

          <Link
            href="/businesses/create"
            className="flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black shrink-0"
          >
            <PlusCircle size={16} />
            List Your Business
          </Link>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-8 space-y-4">
          {/* Main Search Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by business name, brand (e.g. Tajima, Feiya), area or service..."
                className="w-full rounded-2xl border border-black/15 bg-white py-3 pl-11 pr-4 text-xs font-medium text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="h-11 rounded-2xl border border-black/15 bg-white px-4 text-xs font-semibold text-zinc-800 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {POPULAR_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`flex h-11 items-center gap-2 rounded-2xl border px-4 text-xs font-semibold transition ${
                verifiedOnly
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-950/40 dark:text-emerald-300"
                  : "border-black/15 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-400"
              }`}
            >
              <ShieldCheck size={16} className={verifiedOnly ? "text-emerald-600" : "text-zinc-400"} />
              Verified Only
            </button>
          </div>

          {/* Type Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {BUSINESS_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setSelectedType(t.value)}
                className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  selectedType === t.value
                    ? "bg-black text-white shadow-xs dark:bg-white dark:text-black"
                    : "border border-black/10 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Businesses Cards Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Showing {filteredBusinesses.length} Business{filteredBusinesses.length === 1 ? "" : "es"}
            </h2>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-950">
              <div className="flex flex-col items-center gap-3">
                <Loader2 size={28} className="animate-spin text-zinc-500" />
                <p className="text-xs font-semibold text-zinc-500">Loading verified businesses...</p>
              </div>
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-white p-8 text-center dark:border-white/10 dark:bg-zinc-950">
              <Store size={36} className="text-zinc-300 dark:text-zinc-600" />
              <h3 className="mt-3 text-base font-bold text-black dark:text-white">No businesses found</h3>
              <p className="mt-1 max-w-sm text-xs text-zinc-500 dark:text-zinc-400">
                We couldn't find any business matching your search filter. Try clearing filters or list your own business!
              </p>
              <Link
                href="/businesses/create"
                className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
              >
                <PlusCircle size={14} /> Add Business
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBusinesses.map((b) => (
                <div
                  key={b.id}
                  className="group flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 shadow-xs transition-all hover:border-black/30 hover:shadow-md dark:border-white/10 dark:bg-zinc-950 dark:hover:border-white/25"
                >
                  <div>
                    {/* Card Header: Logo/Avatar & Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {b.logo ? (
                          <img
                            src={b.logo}
                            alt={b.name}
                            className="h-12 w-12 rounded-2xl object-cover border border-black/10 dark:border-white/10"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white shadow-xs dark:bg-white dark:text-black">
                            {b.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <span
                            className={`inline-block rounded-md border px-2 py-0.5 text-[10px] font-bold ${getTypeBadgeClass(
                              b.type
                            )}`}
                          >
                            {b.type}
                          </span>
                          {b.isVerified && (
                            <span className="ml-1.5 inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                              <ShieldCheck size={13} />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Business Name */}
                    <h3 className="mt-4 text-base font-extrabold text-black transition group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300">
                      <Link href={`/businesses/${b.slug}`}>
                        {b.name}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-xs leading-relaxed text-zinc-600 line-clamp-2 dark:text-zinc-400">
                      {b.description || "Leading embroidery provider offering high standard services."}
                    </p>

                    {/* Brands Handled Pills */}
                    {b.brands && b.brands.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {b.brands.slice(0, 4).map((brand, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                          >
                            <Tag size={10} className="text-zinc-400" />
                            {brand}
                          </span>
                        ))}
                        {b.brands.length > 4 && (
                          <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 dark:bg-zinc-800">
                            +{b.brands.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Location & Action Contacts */}
                  <div className="mt-6 border-t border-black/5 pt-4 dark:border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <MapPin size={13} className="shrink-0 text-zinc-400" />
                      <span className="truncate">
                        {b.area ? `${b.area}, ` : ""}
                        {b.district}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${b.phone}`}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition hover:bg-black hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-white dark:hover:text-black"
                          title={`Call ${b.phone}`}
                        >
                          <Phone size={14} />
                        </a>
                        {b.email && (
                          <a
                            href={`mailto:${b.email}`}
                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition hover:bg-black hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-white dark:hover:text-black"
                            title={`Email ${b.email}`}
                          >
                            <Mail size={14} />
                          </a>
                        )}
                        {b.website && (
                          <a
                            href={b.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition hover:bg-black hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-white dark:hover:text-black"
                            title="Visit Website"
                          >
                            <Globe size={14} />
                          </a>
                        )}
                      </div>

                      <Link
                        href={`/businesses/${b.slug}`}
                        className="flex items-center gap-1 text-xs font-bold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
                      >
                        View Profile <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
