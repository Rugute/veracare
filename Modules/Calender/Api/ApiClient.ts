import { useQuery } from "@tanstack/react-query";

export interface EventsResponse {
  items: EventItem[];
}

export interface EventItem {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  image: string | null;
  capacity: number | null;
  location: string;
  courseId: number;
  price: string;
  voided: 0 | 1;
  userId: number;
}

export const UseGetCalenderEvents = () => {
  return useQuery<EventsResponse>({
    queryKey: ["CALENDER_EVENTS"],
    queryFn: async () => {
      const response = await fetch(`/api/utils/calandar`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load events");
      }

      return data;
    },
  });
};
