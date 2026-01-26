"use client";

import { useForm } from "react-hook-form";
import {
  CreateLessonSchema,
  CreateLessonSchemaType,
} from "../Validation/CreateLessons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const CreateLessons = () => {
  const router = useRouter();
  const form = useForm<CreateLessonSchemaType>({
    resolver: zodResolver(CreateLessonSchema),
    defaultValues: {
      course: "",
      description: "",
      document: undefined,
      duration: "",
      lesson: "",
      order: "",
      videoUrl: "",
    },
  });

  const handleSubmit = async (data: CreateLessonSchemaType) => {
    const formData = new FormData();

    formData.append("course", data.course);
    formData.append("description", data.description);

    if (data.document) {
      formData.append("document", data.document);
    }
    formData.append("duration", data.duration as string);
    formData.append("lesson", data.lesson);
    formData.append("order", data.order as string);
    formData.append("video", data.videoUrl);

    formData.forEach((i) => {
      console.log(i.valueOf);
    });
    router.push("/lessons");
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Create Lesson
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                name="course"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Course</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["course 1", "course 2", "course 3"].map((i, idx) => (
                          <SelectItem key={idx} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                name="lesson"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Lesson Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter lesson title"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                name="videoUrl"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Video URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter video URL"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:col-span-2">
                <FormField
                  name="duration"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 45 minutes"
                          className="h-10"
                          {...field}
                          value={field.value as string}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />

                <FormField
                  name="order"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Lesson Order
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 1, 2, 3"
                          className="h-10"
                          {...field}
                          value={field.value as string}
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="font-medium">
                      Lesson Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter lesson description"
                        className="h-10"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                name="document"
                control={form.control}
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="font-medium">
                      Lesson Document
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Input
                          {...fieldProps}
                          accept=".pdf,.ppt,.docx"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            onChange(file || null);
                          }}
                        />
                        <FormDescription className="text-xs">
                          Upload Document (PDF, Word, PPT) - Max 10MB
                        </FormDescription>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-10 px-6"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-10 px-6">
                Save Lesson
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateLessons;
