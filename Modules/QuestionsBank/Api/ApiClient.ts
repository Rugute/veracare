import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QuestionsBankSchemaType } from "../Validation";
import { Sweetalert } from "@/Modules/Utils/SweetAlert";

interface bankRespone {
  items: {
    questionTypeId: number | null;
    courseId: number | null;
    question: string | null;
    lessonId: number | null;
    id: number;
    voided: 0 | 1;
    course: {
      title: string | null;
      slug: string | null;
      description: string | null;
      published: boolean | null;
      created_at: string | null;
      updated_at: string | null;
    };
    lesson: {
      lessonName: string | null;
      lessonVideo: string | null;
      lessonDuration: number | null;
      lessonOrder: string | null;
      lessonDescription: string | null;
    };
    questionType: {
      id: number;
      name: string | null;
      description: string | null;
    };
    _count: {
      questionChoices: number;
    };
  }[];
  total: number;
}

export function UseGetQuestionsBank({ page, pageSize, search }: ApiParams) {
  return useQuery<bankRespone>({
    queryKey: ["QUESTIONS_BANK", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/questions-bank?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      return data;
    },
  });
}

interface formData {
  courseId: number;
  lessonId: number;
  questionTypeId: number;
  question: string;
}

export function UseCreateQuestionBank() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: formData) => {
      const response = await fetch("/api/questions-bank", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create Question");
      }

      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["QUESTIONS_BANK"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Question Created",
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

export function UseDeleteQuestionBank() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const response = await fetch(`/api/questions-bank/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete Question");
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["QUESTIONS_BANK"],
      });
      Sweetalert({
        icon: "success",
        message: "Question Deleted",
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

type AnswersProps = {
  choices: string[];
  questionId: number;
  correctAnswers: string[];
};

export const UseAddAnswers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: AnswersProps) => {
      const response = await fetch("/api/question-choices", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add answers to questions");
      }

      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["QUESTIONS_BANK"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Answers added to question",
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
