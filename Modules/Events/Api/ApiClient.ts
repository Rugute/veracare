import { Sweetalert } from "@/Modules/Utils/SweetAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface EventsResponse {
  items: EventItem[];
  total: number;
}

export interface EventItem {
  id: number;
  title: string;
  description: string | null;
  startDate: string; // ISO string
  endDate: string; // ISO string
  image: string | null;
  capacity: number | null;
  location: string;
  courseId: number;
  price: string;
  voided: 0 | 1;
  userId: number;

  course: Course;
  user: User;
}
export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  photo: string | null;
  categoryId: number | null;
  uuid: string;
  voided: 0 | 1;
  createdById: number;
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export function UseGetEvents({
  page = 1,
  pageSize = 10,
  search = "",
}: ApiParams) {
  return useQuery<EventsResponse>({
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
