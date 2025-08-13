import { prisma } from "@repo/db/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { authEnv } from "../env";

const env = authEnv();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: env.APP_URL,
  secret: env.AUTH_SECRET,
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      redirectURI: `${env.APP_URL}/api/auth/callback/github`,
    },
  },
});

export type Auth = typeof auth;
export type Session = Auth["$Infer"]["Session"];
