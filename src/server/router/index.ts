import { createRouter } from "./context";
import superjson from "superjson";

import { workweekRouter } from "./subroutes/workweek-router";
import { workDayRouter } from "./subroutes/workday-router";
import { timerRouter } from "./subroutes/timer-router";
import { timeEntryRouter } from "./subroutes/time-entry-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("workweek.", workweekRouter)
  .merge("timer.", timerRouter)
  .merge("workday.", workDayRouter)
  .merge("timeEntry.", timeEntryRouter);

export type AppRouter = typeof appRouter;
