import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-zinc-50/50 dark:border-white/10 dark:bg-zinc-950/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-black dark:text-white">
                EMBO<span className="font-light">BD</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
              Bangladesh&apos;s leading marketplace and community for embroidery
              artists, digitizers, manufacturers, and fashion businesses.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
              Connecting 12,000+ embroidery professionals
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white">
              For Talent
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Showcase Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Free Stitch Files
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Join as Freelancer
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white">
              For Employers
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Hire Digitizers
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Factory Sourcing
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Enterprise Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  About EMBOBD
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Community Rules
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                >
                  Privacy & Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-8 text-xs text-zinc-500 dark:border-white/5 dark:text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} EMBOBD. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Empowering embroidery craftsmen & fashion creators across Bangladesh.
          </p>
        </div>
      </div>
    </footer>
  );
}
