import { useQuery } from "@tanstack/react-query";

export const UseGetUtils = () => {
  return useQuery({
    queryKey: ["UTILS_COURSES"],
    queryFn: async () => {
      const response = await fetch("/api/utils/courses", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-TYpe": "application/json",
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

type QuestionsTypeResponse = {
  items: {
    id: number;
    name: string;
    description: string;
    voided: 1 | 0;
  }[];
  total: number;
};

export const UseGetQuestionsType = ({ page, pageSize, search }: ApiParams) => {
  return useQuery<QuestionsTypeResponse>({
    queryKey: ["QUESTIONS_TYPES", page, pageSize, search],
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
