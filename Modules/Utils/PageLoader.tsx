import { Loader2Icon } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="flex min-h-full items-center justify-center">
      <Loader2Icon className="h-5 w-5 animate-spin text-muted-foreground" />
    </div>
  );
};

export default PageLoader;
