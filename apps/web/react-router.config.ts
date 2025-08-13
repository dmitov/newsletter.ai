import type { Config } from "@react-router/dev/config";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./app/env");

export default {
  ssr: true,
  routeDiscovery: {
    mode: "initial",
  },
  future: {
    unstable_middleware: true,
  },
} satisfies Config;
