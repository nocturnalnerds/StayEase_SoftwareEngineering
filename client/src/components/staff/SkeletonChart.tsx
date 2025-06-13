import type React from "react";

interface SkeletonChartProps {
  height?: number;
  className?: string;
}

const SkeletonChart: React.FC<SkeletonChartProps> = ({
  height = 300,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 animate-pulse ${className}`}
    >
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div
        className="flex items-end space-x-2"
        style={{ height: `${height}px` }}
      >
        {Array(12)
          .fill(0)
          .map((_, i) => {
            const randomHeight = 30 + Math.random() * 70;
            return (
              <div
                key={`bar-${i}`}
                className="bg-gray-200 rounded-t w-full"
                style={{ height: `${randomHeight}%` }}
              ></div>
            );
          })}
      </div>
      <div className="h-4 bg-gray-200 rounded w-full mt-4"></div>
    </div>
  );
};

export default SkeletonChart;
