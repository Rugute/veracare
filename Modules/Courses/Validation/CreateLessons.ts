import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.ms-powerpoint",
];
const IMAGE_ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
const requiredString = z.string().trim().min(1, "This field is required");

export const CreateLessonSchema = z.object({
  course: requiredString,
  lesson: requiredString,
  videoUrl: requiredString,
  duration: z.coerce
    .number("Duration should be a number")
    .min(1, "Duration cannot be less than one"),
  order: z.coerce
    .number("Duration should be a number")
    .min(0, "Duration cannot be less than zero"),
  description: requiredString,
  file: z
    .instanceof(File, { message: "Document is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => IMAGE_ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, .webp and .pdf formats are supported.",
    ),
  document: z
    .instanceof(File, { message: "Document is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, .webp and .pdf formats are supported.",
    ),
});

export type CreateLessonSchemaType = z.input<typeof CreateLessonSchema>;
