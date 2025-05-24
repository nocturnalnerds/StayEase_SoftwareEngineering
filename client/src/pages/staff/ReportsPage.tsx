"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Download,
  FileText,
  BarChart,
  Filter,
} from "lucide-react";
import { Chart } from "@/components/ui/chart";

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reportPeriod, setReportPeriod] = useState("month");

  const revenueData = [
    { name: "Jan", revenue: 12400, expenses: 8200, profit: 4200 },
    { name: "Feb", revenue: 14100, expenses: 8400, profit: 5700 },
    { name: "Mar", revenue: 15800, expenses: 9100, profit: 6700 },
    { name: "Apr", revenue: 16200, expenses: 9300, profit: 6900 },
    { name: "May", revenue: 18900, expenses: 10200, profit: 8700 },
    { name: "Jun", revenue: 21500, expenses: 11500, profit: 10000 },
    { name: "Jul", revenue: 25800, expenses: 12800, profit: 13000 },
    { name: "Aug", revenue: 24200, expenses: 12100, profit: 12100 },
    { name: "Sep", revenue: 21300, expenses: 11200, profit: 10100 },
    { name: "Oct", revenue: 19500, expenses: 10800, profit: 8700 },
    { name: "Nov", revenue: 17800, expenses: 10100, profit: 7700 },
    { name: "Dec", revenue: 22400, expenses: 11800, profit: 10600 },
  ];

  const occupancyData = [
    { name: "Jan", occupancy: 68 },
    { name: "Feb", occupancy: 72 },
    { name: "Mar", occupancy: 75 },
    { name: "Apr", occupancy: 78 },
    { name: "May", occupancy: 82 },
    { name: "Jun", occupancy: 88 },
    { name: "Jul", occupancy: 92 },
    { name: "Aug", occupancy: 90 },
    { name: "Sep", occupancy: 85 },
    { name: "Oct", occupancy: 80 },
    { name: "Nov", occupancy: 76 },
    { name: "Dec", occupancy: 85 },
  ];

  const roomTypeData = [
    { name: "Standard", value: 45 },
    { name: "Deluxe", value: 30 },
    { name: "Suite", value: 15 },
    { name: "Executive", value: 10 },
  ];

  const bookingSourceData = [
    { name: "Direct", value: 35 },
    { name: "Booking.com", value: 25 },
    { name: "Expedia", value: 20 },
    { name: "Airbnb", value: 12 },
    { name: "Other", value: 8 },
  ];

  const financialSummary = {
    totalRevenue: 230000,
    roomRevenue: 180000,
    fbRevenue: 35000,
    otherRevenue: 15000,
    totalExpenses: 125000,
    netProfit: 105000,
    revPAR: 120,
    ADR: 150,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">
          View and generate hotel performance reports
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <Tabs defaultValue="financial" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-full sm:w-[150px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-[150px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>

          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial" className="w-full">
        <TabsContent value="financial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue, expenses, and profit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Chart
                    type="bar"
                    height={300}
                    series={[
                      {
                        name: "Revenue",
                        data: revenueData.map((item) => item.revenue),
                      },
                      {
                        name: "Expenses",
                        data: revenueData.map((item) => item.expenses),
                      },
                      {
                        name: "Profit",
                        data: revenueData.map((item) => item.profit),
                      },
                    ]}
                    options={{
                      xaxis: {
                        categories: revenueData.map((item) => item.name),
                      },
                      colors: ["#4F709C", "#FF8042", "#00C49F"],
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>
                  Year-to-date financial performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Revenue
                      </p>
                      <p className="text-2xl font-bold">
                        ${financialSummary.totalRevenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Net Profit
                      </p>
                      <p className="text-2xl font-bold">
                        ${financialSummary.netProfit.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">
                      Revenue Breakdown
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-sm">Room Revenue</p>
                        <p className="text-sm font-medium">
                          ${financialSummary.roomRevenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">F&B Revenue</p>
                        <p className="text-sm font-medium">
                          ${financialSummary.fbRevenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Other Revenue</p>
                        <p className="text-sm font-medium">
                          ${financialSummary.otherRevenue.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm">Total Expenses</p>
                        <p className="text-sm font-medium">
                          ${financialSummary.totalExpenses.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">RevPAR</p>
                        <p className="text-lg font-medium">
                          ${financialSummary.revPAR}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ADR</p>
                        <p className="text-lg font-medium">
                          ${financialSummary.ADR}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Financial Transactions</CardTitle>
                <CardDescription>Recent financial transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">TRX-001</TableCell>
                      <TableCell>2023-04-18</TableCell>
                      <TableCell>Room Booking - #1205</TableCell>
                      <TableCell className="text-green-600">$450.00</TableCell>
                      <TableCell>Income</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TRX-002</TableCell>
                      <TableCell>2023-04-18</TableCell>
                      <TableCell>Restaurant Bill - Table 7</TableCell>
                      <TableCell className="text-green-600">$125.50</TableCell>
                      <TableCell>Income</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TRX-003</TableCell>
                      <TableCell>2023-04-17</TableCell>
                      <TableCell>Linen Supply Payment</TableCell>
                      <TableCell className="text-red-600">$850.00</TableCell>
                      <TableCell>Expense</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TRX-004</TableCell>
                      <TableCell>2023-04-17</TableCell>
                      <TableCell>Room Booking - #1108</TableCell>
                      <TableCell className="text-green-600">$380.00</TableCell>
                      <TableCell>Income</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">TRX-005</TableCell>
                      <TableCell>2023-04-16</TableCell>
                      <TableCell>Staff Salary Payment</TableCell>
                      <TableCell className="text-red-600">$4,500.00</TableCell>
                      <TableCell>Expense</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
                <CardDescription>Monthly occupancy percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Chart
                    type="bar"
                    height={300}
                    series={[
                      {
                        name: "Occupancy Rate",
                        data: occupancyData.map((item) => item.occupancy),
                      },
                    ]}
                    options={{
                      xaxis: {
                        categories: occupancyData.map((item) => item.name),
                      },
                      colors: ["#4F709C"],
                      yaxis: {
                        labels: {
                          formatter: (value) => `${value}%`,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Type Distribution</CardTitle>
                <CardDescription>Bookings by room type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Chart
                    type="pie"
                    height={300}
                    series={roomTypeData.map((item) => item.value)}
                    options={{
                      labels: roomTypeData.map((item) => item.name),
                      colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
                      legend: {
                        position: "bottom",
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Occupancy Details</CardTitle>
                <CardDescription>Room occupancy statistics</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <BarChart className="mr-2 h-4 w-4" />
                View Trends
              </Button>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Rooms Available</TableHead>
                      <TableHead>Rooms Occupied</TableHead>
                      <TableHead>Occupancy Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Apr 18, 2023
                      </TableCell>
                      <TableCell>100</TableCell>
                      <TableCell>85</TableCell>
                      <TableCell>85%</TableCell>
                      <TableCell>$12,750</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Source</CardTitle>
                <CardDescription>Bookings by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Chart
                    type="pie"
                    height={300}
                    series={bookingSourceData.map((item) => item.value)}
                    options={{
                      labels: bookingSourceData.map((item) => item.name),
                      colors: [
                        "#0088FE",
                        "#00C49F",
                        "#FFBB28",
                        "#FF8042",
                        "#8884D8",
                      ],
                      legend: {
                        position: "bottom",
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
