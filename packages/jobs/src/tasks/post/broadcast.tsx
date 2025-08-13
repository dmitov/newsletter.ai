import { prisma } from "@repo/db/client";
import { resend } from "@repo/email/client";
import NewPostEmail from "@repo/email/emails/new-post";
import { emailEnv } from "@repo/email/env";
import { render } from "@repo/email/render";
import { getAppUrl } from "@repo/utils/envs";
import { logger, schemaTask } from "@trigger.dev/sdk/v3";
import { z } from "zod/v3";

export const broadcastNewPost = schemaTask({
  id: "broadcast-new-post",
  schema: z.object({
    postId: z.string().uuid(),
  }),
  maxDuration: 30,
  queue: {
    concurrencyLimit: 10,
  },
  run: async ({ postId }) => {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    if (!post) {
      logger.error("Post not found");
      throw new Error("Post not found");
    }

    const broadcast = await resend.broadcasts.create({
      audienceId: emailEnv().RESEND_AUDIENCE_ID,
      from: "Newsletter.ai <newsletter@guest0.com>",
      subject: `New post: ${post.title}`,
      html: render(
        <NewPostEmail
          post={{
            id: post.id,
            title: post.title,
            url: `${getAppUrl()}/posts/${post.id}`,
            author: post.user.name,
          }}
        />,
      ),
    });

    if (!broadcast.data) {
      logger.error("New post email failed to send", {
        postId,
        error: "Broadcast not created",
        broadcast,
      });
      throw new Error("New post email failed to send");
    }

    const response = await resend.broadcasts.send(broadcast.data.id);

    if (response.error) {
      logger.error("New post email failed to send", {
        postId,
        error: response.error,
      });

      throw new Error("New post email failed to send");
    }

    logger.info("New post email sent");
  },
});
