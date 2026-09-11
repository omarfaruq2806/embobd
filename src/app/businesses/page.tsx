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
  { label: "সকল প্রতিষ্ঠান", value: "ALL" },
  { label: "দোকান ও বুটিক", value: "SHOP" },
  { label: "ফ্যাক্টরি ও কারখানা", value: "FACTORY" },
  { label: "কোম্পানি / গ্রুপ", value: "COMPANY" },
  { label: "মেশিনারিজ ডিলার", value: "DEALER" },
  { label: "ডিস্ট্রিবিউটর", value: "DISTRIBUTOR" },
  { label: "সুতা ও উপাদান সাপ্লায়ার", value: "SUPPLIER" },
];

const POPULAR_DISTRICTS = [
  "সকল জেলা",
  "ঢাকা",
  "নারায়ণগঞ্জ",
  "গাজীপুর",
  "চট্টগ্রাম",
  "নরসিংদী",
  "সিলেট",
  "রাজশাহী",
  "কুমিল্লা",
];

export default function BusinessDirectoryPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState("সকল জেলা");
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
          district: selectedDistrict !== "সকল জেলা" ? selectedDistrict : undefined,
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

  const formatType = (type: string) => {
    switch (type) {
      case "SHOP":
        return "দোকান / বুটিক";
      case "FACTORY":
        return "ফ্যাক্টরি / কারখানা";
      case "COMPANY":
        return "কোম্পানি";
      case "DEALER":
        return "মেশিন ডিলার";
      case "DISTRIBUTOR":
        return "ডিস্ট্রিবিউটর";
      case "SUPPLIER":
        return "কাঁচামাল সাপ্লায়ার";
      default:
        return type;
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50/60 pb-20 font-sans text-zinc-900">
      {/* Header Banner */}
      <section className="border-b border-zinc-200 bg-white px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1 text-xs font-semibold text-zinc-800">
                <Store size={14} className="text-amber-500" />
                জাতীয় এমব্রয়ডারি ডিরেক্টরি
              </div>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                এমব্রয়ডারি ব্যবসা ও কারখানা ডিরেক্টরি
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">
                বাংলাদেশের অনুমোদিত এমব্রয়ডারি কারখানা, সুতা ও মেশিনারিজ ডিলার, বুটিক হাউজ এবং বিশ্বস্ত সাপ্লায়ারদের তালিকা।
              </p>
            </div>

            <Link
              href="/businesses/create"
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-sm font-bold text-white shadow-xs transition hover:bg-zinc-800 shrink-0"
            >
              <PlusCircle size={18} />
              আপনার ব্যবসা তালিকাভুক্ত করুন
            </Link>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ব্যবসার নাম, ব্র্যান্ড, জেলা বা ফোন নম্বর..."
                className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-950 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-800 focus:border-zinc-950 focus:outline-none"
            >
              {BUSINESS_TYPES.map((bt) => (
                <option key={bt.value} value={bt.value}>
                  {bt.label}
                </option>
              ))}
            </select>

            {/* District Filter */}
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-800 focus:border-zinc-950 focus:outline-none"
            >
              {POPULAR_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Toggle */}
          <div className="mt-4 flex items-center gap-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-zinc-800">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-4 w-4 rounded-md border-zinc-300 text-zinc-950 focus:ring-0"
              />
              <ShieldCheck size={14} className="text-emerald-600" />
              শুধু ভেরিফাইড প্রতিষ্ঠানসমূহ দেখুন
            </label>
          </div>
        </div>
      </section>

      {/* Businesses Grid */}
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            মোট {businesses.length}টি প্রতিষ্ঠান তালিকাভুক্ত
          </p>
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-6 h-48"
              />
            ))}
          </div>
        ) : businesses.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-zinc-300 bg-white py-16 text-center">
            <Store size={36} className="mx-auto text-zinc-400" />
            <h3 className="mt-4 text-base font-bold text-zinc-900">
              কোনো ব্যবসা প্রতিষ্ঠান পাওয়া যায়নি
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              ফিল্টার পরিবর্তন করুন অথবা আপনার ব্যবসাটি আজই বিনামূল্যে তালিকাভুক্ত করুন।
            </p>
            <Link
              href="/businesses/create"
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white"
            >
              <PlusCircle size={14} /> তালিকাভুক্ত করুন
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <div
                key={b.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-400"
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    {b.logo ? (
                      <img
                        src={b.logo}
                        alt={b.name}
                        className="h-12 w-12 rounded-xl object-cover border border-zinc-200 shrink-0"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white shrink-0">
                        {b.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <h2 className="font-bold text-base text-zinc-950 flex items-center gap-1.5 truncate">
                        {b.name}
                        {b.isVerified && (
                          <span title="ভেরিফাইড প্রতিষ্ঠান">
                            <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </h2>
                      <span className="mt-1 inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-700">
                        {formatType(b.type)}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-zinc-600 leading-relaxed line-clamp-2">
                    {b.description || "এই প্রতিষ্ঠানের জন্য এখনো কোনো বিবরণ যুক্ত করা হয়নি।"}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Phone size={13} className="text-zinc-400" />
                      <span className="font-medium text-zinc-900">{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-zinc-400" />
                      <span>{b.address || b.district}</span>
                    </div>
                  </div>

                  {b.brands && b.brands.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {b.brands.slice(0, 3).map((brand: string, i: number) => (
                        <span
                          key={i}
                          className="rounded-md bg-zinc-50 border border-zinc-200 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs">
                  <span className="font-medium text-emerald-700 text-[11px]">
                    {b.isVerified ? "স্বীকৃত ও ভেরিফাইড" : "নিবন্ধিত প্রতিষ্ঠান"}
                  </span>
                  <Link
                    href={`/businesses/${b.slug}`}
                    className="flex items-center gap-1 font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
                  >
                    প্রোফাইল দেখুন <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
