/**
 * Base API Client for EMBOBD Frontend
 * Automatically handles API baseUrl, JSON serialization, headers, credentials, and query strings.
 */

export function getBaseApiUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl) {
    if (typeof window !== "undefined") {
      // In browser deployment without explicit env var, use relative path via Next.js rewrites
      return "/api/v1";
    }
    return "http://localhost:5000/api/v1";
  }

  // Clean trailing slashes and redundant /api or /api/v1
  const clean = envUrl.replace(/\/+$/, "").replace(/\/api(\/v1)?\/?$/, "");
  return `${clean}/api/v1`;
}


interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
}

export interface ApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, headers, ...restOptions } = options;

  const baseUrl = getBaseApiUrl();
  let url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "" && value !== "ALL") {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes("?") ? "&" : "?") + queryString;
    }
  }

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      credentials: "include", // Send session cookies for authenticated requests
      ...restOptions,
    });

    const json = await response.json().catch(() => ({
      statusCode: response.status,
      success: response.ok,
      message: response.statusText,
      data: null as unknown as T,
    }));

    return json as ApiResponse<T>;
  } catch (error: any) {
    console.error(`[API Client Error] Failed request to ${url}:`, error?.message || error);
    return {
      statusCode: 500,
      success: false,
      message: error?.message || "Network request failed",
      data: null as unknown as T,
    };
  }
}

export const http = {
  get: <T = any>(endpoint: string, params?: RequestOptions["params"], options?: RequestOptions) =>
    apiClient<T>(endpoint, { method: "GET", params, ...options }),

  post: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  patch: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: <T = any>(endpoint: string, body?: any, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T = any>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { method: "DELETE", ...options }),
};
