import { getBaseApiUrl, ApiResponse } from "./apiClient";

export interface UploadImageResult {
  fileKey: string;
  url: string;
  originalSize: number;
  compressedSize: number;
  savedPercent: string;
  mimeType: string;
}

export interface UploadDocResult {
  fileKey: string;
  url: string;
  size: number;
  mimeType: string;
  originalName: string;
}

export const uploadApi = {
  /**
   * Upload an image file with automatic Sharp WebP compression
   */
  async uploadImage(
    file: File,
    options: { folder?: string; preset?: "logo" | "banner" | "default" } = {}
  ): Promise<ApiResponse<UploadImageResult>> {
    const formData = new FormData();
    formData.append("file", file);
    if (options.folder) formData.append("folder", options.folder);
    if (options.preset) formData.append("preset", options.preset);

    const baseUrl = getBaseApiUrl();
    const url = `${baseUrl}/upload/image`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const json = await response.json();
      return json as ApiResponse<UploadImageResult>;
    } catch (error: any) {
      console.error("[Upload Error]:", error);
      return {
        statusCode: 500,
        success: false,
        message: error?.message || "ইমেজ আপলোড করতে সমস্যা হয়েছে।",
        data: null as any,
      };
    }
  },

  /**
   * Upload a document/resume (PDF, Word)
   */
  async uploadDocument(
    file: File,
    options: { folder?: string } = {}
  ): Promise<ApiResponse<UploadDocResult>> {
    const formData = new FormData();
    formData.append("file", file);
    if (options.folder) formData.append("folder", options.folder);

    const baseUrl = getBaseApiUrl();
    const url = `${baseUrl}/upload/document`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const json = await response.json();
      return json as ApiResponse<UploadDocResult>;
    } catch (error: any) {
      console.error("[Document Upload Error]:", error);
      return {
        statusCode: 500,
        success: false,
        message: error?.message || "ফাইল আপলোড করতে সমস্যা হয়েছে।",
        data: null as any,
      };
    }
  },
};
