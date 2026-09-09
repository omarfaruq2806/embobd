import { http } from "./apiClient";

export const companyApi = {
  getAll: () => http.get("/companies"),
  getById: (id: any) => http.get(`/companies/${id}`),
  create: (data: any) => http.post("/companies", data),
  update: (id: string, data: any) => http.patch(`/companies/${id}`, data),
};

