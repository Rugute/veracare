import { useMutation } from "@tanstack/react-query";
import {
  SignInSchema,
  SignInSchemaType,
  SignUpSchema,
  SignUpSchemaType,
} from "../Validations/AuthSchema";
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
        throw new Error(data.error || "Failed to login");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Login success");
    },
    onError: (error: Error) => toast.error(error.message || "Failed to login"),
  });
};

interface signUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: Date;
}

export const useAuthSignUp = () => {
  return useMutation({
    mutationFn: async (formData: SignUpSchemaType) => {
      const parsedData = SignUpSchema.parse(formData);

      const values: signUpProps = {
        ...parsedData,
        dateOfBirth: new Date(parsedData.dateOfBirth),
      };

      console.log(values);

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      console.log(data.message);
      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      return data;
    },
    onSuccess: (data) => toast.success(data.message || "Account created!"),

    onError: (error: Error) =>
      toast.error(error.message || "Failed to create account"),
  });
};

export const UseAuthLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Logout Failed");
      }

      return data;
    },
    onSuccess: (data) => toast.success(data.message || "Logout Succes"),
    onError: (e: Error) => toast.error(e.message || "Logout failed"),
  });
};
