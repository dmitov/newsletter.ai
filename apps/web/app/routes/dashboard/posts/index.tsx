import { prisma } from "@repo/db/client";
import { Button } from "@repo/ui/components/button";
import { format } from "@repo/utils/date";
import { Plus } from "lucide-react";
import { Link, useLoaderData } from "react-router";
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

export async function loader() {
  const posts = await prisma.post.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });

  return { posts };
}

export default function PostsIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader
        title="Dashboard"
        backLink={{ title: "Back to website", href: "/" }}
      >
        <Link to="/dashboard/posts/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </Link>
      </DashboardHeader>

      <div className="p-6 container mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
          {posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Published
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-600">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : post.status === "draft"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {post.publishedAt ? format(post.publishedAt, "MMM d, yyyy") : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/dashboard/posts/${post.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/posts/${post.id}`}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                          >
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No posts yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get started by creating your first post.
              </p>
              <Link to="/dashboard/posts/create">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
