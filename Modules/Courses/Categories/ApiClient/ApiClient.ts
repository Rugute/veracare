import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateCategory {
  name: string;
  description?: string;
}
export const UseCreateCourseCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: CreateCategory) => {
      const response = await fetch("/api/category", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create category");
      }
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["COURSE_CATEGORIES"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Category Created",
        title: "Success!",
      });
    },
    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message || "Failed to create Category",
        title: "An error has occurred",
      }),
  });
};

interface CourseCategoryResponse {
  items: {
    id: string;
    name: string;
    createdBy: number;
    voided: number;
    description: string;
  }[];
  total: number;
}

interface UseGetCourseCategoryParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const UseGetCourseCategory = ({
  page = 1,
  pageSize = 10,
  search = "",
}: UseGetCourseCategoryParams) => {
  return useQuery<CourseCategoryResponse>({
    queryKey: ["COURSE_CATEGORIES", page, pageSize, search],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({
        size: pageSize.toString(),
        page: page.toString(),
        ...(search && { search }),
      });
      const response = await fetch(`/api/category?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch Course Categories");
      }
      return data;
    },
  });
};
