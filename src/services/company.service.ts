import { http } from "./apiClient";

export interface Company {
  id: string;
  name: string;
  description?: string | null;
  website?: string | null;
  logo?: string | null;
  ownerUserId?: string;
  createdAt?: string;
  updatedAt?: string;
  owner?: {
    id?: string;
    name?: string;
    email?: string;
  };
  _count?: {
    jobs?: number;
  };
}

export const companyApi = {
  getAll: () => http.get("/companies"),
  getById: (id: string) => http.get(`/companies/${id}`),
  create: (data: any) => http.post("/companies", data),
};

