// import {
//   ArrowRight,
//   BriefcaseBusiness,
//   Palette,
//   Headphones,
//   BookOpen,
//   Users,
//   CheckCircle2,
//   Sparkles,
//   Scissors,
// } from "lucide-react";

// const features = [
//   {
//     icon: BriefcaseBusiness,
//     title: "Jobs",
//     text: "Discover opportunities, projects and careers across the embroidery industry.",
//   },
//   {
//     icon: Users,
//     title: "Community",
//     text: "Connect with professionals, businesses, designers and embroidery enthusiasts.",
//   },
//   {
//     icon: Headphones,
//     title: "Support",
//     text: "Get practical help from people who understand your craft and business.",
//   },
//   {
//     icon: Palette,
//     title: "Knowledge",
//     text: "Learn techniques, discover ideas and share what you know.",
//   },
// ];

// const problems = [
//   "Finding the right embroidery professionals",
//   "Discovering reliable industry opportunities",
//   "Getting answers to real-world embroidery problems",
//   "Connecting talent with the right businesses",
// ];

// const profiles = [
//   "Professionals",
//   "Designers",
//   "Businesses",
//   "Beginners",
//   "Freelancers",
//   "Enthusiasts",
// ];

// export default function Home() {
//   return (
//     <main className="overflow-hidden bg-[#F8FAFC] text-[#1E293B]">

//       {/* ================= HERO ================= */}
//       <section className="relative bg-[#0F172A] text-white">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.18),transparent_35%)]" />

//         <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
//           <div className="grid items-center gap-16 lg:grid-cols-2">

//             <div>
//               <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-400/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#14B8A6]">
//                 <Sparkles size={14} />
//                 BUILT FOR THE EMBROIDERY COMMUNITY
//               </div>

//               <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
//                 ONE COMMUNITY.
//                 <br />
//                 <span className="text-[#14B8A6]">
//                   ENDLESS POSSIBILITIES.
//                 </span>
//               </h1>

//               <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
//                 A global platform connecting embroidery professionals,
//                 designers, businesses and enthusiasts in one powerful
//                 ecosystem.
//               </p>

//               <div className="mt-9 flex flex-col gap-4 sm:flex-row">
//                 <a
//                   href="#community"
//                   className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 py-3.5 font-semibold transition hover:bg-[#14B8A6]"
//                 >
//                   Join the Community
//                   <ArrowRight
//                     size={18}
//                     className="transition group-hover:translate-x-1"
//                   />
//                 </a>

//                 <a
//                   href="#jobs"
//                   className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-6 py-3.5 font-semibold text-white transition hover:border-[#14B8A6] hover:text-[#14B8A6]"
//                 >
//                   Explore Jobs
//                 </a>
//               </div>
//             </div>

//             {/* Hero Visual */}
//             <div className="relative">
//               <div className="absolute -inset-10 rounded-full bg-[#0F766E]/20 blur-3xl" />

//               <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-800 shadow-2xl">
//                 <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 via-slate-800 to-[#0F172A]">
//                   <div className="flex h-full flex-col items-center justify-center p-8 text-center">
//                     <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#0F766E] shadow-[0_0_60px_rgba(20,184,166,0.25)]">
//                       <Scissors size={42} />
//                     </div>

//                     <p className="text-2xl font-bold">
//                       Embroidery. Connected.
//                     </p>

//                     <p className="mt-2 max-w-sm text-slate-400">
//                       People, opportunities and knowledge — all in one place.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 border-t border-white/10 bg-white/[0.03]">
//                   {[
//                     ["Jobs", "Connect"],
//                     ["People", "Network"],
//                     ["Skills", "Learn"],
//                   ].map(([title, text]) => (
//                     <div key={title} className="p-5 text-center">
//                       <p className="font-semibold">{title}</p>
//                       <p className="mt-1 text-xs text-slate-400">{text}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>


//       {/* ================= BUILDING ================= */}
//       <section id="community" className="bg-white py-24 lg:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

//             <div>
//               <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F766E]">
//                 What We&apos;re Building
//               </p>

//               <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
//                 More Than an
//                 <br />
//                 Embroidery Platform.
//               </h2>

//               <p className="mt-6 max-w-md text-lg leading-8 text-slate-500">
//                 We&apos;re creating the digital home for an industry full of
//                 creativity, skill and opportunity.
//               </p>
//             </div>

//             <div className="grid gap-5 sm:grid-cols-2">
//               {features.map((feature) => {
//                 const Icon = feature.icon;

//                 return (
//                   <div
//                     key={feature.title}
//                     className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#14B8A6] hover:shadow-xl hover:shadow-teal-900/5"
//                   >
//                     <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] transition group-hover:bg-[#0F766E] group-hover:text-white">
//                       <Icon size={22} />
//                     </div>

//                     <h3 className="mt-6 text-xl font-bold text-[#0F172A]">
//                       {feature.title}
//                     </h3>

//                     <p className="mt-3 leading-7 text-slate-500">
//                       {feature.text}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>

//           </div>
//         </div>
//       </section>


//       {/* ================= PROBLEM ================= */}
//       <section className="bg-[#F1F5F9] py-24 lg:py-28">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="max-w-3xl">
//             <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F766E]">
//               The Problem
//             </p>

//             <h2 className="mt-4 text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">
//               The Industry Has Talent.
//               <br />
//               We&apos;re Connecting It.
//             </h2>
//           </div>

//           <div className="mt-12 grid gap-4 md:grid-cols-2">
//             {problems.map((problem, index) => (
//               <div
//                 key={problem}
//                 className="flex items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6"
//               >
//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-sm font-bold text-[#0F766E]">
//                   0{index + 1}
//                 </span>

//                 <p className="font-medium leading-7 text-slate-700">
//                   {problem}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>


//       {/* ================= ECOSYSTEM ================= */}
//       <section id="jobs" className="bg-white py-24 lg:py-32">
//         <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">

//           <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F766E]">
//             The Ecosystem
//           </p>

//           <h2 className="mt-4 text-4xl font-bold text-[#0F172A] sm:text-5xl">
//             Everything connected.
//           </h2>

//           <div className="mx-auto mt-16 max-w-3xl">

//             <div className="grid grid-cols-3 items-center gap-4">
//               <div className="text-right font-bold text-[#0F172A]">
//                 JOBS
//               </div>

//               <div />

//               <div />
//             </div>

//             <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">
//               <div className="text-right font-bold text-[#0F172A]">
//                 COMMUNITY
//               </div>

//               <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-[#0F766E] to-[#14B8A6] text-lg font-bold text-white shadow-2xl shadow-teal-900/20">
//                 <div className="absolute inset-3 rounded-full border border-white/20" />
//                 EMBROIDERY
//               </div>

//               <div className="text-left font-bold text-[#0F172A]">
//                 SUPPORT
//               </div>
//             </div>

//             <div className="mt-4 grid grid-cols-3 items-center gap-4">
//               <div />
//               <div className="font-bold text-[#0F172A]">
//                 LEARNING
//               </div>
//               <div />
//             </div>

//           </div>
//         </div>
//       </section>


//       {/* ================= VISION ================= */}
//       <section className="relative overflow-hidden bg-[#0F172A] py-28 text-white">
//         <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#0F766E]/20 blur-3xl" />

//         <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
//           <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#14B8A6]">
//             Our Vision
//           </p>

//           <h2 className="mt-7 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
//             To build the world&apos;s most connected and supportive
//             <span className="text-[#14B8A6]"> embroidery ecosystem.</span>
//           </h2>

//           <div className="mx-auto mt-12 h-1 max-w-md rounded-full bg-gradient-to-r from-transparent via-[#14B8A6] to-transparent" />
//         </div>
//       </section>


//       {/* ================= WHO ================= */}
//       <section className="bg-white py-24 lg:py-28">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
//             <div>
//               <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F766E]">
//                 Who Is It For?
//               </p>

//               <h2 className="mt-4 text-4xl font-bold text-[#0F172A] sm:text-5xl">
//                 Built for everyone
//                 <br />
//                 in the ecosystem.
//               </h2>
//             </div>

//             <p className="max-w-md text-slate-500">
//               Whether you&apos;re starting your journey or running an
//               embroidery business, there&apos;s a place for you here.
//             </p>
//           </div>

//           <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
//             {profiles.map((profile) => (
//               <div
//                 key={profile}
//                 className="group rounded-2xl border border-slate-200 p-6 text-center transition hover:-translate-y-1 hover:border-[#14B8A6] hover:shadow-lg"
//               >
//                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-[#0F766E] transition group-hover:bg-teal-50">
//                   <Users size={21} />
//                 </div>

//                 <p className="mt-4 font-semibold text-[#0F172A]">
//                   {profile}
//                 </p>
//               </div>
//             ))}
//           </div>

//         </div>
//       </section>


//       {/* ================= FUTURE ================= */}
//       <section className="bg-[#F8FAFC] py-24 lg:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="text-center">
//             <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F766E]">
//               The Future
//             </p>

//             <h2 className="mt-4 text-4xl font-bold text-[#0F172A] sm:text-5xl">
//               AND THIS IS JUST THE BEGINNING.
//             </h2>
//           </div>

//           <div className="relative mt-20">
//             <div className="absolute left-0 right-0 top-5 hidden h-px bg-slate-200 md:block" />

//             <div className="grid gap-10 md:grid-cols-4">
//               {[
//                 ["01", "Connect", "Bring the industry together."],
//                 ["02", "Discover", "Make opportunities easier to find."],
//                 ["03", "Learn", "Share knowledge and grow."],
//                 ["04", "Build", "Create a stronger global ecosystem."],
//               ].map(([number, title, text]) => (
//                 <div key={number} className="relative text-center">
//                   <div className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#F8FAFC] bg-[#0F766E] text-xs font-bold text-white">
//                     {number}
//                   </div>

//                   <h3 className="mt-6 text-xl font-bold text-[#0F172A]">
//                     {title}
//                   </h3>

//                   <p className="mt-2 text-sm leading-6 text-slate-500">
//                     {text}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </section>


//       {/* ================= CTA ================= */}
//       <section className="bg-[#0F172A] px-6 py-20">
//         <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center sm:p-16">

//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F766E] text-white">
//             <CheckCircle2 size={27} />
//           </div>

//           <h2 className="mt-7 text-4xl font-bold text-white sm:text-5xl">
//             Ready to be part of it?
//           </h2>

