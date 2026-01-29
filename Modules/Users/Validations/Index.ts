import z from "zod";

const requiredString = z.string().trim().min(1, "This field is required");
const optionalString = z.string().optional();

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export const CreateUserSchema = z.object({
  userName: requiredString,
  firstName: requiredString,
  otherNames: optionalString,
  email: z.email("Enter a valid email address"),
  gender: z
    .string()
    .trim()
    .min(1, "This field is required")
    .refine((val) => ["MALE", "FEMALE"].includes(val), {
      error: "Select a valid gender",
    }),
  dateofBirth: z.coerce
    .date({ message: "Please enter a valid date" })
    .refine((val) => val <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),
  password: z
    .string()
    .trim()
    .min(8, "Password should be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain an uppercase letter, a lowercase letter, a number, and a special character",
    ),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number should be at least 10 characters")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .or(z.literal("")),

  role: z
    .string()
    .trim()
    .min(1, "This field is required")
    .refine((val) => ["ADMIN", "STUDENT", "INSTRUCTOR"].includes(val), {
      error: "Select a valid gender",
    }),

  organization: requiredString,
  accountType: z
    .string()
    .trim()
    .min(1, "This field is required")
    .refine((val) => ["INDIVIDUAL", "COPORATE"].includes(val), {
      error: "Select a valid account type",
    }),

  file: z
    .instanceof(File, { message: "Document is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, .webp and .pdf formats are supported.",
    ),
});

export type CreateUserSchemaType = z.input<typeof CreateUserSchema>;
