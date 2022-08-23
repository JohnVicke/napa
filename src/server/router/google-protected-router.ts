import * as trpc from "@trpc/server";
import { createProtectedRouter } from "./protected-router";
import { env } from "@/env/server.mjs";

const refreshToken = async (
  token: string,
): Promise<{
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
}> => {
  const url = `https://accounts.google.com/o/oauth2/token?${new URLSearchParams(
    {
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token,
    },
  )}`;

  const res = await fetch(url, {
    method: "POST",
  });

  const refreshedTokens = await res.json();
  if (!res.ok) throw refreshedTokens;

  console.log(refreshedTokens);

  return {
    accessToken: refreshedTokens.access_token,
    accessTokenExpires: Date.now() + refreshedTokens.expires_in,
    refreshToken: refreshedTokens.refresh_token ?? token,
  };
};

export function createProtectedGoogleRouter() {
  return createProtectedRouter().middleware(async ({ ctx, next }) => {
    const accountWithTokens = await ctx.prisma.account.findFirst({
      where: { userId: ctx.session.user.id },
      select: {
        access_token: true,
        refresh_token: true,
        expires_at: true,
      },
    });

    if (
      !accountWithTokens?.expires_at ||
      !accountWithTokens?.access_token ||
      !accountWithTokens?.refresh_token
    ) {
      throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
    }

    if (
      accountWithTokens?.expires_at &&
      Date.now() < accountWithTokens.expires_at
    ) {
      return next({
        ctx: {
          ...ctx,
          access_token: accountWithTokens.access_token,
        },
      });
    }

    const refreshedToken = await refreshToken(accountWithTokens.refresh_token);

    await ctx.prisma.account.update({
      where: {
        userId_provider: {
          userId: ctx.session.user.id,
          provider: "google",
        },
      },
      data: {
        access_token: refreshedToken.accessToken,
        refresh_token: refreshedToken.refreshToken,
        expires_at: refreshedToken.accessTokenExpires,
      },
    });

    return next({
      ctx: {
        ...ctx,
        access_token: refreshedToken.accessToken,
      },
    });
  });
}
