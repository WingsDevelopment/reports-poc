import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a QueryClient with global error handlers
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (e) => {
      console.error(
        "QueryCache(Global error handler): Error while running query",
        { e }
      );
    },
  }),
  defaultOptions: {
    mutations: {
      // Handle mutation errors globally
      onError: (error: unknown) => {
        console.error("Mutation Error:", error);
        const message =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        alert(`Error: ${message}`);
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
