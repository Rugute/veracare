import { z } from "zod";
export const RoleInputType = z.object({
  name: z.string().min(2, "Role name is required"),
  description: z.string().optional(),
});
export type RoleInputType = z.input<typeof RoleInputType>;