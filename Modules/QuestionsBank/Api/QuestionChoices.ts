import { useQuery } from "@tanstack/react-query";

export function UseGetQuestionChoices(id: string,) {
  return useQuery({
    queryKey: ["QUESTION_CHOICES", id],
    queryFn: async () => {
      const response = await fetch(`/api/question-choices/qid/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error fetching question choices");
      }

      return data;
    },
  });
}
