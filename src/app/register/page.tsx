"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, Loader2, Sparkles, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("দয়া করে ফর্মের সবকটি তথ্য সঠিকভাবে পূরণ করুন।");
      return;
    }

    if (password.length < 6) {
      setError("পাসওয়ার্ডটি কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      const response = await authClient.signUp.email({
        name,
        email,
        password,
        role: "CANDIDATE",
      } as any);

      if (response.error) {
        setError(response.error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। অন্য ইমেইল দিয়ে আবার চেষ্টা করুন।");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.message || "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        {/* Header with Hook */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 shadow-inner">
            <UserPlus size={22} />
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700 border border-blue-200 mb-2">
            <Sparkles size={12} /> সহজে ও সম্পূর্ণ ফ্রি
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950">
            নতুন অ্যাকাউন্ট খুলুন
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            যুক্ত হোন বাংলাদেশের সবচেয়ে বড় এমব্রয়ডারি ও টেক্সটাইল পেশাদারদের নেটওয়ার্কে।
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-800">
              আপনার পূর্ণ নাম
            </label>
            <input
              type="text"
              required
              placeholder="যেমন: তানভীর হাসান"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800">
              ইমেইল অ্যাড্রেস
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-800">
              পাসওয়ার্ড
            </label>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-800"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
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
                অ্যাকাউন্ট তৈরি হচ্ছে...
              </>
            ) : (
              "অ্যাকাউন্ট তৈরি করুন"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/login"
            className="font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
          >
            লগইন করুন
          </Link>
        </p>
      </div>
    </main>
  );
}
