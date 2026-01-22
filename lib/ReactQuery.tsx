"use client";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

export const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        closeButton
        richColors
        position="bottom-left"
        icons={{
          success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          error: <XCircle className="h-5 w-5 text-red-600" />,
          info: <Info className="h-5 w-5" />,
          warning: <AlertCircle className="h-5 w-5" />,
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
