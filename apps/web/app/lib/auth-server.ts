import { auth, type Session } from "@repo/auth";
import { redirect } from "react-router";

export const authenticated = async (headers: Headers) => {
  const user = (await auth.api.getSession({
    headers: headers,
  })) as unknown as Session;

  if (!user) {
    throw redirect("/sign-in");
  }

  return user;
};
