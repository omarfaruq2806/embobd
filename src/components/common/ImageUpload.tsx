"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { uploadApi, UploadImageResult } from "@/services/upload.service";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string, uploadMeta?: UploadImageResult) => void;
  folder?: string;
  preset?: "logo" | "banner" | "default";
  label?: string;
  helperText?: string;
  aspectRatio?: "square" | "video" | "wide";
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "general",
  preset = "default",
  label,
  helperText,
  aspectRatio = "square",
  className = "",
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ savedPercent?: string; sizeKb?: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("অনুগ্রহ করে শুধুমাত্র ছবি ফাইল (JPG, PNG, WebP) নির্বাচন করুন।");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("ফাইলের সাইজ ১০ মেগাবাইটের (MB) চেয়ে কম হতে হবে।");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await uploadApi.uploadImage(file, { folder, preset });

      if (res.success && res.data) {
        onChange(res.data.url, res.data);
        setStats({
          savedPercent: res.data.savedPercent,
          sizeKb: Math.round(res.data.compressedSize / 1024),
        });
      } else {
        setError(res.message || "ছবি আপলোড করতে ব্যর্থ হয়েছে।");
      }
    } catch (err: any) {
      setError(err?.message || "নেটওয়ার্ক সমস্যার কারণে আপলোড করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (loading) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setStats(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getAspectClass = () => {
    if (aspectRatio === "video") return "aspect-video";
    if (aspectRatio === "wide") return "aspect-[21/9]";
    return "aspect-square max-w-[200px]";
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-zinc-800">
            {label}
          </label>
          {stats && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <Sparkles size={10} /> {stats.savedPercent} কমপ্রেসড ({stats.sizeKb} KB WebP)
            </span>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {value ? (
        /* Preview State */
        <div
          className={`relative group rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 ${getAspectClass()}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-white text-zinc-900 rounded-xl text-xs font-bold shadow hover:bg-zinc-100 transition-colors"
            >
              পরিবর্তন
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow hover:bg-rose-700 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* Dropzone Upload State */
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => !loading && fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 hover:border-zinc-500 rounded-2xl p-4 bg-zinc-50/75 hover:bg-zinc-100/50 cursor-pointer transition-all ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          } ${getAspectClass()}`}
        >
          {loading ? (
            <div className="flex flex-col items-center gap-2 text-zinc-600">
              <Loader2 size={24} className="animate-spin text-zinc-950" />
              <span className="text-[11px] font-semibold">কমপ্রেস ও আপলোড হচ্ছে...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-1.5 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-700 shadow-2xs">
                <Upload size={18} />
              </div>
              <p className="text-xs font-bold text-zinc-800">
                ছবি নির্বাচন বা টেনে আনুন
              </p>
              <p className="text-[10px] text-zinc-500">
                JPG, PNG, WebP (অটোমেটিক কম্প্রেশন)
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-[11px] font-semibold text-rose-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-[11px] text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}
