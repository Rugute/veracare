import { z } from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const EventsSchema = z
  .object({
    title: requiredString,
    location: requiredString,
    description: z.string().optional(),
    courseId: requiredString,
    instructorId: requiredString,
    startDate: z.coerce
      .date<Date>({ message: "Please select a valid date" })
      .refine((val) => val >= new Date(), {
        message: "Start date cannot be in the past",
      }),

    endDate: z.coerce
      .date<Date>({ message: "Please select a valid date" })
      .refine((val) => val >= new Date(), {
        message: "End date cannot be in the past",
      }),

    price: z.coerce
      .number<number>({ message: "Enter a valid number" })
      .min(0, "Price cannot be less than zero"),

    file: z
      .instanceof(File, { message: "File is required" })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `Max file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Only .jpg, .png, and .webp formats are supported.",
      }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date cannot be before start date",
    path: ["endDate"],
  });

export type EventsSchemaType = z.infer<typeof EventsSchema>;
