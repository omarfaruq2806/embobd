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
  { value: "SHOP", label: "Retail / Embroidery Shop" },
  { value: "FACTORY", label: "Garment / Embroidery Factory" },
  { value: "COMPANY", label: "Corporate Business / Studio" },
  { value: "DEALER", label: "Machinery & Spare Parts Dealer" },
  { value: "DISTRIBUTOR", label: "Official Distributor" },
  { value: "SUPPLIER", label: "Thread & Raw Materials Supplier" },
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
    district: "Dhaka",
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
      setError("You must be logged in to submit a business.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Business name is required.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Street address is required.");
      return;
    }

    if (!formData.district.trim()) {
      setError("District is required.");
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
        setError(res.message || "Failed to submit business. Please try again.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Auth gate check
  if (!isPending && !user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
        <div className="max-w-md rounded-3xl border border-black/10 bg-white p-8 text-center shadow-xs dark:border-white/10 dark:bg-zinc-950">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
            <Lock size={24} />
          </div>
          <h1 className="mt-4 text-xl font-black text-black dark:text-white">Authentication Required</h1>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            You must be signed in to your EMBOBD account to list a business or factory in our verified directory.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <Link
              href="/login"
              className="rounded-xl bg-black py-2.5 text-xs font-semibold text-white shadow-xs dark:bg-white dark:text-black"
            >
              Sign In to Continue
            </Link>
            <Link
              href="/register"
              className="rounded-xl border border-black/10 py-2.5 text-xs font-semibold text-zinc-700 dark:border-white/15 dark:text-zinc-300"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50/60 pb-24 pt-8 dark:bg-black">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/businesses"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black dark:hover:text-white"
        >
          <ArrowLeft size={14} /> Back to Directory
        </Link>

        {/* Page Header */}
        <div className="mt-4">
          <h1 className="text-2xl font-black tracking-tight text-black dark:text-white sm:text-3xl">
            List Your Embroidery Business
          </h1>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Submit your embroidery factory, machinery shop, or material dealership to connect with buyers and recruiters across Bangladesh.
          </p>
        </div>

        {/* Success State */}
        {success ? (
          <div className="mt-8 rounded-3xl border border-emerald-500/20 bg-emerald-50/60 p-8 text-center dark:bg-emerald-950/20">
            <CheckCircle2 size={44} className="mx-auto text-emerald-600 dark:text-emerald-400" />
            <h2 className="mt-4 text-xl font-black text-black dark:text-white">
              Business Submitted Successfully! 🎉
            </h2>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              {user?.role === "ADMIN" || user?.role === "MODERATOR"
                ? "Your business has been verified and published immediately."
                : "Your submission has been received and is currently under review by our moderation team. It will appear on the public directory once approved."}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {createdSlug && (
                <Link
                  href={`/businesses/${createdSlug}`}
                  className="rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black"
                >
                  View Business Profile
                </Link>
              )}
              <Link
                href="/businesses"
                className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-xs font-semibold text-black dark:border-white/15 dark:bg-zinc-900 dark:text-white"
              >
                Back to Directory
              </Link>
            </div>
          </div>
        ) : (
          /* Business Submission Form */
          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 rounded-3xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950 sm:p-10"
          >
            {error && (
              <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-400">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-black dark:text-white border-b border-black/5 pb-2 dark:border-white/5">
                1. Basic Business Details
              </h2>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Business / Factory Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Tajima Embroidery & Punching House"
                  className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Business Category / Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs font-semibold text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
                  >
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Logo or Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Description & Specialties
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your machinery, daily production capacity, special techniques (e.g. sequin, cording, 3D puff), or available parts..."
                  className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Brands & Machine Models Handled (Comma-separated)
                </label>
                <input
                  type="text"
                  name="brands"
                  value={formData.brands}
                  onChange={handleChange}
                  placeholder="e.g. Tajima, Barudan, SWF, Feiya, Brother"
                  className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                />
                <p className="mt-1 text-[11px] text-zinc-400">
                  Separate each brand name with a comma so visitors can search easily.
                </p>
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div className="space-y-4 pt-4">
              <h2 className="text-sm font-bold text-black dark:text-white border-b border-black/5 pb-2 dark:border-white/5">
                2. Contact & Online Presence
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="017XXXXXXXX"
                    className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Official Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contact@business.com"
                    className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Website (Optional)
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://business.com"
                    className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Location */}
            <div className="space-y-4 pt-4">
              <h2 className="text-sm font-bold text-black dark:text-white border-b border-black/5 pb-2 dark:border-white/5">
                3. Physical Location
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    District *
                  </label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g. Dhaka / Narayanganj / Gazipur"
                    className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Area / Zone (Optional)
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. Uttara, Fatullah, EPZ"
                    className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Full Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. House 12, Road 4, Sector 7, Uttara"
                  className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3.5 py-2.5 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-black/5 pt-6 dark:border-white/5">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-3.5 text-xs font-bold text-white shadow-sm transition-all hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting business...
                  </>
                ) : (
                  <>
                    <PlusCircle size={16} />
                    Submit Business for Listing
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
