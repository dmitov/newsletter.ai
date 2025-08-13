import { prisma } from "@repo/db/client";
import { Button } from "@repo/ui/components/button";
import { useAppForm } from "@repo/ui/components/form";
import { postUpdateSchema } from "@repo/validators/post";
import { mergeForm, revalidateLogic, useTransform } from "@tanstack/react-form";
import {
  createServerValidate,
  initialFormState,
  ServerValidateError,
} from "@tanstack/react-form/remix";
import { Form, redirect, useActionData, useLoaderData } from "react-router";
import { DashboardHeader } from "~/components/dashboard/header";
import { formOpts, PostForm } from "~/components/forms/post-form";
import { userContext } from "~/context";
import { authMiddleware } from "~/lib/auth-middleware";
import type { Route } from "./+types/$id";

import {tasks} from '@repo/jobs';
import type { broadcastNewPost } from "@repo/jobs/tasks/post/broadcast";

export function meta() {
  return [
    { title: "Posts - Newsletter Dashboard" },
    { name: "description", content: "Manage your newsletter posts" },
  ];
}

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  authMiddleware,
];

export async function loader({ params, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const postId = params.id;

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
      userId: user.user.id,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const defaultValues = {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    scheduling:
      post.status === "published"
        ? "publish-now"
        : post.status === "scheduled"
          ? "schedule-later"
          : "draft",
    scheduledAt: post.publishedAt
      ? new Date(post.publishedAt).toISOString().slice(0, 16)
      : "",
  };

  return { defaultValues };
}

const serverValidate = createServerValidate({
  ...formOpts,
  // @ts-expect-error - Find a way to optionally require field
  // without breaking the type system. @see publishedAt
  onServerValidate: postUpdateSchema,
});

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const postId = params.id;

  if (!postId) {
    throw new Error("Post ID is required");
  }

  try {
    const validatedData = await serverValidate(formData);
    const user = context.get(userContext);

    const existingPost = await prisma.post.findFirst({
      where: {
        id: postId,
        userId: user.user.id,
      },
    });

    if (!existingPost) {
      throw new Error("Post not found");
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
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
              ? existingPost.publishedAt ?? new Date()
              : null,
        updatedAt: new Date(),
      },
    });

    
    if (validatedData.scheduling === "publish-now" && updatedPost.publishedAt !== existingPost.publishedAt) {
      await tasks.trigger<typeof broadcastNewPost>(
        "broadcast-new-post",
        { postId: updatedPost.id },
      );
    }
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
    throw e;
  }

  return redirect("/dashboard/posts");
}

export default function PostsEdit() {
  const actionData = useActionData<typeof action>();
  const { defaultValues } = useLoaderData<typeof loader>();

  const form = useAppForm({
    ...formOpts,
    defaultValues: defaultValues,
    validators: {
      // @ts-expect-error - Find a way to optionally require field
      // without breaking the type system. @see publishedAt
      onDynamic: postUpdateSchema,
    },
    validationLogic: revalidateLogic(),
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, actionData ?? initialFormState),
      [actionData],
    ),
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <form.AppForm>
        <Form method="post" onSubmit={() => form.handleSubmit()}>
          <DashboardHeader
            title="Edit Post"
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
                      ? "Update and schedule"
                      : scheduling === "draft"
                        ? "Save draft"
                        : "Update published post"}
                </Button>
              )}
            </form.Subscribe>
          </DashboardHeader>

          <div className="container mx-auto py-8">
            <PostForm form={form} />
          </div>
        </Form>
      </form.AppForm>
    </div>
  );
}
