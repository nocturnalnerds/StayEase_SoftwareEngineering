import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export function Loader({ className, size = "medium" }: LoaderProps) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader size="large" />
        <p className="mt-4 text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
