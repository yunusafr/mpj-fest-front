import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../query/queryClient";

export default function AppProvider({
  children,
}) {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      {children}
    </QueryClientProvider>
  );
}