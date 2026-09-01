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

// Mock Data
const stats = [
  { label: "Active Professionals", value: "12,500+", icon: Users, change: "+14% this month" },
  { label: "Embroidery Jobs Posted", value: "4,200+", icon: Briefcase, change: "+250 new this week" },
  { label: "Verified Businesses", value: "850+", icon: Building, change: "Export & Boutique" },
  { label: "Freelancer Earnings", value: "৳18M+", icon: DollarSign, change: "Paid securely" },
];

const categories = [
  {
    title: "Wilcom & Machine Digitizing",
    desc: "EMB, DST, PES conversion, underlay settings & stitch optimization.",
    jobs: "120+ Jobs",
    artists: "450+ Digitizers",
    icon: Scissors,
    tag: "High Demand",
  },
  {
    title: "Karchupi & Bridal Handcraft",
    desc: "Aari work, Zardosi, Nakshi Kantha, and luxury couture embroidery.",
    jobs: "65+ Jobs",
    artists: "320+ Artisans",
    icon: Sparkles,
    tag: "Artisanal",
  },
  {
    title: "Industrial Garment Production",
    desc: "Multi-head Tajima & Barudan machine operators, shift masters, and QC.",
    jobs: "95+ Jobs",
    artists: "280+ Operators",
    icon: Layers,
    tag: "Factory Direct",
  },
  {
    title: "3D Puff & Custom Badges",
    desc: "Cap embroidery, sportswear emblems, laser-cut & military crests.",
    jobs: "48+ Jobs",
    artists: "190+ Specialists",
    icon: Award,
    tag: "Vector & Stitch",
  },
  {
    title: "Boutique & Fashion Patterns",
    desc: "Kameez, Panjabi, Saree, and designer wear embroidery layouts.",
    jobs: "82+ Jobs",
    artists: "390+ Designers",
    icon: TrendingUp,
    tag: "Fashion Hub",
  },
  {
    title: "Machine Technicians & Parts",
    desc: "Embroidery machinery maintenance, electronics repair & calibration.",
    jobs: "34+ Jobs",
    artists: "110+ Experts",
    icon: ShieldCheck,
    tag: "Technical",
  },
];

const featuredJobs = [
  {
    id: "job-1",
    title: "Senior Wilcom ES Digitizer (Export Garments)",
    company: "Apex Textile & Apparels",
    location: "Gazipur, Dhaka (On-site)",
    type: "Full-Time",
    salary: "৳45,000 - ৳60,000 / mo",
    skills: ["Wilcom e4.5", "DST", "Knitwear", "Sequins"],
    posted: "2 hours ago",
    urgent: true,
  },
  {
    id: "job-2",
    title: "Lead Karchupi & Zari Master Craftsman",
    company: "Anokhi Haute Couture",
    location: "Gulshan-2, Dhaka",
    type: "Full-Time",
    salary: "৳35,000 - ৳50,000 / mo",
    skills: ["Bridal Zari", "Aari Work", "Nakshi", "Silk"],
    posted: "5 hours ago",
    urgent: false,
  },
  {
    id: "job-3",
    title: "Freelance 3D Puff Cap Patch Specialist",
    company: "Global Stitch Studio",
    location: "Remote (Bangladesh / Global)",
    type: "Freelance",
    salary: "৳1,200 - ৳2,500 / design",
    skills: ["3D Foam", "Tajima DST", "Cap Hooping", "Vector"],
    posted: "1 day ago",
    urgent: true,
  },
  {
    id: "job-4",
    title: "Tajima 20-Head Machine Shift In-Charge",
    company: "Bexi Embroidery Zone",
    location: "Savar EPZ, Dhaka",
    type: "Full-Time",
    salary: "৳40,000 - ৳55,000 / mo",
    skills: ["Tajima TMAR", "Quality Control", "Thread Tension", "Shifts"],
    posted: "2 days ago",
    urgent: false,
  },
];

