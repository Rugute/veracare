import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type QuestionsTypeResponse = {
  items: {
    id: number;
    name: string;
    description: string;
    voided: 1 | 0;
  }[];
  total: number;
};

export const UseGetAllQuestionType = ({
  page,
  pageSize,
  search,
}: ApiParams) => {
  return useQuery<QuestionsTypeResponse>({
    queryKey: ["ALL_QUESTIONS_TYPE", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/question-type?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch question types");
      }

      return data;
    },
  });
};

type QuestionProps = {
  name: string;
  description?: string;
};

export const UseCreateQuestionType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: QuestionProps) => {
      const response = await fetch("/api/question-type", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create question type");
      }

      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_QUESTIONS_TYPE"],
      });

      Sweetalert({
        icon: "success",
        message: data.message || "Question type created",
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
export const UseDeleteQuestionType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/question-type/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete question type");
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_QUESTIONS_TYPE"],
      });

      Sweetalert({
        icon: "success",
        message: "Question type deleted",
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
