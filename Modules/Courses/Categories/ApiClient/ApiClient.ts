import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation } from "@tanstack/react-query";

interface CreateCategory {
  name: string;
  description?: string;
}
export const UseCreateCourseCategory = () => {
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
    onSuccess: (data) =>
      Sweetalert({
        icon: "success",
        message: data.message || "Category Created",
        title: "Success!",
      }),
    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message || "Failed to create Category",
        title: "An error has occurred",
      }),
  });
};
