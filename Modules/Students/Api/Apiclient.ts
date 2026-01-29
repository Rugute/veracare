import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Role = {
  voided: number;
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

type Student = {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  gender: string | null;
  email: string;
  password: string;
  dob: string | null;
  photo: string | null;
  cooprateAccount: number;
  voided: number;
  id: number;
  companyId: number | null;
  roleId: number | null;
  role: Role | null;
};

export type StudentResponse = {
  items: Student[];
  total: number;
};

export function UseGetAllStudents({ page, pageSize, search }: ApiParams) {
  return useQuery<StudentResponse>({
    queryKey: ["ALL_STUDENTS", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/students?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Internal server error");
      }
      return data;
    },
  });
}

export function UseCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/students", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create student");
      }

      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_STUDENTS"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Student Created",
        title: "Success!",
      });
    },

    onError: (e: Error) => {
      Sweetalert({
        icon: "error",
        message: e.message,
        title: "An error has occurred",
      });
    },
  });
}
export function UseDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const response = await fetch(`/api/students/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete student");
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_STUDENTS"],
      });
      Sweetalert({
        icon: "success",
        message: "Student Deleted",
        title: "Success!",
      });
    },

    onError: (e: Error) => {
      Sweetalert({
        icon: "error",
        message: e.message,
        title: "An error has occurred",
      });
    },
  });
}
