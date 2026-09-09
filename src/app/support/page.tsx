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
} from "lucide-react";

const FAQ_ITEMS = [
  {
    category: "General & Accounts",
    question: "How do I upgrade my account from Candidate to Employer?",
    answer:
      "Per EMBOBD verification guidelines, candidate accounts require manual validation before posting jobs or managing company profiles. To upgrade your role to Employer, simply submit a ticket using the contact form below with Category 'Role Upgrade (Candidate to Employer)' and include your factory name, location, and phone number.",
  },
  {
    category: "General & Accounts",
    question: "How do I create an account on EMBOBD?",
    answer:
      "Click on 'Sign Up' at the top right of the navbar. Choose whether you are registering as a 'Candidate / Digitizer' (to apply for jobs and share community tutorials) or an 'Employer / Factory' (to post vacancies and manage company profiles).",
  },
  {
    category: "Business Directory",
    question: "How can I get my embroidery factory or shop verified?",
    answer:
      "Submit your business through the 'Register Business' form under the Businesses page. Our moderation team verifies physical address, trade license or factory registration, and phone contact within 24-48 business hours to award the 'Verified Business' badge.",
  },
  {
    category: "Community & Blogs",
    question: "How do community articles and tutorials get published?",
    answer:
      "Anyone logged into EMBOBD can write and submit a tutorial or showcase. Posts submitted by verified Admins and Moderators are published immediately, while candidate submissions are reviewed by moderators to ensure technical accuracy and community standards.",
  },
  {
    category: "Jobs & Applications",
    question: "Is it completely free for candidates and punchers to apply?",
    answer:
      "Yes, EMBOBD is 100% free for embroidery technicians, Wilcom punchers, karchupi artisans, and machine operators. You can browse, search, and apply directly to factory owners without any agency cuts or commission fees.",
  },
  {
    category: "Technical & File Formats",
    question: "Which embroidery machine file formats are supported?",
    answer:
      "EMBOBD supports discussions, guides, and portfolio references across all major industrial formats including Wilcom EMB, Tajima DST, Barudan DSB/DAT, Brother PES, and ZSK formats.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "Technical Support",
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
    <main className="min-h-screen bg-white pb-24 dark:bg-black">
      {/* ========================================================================= */}
      {/* 🌟 HERO SECTION (B&W Minimalist) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-zinc-50/70 py-16 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-xs font-bold text-zinc-900 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>EMBOBD Help & Support Desk</span>
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-white">
              How Can We Help You Today?
            </h1>

            <p className="mt-4 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
              Get direct technical guidance, business verification assistance, and platform answers for your embroidery operations.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 🗂️ QUICK HELP CHANNELS */}
      {/* ========================================================================= */}
      <section className="border-b border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <Users className="h-6 w-6 text-black dark:text-white" />
              <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                Candidate & Job Support
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Help with resume profiles, applying for vacancies, and portfolio showcase.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <Building2 className="h-6 w-6 text-black dark:text-white" />
              <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                Employer & Factory Hub
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Job posting guidelines, candidate tracking, and factory profile management.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <ShieldCheck className="h-6 w-6 text-black dark:text-white" />
              <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                Directory & Verification
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Get your embroidery unit, retail punch shop, or supplier badge verified.
              </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
              <Cpu className="h-6 w-6 text-black dark:text-white" />
              <h3 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                CAD/CAM & Technical
              </h3>
              <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                Wilcom tutorials, DST conversions, and embroidery machine troubleshooting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ❓ FAQS & DIRECT CONTACT GRID */}
      {/* ========================================================================= */}
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* LEFT 7 COLS: FREQUENTLY ASKED QUESTIONS */}
          <div className="lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                <FileQuestion className="h-3.5 w-3.5" />
                <span>Common Questions</span>
              </div>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Quick answers to the most common inquiries regarding EMBOBD services.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-zinc-900 dark:text-white"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 shrink-0 text-zinc-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="border-t border-zinc-100 px-5 pb-5 pt-3 text-xs leading-relaxed text-zinc-600 dark:border-zinc-850 dark:text-zinc-400">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT 5 COLS: CONTACT FORM & DIRECT CHANNELS */}
          <div className="space-y-6 lg:col-span-5">
            {/* Contact Form Box */}
            <div className="rounded-3xl border border-zinc-200 bg-zinc-50/60 p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/40">
              <h3 className="text-lg font-black tracking-tight text-zinc-900 dark:text-white">
                Send Us a Message
              </h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Our support team responds within 2-4 hours during business days.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-2xl border border-zinc-300 bg-white p-6 text-center dark:border-zinc-700 dark:bg-zinc-950">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-black dark:text-white" />
                  <h4 className="mt-3 text-sm font-bold text-zinc-900 dark:text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    Thank you for reaching out. A support specialist will contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        category: "Technical Support",
                        message: "",
                      });
                    }}
                    className="mt-4 text-xs font-bold text-black underline dark:text-white"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Md. Tanvir Hasan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-900 shadow-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-900 shadow-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+880 1700-000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-900 shadow-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-zinc-900 shadow-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    >
                      <option value="Role Upgrade">Role Upgrade (Candidate to Employer)</option>
                      <option value="Technical Support">Technical & Wilcom Support</option>
                      <option value="Business Verification">Business Verification Request</option>
                      <option value="Job Posting Inquiry">Job Posting Assistance</option>
                      <option value="Partnership">Partnership & Media</option>
                      <option value="Other">Other Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your issue or question in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-zinc-300 bg-white p-3 text-xs leading-relaxed text-zinc-900 shadow-xs focus:border-black focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-xs font-bold text-white shadow-xs transition hover:bg-zinc-800 disabled:opacity-50 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{loading ? "Sending Message..." : "Submit Support Ticket"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Info Card */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Direct Contact Channels
              </h4>
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <Mail className="h-4 w-4 text-zinc-400 shrink-0" />
                  <span>support@embobd.com</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <Phone className="h-4 w-4 text-zinc-400 shrink-0" />
                  <span>+880 1800-EMBOBD (+880 1800-362623)</span>
                </div>
                <div className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                  <MapPin className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span>
                    Textile Hub: BSCIC Industrial Area, Narayanganj & Gulshan, Dhaka, Bangladesh
                  </span>
                </div>
                <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
                  <span>Saturday – Thursday: 9:00 AM – 7:00 PM (BST)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
