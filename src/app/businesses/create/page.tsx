"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Store,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Phone,
  Mail,
  Globe,
  MapPin,
  Tag,
  ArrowLeft,
  Sparkles,
  Lock,
} from "lucide-react";
import { businessApi } from "@/services";

const BUSINESS_TYPES = [
  { value: "SHOP", label: "এমব্রয়ডারি শপ / আউটলেট" },
  { value: "FACTORY", label: "গার্মেন্টস / এমব্রয়ডারি ফ্যাক্টরি" },
  { value: "COMPANY", label: "কর্পোরেট স্টুডিও / প্রতিষ্ঠান" },
  { value: "DEALER", label: "মেশিনারিজ ও খুচরা যন্ত্রাংশ ডিলার" },
  { value: "DISTRIBUTOR", label: "অফিসিয়াল ডিস্ট্রিবিউটর" },
  { value: "SUPPLIER", label: "সুতা ও কাঁচামাল সরবরাহকারী" },
];

export default function CreateBusinessPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as any)?.user;

  const [formData, setFormData] = useState({
    name: "",
    type: "SHOP",
    logo: "",
    description: "",
    brands: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    area: "",
    district: "ঢাকা",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      setError("ব্যবসা যুক্ত করতে অনুগ্রহ করে আগে লগইন করুন।");
      return;
    }

    if (!formData.name.trim()) {
      setError("প্রতিষ্ঠানের নাম আবশ্যক।");
      return;
    }

    if (!formData.phone.trim()) {
      setError("ফোন নম্বর দেওয়া আবশ্যক।");
      return;
    }

    if (!formData.address.trim()) {
      setError("সঠিক ঠিকানা দেওয়া আবশ্যক।");
      return;
    }

    if (!formData.district.trim()) {
      setError("জেলা নির্বাচন করুন।");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        type: formData.type,
        logo: formData.logo.trim() || null,
        description: formData.description.trim() || null,
        brands: formData.brands
          ? formData.brands.split(",").map((b) => b.trim()).filter(Boolean)
          : [],
        phone: formData.phone.trim(),
        email: formData.email.trim() || null,
        website: formData.website.trim() || null,
        address: formData.address.trim(),
        area: formData.area.trim() || null,
        district: formData.district.trim(),
      };

      const res = await businessApi.create(payload);

      if (res.success && res.data) {
        setSuccess(true);
        setCreatedSlug(res.data.slug);
      } else {
        setError(res.message || "ব্যবসা যুক্ত করা সম্ভব হয়নি। আবার চেষ্টা করুন।");
      }
    } catch (err: any) {
      setError(err?.message || "সার্ভারে সমস্যা দেখা দিয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  // Auth gate check
  if (!isPending && !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-zinc-50 px-4 py-20 font-sans">
        <div className="max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-sm">
            <Lock size={24} />
          </div>
          <h1 className="mt-4 text-xl font-bold text-zinc-950">লগইন আবশ্যক</h1>
          <p className="mt-2 text-xs text-zinc-600">
            EMBOBD ভেরিফাইড ডিরেক্টরিতে আপনার ফ্যাক্টরি বা ব্যবসা যুক্ত করতে অ্যাকাউন্টে সাইন-ইন করুন।
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/login"
              className="rounded-xl bg-zinc-950 py-2.5 text-xs font-bold text-white shadow-sm hover:opacity-90"
            >
              লগইন করুন
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-zinc-300 py-2.5 text-xs font-bold text-zinc-800 hover:bg-zinc-100"
            >
              নতুন অ্যাকাউন্ট খুলুন
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 pb-24 pt-8 font-sans">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/businesses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft size={14} /> ডিরেক্টরিতে ফিরে যান
        </Link>

        {/* Page Header with Hook */}
        <div className="mt-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-800 mb-2">
            <Sparkles size={12} /> ভেরিফাইড ডিরেক্টরি
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
            আপনার প্রতিষ্ঠান বা ফ্যাক্টরি যুক্ত করুন 🏢
          </h1>
          <p className="mt-1 text-xs text-zinc-600">
            সারা দেশের টেক্সটাইল বায়ার, গার্মেন্টস কারখানা ও পেশাদারদের সাথে সরাসরি ব্যবসার সংযোগ তৈরি করুন।
          </p>
        </div>

        {/* Success State */}
        {success ? (
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-xs">
            <CheckCircle2 size={44} className="mx-auto text-emerald-600" />
            <h2 className="mt-4 text-xl font-bold text-zinc-950">
              ব্যবসা সফলভাবে জমা দেওয়া হয়েছে! 🎉
            </h2>
            <p className="mt-2 text-xs text-zinc-700">
              {user?.role === "ADMIN" || user?.role === "MODERATOR"
                ? "আপনার ব্যবসা প্রোফাইল তাৎক্ষণিকভাবে ভেরিফাই ও পাবলিশ করা হয়েছে।"
                : "আপনার সাবমিশনটি গ্রহণ করা হয়েছে এবং মডারেশন টিম এটি রিভিউ করছে। অনুমোদিত হলেই এটি পাবলিক ডিরেক্টরিতে প্রদর্শিত হবে।"}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {createdSlug && (
                <Link
                  href={`/businesses/${createdSlug}`}
                  className="rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm"
                >
                  প্রোফাইল দেখুন
                </Link>
              )}
              <Link
                href="/businesses"
                className="rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-100"
              >
                ডিরেক্টরিতে ফিরে যান
              </Link>
            </div>
          </div>
        ) : (
          /* Business Submission Form */
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10"
          >
            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs font-semibold text-rose-700">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-zinc-950 border-b border-zinc-100 pb-2">
                ১. প্রতিষ্ঠানের প্রাথমিক তথ্য
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  ব্যবসা / ফ্যাক্টরির নাম *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="যেমন: তাজিমা এমব্রয়ডারি অ্যান্ড পাঞ্চিং হাউস"
                  className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-800">
                    ব্যবসার ধরণ *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-900 focus:border-zinc-950 focus:outline-none"
                  >
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center justify-between text-xs font-semibold text-zinc-800">
                    <span>লোগো বা ফটো URL (ঐচ্ছিক)</span>
                  </label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  বিবরণ ও বিশেষ পারদর্শিতা
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="আপনার মেশিনারিজ, দৈনিক প্রোডাকশন ক্যাপাসিটি, বিশেষ টেকনিক (যেমন: সিকোয়েন্স, ৩ডি পাফ, কর্ডিং) সম্পর্কে লিখুন..."
                  className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  মেশিনের ব্র্যান্ডসমূহ (কমা দিয়ে লিখুন)
                </label>
                <input
                  type="text"
                  name="brands"
                  value={formData.brands}
                  onChange={handleChange}
                  placeholder="যেমন: Tajima, Barudan, SWF, Feiya, Brother"
                  className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div className="space-y-4 pt-4">
              <h2 className="text-sm font-bold text-zinc-950 border-b border-zinc-100 pb-2">
                ২. যোগাযোগের বিবরণ
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-800">
                    ফোন নম্বর *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="০১৭১২-৩৪৫৬৭৮"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-800">
                    অফিসিয়াল ইমেইল
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@business.com"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-800">
                    ওয়েবসাইট (ঐচ্ছিক)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://business.com"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Location */}
            <div className="space-y-4 pt-4">
              <h2 className="text-sm font-bold text-zinc-950 border-b border-zinc-100 pb-2">
                ৩. সঠিক অবস্থান ও ঠিকানা
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-800">
                    জেলা *
                  </label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="যেমন: ঢাকা / নারায়ণগঞ্জ / গাজীপুর"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-800">
                    এলাকা / জোন (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="যেমন: উত্তরা, ফতুল্লা, ইপিজেড"
                    className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-800">
                  পূর্ণাঙ্গ সড়ক ঠিকানা *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="যেমন: বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা"
                  className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-zinc-100 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3.5 text-xs font-bold text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    তালিকাভুক্ত হচ্ছে...
                  </>
                ) : (
                  <>
                    <PlusCircle size={16} />
                    ব্যবসা তালিকাভুক্ত করুন
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
