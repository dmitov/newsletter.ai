import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export function emailEnv() {
  return createEnv({
    clientPrefix: "_UNUSED",
    server: {
      RESEND_AUDIENCE_ID: z.string().min(1),
      RESEND_API_KEY: z.string().min(1),
    },
    client: {},
    runtimeEnv: {
      RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
    },
  });
}
