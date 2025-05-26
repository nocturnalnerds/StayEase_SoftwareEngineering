"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  Home,
  Utensils,
  Package,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const dashboardStats = [
    {
      title: "Total Guests",
      value: "1,234",
      description: "+20.1% from last month",
      icon: Users,
      trend: "up",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Revenue",
      value: "$45,231",
      description: "+15.3% from last month",
      icon: DollarSign,
      trend: "up",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Occupancy Rate",
      value: "85%",
      description: "+5.2% from last month",
      icon: Home,
      trend: "up",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Avg. Stay Duration",
      value: "3.2 days",
      description: "-2.1% from last month",
      icon: Clock,
      trend: "down",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "booking",
      message: "New booking for Room 205",
      time: "2 minutes ago",
      icon: Home,
    },
    {
      id: 2,
      type: "order",
      message: "Restaurant order from Table 8",
      time: "5 minutes ago",
      icon: Utensils,
    },
    {
      id: 3,
      type: "maintenance",
      message: "Maintenance request for Room 301",
      time: "10 minutes ago",
      icon: AlertTriangle,
    },
    {
      id: 4,
      type: "inventory",
      message: "Low stock alert: Bath towels",
      time: "15 minutes ago",
      icon: Package,
    },
    {
      id: 5,
      type: "checkout",
      message: "Guest checked out from Room 102",
      time: "20 minutes ago",
      icon: Users,
    },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#213555]">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here's what's happening at your hotel today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 hover:bg-gray-50"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Filter by Date
            </Button>
            <Button size="sm" className="bg-[#213555] hover:bg-[#4F709C]">
              <Clock className="mr-2 h-4 w-4" />
              Last 30 Days
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.map((stat, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${stat.color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium opacity-90">
                  {stat.title}
                </CardTitle>
                <div className="rounded-full p-2 bg-white/20">
                  <stat.icon className="h-5 w-5 opacity-80" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs opacity-80 mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <TabsList className="bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="revenue"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  Revenue
                </TabsTrigger>
                <TabsTrigger
                  value="occupancy"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  Occupancy
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-[#213555]">
                      Revenue Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[350px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-16 w-16 mx-auto mb-4 text-[#4F709C]" />
                        <p className="text-lg font-medium text-[#213555]">
                          Revenue Chart
                        </p>
                        <p className="text-sm">
                          Revenue data visualization will be displayed here
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-3 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-[#213555]">
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#4F709C]/10 flex items-center justify-center flex-shrink-0">
                            <activity.icon className="h-4 w-4 text-[#4F709C]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#213555] leading-tight">
                              {activity.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-[#213555]">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button className="h-20 flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white">
                      <Home className="h-6 w-6 mb-2" />
                      <span className="text-sm">New Booking</span>
                    </Button>
                    <Button className="h-20 flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-white">
                      <Users className="h-6 w-6 mb-2" />
                      <span className="text-sm">Check In</span>
                    </Button>
                    <Button className="h-20 flex flex-col items-center justify-center bg-orange-500 hover:bg-orange-600 text-white">
                      <Utensils className="h-6 w-6 mb-2" />
                      <span className="text-sm">Restaurant Order</span>
                    </Button>
                    <Button className="h-20 flex flex-col items-center justify-center bg-purple-500 hover:bg-purple-600 text-white">
                      <Package className="h-6 w-6 mb-2" />
                      <span className="text-sm">Inventory</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="p-6 space-y-6">
              <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-[#213555]">
                    Revenue Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <DollarSign className="h-16 w-16 mx-auto mb-4 text-green-500" />
                      <p className="text-lg font-medium text-[#213555]">
                        Revenue Breakdown Chart
                      </p>
                      <p className="text-sm">
                        Detailed revenue breakdown visualization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="occupancy" className="p-6 space-y-6">
              <Card className="border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-[#213555]">
                    Occupancy Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Home className="h-16 w-16 mx-auto mb-4 text-blue-500" />
                      <p className="text-lg font-medium text-[#213555]">
                        Occupancy Rate Chart
                      </p>
                      <p className="text-sm">
                        Room occupancy rate visualization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
