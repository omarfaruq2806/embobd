import { http } from "./apiClient";

export const jobApi = {
  getAll: (params?: any) => http.get("/jobs", params),
  getById: (id: string) => http.get(`/jobs/${id}`),
  create: (data: any) => http.post("/jobs", data),
  update: (id: string, data: any) => http.patch(`/jobs/${id}`, data),
  delete: (id: string) => http.delete(`/jobs/${id}`),
};
