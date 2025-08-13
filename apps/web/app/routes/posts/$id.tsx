import {
  Card,
  CardContent,
} from "@repo/ui/components/card";
import { format } from "@repo/utils/date";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { Footer } from "~/components/sections/footer";
import { Header } from "~/components/sections/header";
import { NewsletterSignup } from "~/components/sections/newsletter-signup";

export function meta() {
  return [
    { title: "Post - Newsletter" },
    { name: "description", content: "Read our latest article" },
  ];
}

export async function loader({ params }: { params: { id: string } }) {
  return {
    post: {
      id: params.id,
      title: "Post 1",
      content: "Content 1",
      publishedAt: new Date(),
      user: {
        id: "1",
        name: "John Doe",
      },
    },
  };
}

export default function PostView() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-6 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/posts"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Articles
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{format(post.publishedAt, "MMM d, yyyy")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.user.name}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
          </div>

          {/* Article Content */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-800 leading-relaxed text-lg"
                  style={{ 
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit'
                  }}
                >
                  {post.content}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.user.name}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-500">
                <p>Published on {format(post.publishedAt, "MMM d, yyyy")}</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            More Articles
          </h2>
          <div className="text-center">
            <Link
              to="/posts"
              className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              Browse All Articles
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <NewsletterSignup />

      <Footer />
    </div>
  );
}
