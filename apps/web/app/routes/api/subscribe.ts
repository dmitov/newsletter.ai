import { resend } from "@repo/email/client";
import { emailEnv } from "@repo/email/env";
import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  try {
    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: emailEnv().RESEND_AUDIENCE_ID,
    });

    return new Response(
      JSON.stringify({ message: "Subscribed to newsletter", status: "success" }),
      {
        status: 200,
      },
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to subscribe to newsletter", status: "error" }),
      {
        status: 500,
      },
    );
  }
}
