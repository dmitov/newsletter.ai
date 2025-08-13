import { authEnv } from "@repo/auth/env";
import { createEnv } from "@t3-oss/env-core";

export const env = createEnv({
  extends: [authEnv()],
  clientPrefix: "_UNUSED",
  server: {},
  client: {},
  runtimeEnv: {},
});
