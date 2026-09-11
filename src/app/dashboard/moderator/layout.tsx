"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ShieldCheck,
  Briefcase,
  Layers,
  Store,
  MessageSquare,
  ArrowLeft,
  LayoutDashboard,
  Shield,
  Loader2,
  SlidersHorizontal,
  User as UserIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const moderatorNavItems = [
  { name: "মডারেশন কিউ", href: "/dashboard/moderator", icon: LayoutDashboard },
  { name: "চাকরি অনুমোদন", href: "/dashboard/moderator/jobs", icon: Briefcase },
  { name: "ব্যবসা ডিরেক্টরি", href: "/dashboard/moderator/businesses", icon: Store },
  { name: "কমিউনিটি পোস্ট", href: "/dashboard/moderator/community", icon: MessageSquare },
  { name: "বিশেষ ক্যাটাগরি", href: "/dashboard/moderator/categories", icon: Layers },
  { name: "আমার প্রোফাইল", href: "/dashboard/profile", icon: UserIcon },
];

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as any)?.user;

  useEffect(() => {
    if (!isPending) {
      if (!user) {
        router.push("/login");
      } else if (user.role !== "MODERATOR" && user.role !== "ADMIN") {
        if (user.role === "EMPLOYER") {
          router.push("/dashboard/employer");
        } else {
          router.push("/dashboard/candidate");
        }
      }
    }
  }, [user, isPending, router]);

  if (isPending || (!user && !isPending) || (user && user.role !== "MODERATOR" && user.role !== "ADMIN")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={26} className="animate-spin text-purple-600" />
          <p className="text-xs font-semibold text-zinc-600">মডারেটর এক্সেস যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans">
      {/* Moderator Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col justify-between border-r border-zinc-200 bg-white p-5 md:flex">
        <div>
          {/* Moderator Brand */}
          <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
            <Link href="/dashboard/moderator" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-zinc-950">
                EMBO<span className="font-light">BD</span>
              </span>
              <span className="flex items-center gap-1 rounded-md bg-purple-50 border border-purple-200 px-2 py-0.5 text-[10px] font-bold text-purple-800">
                <Shield size={11} />
                মডারেটর
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 flex flex-col gap-1.5">
            {moderatorNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard/moderator"
                  ? pathname === "/dashboard/moderator"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-purple-700 text-white shadow-sm"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                  }`}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-zinc-100 pt-4 flex flex-col gap-2">
          {user?.role === "ADMIN" && (
            <Link
              href="/dashboard/admin"
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-amber-700 hover:bg-amber-50"
            >
              <SlidersHorizontal size={14} /> অ্যাডমিন প্যানেলে ফিরুন
            </Link>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
          >
            <ArrowLeft size={14} /> পাবলিক ওয়েবসাইটে ফিরুন
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-6 md:hidden">
          <Link href="/dashboard/moderator" className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <span>EMBOBD</span>
            <span className="rounded-md bg-purple-50 border border-purple-200 px-1.5 py-0.5 text-[10px] font-bold text-purple-800">
              মডারেটর
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-zinc-600 hover:underline"
            >
              প্রস্থান করুন
            </Link>
          </div>
        </header>

        {/* Dynamic Moderator View */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
