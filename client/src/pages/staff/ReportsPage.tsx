"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  FileText,
  Eye,
  Search,
} from "lucide-react";

interface ReportData {
  id: string;
  name: string;
  type: "financial" | "occupancy" | "guest" | "operational";
  period: string;
  generatedDate: string;
  status: "ready" | "generating" | "failed";
  size: string;
}

// Simple StatsCard component
const StatsCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: { value: number; isPositive: boolean };
  color: string;
}> = ({ title, value, icon, trend, color }) => {
  return (
    <Card
      className={`${color} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
        <div className="opacity-80">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs opacity-80 mt-1">
          <span
            className={trend.isPositive ? "text-green-300" : "text-red-300"}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}%
          </span>{" "}
          from last month
        </p>
      </CardContent>
    </Card>
  );
};

const ReportsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [reportType, setReportType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const reports: ReportData[] = [
    {
      id: "1",
      name: "Monthly Revenue Report",
      type: "financial",
      period: "January 2024",
      generatedDate: "2024-01-31",
      status: "ready",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Occupancy Analysis",
      type: "occupancy",
      period: "January 2024",
      generatedDate: "2024-01-31",
      status: "ready",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Guest Satisfaction Survey",
      type: "guest",
      period: "Q4 2023",
      generatedDate: "2024-01-15",
      status: "generating",
      size: "-",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 45000, occupancy: 75, expenses: 28000 },
    { month: "Feb", revenue: 52000, occupancy: 82, expenses: 31000 },
    { month: "Mar", revenue: 48000, occupancy: 78, expenses: 29000 },
    { month: "Apr", revenue: 61000, occupancy: 85, expenses: 35000 },
    { month: "May", revenue: 55000, occupancy: 80, expenses: 33000 },
    { month: "Jun", revenue: 67000, occupancy: 90, expenses: 38000 },
  ];

  const occupancyData = [
    { roomType: "Standard", occupied: 45, total: 60, percentage: 75 },
    { roomType: "Deluxe", occupied: 28, total: 35, percentage: 80 },
    { roomType: "Suite", occupied: 12, total: 15, percentage: 80 },
    { roomType: "Presidential", occupied: 2, total: 3, percentage: 67 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "generating":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "financial":
        return <DollarSign className="h-4 w-4" />;
      case "occupancy":
        return <BarChart3 className="h-4 w-4" />;
      case "guest":
        return <Users className="h-4 w-4" />;
      case "operational":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = reportType === "all" || report.type === reportType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Reports & Analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-[#213555]">
              Reports & Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Generate and view detailed business reports
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="pl-10 w-[250px] border-gray-200 focus:border-[#4F709C] focus:ring-[#4F709C] transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label htmlFor="period" className="text-[#213555] font-medium">
                Report Period:
              </Label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-48 border-gray-200 focus:border-[#4F709C]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Revenue"
            value="$328,500"
            icon={<DollarSign className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Average Occupancy"
            value="82%"
            icon={<BarChart3 className="h-6 w-6" />}
            trend={{ value: 5, isPositive: true }}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatsCard
            title="Guest Satisfaction"
            value="4.6/5"
            icon={<Users className="h-6 w-6" />}
            trend={{ value: 0.2, isPositive: true }}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatsCard
            title="Revenue per Room"
            value="$145"
            icon={<TrendingUp className="h-6 w-6" />}
            trend={{ value: 8, isPositive: true }}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="financial"
              className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
            >
              Financial
            </TabsTrigger>
            <TabsTrigger
              value="occupancy"
              className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
            >
              Occupancy
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue vs Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {revenueData.map((data, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                      >
                        <span className="font-medium text-[#213555]">
                          {data.month}
                        </span>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-green-600 font-medium">
                              Revenue: ${data.revenue.toLocaleString()}
                            </div>
                            <div className="text-sm text-red-600">
                              Expenses: ${data.expenses.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-[#213555]">
                              Profit: $
                              {(data.revenue - data.expenses).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Room Occupancy by Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {occupancyData.map((room) => (
                      <div key={room.roomType} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#213555]">
                            {room.roomType}
                          </span>
                          <span className="text-sm text-gray-600">
                            {room.occupied}/{room.total} ({room.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#4F709C] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${room.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle>Monthly Financial Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold text-[#213555]">
                            Month
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555]">
                            Revenue
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555]">
                            Expenses
                          </TableHead>
                          <TableHead className="font-semibold text-[#213555]">
                            Profit
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {revenueData.map((data, index) => (
                          <TableRow
                            key={index}
                            className="hover:bg-blue-50 transition-colors duration-200"
                          >
                            <TableCell className="font-medium text-[#4F709C]">
                              {data.month}
                            </TableCell>
                            <TableCell className="text-green-600 font-medium">
                              ${data.revenue.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-red-600 font-medium">
                              ${data.expenses.toLocaleString()}
                            </TableCell>
                            <TableCell className="font-bold text-[#213555]">
                              ${(data.revenue - data.expenses).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                  <CardTitle>Revenue Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                      <span className="font-medium text-[#213555]">
                        Room Revenue
                      </span>
                      <span className="font-bold text-blue-600">
                        $245,000 (75%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                      <span className="font-medium text-[#213555]">
                        F&B Revenue
                      </span>
                      <span className="font-bold text-green-600">
                        $65,000 (20%)
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                      <span className="font-medium text-[#213555]">
                        Other Services
                      </span>
                      <span className="font-bold text-purple-600">
                        $18,500 (5%)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle>Detailed Occupancy Analytics</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Month
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Occupancy Rate
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Available Rooms
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Occupied Rooms
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Revenue
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {revenueData.map((data, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-[#4F709C]">
                            {data.month}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                data.occupancy >= 85
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : data.occupancy >= 70
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {data.occupancy}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">113</TableCell>
                          <TableCell className="text-gray-600">
                            {Math.round((data.occupancy / 100) * 113)}
                          </TableCell>
                          <TableCell className="font-medium text-[#213555]">
                            ${data.revenue.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <CardTitle>Generated Reports</CardTitle>
                  <div className="flex gap-2">
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="w-40 bg-white/20 border-white/30 text-white">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="occupancy">Occupancy</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                        <SelectItem value="operational">Operational</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 transition-colors duration-200 bg-white shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-[#4F709C]">
                          {getTypeIcon(report.type)}
                        </div>
                        <div>
                          <h3 className="font-medium text-[#213555]">
                            {report.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {report.period} • Generated on{" "}
                            {new Date(
                              report.generatedDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {report.size}
                        </span>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-blue-50 transition-all duration-200"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {report.status === "ready" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 transition-all duration-200"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsPage;
