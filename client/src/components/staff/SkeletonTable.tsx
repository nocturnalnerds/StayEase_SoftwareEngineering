import type React from "react";

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

const SkeletonTable: React.FC<SkeletonTableProps> = ({
  rows = 5,
  columns = 4,
  className = "",
}) => {
  return (
    <div
      className={`w-full overflow-hidden rounded-lg shadow-sm animate-pulse ${className}`}
    >
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>

      {/* Table header */}
      <div className="bg-gray-50 grid grid-cols-4 gap-4 p-4 border-b">
        {Array(columns)
          .fill(0)
          .map((_, i) => (
            <div key={`header-${i}`} className="h-4 bg-gray-200 rounded"></div>
          ))}
      </div>

      {/* Table rows */}
      {Array(rows)
        .fill(0)
        .map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`bg-white grid grid-cols-4 gap-4 p-4 ${
              rowIndex < rows - 1 ? "border-b" : ""
            }`}
          >
            {Array(columns)
              .fill(0)
              .map((_, colIndex) => (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className="h-4 bg-gray-200 rounded"
                ></div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default SkeletonTable;
