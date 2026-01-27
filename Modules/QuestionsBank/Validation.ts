import z from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

export const QuestionsBankSchema = z.object({
  course: requiredString,
  lesson: requiredString,
  question: requiredString,
  questionsType: requiredString,
});

export type QuestionsBankSchemaType = z.infer<typeof QuestionsBankSchema>;
