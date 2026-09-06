import { http } from "./apiClient";

export const businessApi = {
  getAll: (params?: any) => http.get("/businesses", params),
  getBySlug: (slug: any) => http.get(`/businesses/slug/${slug}`),
  getById: (id: any) => http.get(`/businesses/${id}`),
  create: (data: any) => http.post("/businesses", data),
  update: (id: any, data: any) => http.patch(`/businesses/${id}`, data),
  approve: (id: any) => http.patch(`/businesses/${id}/approve`),
  reject: (id: any, rejectionReason?: any) =>
    http.patch(`/businesses/${id}/reject`, { rejectionReason }),
  delete: (id: any) => http.delete(`/businesses/${id}`),
};
