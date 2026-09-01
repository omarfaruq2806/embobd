"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  PlusCircle,
  Trash2,
  CheckCircle2,
  Loader2,
  FolderPlus,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string | null;
  _count?: {
    jobs: number;
  };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/v1/categories`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCategories(json.data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [API_URL]);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() || null }),
      });
      const json = await res.json();
      if (json.success) {
        setName("");
        setDescription("");
        setMessage("Category created successfully! 🎉");
        fetchCategories();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(json.message || "Failed to create category.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to create category.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/v1/categories/${catId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setCategories((prev) => prev.filter((c) => c.id !== catId));
        setMessage("Category removed successfully");
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-black dark:text-white">
          Embroidery Categories
        </h1>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Manage specialty sectors, digitizing niches, and craft categories across the platform.
        </p>
      </div>

      {/* Notifications */}
      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          <CheckCircle2 size={16} /> {message}
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 dark:bg-red-950/40 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Add Category Form Card */}
      <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6 shadow-xs dark:border-white/10 dark:bg-zinc-950">
        <h2 className="flex items-center gap-2 text-sm font-bold text-black dark:text-white">
          <FolderPlus size={16} /> Add New Category
        </h2>

        <form onSubmit={handleAddCategory} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Laser Cut & Applique"
              className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Short Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Laser cutting and patch applique techniques"
              className="mt-1 w-full rounded-xl border border-black/15 bg-transparent px-3 py-2 text-xs text-black placeholder:text-zinc-400 focus:border-black focus:outline-none dark:border-white/15 dark:text-white"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={submitting}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-black px-4 text-xs font-semibold text-white shadow-xs transition hover:opacity-90 disabled:opacity-50 dark:bg-white dark:text-black"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <PlusCircle size={14} />}
              Create Category
            </button>
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Existing Categories ({categories.length})
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {loading ? (
            <div className="col-span-2 py-12 text-center text-zinc-400">
              <Loader2 size={20} className="mx-auto animate-spin" />
            </div>
          ) : categories.length === 0 ? (
            <p className="col-span-2 py-8 text-center text-xs text-zinc-400">
              No categories created yet.
            </p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-start justify-between rounded-2xl border border-black/10 bg-white p-4 shadow-xs dark:border-white/10 dark:bg-zinc-950"
              >
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {cat.description || "No description provided."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 shrink-0"
                  title="Delete category"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
