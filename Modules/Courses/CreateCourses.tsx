"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { CreateCourseSchema, CreateCourseSchemaType } from "./Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseCreateCourse } from "./ApiClient/ApiClient";
import { useTransition } from "react";
import { UseGetCourseCategory } from "./Categories/ApiClient/ApiClient";

const CreateCourses = () => {
  const router = useRouter();
  const { mutateAsync } = UseCreateCourse();
  const [isPending, startTransistion] = useTransition();
  const { data: categories, isLoading: categoriesLoading } =
    UseGetCourseCategory({
      page: 1,
      pageSize: 50,
      search: "",
    });
  const form = useForm<CreateCourseSchemaType>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      category: "",
      description: "",
      // instructor: "",
      // price: "",
      published: "",
      // requirements: "",
      title: "",
      file: undefined,
    },
  });

  const handleSubmit = async (data: CreateCourseSchemaType) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("published", data.published);
    formData.append("category", data.category);
    // formData.append("instructor", data.instructor);
    // formData.append("price", String(data.price));
    // formData.append("requirements", data.requirements);

    if (data.file) {
      formData.append("file", data.file);
    }

    startTransistion(async () => {
      try {
        await mutateAsync(formData, {
          onSuccess: () => {
            router.push("/courses");
          },
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <Card className="border shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold tracking-tight">
            Create Course
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
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Course Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter course title"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                name="category"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-medium">
                      Course Category
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl className="w-full">
                        <SelectTrigger>
                          {categoriesLoading ? (
                            <div className="flex gap-2">
                              <Loader2Icon className="h-2 w-2 animate-spin" />{" "}
                              loading...
                            </div>
                          ) : (
                            <SelectValue placeholder="Select course category" />
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.items.length === 0 ? (
                          <>
                            <p>No categories found</p>
                          </>
                        ) : (
                          categories?.items.map((i) => (
                            <SelectItem key={i.id} value={String(i.id)}>
                              {i.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Course Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="0.00"
                        className="h-10"
                        value={field.value as string}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              /> */}

              <FormField
                name="published"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="md:col-span-2 w-full">
                    <FormLabel className="font-medium">Published</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="h-10 w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {["0", "1"].map((i) => (
                          <SelectItem key={i} value={i}>
                            {i === "0" ? "YES" : "NO"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* <FormField
                name="instructor"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">
                      Course Instructor
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter instructor name"
                        className="h-10"
                      />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              /> */}
            </div>

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Course Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter course description"
                      className="min-h-32 resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />

            {/* <FormField
              name="requirements"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Course Requirements
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter course requirements"
                      className="min-h-32 resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            /> */}
            <FormField
              name="file"
              control={form.control}
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="font-medium">Course Document</FormLabel>
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
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="h-10 px-6"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-10 px-6" disabled={isPending}>
                {isPending ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  " Save Course"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateCourses;