const featuredDesigners = [
  {
    name: "Mohammad Rafiqul Islam",
    role: "Master Wilcom Digitizer",
    experience: "12+ Years Exp",
    location: "Dhaka, Bangladesh",
    rating: "4.9",
    reviews: 148,
    rate: "৳1,000 / design",
    specialty: ["Wilcom e4.5", "Applique", "Jacket Backs"],
    badge: "Top Rated Pro",
    avatarBg: "bg-blue-600",
  },
  {
    name: "Nusrat Jahan Tanha",
    role: "Luxury Karchupi & Nakshi Designer",
    experience: "8 Years Exp",
    location: "Chittagong",
    rating: "5.0",
    reviews: 94,
    rate: "৳25,000 / project",
    specialty: ["Bridal Couture", "Aari Needle", "Custom Saree"],
    badge: "Master Artisan",
    avatarBg: "bg-emerald-600",
  },
  {
    name: "Kamrul Hasan Shohel",
    role: "Industrial 3D Puff & Patch Expert",
    experience: "6 Years Exp",
    location: "Narayanganj",
    rating: "4.9",
    reviews: 112,
    rate: "৳800 / design",
    specialty: ["Sports Crests", "Cap Stitch", "Laser Cut"],
    badge: "Fast 2h Delivery",
    avatarBg: "bg-purple-600",
  },
  {
    name: "Tasnim Rahman",
    role: "Boutique & Panjabi Pattern Designer",
    experience: "5 Years Exp",
    location: "Sylhet",
    rating: "4.8",
    reviews: 76,
    rate: "৳1,500 / pattern",
    specialty: ["Panjabi Chest", "Kurti Neck", "Georgette"],
    badge: "Rising Talent",
    avatarBg: "bg-amber-600",
  },
];

