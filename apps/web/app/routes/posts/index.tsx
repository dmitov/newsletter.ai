import { prisma } from "@repo/db/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { format } from "@repo/utils/date";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { Footer } from "~/components/sections/footer";
import { Header } from "~/components/sections/header";
import { NewsletterSignup } from "~/components/sections/newsletter-signup";

export function meta() {
  return [
    { title: "Posts - Newsletter" },
    { name: "description", content: "Read our latest posts and insights" },
  ];
}

export async function loader() {
  const posts = await prisma.post.findMany({
    where: {
      publishedAt: {
        lte: new Date(),
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      user: true,
    },
  });

  return { posts };
}

export default function PostsIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Latest Posts
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Discover insights, tutorials, and stories from our community of
            writers
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            <>
              <div className="flex flex-col space-y-6">
                {posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/posts/${post.id}`}
                    className="block group"
                  >
                    <Card className="border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-3">
                          {post.publishedAt && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {format(post.publishedAt, "MMM d, yyyy")}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>5 min read</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            By {post.user.name}
                          </span>
                          <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700">
                            Read More{" "}
                            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-600 mb-4">
                  {posts.length} posts{posts.length !== 1 ? "s" : ""} published
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600">
                  Check back soon for new content!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <NewsletterSignup />

      <Footer />
    </div>
  );
}
