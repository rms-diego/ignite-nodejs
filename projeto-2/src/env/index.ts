import "dotenv/config";
import { z as zod } from "zod";

const envSchema = zod.object({
  NODE_ENV: zod
    .enum(["development", "test", "production"])
    .default("production"),
  DATABASE_URL: zod.string(),
  PORT: zod.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Is missing key on '.env' file", _env.error.format());

  throw new Error("Is missing key on '.env' file");
}

export const env = _env.data;
