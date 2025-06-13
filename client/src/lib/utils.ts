import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function calculateDateDifference(
  startDate: string,
  endDate: string
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Room status colors
    Available: "bg-green-100 text-green-800",
    Occupied: "bg-blue-100 text-blue-800",
    Cleaning: "bg-yellow-100 text-yellow-800",
    Maintenance: "bg-orange-100 text-orange-800",
    "Out of Order": "bg-red-100 text-red-800",
    Reserved: "bg-purple-100 text-purple-800",

    // Reservation status colors
    Confirmed: "bg-blue-100 text-blue-800",
    "Checked-in": "bg-green-100 text-green-800",
    "Checked-out": "bg-gray-100 text-gray-800",
    "No-show": "bg-red-100 text-red-800",
    Cancelled: "bg-red-100 text-red-800",
    Draft: "bg-yellow-100 text-yellow-800",

    // Payment status colors
    Pending: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
    Refunded: "bg-purple-100 text-purple-800",

    // Food order status colors
    Preparing: "bg-yellow-100 text-yellow-800",
    Delivered: "bg-green-100 text-green-800",

    // Staff status colors
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
    "On Leave": "bg-blue-100 text-blue-800",

    // Customer status colors
    Blacklisted: "bg-red-100 text-red-800",
  };

  return statusColors[status] || "bg-gray-100 text-gray-800";
}

export function getPriorityColor(priority: "low" | "medium" | "high")  {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
