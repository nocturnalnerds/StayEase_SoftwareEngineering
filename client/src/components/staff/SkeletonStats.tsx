import type React from "react";

interface SkeletonStatsProps {
  count?: number;
  className?: string;
}

const SkeletonStats: React.FC<SkeletonStatsProps> = ({
  count = 4,
  className = "",
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
    >
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={`stat-${i}`}
            className="bg-white rounded-lg shadow-sm p-4 animate-pulse"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
    </div>
  );
};

export default SkeletonStats;
