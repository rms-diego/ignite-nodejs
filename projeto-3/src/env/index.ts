import "dotenv/config";

import { z as zod } from "zod";

const envSchema = zod.object({
  NODE_ENV: zod.enum(["dev", "test", "production"]).default("dev"),
  PORT: zod.coerce.number().default(3333),
  DATABASE_URL: zod.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("\n\nInvalid environment variables\n\n", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const env = _env.data;
