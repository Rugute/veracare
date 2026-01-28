import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UseCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/roles", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create roles");
      }

      return data;
    },

    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_ROLES"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Role created",
        title: "Success!",
      });
    },

    onError: (e: Error) => {
      Sweetalert({
        icon: "error",
        message: e.message || "Failed to create role",
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
    queryKey: ["ALL_ROLES", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        size: pageSize.toString(),
        page: page.toString(),
        ...(search && { search }),
      });
      const response = await fetch(`/api/roles?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error fetching roles");
      }

      return data;
    },
  });
};
