import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface lessonsResponse {
  items: {
    id: string;
    title: string;
    slug: string;
    description: string;
    published: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    photo: string;
    categoryId: null;
    uuid: string;
    voided: 0 | 1;
    createdById: 0 | 1;
  }[];
  total: number;
}

export const UseGetAllLessons = ({ page, pageSize, search }: ApiParams) => {
  return useQuery<lessonsResponse>({
    queryKey: ["ALL_LESSONS", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/lessons?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Internal server error");
      }

      return data;
    },
  });
};

export const UseCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/lessons", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      console.log({ data });
      if (!response.ok) {
        throw new Error(data.error || "Failed to create lesson");
      }
      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_LESSONS"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Lesson created",
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
export const UseDeleteLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(`/api/lessons/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        throw new Error("Failed to delete lesson");
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_LESSONS"],
      });
      Sweetalert({
        icon: "success",
        message: "Lesson deleted",
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
