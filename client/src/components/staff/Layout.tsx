"use client";

import type React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Users,
  BookOpen,
  Brush,
  UtensilsCrossed,
  Package,
  BarChart3,
  CreditCard,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Bell,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  path: string;
  icon: React.ReactNode;
  subItems?: { title: string; path: string }[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      path: "/staff/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Settings",
      path: "/staff/settings",
      icon: <Settings className="h-5 w-5" />,
      subItems: [
        { title: "Room Settings", path: "/staff/settings/rooms" },
        { title: "Food & Beverage", path: "/staff/settings/food-beverage" },
        { title: "Banquet Settings", path: "/staff/settings/banquet" },
        { title: "Inventory Settings", path: "/staff/settings/inventory" },
        { title: "Payment Settings", path: "/staff/settings/payment" },
        { title: "Discount Rates", path: "/staff/settings/discount-rates" },
      ],
    },
    {
      title: "User Management",
      path: "/staff/user-management",
      icon: <Users className="h-5 w-5" />,
      subItems: [
        { title: "Staff", path: "/user-management/staff" },
        { title: "Customers", path: "/user-management/customers" },
        { title: "Roles", path: "/user-management/roles" },
      ],
    },
    {
      title: "Front Office",
      path: "/staff/front-office",
      icon: <BookOpen className="h-5 w-5" />,
      subItems: [
        { title: "Reservations", path: "/front-office/reservations" },
        { title: "Check-in", path: "/front-office/check-in" },
        { title: "Check-out", path: "/front-office/check-out" },
      ],
    },
    {
      title: "House Keeping",
      path: "/staff/house-keeping",
      icon: <Brush className="h-5 w-5" />,
      subItems: [
        { title: "Room Status", path: "/house-keeping/room-status" },
        {
          title: "Cleaning Schedule",
          path: "/house-keeping/cleaning-schedule",
        },
      ],
    },
    {
      title: "Restaurant",
      path: "/staff/restaurant",
      icon: <UtensilsCrossed className="h-5 w-5" />,
      subItems: [
        { title: "Orders", path: "/restaurant/orders" },
        { title: "Order History", path: "/restaurant/history" },
      ],
    },
    {
      title: "Inventory",
      path: "/staff/inventory",
      icon: <Package className="h-5 w-5" />,
      subItems: [
        { title: "Material Use", path: "/inventory/material-use" },
        { title: "Stock Management", path: "/inventory/stock" },
      ],
    },
    {
      title: "Reports",
      path: "/staff/reports",
      icon: <BarChart3 className="h-5 w-5" />,
      subItems: [
        { title: "Analytics", path: "/reports/analytics" },
        { title: "Export Reports", path: "/reports/export" },
      ],
    },
    {
      title: "Payment",
      path: "/staff/payment",
      icon: <CreditCard className="h-5 w-5" />,
      subItems: [
        { title: "Transactions", path: "/payment/transactions" },
        { title: "Invoices", path: "/payment/invoices" },
      ],
    },
  ];

  const isActive = (path: string) => {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <div className="flex h-screen bg-whitey">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          className="bg-white shadow-md border-secondary/20"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-secondary/10 shadow-sm md:relative",
              "flex flex-col"
            )}
          >
            <div className="p-4 border-b border-secondary/10 flex items-center justify-center">
              <h1 className="text-xl font-bold text-primary">
                Grand Hotel Admin
              </h1>
            </div>

            <nav className="flex-1 overflow-y-auto p-2">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.title}>
                    {item.subItems ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(item.title)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2 rounded-md text-sm",
                            isActive(item.path)
                              ? "bg-primary text-whitey"
                              : "text-blacky hover:bg-secondary/10 transition-colors"
                          )}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{item.icon}</span>
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              expandedItems.includes(item.title) &&
                                "transform rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {expandedItems.includes(item.title) && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-10 mt-1 space-y-1 overflow-hidden"
                            >
                              {item.subItems.map((subItem) => (
                                <li key={subItem.path}>
                                  <Link
                                    to={subItem.path}
                                    className={cn(
                                      "block px-3 py-2 rounded-md text-sm",
                                      isActive(subItem.path)
                                        ? "bg-secondary/20 text-primary font-medium"
                                        : "text-blacky hover:bg-secondary/10 transition-colors"
                                    )}
                                  >
                                    {subItem.title}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-md text-sm",
                          isActive(item.path)
                            ? "bg-primary text-whitey"
                            : "text-blacky hover:bg-secondary/10 transition-colors"
                        )}
                      >
                        <span className="mr-3">{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-4 border-t border-secondary/10">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blacky">John Smith</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-secondary/10 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 md:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-semibold text-primary">
                {navItems.find((item) => isActive(item.path))?.title ||
                  "Dashboard"}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-tertiary text-blacky">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <DropdownMenuItem key={i} className="py-2 cursor-pointer">
                        <div>
                          <p className="text-sm font-medium">
                            New reservation #{i}
                          </p>
                          <p className="text-xs text-gray-500">5 minutes ago</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
