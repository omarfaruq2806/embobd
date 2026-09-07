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
  title: "About Us | EMBOBD - Bangladesh Embroidery Ecosystem",
  description:
    "Learn about EMBOBD, the premier marketplace, directory, and knowledge platform dedicated to Bangladesh's embroidery, textile, and RMG industry.",
};

const STATS = [
  { label: "Active Professionals", value: "12,500+", desc: "Punchers, Digitizers & Operators" },
  { label: "Jobs Posted", value: "4,200+", desc: "Full-time, Contract & Freelance" },
  { label: "Verified Businesses", value: "850+", desc: "Factories, Shops & Suppliers" },
  { label: "Districts Reached", value: "64", desc: "Nationwide Coverage" },
];

const CORE_PILLARS = [
  {
    icon: Scissors,
    title: "Specialized Talent Marketplace",
    desc: "Connecting verified embroidery punchers, Wilcom digitizers, 3D puff experts, and Tajima/Barudan machine technicians directly with export garment factories and boutiques.",
  },
  {
    icon: Building2,
    title: "Comprehensive Business Directory",
    desc: "A verified network of embroidery units, retail punch shops, machinery dealers, spare parts distributors, and raw material/thread suppliers across Bangladesh.",
  },
  {
    icon: Cpu,
    title: "Technical Knowledge Sharing",
    desc: "A community hub for masterclass tutorials, stitch optimization, thread-tension troubleshooting, and modern CAD/CAM digitizing techniques.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Trust & Transparency",
    desc: "Every company, job vacancy, and business listing is reviewed by industry moderators to ensure authentic opportunities and fair compensation.",
  },
];

const VALUES = [
  {
    title: "Artisan & Technical Dignity",
    desc: "We celebrate the specialized skills of Bangladeshi digitizers and operators, providing them with transparent hiring and market-rate earnings.",
  },
  {
    title: "Technological Precision",
    desc: "Promoting modern automation, high-speed multi-head machinery best practices, and international quality standards in RMG exports.",
  },
  {
    title: "Zero-Barrier Access",
    desc: "Open, accessible tools for both small village karchupi artisans and large multi-million dollar composite textile mills.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pb-24 dark:bg-black">
      {/* ========================================================================= */}
      {/* 🌟 HERO SECTION (B&W Minimalist & Premium) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50/70 py-20 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-900 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About EMBOBD (Embroidery Bangladesh)</span>
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
              Elevating Bangladesh’s Embroidery & Apparel Crafts
            </h1>

            <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              EMBOBD is the country’s first specialized digital ecosystem bridging the gap between skilled embroidery technicians, export garment factories, boutique designers, and raw material suppliers.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 📊 PLATFORM NUMBERS */}
      {/* ========================================================================= */}
      <section className="border-b border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <span className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm font-bold text-zinc-800 dark:text-zinc-200">
                  {stat.label}
                </span>
                <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🎯 OUR STORY & MISSION */}
      {/* ========================================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                <Target className="h-3.5 w-3.5" />
                <span>The Story & Vision</span>
              </div>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl lg:text-4xl dark:text-white">
                Why We Built EMBOBD
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                <p>
                  Bangladesh is the second-largest RMG exporter globally, and embroidery is the crown jewel of apparel embellishment. From intricate luxury bridal wear to high-speed mass production for international fashion brands, tens of thousands of skilled digitizers, punchers, and machine masters power this multi-billion dollar craft.
                </p>
                <p>
                  Yet, finding verified Wilcom digitizers, sourcing authentic Tajima parts, or discovering reliable sub-contract factories traditionally depended on word of mouth and unorganized informal networks.
                </p>
                <p>
                  <strong>EMBOBD was created to change this.</strong> We provide a centralized, professional home where craftspeople build verified portfolios, factories post targeted jobs, businesses list their facilities, and technicians freely share knowledge.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/jobs"
                  className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  <span>Explore Job Vacancies</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/communities"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-6 py-3 text-xs font-bold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
                >
                  <span>Read Community Hub</span>
                </Link>
              </div>
            </div>

            {/* Visual Feature Box */}
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                Core Sectors We Serve
              </h3>
              <div className="mt-6 space-y-4">
                {[
                  "Industrial RMG Embroidery (Flat, Cording, Sequins, Laser Cut)",
                  "Custom Wilcom Digitizing & Punching Studios",
                  "Bridal Karchupi, Aari, Zardosi & Handcraft Workshops",
                  "Multi-Head Machine Importers & Maintenance Engineers",
                  "Metallic, Viscose & Polyester Thread Suppliers",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-black dark:text-white mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🏛️ 4 CORE PILLARS */}
      {/* ========================================================================= */}
      <section className="border-t border-zinc-200 bg-zinc-50/50 py-20 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              The Four Pillars of EMBOBD
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Designed from the ground up to solve the real-world operational challenges of the Bangladeshi embroidery sector.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-400 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div>
                    <div className="inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-800 dark:bg-zinc-800">
                      <Icon className="h-6 w-6 text-black dark:text-white" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-zinc-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 💎 OUR VALUES */}
      {/* ========================================================================= */}
      <section className="border-t border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              Values That Drive Us
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  {val.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🚀 CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-300 bg-black p-8 text-center text-white sm:p-14 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl text-white">
            Join the Premier Embroidery Network in Bangladesh
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-300">
            Whether you are a master digitizer looking for career opportunities, a factory manager hiring operators, or a studio owner listing your shop — EMBOBD is your platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/register"
              className="rounded-xl bg-white px-6 py-3.5 text-xs font-bold text-black shadow-xs transition hover:bg-zinc-200"
            >
              Create Free Account
            </Link>
            <Link
              href="/businesses"
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-zinc-700"
            >
              Browse Business Directory
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}