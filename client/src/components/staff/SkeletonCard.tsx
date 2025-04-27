import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonCardProps {
  hasImage?: boolean;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ hasImage, className }) => {
  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="flex flex-col gap-4 p-4">
        {hasImage && <Skeleton className="h-32 w-full rounded-md" />}
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
