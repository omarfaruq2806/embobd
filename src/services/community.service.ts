import { http } from "./apiClient";

export const communityApi = {
  getAll: (params?: any) => http.get("/community/posts", params),
  getBySlug: (idOrSlug: any) => http.get(`/community/posts/${idOrSlug}`),
  getById: (id: any) => http.get(`/community/posts/${id}`),
  getMyPosts: (params?: any) => http.get("/community/my-posts", params),
  create: (data: any) => http.post("/community/posts", data),
  update: (id: any, data: any) => http.patch(`/community/posts/${id}`, data),
  approve: (id: any) => http.patch(`/community/posts/${id}/approve`),
  reject: (id: any, rejectionReason?: any) =>
    http.patch(`/community/posts/${id}/reject`, { rejectionReason }),
  delete: (id: any) => http.delete(`/community/posts/${id}`),
  getCategories: () => http.get("/community/categories"),
  getTags: () => http.get("/community/tags"),
};
