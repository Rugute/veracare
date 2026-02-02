"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import PageLoader from "@/Modules/Utils/PageLoader";
import { UseGetCalenderEvents } from "../Api/ApiClient";
import {
  format,
  isSameDay,
  startOfDay,
  isBefore,
  isWithinInterval,
  parseISO,
  compareAsc,
} from "date-fns";
import Image from "next/image";
import { CalendarDays, Search, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// Using the interface you provided
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

const CalenderEvents = () => {
  const { data, isLoading } = UseGetCalenderEvents();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [search, setSearch] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events = (data?.items as EventItem[]) ?? [];

  // 1. Helper: Determine the status banner based on the Selected Date vs Today
  const getDayStatus = (date: Date) => {
    const today = startOfDay(new Date());
    const selected = startOfDay(date);

    if (isSameDay(selected, today)) {
      return {
        label: "Happening Today",
        badgeStyle:
          "bg-green-500 hover:bg-green-600 border-transparent text-white",
        borderStyle: "border-green-500",
      };
    }
    if (isBefore(selected, today)) {
      return {
        label: "Past Event",
        badgeStyle: "bg-red-500 hover:bg-red-600 border-transparent text-white",
        borderStyle: "border-red-500",
      };
    }
    return {
      label: "Upcoming",
      badgeStyle: "bg-blue-500 hover:bg-blue-600 border-transparent text-white",
      borderStyle: "border-blue-500",
    };
  };

  const currentStatus = selectedDate ? getDayStatus(selectedDate) : null;

  // 2. Filter Logic: Checks if Selected Date falls BETWEEN Start and End date
  const filteredEvents = useMemo(() => {
    if (!selectedDate) return [];

    // Normalize selected date to 00:00:00 to avoid time conflicts
    const targetDate = startOfDay(selectedDate);

    return events.filter((event) => {
      // Filter out voided events
      if (event.voided === 1) return false;

      // Parse and normalize event dates
      const eventStart = startOfDay(parseISO(event.startDate));

      // Handle end date: if null/invalid, assume single day event, else parse
      let eventEnd = event.endDate
        ? startOfDay(parseISO(event.endDate))
        : eventStart;

      // Safety check: date-fns throws if start > end.
      // If data is bad (end before start), treat it as a single day event.
      if (compareAsc(eventStart, eventEnd) > 0) {
        eventEnd = eventStart;
      }

      // THE CORE FIX: Check if target is inside the interval [start, end]
      const isDateMatch = isWithinInterval(targetDate, {
        start: eventStart,
        end: eventEnd,
      });

      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        (event.description &&
          event.description.toLowerCase().includes(search.toLowerCase()));

      return isDateMatch && matchesSearch;
    });
  }, [events, selectedDate, search]);

  if (isLoading) return <PageLoader />;

  return (
    <Card className="max-w-6xl mx-auto shadow-lg border-none bg-background/50 backdrop-blur">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b mb-6">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            Event Schedule
          </CardTitle>
          <CardDescription>
            {selectedDate ? (
              <span>
                Events for{" "}
                <span className="font-semibold text-foreground">
                  {format(selectedDate, "PPPP")}
                </span>
              </span>
            ) : (
              "Select a date to view events"
            )}
          </CardDescription>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Calendar */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="rounded-xl border bg-card p-3 shadow-sm sticky top-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full flex justify-center"
            />
          </div>
        </div>

        {/* Right: Events List */}
        <div className="lg:col-span-8">
          <ScrollArea className="h-[600px] pr-4">
            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl opacity-60 bg-muted/20">
                <CalendarDays className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium">No events scheduled</p>
                <p className="text-xs text-muted-foreground">
                  No active events found for this date.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "group flex flex-col sm:flex-row gap-4 p-4 rounded-r-xl border border-l-[6px] bg-card hover:bg-accent/40 transition-all duration-200 shadow-sm",
                      currentStatus?.borderStyle, // This sets the Red/Green/Blue left border
                    )}
                  >
                    {/* Event Image */}
                    {event.image ? (
                      <div className="relative h-40 sm:h-auto sm:w-36 shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={event.image}
                          fill
                          alt={event.title}
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      // Fallback if no image
                      <div className="h-40 sm:h-auto sm:w-36 shrink-0 rounded-md bg-muted flex items-center justify-center">
                        <CalendarDays className="h-8 w-8 text-muted-foreground/50" />
                      </div>
                    )}

                    <div className="flex-1 flex flex-col gap-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-lg leading-tight pt-1">
                          {event.title}
                        </h4>

                        {/* Status Banner (Badge) */}
                        {currentStatus && (
                          <Badge
                            className={cn(
                              "whitespace-nowrap shadow-sm",
                              currentStatus.badgeStyle,
                            )}
                          >
                            {currentStatus.label}
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {format(parseISO(event.startDate), "MMM d, yyyy")}
                            {" - "}
                            {format(parseISO(event.endDate), "MMM d, yyyy")}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mt-1">
                        {event.description || "No description provided."}
                      </p>

                      {/* Price / Capacity Footer */}
                      <div className="mt-auto pt-3 flex items-center gap-3 text-xs">
                        {event.price && (
                          <Badge
                            variant="outline"
                            className="border-primary/20 bg-primary/5 text-primary"
                          >
                            {event.price}
                          </Badge>
                        )}
                        {event.capacity && (
                          <span className="text-muted-foreground">
                            Capacity: {event.capacity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalenderEvents;
