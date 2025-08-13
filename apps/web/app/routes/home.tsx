import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { format } from "@repo/utils/date";
import { Link } from "react-router";
import { Footer } from "~/components/sections/footer";
import { Header } from "~/components/sections/header";
import { NewsletterSignup } from "~/components/sections/newsletter-signup";
import { authClient } from "~/lib/auth-client";

export function meta() {
  return [
    { title: "Newsletter - Your Personal Newsletter" },
    {
      name: "description",
      content:
        "A beautiful personal newsletter platform for sharing your thoughts and stories.",
    },
  ];
}

export default function Home() {
  const session = authClient.useSession();

  const posts = [
    {
      id: "1",
      title: "Post 1",
      excerpt: "Excerpt 1",
      publishedAt: new Date(),
    },
    {
      id: "2",
      title: "Post 2",
      excerpt: "Excerpt 2",
      publishedAt: new Date(),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Share your stories with the world
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Create, publish, and share your thoughts with a simple newsletter
            platform. Build your audience and connect with readers who care
            about your content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {session.data ? (
              <Link to="/dashboard/posts">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <Link to="/sign-in">
                <Button size="lg">Start Writing Today</Button>
              </Link>
            )}
            <Link to="/posts">
              <Button variant="outline" size="lg">
                View our posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold text-gray-900 mb-4">
              Latest Posts
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover insights, tutorials, and stories from our community of
              writers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="block group"
              >
                <Card className="border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">5 min read</span>
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
                        {format(post.publishedAt, "MMM d, yyyy")}
                      </span>
                      <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700">
                        Read More →
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/posts">
              <Button variant="outline">See All Posts</Button>
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />

      <Footer />
    </div>
  );
}
