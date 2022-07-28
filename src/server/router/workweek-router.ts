import { createProtectedRouter } from "./protected-router";

export const workweekRouter = createProtectedRouter()
  .query("getSummary", {
    resolve({ ctx: { prisma } }) {
      return "hello";
    },
  })
  .query("getSecretMessage", {
    resolve({ ctx }) {
      return "He who asks a question is a fool for five minutes; he who does not ask a question remains a fool forever.";
    },
  });