//           <p className="mx-auto mt-5 max-w-xl text-slate-400">
//             Join a growing global community shaping the future of embroidery.
//           </p>

//           <a
//             href="#community"
//             className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-7 py-4 font-bold text-[#0F172A] transition hover:bg-teal-300"
//           >
//             Join the Community
//             <ArrowRight size={18} />
//           </a>

//         </div>
//       </section>

//     </main>
//   );
// }
// --------------------------------------------------------------------------------------------------
// import {
//   ArrowRight,
//   Users,
//   HeartHandshake,
//   BookOpen,
//   BriefcaseBusiness,
//   Network,
//   Sparkles,
//   Scissors,
//   CircleDot,
// } from "lucide-react";

// const values = [
//   {
//     icon: Users,
//     title: "Community",
//     text: "Building meaningful connections across the embroidery world.",
//   },
//   {
//     icon: HeartHandshake,
//     title: "Respect",
//     text: "Celebrating every craft, experience and individual contribution.",
//   },
//   {
//     icon: BookOpen,
//     title: "Knowledge",
//     text: "Sharing skills, ideas and practical industry knowledge.",
//   },
//   {
//     icon: BriefcaseBusiness,
//     title: "Opportunity",
//     text: "Making the right opportunities easier to discover.",
//   },
//   {
//     icon: HeartHandshake,
//     title: "Support",
//     text: "Creating a space where people can learn and help each other.",
//   },
//   {
//     icon: Sparkles,
//     title: "Growth",
//     text: "Helping people and businesses move forward together.",
//   },
// ];

// const ecosystem = [
//   { icon: BriefcaseBusiness, title: "Jobs", position: "top-0 left-1/2 -translate-x-1/2" },
//   { icon: Users, title: "Community", position: "top-1/4 right-0" },
//   { icon: HeartHandshake, title: "Support", position: "bottom-1/4 right-0" },
//   { icon: BookOpen, title: "Learning", position: "bottom-0 left-1/2 -translate-x-1/2" },
//   { icon: Network, title: "Networking", position: "bottom-1/4 left-0" },
//   { icon: Sparkles, title: "Opportunities", position: "top-1/4 left-0" },
// ];

// export default function Home() {
//   return (
//     <main className="min-h-screen overflow-hidden bg-[#FBF7F2] text-[#292524]">

//       {/* =====================================================
//           HERO
//       ====================================================== */}
//       <section className="relative overflow-hidden bg-[#FBF7F2]">

//         {/* Decorative thread lines */}
//         <svg
//           className="pointer-events-none absolute -left-20 top-10 h-[700px] w-[500px] opacity-30"
//           viewBox="0 0 500 700"
//           fill="none"
//         >
//           <path
//             d="M20 30C180 100 40 220 210 290C380 360 150 470 330 530C410 557 430 630 350 690"
//             stroke="#D4A373"
//             strokeWidth="1.5"
//           />
//           <path
//             d="M60 0C220 110 90 190 260 280C420 365 200 470 370 600"
//             stroke="#641B2E"
//             strokeWidth="0.8"
//           />
//         </svg>

//         <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-16">

//           {/* Mini nav */}
//           <nav className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#641B2E] text-[#FBF7F2]">
//                 <Scissors size={19} />
//               </div>

//               <span className="text-lg font-bold tracking-tight text-[#42121F]">
//                 EMBRO
//               </span>
//             </div>

//             <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
//               <a href="#story" className="transition hover:text-[#641B2E]">
//                 Our Story
//               </a>
//               <a href="#ecosystem" className="transition hover:text-[#641B2E]">
//                 Ecosystem
//               </a>
//               <a href="#values" className="transition hover:text-[#641B2E]">
//                 Values
//               </a>
//               <a href="#vision" className="transition hover:text-[#641B2E]">
//                 Vision
//               </a>
//             </div>

//             <a
//               href="#join"
//               className="rounded-full border border-[#641B2E] px-5 py-2.5 text-sm font-semibold text-[#641B2E] transition hover:bg-[#641B2E] hover:text-white"
//             >
//               Join Us
//             </a>
//           </nav>

//           <div className="grid items-center gap-16 pb-20 pt-24 lg:grid-cols-[0.95fr_1.05fr] lg:pb-32 lg:pt-28">

//             {/* Hero copy */}
//             <div className="relative z-10">

//               <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#D4A373]">
//                 <span className="h-px w-8 bg-[#D4A373]" />
//                 A COMMUNITY BUILT FOR EMBROIDERY
//               </p>

//               <h1 className="font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-[#42121F] sm:text-6xl lg:text-[76px]">
//                 WE&apos;RE
//                 <br />
//                 CONNECTING
//                 <br />
//                 THE WORLD OF
//                 <br />
//                 <span className="italic text-[#641B2E]">
//                   EMBROIDERY.
//                 </span>
//               </h1>

//               <p className="mt-8 max-w-xl text-lg leading-8 text-stone-600">
//                 A premium global community bringing together the people,
//                 skills, businesses and opportunities shaping the future of
//                 embroidery.
//               </p>

//               <div className="mt-9 flex flex-col gap-3 sm:flex-row">
//                 <a
//                   href="#join"
//                   className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#641B2E] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#641B2E]/10 transition hover:bg-[#42121F]"
//                 >
//                   Join Our Community
//                   <ArrowRight
//                     size={17}
//                     className="transition group-hover:translate-x-1"
//                   />
//                 </a>

//                 <a
//                   href="#ecosystem"
//                   className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#641B2E] px-6 py-3.5 font-semibold text-[#641B2E] transition hover:bg-[#641B2E] hover:text-white"
//                 >
//                   Explore Opportunities
//                 </a>
//               </div>

//             </div>

//             {/* Hero image */}
//             <div className="relative">

//               <div className="absolute -inset-6 rounded-[40px] border border-[#D4A373]/30" />
//               <div className="absolute -inset-12 rounded-full bg-[#D4A373]/10 blur-3xl" />

//               <div className="relative overflow-hidden rounded-[30px] bg-[#42121F] shadow-2xl">

//                 {/* Replace this area with actual embroidery photography */}
//                 <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#8A4557] via-[#641B2E] to-[#42121F]">

//                   <div className="absolute inset-0 opacity-20">
//                     <div
//                       className="h-full w-full"
//                       style={{
//                         backgroundImage:
//                           "radial-gradient(circle at center, #D4A373 1px, transparent 1px)",
//                         backgroundSize: "22px 22px",
//                       }}
//                     />
//                   </div>

//                   <div className="absolute inset-8 rounded-[24px] border border-[#D4A373]/40" />

//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-[#D4A373]/50">
//                       <div className="absolute inset-5 rounded-full border border-[#D4A373]/30" />
//                       <div className="absolute inset-10 rounded-full border border-[#D4A373]/40" />

//                       <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#FBF7F2] text-[#641B2E] shadow-2xl">
//                         <Scissors size={48} strokeWidth={1.2} />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="absolute bottom-7 left-7 right-7">
//                     <div className="rounded-xl border border-white/10 bg-black/20 p-5 backdrop-blur-md">
//                       <p className="text-xs uppercase tracking-[0.2em] text-[#D4A373]">
//                         Crafted Together
//                       </p>
//                       <p className="mt-2 text-xl font-semibold text-white">
//                         Where every thread connects a story.
//                       </p>
//                     </div>
//                   </div>

//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           STORY
//       ====================================================== */}
//       <section id="story" className="bg-white py-24 lg:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="grid gap-20 lg:grid-cols-[0.85fr_1.15fr]">

//             <div>
//               <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4A373]">
//                 Our Story
//               </p>

//               <h2 className="mt-5 font-serif text-5xl font-semibold leading-tight text-[#42121F] sm:text-6xl">
//                 From Thread
//                 <br />
//                 &amp; Skill
//                 <br />
//                 <span className="italic text-[#641B2E]">
//                   to a Global Community.
//                 </span>
//               </h2>
//             </div>

//             <div>
//               <p className="text-xl leading-9 text-stone-600">
//                 Embroidery has always been more than a craft. Behind every
//                 design is a person, a skill, a business, a story and years of
//                 knowledge.
//               </p>

//               <p className="mt-6 leading-8 text-stone-500">
//                 We believe those people should have a place where they can
//                 connect, collaborate, learn, discover opportunities and help
//                 one another grow.
//               </p>

//               {/* Timeline */}
//               <div className="relative mt-14 pl-10">

//                 <div className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-[#D4A373] via-[#D4A373] to-transparent" />

//                 {[
//                   ["01", "IDEA"],
//                   ["02", "COMMUNITY"],
//                   ["03", "OPPORTUNITIES"],
//                   ["04", "THE FUTURE"],
//                 ].map(([number, title], index) => (
//                   <div
//                     key={title}
//                     className="relative mb-9 flex items-center gap-5 last:mb-0"
//                   >
//                     <div className="absolute -left-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#D4A373] bg-white">
//                       <div className="h-1.5 w-1.5 rounded-full bg-[#641B2E]" />
//                     </div>

//                     <span className="text-xs font-bold tracking-widest text-[#D4A373]">
//                       {number}
//                     </span>

//                     <span className="font-semibold tracking-wide text-[#42121F]">
//                       {title}
//                     </span>
//                   </div>
//                 ))}

//               </div>
//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           ECOSYSTEM
//       ====================================================== */}
//       <section id="ecosystem" className="bg-[#FBF7F2] py-24 lg:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="text-center">
//             <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4A373]">
//               The Ecosystem
//             </p>

//             <h2 className="mt-5 font-serif text-5xl font-semibold text-[#42121F] sm:text-6xl">
//               Everything connected.
//             </h2>

//             <p className="mx-auto mt-5 max-w-xl leading-7 text-stone-500">
//               One ecosystem designed to connect every important part of the
//               embroidery journey.
//             </p>
//           </div>

//           <div className="relative mx-auto mt-20 h-[570px] max-w-3xl">

//             {/* Connecting threads */}
//             <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D4A373]/60" />

//             <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4A373]/20" />

//             {/* Center */}
//             <div className="absolute left-1/2 top-1/2 z-10 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#641B2E] shadow-2xl shadow-[#641B2E]/20">

//               <div className="absolute inset-4 rounded-full border border-[#D4A373]/50" />
//               <div className="absolute inset-9 rounded-full border border-[#D4A373]/30" />

