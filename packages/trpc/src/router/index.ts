import { publicProcedure, router } from "../trpc";
import { authRouter } from "./auth";

export const appRouter = router({
  auth: authRouter,
  healthz: publicProcedure.query(() => {
    return { status: "ok" };
  }),
});

export type AppRouter = typeof appRouter;
