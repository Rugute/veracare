import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UsersReponse {
  items: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    phone: string;
    dob: string;
    cooprateAccount: 0 | 1;
    companyId: number;
    voided: 0 | 1;
  }[];
  total: 1;
}
export function UseGetUsers({ page, pageSize, search }: ApiParams) {
  return useQuery<UsersReponse>({
    queryKey: ["GET_ALL_USERS", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/users/${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error fetching user");
      }

      return data;
    },
  });
}

export function UseCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/users", {
        method: "GET",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["GET_ALL_USERS"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "User Created",
        title: "Success!",
      });
    },

    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message,
        title: "An error has occurred",
      }),
  });
}
export function UseDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 203) {
        throw new Error("Failed to delete user");
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["GET_ALL_USERS"],
      });
      Sweetalert({
        icon: "success",
        message: "User Deleted!",
        title: "Success!",
      });
    },

    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message,
        title: "An error has occurred",
      }),
  });
}
