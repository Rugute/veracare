import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface EventsReponse {
  items: {
    title: string;
    id: number;
    photo: string | null;
    voided: number;
    description: string | null;
    slug: string | null;
    uuid: string;
    published: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    categoryId: number | null;
    createdById: number;
  }[];
  total: number;
}

export function UseGetEvents({
  page = 1,
  pageSize = 10,
  search = "",
}: ApiParams) {
  return useQuery<EventsReponse>({
    queryKey: ["ALL_EVENTS", page, pageSize, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/events?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Internal server error");
      }

      return data;
    },
  });
}

export function UseCreateEvents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/events", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event");
      }
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_EVENTS"],
      });
      Sweetalert({
        icon: "success",
        message: data.message || "Event created",
        title: "Success!",
      });
    },

    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message,
        title: "An error has occurred",
      }),
  });
}

export function UseDeleteEvents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/events/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 204) {
        throw new Error("Failed to delete event");
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["ALL_EVENTS"],
      });
      Sweetalert({
        icon: "success",
        message: "Event deleted",
        title: "Success!",
      });
    },

    onError: (e: Error) =>
      Sweetalert({
        icon: "error",
        message: e.message,
        title: "An error has occurred",
      }),
  });
}
