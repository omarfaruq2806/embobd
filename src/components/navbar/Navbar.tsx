"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, Briefcase, ChevronDown, Sparkles, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Jobs", href: "/jobs" },
  { name: "Communities", href: "/communities" },
  { name: "About Us", href: "/about" },
  { name: "Support", href: "/support" },
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
    : (user?.email?.charAt(0).toUpperCase() || "U");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-black/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-black dark:text-white">
            EMBO<span className="font-light">BD</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-black dark:hover:text-white ${
                  isActive
                    ? "font-semibold text-black dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400"
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
            <div className="h-9 w-24 animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
          ) : user ? (
            /* Logged In User Dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 rounded-full border border-black/10 bg-zinc-50 py-1 pl-1.5 pr-3 text-sm font-medium text-black transition hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800"
                aria-expanded={userMenuOpen}
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User Avatar"}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                    {userInitials}
                  </div>
                )}
                <span className="max-w-[120px] truncate text-xs font-semibold">
                  {user.name || user.email?.split("@")[0]}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-zinc-400 transition-transform ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-black/10 bg-white p-2 shadow-lg dark:border-white/15 dark:bg-zinc-900">
                  <div className="border-b border-black/5 px-3 py-2.5 dark:border-white/5">
                    <p className="truncate text-xs font-semibold text-black dark:text-white">
                      {user.name || "Member"}
                    </p>
                    <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <LayoutDashboard size={15} />
                      {user?.role === "ADMIN" || user?.role === "MODERATOR" ? "Admin Panel" : "My Dashboard"}
                    </Link>
                    <Link
                      href="/jobs"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <Briefcase size={15} />
                      Find Jobs
                    </Link>
                    <Link
                      href="/communities"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <Sparkles size={15} />
                      My Community
                    </Link>
                  </div>

                  <div className="border-t border-black/5 pt-1 dark:border-white/5">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                    >
                      <LogOut size={15} />
                      Sign out
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
                className="rounded-xl px-3.5 py-2 text-xs font-semibold text-zinc-700 transition hover:text-black dark:text-zinc-300 dark:hover:text-white"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-black px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:opacity-90 dark:bg-white dark:text-black"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-black dark:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-black/10 bg-white px-6 py-5 dark:border-white/10 dark:bg-black md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-100 font-semibold text-black dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Auth Actions */}
          <div className="mt-5 border-t border-black/10 pt-4 dark:border-white/10">
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                    {userInitials}
                  </div>
                  <div className="overflow-hidden">
                    <p className="truncate text-xs font-bold text-black dark:text-white">
                      {user.name || "Member"}
                    </p>
                    <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-50 py-2.5 text-xs font-semibold text-red-600 dark:bg-red-950/30 dark:text-red-400"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl border border-black/15 py-2.5 text-xs font-semibold text-black dark:border-white/20 dark:text-white"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-black py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-black"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
