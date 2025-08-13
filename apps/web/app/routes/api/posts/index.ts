import { prisma } from "@repo/db/client";

export async function loader() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: "published",
        publishedAt: {
          lte: new Date(),
        },
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    const postsWithLinks = posts.map((post) => ({
      ...post,
      links: {
        self: `/api/posts/${post.id}`,
      },
    }));

    return new Response(
      JSON.stringify({
        posts: postsWithLinks,
        meta: {
          total: posts.length,
          status: "success",
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch published posts",
        meta: {
          status: "error",
        },
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
