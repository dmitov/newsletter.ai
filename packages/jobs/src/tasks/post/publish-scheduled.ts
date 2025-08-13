import { prisma } from "@repo/db/client";
import { logger, schedules, tasks } from "@trigger.dev/sdk/v3";
import type { broadcastNewPost } from "./broadcast";

export const publishScheduledPosts = schedules.task({
  id: "publish-scheduled-posts",
  cron: "*/15 * * * *",
  run: async (payload) => {
    const scheduledPosts = await prisma.post.findMany({
      where: {
        status: "scheduled",
        publishedAt: {
          lte: payload.timestamp,
        },
      },
      select: {
        id: true,
        title: true,
        publishedAt: true,
      },
    });

    if (scheduledPosts.length === 0) {
      logger.info("No scheduled posts to publish");
      return;
    }

    const updateResult = await prisma.post.updateMany({
      where: {
        id: {
          in: scheduledPosts.map((post) => post.id),
        },
      },
      data: {
        status: "published",
      },
    });

    await tasks.batchTrigger<typeof broadcastNewPost>(
      "broadcast-new-post",
      scheduledPosts.map((post) => ({
        payload: {
          postId: post.id,
        },
      })),
    );

    logger.info(`Successfully published ${updateResult.count} scheduled posts`);
  },
});
