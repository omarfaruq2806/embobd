"use client";

import { useState, useEffect } from "react";
import {
  Layers,
  PlusCircle,
  CheckCircle2,
  Loader2,
  FolderPlus,
  Tag,
} from "lucide-react";
import { categoryApi } from "@/services";

export default function ModeratorCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await categoryApi.getAll();
      if (res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!name.trim()) {
      setError("ক্যাটাগরির নাম আবশ্যক।");
      return;
    }

    setSubmitting(true);
    try {
      const res = await categoryApi.create({
        name: name.trim(),
        description: description.trim() || null,
      });
      if (res.success) {
        setName("");
        setDescription("");
        setMessage("ক্যাটাগরি সফলভাবে তৈরি করা হয়েছে! 🎉");
        fetchCategories();
        setTimeout(() => setMessage(null), 3000);
      } else {
        setError(res.message || "ক্যাটাগরি তৈরিতে ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      setError(err?.message || "ক্যাটাগরি তৈরির সময় সমস্যা হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">
            বিশেষায়িত ক্যাটাগরি ও ট্যাক্সোনমি
          </h1>
          <span className="rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-[10px] font-bold text-purple-700">
            মডারেটর স্টেশন
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          এমব্রয়ডারি সেক্টর, নতুন টেকনিক (যেমন: চেনিল, সিকোয়েন্স, উইলকম ডিজিটাইজিং) ও ক্রাফট ক্যাটাগরি কিউরেট করুন।
        </p>
      </div>

      {/* Notifications */}
      {message && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-semibold text-emerald-700">
          <CheckCircle2 size={16} /> {message}
        </div>
      )}
      {error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* Add Category Form Card */}
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs">
        <h2 className="flex items-center gap-2 text-sm font-bold text-zinc-950">
          <FolderPlus size={16} className="text-purple-600" /> নতুন বিশেষায়িত ক্যাটাগরি যুক্ত করুন
        </h2>

        <form onSubmit={handleAddCategory} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700">
              ক্যাটাগরির নাম *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="যেমন: শিফলি লেস এমব্রয়ডারি"
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700">
              সংক্ষিপ্ত বিবরণ
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="যেমন: হাই-ভলিউম অল-ওভার লেস ও বর্ডার এমব্রয়ডারি"
              className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-purple-600 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={submitting}
              className="flex h-9 w-full items-center justify-center gap-1.5 rounded-xl bg-purple-600 px-4 text-xs font-semibold text-white shadow-xs transition hover:bg-purple-700 disabled:opacity-50"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : <PlusCircle size={14} />}
              ক্যাটাগরি যুক্ত করুন
            </button>
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
          সক্রিয় ক্যাটাগরিসমূহ ({categories.length})
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {loading ? (
            <div className="col-span-2 py-12 text-center text-zinc-400">
              <Loader2 size={20} className="mx-auto animate-spin text-purple-600" />
            </div>
          ) : categories.length === 0 ? (
            <p className="col-span-2 py-8 text-center text-xs text-zinc-400">
              এখনো কোনো ক্যাটাগরি তৈরি করা হয়নি।
            </p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-start justify-between rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs hover:border-zinc-300"
              >
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 flex items-center gap-1.5">
                    <Tag size={13} className="text-purple-600" /> {cat.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    {cat.description || "কোনো বিবরণ নেই।"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
