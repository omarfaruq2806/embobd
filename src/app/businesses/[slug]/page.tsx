"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Share2,
  Calendar,
  CheckCircle2,
  Building,
  Loader2,
} from "lucide-react";
import { businessApi } from "@/services";

export default function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [business, setBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        setLoading(true);
        const res = await businessApi.getBySlug(resolvedParams.slug);
        if (res.success && res.data) {
          setBusiness(res.data);
        } else {
          const resFallback = await businessApi.getById(resolvedParams.slug);
          if (resFallback.success && resFallback.data) {
            setBusiness(resFallback.data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch business details:", err);
      } finally {
        setLoading(false);
      }
    }

    if (resolvedParams.slug) {
      fetchBusiness();
    }
  }, [resolvedParams.slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const formatBusinessType = (type: string) => {
    switch (type) {
      case "FACTORY":
        return "গার্মেন্টস / এমব্রয়ডারি ফ্যাক্টরি";
      case "SHOP":
        return "এমব্রয়ডারি শপ / আউটলেট";
      case "DEALER":
        return "মেশিনারিজ ও খুচরা যন্ত্রাংশ ডিলার";
      case "SUPPLIER":
        return "সুতা ও কাঁচামাল সরবরাহকারী";
      case "COMPANY":
        return "কর্পোরেট স্টুডিও / প্রতিষ্ঠান";
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-zinc-50 font-sans">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-zinc-600" />
          <p className="text-xs font-semibold text-zinc-600">ব্যবসার তথ্য লোড হচ্ছে...</p>
        </div>
      </main>
    );
  }

  if (!business) {
    return (
      <main className="min-h-[60vh] py-20 text-center bg-zinc-50 font-sans">
        <Store size={44} className="mx-auto text-zinc-400" />
        <h1 className="mt-4 text-xl font-bold text-zinc-950">প্রতিষ্ঠানটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-2 text-xs text-zinc-600">
          অনুরোধকৃত ব্যবসা প্রোফাইলটি এখনও রিভিউতে রয়েছে অথবা মুছে ফেলা হয়েছে।
        </p>
        <Link
          href="/businesses"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm"
        >
          <ArrowLeft size={14} /> ডিরেক্টরিতে ফিরে যান
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 pb-24 pt-8 font-sans">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/businesses"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft size={14} /> ডিরেক্টরিতে ফিরে যান
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-800 shadow-xs transition hover:bg-zinc-100"
          >
            {copied ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-600" /> লিংক কপি হয়েছে!
              </>
            ) : (
              <>
                <Share2 size={14} /> প্রোফাইল শেয়ার করুন
              </>
            )}
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {/* Top Banner Accent */}
          <div className="h-32 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 p-6 flex items-end justify-end">
            <span className="rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
              {formatBusinessType(business.type)}
            </span>
          </div>

          {/* Profile Header Content */}
          <div className="px-6 pb-8 pt-0 sm:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end -mt-12">
              {business.logo ? (
                <img
                  src={business.logo}
                  alt={business.name}
                  className="h-24 w-24 rounded-2xl border-4 border-white bg-white object-cover shadow-md"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-zinc-900 text-2xl font-black text-white shadow-md">
                  {business.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                    {business.name}
                  </h1>
                  {business.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      <ShieldCheck size={14} className="text-emerald-600" />
                      ভেরিফাইড প্রতিষ্ঠান
                    </span>
                  )}
                </div>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-600 font-medium">
                  <MapPin size={13} className="text-zinc-400" />
                  {business.address}, {business.area ? `${business.area}, ` : ""}{business.district}, {business.country || "বাংলাদেশ"}
                </p>
              </div>
            </div>

            {/* Quick Action Contact Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-6">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90"
              >
                <Phone size={15} /> কল করুন: {business.phone}
              </a>

              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-bold text-zinc-900 transition hover:bg-zinc-100"
                >
                  <Mail size={15} /> ইমেইল পাঠান
                </a>
              )}

              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-bold text-zinc-900 transition hover:bg-zinc-100"
                >
                  <Globe size={15} /> ওয়েবসাইট ভিজিট করুন
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Details & Specs Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Main Description & Brands (2 Cols) */}
          <div className="space-y-6 md:col-span-2">
            {/* About Section */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-base font-bold text-zinc-950">প্রতিষ্ঠানের পরিচিতি ও সক্ষমতা</h2>
              <div className="mt-4 text-xs leading-relaxed text-zinc-700 space-y-3">
                <p>
                  {business.description ||
                    "এই ভেরিফাইড প্রতিষ্ঠানটি বাংলাদেশের এমব্রয়ডারি, গার্মেন্টস এবং টেক্সটাইল সেক্টরে স্পেশালাইজড মেশিনারিজ ও সেবা প্রদান করে থাকে।"}
                </p>
              </div>
            </div>

            {/* Brands Handled */}
            {business.brands && business.brands.length > 0 && (
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="flex items-center gap-2 text-base font-bold text-zinc-950">
                  <Tag size={16} className="text-zinc-700" /> মেশিনের ব্র্যান্ড ও স্পেয়ার পার্টস
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {business.brands.map((brand: string, idx: number) => (
                    <span
                      key={idx}
                      className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-800"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Location & Meta (1 Col) */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                ঠিকানা ও যোগাযোগের তথ্য
              </h3>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <span className="font-semibold text-zinc-500">জেলা / অঞ্চল</span>
                  <p className="mt-0.5 font-bold text-zinc-950">{business.district}</p>
                </div>

                {business.area && (
                  <div>
                    <span className="font-semibold text-zinc-500">এলাকা / জোন</span>
                    <p className="mt-0.5 font-bold text-zinc-950">{business.area}</p>
                  </div>
                )}

                <div>
                  <span className="font-semibold text-zinc-500">পূর্ণাঙ্গ ঠিকানা</span>
                  <p className="mt-0.5 text-zinc-800">{business.address}</p>
                </div>

                <div className="border-t border-zinc-100 pt-3">
                  <span className="font-semibold text-zinc-500">তালিকাভুক্তির তারিখ</span>
                  <p className="mt-0.5 flex items-center gap-1 text-zinc-600">
                    <Calendar size={13} className="text-zinc-400" />
                    {new Date(business.createdAt).toLocaleDateString("bn-BD", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
