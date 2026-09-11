import Link from "next/link";
import {
  Briefcase,
  Users,
  Sparkles,
  ArrowRight,
  Search,
  MapPin,
  Star,
  CheckCircle2,
  TrendingUp,
  Heart,
  MessageSquare,
  Scissors,
  Layers,
  Award,
  Clock,
  ChevronRight,
  ShieldCheck,
  Building,
  DollarSign,
  Download,
  Share2,
} from "lucide-react";

// Mock Data localized in Bengali
const stats = [
  { label: "সক্রিয় এমব্রয়ডারি পেশাদার", value: "১২,৫০০+", icon: Users, change: "এই মাসে +১৪% বৃদ্ধি" },
  { label: "পোস্টকৃত চাকরির বিজ্ঞপ্তি", value: "৪,২০০+", icon: Briefcase, change: "এই সপ্তাহে +২৫০টি নতুন" },
  { label: "ভেরিফাইড প্রতিষ্ঠান ও শপ", value: "৮৫০+", icon: Building, change: "এক্সপোর্ট ও বুটিক" },
  { label: "কারিগরদের মোট উপার্জিত আয়", value: "৳১.৮ কোটি+", icon: DollarSign, change: "সরাসরি ও নিরাপদ লেনদেন" },
];

const categories = [
  {
    title: "উইলকম ও মেশিন ডিজিটাইজিং",
    desc: "EMB, DST, PES ফাইল কনভার্সন, আন্ডারলে সেটিং ও নিখুঁত স্টিচ অপটিমাইজেশন।",
    jobs: "১২০+ চাকরি",
    artists: "৪৫০+ ডিজিটাইজার",
    icon: Scissors,
    tag: "সর্বাধিক চাহিদা",
  },
  {
    title: "কারচুপি ও ব্রাইডাল হ্যান্ডক্রাফট",
    desc: "আরি কাজ, জারদৌসি, এক্সক্লুসিভ লেহেঙ্গা ও নকশী কাঁথার শৈল্পিক কারুকাজ।",
    jobs: "৬৫+ চাকরি",
    artists: "৩২০+ কারিগর",
    icon: Sparkles,
    tag: "হস্তশিল্প",
  },
  {
    title: "ইন্ডাস্ট্রিয়াল গার্মেন্টস প্রোডাকশন",
    desc: "তাজিমা ও বারুদান মাল্টি-হেড মেশিন অপারেটর, ফ্লোর ইন-চার্জ ও কিউসি।",
    jobs: "৯৫+ চাকরি",
    artists: "২৮০+ অপারেটর",
    icon: Layers,
    tag: "ফ্যাক্টরি ডিরেক্ট",
  },
  {
    title: "৩ডি পাফ ও কাস্টম ব্যাজ",
    desc: "ক্যাপ এমব্রয়ডারি, স্পোর্টসওয়ার এম্বলেম, লেজার-কাট ও মিলিটারি ক্রেস্ট।",
    jobs: "৪৮+ চাকরি",
    artists: "১৯০+ বিশেষজ্ঞ",
    icon: Award,
    tag: "ভেক্টর ও স্টিচ",
  },
  {
    title: "বুটিক ও ফ্যাশন প্যাটার্ন",
    desc: "পাঞ্জাবি চেস্ট, সালোয়ার কামিজ ও শাড়ির এক্সক্লুসিভ ডিজাইনার লেআউট।",
    jobs: "৮২+ চাকরি",
    artists: "৩৯০+ ডিজাইনার",
    icon: TrendingUp,
    tag: "ফ্যাশন হাব",
  },
  {
    title: "মেশিন টেকনিশিয়ান ও পার্টস",
    desc: "এমব্রয়ডারি মেশিন মেরামত, ইলেকট্রনিক্স সার্ভিসিং, সেন্সর ও খুচরা যন্ত্রাংশ।",
    jobs: "৩৪+ চাকরি",
    artists: "১১০+ টেকনিশিয়ান",
    icon: ShieldCheck,
    tag: "টেকনিক্যাল",
  },
];

