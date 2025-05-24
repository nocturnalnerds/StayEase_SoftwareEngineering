"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import {
  BarChart3,
  Building2,
  Calendar,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  Home,
  Hotel,
  Package,
  Settings,
  UtensilsCrossed,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageLoader } from "@/components/ui/loader";

interface StaffLayoutProps {
  children?: React.ReactNode;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/staff/dashboard", icon: Home },
  { name: "Front Office", href: "/staff/front-office", icon: Building2 },
  { name: "User Management", href: "/staff/user-management", icon: Users },
  { name: "Housekeeping", href: "/staff/house-keeping", icon: Calendar },
  { name: "Restaurant", href: "/staff/restaurant", icon: UtensilsCrossed },
  { name: "Inventory", href: "/staff/inventory", icon: Package },
  { name: "Reports", href: "/staff/reports", icon: BarChart3 },
  { name: "Payment", href: "/staff/payment", icon: CreditCard },
  {
    name: "Settings",
    href: "/staff/settings",
    icon: Settings,
    children: [
      { name: "General", href: "/staff/settings", icon: Settings },
      { name: "Rooms", href: "/staff/settings/rooms", icon: Hotel },
      {
        name: "Food & Beverage",
        href: "/staff/settings/food-beverage",
        icon: UtensilsCrossed,
      },
      {
        name: "Discount Rates",
        href: "/staff/settings/discount-rates",
        icon: FileText,
      },
    ],
  },
];

export default function StaffLayout({ children }: StaffLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle route changes with loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Short loading time for smooth transitions

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Auto-expand settings if we're on a settings page
  useEffect(() => {
    if (location.pathname.startsWith("/staff/settings")) {
      setExpandedItems((prev) =>
        prev.includes("Settings") ? prev : [...prev, "Settings"]
      );
    }
  }, [location.pathname]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href: string) => {
    if (href === "/staff/settings") {
      return location.pathname === "/staff/settings";
    }
    return location.pathname === href;
  };

  const isParentActive = (item: NavigationItem) => {
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return isActive(item.href);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <Hotel className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Hotel MS
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors
                        ${
                          isParentActive(item)
                            ? "bg-primary text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </div>
                      {expandedItems.includes(item.name) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                    {expandedItems.includes(item.name) && (
                      <div className="mt-1 ml-6 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={`
                              block px-3 py-2 text-sm rounded-md transition-colors
                              ${
                                isActive(child.href)
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "text-gray-600 hover:bg-gray-100"
                              }
                            `}
                            onClick={() => setSidebarOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`
                      flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                      ${
                        isActive(item.href)
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User menu */}
          <div className="p-4 border-t border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1" />
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {loading ? <PageLoader /> : <>{children || <Outlet />}</>}
        </main>
      </div>
    </div>
  );
}