//               <div className="text-center">
//                 <CircleDot
//                   className="mx-auto text-[#D4A373]"
//                   size={32}
//                   strokeWidth={1.2}
//                 />
//                 <p className="mt-3 font-serif text-2xl font-semibold text-white">
//                   EMBROIDERY
//                 </p>
//                 <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#D4A373]">
//                   Connected
//                 </p>
//               </div>
//             </div>

//             {/* Ecosystem items */}
//             {ecosystem.map((item) => {
//               const Icon = item.icon;

//               return (
//                 <div
//                   key={item.title}
//                   className={`absolute ${item.position} z-20`}
//                 >
//                   <div className="flex min-w-[120px] flex-col items-center gap-3">
//                     <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4A373]/60 bg-white text-[#641B2E] shadow-sm">
//                       <Icon size={21} strokeWidth={1.7} />
//                     </div>

//                     <span className="text-sm font-semibold text-[#42121F]">
//                       {item.title}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           MISSION / VISION
//       ====================================================== */}
//       <section id="vision" className="bg-white py-24 lg:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="grid gap-6 lg:grid-cols-2">

//             <div className="relative overflow-hidden rounded-3xl bg-[#641B2E] p-9 text-[#FBF7F2] sm:p-12">

//               <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#D4A373]/20" />

//               <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4A373]">
//                 Our Mission
//               </p>

//               <h3 className="mt-7 font-serif text-4xl font-semibold leading-tight sm:text-5xl">
//                 Make embroidery
//                 <br />
//                 <span className="italic">more connected.</span>
//               </h3>

//               <p className="mt-7 max-w-lg leading-8 text-white/70">
//                 Create a trusted global space where people can find
//                 opportunities, exchange knowledge and build meaningful
//                 professional relationships.
//               </p>

//               <div className="mt-10 h-px w-28 bg-[#D4A373]" />
//             </div>


//             <div className="rounded-3xl border-2 border-[#641B2E] bg-[#FBF7F2] p-9 sm:p-12">

//               <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4A373]">
//                 Our Vision
//               </p>

//               <h3 className="mt-7 font-serif text-4xl font-semibold leading-tight text-[#42121F] sm:text-5xl">
//                 A world where
//                 <br />
//                 <span className="italic text-[#641B2E]">
//                   every thread connects.
//                 </span>
//               </h3>

//               <p className="mt-7 max-w-lg leading-8 text-stone-500">
//                 To build the world&apos;s most connected and supportive
//                 embroidery ecosystem.
//               </p>

//               <div className="mt-10 h-px w-28 bg-[#D4A373]" />
//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           VALUES
//       ====================================================== */}
//       <section id="values" className="bg-[#FBF7F2] py-24 lg:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="text-center">
//             <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4A373]">
//               What We Believe
//             </p>

//             <h2 className="mt-5 font-serif text-5xl font-semibold text-[#42121F] sm:text-6xl">
//               Our Values
//             </h2>
//           </div>

//           <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-[#E7DED5] bg-[#E7DED5] sm:grid-cols-2 lg:grid-cols-3">
//             {values.map((value) => {
//               const Icon = value.icon;

//               return (
//                 <div
//                   key={value.title}
//                   className="group bg-[#FBF7F2] p-8 transition hover:bg-white"
//                 >
//                   <Icon
//                     size={25}
//                     strokeWidth={1.3}
//                     className="text-[#D4A373] transition group-hover:text-[#641B2E]"
//                   />

//                   <h3 className="mt-6 font-serif text-2xl font-semibold text-[#42121F]">
//                     {value.title}
//                   </h3>

//                   <p className="mt-3 text-sm leading-7 text-stone-500">
//                     {value.text}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>

//         </div>
//       </section>


//       {/* =====================================================
//           CULTURE
//       ====================================================== */}
//       <section className="relative overflow-hidden bg-[#42121F]">

//         <div className="grid min-h-[620px] lg:grid-cols-2">

//           {/* Replace with real image */}
//           <div className="relative min-h-[420px] bg-gradient-to-br from-[#9A596A] via-[#641B2E] to-[#42121F]">

//             <div className="absolute inset-0 opacity-30">
//               <div
//                 className="h-full w-full"
//                 style={{
//                   backgroundImage:
//                     "radial-gradient(circle, #D4A373 1px, transparent 1px)",
//                   backgroundSize: "28px 28px",
//                 }}
//               />
//             </div>

//             <div className="absolute inset-10 rounded-[30px] border border-[#D4A373]/30" />

//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="h-72 w-72 rounded-full border border-[#D4A373]/40 p-8">
//                 <div className="flex h-full items-center justify-center rounded-full border border-[#D4A373]/20">
//                   <Scissors
//                     size={65}
//                     strokeWidth={1}
//                     className="text-[#D4A373]"
//                   />
//                 </div>
//               </div>
//             </div>

//           </div>

//           <div className="flex items-center p-10 sm:p-16 lg:p-24">

//             <div>
//               <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4A373]">
//                 Our Culture
//               </p>

//               <h2 className="mt-6 font-serif text-5xl font-semibold leading-tight text-[#FBF7F2] sm:text-6xl">
//                 WHERE SKILL
//                 <br />
//                 MEETS
//                 <br />
//                 <span className="italic text-[#D4A373]">
//                   COMMUNITY.
//                 </span>
//               </h2>

//               <p className="mt-7 max-w-lg leading-8 text-white/60">
//                 Great craftsmanship grows when people have the freedom to
//                 connect, share and inspire one another.
//               </p>

//               <a
//                 href="#join"
//                 className="mt-9 inline-flex items-center gap-2 text-sm font-bold text-[#D4A373]"
//               >
//                 Discover our culture
//                 <ArrowRight size={17} />
//               </a>
//             </div>

//           </div>

//         </div>
//       </section>


//       {/* =====================================================
//           FINAL CTA
//       ====================================================== */}
//       <section id="join" className="bg-[#42121F] px-6 py-24 sm:py-32">

//         <div className="mx-auto max-w-5xl text-center">

//           <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D4A373]">
//             Start Something New
//           </p>

//           <h2 className="mt-6 font-serif text-5xl font-semibold leading-tight text-[#FBF7F2] sm:text-6xl lg:text-7xl">
//             Your Next Opportunity
//             <br />
//             <span className="italic text-[#D4A373]">
//               Could Start Here.
//             </span>
//           </h2>

//           <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/60">
//             Join a growing global community built around embroidery,
//             craftsmanship and opportunity.
//           </p>

//           <a
//             href="#"
//             className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#D4A373] px-7 py-4 font-bold text-[#42121F] transition hover:bg-[#e2b98e]"
//           >
//             Join the Community
//             <ArrowRight size={18} />
//           </a>

//         </div>
//       </section>


//       {/* =====================================================
//           FOOTER
//       ====================================================== */}
//       <footer className="border-t border-white/10 bg-[#42121F] px-6 pb-10 text-white">
//         <div className="mx-auto flex max-w-7xl flex-col gap-6 pt-8 sm:flex-row sm:items-center sm:justify-between">

//           <div className="flex items-center gap-3">
//             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#641B2E]">
//               <Scissors size={17} />
//             </div>

//             <span className="font-bold">EMBRO</span>
//           </div>

//           <p className="text-sm text-white/40">
//             Building a more connected embroidery world.
//           </p>

//         </div>
//       </footer>

//     </main>
//   );
// }

// --------------------------------------------------------------------------------------------------------
// import {
//   ArrowRight,
//   BriefcaseBusiness,
//   Users,
//   Brain,
//   MessageCircle,
//   LifeBuoy,
//   Sparkles,
//   Plus,
//   Heart,
//   Bookmark,
//   Send,
//   Network,
//   Store,
//   Wrench,
// } from "lucide-react";

// const platformFeatures = [
//   {
//     icon: BriefcaseBusiness,
//     title: "Find Opportunities",
//     text: "Discover jobs, projects and new possibilities across the embroidery industry.",
//   },
//   {
//     icon: Users,
//     title: "Build Connections",
//     text: "Meet professionals, designers, businesses and people who share your passion.",
//   },
//   {
//     icon: Brain,
//     title: "Grow Your Skills",
//     text: "Learn from the community, exchange knowledge and keep improving.",
//   },
// ];

// const communityPosts = [
//   {
//     initials: "JD",
//     name: "Jessica Davis",
//     role: "Embroidery Designer",
//     text: "Just finished working on a new collection. Excited to share the process with the community!",
//     likes: "128",
//     comments: "24",
//   },
//   {
//     initials: "MK",
//     name: "Michael Kim",
//     role: "Embroidery Professional",
//     text: "Looking for recommendations on commercial embroidery equipment. What is everyone using?",
//     likes: "86",
//     comments: "31",
//   },
// ];

// const people = [
//   "Embroidery Professionals",
//   "Designers",
//   "Businesses",
//   "Learners",
//   "Freelancers",
//   "Enthusiasts",
// ];

// export default function Home() {
//   return (
//     <main className="min-h-screen overflow-hidden bg-[#F8F7FF] text-[#1E1B4B]">

//       {/* =====================================================
//           HERO
//       ====================================================== */}
//       <section className="relative overflow-hidden">

//         {/* Background glow */}
//         <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-purple-300/20 blur-3xl" />
//         <div className="pointer-events-none absolute -left-40 bottom-0 h-[500px] w-[500px] rounded-full bg-indigo-300/20 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-8 lg:px-8 lg:pb-28">

//           {/* Navbar */}
//           <nav className="flex items-center justify-between">

//             <a href="#" className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#312E81] text-white shadow-lg shadow-indigo-900/10">
//                 <Sparkles size={19} />
//               </div>

//               <span className="text-lg font-bold tracking-tight">
//                 EMBRO
//               </span>
//             </a>

//             <div className="hidden items-center gap-8 text-sm font-medium text-indigo-950/60 md:flex">
//               <a href="#platform" className="transition hover:text-[#4F46E5]">
//                 Platform
//               </a>
//               <a href="#community" className="transition hover:text-[#4F46E5]">
//                 Community
//               </a>
//               <a href="#people" className="transition hover:text-[#4F46E5]">
//                 Who It&apos;s For
//               </a>
//               <a href="#future" className="transition hover:text-[#4F46E5]">
//                 Future
//               </a>
//             </div>

//             <a
//               href="#join"
//               className="rounded-full bg-[#312E81] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4F46E5]"
//             >
//               Join Us
//             </a>

//           </nav>


//           {/* Hero */}
//           <div className="grid items-center gap-16 pb-10 pt-24 lg:grid-cols-[1fr_0.95fr] lg:pt-28">

