"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link, Outlet } from "react-router-dom";
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

interface LayoutProps {
  children?: React.ReactNode;
  loading?: boolean;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/staff", icon: Home },
  { name: "Front Office", href: "/staff/front-office", icon: Building2 },
  { name: "Staff Management", href: "/staff/user-management", icon: Users },
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

export default function Layout({ loading = false }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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
    } else if (href.startsWith("/staff/")) {
      return (
        location.pathname === href || location.pathname.startsWith(href + "/")
      );
    }

    return location.pathname === href;
  };

  const isParentActive = (item: NavigationItem) => {
    if (item.children) {
      return item.children.some((child) => isActive(child.href));
    }
    return isActive(item.href);
  };

  if (loading) {
    return (
      <div className="h-screen bg-gray-50 flex overflow-hidden">
        {/* Sidebar placeholder */}
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="h-16 border-b border-gray-200 flex items-center px-6">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="ml-2 w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Main content loading */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-16 bg-white border-b border-gray-200"></div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-500 animate-pulse">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile hamburger button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-6 left-6 z-50 lg:hidden w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Sidebar */}
      <div
        className={`
      w-64 bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0
      lg:relative lg:translate-x-0
      fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center">
            <Hotel className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">
              StayEase
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
                      <item.icon
                        className={`mr-3 h-5 w-5 ${
                          isParentActive(item) ? "text-white" : ""
                        }`}
                      />
                      {item.name}
                    </div>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown
                        className={`h-4 w-4 ${
                          isParentActive(item) ? "text-white" : ""
                        }`}
                      />
                    ) : (
                      <ChevronRight
                        className={`h-4 w-4 ${
                          isParentActive(item) ? "text-white" : ""
                        }`}
                      />
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
                              ? "bg-primary/10 text-white font-medium"
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
                      ? "bg-primary text-white!"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? "text-white" : ""
                    }`}
                  />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* User menu */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-full flex items-center justify-start p-2 rounded-md hover:bg-gray-100 cursor-pointer transition-colors">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/placeholder.svg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
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

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 w-full">
          <div className="w-full min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
