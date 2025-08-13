import { prisma } from "@repo/db/client";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { format } from "@repo/utils/date";
import { Edit, Eye, FileText, Plus } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { DashboardHeader } from "~/components/dashboard/header";
import { authenticated } from "~/lib/auth-server";
import type { Route } from "./+types";

export function meta() {
  return [
    { title: "Posts - Newsletter Dashboard" },
    { name: "description", content: "Manage your newsletter posts" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await authenticated(request.headers);

  const posts = await prisma.post.findMany({
    orderBy: {
      publishedAt: "desc",
    },
    where: {
      userId: user.user.id,
    },
  });

  return { posts };
}

export default function PostsIndex() {
  const { posts } = useLoaderData<typeof loader>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader
        title="Posts"
        backLink={{ title: "Back to website", href: "/" }}
      >
        <Link to="/dashboard/posts/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Button>
        </Link>
      </DashboardHeader>

      <div className="p-6 container mx-auto max-w-7xl">
        <Card>
          <CardHeader>
            <CardTitle>Your Posts</CardTitle>
            <CardDescription>
              Manage your posts and their status.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {posts.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-200 dark:border-slate-700">
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      Title
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300">
                      Published Date
                    </TableHead>
                    <TableHead className="font-semibold text-slate-700 dark:text-slate-300 text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow
                      key={post.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <TableCell className="py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 dark:text-slate-100">
                              {post.title}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(post.status)}`}
                        >
                          {post.status.charAt(0).toUpperCase() +
                            post.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-400">
                        {post.publishedAt
                          ? format(post.publishedAt, "MMM d, yyyy")
                          : "Not published"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/dashboard/posts/${post.id}/edit`}
                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                          >
                            <Edit className="w-4 h-4 mr-1.5" />
                            Edit
                          </Link>
                          {post.status === "published" && (
                            <Link
                              to={`/posts/${post.id}`}
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-1.5" />
                              View
                            </Link>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-16 px-6">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  No posts yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                  Start building your newsletter by creating your first post.
                  Share your thoughts, insights, and stories with your audience.
                </p>
                <Link to="/dashboard/posts/create">
                  <Button size="lg" className="px-8">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
