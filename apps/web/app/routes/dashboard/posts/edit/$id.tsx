import { Button } from "@repo/ui/components/button";
import { DashboardHeader } from "~/components/dashboard/header";
import { authMiddleware } from "~/lib/auth-middleware";
import type { Route } from "./+types/$id";

export function meta() {
  return [
    { title: "Posts - Newsletter Dashboard" },
    { name: "description", content: "Manage your newsletter posts" },
  ];
}

export const unstable_middleware: Route.unstable_MiddlewareFunction[] = [
  authMiddleware,
];

export default function PostsEdit() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader
        title="Edit post"
        backLink={{ title: "Back to posts", href: "/dashboard/posts" }}
      >
        <Button>Update Post</Button>
      </DashboardHeader>

      <div className="max-w-4xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold">Edit Post form</h1>
      </div>
    </div>
  );
}
