import { dbEnv } from "@repo/db/env";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export function jobsEnv() {
  return createEnv({
    extends: [dbEnv()],
    clientPrefix: "_UNUSED",
    server: {
      TRIGGER_PROJECT_ID: z.string().min(1),
    },
    client: {},
    runtimeEnv: {
      TRIGGER_PROJECT_ID: process.env.TRIGGER_PROJECT_ID,
    },
  });
}
