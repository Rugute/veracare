"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

interface Props {
  items: number;
  questionId: string;
  questionName: string;
  course: string;
  lesson: string;
}

const schema = z
  .object({
    questionId: z.string().trim().min(1, "This field is required"),
    choices: z.array(z.string()).min(2, "Question choices should be atleast 2"),
    correctAnswer: z.string().trim().min(1, "Correct answer is required"),
  })
  .refine(
    (val) =>
      val.choices
        .map((c) => c.trim().toLowerCase())
        .includes(val.correctAnswer.trim().toLowerCase()),
    {
      message: "Correct answer should be part of choices",
      path: ["correctAnswer"],
    },
  );

const CreateQuestionsAnswers = ({
  items,
  questionId,
  questionName,
  course,
  lesson,
}: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      choices: [],
      correctAnswer: "",
      questionId: questionId,
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "choices",
    rules: {
      minLength: 4,
    },
  });

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon-sm"
            variant="ghost"
            className="size-2 rounded-full cursor-pointer"
          >
            {items}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="w-150">
          <PopoverHeader>
            <PopoverTitle>Add answers to questions</PopoverTitle>
            <PopoverDescription>
              <p>
                <span>Course:{course}</span>
                <span>lesson:{lesson}</span>
                <span>questionName:{questionName}</span>
              </p>
            </PopoverDescription>
          </PopoverHeader>

          <Separator />

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CreateQuestionsAnswers;
