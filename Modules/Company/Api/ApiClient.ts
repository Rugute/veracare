import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/company", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create company");
      }

      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_COMPANIES"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Company created",
        title: "Success!",
      });
    },

    onError: (e: Error) => {
      Sweetalert({
        icon: "error",
        message: e.message || "Failed to create company",
        title: "An error has occurred",
      });
    },
  });
};

interface GetCompanyResponse {
  items: {
    id: string;
    uuid: string;
    code: string;
    name: string;
    status: string;
    logo: string;
    location: string;
    address: string;
    email: string;
    phone: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    voided: number;
  }[];
  total: number;
}

export const UseGetCompnaies = ({
  page = 1,
  pageSize = 10,
  search = "",
}: ApiParams) => {
  return useQuery<GetCompanyResponse>({
    queryKey: ["ALL_COMPANIES", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        size: pageSize.toString(),
        page: page.toString(),
        ...(search && { search }),
      });
      const response = await fetch(`/api/company?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error fetching companies");
      }

      return data;
    },
  });
};

export const UseDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/company/${id}`, {
        method: "PATCH",
        credentials: "include",
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete Company");
      }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_COMPANIES"],
      });
      Sweetalert({
        icon: "success",
        message: "Company deleted",
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
};
