"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="text-sm leading-relaxed max-w-md">
            The page you’re looking for doesn’t exist or may have been moved. If
            you believe this is an error, please contact the administrator.
          </p>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => router.push("/")}>Go to home</Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
