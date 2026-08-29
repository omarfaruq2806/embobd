"use client";

import { useEffect, useState } from "react";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 25,
    hours: 8,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-black">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[850px] overflow-hidden bg-black text-white">
        {/* Background waves */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-80 h-40 w-[600px] rounded-[50%] border border-white/60 rotate-12" />
          <div className="absolute -left-20 top-[340px] h-48 w-[650px] rounded-[50%] border border-white/40 rotate-12" />
          <div className="absolute -right-40 top-[500px] h-48 w-[700px] rounded-[50%] border border-white/40 -rotate-12" />
          <div className="absolute -right-40 top-[550px] h-48 w-[700px] rounded-[50%] border border-white/30 -rotate-12" />
        </div>

        {/* Navbar */}
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-8 lg:px-10">
          <h1 className="text-2xl font-bold tracking-tight">Brand.</h1>

          <div className="hidden items-center gap-10 md:flex">
            <a href="#" className="transition hover:text-gray-400">
              Home
            </a>
            <a href="#" className="transition hover:text-gray-400">
              About
            </a>
            <a href="#" className="transition hover:text-gray-400">
              Features
            </a>
            <a href="#" className="transition hover:text-gray-400">
              Contact
            </a>
          </div>

          <button className="rounded-full border border-white/30 px-5 py-2 text-sm transition hover:bg-white hover:text-black md:hidden">
            Menu
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-28 text-center">
          <span className="mb-8 rounded-full border border-white/30 px-6 py-2 text-sm uppercase tracking-widest">
            Stay Tuned
          </span>

          <h2 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            We&apos;re
            <br />
            Coming Soon
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
            Something amazing is on the way. We&apos;re working hard to bring
            you an incredible experience.
          </p>

          {/* Countdown */}
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            <TimeBox value={timeLeft.days} label="Days" />
            <TimeBox value={timeLeft.hours} label="Hours" />
            <TimeBox value={timeLeft.minutes} label="Minutes" />
            <TimeBox value={timeLeft.seconds} label="Seconds" />
          </div>

          <button className="mt-10 flex items-center gap-8 rounded-lg bg-white px-10 py-4 font-semibold text-black transition hover:bg-gray-200">
            NOTIFY ME
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* Angled bottom */}
        <div className="absolute bottom-[-1px] left-0 h-20 w-full bg-white [clip-path:polygon(0_45%,50%_100%,100%_45%,100%_100%,0_100%)]" />
      </section>

      {/* ================= NOTIFICATION ================= */}
      <section className="px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-gray-500">
            Get Notified
          </p>

          <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Be the first to know
          </h2>

          <p className="mt-5 text-gray-600">
            Subscribe to get notified when we launch.
          </p>

          {/* Email Form */}
          <form className="mx-auto mt-12 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-14 flex-1 rounded-lg border border-gray-300 px-5 outline-none transition focus:border-black"
            />

            <button
              type="submit"
              className="h-14 rounded-lg bg-black px-8 font-semibold text-white transition hover:bg-gray-800"
            >
              SUBSCRIBE
            </button>
          </form>

          {/* Social */}
          <div className="mt-16 flex justify-center gap-5">
            <SocialButton text="f" />
            <SocialButton text="𝕏" />
            <SocialButton text="◎" />
            <SocialButton text="in" />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black px-6 py-10 text-center text-gray-400">
        <p>© 2026 Brand. All rights reserved.</p>
      </footer>
    </main>
  );
}

/* ================= COMPONENTS ================= */

function TimeBox({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="min-w-[120px] rounded-xl bg-white/10 px-6 py-5 backdrop-blur-sm">
      <div className="text-4xl font-bold">
        {String(value).padStart(2, "0")}
      </div>

      <div className="mt-1 text-xs uppercase tracking-widest text-gray-400">
        {label}
      </div>
    </div>
  );
}

function SocialButton({ text }: { text: string }) {
  return (
    <button className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 font-semibold transition hover:bg-black hover:text-white">
      {text}
    </button>
  );
}