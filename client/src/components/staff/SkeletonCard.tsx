import type React from "react";

interface SkeletonCardProps {
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 animate-pulse ${className}`}
    >
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};

export default SkeletonCard;
