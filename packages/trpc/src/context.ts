import { prisma } from "@gzlt/db";
import { inferAsyncReturnType } from "@trpc/server";
import { type CreateExpressContextOptions } from "@trpc/server/adapters/express";

type CreateContextOptions = Record<string, never>;

export const createContextInner = (options: CreateContextOptions) => {
  return {
    prisma,
  };
};

export const createContext = async (options: CreateExpressContextOptions) => {
  return createContextInner({});
};

export type Context = inferAsyncReturnType<typeof createContext>;
