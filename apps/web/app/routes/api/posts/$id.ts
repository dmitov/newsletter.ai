import { prisma } from "@repo/db/client";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ params }: LoaderFunctionArgs) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({
          error: "Post ID is required",
          meta: {
            status: "error",
          },
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!post) {
      return new Response(
        JSON.stringify({
          error: "Post not found",
          meta: {
            status: "error",
          },
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        post,
        meta: {
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
    console.error("Error fetching post:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch post",
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