//             {/* Hero Copy */}
//             <div className="relative z-10">

//               <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4F46E5] shadow-sm">
//                 <span className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
//                 The Future of Embroidery
//               </div>

//               <h1 className="max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.05em] text-[#1E1B4B] sm:text-6xl lg:text-[76px]">
//                 THE FUTURE OF
//                 <br />
//                 <span className="bg-gradient-to-r from-[#312E81] via-[#4F46E5] to-[#8B5CF6] bg-clip-text text-transparent">
//                   EMBROIDERY
//                 </span>
//                 <br />
//                 STARTS TOGETHER.
//               </h1>

//               <p className="mt-8 max-w-xl text-lg leading-8 text-indigo-950/60">
//                 A modern digital community connecting embroidery
//                 professionals, designers, businesses and enthusiasts in one
//                 growing ecosystem.
//               </p>

//               <div className="mt-9 flex flex-col gap-3 sm:flex-row">

//                 <a
//                   href="#join"
//                   className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-6 py-3.5 font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:bg-[#312E81]"
//                 >
//                   Join the Community
//                   <ArrowRight
//                     size={18}
//                     className="transition group-hover:translate-x-1"
//                   />
//                 </a>

//                 <a
//                   href="#platform"
//                   className="inline-flex items-center justify-center rounded-xl border border-indigo-300 bg-white/50 px-6 py-3.5 font-semibold text-[#312E81] transition hover:border-[#4F46E5] hover:bg-white"
//                 >
//                   Explore Platform
//                 </a>

//               </div>
//             </div>


//             {/* Hero Visual */}
//             <div className="relative mx-auto w-full max-w-xl">

//               {/* Thread SVG */}
//               <svg
//                 className="pointer-events-none absolute -inset-20 h-[650px] w-[650px] opacity-50"
//                 viewBox="0 0 650 650"
//                 fill="none"
//               >
//                 <path
//                   d="M100 350C100 160 260 60 410 130C560 200 570 410 430 500C290 590 110 520 140 360C165 225 330 200 420 290"
//                   stroke="#8B5CF6"
//                   strokeWidth="2"
//                   strokeDasharray="8 9"
//                 />

//                 <path
//                   d="M80 270C190 90 440 100 510 260C575 405 420 550 270 500C140 458 125 290 260 220"
//                   stroke="#4F46E5"
//                   strokeWidth="1.5"
//                   opacity="0.5"
//                 />
//               </svg>


//               {/* Main visual */}
//               <div className="relative mx-auto h-[510px] w-full max-w-[500px]">

//                 {/* Central glow */}
//                 <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-400/20 blur-3xl" />

//                 {/* Embroidery network */}
//                 <div className="absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-indigo-200 bg-white/70 shadow-2xl shadow-indigo-900/10 backdrop-blur">

//                   <div className="absolute inset-5 rounded-full border border-dashed border-purple-300" />

//                   <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[#312E81] via-[#4F46E5] to-[#8B5CF6] shadow-xl shadow-indigo-500/30" />

//                   <Sparkles
//                     className="relative z-10 text-white"
//                     size={42}
//                     strokeWidth={1.4}
//                   />

//                 </div>


//                 {/* New Job */}
//                 <div className="absolute left-0 top-20 w-48 rounded-2xl border border-indigo-100 bg-white p-4 shadow-xl shadow-indigo-900/10 transition hover:-translate-y-1">

//                   <div className="flex items-center gap-3">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
//                       <Plus size={18} />
//                     </div>

//                     <div>
//                       <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
//                         New Job
//                       </p>
//                       <p className="mt-0.5 text-sm font-bold">
//                         Embroidery Designer
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-3 h-1.5 rounded-full bg-indigo-50">
//                     <div className="h-1.5 w-3/4 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#8B5CF6]" />
//                   </div>
//                 </div>


//                 {/* Community Post */}
//                 <div className="absolute right-0 top-12 w-56 rounded-2xl border border-purple-100 bg-white p-4 shadow-xl shadow-indigo-900/10">

//                   <div className="flex items-center gap-2">
//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] text-[10px] font-bold text-white">
//                       JD
//                     </div>

//                     <div>
//                       <p className="text-xs font-bold">New Community Post</p>
//                       <p className="text-[10px] text-slate-400">
//                         2 min ago
//                       </p>
//                     </div>
//                   </div>

//                   <p className="mt-3 text-xs leading-5 text-slate-500">
//                     Sharing a new embroidery project with the community...
//                   </p>

//                   <div className="mt-3 flex gap-3 text-[10px] text-slate-400">
//                     <span>♡ 128</span>
//                     <span>○ 24</span>
//                   </div>
//                 </div>


//                 {/* Support */}
//                 <div className="absolute bottom-16 left-8 w-52 rounded-2xl border border-indigo-100 bg-white p-4 shadow-xl shadow-indigo-900/10">

//                   <div className="flex items-center gap-3">
//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-[#8B5CF6]">
//                       <LifeBuoy size={18} />
//                     </div>

//                     <div>
//                       <p className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
//                         Support Request
//                       </p>
//                       <p className="mt-0.5 text-sm font-bold">
//                         12 people helping
//                       </p>
//                     </div>
//                   </div>
//                 </div>


//                 {/* Floating notification */}
//                 <div className="absolute bottom-8 right-0 flex items-center gap-3 rounded-full border border-indigo-100 bg-white px-4 py-3 shadow-xl shadow-indigo-900/10">

//                   <div className="flex -space-x-2">
//                     <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-400 text-[8px] font-bold text-white">
//                       A
//                     </div>
//                     <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-purple-400 text-[8px] font-bold text-white">
//                       M
//                     </div>
//                     <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-700 text-[8px] font-bold text-white">
//                       +
//                     </div>
//                   </div>

//                   <span className="text-xs font-semibold">
//                     Community is growing
//                   </span>

//                 </div>

//               </div>
//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           PLATFORM
//       ====================================================== */}
//       <section id="platform" className="bg-white py-24 lg:py-32">

//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="max-w-2xl">
//             <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B5CF6]">
//               One Platform
//             </p>

//             <h2 className="mt-4 text-4xl font-black tracking-tight text-[#1E1B4B] sm:text-5xl">
//               Everything You Need.
//               <br />
//               <span className="text-[#4F46E5]">
//                 All in One Place.
//               </span>
//             </h2>
//           </div>


//           <div className="mt-14 grid gap-5 md:grid-cols-3">

//             {platformFeatures.map((feature) => {
//               const Icon = feature.icon;

//               return (
//                 <div
//                   key={feature.title}
//                   className="group rounded-3xl border border-indigo-100 bg-white p-8 shadow-[0_10px_40px_rgba(79,70,229,0.05)] transition duration-300 hover:-translate-y-2 hover:border-indigo-200 hover:shadow-[0_20px_60px_rgba(79,70,229,0.12)]"
//                 >

//                   <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 text-[#4F46E5] transition group-hover:from-[#4F46E5] group-hover:to-[#8B5CF6] group-hover:text-white">
//                     <Icon size={24} />
//                   </div>

//                   <h3 className="mt-7 text-xl font-bold text-[#1E1B4B]">
//                     {feature.title}
//                   </h3>

//                   <p className="mt-3 leading-7 text-indigo-950/55">
//                     {feature.text}
//                   </p>

//                   <div className="mt-7 flex items-center gap-2 text-sm font-bold text-[#4F46E5]">
//                     Learn more
//                     <ArrowRight size={16} />
//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           COMMUNITY
//       ====================================================== */}
//       <section
//         id="community"
//         className="relative overflow-hidden bg-[#312E81] py-24 text-white lg:py-32"
//       >

//         <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/30 blur-3xl" />
//         <div className="absolute -bottom-60 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">

//             <div>
//               <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
//                 Community
//               </p>

//               <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl">
//                 A COMMUNITY
//                 <br />
//                 THAT GROWS
//                 <br />
//                 <span className="text-purple-300">
//                   TOGETHER.
//                 </span>
//               </h2>

//               <p className="mt-7 max-w-lg text-lg leading-8 text-indigo-100/65">
//                 Ask questions. Share your work. Find inspiration. Meet the
//                 people who understand what it means to build in embroidery.
//               </p>

//               <a
//                 href="#join"
//                 className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-[#312E81] transition hover:bg-indigo-50"
//               >
//                 Explore Community
//                 <ArrowRight size={17} />
//               </a>
//             </div>


//             {/* Community cards */}
//             <div className="space-y-4">

//               {communityPosts.map((post) => (
//                 <div
//                   key={post.name}
//                   className="rounded-2xl border border-white/10 bg-white/[0.08] p-6 backdrop-blur-xl"
//                 >

//                   <div className="flex items-center justify-between">

//                     <div className="flex items-center gap-3">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-purple-400 text-xs font-bold text-[#312E81]">
//                         {post.initials}
//                       </div>

//                       <div>
//                         <p className="text-sm font-bold">
//                           {post.name}
//                         </p>

//                         <p className="text-xs text-indigo-200/50">
//                           {post.role}
//                         </p>
//                       </div>
//                     </div>

//                     <span className="text-xs text-indigo-200/40">
//                       2h
//                     </span>
//                   </div>

//                   <p className="mt-5 leading-7 text-indigo-50/80">
//                     {post.text}
//                   </p>

//                   <div className="mt-5 flex items-center gap-5 border-t border-white/10 pt-4 text-xs text-indigo-200/50">
//                     <span className="flex items-center gap-1.5">
//                       <Heart size={14} />
//                       {post.likes}
//                     </span>

//                     <span className="flex items-center gap-1.5">
//                       <MessageCircle size={14} />
//                       {post.comments}
//                     </span>

//                     <span className="ml-auto">
//                       <Bookmark size={14} />
//                     </span>
//                   </div>

//                 </div>
//               ))}

//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           WHO IS IT FOR
//       ====================================================== */}
//       <section id="people" className="relative overflow-hidden py-24 lg:py-32">

//         <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#F8F7FF] to-[#F3E8FF]" />

//         <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="text-center">

//             <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B5CF6]">
//               Who Is It For?
//             </p>

//             <h2 className="mt-5 text-4xl font-black tracking-tight text-[#1E1B4B] sm:text-5xl">
//               Built for the whole
//               <br />
//               embroidery community.
//             </h2>

//           </div>


//           <div className="mx-auto mt-14 flex max-w-5xl flex-wrap justify-center gap-4">