const featuredJobs = [
  {
    id: "job-1",
    title: "সিনিয়র উইলকম ES ডিজিটাইজার (গার্মেন্টস এক্সপোর্ট)",
    company: "এপেক্স টেক্সটাইল অ্যান্ড অ্যাপারেলস",
    location: "গাজীপুর, ঢাকা (অন-সাইট)",
    type: "ফুল-টাইম",
    salary: "৳৪৫,০০০ - ৳৬০,০০০ / মাস",
    skills: ["Wilcom e4.5", "DST", "Knitwear", "Sequins"],
    posted: "২ ঘণ্টা আগে",
    urgent: true,
  },
  {
    id: "job-2",
    title: "প্রধান কারচুপি ও জরি কারিগর মাস্টার",
    company: "অনুখী হট কুচিউর",
    location: "গুলশান-২, ঢাকা",
    type: "ফুল-টাইম",
    salary: "৳৩৫,০০০ - ৳৫০,০০০ / মাস",
    skills: ["Bridal Zari", "Aari Work", "Nakshi", "Silk"],
    posted: "৫ ঘণ্টা আগে",
    urgent: false,
  },
  {
    id: "job-3",
    title: "ফ্রিল্যান্স ৩ডি পাফ ক্যাপ প্যাচ স্পেশালিস্ট",
    company: "গ্লোবাল স্টিচ স্টুডিও",
    location: "রিমোট (বাংলাদেশ / গ্লোবাল)",
    type: "ফ্রিল্যান্স",
    salary: "৳১,২০০ - ৳২,৫০০ / ডিজাইন",
    skills: ["3D Foam", "Tajima DST", "Cap Hooping", "Vector"],
    posted: "১ দিন আগে",
    urgent: true,
  },
  {
    id: "job-4",
    title: "তাজিমা ২০-হেড মেশিন শিফট ইন-চার্জ",
    company: "বেক্সি এমব্রয়ডারি জোন",
    location: "সাভার ইপিজেড, ঢাকা",
    type: "ফুল-টাইম",
    salary: "৳৪০,০০০ - ৳৫৫,০০০ / মাস",
    skills: ["Tajima TMAR", "Quality Control", "Thread Tension", "Shifts"],
    posted: "২ দিন আগে",
    urgent: false,
  },
];

const featuredDesigners = [
  {
    name: "মোহাম্মদ রফিকুল ইসলাম",
    role: "মাস্টার উইলকম ডিজিটাইজার",
    experience: "১২+ বছরের অভিজ্ঞতা",
    location: "ঢাকা, বাংলাদেশ",
    rating: "৪.৯",
    reviews: "১৪৮     ",
    rate: "৳১,০০০ / ডিজাইন",
    specialty: ["Wilcom e4.5", "Applique", "Jacket Backs"],
    badge: "টপ রেটেড প্রো",
    avatarBg: "bg-blue-600",
  },
  {
    name: "নুসরাত জাহান তানহা",
    role: "লাক্সারি কারচুপি ও নকশী ডিজাইনার",
    experience: "৮ বছরের অভিজ্ঞতা",
    location: "চট্টগ্রাম",
    rating: "৫.০",
    reviews: "৯৪",
    rate: "৳২৫,০০০ / প্রজেক্ট",
    specialty: ["Bridal Couture", "Aari Needle", "Custom Saree"],
    badge: "মাস্টার কারিগর",
    avatarBg: "bg-emerald-600",
  },
  {
    name: "কামরুল হাসান সোহেল",
    role: "ইন্ডাস্ট্রিয়াল ৩ডি পাফ ও প্যাচ এক্সপার্ট",
    experience: "৬ বছরের অভিজ্ঞতা",
    location: "নারায়ণগঞ্জ",
    rating: "৪.৯",
    reviews: "১১২",
    rate: "৳৮০০ / ডিজাইন",
    specialty: ["Sports Crests", "Cap Stitch", "Laser Cut"],
    badge: "দ্রুত ২ ঘণ্টায় ডেলিভারি",
    avatarBg: "bg-purple-600",
  },
  {
    name: "তাসনিম রহমান",
    role: "বুটিক ও পাঞ্জাবি প্যাটার্ন ডিজাইনার",
    experience: "৫ বছরের অভিজ্ঞতা",
    location: "সিলেট",
    rating: "৪.৮",
    reviews: "৭৬",
    rate: "৳১,৫০০ / প্যাটার্ন",
    specialty: ["Panjabi Chest", "Kurti Neck", "Georgette"],
    badge: "রাইজিং ট্যালেন্ট",
    avatarBg: "bg-amber-600",
  },
];

