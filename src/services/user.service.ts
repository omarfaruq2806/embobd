import { http } from "./apiClient";

export const userApi = {
  getAll: (params?: any) => http.get("/users", params),
  updateRole: (id: string, role: string) =>
    http.patch(`/users/${id}/role`, { role }),
};
