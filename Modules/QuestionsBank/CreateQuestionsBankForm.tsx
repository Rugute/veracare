"use client";

import { useForm } from "react-hook-form";
import { QuestionsBankSchema, QuestionsBankSchemaType } from "./Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UseGetCourses } from "../Courses/ApiClient/ApiClient";
import { UseGetAllLessons } from "../Courses/Lessons/Api/ApiClient";


const CreateQuestionsBankForm = () => {
  const router = useRouter();

  const form = useForm<QuestionsBankSchemaType>({
    resolver: zodResolver(QuestionsBankSchema),
    defaultValues: {
      course: "",
      lesson: "",
      question: "",
      questionsType: "",
    },
  });

  const { data: courses, isLoading: coursesLoading } = UseGetCourses({
    page: 1,
    pageSize: 50,
    search: "",
  });

  const { data: lessons, isLoading: lessonsLoading } = UseGetAllLessons({
    page: 1,
    pageSize: 50,
    search: "",
  });

  // const filteredLessons = lessons?.items.filter((l) => l. === courseId);

  function handleSubmit(data: QuestionsBankSchemaType) {
    console.log(data);
    router.push("/questions-bank");
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center p-4">
      <Card className="w-full max-w-2xl border shadow-sm">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Create Question
            </CardTitle>

            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
              type="button"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <Separator />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
            >
              {/* Course */}
              <FormField
                name="course"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <FormControl>
                      {coursesLoading ? (
                        <Loader2Icon className="animate-spin h-4 w-4" />
                      ) : (
                        <>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="h-9 w-full">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses?.items.length === 0 ? (
                                <div>
                                  <p>No course found</p>
                                </div>
                              ) : (
                                courses?.items.map((i) => (
                                  <SelectItem key={i.id} value={i.id}>
                                    {i.title}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lesson */}
              <FormField
                name="lesson"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lesson</FormLabel>
                    <FormControl>
                      {lessonsLoading ? (
                        <Loader2Icon className="animate-spin h-4 w-4" />
                      ) : (
                        <>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="h-9 w-full">
                              <SelectValue placeholder="Select lesson" />
                            </SelectTrigger>
                            <SelectContent>
                              {lessons?.items.length === 0 ? (
                                <div>
                                  <p>No lessons found</p>
                                </div>
                              ) : (
                                lessons?.items.map((i, idx) => (
                                  <SelectItem key={idx} value={i.id}>
                                    {i.title}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Question (always full width) */}
              <FormField
                name="question"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the question"
                        className="h-9 w-full"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Question Type */}
              <FormField
                name="questionsType"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-9 w-full">
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Multiple choice", "Yes / No", "Essay"].map(
                            (i, idx) => (
                              <SelectItem key={idx} value={i}>
                                {i}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit (full width, aligned right) */}
              <div className="col-span-full flex justify-end">
                <Button type="submit">Save Question</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateQuestionsBankForm;
