"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Layers,
  Building,
  Store,
  ArrowLeft,
  ShieldAlert,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const adminNavItems = [
  { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Manage Jobs", href: "/dashboard/admin/jobs", icon: Briefcase },
  { name: "Businesses", href: "/dashboard/admin/businesses", icon: Store },
  { name: "Manage Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Categories", href: "/dashboard/admin/categories", icon: Layers },
  { name: "Companies", href: "/dashboard/admin/companies", icon: Building },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = (session as any)?.user;

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Admin Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 flex-col justify-between border-r border-black/10 bg-white p-5 dark:border-white/10 dark:bg-zinc-950 md:flex">
        <div>
          {/* Admin Brand */}
          <div className="flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/5">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight text-black dark:text-white">
                EMBO<span className="font-light">BD</span>
              </span>
              <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                ADMIN
              </span>
            </Link>
          </div>

          {/* Navigation Items */}
          <nav className="mt-6 flex flex-col gap-1.5">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard/admin"
                  ? pathname === "/dashboard/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-black text-white shadow-xs dark:bg-white dark:text-black"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
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
        <div className="border-t border-black/5 pt-4 dark:border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
          >
            <ArrowLeft size={14} /> Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-14 items-center justify-between border-b border-black/10 bg-white px-6 dark:border-white/10 dark:bg-zinc-950 md:hidden">
          <Link href="/dashboard/admin" className="text-base font-bold text-black dark:text-white">
            EMBOBD Admin
          </Link>
          <Link
            href="/"
            className="text-xs font-semibold text-zinc-600 hover:underline dark:text-zinc-400"
          >
            Exit Admin
          </Link>
        </header>

        {/* Dynamic Admin View */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
