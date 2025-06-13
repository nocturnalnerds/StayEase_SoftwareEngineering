import type React from "react";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusColor = getStatusColor(status);

  return (
    <Badge
      variant="outline"
      className={`${statusColor} border-none font-medium ${className}`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
