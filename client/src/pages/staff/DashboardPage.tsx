"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Hotel,
  CalendarCheck,
  CalendarX,
  DollarSign,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/staff/Layout";
import StatsCard from "@/components/staff/StatsCard";
import SkeletonStats from "@/components/staff/SkeletonStats";
import SkeletonChart from "@/components/staff/SkeletonChart";
import SkeletonTable from "@/components/staff/SkeletonTable";
import {
  dashboardStats,
  revenueData,
  occupancyData,
  reservationData,
} from "@/lib/data";
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
import { Card as SkeletonCard } from "@/components/ui/card";

const DashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Get today's check-ins and check-outs
  const today = new Date().toISOString().split("T")[0];
  const todayCheckIns = reservationData.filter(
    (res) => res.checkInDate === today
  );
  const todayCheckOuts = reservationData.filter(
    (res) => res.checkOutDate === today
  );

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

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {loading ? (
          <SkeletonStats count={4} />
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Available Rooms"
                value={`${dashboardStats.availableRooms}/${dashboardStats.totalRooms}`}
                icon={<Hotel className="h-6 w-6" />}
                description="Current availability"
                trend={{ value: 5, isPositive: true }}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Today's Check-ins"
                value={dashboardStats.todayCheckIns}
                icon={<CalendarCheck className="h-6 w-6" />}
                description={`${todayCheckIns.length} processed`}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Today's Check-outs"
                value={dashboardStats.todayCheckOuts}
                icon={<CalendarX className="h-6 w-6" />}
                description={`${todayCheckOuts.length} processed`}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatsCard
                title="Monthly Revenue"
                value={formatCurrency(dashboardStats.monthlyRevenue)}
                icon={<DollarSign className="h-6 w-6" />}
                trend={{ value: 12, isPositive: true }}
              />
            </motion.div>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SkeletonChart height={300} />
            </div>
            <div className="lg:col-span-1">
              <SkeletonChart height={300} />
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>
                    Daily revenue for the past month
                  </CardDescription>
                </CardHeader>
                <CardContent className="card-content-fix">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData.slice(-30)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="h-full shadow-card">
                <CardHeader>
                  <CardTitle>Occupancy Rate</CardTitle>
                  <CardDescription>
                    Current: {dashboardStats.occupancyRate}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="card-content-fix">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={occupancyData.slice(-7)}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(date) =>
                            new Date(date).toLocaleDateString("en-US", {
                              weekday: "short",
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
            </motion.div>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SkeletonTable rowCount={5} columnCount={4} />
            </div>
            <div className="lg:col-span-1">
              <SkeletonCard className="h-full" />
            </div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Tabs defaultValue="checkin">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="checkin">Today's Check-ins</TabsTrigger>
                    <TabsTrigger value="checkout">
                      Today's Check-outs
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="checkin" className="space-y-4">
                  <Card className="shadow-card">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-secondary/10">
                              <th className="text-left p-4 font-medium text-gray-500">
                                Guest
                              </th>
                              <th className="text-left p-4 font-medium text-gray-500">
                                Room
                              </th>
                              <th className="text-left p-4 font-medium text-gray-500">
                                Time
                              </th>
                              <th className="text-left p-4 font-medium text-gray-500">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {todayCheckIns.length > 0 ? (
                              todayCheckIns.map((res, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-secondary/10 hover:bg-secondary/5"
                                >
                                  <td className="p-4">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                                        <Users className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <p className="font-medium">
                                          {res.customer.firstName}{" "}
                                          {res.customer.lastName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {res.reservationNumber}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    {res.assignedRooms
                                      .map((ar) => ar.room.roomNumber)
                                      .join(", ")}
                                  </td>
                                  <td className="p-4">
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                                      <span>3:00 PM</span>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        res.status === "Checked-in"
                                          ? "bg-green-100 text-green-800"
                                          : "bg-yellow-100 text-yellow-800"
                                      }`}
                                    >
                                      {res.status}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="p-4 text-center text-gray-500"
                                >
                                  No check-ins for today
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="checkout" className="space-y-4">
                  <Card className="shadow-card">
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-secondary/10">
                              <th className="text-left p-4 font-medium text-gray-500">
                                Guest
                              </th>
                              <th className="text-left p-4 font-medium text-gray-500">
                                Room
                              </th>
                              <th className="text-left p-4 font-medium text-gray-500">
                                Time
                              </th>
                              <th className="text-left p-4 font-medium text-gray-500">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {todayCheckOuts.length > 0 ? (
                              todayCheckOuts.map((res, index) => (
                                <tr
                                  key={index}
                                  className="border-b border-secondary/10 hover:bg-secondary/5"
                                >
                                  <td className="p-4">
                                    <div className="flex items-center">
                                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                                        <Users className="h-4 w-4" />
                                      </div>
                                      <div>
                                        <p className="font-medium">
                                          {res.customer.firstName}{" "}
                                          {res.customer.lastName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {res.reservationNumber}
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    {res.assignedRooms
                                      .map((ar) => ar.room.roomNumber)
                                      .join(", ")}
                                  </td>
                                  <td className="p-4">
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                                      <span>11:00 AM</span>
                                    </div>
                                  </td>
                                  <td className="p-4">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        res.status === "Checked-out"
                                          ? "bg-gray-100 text-gray-800"
                                          : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {res.status}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="p-4 text-center text-gray-500"
                                >
                                  No check-outs for today
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Room Status</CardTitle>
                  <CardDescription>Current room availability</CardDescription>
                </CardHeader>
                <CardContent className="card-content-fix">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Available</span>
                      </div>
                      <span className="font-medium">
                        {dashboardStats.availableRooms}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Occupied</span>
                      </div>
                      <span className="font-medium">
                        {dashboardStats.occupiedRooms}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Cleaning</span>
                      </div>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                        <span className="text-sm">Maintenance</span>
                      </div>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">Reserved</span>
                      </div>
                      <span className="font-medium">1</span>
                    </div>
                    <div className="mt-6 pt-4 border-t border-secondary/10">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-primary">
                          Occupancy Rate
                        </span>
                        <span className="font-bold text-primary">
                          {dashboardStats.occupancyRate}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
