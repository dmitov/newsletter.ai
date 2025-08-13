import { auth, type Session } from "@repo/auth";
import { redirect, type unstable_RouterContextProvider } from "react-router";
import { userContext } from "~/context";

export async function authMiddleware({
  request,
  context,
}: {
  request: Request;
  context: Readonly<unstable_RouterContextProvider>;
}) {
  const user = (await auth.api.getSession({
    headers: request.headers,
  })) as unknown as Session;

  if (!user) {
    throw redirect("/sign-in");
  }
  context.set(userContext, user);
}