const communityPosts = [
  {
    id: "post-1",
    author: "Mahfuzur Rahman",
    authorRole: "Senior Digitizer",
    title: "Tips: Eliminating thread breakage on high-speed Tajima machines for pique polo shirts",
    category: "Technical Guide",
    likes: 64,
    comments: 23,
    time: "3 hours ago",
    tag: "Wilcom Tip",
  },
  {
    id: "post-2",
    author: "Fatima Akter",
    authorRole: "Artisanal Crafter",
    title: "✨ Royal Gold Zari Nakshi Bridal Border – Finished after 85 hours of meticulous handwork",
    category: "Showcase",
    likes: 182,
    comments: 45,
    time: "Yesterday",
    tag: "Hand Embroidery",
  },
  {
    id: "post-3",
    author: "StitchLab BD",
    authorRole: "Studio",
    title: "🎁 Free EMB & DST File: Geometric Floral Motif for Eid Panjabi Collection 2026",
    category: "Free Asset",
    likes: 310,
    comments: 89,
    time: "2 days ago",
    tag: "Free Stitch File",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-black dark:bg-black dark:text-white">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-black/10 bg-gradient-to-b from-zinc-50 via-white to-white px-6 py-20 dark:border-white/10 dark:from-zinc-950 dark:via-black dark:to-black lg:px-8 lg:py-28">
        {/* Subtle Background Glow Accent */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-200/20 via-sky-200/30 to-emerald-200/20 blur-3xl dark:from-amber-900/10 dark:via-sky-900/10 dark:to-emerald-900/10" />

        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold text-zinc-800 shadow-xs dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-200">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Bangladesh&apos;s #1 Dedicated Embroidery Hub
          </div>

          {/* Hero Heading */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Where Embroidery Meets{" "}
            <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent dark:from-amber-400 dark:via-rose-400 dark:to-indigo-400">
              Opportunity
            </span>
          </h1>

          {/* Hero Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            The premier platform connecting embroidery digitizers, artisanal craftsmen,
            garment manufacturers, and fashion boutiques. Post jobs, hire top talent,
            showcase your creative portfolio, and share stitch resources.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/jobs"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:bg-white dark:text-black sm:w-auto"
            >
              <Briefcase size={17} />
              Find Jobs
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/register"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-6 text-sm font-semibold text-black transition hover:bg-zinc-100 dark:border-white/20 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 sm:w-auto"
            >
              <Users size={17} />
              Join the Community
            </Link>
          </div>

          {/* Quick Search Bar */}
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-black/10 bg-white p-2.5 shadow-lg shadow-black/5 dark:border-white/15 dark:bg-zinc-900/90 dark:shadow-none">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex flex-1 items-center">
                <Search size={18} className="absolute left-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search Wilcom digitizer, Karchupi master, Tajima operator..."
                  className="w-full rounded-xl bg-transparent py-2.5 pl-10 pr-3 text-sm text-black placeholder:text-zinc-400 focus:outline-none dark:text-white"
                />
              </div>

              <div className="h-6 w-[1px] bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

              <select className="rounded-xl border-0 bg-transparent py-2.5 px-3 text-sm text-zinc-600 focus:outline-none dark:text-zinc-300 dark:bg-zinc-900">
                <option value="">All Categories</option>
                <option value="digitizing">Wilcom Digitizing</option>
                <option value="karchupi">Karchupi & Handcraft</option>
                <option value="production">Garment Factory</option>
                <option value="patch">3D Puff & Patches</option>
                <option value="boutique">Fashion & Boutique</option>
              </select>

              <Link
                href="/jobs"
                className="flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                Search
              </Link>
            </div>
          </div>

          {/* Trust Highlights */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Verified Apparel Factories
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> Secure Milestones & Pay
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" /> 100% Bangladesh Focused
            </span>
          </div>
        </div>
      </section>

      {/* 2. COMMUNITY STATISTICS */}
      <section className="border-b border-black/10 bg-zinc-50/50 py-12 dark:border-white/10 dark:bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-black/5 bg-white p-5 shadow-xs transition hover:border-black/20 dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-white/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {item.label}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/5 text-black dark:bg-white/10 dark:text-white">
                      <Icon size={16} />
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-bold tracking-tight text-black dark:text-white sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {item.change}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. POPULAR CATEGORIES */}
      <section className="border-b border-black/10 py-16 lg:py-24 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Explore by Specialty
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-black dark:text-white">
                Popular Categories
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Discover embroidery opportunities and specialists across different sectors.
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:underline dark:text-white"
            >
              Browse All Categories <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-black/30 hover:shadow-md dark:border-white/10 dark:bg-zinc-900/40 dark:hover:border-white/30"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-black transition group-hover:bg-black group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {cat.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-black dark:text-white">
                      {cat.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 text-xs font-medium text-zinc-500 dark:border-white/5 dark:text-zinc-400">
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
      <section className="border-b border-black/10 bg-zinc-50/40 py-16 lg:py-24 dark:border-white/10 dark:bg-zinc-950/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Opportunities
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-black dark:text-white">
                Featured Embroidery Jobs
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Apply directly to verified employers, garment factories, and fashion studios.
              </p>
            </div>
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-100 dark:border-white/20 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
            >
              View All Jobs <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-xs transition hover:border-black/25 dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-white/25"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-black dark:text-white">
                          {job.title}
                        </h3>
                        {job.urgent && (
                          <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-300">
                        {job.company}
                      </p>
                    </div>
                    <span className="rounded-xl border border-black/10 px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:border-white/10 dark:text-zinc-300">
                      {job.type}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-black dark:text-white">
                      <DollarSign size={14} />
                      {job.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {job.posted}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/5">
                  <span className="text-xs text-zinc-500">Quick Apply with EMBOBD Profile</span>
                  <Link
                    href="/jobs"
                    className="flex items-center gap-1 text-xs font-bold text-black underline underline-offset-4 hover:opacity-80 dark:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURED ARTISTS & DESIGNERS */}
      <section className="border-b border-black/10 py-16 lg:py-24 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Top Talent
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-black dark:text-white">
                Featured Artists & Digitizers
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Hire vetted embroidery professionals ready for freelance or full-time roles.
              </p>
            </div>
            <Link
              href="/communities"
              className="inline-flex items-center gap-1 text-sm font-semibold text-black hover:underline dark:text-white"
            >
              Explore All Talent <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDesigners.map((designer, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-xs transition hover:border-black/25 dark:border-white/10 dark:bg-zinc-900/40 dark:hover:border-white/25"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl font-bold text-white shadow-xs ${designer.avatarBg}`}
                    >
                      {designer.name.charAt(0)}
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                      {designer.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold text-black dark:text-white">
                    {designer.name}
                  </h3>
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {designer.role}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1 font-semibold text-black dark:text-white">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      {designer.rating}
                    </span>
                    <span>({designer.reviews} reviews)</span>
                    <span>•</span>
                    <span>{designer.experience}</span>
                  </div>

                  <p className="mt-3 text-xs font-semibold text-black dark:text-white">
                    Rate: <span className="font-normal text-zinc-600 dark:text-zinc-300">{designer.rate}</span>
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {designer.specialty.map((item, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5">
                  <Link
                    href="/communities"
                    className="flex w-full items-center justify-center rounded-xl bg-black/5 py-2 text-xs font-semibold text-black transition hover:bg-black hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    View Portfolio & Hire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRENDING COMMUNITY POSTS & SHOWCASE */}
      <section className="border-b border-black/10 bg-zinc-50/40 py-16 lg:py-24 dark:border-white/10 dark:bg-zinc-950/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Community Feed
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-black dark:text-white">
                Trending Discussions & Free Stitch Files
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Learn digitizing tricks, download free EMB/DST files, and showcase your latest stitchouts.
              </p>
            </div>
            <Link
              href="/communities"
              className="inline-flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-100 dark:border-white/20 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
            >
              Join Community <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {communityPosts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-xs transition hover:border-black/25 dark:border-white/10 dark:bg-zinc-900/60 dark:hover:border-white/25"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      {post.tag}
                    </span>
                    <span className="text-[11px] text-zinc-400">{post.time}</span>
                  </div>

                  <h3 className="mt-3 text-sm font-bold leading-snug text-black hover:underline dark:text-white">
                    <Link href="/communities">{post.title}</Link>
                  </h3>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-xs font-bold text-black dark:bg-white/10 dark:text-white">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-black dark:text-white">
                        {post.author}
                      </p>
                      <p className="text-[10px] text-zinc-400">{post.authorRole}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 text-xs text-zinc-500 dark:border-white/5 dark:text-zinc-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-rose-500 cursor-pointer">
                      <Heart size={14} /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                      <MessageSquare size={14} /> {post.comments}
                    </span>
                  </div>
                  <Link
                    href="/communities"
                    className="flex items-center gap-1 font-semibold text-black dark:text-white hover:underline"
                  >
                    Read & Reply <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Simple Workflow
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl text-black dark:text-white">
              How EMBOBD Works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
              Designed specifically for the apparel and embroidery ecosystem of Bangladesh.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                1
              </div>
              <h3 className="mt-4 text-base font-bold text-black dark:text-white">
                Post a Job or Create Profile
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Employers post specific digitizing, factory, or artisan tasks. Talent builds a verified portfolio showcasing previous stitchouts.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                2
              </div>
              <h3 className="mt-4 text-base font-bold text-black dark:text-white">
                Connect, Chat & Quote
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Directly communicate requirements, inspect machine formats (DST, EMB, PES), and agree on terms and delivery dates.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-zinc-900/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                3
              </div>
              <h3 className="mt-4 text-base font-bold text-black dark:text-white">
                Deliver Flawless Stitches & Grow
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Complete production runs or digitizing deliverables, leave reviews, and build lasting business partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-zinc-900 px-8 py-14 text-center text-white shadow-xl dark:bg-zinc-900 dark:border dark:border-white/10 sm:px-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to Transform Your Embroidery Business or Career?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-zinc-300">
            Join thousands of digitizers, boutique owners, factory operators, and fashion designers today.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:w-auto"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/jobs"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-transparent px-6 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Explore Job Board
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
