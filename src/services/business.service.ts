import { http } from "./apiClient";

export const businessApi = {
  getAll: (params?: any) => http.get("/businesses", params),
  getBySlug: (slug: string) => http.get(`/businesses/slug/${slug}`),
  getById: (id: string) => http.get(`/businesses/${id}`),
  create: (data: any) => http.post("/businesses", data),
  update: (id: string, data: any) => http.patch(`/businesses/${id}`, data),
  approve: (id: string) => http.patch(`/businesses/${id}/approve`),
  reject: (id: string, rejectionReason?: string) =>
    http.patch(`/businesses/${id}/reject`, { rejectionReason }),
  delete: (id: string) => http.delete(`/businesses/${id}`),
};
