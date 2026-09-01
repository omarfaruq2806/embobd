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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-xs dark:border-white/10 dark:bg-black">
        {/* Back Link */}
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={14} /> Back to Login
        </Link>

        {/* Header */}
        <div className="mt-4 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black dark:bg-white/10 dark:text-white">
            <KeyRound size={22} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
            Reset Password
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Enter your email address and we will send you password reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-50 p-6 text-center dark:bg-emerald-950/30">
            <CheckCircle2 size={32} className="mx-auto text-emerald-600 dark:text-emerald-400" />
            <h3 className="mt-3 text-sm font-bold text-emerald-900 dark:text-emerald-200">
              Reset Instructions Sent!
            </h3>
            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
              If an account exists with <span className="font-semibold">{email}</span>, you will receive password reset instructions shortly.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white dark:bg-white dark:text-black"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Email Address
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
                  className="w-full rounded-xl border border-black/15 bg-transparent py-2.5 pl-10 pr-3.5 text-sm text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white dark:focus:border-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
