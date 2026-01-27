import z from "zod";

const requiredString = z.string().trim().min(1, "This field is required");
// const optionalString = z.string().optional();

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.ms-powerpoint",
];
export const CreateCourseSchema = z.object({
  title: requiredString,
  category: requiredString,
  price: z.coerce
    .number("Enter a valid price")
    .min(1, "Price should be at least 1"),
  published: requiredString.refine((val) => ["1", "0"].includes(val), {
    error: "Select a valid option",
  }),
  instructor: requiredString,
  description: requiredString,
  requirements: requiredString,
  file: z
    .instanceof(File, { message: "file is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, .webp and .pdf formats are supported.",
    ),
});

export type CreateCourseSchemaType = z.input<typeof CreateCourseSchema>;
