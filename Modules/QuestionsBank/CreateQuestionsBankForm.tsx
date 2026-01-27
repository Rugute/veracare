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
import { ArrowLeft } from "lucide-react";
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

  function handleSubmit(data: QuestionsBankSchemaType) {
    console.log(data);
    router.push("/questions-bank");
  }

  return (
    <div className="min-h-[calc(100dvh-4rem)] grid place-items-center p-4">
      <Card className="w-full max-w-2xl border shadow-sm">
        {/* Header */}
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Create Question
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

          <Separator />
        </CardHeader>

        {/* Form */}
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Course + Lesson */}
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  name="course"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            {["course 1", "course 2", "course 3"].map(
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

                <FormField
                  name="lesson"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="Select lesson" />
                          </SelectTrigger>
                          <SelectContent>
                            {["lesson 1", "lesson 2", "lesson 3"].map(
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
              </div>

              {/* Question */}
              <FormField
                name="question"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter the question"
                        className="h-9"
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
                        <SelectTrigger className="h-9">
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

              <div className="flex justify-end">
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
