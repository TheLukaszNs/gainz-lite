import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@gzlt/trpc";

export const trpc = createTRPCReact<AppRouter>();

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
import Constants from "expo-constants";
const getBaseUrl = () => {
  /**
   * Gets the IP address of your host-machine. If it cannot automatically find it,
   * you'll have to manually set it. NOTE: Port 3000 should work for most but confirm
   * you don't have anything else running on it, or you'd have to change it.
   */
  const localhost = Constants.manifest?.debuggerHost?.split(":")[0];
  console.log("localhost", localhost);
  if (!localhost)
    throw new Error("failed to get localhost, configure it manually");
  return `http://${localhost}:3000`;
};

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { transformer } from "@gzlt/trpc/transformer";

export const TRPCProvider = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      transformer,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
