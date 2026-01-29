"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  CreateQuestionTypeSchema,
  CreateQuestionTypeSchemaType,
} from "../Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseCreateQuestionType } from "../Api/ApiClient";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CreateQuestionType = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = UseCreateQuestionType();

  const form = useForm<CreateQuestionTypeSchemaType>({
    resolver: zodResolver(CreateQuestionTypeSchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  const handleSubmit = async (data: CreateQuestionTypeSchemaType) => {
    try {
      await mutateAsync(data, {
        onSuccess: () => router.push("/questions-type"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] w-full px-4 py-8 sm:px-6">
      <Card className="mx-auto w-full max-w-xl">
        <CardHeader className="space-y-0">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="text-lg sm:text-xl">
              Create Question Type
            </CardTitle>

            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="shrink-0"
            >
              <ArrowLeftCircle className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Type Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="e.g. True/False"
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
                    <FormItem>
                      <FormLabel>Question Type Description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                  disabled={isPending}
                >
                  Clear
                </Button>

                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
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

export default CreateQuestionType;
