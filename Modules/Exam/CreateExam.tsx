"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { UseCreateCourseCategory } from "./ApiClient/ApiClient";
import { useTransition } from "react";

const schema = z.object({
  name: z.string().trim().min(1, "This field is required"),
  description: z.string().optional(),
});

const CreateCourseCategories = () => {
  const router = useRouter();
  const { mutate } = UseCreateCourseCategory();
  const [isPending, startTransistion] = useTransition();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    startTransistion(() => {
      mutate(data, {
        onSuccess: () => router.push("/course-categories"),
      });
    });
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-4 md:p-6">
      <Card className="border shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold tracking-tight">
                Create course category
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Define a category to organize courses.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              type="button"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Category name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Web Development"
                        className="h-10"
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
                  <FormItem className="space-y-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Optional short description"
                        rows={4}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="cursor-pointer"
                >
                  {isPending ? (
                    <Loader2Icon className="animate-spin mr-2 h-4 w-4" />
                  ) : (
                    "  Save category"
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

export default CreateCourseCategories;
