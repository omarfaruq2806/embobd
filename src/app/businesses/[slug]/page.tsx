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
          // Fallback fetch by ID if slug did not match
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

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={28} className="animate-spin text-zinc-500" />
          <p className="text-xs font-semibold text-zinc-500">Loading business profile...</p>
        </div>
      </main>
    );
  }

  if (!business) {
    return (
      <main className="min-h-[60vh] py-20 text-center">
        <Store size={44} className="mx-auto text-zinc-400" />
        <h1 className="mt-4 text-xl font-bold text-black dark:text-white">Business Not Found</h1>
        <p className="mt-2 text-xs text-zinc-500">
          The requested business profile is either pending approval or does not exist.
        </p>
        <Link
          href="/businesses"
          className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black"
        >
          <ArrowLeft size={14} /> Back to Directory
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50/60 pb-24 pt-8 dark:bg-black">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <Link
            href="/businesses"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black dark:hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Directory
          </Link>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-xl border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-zinc-700 shadow-xs transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {copied ? (
              <>
                <CheckCircle2 size={14} className="text-emerald-500" /> Link Copied!
              </>
            ) : (
              <>
                <Share2 size={14} /> Share Profile
              </>
            )}
          </button>
        </div>

        {/* Profile Card Header */}
        <div className="mt-6 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-950">
          {/* Top Banner Accent */}
          <div className="h-32 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-950 p-6 flex items-end justify-end">
            <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
              {business.type}
            </span>
          </div>

          {/* Profile Header Content */}
          <div className="px-6 pb-8 pt-0 sm:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end -mt-12">
              {business.logo ? (
                <img
                  src={business.logo}
                  alt={business.name}
                  className="h-24 w-24 rounded-3xl border-4 border-white bg-white object-cover shadow-md dark:border-zinc-950 dark:bg-zinc-900"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-black text-2xl font-black text-white shadow-md dark:border-zinc-950 dark:bg-white dark:text-black">
                  {business.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight text-black dark:text-white sm:text-3xl">
                    {business.name}
                  </h1>
                  {business.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                      <ShieldCheck size={14} />
                      Verified Business
                    </span>
                  )}
                </div>

                <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <MapPin size={13} className="text-zinc-400" />
                  {business.address}, {business.area ? `${business.area}, ` : ""}{business.district}, {business.country || "Bangladesh"}
                </p>
              </div>
            </div>

            {/* Quick Action Contact Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-black/5 pt-6 dark:border-white/5">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 rounded-2xl bg-black px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                <Phone size={15} /> Call: {business.phone}
              </a>

              {business.email && (
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-2 rounded-2xl border border-black/15 bg-white px-4 py-2.5 text-xs font-bold text-black transition hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >
                  <Mail size={15} /> Send Email
                </a>
              )}

              {business.website && (
                <a
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-black/15 bg-white px-4 py-2.5 text-xs font-bold text-black transition hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                >
                  <Globe size={15} /> Visit Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Details & Specs Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Main Description & Brands (2 Cols) */}
          <div className="space-y-8 md:col-span-2">
            {/* About Section */}
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
              <h2 className="text-base font-bold text-black dark:text-white">About the Business</h2>
              <div className="mt-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300 space-y-3">
                <p>
                  {business.description ||
                    "This verified business operates within the Bangladesh embroidery, garment, and textile network providing specialized services and machinery support."}
                </p>
              </div>
            </div>

            {/* Brands Handled */}
            {business.brands && business.brands.length > 0 && (
              <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-8">
                <h2 className="flex items-center gap-2 text-base font-bold text-black dark:text-white">
                  <Tag size={16} /> Machinery & Brands Handled
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {business.brands.map((brand, idx) => (
                    <span
                      key={idx}
                      className="rounded-xl border border-black/10 bg-zinc-50 px-3 py-1.5 text-xs font-bold text-zinc-800 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200"
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
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Location & Information
              </h3>

              <div className="mt-4 space-y-4 text-xs">
                <div>
                  <span className="font-medium text-zinc-400">District / Region</span>
                  <p className="mt-0.5 font-bold text-black dark:text-white">{business.district}</p>
                </div>

                {business.area && (
                  <div>
                    <span className="font-medium text-zinc-400">Area / Zone</span>
                    <p className="mt-0.5 font-bold text-black dark:text-white">{business.area}</p>
                  </div>
                )}

                <div>
                  <span className="font-medium text-zinc-400">Complete Address</span>
                  <p className="mt-0.5 text-zinc-700 dark:text-zinc-300">{business.address}</p>
                </div>

                <div className="border-t border-black/5 pt-3 dark:border-white/5">
                  <span className="font-medium text-zinc-400">Listed Since</span>
                  <p className="mt-0.5 flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                    <Calendar size={13} />
                    {new Date(business.createdAt).toLocaleDateString("en-US", {
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