const communityPosts = [
  {
    id: "post-1",
    author: "মাহফুজুর রহমান",
    authorRole: "সিনিয়র ডিজিটাইজার",
    title: "টিপস: পিকে পোলো শার্টে হাই-স্পিড তাজিমা মেশিনে সুতা ছেঁড়া রোধ করার সহজ সমাধান",
    category: "টেকনিক্যাল গাইড",
    likes: "৬৪",
    comments: "২৩",
    time: "৩ ঘণ্টা আগে",
    tag: "উইলকম টিপস",
  },
  {
    id: "post-2",
    author: "ফাতেমা আক্তার",
    authorRole: "হস্তশিল্পী",
    title: "✨ রয়েল গোল্ড জরি নকশী ব্রাইডাল বর্ডার – ৮৫ ঘণ্টার নিখুঁত হাতের কাজের সমাপ্তি",
    category: "শোকেস",
    likes: "১৮২",
    comments: "৪৫",
    time: "গতকাল",
    tag: "হাতের এমব্রয়ডারি",
  },
  {
    id: "post-3",
    author: "স্টিচল্যাব বিডি",
    authorRole: "স্টুডিও",
    title: "🎁 ফ্রি EMB ও DST ফাইল: ঈদ পাঞ্জাবি কালেকশন ২০২৬ এর জন্য এক্সক্লুসিভ ফ্লোরাল মোটিফ",
    category: "ফ্রি এসেট",
    likes: "৩১০",
    comments: "৮৯",
    time: "২ দিন আগে",
    tag: "ফ্রি স্টিচ ফাইল",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-zinc-900 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-gradient-to-b from-zinc-50 via-white to-white px-6 py-16 lg:px-8 lg:py-24">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-100/60 via-purple-100/60 to-emerald-100/60 blur-3xl" />

        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold text-zinc-800 shadow-xs">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            🇧🇩 বাংলাদেশের ১ম নিবেদিত এমব্রয়ডারি প্ল্যাটফর্ম
          </div>

          {/* Hero Heading */}
          <h1 className="mt-6 text-4xl font-black tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl leading-[1.15]">
            সুঁই-সুতোর কারুকাজ থেকে ডিজিটাল স্টিচ —{" "}
            <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">
              সব সমাধান এক ঠিকানায়
            </span>
          </h1>

          {/* Hero Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-600 sm:text-lg leading-relaxed">
            অভিজ্ঞ উইলকম ডিজিটাইজার খুঁজুন, ফ্যাক্টরির জন্য দক্ষ অপারেটর নিয়োগ দিন কিংবা ঘরে বসেই সেরা এমব্রয়ডারি কাজের সুযোগ গ্রহণ করুন। ১২,০০০+ পেশাদারের নির্ভরযোগ্য নেটওয়ার্ক।
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/jobs"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 text-sm font-bold text-white shadow-md transition hover:bg-zinc-800 sm:w-auto"
            >
              <Briefcase size={17} />
              চাকরি খুঁজুন
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/businesses"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 text-sm font-bold text-zinc-900 transition hover:bg-zinc-100 sm:w-auto"
            >
              <Building size={17} />
              ব্যবসা ডিরেক্টরি দেখুন
            </Link>
            <Link
              href="/register"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 px-6 text-sm font-bold text-zinc-800 transition hover:bg-zinc-200 sm:w-auto"
            >
              <Users size={17} />
              কমিউনিটিতে যোগ দিন
            </Link>
          </div>

          {/* Quick Search Bar */}
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-zinc-200 bg-white p-2.5 shadow-xl shadow-zinc-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex flex-1 items-center">
                <Search size={18} className="absolute left-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="যেমন: Wilcom e4 ডিজিটাইজার, কারচুপি মাস্টার, তাজিমা অপারেটর..."
                  className="w-full rounded-xl bg-transparent py-2.5 pl-10 pr-3 text-sm text-zinc-950 placeholder:text-zinc-400 focus:outline-none"
                />
              </div>

              <div className="h-6 w-[1px] bg-zinc-200 hidden sm:block" />

              <select className="rounded-xl border-0 bg-transparent py-2.5 px-3 text-sm font-medium text-zinc-700 focus:outline-none">
                <option value="">সকল ক্যাটাগরি</option>
                <option value="digitizing">উইলকম ডিজিটাইজিং</option>
                <option value="karchupi">কারচুপি ও হস্তশিল্প</option>
                <option value="production">গার্মেন্টস ফ্যাক্টরি</option>
                <option value="patch">৩ডি পাফ ও প্যাচ</option>
                <option value="boutique">ফ্যাশন ও বুটিক</option>
              </select>

              <Link
                href="/jobs"
                className="flex items-center justify-center rounded-xl bg-zinc-950 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-zinc-800"
              >
                সন্ধান করুন
              </Link>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-zinc-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> ভেরিফাইড পোশাক কারখানা
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> নিরাপদ পেমেন্ট ও চুক্তি
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" /> ১০০% বাংলাদেশ কেন্দ্রিক
            </span>
          </div>
        </div>
      </section>

      {/* 2. COMMUNITY STATISTICS */}
      <section className="border-b border-zinc-200 bg-zinc-50/70 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition hover:border-zinc-400"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-500">
                      {item.label}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
                      <Icon size={16} />
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-950 sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-emerald-700">
                    {item.change}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="border-b border-zinc-200 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                দক্ষতা ও বিভাগ অনুযায়ী খুঁজুন
              </span>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl text-zinc-950">
                জনপ্রিয় এমব্রয়ডারি ক্যাটাগরি
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                আপনার প্রয়োজন অনুযায়ী নির্দিষ্ট সেক্টরের সেরা কারিগর ও কাজের সুযোগ খুঁজে নিন।
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1 text-sm font-bold text-zinc-950 hover:underline"
            >
              সকল ক্যাটাগরি দেখুন <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 transition group-hover:bg-zinc-950 group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-bold text-zinc-700">
                        {cat.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-zinc-950">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-semibold text-zinc-500">
                    <span>{cat.jobs}</span>
                    <span>•</span>
                    <span>{cat.artists}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FEATURED JOBS */}
      <section className="border-b border-zinc-200 bg-zinc-50/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                সেরা ক্যারিয়ারের সুযোগ
              </span>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl text-zinc-950">
                শীর্ষ এমব্রয়ডারি চাকরির বিজ্ঞপ্তি
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                ভেরিফাইড পোশাক প্রস্তুতকারক, এক্সপোর্ট ফ্যাক্টরি ও বুটিক হাউজে সরাসরি আবেদন করুন।
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100"
            >
              সকল চাকরি দেখুন <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-400"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-zinc-950">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-200/60">
                            জরুরি নিয়োগ
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-semibold text-zinc-600">
                        {job.company}
                      </p>
                    </div>
                    <span className="rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-bold text-zinc-700">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1 font-medium">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-zinc-950">
                      <DollarSign size={14} />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock size={14} />
                      {job.posted}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs">
                  <span className="text-zinc-500 font-medium">EMBOBD প্রোফাইল দিয়ে সরাসরি আবেদন করুন</span>
                  <Link
                    href="/jobs"
                    className="flex items-center gap-1 font-bold text-zinc-950 underline underline-offset-4 hover:opacity-80"
                  >
                    বিস্তারিত দেখুন
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED ARTISTS & DESIGNERS */}
      <section className="border-b border-zinc-200 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                শীর্ষ ট্যালেন্ট
              </span>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl text-zinc-950">
                অভিজ্ঞ ডিজিটাইজার ও দক্ষ কারিগর
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                ফ্রিল্যান্স বা ফুল-টাইম কাজের জন্য সেরা ভেরিফাইড পেশাদারদের হায়ার করুন।
              </p>
            </div>
            <Link
              href="/communities"
              className="inline-flex items-center gap-1 text-sm font-bold text-zinc-950 hover:underline"
            >
              সকল ট্যালেন্ট দেখুন <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDesigners.map((designer, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-400"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl font-black text-white shadow-xs ${designer.avatarBg}`}
                    >
                      {designer.name.charAt(0)}
                    </div>
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200/60">
                      {designer.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-zinc-950">
                    {designer.name}
                  </h3>
                  <p className="text-xs font-semibold text-zinc-600">
                    {designer.role}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                    <span className="flex items-center gap-1 font-bold text-zinc-950">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {designer.rating}
                    </span>
                    <span>({designer.reviews} রিভিউ)</span>
                    <span>•</span>
                    <span>{designer.experience}</span>
                  </div>

                  <p className="mt-3 text-xs font-bold text-zinc-950">
                    রেট: <span className="font-normal text-zinc-600">{designer.rate}</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {designer.specialty.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <Link
                    href="/communities"
                    className="flex w-full items-center justify-center rounded-xl bg-zinc-100 py-2.5 text-xs font-bold text-zinc-900 transition hover:bg-zinc-950 hover:text-white"
                  >
                    পোর্টফোলিও ও হায়ার করুন
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRENDING COMMUNITY POSTS & SHOWCASE */}
      <section className="border-b border-zinc-200 bg-zinc-50/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                কমিউনিটি ফিড ও রিসোর্স
              </span>
              <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl text-zinc-950">
                জনপ্রিয় আলোচনা ও ফ্রি স্টিচ ফাইল
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                নতুন ডিজিটাইজিং কৌশল শিখুন, ফ্রি EMB/DST ফাইল ডাউনলোড করুন এবং আপনার কাজ শেয়ার করুন।
              </p>
            </div>
            <Link
              href="/communities"
              className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100"
            >
              কমিউনিটিতে যোগ দিন <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-400"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-bold text-zinc-700">
                      {post.tag}
                    </span>
                    <span className="text-[11px] text-zinc-400">{post.time}</span>
                  </div>

                  <h3 className="mt-3 text-sm font-bold leading-snug text-zinc-950 hover:underline">
                    <Link href="/communities">{post.title}</Link>
                  </h3>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-950">
                        {post.author}
                      </p>
                      <p className="text-[10px] text-zinc-500">{post.authorRole}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-rose-500 cursor-pointer font-medium">
                      <Heart size={14} /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer font-medium">
                      <MessageSquare size={14} /> {post.comments}
                    </span>
                  </div>
                  <Link
                    href="/communities"
                    className="flex items-center gap-1 font-bold text-zinc-950 hover:underline"
                  >
                    পড়ুন ও মতামত দিন <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-16 lg:py-24 border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              সহজ ৩টি ধাপ
            </span>
            <h2 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl text-zinc-950">
              যেভাবে কাজ করে EMBOBD
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600">
              বাংলাদেশের পোশাক ও এমব্রয়ডারি শিল্পের বাস্তব চাহিদাকে কেন্দ্র করে বিশেষভাবে তৈরি।
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white">
                ১
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-950">
                চাকরির বিজ্ঞপ্তি দিন বা প্রোফাইল তৈরি করুন
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                নিয়োগকারীরা নির্দিষ্ট ডিজিটাইজিং বা ফ্যাক্টরি কাজের বিবরণ পোস্ট করুন। প্রফেশনালরা পূর্ববর্তী কাজের ছবি ও পোর্টফোলিও আপলোড করুন।
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white">
                ২
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-950">
                সরাসরি চ্যাট করুন ও দরদাম ঠিক করুন
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                কাজের বিস্তারিত ও ফাইল ফরম্যাট (DST, EMB, PES) যাচাই করুন এবং পারস্পরিক বোঝাপড়ার মাধ্যমে রেট ও ডেলিভারি সময় নির্ধারণ করুন।
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white">
                ৩
              </div>
              <h3 className="mt-4 text-base font-bold text-zinc-950">
                নিখুঁত স্টিচে প্রজেক্ট ডেলিভারি দিন ও আয় বাড়ান
              </h3>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
                সফলভাবে কাজ সম্পন্ন করুন, পেমেন্ট গ্রহণ করুন এবং ক্লায়েন্টের কাছ থেকে রিভিউ নিয়ে দীর্ঘমেয়াদী ব্যবসায়িক সম্পর্ক গড়ুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-zinc-950 px-8 py-14 text-center text-white shadow-2xl sm:px-16">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            আপনার এমব্রয়ডারি ক্যারিয়ার বা ব্যবসাকে নতুন উচ্চতায় নিতে প্রস্তুত?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-300">
            আজই যুক্ত হোন হাজারো দক্ষ ডিজিটাইজার, বুটিক ওনার, কারখানা কর্তৃপক্ষ ও ফ্যাশন ডিজাইনারদের সাথে।
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 sm:w-auto"
            >
              ফ্রি একাউন্ট খুলুন
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/jobs"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-transparent px-6 text-sm font-bold text-white transition hover:bg-zinc-900 sm:w-auto"
            >
              চাকরির বিজ্ঞপ্তি দেখুন
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
