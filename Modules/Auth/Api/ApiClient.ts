import { useMutation } from "@tanstack/react-query";
import { SignInSchema, SignInSchemaType } from "../Validations/AuthSchema";
import { toast } from "sonner";

export const UseAuthSignIn = () => {
  return useMutation({
    mutationFn: async (formData: SignInSchemaType) => {
      const parsedData = SignInSchema.parse(formData);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Login success");
    },
    onError: (error: Error) => toast.error(error.message || "Failed to login"),
  });
};
