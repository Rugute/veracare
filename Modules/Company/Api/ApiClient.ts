import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const UseCreateCompany = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/company", {
        method: "POST",
        credentials: "include",
        // headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create company");
      }

      return data;
    },

    onSuccess: (data) => toast.success(data.message || "Company created"),
    onError: (e: Error) => toast.error(e.message || "Failed to create compnay"),
  });
};
