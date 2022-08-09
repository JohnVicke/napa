import { createRouter } from "./context";
import superjson from "superjson";

import { workweekRouter } from "./subroutes/workweek-router";
import { workDayRouter } from "./subroutes/workday-router";
import { timerRouter } from "./subroutes/timer-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("workweek.", workweekRouter)
  .merge("timer.", timerRouter)
  .merge("workday.", workDayRouter);

export type AppRouter = typeof appRouter;
