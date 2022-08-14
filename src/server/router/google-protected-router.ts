import * as trpc from "@trpc/server";
import { createProtectedRouter } from "./protected-router";

export function createProtectedGoogleRouter() {
  return createProtectedRouter().middleware(async ({ ctx, next }) => {
    const accountWithTokens = await ctx.prisma.account.findFirst({
      where: { userId: ctx.session.user.id },
      select: {
        access_token: true,
        refresh_token: true,
        refresh_token_expires_in: true,
      },
    });

    if (!accountWithTokens) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }

    if (!accountWithTokens.access_token) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }

    const { access_token } = accountWithTokens;

    return next({
      ctx: {
        ...ctx,
        access_token,
      },
    });
  });
}
