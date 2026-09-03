import { http } from "./apiClient";

export const companyApi = {
  getAll: () => http.get("/companies"),
  getById: (id: string) => http.get(`/companies/${id}`),
  create: (data: any) => http.post("/companies", data),
};
