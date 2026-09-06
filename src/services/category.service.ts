import { http } from "./apiClient";

export const categoryApi = {
  getAll: () => http.get("/categories"),
  getById: (id: any) => http.get(`/categories/${id}`),
  create: (data: any) => http.post("/categories", data),
  delete: (id: any) => http.delete(`/categories/${id}`),
};
