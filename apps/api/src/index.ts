import express from "express";
import { appRouter, createContext } from "@gzlt/trpc";
import cors from "cors";
import * as trpcExpress from "@trpc/server/adapters/express";

const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ⚡`);
});
