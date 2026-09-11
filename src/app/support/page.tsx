"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileQuestion,
  Users,
  Building2,
  Cpu,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    category: "অ্যাকাউন্ট ও প্রোফাইল",
    question: "আমি কীভাবে আমার একাউন্ট ক্যান্ডিডেট থেকে এমপ্লয়ার (নিয়োগকারী)-এ রূপান্তর করব?",
    answer:
      "নিরাপত্তা ও যাচাইয়ের জন্য নিয়োগকারী একাউন্টগুলোকে ম্যানুয়ালি অনুমোদন দেওয়া হয়। আপনার রোল রূপান্তরের জন্য নিচের সাপোর্ট ফর্মে 'রোল আপগ্রেড' বিষয় নির্বাচন করে আপনার কারখানা/প্রতিষ্ঠানের নাম, অবস্থান ও ফোন নম্বর লিখে মেসেজ পাঠান। আমাদের টিম ২৪ ঘণ্টার মধ্যে সহায়তা করবে।",
  },
  {
    category: "অ্যাকাউন্ট ও প্রোফাইল",
    question: "EMBOBD-তে কীভাবে একাউন্ট তৈরি করব?",
    answer:
      "নেভিগেশন বারের উপরে ডানে 'একাউন্ট খুলুন' বাটনে ক্লিক করুন। আপনি কি কাজের জন্য আবেদন করতে চান (ক্যান্ডিডেট/ডিজিটাইজার) নাকি চাকরির বিজ্ঞপ্তি দিতে চান (নিয়োগকারী/ফ্যাক্টরি মালিক) — তা বেছে নিয়ে সহজে ফর্মটি পূরণ করুন।",
  },
  {
    category: "ব্যবসা ডিরেক্টরি",
    question: "আমার এমব্রয়ডারি ফ্যাক্টরি বা শপ কীভাবে ভেরিফাইড (স্বীকৃত) ব্যাজ পাবে?",
    answer:
      "ব্যবসা ডিরেক্টরি পেইজ থেকে 'আপনার ব্যবসা তালিকাভুক্ত করুন' ফর্মে তথ্য জমা দিন। আমাদের মডারেশন টিম কারখানা ঠিকানা, ট্রেড লাইসেন্স বা ফোন নম্বর যাচাই করে ২৪-৪৮ ঘণ্টার মধ্যে 'ভেরিফাইড প্রতিষ্ঠান' ব্যাজ প্রদান করবে।",
  },
  {
    category: "কমিউনিটি ও টিউটোরিয়াল",
    question: "কমিউনিটিতে টিউটোরিয়াল বা ডিজাইন কীভাবে পোস্ট করব?",
    answer:
      "লগইন থাকা অবস্থায় কমিউনিটি পেইজ থেকে 'নতুন পোস্ট লিখুন' বাটনে ক্লিক করে আপনার লেখা, ছবি বা ফাইল লিংক যুক্ত করতে পারেন। মডারেটরদের প্রাথমিক পর্যালোচনার পর পোস্টটি সরাসরি লাইভ ফিডে প্রকাশিত হবে।",
  },
  {
    category: "চাকরি ও আবেদন",
    question: "চাকরিতে আবেদন করা কি কারিগর বা ডিজিটাইজারদের জন্য সম্পূর্ণ ফ্রি?",
    answer:
      "হ্যাঁ, EMBOBD সব এমব্রয়ডারি পেশাদার, উইলকম ডিজাইনার ও কারিগরদের জন্য শতভাগ ফ্রি। আপনি সরাসরি কারখানা কর্তৃপক্ষের সাথে যোগাযোগ করে আবেদন করতে পারবেন— কোনো প্রকার মধ্যস্বত্বভোগী বা এজেন্সি কমিশন ছাড়াই।",
  },
  {
    category: "ফাইল ফরম্যাট ও সফটওয়্যার",
    question: "কোন কোন এমব্রয়ডারি মেশিন ও ফাইল ফরম্যাট নিয়ে আলোচনা করা যাবে?",
    answer:
      "EMBOBD-তে Wilcom EMB, Tajima DST, Barudan DSB, Brother PES এবং ZSK সহ সকল প্রধান ইন্ডাস্ট্রিয়াল ফরম্যাটের ফাইল শেয়ার ও কৌশল নিয়ে আলোচনা করা যায়।",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "টেকনিক্যাল সাপোর্ট",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-white pb-24 font-sans text-zinc-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50/70 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-900 shadow-xs">
              <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
              <span>EMBOBD হেল্পডেস্ক ও সাপোর্ট</span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              আমরা কীভাবে আপনাকে সাহায্য করতে পারি?
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600 sm:text-lg">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলীর উত্তর খুঁজুন অথবা যেকোনো প্রয়োজনে আমাদের সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন।
            </p>
          </div>
        </div>
      </section>

      {/* QUICK CONTACT CHANNELS */}
      <section className="border-b border-zinc-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-950">হটলাইন সাপোর্ট</h3>
                <p className="mt-1 text-xs text-zinc-600">রবি - বৃহস্পতি, সকাল ৯টা - সন্ধ্যা ৬টা</p>
                <p className="mt-2 text-xs font-bold text-zinc-900">+৮৮০ ১৭০০-০০০০০০</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-950">ইমেইল হেল্পডেস্ক</h3>
                <p className="mt-1 text-xs text-zinc-600">যেকোনো সময় লিখুন, ২৪ ঘণ্টার মধ্যে উত্তর</p>
                <p className="mt-2 text-xs font-bold text-zinc-900">support@embobd.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/60 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-950">হেড অফিস</h3>
                <p className="mt-1 text-xs text-zinc-600">উত্তরা, ঢাকা - ১২৩০, বাংলাদেশ</p>
                <p className="mt-2 text-xs font-bold text-zinc-900">সরাসরি সাক্ষাৎ করুন</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT: FAQ & CONTACT FORM */}
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* LEFT 7 COLS: FAQs */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                প্রশ্নোত্তর
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl">
              সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              প্ল্যাটফর্ম ব্যবহার ও অ্যাকাউন্টের বিষয়ে প্রয়োজনীয় তথ্য এক নজরে দেখে নিন।
            </p>

            <div className="mt-8 space-y-4">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-zinc-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-zinc-900"
                    >
                      <span className="pr-4">{item.question}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 shrink-0 text-zinc-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="border-t border-zinc-100 bg-zinc-50/50 p-5 text-xs leading-relaxed text-zinc-600">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT 5 COLS: CONTACT FORM */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50/60 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-zinc-950">আমাদের সাথে যোগাযোগ করুন</h3>
              <p className="mt-1 text-xs text-zinc-600">
                নির্দিষ্ট কোনো প্রশ্ন বা সহায়তা প্রয়োজন হলে নিচের ফর্মটি পূরণ করুন।
              </p>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                  <h4 className="mt-3 text-sm font-bold text-emerald-900">
                    মেসেজ সফলভাবে পাঠানো হয়েছে!
                  </h4>
                  <p className="mt-1 text-xs text-emerald-700">
                    আমাদের টিম খুব শীঘ্রই আপনার ইমেইলে যোগাযোগ করবে। ধন্যবাদ।
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-bold text-emerald-900 underline"
                  >
                    আরেকটি মেসেজ পাঠান
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-800">
                      আপনার পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="যেমন: মোঃ কামরুল ইসলাম"
                      className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800">
                        ইমেইল ঠিকানা *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800">
                        ফোন নম্বর
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="০১৭xxxxxxxx"
                        className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800">
                      বিষয় / ক্যাটাগরি
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-medium text-zinc-800 focus:border-zinc-950 focus:outline-none"
                    >
                      <option value="টেকনিক্যাল সাপোর্ট">টেকনিক্যাল সাপোর্ট</option>
                      <option value="রোল আপগ্রেড (ক্যান্ডিডেট থেকে এমপ্লয়ার)">রোল আপগ্রেড (ক্যান্ডিডেট থেকে এমপ্লয়ার)</option>
                      <option value="ব্যবসা ভেরিফিকেশন">ব্যবসা ভেরিফিকেশন ও লিস্টিং</option>
                      <option value="বিজ্ঞাপন ও পার্টনারশিপ">বিজ্ঞাপন ও পার্টনারশিপ</option>
                      <option value="অন্যান্য">অন্যান্য</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-800">
                      আপনার বার্তা / সমস্যা বিস্তারিত লিখুন *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="আপনার সমস্যা বা প্রশ্নের বিস্তারিত বিবরণ দিন..."
                      className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-zinc-800 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
                    <span>{loading ? "পাঠানো হচ্ছে..." : "মেসেজ পাঠান"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
