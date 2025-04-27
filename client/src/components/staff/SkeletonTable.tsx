import type React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonTableProps {
  rowCount?: number;
  columnCount?: number;
  hasHeader?: boolean;
  className?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rowCount = 5,
  columnCount = 4,
  hasHeader = true,
  className,
}) => {
  return (
    <Card className={className}>
      {hasHeader && (
        <CardHeader className="pb-0">
          <Skeleton className="h-6 w-[200px]" />
        </CardHeader>
      )}
      <CardContent className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {Array(columnCount)
                  .fill(0)
                  .map((_, index) => (
                    <th key={index} className="p-4">
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array(rowCount)
                .fill(0)
                .map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b">
                    {Array(columnCount)
                      .fill(0)
                      .map((_, colIndex) => (
                        <td key={colIndex} className="p-4">
                          <Skeleton className="h-4 w-full max-w-[150px]" />
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonTable;
