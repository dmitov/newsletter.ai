import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export function dbEnv() {
  return createEnv({
    clientPrefix: "_UNUSED",
    server: {
      DATABASE_URL: z.string().min(1),
    },
    client: {},
    runtimeEnv: {},
  });
}
