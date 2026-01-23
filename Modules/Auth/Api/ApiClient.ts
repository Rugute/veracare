import { useMutation, useQuery } from "@tanstack/react-query";
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

interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  dateOfBirth: Date;
  corporateId?: string; // Make it optional
}

interface SignUpVariables {
  formData: SignUpSchemaType;
  corporateId?: string;
}

export const useAuthSignUp = () => {
  return useMutation({
    mutationFn: async (variables: SignUpVariables) => {
      const { formData, corporateId } = variables;
      const parsedData = SignUpSchema.parse(formData);

      const values: SignUpProps = {
        ...parsedData,
        dateOfBirth: new Date(parsedData.dateOfBirth),
        corporateId: corporateId || "",
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

interface coprate {
  id: string;
  uuid: string;
  name: string;
  status: string;
  location: string;
  email: string;
  phone: string;
}

export const UseCoprateSignUp = (id: string) => {
  return useQuery<coprate>({
    queryKey: [`GET_COPRATE:${id}`],
    enabled: false,
    staleTime: 0,
    queryFn: async () => {
      const response = await fetch(`/api/company/code/${id.toUpperCase()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to get coprate details",
        );
      }
      return data;
    },
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
