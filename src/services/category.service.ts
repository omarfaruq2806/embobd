import { http } from "./apiClient";

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
  _count?: {
    jobs?: number;
  };
}

export const categoryApi = {
  getAll: () => http.get("/categories"),
  getById: (id: string) => http.get(`/categories/${id}`),
  create: (data: any) => http.post("/categories", data),
  delete: (id: string) => http.delete(`/categories/${id}`),
};