//             {people.map((person, index) => (
//               <div
//                 key={person}
//                 className={`rounded-2xl border border-white/80 bg-white/75 px-6 py-5 shadow-xl shadow-indigo-900/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-indigo-500/10 ${
//                   index % 2 === 0
//                     ? "rotate-[-1deg]"
//                     : "rotate-[1deg]"
//                 }`}
//               >

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-purple-100 text-[#4F46E5]">
//                     <Users size={17} />
//                   </div>

//                   <span className="font-semibold text-[#1E1B4B]">
//                     {person}
//                   </span>

//                 </div>

//               </div>
//             ))}

//           </div>

//         </div>
//       </section>


//       {/* =====================================================
//           FUTURE ROADMAP
//       ====================================================== */}
//       <section id="future" className="bg-white py-24 lg:py-32">

//         <div className="mx-auto max-w-5xl px-6 lg:px-8">

//           <div className="text-center">

//             <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B5CF6]">
//               Future Vision
//             </p>

//             <h2 className="mt-5 text-4xl font-black tracking-tight text-[#1E1B4B] sm:text-5xl">
//               From community
//               <br />
//               to global ecosystem.
//             </h2>

//           </div>


//           <div className="relative mt-16">

//             {/* vertical line */}
//             <div className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-gradient-to-b from-[#4F46E5] via-[#8B5CF6] to-indigo-100 md:block" />


//             <div className="space-y-7">

//               {/* Today */}
//               <RoadmapItem
//                 number="01"
//                 label="TODAY"
//                 title="Jobs + Community + Support"
//                 icon={<Users size={20} />}
//                 align="left"
//               />

//               <RoadmapItem
//                 number="02"
//                 label="NEXT"
//                 title="Learning + Networking"
//                 icon={<Brain size={20} />}
//                 align="right"
//               />

//               <RoadmapItem
//                 number="03"
//                 label="FUTURE"
//                 title="Marketplace + Tools"
//                 icon={<Store size={20} />}
//                 align="left"
//               />

//               <RoadmapItem
//                 number="04"
//                 label="VISION"
//                 title="GLOBAL EMBROIDERY ECOSYSTEM"
//                 icon={<Network size={20} />}
//                 align="right"
//                 highlight
//               />

//             </div>

//           </div>

//         </div>
//       </section>


//       {/* =====================================================
//           CTA
//       ====================================================== */}
//       <section id="join" className="relative overflow-hidden bg-[#312E81] px-6 py-24 text-white sm:py-32">

//         <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/30 blur-3xl" />

//         <div className="relative mx-auto max-w-4xl text-center">

//           <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
//             Join the Movement
//           </p>

//           <h2 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
//             Ready to be
//             <br />
//             <span className="text-purple-300">
//               part of it?
//             </span>
//           </h2>

//           <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-indigo-100/60">
//             Connect with the people, opportunities and ideas shaping the
//             future of embroidery.
//           </p>

//           <a
//             href="#"
//             className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 font-bold text-[#312E81] shadow-2xl transition hover:bg-indigo-50"
//           >
//             Join the Community
//             <ArrowRight
//               size={18}
//               className="transition group-hover:translate-x-1"
//             />
//           </a>

//         </div>
//       </section>


//       {/* =====================================================
//           FOOTER
//       ====================================================== */}
//       <footer className="bg-[#1E1B4B] px-6 py-8 text-white">

//         <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

//           <div className="flex items-center gap-3">

//             <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4F46E5]">
//               <Sparkles size={17} />
//             </div>

//             <span className="font-bold">
//               EMBRO
//             </span>

//           </div>

//           <p className="text-sm text-indigo-200/40">
//             Connecting the world of embroidery.
//           </p>

//         </div>

//       </footer>

//     </main>
//   );
// }


// /* =========================================================
//    ROADMAP ITEM
// ========================================================= */

// function RoadmapItem({
//   number,
//   label,
//   title,
//   icon,
//   align,
//   highlight = false,
// }: {
//   number: string;
//   label: string;
//   title: string;
//   icon: React.ReactNode;
//   align: "left" | "right";
//   highlight?: boolean;
// }) {
//   return (
//     <div
//       className={`relative flex ${
//         align === "right" ? "md:justify-end" : "md:justify-start"
//       }`}
//     >

//       <div
//         className={`w-full md:w-[46%] ${
//           highlight
//             ? "border-[#8B5CF6] bg-gradient-to-br from-indigo-50 to-purple-50"
//             : "border-indigo-100 bg-white"
//         } rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10`}
//       >

//         <div className="flex items-center gap-4">

//           <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#8B5CF6] text-white">
//             {icon}
//           </div>

//           <div>
//             <p className="text-[10px] font-bold tracking-[0.2em] text-[#8B5CF6]">
//               {number} · {label}
//             </p>

//             <h3 className="mt-1 font-bold text-[#1E1B4B]">
//               {title}
//             </h3>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// ---------------------------------------------------------------------------------------
// import {
//   ArrowRight,
//   BriefcaseBusiness,
//   Users,
//   Headphones,
//   BookOpen,
//   Network,
//   Sparkles,
//   Sprout,
//   HandHeart,
//   Lightbulb,
//   Plus,
//   Wrench,
//   WrenchOff,
// } from "lucide-react";

// const values = [
//   {
//     icon: Users,
//     title: "Community First",
//     text: "Create meaningful connections and make everyone feel part of the journey.",
//   },
//   {
//     icon: BookOpen,
//     title: "Share Knowledge",
//     text: "Exchange skills, techniques, ideas and experience across the industry.",
//   },
//   {
//     icon: HandHeart,
//     title: "Support Each Other",
//     text: "Build a culture where professionals can ask, help and grow together.",
//   },
//   {
//     icon: BriefcaseBusiness,
//     title: "Create Opportunities",
//     text: "Connect talented people with businesses, projects and new possibilities.",
//   },
// ];

// const ecosystemItems = [
//   {
//     icon: BriefcaseBusiness,
//     title: "Jobs",
//   },
//   {
//     icon: Users,
//     title: "Community",
//   },
//   {
//     icon: Headphones,
//     title: "Support",
//   },
//   {
//     icon: BookOpen,
//     title: "Learning",
//   },
//   {
//     icon: Network,
//     title: "Networking",
//   },
// ];

// const journey = [
//   {
//     number: "01",
//     title: "Discover",
//     text: "Find people, jobs, knowledge and inspiration.",
//   },
//   {
//     number: "02",
//     title: "Connect",
//     text: "Build relationships with the people behind the craft.",
//   },
//   {
//     number: "03",
//     title: "Grow",
//     text: "Learn, collaborate and discover new opportunities.",
//   },
//   {
//     number: "04",
//     title: "Give Back",
//     text: "Share your experience and help the next generation.",
//   },
// ];

// export default function Home() {
//   return (
//     <main className="min-h-screen overflow-hidden bg-[#FAFAF5] text-[#1C1917]">

//       {/* =====================================================
//           HERO
//       ====================================================== */}
//       <section className="relative overflow-hidden bg-[#FAFAF5]">

//         {/* Organic background shapes */}
//         <div className="pointer-events-none absolute -left-32 top-40 h-80 w-80 rounded-full bg-[#D97706]/5 blur-3xl" />
//         <div className="pointer-events-none absolute -right-40 -top-20 h-[500px] w-[500px] rounded-full bg-[#14532D]/10 blur-3xl" />

//         {/* Thread / botanical decoration */}
//         <svg
//           className="pointer-events-none absolute left-0 top-20 h-[650px] w-[420px] opacity-30"
//           viewBox="0 0 420 650"
//           fill="none"
//         >
//           <path
//             d="M-20 40C110 120 70 190 170 250C270 310 220 390 105 420C-10 450 45 540 170 590"
//             stroke="#D97706"
//             strokeWidth="1.5"
//           />

//           <path
//             d="M-20 100C120 160 105 245 190 290C280 340 275 420 155 465C65 500 110 575 220 625"
//             stroke="#14532D"
//             strokeWidth="1"
//           />

//           <path
//             d="M130 246C95 205 82 168 98 125"
//             stroke="#166534"
//             strokeWidth="1"
//           />

//           <path
//             d="M106 127C72 135 58 151 49 177"
//             stroke="#166534"
//             strokeWidth="1"
//           />

//           <path
//             d="M105 128C128 105 149 101 175 107"
//             stroke="#166534"
//             strokeWidth="1"
//           />
//         </svg>


//         <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-8 lg:px-8 lg:pb-32">

//           {/* NAVBAR */}
//           <nav className="flex items-center justify-between">

//             <a href="#" className="flex items-center gap-3">

//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#14532D] text-[#FAFAF5] shadow-lg shadow-green-900/10">
//                 <Sprout size={20} />
//               </div>

//               <span className="text-lg font-bold tracking-tight text-[#14532D]">
//                 EMBRO
//               </span>

//             </a>

//             <div className="hidden items-center gap-8 text-sm font-medium text-stone-600 md:flex">
//               <a href="#story" className="transition hover:text-[#14532D]">
//                 Story
//               </a>
//               <a href="#values" className="transition hover:text-[#14532D]">
//                 Values
//               </a>
//               <a href="#ecosystem" className="transition hover:text-[#14532D]">
//                 Ecosystem
//               </a>
//               <a href="#future" className="transition hover:text-[#14532D]">
//                 Future
//               </a>
//             </div>

//             <a
//               href="#join"
//               className="rounded-full border border-[#14532D] px-5 py-2.5 text-sm font-semibold text-[#14532D] transition hover:bg-[#14532D] hover:text-white"
//             >
//               Join Us
//             </a>

//           </nav>


//           {/* HERO CONTENT */}
//           <div className="grid items-center gap-16 pt-24 lg:grid-cols-[0.95fr_1.05fr] lg:pt-28">

//             {/* Copy */}
//             <div className="relative z-10">

//               <div className="mb-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">
//                 <span className="h-px w-8 bg-[#D97706]" />
//                 Craft · Community · Growth
//               </div>

//               <h1 className="max-w-3xl text-5xl font-black leading-[0.94] tracking-[-0.045em] text-[#14532D] sm:text-6xl lg:text-[78px]">
//                 WHERE
//                 <br />
//                 EMBROIDERY
//                 <br />
//                 <span className="relative inline-block">
//                   PEOPLE GROW
//                   <svg
//                     className="absolute -bottom-3 left-0 h-3 w-full"
//                     viewBox="0 0 500 12"
//                     fill="none"
//                     preserveAspectRatio="none"
//                   >
//                     <path
//                       d="M2 8C110 2 250 3 498 6"
//                       stroke="#D97706"
//                       strokeWidth="3"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                 </span>
//                 <br />
//                 TOGETHER.
//               </h1>

//               <p className="mt-8 max-w-xl text-lg leading-8 text-stone-600">
//                 A community built to connect embroidery professionals,
//                 designers, businesses and enthusiasts — helping people share,
//                 learn and grow together.
//               </p>

//               <div className="mt-9 flex flex-col gap-3 sm:flex-row">

//                 <a
//                   href="#join"
//                   className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#14532D] px-6 py-3.5 font-semibold text-white shadow-xl shadow-green-900/10 transition hover:bg-[#166534]"
//                 >
//                   Join the Community
//                   <ArrowRight
//                     size={18}
//                     className="transition group-hover:translate-x-1"
//                   />
//                 </a>

//                 <a
//                   href="#ecosystem"
//                   className="inline-flex items-center justify-center rounded-xl border border-[#14532D] px-6 py-3.5 font-semibold text-[#14532D] transition hover:bg-[#14532D] hover:text-white"
//                 >
//                   Explore Opportunities
//                 </a>

//               </div>

//             </div>


//             {/* HERO VISUAL */}
//             <div className="relative mx-auto w-full max-w-xl">

//               {/* Outer organic ring */}
//               <div className="absolute -inset-6 rounded-[42%_58%_55%_45%/48%_44%_56%_52%] border border-[#D97706]/30" />

//               <div className="absolute -inset-12 rounded-full bg-[#14532D]/10 blur-3xl" />

//               <div className="relative overflow-hidden rounded-[38px] bg-[#14532D] shadow-2xl">

//                 {/* Workshop image placeholder */}
//                 <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#66855f] via-[#275b38] to-[#14532D]">

//                   {/* Pattern */}
//                   <div className="absolute inset-0 opacity-10">
//                     <svg
//                       className="h-full w-full"
//                       viewBox="0 0 500 650"
//                       fill="none"
//                     >
//                       <path
//                         d="M30 120C120 40 230 80 280 160C330 240 410 220 470 150"
//                         stroke="white"
//                         strokeWidth="2"
//                       />
//                       <path
//                         d="M20 430C120 350 190 430 280 370C370 310 430 350 500 420"
//                         stroke="white"
//                         strokeWidth="2"
//                       />
//                     </svg>
//                   </div>


//                   {/* Central embroidery-inspired graphic */}
//                   <div className="absolute left-1/2 top-1/2 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#D97706]/60">

//                     <div className="absolute inset-5 rounded-full border border-[#D97706]/30" />

//                     <div className="absolute inset-12 rounded-full border border-dashed border-[#D97706]/50" />

//                     <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#FAFAF5] text-[#14532D] shadow-2xl">

//                       <Sprout size={48} strokeWidth={1.2} />

//                     </div>

//                   </div>


//                   {/* Image caption */}
//                   <div className="absolute bottom-6 left-6 right-6">

//                     <div className="rounded-2xl border border-white/10 bg-[#0b301c]/70 p-5 backdrop-blur-md">

//                       <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D97706]">
//                         Crafted Together
//                       </p>

//                       <p className="mt-2 text-xl font-bold text-white">
//                         Every stitch starts with a person.
//                       </p>

//                     </div>

//                   </div>

//                 </div>
//               </div>


//               {/* Floating Job card */}
//               <div className="absolute -left-6 top-20 w-48 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl shadow-green-900/10">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#D97706]">
//                     <Plus size={18} />
//                   </div>

//                   <div>
//                     <p className="text-[10px] font-bold uppercase tracking-wider text-[#D97706]">
//                       New Opportunity
//                     </p>

//                     <p className="mt-1 text-sm font-bold text-[#14532D]">
//                       Designer Needed
//                     </p>
//                   </div>

//                 </div>

//               </div>


//               {/* Floating community card */}
//               <div className="absolute -right-4 top-12 hidden w-56 rounded-2xl border border-stone-200 bg-white p-4 shadow-xl shadow-green-900/10 sm:block">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14532D] text-xs font-bold text-white">
//                     JD
//                   </div>

//                   <div>
//                     <p className="text-xs font-bold text-[#14532D]">
//                       Community Post
//                     </p>

//                     <p className="text-[10px] text-stone-400">
//                       Just now
//                     </p>
//                   </div>

//                 </div>

//                 <p className="mt-3 text-xs leading-5 text-stone-500">
//                   What embroidery techniques are you learning this month?
//                 </p>

//                 <div className="mt-3 flex gap-4 text-[10px] text-stone-400">
//                   <span>♡ 48</span>
//                   <span>○ 12</span>
//                 </div>

//               </div>

//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           STORY
//       ====================================================== */}
//       <section id="story" className="bg-white py-24 lg:py-32">

//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">

//             <div>

//               <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D97706]">
//                 Our Story
//               </p>

//               <h2 className="mt-5 max-w-xl text-5xl font-black leading-[1] tracking-tight text-[#14532D] sm:text-6xl">
//                 Every Stitch
//                 <br />
//                 Has a Story.
//                 <br />
//                 <span className="text-[#D97706]">
//                   So Does Every Professional.
//                 </span>
//               </h2>

//             </div>


//             <div>

//               <p className="text-xl leading-9 text-stone-600">
//                 Embroidery is built on patience, creativity and skill. But
//                 behind every stitch is someone who has spent time learning,
//                 creating and perfecting their craft.
//               </p>

//               <p className="mt-6 leading-8 text-stone-500">
//                 Our journey is about bringing those people closer together —
//                 creating a place where knowledge moves freely, opportunities
//                 become easier to find and everyone has room to grow.
//               </p>


//               {/* Journey */}
//               <div className="mt-12 grid gap-5 sm:grid-cols-2">

//                 {journey.map((item) => (
//                   <div
//                     key={item.number}
//                     className="rounded-2xl border border-stone-200 bg-[#FAFAF5] p-6 transition hover:-translate-y-1 hover:border-[#D97706]"
//                   >

//                     <span className="text-xs font-bold tracking-[0.2em] text-[#D97706]">
//                       {item.number}
//                     </span>

//                     <h3 className="mt-3 text-lg font-bold text-[#14532D]">
//                       {item.title}
//                     </h3>

//                     <p className="mt-2 text-sm leading-6 text-stone-500">
//                       {item.text}
//                     </p>

//                   </div>
//                 ))}

//               </div>

//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           VALUES
//       ====================================================== */}
//       <section id="values" className="bg-[#FAFAF5] py-24 lg:py-32">

//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="max-w-2xl">

//             <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D97706]">
//               What Matters
//             </p>

//             <h2 className="mt-5 text-4xl font-black tracking-tight text-[#14532D] sm:text-5xl">
//               Values that keep
//               <br />
//               us growing.
//             </h2>

//           </div>


//           <div className="mt-14 grid gap-5 md:grid-cols-2">

//             {values.map((value, index) => {
//               const Icon = value.icon;

//               return (
//                 <div
//                   key={value.title}
//                   className="group relative overflow-hidden rounded-3xl bg-[#14532D] p-8 text-white transition duration-300 hover:-translate-y-1"
//                 >

//                   {/* Botanical decoration */}
//                   <div className="absolute -right-10 -top-10 opacity-10">
//                     <svg
//                       width="180"
//                       height="180"
//                       viewBox="0 0 180 180"
//                       fill="none"
//                     >
//                       <path
//                         d="M25 155C50 90 75 55 155 25"
//                         stroke="#D97706"
//                         strokeWidth="2"
//                       />
//                       <path
//                         d="M65 100C45 65 50 40 75 20"
//                         stroke="#D97706"
//                         strokeWidth="2"
//                       />
//                       <path
//                         d="M92 75C120 90 145 85 160 60"
//                         stroke="#D97706"
//                         strokeWidth="2"
//                       />
//                     </svg>
//                   </div>


//                   <div className="relative">

//                     <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#D97706]">
//                       <Icon size={23} strokeWidth={1.7} />
//                     </div>

//                     <span className="mt-7 block text-xs font-bold tracking-[0.2em] text-[#D97706]">
//                       0{index + 1}
//                     </span>

//                     <h3 className="mt-2 text-2xl font-bold">
//                       {value.title}
//                     </h3>

//                     <p className="mt-3 max-w-md leading-7 text-white/60">
//                       {value.text}
//                     </p>

//                   </div>

//                 </div>
//               );
//             })}

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           ECOSYSTEM
//       ====================================================== */}
//       <section id="ecosystem" className="bg-white py-24 lg:py-32">

//         <div className="mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="text-center">

//             <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D97706]">
//               The Ecosystem
//             </p>

//             <h2 className="mt-5 text-4xl font-black tracking-tight text-[#14532D] sm:text-5xl">
//               One community.
//               <br />
//               Many ways to grow.
//             </h2>

//           </div>


//           {/* Ecosystem graphic */}
//           <div className="relative mx-auto mt-20 h-[570px] max-w-3xl">

//             {/* Thread circles */}
//             <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D97706]/60" />

//             <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#14532D]/10" />


//             {/* Connecting lines */}
//             <div className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-[#D97706]" />

//             <div className="absolute bottom-0 left-1/2 h-20 w-px -translate-x-1/2 bg-gradient-to-t from-transparent to-[#D97706]" />

//             <div className="absolute left-0 top-1/2 h-px w-28 bg-gradient-to-r from-transparent to-[#D97706]" />

//             <div className="absolute right-0 top-1/2 h-px w-28 bg-gradient-to-l from-transparent to-[#D97706]" />


//             {/* Center */}
//             <div className="absolute left-1/2 top-1/2 z-10 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#14532D] shadow-2xl shadow-green-900/20">

//               <div className="absolute inset-4 rounded-full border border-[#D97706]/40" />

//               <div className="absolute inset-9 rounded-full border border-dashed border-[#D97706]/30" />

//               <div className="relative text-center">

//                 <Sprout
//                   size={34}
//                   strokeWidth={1.3}
//                   className="mx-auto text-[#D97706]"
//                 />

//                 <p className="mt-3 text-xl font-bold text-white">
//                   EMBROIDERY
//                 </p>

//                 <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-white/50">
//                   Ecosystem
//                 </p>

//               </div>

//             </div>


//             {/* Ecosystem nodes */}
//             {ecosystemItems.map((item, index) => {
//               const Icon = item.icon;

//               const positions = [
//                 "left-1/2 top-0 -translate-x-1/2",
//                 "right-0 top-[25%]",
//                 "right-0 bottom-[22%]",
//                 "left-1/2 bottom-0 -translate-x-1/2",
//                 "left-0 bottom-[22%]",
//               ];

//               return (
//                 <div
//                   key={item.title}
//                   className={`absolute ${positions[index]} z-20`}
//                 >

//                   <div className="flex min-w-[120px] flex-col items-center gap-3">

//                     <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D97706]/30 bg-[#FAFAF5] text-[#14532D] shadow-sm">
//                       <Icon size={21} />
//                     </div>

//                     <span className="text-sm font-bold text-[#14532D]">
//                       {item.title}
//                     </span>

//                   </div>

//                 </div>
//               );
//             })}

//           </div>

//         </div>
//       </section>


//       {/* =====================================================
//           FUTURE
//       ====================================================== */}
//       <section
//         id="future"
//         className="relative overflow-hidden bg-[#14532D] py-24 text-white lg:py-32"
//       >

//         <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#D97706]/10 blur-3xl" />

//         <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

//           <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

//             <div>

//               <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#D97706]">
//                 Looking Ahead
//               </p>

//               <h2 className="mt-5 text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl">
//                 BUILDING MORE
//                 <br />
//                 THAN A WEBSITE.
//                 <br />
//                 <span className="text-[#D97706]">
//                   BUILDING AN
//                   <br />
//                   INDUSTRY COMMUNITY.
//                 </span>
//               </h2>

//               <p className="mt-7 max-w-lg leading-8 text-white/60">
//                 We&apos;re creating the foundation for a more connected,
//                 knowledgeable and opportunity-rich embroidery industry.
//               </p>

//             </div>


//             {/* Future cards */}
//             <div className="space-y-4">

//               {[
//                 ["TODAY", "Connect people and opportunities.", Users],
//                 ["NEXT", "Make learning and support easier.", BookOpen],
//                 ["TOMORROW", "Build tools for the entire ecosystem.", WrenchIcon],
//               ].map(([label, text, Icon]) => (
//                 <div
//                   key={String(label)}
//                   className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur"
//                 >

//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D97706] text-[#14532D]">
//                     <Icon size={21} />
//                   </div>

//                   <div>

//                     <p className="text-[10px] font-bold tracking-[0.2em] text-[#D97706]">
//                       {label as string}
//                     </p>

//                     <p className="mt-1 font-semibold text-white">
//                       {text as string}
//                     </p>

//                   </div>

//                 </div>
//               ))}

//             </div>

//           </div>
//         </div>
//       </section>


//       {/* =====================================================
//           FINAL CTA
//       ====================================================== */}
//       <section id="join" className="bg-[#FAFAF5] px-6 py-24 sm:py-32">

//         <div className="mx-auto max-w-4xl text-center">

//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#14532D] text-[#D97706]">
//             <Sprout size={26} />
//           </div>

//           <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#D97706]">
//             Join the Community
//           </p>

//           <h2 className="mt-5 text-5xl font-black tracking-tight text-[#14532D] sm:text-6xl lg:text-7xl">
//             Let&apos;s Grow
//             <br />
//             <span className="text-[#D97706]">
//               Together.
//             </span>
//           </h2>

//           <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-stone-500">
//             Be part of a community where embroidery, people and opportunity
//             grow side by side.
//           </p>

//           <a
//             href="#"
//             className="group mt-9 inline-flex items-center gap-2 rounded-xl bg-[#14532D] px-7 py-4 font-bold text-white shadow-xl shadow-green-900/10 transition hover:bg-[#166534]"
//           >
//             Join the Community
//             <ArrowRight
//               size={18}
//               className="transition group-hover:translate-x-1"
//             />
//           </a>

//         </div>
//       </section>


//       {/* =====================================================
//           FOOTER
//       ====================================================== */}
//       <footer className="bg-[#14532D] px-6 py-8 text-white">

//         <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

//           <div className="flex items-center gap-3">

//             <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
//               <Sprout size={17} />
//             </div>

//             <span className="font-bold">
//               EMBRO
//             </span>

//           </div>

//           <p className="text-sm text-white/40">
//             Craft · Community · Growth
//           </p>

//         </div>

//       </footer>

//     </main>
//   );
// }


// /* =========================================================
//    FUTURE ICON
// ========================================================= */

// function WrenchIcon({ size }: { size?: number }) {
//   return <WrenchOff size={size ?? 20} />;
// }

// ---------------------------------------------------------------------------------------

"use client";

import {
  ArrowDownRight,
  ArrowRight,
  BriefcaseBusiness,
  Users,
  LifeBuoy,
  BookOpen,
  Sparkles,
  Scissors,
  MessageCircle,
  Heart,
  MoveUpRight,
} from "lucide-react";

const problems = [
  {
    number: "01",
    title: "Finding talent",
    text: "Great skills are everywhere. Finding the right people shouldn't be difficult.",
  },
  {
    number: "02",
    title: "Finding jobs",
    text: "Connect embroidery professionals with opportunities that fit their skills.",
  },
  {
    number: "03",
    title: "Sharing knowledge",
    text: "Make experience, ideas and practical knowledge easier to discover.",
  },
  {
    number: "04",
    title: "Getting support",
    text: "Build a place where people can ask questions and help each other.",
  },
];

const platform = [
  {
    icon: BriefcaseBusiness,
    number: "01",
    title: "Jobs",
    text: "Discover opportunities, projects and new ways to work.",
  },
  {
    icon: Users,
    number: "02",
    title: "Community",
    text: "Meet the people shaping the embroidery industry.",
  },
  {
    icon: LifeBuoy,
    number: "03",
    title: "Support",
    text: "Ask questions, solve problems and learn from others.",
  },
  {
    icon: BookOpen,
    number: "04",
    title: "Learning",
    text: "Grow your knowledge through people and shared experience.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFAFA] text-[#27272A]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#18181B] text-white">

        {/* Coral glow */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#F97360]/10 blur-3xl" />

        {/* Small decorative grid */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>


        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-7 lg:px-8 lg:pb-28">

          {/* NAV */}
          <nav className="flex items-center justify-between">

            <a href="#" className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F97360] text-[#18181B]">
                <Scissors size={19} />
              </div>

              <span className="text-lg font-black tracking-tight">
                EMBRO
              </span>

            </a>


            <div className="hidden items-center gap-9 text-sm text-white/50 md:flex">
              <a
                href="#problem"
                className="transition hover:text-white"
              >
                Why Us
              </a>

              <a
                href="#platform"
                className="transition hover:text-white"
              >
                Platform
              </a>

              <a
                href="#community"
                className="transition hover:text-white"
              >
                Community
              </a>

              <a
                href="#join"
                className="transition hover:text-white"
              >
                Contact
              </a>
            </div>


            <a
              href="#join"
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-bold transition hover:border-[#F97360] hover:bg-[#F97360] hover:text-[#18181B]"
            >
              Join Us
            </a>

          </nav>


          {/* HERO */}
          <div className="grid items-center gap-16 pt-24 lg:grid-cols-[1fr_0.95fr] lg:pt-28">

            {/* LEFT */}
            <div className="relative z-10">

              <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#F97360]">

                <span className="h-px w-10 bg-[#F97360]" />

                A New Chapter For Embroidery

              </div>


              <h1 className="text-[64px] font-black leading-[0.83] tracking-[-0.06em] sm:text-[82px] lg:text-[108px]">

                EMBROIDERY.

                <br />

                <span className="relative inline-block">

                  REIMAGINED.

                  {/* Coral underline */}
                  <svg
                    className="absolute -bottom-5 left-0 h-5 w-full"
                    viewBox="0 0 600 20"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M4 12C130 3 300 18 596 6"
                      stroke="#F97360"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>

                </span>

              </h1>


              <p className="mt-10 max-w-xl text-lg leading-8 text-white/55">
                A bold new platform connecting embroidery professionals,
                businesses, designers and enthusiasts — all in one creative
                community.
              </p>


              <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                <a
                  href="#join"
                  className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#F97360] px-6 py-3.5 font-bold text-[#18181B] transition hover:bg-[#ff8877]"
                >
                  Join the Community

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </a>


                <a
                  href="#platform"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-6 py-3.5 font-bold text-white transition hover:border-white hover:bg-white hover:text-[#18181B]"
                >
                  Explore Jobs

                  <ArrowDownRight size={17} />
                </a>

              </div>

            </div>


            {/* RIGHT CREATIVE VISUAL */}
            <div className="relative mx-auto w-full max-w-xl">

              {/* Large coral shape */}
              <div className="absolute -right-10 top-4 h-40 w-40 rounded-full bg-[#F97360]" />

              {/* Image-style composition */}
              <div className="relative min-h-[520px]">

                {/* Main panel */}
                <div className="absolute left-8 top-8 h-[440px] w-[82%] overflow-hidden bg-[#27272A]">

                  {/* abstract machine / embroidery lines */}
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 500 600"
                    fill="none"
                  >

                    <circle
                      cx="250"
                      cy="300"
                      r="180"
                      stroke="#F97360"
                      strokeWidth="1"
                      opacity="0.4"
                    />

                    <circle
                      cx="250"
                      cy="300"
                      r="140"
                      stroke="#F97360"
                      strokeWidth="1"
                      strokeDasharray="5 8"
                      opacity="0.5"
                    />

                    <circle
                      cx="250"
                      cy="300"
                      r="90"
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.15"
                    />

                    <path
                      d="M30 130C120 70 170 160 250 110C330 60 390 130 470 70"
                      stroke="#F97360"
                      strokeWidth="2"
                    />

                    <path
                      d="M20 470C130 390 180 500 270 440C360 380 420 460 490 400"
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.2"
                    />

                    <path
                      d="M80 300C160 200 340 200 420 300C340 400 160 400 80 300Z"
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.12"
                    />

                  </svg>


                  {/* Center */}
                  <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F97360]/50">

                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F97360] text-[#18181B]">
                      <Scissors size={40} strokeWidth={1.4} />
                    </div>

                  </div>


                  {/* Caption */}
                  <div className="absolute bottom-5 left-5 right-5 border border-white/10 bg-[#18181B]/90 p-5 backdrop-blur">

                    <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#F97360]">
                      Built For The Industry
                    </p>

                    <p className="mt-2 text-xl font-black">
                      Where craft meets connection.
                    </p>

                  </div>

                </div>


                {/* Vertical label */}
                <div className="absolute right-0 top-28 hidden [writing-mode:vertical-rl] md:block">

                  <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/30">
                    COMMUNITY · CREATIVITY · OPPORTUNITY
                  </span>

                </div>


                {/* Floating card */}
                <div className="absolute -left-2 bottom-12 w-52 bg-white p-4 text-[#18181B] shadow-2xl">

                  <div className="flex items-center justify-between">

                    <span className="text-[9px] font-black uppercase tracking-wider text-[#F97360]">
                      New Opportunity
                    </span>

                    <MoveUpRight size={14} />

                  </div>

                  <p className="mt-3 font-black">
                    Embroidery Designer
                  </p>

                  <div className="mt-3 flex gap-1">
                    <span className="h-1.5 w-12 bg-[#F97360]" />
                    <span className="h-1.5 w-6 bg-zinc-200" />
                    <span className="h-1.5 w-4 bg-zinc-200" />
                  </div>

                </div>


                {/* Number */}
                <div className="absolute -right-3 bottom-0">

                  <span className="text-[120px] font-black leading-none tracking-[-0.1em] text-[#F97360]">
                    01
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PROBLEM
      ====================================================== */}
      <section id="problem" className="bg-white py-24 lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F97360]">
                The Problem
              </p>

              <h2 className="mt-5 text-5xl font-black leading-[0.92] tracking-[-0.04em] text-[#18181B] sm:text-6xl">

                THE INDUSTRY
                <br />

                IS CHANGING.

                <br />

                <span className="text-[#F97360]">
                  SO ARE WE.
                </span>

              </h2>

            </div>


            <div>

              <p className="max-w-2xl text-xl leading-8 text-zinc-500">
                The embroidery industry is full of talented people and
                incredible businesses. The challenge is connecting all of
                them in a way that feels simple, modern and useful.
              </p>


              {/* Problem cards */}
              <div className="mt-12 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2">

                {problems.map((item) => (
                  <div
                    key={item.number}
                    className="group bg-white p-7 transition hover:bg-[#18181B] hover:text-white"
                  >

                    <div className="flex items-start justify-between">

                      <span className="text-5xl font-black tracking-[-0.06em] text-[#F97360]">
                        {item.number}
                      </span>

                      <ArrowDownRight
                        size={20}
                        className="text-zinc-300 transition group-hover:text-[#F97360]"
                      />

                    </div>

                    <h3 className="mt-10 text-xl font-black">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-zinc-500 group-hover:text-white/45">
                      {item.text}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          PLATFORM
      ====================================================== */}
      <section id="platform" className="bg-[#27272A] py-24 text-white lg:py-32">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F97360]">
                The Platform
              </p>

              <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.05em] sm:text-7xl">

                ONE PLATFORM.

                <br />

                <span className="text-white/30">
                  COUNTLESS
                </span>

                <br />

                CONNECTIONS.

              </h2>

            </div>


            <p className="max-w-sm leading-7 text-white/40">
              Everything the embroidery community needs to discover,
              connect, learn and move forward.
            </p>

          </div>


          {/* Cards */}
          <div className="mt-16 grid gap-4 md:grid-cols-2">

            {platform.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`group relative min-h-[260px] overflow-hidden bg-white p-8 text-[#18181B] transition duration-300 hover:-translate-y-2 ${
                    index === 0
                      ? "md:translate-y-8"
                      : index === 3
                      ? "md:-translate-y-8"
                      : ""
                  }`}
                >

                  {/* giant number */}
                  <span className="absolute -right-3 -top-8 text-[130px] font-black leading-none tracking-[-0.1em] text-zinc-100 transition group-hover:text-[#F97360]/10">
                    {item.number}
                  </span>


                  <div className="relative flex h-full flex-col justify-between">

                    <div className="flex items-center justify-between">

                      <div className="flex h-12 w-12 items-center justify-center bg-[#18181B] text-[#F97360] transition group-hover:bg-[#F97360] group-hover:text-[#18181B]">
                        <Icon size={21} />
                      </div>

                      <ArrowRight
                        size={20}
                        className="text-zinc-300 transition group-hover:translate-x-1 group-hover:text-[#F97360]"
                      />

                    </div>


                    <div className="mt-12">

                      <h3 className="text-3xl font-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 max-w-md leading-7 text-zinc-500">
                        {item.text}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          COMMUNITY — EDITORIAL
      ====================================================== */}
      <section id="community" className="relative overflow-hidden bg-[#FAFAFA] py-24 lg:py-32">

        {/* Coral block */}
        <div className="absolute -right-24 top-32 h-72 w-72 rounded-full bg-[#F97360]/10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">

            {/* Editorial collage */}
            <div className="relative min-h-[560px]">

              {/* Large dark image panel */}
              <div className="absolute left-0 top-0 h-[430px] w-[72%] overflow-hidden bg-[#18181B]">

                <div className="absolute inset-0">

                  <svg
                    className="h-full w-full"
                    viewBox="0 0 500 500"
                    fill="none"
                  >

                    <path
                      d="M-20 380C70 250 130 390 220 250C310 110 390 260 530 100"
                      stroke="#F97360"
                      strokeWidth="3"
                    />

                    <path
                      d="M-20 420C80 300 150 440 240 310C330 180 410 320 520 160"
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.15"
                    />

                    <circle
                      cx="300"
                      cy="230"
                      r="110"
                      stroke="#F97360"
                      strokeWidth="1"
                      opacity="0.3"
                    />

                    <circle
                      cx="300"
                      cy="230"
                      r="75"
                      stroke="white"
                      strokeWidth="1"
                      strokeDasharray="4 8"
                      opacity="0.2"
                    />

                  </svg>

                </div>


                <div className="absolute bottom-7 left-7">

                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#F97360]">
                    People Behind The Craft
                  </p>

                  <p className="mt-3 max-w-sm text-3xl font-black">
                    Different skills.
                    <br />
                    One community.
                  </p>

                </div>

              </div>


              {/* Coral panel */}
              <div className="absolute bottom-0 right-0 flex h-52 w-[47%] flex-col justify-between bg-[#F97360] p-7 text-[#18181B]">

                <MessageCircle size={28} />

                <div>

                  <p className="text-4xl font-black tracking-tight">
                    01 → ∞
                  </p>

                  <p className="mt-1 text-sm font-bold">
                    One connection can change everything.
                  </p>

                </div>

              </div>


              {/* White profile card */}
              <div className="absolute right-[10%] top-24 w-52 bg-white p-5 shadow-2xl">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#27272A] text-xs font-black text-white">
                    AM
                  </div>

                  <div>
                    <p className="text-xs font-black">
                      Alex Morgan
                    </p>

                    <p className="text-[10px] text-zinc-400">
                      Embroidery Professional
                    </p>
                  </div>

                </div>

                <div className="mt-5 flex items-center gap-3 text-zinc-400">

                  <Heart size={14} />

                  <span className="text-[10px]">
                    248 people connected
                  </span>

                </div>

              </div>

            </div>


            {/* Copy */}
            <div>

              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F97360]">
                The Community
              </p>

              <h2 className="mt-5 text-5xl font-black leading-[0.9] tracking-[-0.05em] text-[#18181B] sm:text-6xl">

                BUILT BY

                <br />

                PEOPLE WHO

                <br />

                <span className="text-[#F97360]">
                  CARE.
                </span>

              </h2>

              <p className="mt-8 max-w-lg text-lg leading-8 text-zinc-500">
                A community isn't just a collection of profiles. It's people
                sharing ideas, answering questions, celebrating progress and
                creating opportunities for one another.
              </p>


              <div className="mt-10 border-t border-zinc-200 pt-7">

                <div className="flex items-center justify-between">

                  <span className="text-sm font-bold text-[#18181B]">
                    Join people building what&apos;s next.
                  </span>

                  <a
                    href="#join"
                    className="flex h-11 w-11 items-center justify-center bg-[#18181B] text-[#F97360] transition hover:bg-[#F97360] hover:text-[#18181B]"
                  >
                    <ArrowRight size={18} />
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          STATEMENT
      ====================================================== */}
      <section className="border-y border-zinc-200 bg-white py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <p className="text-6xl font-black tracking-[-0.07em] text-[#F97360]">
                01
              </p>

              <p className="mt-4 font-bold">
                Connect the industry.
              </p>
            </div>

            <div>
              <p className="text-6xl font-black tracking-[-0.07em] text-[#F97360]">
                02
              </p>

              <p className="mt-4 font-bold">
                Elevate the people.
              </p>
            </div>

            <div>
              <p className="text-6xl font-black tracking-[-0.07em] text-[#F97360]">
                03
              </p>

              <p className="mt-4 font-bold">
                Build what&apos;s next.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section id="join" className="relative overflow-hidden bg-[#18181B] px-6 py-28 text-white sm:py-36">

        {/* Huge coral circle */}
        <div className="pointer-events-none absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full border-[80px] border-[#F97360]/10" />

        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 bg-[#F97360]/5 blur-3xl" />


        <div className="relative mx-auto max-w-6xl">

          <div className="max-w-5xl">

            <p className="text-xs font-black uppercase tracking-[0.25em] text-[#F97360]">
              The Next Chapter
            </p>

            <h2 className="mt-6 text-[62px] font-black leading-[0.85] tracking-[-0.06em] sm:text-[90px] lg:text-[120px]">

              LET&apos;S BUILD

              <br />

              <span className="text-white/30">
                WHAT&apos;S
              </span>{" "}

              <span className="text-[#F97360]">
                NEXT.
              </span>

            </h2>

          </div>


          <div className="mt-12 flex flex-col items-start justify-between gap-10 border-t border-white/10 pt-8 md:flex-row md:items-center">

            <p className="max-w-md text-lg leading-7 text-white/40">
              The future of embroidery won't be built by one person.
              It will be built together.
            </p>

            <a
              href="#"
              className="group inline-flex items-center gap-3 bg-[#F97360] px-7 py-4 font-black text-[#18181B] transition hover:bg-[#ff8877]"
            >
              Join the Community

              <ArrowRight
                size={19}
                className="transition group-hover:translate-x-1"
              />
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-[#18181B] px-6 pb-8 text-white">

        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F97360] text-[#18181B]">
              <Scissors size={17} />
            </div>

            <span className="font-black">
              EMBRO
            </span>

          </div>

          <p className="text-sm text-white/30">
            Embroidery. Reimagined.
          </p>

        </div>

      </footer>

    </main>
  );
}