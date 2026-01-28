import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CreateExam {
  name: string;
  description?: string;
}
export const UseCreateExam = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: CreateExam) => {
      const response = await fetch("/api/exam", {
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
        queryKey: ["EXAMS"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Exam Created",
        title: "Success!",
      });
    },
    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message || "Failed to create Exam",
        title: "An error has occurred",
      }),
  });
};

interface ExamResponse {
  items: {
    id: string;
    name: string;
    description: string;
    voided: number;
  }[];
  total: number;
}

interface UseGetExam {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const UseGetExam = ({
  page = 1,
  pageSize = 10,
  search = "",
}: UseGetExam) => {
  return useQuery<ExamResponse>({
    queryKey: ["EXAMS", page, pageSize, search],
    queryFn: async ({ signal }) => {
      const params = new URLSearchParams({
        size: pageSize.toString(),
        page: page.toString(),
        ...(search && { search }),
      });
      const response = await fetch(`/api/exam?${params.toString()}`, {
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
