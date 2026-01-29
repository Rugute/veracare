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

type Instructor = {
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

export type InstructorResponse = {
  items: Instructor[];
  total: number;
};

export const UseGetInstructors = ({ page, pageSize, search }: ApiParams) => {
  return useQuery<InstructorResponse>({
    queryKey: ["GET_ALL_INSTRUCTORS", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/instructors?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Internal server error");
      }

      return data;
    },
  });
};

export const UseCreateInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/instructors", {
        method: "POST",
        credentials: "include",

        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create Instructor");
      }
      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["GET_ALL_INSTRUCTORS"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Instructor created",
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
};
export const UseDeleteInstructor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/instructors/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete Instructor");
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["GET_ALL_INSTRUCTORS"],
      });
      Sweetalert({
        icon: "success",
        message: "Instructor deleted",
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
};
