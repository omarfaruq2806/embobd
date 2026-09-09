import { http } from "./apiClient";

export const userApi = {
  getAll: (params?: any) => http.get("/users", params),
  getById: (id: string) => http.get(`/users/${id}`),
  updateUser: (id: string, data: any) => http.patch(`/users/${id}`, data),
  updateRole: (id: string, role: string) => http.patch(`/users/${id}`, { role }),
  updateProfile: (id: string, profileData: any) => http.patch(`/users/${id}/profile`, profileData),
  delete: (id: string) => http.delete(`/users/${id}`),
};


