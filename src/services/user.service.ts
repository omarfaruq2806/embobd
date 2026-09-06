import { http } from "./apiClient";

export const userApi = {
  getAll: (params?: any) => http.get("/users", params),
  updateRole: (id: any, role: any) =>
    http.patch(`/users/${id}/role`, { role }),
  delete: (id: any) => http.delete(`/users/${id}`),
};
