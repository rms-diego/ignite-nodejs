import "dotenv/config";

import { z as zod } from "zod";

const envSchema = zod.object({
  NODE_ENV: zod
    .enum(["development", "test", "production"])
    .default("production"),
  DATABASE_URL: zod.string(),
  PORT: zod.string().default("3333"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  const keyMissing = _env.error.errors[0].path[0];
  const reason = _env.error.errors[0].message;

  const errorMessage = `Is missing key '${keyMissing}' on '.env' file\n${reason}\n\n`;

  throw new Error(errorMessage);
}

export const env = _env.data;
