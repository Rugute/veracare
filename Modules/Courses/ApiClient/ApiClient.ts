import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/courses", {
        method: "POST",
        credentials: "include",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create Course");
      }

      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_COURSES"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Course Created",
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
};

interface GetCoursesResponse {
  items: {
    id: string;
    title: string;
    slug: string;
    description: string;
    published: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    photo: string;
    categoryId: null;
    uuid: string;
    voided: number;
    createdById: number;
  }[];
  total: number;
}

export const UseGetCourses = ({ page, pageSize, search }: ApiParams) => {
  return useQuery<GetCoursesResponse>({
    queryKey: ["ALL_COURSES", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/courses?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch courses");
      }

      return data;
    },
  });
};
