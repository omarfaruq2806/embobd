import { http } from "./apiClient";

export const categoryApi = {
  getAll: () => http.get("/categories"),
  getById: (id: string) => http.get(`/categories/${id}`),
  create: (data: any) => http.post("/categories", data),
  delete: (id: string) => http.delete(`/categories/${id}`),
};
