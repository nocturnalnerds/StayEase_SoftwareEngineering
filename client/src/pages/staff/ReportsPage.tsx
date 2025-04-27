"use client";

import { useState, useEffect } from "react";
import type React from "react";
import {
  BarChart3,
  Download,
  FileText,
  Filter,
  Plus,
  TrendingUp,
  Calendar,
  Users,
  Hotel,
  UtensilsCrossed,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/staff/Layout";
import { revenueData, occupancyData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import SkeletonStats from "@/components/staff/SkeletonStats";
import SkeletonChart from "@/components/staff/SkeletonChart";
import SkeletonTable from "@/components/staff/SkeletonTable";

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("analytics");
  const [reportTimeframe, setReportTimeframe] = useState("monthly");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Calculate total revenue
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);

  // Calculate average occupancy
  const averageOccupancy =
    occupancyData.reduce((sum, item) => sum + item.rate, 0) /
    occupancyData.length;

  // Get data for the selected timeframe
  const getTimeframeData = (data: any[], timeframe: string) => {
    switch (timeframe) {
      case "weekly":
        return data.slice(-7);
      case "monthly":
        return data.slice(-30);
      case "yearly":
        return data;
      default:
        return data.slice(-30);
    }
  };

  const timeframeRevenueData = getTimeframeData(revenueData, reportTimeframe);
  const timeframeOccupancyData = getTimeframeData(
    occupancyData,
    reportTimeframe
  );

  // Calculate timeframe totals
  const timeframeRevenue = timeframeRevenueData.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const timeframeAverageOccupancy =
    timeframeOccupancyData.reduce((sum, item) => sum + item.rate, 0) /
    timeframeOccupancyData.length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            Reports & Analytics
          </h1>
          <div className="flex space-x-2">
            <Button variant="outline" className="border-secondary/20">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={reportTimeframe} onValueChange={setReportTimeframe}>
            <SelectTrigger className="w-[180px] border-secondary/20">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Last 7 Days</SelectItem>
              <SelectItem value="monthly">Last 30 Days</SelectItem>
              <SelectItem value="yearly">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="border-secondary/20">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-secondary/20">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <SkeletonStats count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-secondary/10">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 mr-3">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(timeframeRevenue)}
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">+5.2%</Badge>
              </CardContent>
            </Card>
            <Card className="border-secondary/10">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3">
                    <Hotel className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <p className="text-xl font-bold">
                      {timeframeAverageOccupancy.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">+2.8%</Badge>
              </CardContent>
            </Card>
            <Card className="border-secondary/10">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 mr-3">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="text-xl font-bold">342</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-800">+12.5%</Badge>
              </CardContent>
            </Card>
            <Card className="border-secondary/10">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 mr-3">
                    <UtensilsCrossed className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">F&B Revenue</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(timeframeRevenue * 0.25)}
                    </p>
                  </div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">+8.7%</Badge>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="analytics" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Generated Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkeletonChart height={300} />
                <SkeletonChart height={300} />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>
                      {reportTimeframe === "weekly"
                        ? "Last 7 days"
                        : reportTimeframe === "monthly"
                        ? "Last 30 days"
                        : "Last year"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={timeframeRevenueData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(date) =>
                              new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            }
                            tick={{ fontSize: 12 }}
                            stroke="#888"
                          />
                          <YAxis
                            tickFormatter={(value) => `$${value}`}
                            tick={{ fontSize: 12 }}
                            stroke="#888"
                          />
                          <Tooltip
                            formatter={(value) => [`$${value}`, "Revenue"]}
                            labelFormatter={(date) =>
                              new Date(date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            }
                          />
                          <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#4F709C"
                            strokeWidth={2}
                            dot={{ r: 3, fill: "#4F709C" }}
                            activeDot={{
                              r: 5,
                              stroke: "#213555",
                              strokeWidth: 2,
                            }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Occupancy Rate</CardTitle>
                    <CardDescription>
                      {reportTimeframe === "weekly"
                        ? "Last 7 days"
                        : reportTimeframe === "monthly"
                        ? "Last 30 days"
                        : "Last year"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={timeframeOccupancyData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="date"
                            tickFormatter={(date) =>
                              new Date(date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            }
                            tick={{ fontSize: 12 }}
                            stroke="#888"
                          />
                          <YAxis
                            tickFormatter={(value) => `${value}%`}
                            domain={[0, 100]}
                            tick={{ fontSize: 12 }}
                            stroke="#888"
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Occupancy"]}
                            labelFormatter={(date) =>
                              new Date(date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            }
                          />
                          <Bar
                            dataKey="rate"
                            fill="#FFC26F"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SkeletonChart height={250} />
                <SkeletonChart height={250} />
                <SkeletonChart height={250} />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Room Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: "Standard Room", value: 12500 },
                            { name: "Deluxe Room", value: 18750 },
                            { name: "Executive Suite", value: 25000 },
                            { name: "Family Room", value: 15000 },
                            { name: "Presidential Suite", value: 30000 },
                          ]}
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            type="number"
                            tickFormatter={(value) => `$${value / 1000}k`}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            width={80}
                          />
                          <Tooltip
                            formatter={(value) => [`$${value}`, "Revenue"]}
                          />
                          <Bar
                            dataKey="value"
                            fill="#4F709C"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Selling Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: "Continental Breakfast", value: 120 },
                            { name: "Club Sandwich", value: 95 },
                            { name: "Caesar Salad", value: 85 },
                            { name: "Grilled Salmon", value: 65 },
                            { name: "House Red Wine", value: 60 },
                          ]}
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis type="number" />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            width={80}
                          />
                          <Tooltip
                            formatter={(value) => [
                              `${value} orders`,
                              "Quantity",
                            ]}
                          />
                          <Bar
                            dataKey="value"
                            fill="#FFC26F"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          layout="vertical"
                          data={[
                            { name: "Toiletries", value: 85 },
                            { name: "Linen", value: 70 },
                            { name: "Cleaning", value: 65 },
                            { name: "Food", value: 60 },
                            { name: "Beverage", value: 55 },
                          ]}
                          margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            type="number"
                            tickFormatter={(value) => `${value}%`}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            width={80}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Usage"]}
                          />
                          <Bar
                            dataKey="value"
                            fill="#213555"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            {isLoading ? (
              <SkeletonTable rowCount={5} columnCount={7} />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Generated Reports</CardTitle>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-secondary/10">
                          <th className="text-left p-4 font-medium text-gray-500">
                            Report Name
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Type
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Timeframe
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Generated By
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Date
                          </th>
                          <th className="text-right p-4 font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            name: "Monthly Revenue Report",
                            type: "Revenue",
                            timeframe: "Monthly",
                            generatedBy: "John Smith",
                            date: "2023-06-01",
                          },
                          {
                            name: "Occupancy Analysis",
                            type: "Occupancy",
                            timeframe: "Weekly",
                            generatedBy: "Sarah Johnson",
                            date: "2023-06-10",
                          },
                          {
                            name: "Inventory Usage Report",
                            type: "Inventory",
                            timeframe: "Monthly",
                            generatedBy: "John Smith",
                            date: "2023-06-01",
                          },
                          {
                            name: "Staff Performance",
                            type: "Staff",
                            timeframe: "Quarterly",
                            generatedBy: "Sarah Johnson",
                            date: "2023-06-15",
                          },
                          {
                            name: "Customer Satisfaction",
                            type: "Customer",
                            timeframe: "Monthly",
                            generatedBy: "John Smith",
                            date: "2023-05-25",
                          },
                        ].map((report, index) => (
                          <tr
                            key={index}
                            className="border-b border-secondary/10 hover:bg-secondary/5"
                          >
                            <td className="p-4">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 text-secondary mr-2" />
                                <span className="font-medium">
                                  {report.name}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge
                                className={
                                  report.type === "Revenue"
                                    ? "bg-green-100 text-green-800"
                                    : report.type === "Occupancy"
                                    ? "bg-blue-100 text-blue-800"
                                    : report.type === "Inventory"
                                    ? "bg-orange-100 text-orange-800"
                                    : report.type === "Staff"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {report.type}
                              </Badge>
                            </td>
                            <td className="p-4">{report.timeframe}</td>
                            <td className="p-4">{report.generatedBy}</td>
                            <td className="p-4">
                              {new Date(report.date).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2 border-secondary/20"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90"
                              >
                                <BarChart3 className="h-3 w-3 mr-1" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ReportsPage;
