"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Loader2Icon, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { UseAddAnswers } from "./Api/ApiClient";
import { toast } from "sonner";
import { QuestionBank } from "./Types/Index";
import { UseGetQuestionChoices } from "./Api/QuestionChoices";

interface Props {
  question: QuestionBank;
  questionId: string;
}

const schema = z
  .object({
    questionId: z.string().trim().min(1, "This field is required"),
    choices: z
      .array(
        z.object({
          label: z.string().trim().min(1, "Choice text is required"),
          id: z.string().optional(),
        }),
      )
      .min(2, "At least 2 choices are required"),
    correctAnswers: z
      .array(z.string().trim())
      .min(1, "Select at least one correct answer"),
  })
  .refine(
    (val) => {
      const normalizedChoices = val.choices.map((c) =>
        c.label.trim().toLowerCase(),
      );
      return val.correctAnswers.every((a) =>
        normalizedChoices.includes(a.trim().toLowerCase()),
      );
    },
    {
      message: "All correct answers must match one of the choices",
      path: ["correctAnswers"],
    },
  )

  .refine(
    (val) => {
      const labels = val.choices.map((c) => c.label.trim().toLowerCase());
      return labels.length === new Set(labels).size;
    },
    {
      message: "Choices must be unique",
      path: ["choices"],
    },
  )
  .refine(
    (val) => {
      const normalized = val.correctAnswers.map((a) => a.trim().toLowerCase());
      return normalized.length === new Set(normalized).size;
    },
    {
      message: "Correct answers must be unique",
      path: ["correctAnswers"],
    },
  );

type FormValues = z.infer<typeof schema>;

const CreateQuestionsAnswers = ({ question, questionId }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = UseAddAnswers();
  const { data: Choices } = UseGetQuestionChoices(String(question.id));
  const isEditting = !!question;
  console.log(Choices);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      questionId: String(question.id) || questionId,
      choices: [{ label: "" }, { label: "" }],
    },
    mode: "onSubmit",
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const fieldArray = useFieldArray({
    control,
    name: "choices",
  });

  const watchedChoices = useWatch({ control, name: "choices" });
  const currentCorrectAnswers = useWatch({ control, name: "correctAnswers" });

  const validChoiceOptions = useMemo(() => {
    return (watchedChoices ?? [])
      .map((c) => c?.label?.trim() ?? "")
      .filter((s) => s.length > 0);
  }, [watchedChoices]);

  useEffect(() => {
    if (!currentCorrectAnswers?.length) return;

    const normalizedOptions = validChoiceOptions.map((s) => s.toLowerCase());

    const next = currentCorrectAnswers.filter((ans) =>
      normalizedOptions.includes(ans.trim().toLowerCase()),
    );

    if (next.length !== currentCorrectAnswers.length) {
      setValue("correctAnswers", next);
    }
  }, [validChoiceOptions, currentCorrectAnswers, setValue]);

  const onSubmit = async (data: FormValues) => {
    const values = {
      questionId: parseInt(data.questionId),
      choices: data.choices.map((c) => c.label.trim()),
      correctAnswers: data.correctAnswers.map((a) => a.trim()),
    };
    try {
      mutateAsync(values, {
        onSuccess: () => {
          setOpen(false);
          form.reset({
            questionId,
            choices: [{ label: "" }, { label: "" }],
            correctAnswers: [],
          });
        },
      });
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="size-8 rounded-full"
            type="button"
          >
            {question._count.questionChoices}
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add answers</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-1 text-sm mt-2">
                <span className="font-medium text-foreground">
                  {question.course.title}
                </span>
                <span className="text-muted-foreground text-xs">
                  {question.course.title} &bull; {question.lesson.lessonName}
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-4" />

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Choices</h4>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fieldArray.append({ label: "" })}
                  >
                    Add choice
                  </Button>
                </div>

                {errors.choices?.root && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.choices.root.message}
                  </p>
                )}
                {typeof errors.choices?.message === "string" && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.choices.message}
                  </p>
                )}

                <div className="space-y-3">
                  {fieldArray.fields.map((f, index) => (
                    <div key={f.id} className="flex gap-2 items-start group">
                      <div className="mt-3 text-xs text-muted-foreground w-4">
                        {index + 1}.
                      </div>

                      <FormField
                        name={`choices.${index}.label`}
                        control={control}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder={`Enter choice ${index + 1}...`}
                                {...field}
                                autoComplete="off"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={fieldArray.fields.length <= 2}
                        onClick={() => fieldArray.remove(index)}
                        className={cn(
                          "mt-0.5 text-muted-foreground hover:text-destructive transition-colors",
                          fieldArray.fields.length <= 2 &&
                            "opacity-50 cursor-not-allowed",
                        )}
                      >
                        <Trash className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* MULTI CORRECT ANSWERS */}
              <FormField
                name="correctAnswers"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <div className="mb-2">
                      <span className="text-sm font-medium">
                        Correct Answers
                      </span>
                      <p className="text-[0.8rem] text-muted-foreground">
                        Tick all correct options.
                      </p>
                    </div>

                    <div className="space-y-2 rounded-md border p-3">
                      {validChoiceOptions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Add choices first.
                        </p>
                      ) : (
                        validChoiceOptions.map((label, idx) => {
                          const checked =
                            (field.value ?? []).includes(label) ?? false;

                          return (
                            <label
                              key={`${idx}-${label}`}
                              className="flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={checked}
                                onChange={(e) => {
                                  const next = e.target.checked
                                    ? [...(field.value ?? []), label]
                                    : (field.value ?? []).filter(
                                        (v) => v !== label,
                                      );

                                  field.onChange(next);
                                }}
                              />
                              <span>{label}</span>
                            </label>
                          );
                        })
                      )}
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-2">
                <Button type="submit">
                  {isPending ? (
                    <Loader2Icon className="w-4 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateQuestionsAnswers;
