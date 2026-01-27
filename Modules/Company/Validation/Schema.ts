import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const CorporateProfileSchema = z.object({
  name: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  code: z.string().min(1, "License number is required"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number should be at least 10 characters")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .or(z.literal("")),
  location: z.string().min(1, "Location is required"),
  address: z.string().min(1, "Full address is required"),
  status: z.string().default("pending"),

  file: z
    .instanceof(File, { message: "Document is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, .webp and .pdf formats are supported.",
    ),
});

export type CorporateProfileInputType = z.input<typeof CorporateProfileSchema>;
