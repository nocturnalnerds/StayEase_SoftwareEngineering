import type React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonStatsProps {
  count?: number;
  className?: string;
}

const SkeletonStats: React.FC<SkeletonStatsProps> = ({
  count = 4,
  className,
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(
        count,
        4
      )} gap-4 ${className}`}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-[80px]" />
                    <Skeleton className="h-5 w-[60px]" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default SkeletonStats;
