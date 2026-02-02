"use client";

import { useForm } from "react-hook-form";
import { EventsSchema, EventsSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UseCreateEvents } from "../Api/ApiClient";
import { UseGetCourses } from "@/Modules/Courses/ApiClient/ApiClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseGetInstructors } from "@/Modules/Instructors/Api/Apiclient";

const toDateInputValue = (d?: Date) =>
  d ? new Date(d).toISOString().slice(0, 10) : "";

const CreateEvents = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = UseCreateEvents();
  const { data, isLoading: coursesLoading } = UseGetCourses({
    page: 1,
    pageSize: 50,
    search: "",
  });
  const { data: instructors, isLoading: instructorsLoading } =
    UseGetInstructors({
      page: 1,
      pageSize: 50,
      search: "",
    });

  const courses = data?.items || [];

  const form = useForm<EventsSchemaType>({
    resolver: zodResolver(EventsSchema),
    defaultValues: {
      description: "",
      endDate: undefined,
      file: undefined,
      startDate: undefined,
      price: 0,
      title: "",
      courseId: "",
      location: "",
      instructorId: "",
    },
  });

  const handleSubmit = async (data: EventsSchemaType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("courseId", data.courseId);
    formData.append("startDate", data.startDate.toISOString());
    formData.append("endDate", data.endDate.toISOString());
    formData.append("price", data.price.toString());
    formData.append("location", data.location);
    formData.append("instructor", data.instructorId);

    if (data.file) formData.append("file", data.file);

    try {
      await mutateAsync(formData, { onSuccess: () => router.push("/events") });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <Card className="mx-auto w-full max-w-full">
        <CardHeader className="space-y-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl font-semibold">
              Create a new Event
            </CardTitle>

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              <ArrowLeftCircle className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Event title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Event title"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Event description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Event description"
                          className="min-h-28 resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="location"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Event location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="event location"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="courseId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 w-full">
                      <FormLabel>Course</FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {coursesLoading ? (
                            <div className="flex items-center justify-center p-3">
                              <Loader2Icon className="h-4 w-4 animate-spin" />
                            </div>
                          ) : courses.length === 0 ? (
                            <div className="p-3 text-sm text-muted-foreground">
                              No courses found
                            </div>
                          ) : (
                            courses.map((c) => (
                              <SelectItem key={c.id} value={String(c.id)}>
                                {c.title}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="instructorId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 w-full">
                      <FormLabel>Instructor</FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {instructorsLoading ? (
                            <div className="flex items-center justify-center p-3">
                              <Loader2Icon className="h-4 w-4 animate-spin" />
                            </div>
                          ) : instructors?.items.length === 0 ? (
                            <div className="p-3 text-sm text-muted-foreground">
                              No courses found
                            </div>
                          ) : (
                            instructors?.items.map((c) => (
                              <SelectItem key={c.id} value={String(c.id)}>
                                {[c.firstName, c.lastName]
                                  .filter(Boolean)
                                  .join(" ")}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="startDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event start date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={toDateInputValue(field.value)}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? new Date(e.target.value)
                                : undefined,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="endDate"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event end date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={toDateInputValue(field.value)}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? new Date(e.target.value)
                                : undefined,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0.00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="file"
                  control={form.control}
                  render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem>
                      <FormLabel>Event banner</FormLabel>
                      <FormControl>
                        <Input
                          {...rest}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? undefined;
                            onChange(file);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isPending}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isPending} className="gap-2">
                  {isPending ? (
                    <>
                      <Loader2Icon className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Event"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEvents;
