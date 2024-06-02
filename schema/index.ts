import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["application/gzip"];

export const fileSchema = z
  .any()
  .transform((files: FileList) => Array.from(files))
  .refine((files) => files.length !== 0, "File is required.") // if no file files?.length === 0, if file files?.length === 1
  .refine(
    (files: File[]) =>
      files.every((file) => ACCEPTED_FILE_TYPES.includes(file?.type)),
    "Only .tar.gz files are accepted."
  );

// TODO: Coba refactor schema, index, sama type dari suatu class aja supaya gak terpisah-pisah
export const addContainerSchema = z
  .object({
    name: z.string().min(1, "Container name is required"),
    image: z.string().min(1, "Image is required"),
    limit: z.object({
      cpus: z.coerce.number().min(0, "CPUs must be a non-negative number"),
      memory: z.coerce.number().min(0, "Memory must be a non-negative number"),
    }),
    env: z
      .string()
      .optional()
      .refine((val) => {
        if (!val || val === "") {
          return true;
        }

        try {
          const envs = val.split(",");
          for (const env of envs) {
            if (!env.includes("=") || env.includes(" ")) {
              return false;
            }
          }
          return true;
        } catch {
          return false;
        }
      }, "Invalid environment variables")
      .transform((val) => {
        if (!val || val === "") {
          return undefined;
        }
        const envs = val.split(",");

        return envs;
      }),
    volumes: z
      .string()
      .optional()
      .refine((val) => {
        if (!val || val === "") {
          return true;
        }

        try {
          const volumes = val.split(",");
          for (const volume of volumes) {
            if (!volume.includes("/") || volume.includes(" ")) {
              return false;
            }
          }
          return true;
        } catch {
          return false;
        }
      }, "Invalid volumes")
      .transform((val) => {
        if (!val || val === "") {
          return undefined;
        }
        const volumes = val.split(",");

        return volumes;
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
  })
  .transform((val) => {
    if (!val.env) {
      delete val.env;
    }
    if (!val.volumes) {
      delete val.volumes;
    }
    return val;
  });

export const uploadContainerSchema = z.object({
  name: z.string().min(1, "Container name is required"),
  image: fileSchema,
  limit: z.object({
    cpus: z.coerce.number().min(0, "CPUs must be a non-negative number"),
    memory: z.coerce.number().min(0, "Memory must be a non-negative number"),
  }),
  env: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === "") {
        return true;
      }

      try {
        const envs = val.split(",");
        for (const env of envs) {
          if (!env.includes("=") || env.includes(" ")) {
            return false;
          }
        }
        return true;
      } catch {
        return false;
      }
    }, "Invalid environment variables")
    .transform((val) => {
      if (!val || val === "") {
        return undefined;
      }
      const envs = val.split(",");

      return envs;
    }),
  volumes: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val === "") {
        return true;
      }

      try {
        const volumes = val.split(",");
        for (const volume of volumes) {
          if (!volume.includes("/") || volume.includes(" ")) {
            return false;
          }
        }
        return true;
      } catch {
        return false;
      }
    }, "Invalid volumes")
    .transform((val) => {
      if (!val || val === "") {
        return undefined;
      }
      const volumes = val.split(",");

      return volumes;
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

export const initDepositSchema = z.object({
  amount: z.coerce.number().gt(0, "U deposit negative money?"),
});
