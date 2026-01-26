import z from "zod";

const requiredString = z.string().trim().min(1, "This field is required");
// const optionalString = z.string().optional();

export const CreateCourseSchema = z.object({
  title: requiredString,
  category: requiredString,
  price: z.coerce
    .number("Enter a valid price")
    .min(1, "Price should be at least 1"),
  published: requiredString.refine((val) => ["yes", "no"].includes(val), {
    error: "Select a valid option",
  }),
  instructor: requiredString,
  description: requiredString,
  requirements: requiredString,
});

export type CreateCourseSchemaType = z.input<typeof CreateCourseSchema>;
