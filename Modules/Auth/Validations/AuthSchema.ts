import z from "zod";

const AuthBaseObject = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, "Password should be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain an uppercase letter, a lowercase letter, a number, and a special character",
    ),
  confirmPassword: z.string().trim().min(1, "Please confirm your password"),
  phoneNumber: z
    .string()
    .trim()
    .min(10, "Phone number should be at least 10 characters")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  dateOfBirth: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date < new Date();
  }, "Please enter a valid date of birth in the past"),
});

export const SignInSchema = AuthBaseObject.pick({
  email: true,
  password: true,
});

export const SignUpSchema = AuthBaseObject.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
export type SignInSchemaType = z.infer<typeof SignInSchema>;
