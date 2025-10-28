import { z } from "zod";

// Define the schema for creating a resource
export const createResourceSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  description: z
    .string()
    .max(255, { message: "Description cannot exceed 255 characters" })
    .optional(),
});

// Define the schema for updating a resource (partial)
export const updateResourceSchema = createResourceSchema.partial();

// Export inferred types for controllers
export type CreateResourceInput = z.infer<typeof createResourceSchema>;
export type UpdateResourceInput = z.infer<typeof updateResourceSchema>;
