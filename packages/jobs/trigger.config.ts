import { defineConfig } from "@trigger.dev/sdk/v3";

import { jobsEnv } from "./env";

const env = jobsEnv();

export default defineConfig({
  project: env.TRIGGER_PROJECT_ID,
  runtime: "node",
  logLevel: "log",
  maxDuration: 60,
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["./src/tasks"],
});
