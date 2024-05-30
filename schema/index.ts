import { z } from "zod";

// TODO: Coba refactor schema, index, sama type dari suatu class aja supaya gak terpisah-pisah
export const addContainerSchema = z.object({
  name: z.string().min(1, "Container name is required"),
  image: z.string().min(1, "Image is required"),
  limit: z.object({
    cpus: z.coerce.number().min(0, "CPUs must be a non-negative number"),
    memory: z.coerce.number().min(0, "Memory must be a non-negative number"),
  }),
  replica: z.coerce.number().min(1, "There must be at least one replica"),
  endpoint: z.array(
    z.object({
      target_port: z.coerce
        .number()
        .min(0, "Target port must be a non-negative number"),
      published_port: z.coerce
        .number()
        .min(0, "Published port must be a non-negative number"),
      protocol: z.enum(["tcp", "udp"]).default("tcp"), // Assuming "tcp" and "udp" are the valid protocols
    })
  ),
});

export const scheduleContainerRequestSchema = z.object({
  action: z.string(),
  scheduled_time: z.coerce
    .number()
    .min(0, "Scheduled time must be a non-negative number"),
  time_format: z.enum(["SECOND", "MINUTE", "HOUR", "DAY"]),
  container: addContainerSchema,
});

export const scheduleSmallContainerRequestSchema = z.object({
  action: z.enum(["START", "STOP", "TERMINATE"]),
  scheduled_time: z.coerce
    .number()
    .min(0, "Scheduled time must be a non-negative number"),
  time_format: z.enum(["SECOND", "MINUTE", "HOUR", "DAY"]),
});
