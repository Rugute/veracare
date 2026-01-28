import { useQuery } from "@tanstack/react-query";

export const UseGetUtils = () => {
  return useQuery({
    queryKey: ["UTILS"],
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
