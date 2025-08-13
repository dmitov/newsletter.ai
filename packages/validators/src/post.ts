import { isValid } from "@repo/utils/date";
import { z } from "zod";

export const postCreateSchema = z
  .object({
    title: z
      .string()
      .min(5, "Title is required and must be at least 5 characters"),
    excerpt: z
      .string()
      .min(1, "Excerpt is required and must be at least 1 characters"),
    content: z
      .string()
      .min(10, "Content is required and must be at least 10 character"),
    scheduling: z.enum(["draft", "publish-now", "schedule-later"]),
    scheduledAt: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.scheduling !== "schedule-later") {
      return;
    }

    if (!data.scheduledAt || !isValid(new Date(data.scheduledAt))) {
      ctx.addIssue({
        path: ["scheduledAt"],
        code: "custom",
        message: "Scheduled date is required",
      });
    }
  });

export const postUpdateSchema = postCreateSchema;

export type PostCreate = z.infer<typeof postCreateSchema>;
export type PostUpdate = z.infer<typeof postUpdateSchema>;
