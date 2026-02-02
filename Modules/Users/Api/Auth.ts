import { useQuery } from "@tanstack/react-query";

export const GetCurretUser = (id: number) => {
  return useQuery({
    queryKey: ["LOGGED_IN_USER", id],
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Uauthorized, plaese login");
      }

      return data;
    },
    enabled: !!id,
  });
};
