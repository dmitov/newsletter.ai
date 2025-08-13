import { Button } from "@repo/ui/components/button";
import {  Plus } from "lucide-react";
import { Link } from "react-router";
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


export default function PostsIndex() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader
        title="Dashboard"
        backLink={{ title: "Back to website", href: "/" }}
      >
        <Link to="/dashboard/posts/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </DashboardHeader>

      <div className="max-w-4xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold">Posts</h1>
      </div>
    </div>
  );
}
