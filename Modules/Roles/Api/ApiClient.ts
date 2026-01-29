import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateRole {
  name: string;
  description?: string;
}
export const UseCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: CreateRole) => {
      const response = await fetch("/api/roles", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create role");
      }
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ROLES"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Roles Created",
        title: "Success!",
      });
    },
    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message || "Failed to create Role",
        title: "An error has occurred",
      }),
  });
};
export const UseDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/roles/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        throw new Error("Failed to delete role");
      }
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ROLES"],
      });
      Sweetalert({
        icon: "success",
        message: "Roles Deleted",
        title: "Success!",
      });
    },
    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message || "Failed to delete role",
        title: "An error has occurred",
      }),
  });
};

interface RoleResponse {
  items: {
    id: string;
    name: string;
    description: string;
    voided: number;
  }[];
  total: number;
}

interface UseGetRoles {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const UseGetRoles = ({
  page = 1,
  pageSize = 10,
  search = "",
}: UseGetRoles) => {
  return useQuery<RoleResponse>({
    queryKey: ["ROLES", page, pageSize, search],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({
        size: pageSize.toString(),
        page: page.toString(),
        ...(search && { search }),
      });
      const response = await fetch(`/api/roles?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch Roles");
      }
      return data;
    },
  });
};
