"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, X, Loader2 } from "lucide-react";
import { uploadApi, UploadDocResult } from "@/services/upload.service";

interface ResumeUploadProps {
  value?: string;
  onChange: (url: string, meta?: UploadDocResult) => void;
  label?: string;
  helperText?: string;
  className?: string;
}

export function ResumeUpload({
  value,
  onChange,
  label = "সিভি / রেজুমে (PDF)",
  helperText = "সর্বোচ্চ ১০ MB (PDF, Word)",
  className = "",
}: ResumeUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const isDoc =
      file.type === "application/pdf" ||
      file.type === "application/msword" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".pdf") ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx");

    if (!isDoc) {
      setError("অনুগ্রহ করে শুধুমাত্র PDF বা Word ডকুমেন্ট নির্বাচন করুন।");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("ফাইলের সাইজ ১০ মেগাবাইটের (MB) কম হতে হবে।");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await uploadApi.uploadDocument(file, { folder: "resumes" });
      if (res.success && res.data) {
        onChange(res.data.url, res.data);
        setFileName(file.name);
      } else {
        setError(res.message || "সিভি আপলোড করতে সমস্যা হয়েছে।");
      }
    } catch (err: any) {
      setError(err?.message || "নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-zinc-800">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {value ? (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <FileText size={18} className="shrink-0 text-emerald-700" />
            <div className="truncate">
              <span className="font-bold">{fileName || "আপলোডকৃত সিভি.pdf"}</span>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="block text-[10px] text-emerald-700 underline truncate hover:text-emerald-950"
              >
                ডকুমেন্ট দেখুন
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 rounded-lg p-1.5 text-zinc-500 hover:bg-rose-100 hover:text-rose-700 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => !loading && fileInputRef.current?.click()}
          className={`flex items-center justify-between rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-xs cursor-pointer hover:border-zinc-500 hover:bg-zinc-100/60 transition-all ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center gap-2 text-zinc-700 font-semibold">
            {loading ? (
              <Loader2 size={16} className="animate-spin text-zinc-950" />
            ) : (
              <Upload size={16} className="text-zinc-500" />
            )}
            <span>{loading ? "সিভি আপলোড হচ্ছে..." : "PDF সিভি নির্বাচন বা আপলোড করুন"}</span>
          </div>
          <span className="text-[10px] text-zinc-500">{helperText}</span>
        </div>
      )}

      {error && <p className="text-[11px] font-semibold text-rose-600">{error}</p>}
    </div>
  );
}
