import type React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonChartProps {
  height?: number;
  hasHeader?: boolean;
  className?: string;
}

const SkeletonChart: React.FC<SkeletonChartProps> = ({
  height = 300,
  hasHeader = true,
  className,
}) => {
  return (
    <Card className={className}>
      {hasHeader && (
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-[200px]" />
          <Skeleton className="h-4 w-[160px]" />
        </CardHeader>
      )}
      <CardContent>
        <Skeleton
          className={`w-full h-[${height}px] rounded-md`}
          style={{ height: `${height}px` }}
        />
      </CardContent>
    </Card>
  );
};

export default SkeletonChart;
