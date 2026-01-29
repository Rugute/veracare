import z from "zod";

export const CreateQuestionTypeSchema = z.object({
  name: z.string().trim().min(1, "This field is required"),
  description: z.string().trim().optional(),
});

export type CreateQuestionTypeSchemaType = z.infer<
  typeof CreateQuestionTypeSchema
>;
