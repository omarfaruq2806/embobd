import Link from "next/link";
import { Sparkles, Heart, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50/70">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-zinc-950">
                EMBO<span className="font-light text-zinc-600">BD</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-600">
              বাংলাদেশের এমব্রয়ডারি শিল্পী, উইলকম ডিজিটাইজার, কারখানা ও ফ্যাশন ব্র্যান্ডগুলোকে এক ছাদের নিচে যুক্ত করার সর্ববৃহৎ ডিজিটাল মার্কেটপ্লেস ও কমিউনিটি।
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-xl px-3 py-1.5 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ১২,০০০+ এমব্রয়ডারি পেশাদার ও কারখানা যুক্ত আছেন
            </div>
          </div>

          {/* For Talent */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              কারিগর ও ডিজিটাইজার
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  নতুন চাকরির সুযোগ
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  কাজের পোর্টফোলিও শোকেস
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  ফ্রি ডিজাইন ও স্টিচ ফাইল
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  ফ্রিল্যান্সার হিসেবে যোগ দিন
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              ফ্যাক্টরি ও নিয়োগকারী
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/jobs"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  চাকরির বিজ্ঞাপন দিন
                </Link>
              </li>
              <li>
                <Link
                  href="/businesses"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  ফ্যাক্টরি ও শপ ডিরেক্টরি
                </Link>
              </li>
              <li>
                <Link
                  href="/businesses/create"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  আপনার ব্যবসা তালিকাভুক্ত করুন
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  কর্পোরেট সহায়তা
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-950">
              প্ল্যাটফর্ম
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  আমাদের লক্ষ্য ও গল্প
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  কমিউনিটি নীতিমালা
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  হেল্পডেস্ক ও এফএকিউ (FAQ)
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-zinc-600 hover:text-black font-medium transition"
                >
                  গোপনীয়তা ও শর্তাবলী
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-8 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} EMBOBD। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1 font-medium text-zinc-600">
            বাংলাদেশের এমব্রয়ডারি শিল্প ও পোশাক প্রস্তুতকারকদের ক্ষমতায়নে নিবেদিত।
          </p>
        </div>
      </div>
    </footer>
  );
}
