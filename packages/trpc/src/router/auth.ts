import { publicProcedure, router } from "../trpc";

export const authRouter = router({
  register: publicProcedure.query(() => {
    return { message: "Hello World" };
  }),
});
