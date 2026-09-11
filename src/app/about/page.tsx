import Link from "next/link";
import {
  Sparkles,
  Scissors,
  Layers,
  Building2,
  Users,
  Award,
  Globe2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Target,
  HeartHandshake,
  Workflow,
  Factory,
} from "lucide-react";

export const metadata = {
  title: "আমাদের সম্পর্কে | EMBOBD - বাংলাদেশের এমব্রয়ডারি ইকোসিস্টেম",
  description:
    "EMBOBD সম্পর্কে জানুন — বাংলাদেশের এমব্রয়ডারি, টেক্সটাইল ও পোশাক প্রস্তুতকারক শিল্পের জন্য নিবেদিত শীর্ষ ডিজিটাল মার্কেটপ্লেস ও কমিউনিটি।",
};

const STATS = [
  { label: "সক্রিয় পেশাদার", value: "১২,৫০০+", desc: "পাঞ্চার, ডিজিটাইজার ও মেশিন অপারেটর" },
  { label: "চাকরির বিজ্ঞপ্তি", value: "৪,২০০+", desc: "ফুল-টাইম, চুক্তিভিত্তিক ও ফ্রিল্যান্স" },
  { label: "ভেরিফাইড প্রতিষ্ঠান", value: "৮৫০+", desc: "ফ্যাক্টরি, শপ ও কাঁচামাল ডিলার" },
  { label: "পৌঁছেছি জেলায়", value: "৬৪টি", desc: "সারাদেশব্যাপী নেটওয়ার্ক" },
];

const CORE_PILLARS = [
  {
    icon: Scissors,
    title: "বিশেষায়িত ট্যালেন্ট মার্কেটপ্লেস",
    desc: "দক্ষ উইলকম ডিজিটাইজার, ৩ডি পাফ এক্সপার্ট, তাজিমা ও বারুদান মেশিন টেকনিশিয়ানদের সাথে সরাসরি পোশাক কারখানা ও বুটিক হাউজের মেলবন্ধন।",
  },
  {
    icon: Building2,
    title: "সমন্বিত ব্যবসা ও কারখানা ডিরেক্টরি",
    desc: "বাংলাদেশের সকল জেলার অনুমোদিত এমব্রয়ডারি কারখানা, সুতা ও মেশিনারিজ ডিলার, খুচরা যন্ত্রাংশ এবং কাঁচামাল সরবরাহকারীদের সমৃদ্ধ ডাটাবেজ।",
  },
  {
    icon: Cpu,
    title: "প্রযুক্তিগত জ্ঞান ও টিউটোরিয়াল ফোরাম",
    desc: "মাস্টারক্লাস গাইড, স্টিচ অপটিমাইজেশন, থ্রেড-টেনশন সমাধান এবং আধুনিক CAD/CAM ডিজিটাইজিং কলাকৌশল শেখার উন্মুক্ত কমিউনিটি।",
  },
  {
    icon: ShieldCheck,
    title: "নিরাপত্তা ও শতভাগ বিশ্বাসযোগ্যতা",
    desc: "প্রতিটি চাকরির বিজ্ঞপ্তি, কোম্পানি প্রোফাইল এবং ব্যবসায়িক তালিকা অভিজ্ঞ মডারেটরদের দ্বারা যাচাই করে সঠিক সুযোগ নিশ্চিত করা হয়।",
  },
];

const VALUES = [
  {
    title: "কারিগর ও টেকনিশিয়ানদের পেশাগত মর্যাদা",
    desc: "আমরা বাংলাদেশি ডিজিটাইজার ও অপারেটরদের বিশেষ দক্ষতার মূল্যায়ন করি এবং তাদের ন্যায্য পারিশ্রমিক ও ক্যারিয়ার বৃদ্ধির সুযোগ নিশ্চিত করি।",
  },
  {
    title: "আধুনিক প্রযুক্তি ও আন্তর্জাতিক মান",
    desc: "হাই-স্পিড মাল্টি-হেড মেশিনারি, অটোমেশন এবং বিশ্বমানের পোশাক রপ্তানি স্ট্যান্ডার্ড অনুসরণে শিল্পের সকলকে উৎসাহিত করা।",
  },
  {
    title: "সবার জন্য উন্মুক্ত ও সহজ সেবা",
    desc: "গ্রামের ক্ষুদ্র কারচুপি শিল্পী থেকে শুরু করে শত কোটি টাকার কম্পোজিট টেক্সটাইল মিল — সবার জন্য সহজ ও সমান ডিজিটাল সুযোগ।",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pb-24 font-sans text-zinc-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50/70 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-900 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>EMBOBD পরিচিতি</span>
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl leading-tight">
              বাংলাদেশের এমব্রয়ডারি শিল্পকে আধুনিক ডিজিটাল রূপান্তরে
            </h1>

            <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">
              EMBOBD হলো দেশের প্রথম নিবেদিত প্ল্যাটফর্ম যা দক্ষ উইলকম ডিজিটাইজার, অভিজ্ঞ কারিগর, পোশাক প্রস্তুতকারক কারখানা এবং কাঁচামাল সরবরাহকারীদের এক ছাদের নিচে যুক্ত করেছে।
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORM NUMBERS */}
      <section className="border-b border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((s, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6 text-center"
              >
                <p className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm font-bold text-zinc-800">{s.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="py-20 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              আমাদের সেবাসমূহ
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              চারটি স্তম্ভে গড়ে উঠেছে EMBOBD
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-600 sm:text-base">
              গার্মেন্টস ও বুটিক শিল্পের প্রতিটি স্টেকহোল্ডারের প্রয়োজন মেটাতে আমাদের সমন্বিত ব্যবস্থা।
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            {CORE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-xs transition hover:border-zinc-400"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-zinc-950">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="py-20 bg-zinc-50/60 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              আমাদের মূল দর্শন ও অঙ্গীকার
            </h2>
            <p className="mt-3 text-sm text-zinc-600 sm:text-base">
              আমরা কেবল একটি ওয়েবসাইট নই, এটি দেশের লক্ষাধিক এমব্রয়ডারি পেশাদারদের একটি ঐক্যবদ্ধ পরিবার।
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {VALUES.map((val, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-xs font-bold text-zinc-900">
                  {idx + 1}
                </div>
                <h3 className="mt-4 text-base font-bold text-zinc-950">{val.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-zinc-950 p-10 text-center text-white sm:p-16">
            <h2 className="text-2xl font-black tracking-tight sm:text-4xl">
              বাংলাদেশের এমব্রয়ডারি বিপ্লবে অংশ নিন
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-300">
              আপনি কি একজন দক্ষ কারিগর, ডিজিটাইজার কিংবা ফ্যাক্টরি মালিক? আজই বিনামূল্যে একাউন্ট খুলে আপনার যাত্রা শুরু করুন।
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-bold text-zinc-950 transition hover:bg-zinc-200"
              >
                <span>একাউন্ট খুলুন</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-transparent px-6 py-3 text-xs font-bold text-white transition hover:bg-zinc-900"
              >
                চাকরির বিজ্ঞপ্তি দেখুন
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}