"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Loader2, CheckCircle2, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        {/* Back Link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
        >
          <ArrowLeft size={14} /> লগইন পেজে ফিরে যান
        </Link>

        {/* Header */}
        <div className="mt-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 shadow-inner">
            <KeyRound size={22} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
            পাসওয়ার্ড রিসেট করুন
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            আপনার অ্যাকাউন্টের ইমেইল দিন। আমরা পাসওয়ার্ড পরিবর্তনের সিকিউর লিংক পাঠাব।
          </p>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
            <h3 className="mt-3 text-base font-bold text-emerald-950">
              রিসেট লিংক পাঠানো হয়েছে!
            </h3>
            <p className="mt-1 text-xs text-emerald-800">
              <span className="font-semibold">{email}</span> ঠিকানায় যদি কোনো অ্যাকাউন্ট থাকে, তবে কিছুক্ষণের মধ্যে রিসেট ইন্সট্রাকশন ইনবক্সে পৌঁছে যাবে।
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-xl bg-zinc-950 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 transition-colors shadow-sm"
            >
              লগইনে ফিরে যান
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-800">
                আপনার নিবন্ধিত ইমেইল
              </label>
              <div className="relative mt-1.5">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  লিংক পাঠানো হচ্ছে...
                </>
              ) : (
                "রিসেট লিংক পাঠান"
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
