import { prisma } from "@repo/db/client";
import { Button } from "@repo/ui/components/button";
import { useAppForm } from "@repo/ui/components/form";
import { postCreateSchema } from "@repo/validators/post";
import { mergeForm, revalidateLogic, useTransform } from "@tanstack/react-form";
import {
  createServerValidate,
  initialFormState,
  ServerValidateError,
} from "@tanstack/react-form/remix";
import { Form, redirect, useActionData } from "react-router";
import { DashboardHeader } from "~/components/dashboard/header";
import { formOpts, PostForm } from "~/components/forms/post-form";
import { userContext } from "~/context";
import { authMiddleware } from "~/lib/auth-middleware";
import type { Route } from "./+types";

export function meta() {
  return [
    { title: "Posts - Newsletter Dashboard" },
    { name: "description", content: "Manage your newsletter posts" },
  ];
}

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  authMiddleware,
];

const serverValidate = createServerValidate({
  ...formOpts,
  // @ts-expect-error - Find a way to optionally require field
  // without breaking the type system. @see publishedAt
  onServerValidate: postCreateSchema,
});

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();

  try {
    const validatedData = await serverValidate(formData);

    const user = context.get(userContext);

    await prisma.post.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        excerpt: validatedData.excerpt,
        status:
          validatedData.scheduling === "schedule-later"
            ? "scheduled"
            : validatedData.scheduling === "publish-now"
              ? "published"
              : "draft",
        publishedAt:
          validatedData.scheduling === "schedule-later"
            ? new Date(validatedData.scheduledAt || "")
            : validatedData.scheduling === "publish-now"
              ? new Date()
              : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.user.id,
      },
    });
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
    throw e;
  }

  return redirect("/dashboard/posts");
}

export default function PostsCreate() {
  const actionData = useActionData<typeof action>();
  const form = useAppForm({
    ...formOpts,
    defaultValues: formOpts.defaultValues,
    validators: {
      // @ts-expect-error - Find a way to optionally require field
      // without breaking the type system. @see publishedAt
      onDynamic: postCreateSchema,
    },
    validationLogic: revalidateLogic(),
    transform: useTransform(
      (baseForm) =>mergeForm(baseForm, actionData ?? initialFormState),
      [actionData],
    ),
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <form.AppForm>
        <Form method="post" onSubmit={() => form.handleSubmit()}>
          <DashboardHeader
            title="Create New Post"
            backLink={{ title: "Back to Posts", href: "/dashboard/posts" }}
          >
            <form.Subscribe
              selector={(state) => ({
                scheduling: state.values.scheduling ?? initialFormState.values.scheduling,
                isSubmitting: state.isSubmitting,
                canSubmit: state.canSubmit,
              })}
            >
              {({ scheduling, isSubmitting, canSubmit }) => (
                <Button
                  onClick={() => form.handleSubmit()}
                  disabled={!canSubmit}
                >
                  {isSubmitting
                    ? "Working..."
                    : scheduling === "schedule-later"
                      ? "Schedule"
                      : scheduling === "draft"
                        ? "Save draft"
                        : "Publish"}
                </Button>
              )}
            </form.Subscribe>
          </DashboardHeader>

          <div className="p-6 container mx-auto">
            <PostForm form={form} />
          </div>
        </Form>
      </form.AppForm>
    </div>
  );
}
