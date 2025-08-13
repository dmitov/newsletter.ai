import { Button } from "@repo/ui/components/button";
import { DashboardHeader } from "~/components/dashboard/header";
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

export default function PostsCreate() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader
        title="Create post"
        backLink={{ title: "Back to posts", href: "/dashboard/posts" }}
      >
        <Button>Create Post</Button>
      </DashboardHeader>

      <div className="max-w-4xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold">Create Post form</h1>
      </div>
    </div>
  );
}
