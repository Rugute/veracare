"use client";

import { useMemo } from "react";
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
import { UseCreateQuestionBank } from "./Api/ApiClient";
import { UseGetQuestionsType } from "../Utils/Api/ApiClient";

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

  const selectedCourseId = form.watch("course");

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

  const { data: questionTypes, isLoading: questionTypesLoading } =
    UseGetQuestionsType({
      page: 1,
      pageSize: 50,
      search: "",
    });

  const { mutateAsync, isPending } = UseCreateQuestionBank();

  async function handleSubmit(data: QuestionsBankSchemaType) {
    const payload = {
      courseId: Number(data.course),
      lessonId: Number(data.lesson),
      questionTypeId: Number(data.questionsType),
      question: data.question,
    };

    await mutateAsync(payload, {
      onSuccess: () => router.push("/questions-bank"),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const courseItems = (courses?.items ?? courses ?? []) as any[];

  const questionTypeItems = (questionTypes?.items ??
    questionTypes ??
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    []) as any[];

  const filteredLessons = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const all = (lessons?.items ?? lessons ?? []) as any[];
    if (!selectedCourseId) return [];
    return all.filter((l) => String(l.courseId) === String(selectedCourseId));
  }, [lessons, selectedCourseId]);

  const handleCourseChange = (val: string) => {
    form.setValue("course", val);
    form.setValue("lesson", "");
  };

  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center p-4">
      <Card className="w-full max-w-2xl border shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Create Question
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Add a question and attach it to a course lesson.
              </p>
            </div>

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

        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid gap-6"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Course */}
                <FormField
                  name="course"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        {coursesLoading ? (
                          <div className="flex h-10 items-center rounded-md border px-3">
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                            <span className="ml-2 text-sm text-muted-foreground">
                              Loading courses…
                            </span>
                          </div>
                        ) : (
                          <Select
                            value={field.value || undefined}
                            onValueChange={handleCourseChange}
                          >
                            <SelectTrigger className="h-10 w-full">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>

                            <SelectContent>
                              {courseItems.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                  No course found
                                </div>
                              ) : (
                                courseItems.map((i) => (
                                  <SelectItem
                                    key={String(i.id)}
                                    value={String(i.id)}
                                  >
                                    {i.title}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
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
                    <FormItem className="space-y-2">
                      <FormLabel>Lesson</FormLabel>
                      <FormControl>
                        {lessonsLoading ? (
                          <div className="flex h-10 items-center rounded-md border px-3">
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                            <span className="ml-2 text-sm text-muted-foreground">
                              Loading lessons…
                            </span>
                          </div>
                        ) : (
                          <Select
                            value={field.value || undefined}
                            onValueChange={field.onChange}
                            disabled={!selectedCourseId}
                          >
                            <SelectTrigger className="h-10 w-full">
                              <SelectValue
                                placeholder={
                                  selectedCourseId
                                    ? "Select lesson"
                                    : "Select a course first"
                                }
                              />
                            </SelectTrigger>

                            <SelectContent>
                              {selectedCourseId &&
                              filteredLessons.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                  No lessons for this course
                                </div>
                              ) : (
                                filteredLessons.map((i) => (
                                  <SelectItem
                                    key={String(i.id)}
                                    value={String(i.id)}
                                  >
                                    {i.lessonName}
                                  </SelectItem>
                                ))
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Question */}
              <FormField
                name="question"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the question"
                        className="h-10"
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
                  <FormItem className="space-y-2">
                    <FormLabel>Question Type</FormLabel>
                    <FormControl>
                      {questionTypesLoading ? (
                        <div className="flex h-10 items-center rounded-md border px-3">
                          <Loader2Icon className="h-4 w-4 animate-spin" />
                          <span className="ml-2 text-sm text-muted-foreground">
                            Loading types…
                          </span>
                        </div>
                      ) : (
                        <Select
                          value={field.value || undefined}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-10 w-full">
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>

                          <SelectContent>
                            {questionTypeItems.length === 0 ? (
                              <div className="px-3 py-2 text-sm text-muted-foreground">
                                No question types found
                              </div>
                            ) : (
                              questionTypeItems.map((i) => (
                                <SelectItem
                                  key={String(i.id)}
                                  value={String(i.id)}
                                >
                                  {i.name}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="h-10"
                >
                  Cancel
                </Button>

                <Button type="submit" className="h-10" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    "Save Question"
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

export default CreateQuestionsBankForm;
