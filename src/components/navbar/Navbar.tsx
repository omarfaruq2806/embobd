"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  Briefcase,
  ChevronDown,
  Sparkles,
  LayoutDashboard,
  User as UserIcon,
  Store,
  Users,
  Layers,
  Shield,
  PlusCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "হোম", href: "/" },
  { name: "চাকরি খুঁজুন", href: "/jobs" },
  { name: "ব্যবসা ডিরেক্টরি", href: "/businesses" },
  { name: "কমিউনিটি হাব", href: "/communities" },
  { name: "আমাদের সম্পর্কে", href: "/about" },
  { name: "সহায়তা", href: "/support" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Better-Auth Session Hook
  const { data: session, isPending } = authClient.useSession();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    try {
      await (authClient.signOut as any)();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const user = (session as any)?.user;
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : (user?.email?.charAt(0).toUpperCase() || "ইউ");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tight text-zinc-950">
            EMBO<span className="font-light text-zinc-600">BD</span>
          </span>
          <span className="hidden sm:inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-600 tracking-wider">
            এমব্রয়ডারি হাব
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-black ${
                  isActive
                    ? "text-zinc-950 font-bold border-b-2 border-zinc-950 pb-0.5"
                    : "text-zinc-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth State / Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-9 w-24 animate-pulse rounded-xl bg-zinc-100" />
          ) : user ? (
            /* Logged In User Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 rounded-full border border-zinc-200 bg-zinc-50 py-1 pl-1.5 pr-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
                aria-expanded={userMenuOpen}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-7 w-7 rounded-full object-cover border border-zinc-200"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
                    {userInitials}
                  </div>
                )}
                <span className="max-w-[120px] truncate text-xs font-bold">
                  {user.name || user.email?.split("@")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-zinc-500 transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="border-b border-zinc-100 px-3 py-2.5">
                    <p className="truncate text-xs font-bold text-zinc-950">
                      {user.name || "সম্মানিত সদস্য"}
                    </p>
                    <p className="truncate text-[11px] text-zinc-500">
                      {user.email}
                    </p>
                    <span className="mt-1.5 inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-bold text-zinc-700">
                      {user.role === "ADMIN"
                        ? "সুপারঅ্যাডমিন"
                        : user.role === "MODERATOR"
                        ? "মডারেটর"
                        : user.role === "EMPLOYER"
                        ? "নিয়োগকারী"
                        : "ক্যান্ডিডেট"}
                    </span>
                  </div>

                  <div className="py-1">
                    <Link
                      href={
                        user?.role === "ADMIN"
                          ? "/dashboard/admin"
                          : user?.role === "MODERATOR"
                          ? "/dashboard/moderator"
                          : user?.role === "EMPLOYER"
                          ? "/dashboard/employer"
                          : "/dashboard/candidate"
                      }
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                    >
                      <LayoutDashboard size={15} />
                      {user?.role === "ADMIN"
                        ? "অ্যাডমিন কন্ট্রোল প্যানেল"
                        : user?.role === "MODERATOR"
                        ? "মডারেটর স্টেশন"
                        : "আমার ড্যাশবোর্ড"}
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                    >
                      <UserIcon size={15} />
                      আমার প্রোফাইল
                    </Link>
                    <Link
                      href="/jobs"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                    >
                      <Briefcase size={15} />
                      চাকরির তালিকা
                    </Link>
                    <Link
                      href="/communities"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-zinc-800 hover:bg-zinc-100 transition"
                    >
                      <Sparkles size={15} />
                      কমিউনিটি আলোচনা
                    </Link>
                  </div>

                  <div className="border-t border-zinc-100 pt-1">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut size={15} />
                      লগআউট করুন
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out State: Login & Register buttons */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-xs font-bold text-zinc-700 transition hover:text-black hover:bg-zinc-100"
              >
                লগইন
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-zinc-950 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-zinc-800"
              >
                একাউন্ট খুলুন
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-900 hover:bg-zinc-100 rounded-xl"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 bg-white px-6 py-5 md:hidden animate-in fade-in duration-150">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-zinc-950 font-bold text-white"
                      : "text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Auth Actions */}
          <div className="mt-5 border-t border-zinc-100 pt-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-3 py-2 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-xs font-bold text-white">
                    {userInitials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-xs font-bold text-zinc-900">
                      {user.name || "সদস্য"}
                    </p>
                    <p className="truncate text-[11px] text-zinc-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={
                      user?.role === "ADMIN"
                        ? "/dashboard/admin"
                        : user?.role === "MODERATOR"
                        ? "/dashboard/moderator"
                        : user?.role === "EMPLOYER"
                        ? "/dashboard/employer"
                        : "/dashboard/candidate"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 py-2.5 text-xs font-bold text-zinc-800 hover:bg-zinc-50"
                  >
                    <LayoutDashboard size={14} /> ড্যাশবোর্ড
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 py-2.5 text-xs font-bold text-zinc-800 hover:bg-zinc-50"
                  >
                    <UserIcon size={14} /> প্রোফাইল
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-600"
                >
                  <LogOut size={15} />
                  লগআউট করুন
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl border border-zinc-300 py-2.5 text-xs font-bold text-zinc-900 hover:bg-zinc-50"
                >
                  লগইন
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-zinc-950 py-2.5 text-xs font-bold text-white shadow-xs"
                >
                  নতুন একাউন্ট খুলুন
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
