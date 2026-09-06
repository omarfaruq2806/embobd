import { http } from "./apiClient";

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified?: boolean;
  image?: string | null;
  createdAt?: string;
  profile?: {
    avatar?: string | null;
    phone?: string | null;
    location?: string | null;
    title?: string | null;
    skills?: string[];
  } | null;
}

export const userApi = {
  getAll: (params?: any) => http.get("/users", params),
  updateRole: (id: string, role: string) =>
    http.patch(`/users/${id}/role`, { role }),
  delete: (id: string) => http.delete(`/users/${id}`),
};

