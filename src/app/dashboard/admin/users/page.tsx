"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Shield,
  Trash2,
  CheckCircle2,
  Loader2,
  Filter,
} from "lucide-react";
import { userApi, UserItem } from "@/services";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userApi.getAll();
      if (res.success && Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    setMessage(null);
    try {
      const res = await userApi.updateRole(userId, newRole);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
        setMessage(`Role updated to ${newRole}`);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update role:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await userApi.delete(userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setMessage("User deleted successfully");
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
            User Management
          </h1>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            View registered candidates, employers, and administrators. Update roles and permissions.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircle2 size={16} /> {message}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full rounded-xl border border-black/15 bg-white py-2 pl-9 pr-4 text-xs text-black focus:border-black focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-black/15 bg-white px-3 py-2 text-xs text-zinc-700 focus:outline-none dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-300"
        >
          <option value="ALL">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MODERATOR">Moderator</option>
          <option value="EMPLOYER">Employer</option>
          <option value="CANDIDATE">Candidate</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs dark:border-white/10 dark:bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/5 bg-zinc-50 text-[11px] font-semibold text-zinc-500 dark:border-white/5 dark:bg-zinc-900 dark:text-zinc-400">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Activity</th>
                <th className="px-6 py-3.5">Joined</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-400">
                    <Loader2 size={20} className="mx-auto animate-spin" />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-zinc-400">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                          {u.name?.charAt(0) || u.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-black dark:text-white">
                            {u.name || "No name"}
                          </p>
                          <p className="text-[11px] text-zinc-500">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        disabled={updatingId === u.id}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none ${
                          u.role === "ADMIN"
                            ? "border-amber-500/30 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                            : u.role === "EMPLOYER"
                            ? "border-indigo-500/30 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
                            : "border-black/10 bg-zinc-50 text-zinc-700 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-300"
                        }`}
                      >
                        <option value="CANDIDATE">CANDIDATE</option>
                        <option value="EMPLOYER">EMPLOYER</option>
                        <option value="MODERATOR">MODERATOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 text-zinc-500">
                      {u._count?.jobs ? `${u._count.jobs} Jobs Posted` : "—"}
                    </td>

                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(u.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(u.id)}
                        className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                        title="Delete user"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
