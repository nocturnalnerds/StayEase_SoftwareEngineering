"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Brush,
  CheckCircle,
  Clock,
  Filter,
  Search,
  MoreHorizontal,
  Bed,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Layout from "@/components/staff/Layout";
import StatusBadge from "@/components/staff/StatusBadge";
import SkeletonStats from "@/components/staff/SkeletonStats";
import SkeletonTable from "@/components/staff/SkeletonTable";
import { roomData } from "@/lib/data";

const HouseKeepingPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("room-status");
  const [selectedFloor, setSelectedFloor] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
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

  // Get unique floors
  const floors = Array.from(new Set(roomData.map((room) => room.floor))).sort(
    (a, b) => a - b
  );

  // Filter rooms based on search, floor, and status
  const filteredRooms = roomData.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.roomType.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFloor =
      selectedFloor === "all" || room.floor === Number.parseInt(selectedFloor);
    const matchesStatus =
      selectedStatus === "all" || room.status === selectedStatus;

    return matchesSearch && matchesFloor && matchesStatus;
  });

  // Group rooms by status for the dashboard view
  const roomsByStatus = filteredRooms.reduce((acc, room) => {
    if (!acc[room.status]) {
      acc[room.status] = [];
    }
    acc[room.status].push(room);
    return acc;
  }, {} as Record<string, typeof roomData>);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">House Keeping</h1>
          <Button className="bg-primary hover:bg-primary/90">
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Room Clean
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 border-secondary/20"
            />
          </div>
          <div className="flex space-x-2">
            <Select value={selectedFloor} onValueChange={setSelectedFloor}>
              <SelectTrigger className="w-[120px] border-secondary/20">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                {floors.map((floor) => (
                  <SelectItem key={floor} value={floor.toString()}>
                    Floor {floor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px] border-secondary/20">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Occupied">Occupied</SelectItem>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Out of Order">Out of Order</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="border-secondary/20"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <SkeletonStats count={4} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-secondary/10 shadow-card">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 mr-3">
                    <Bed className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="text-xl font-bold">
                      {roomsByStatus["Available"]?.length || 0}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-green-800">
                  View
                </Button>
              </CardContent>
            </Card>
            <Card className="border-secondary/10 shadow-card">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-800 mr-3">
                    <Brush className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cleaning</p>
                    <p className="text-xl font-bold">
                      {roomsByStatus["Cleaning"]?.length || 0}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-yellow-800">
                  View
                </Button>
              </CardContent>
            </Card>
            <Card className="border-secondary/10 shadow-card">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Occupied</p>
                    <p className="text-xl font-bold">
                      {roomsByStatus["Occupied"]?.length || 0}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-blue-800">
                  View
                </Button>
              </CardContent>
            </Card>
            <Card className="border-secondary/10 shadow-card">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-800 mr-3">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Maintenance</p>
                    <p className="text-xl font-bold">
                      {roomsByStatus["Maintenance"]?.length || 0}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-orange-800">
                  View
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="room-status" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="room-status">Room Status</TabsTrigger>
            <TabsTrigger value="cleaning-schedule">
              Cleaning Schedule
            </TabsTrigger>
          </TabsList>

          {loading ? (
            <div className="mt-6">
              <SkeletonTable rowCount={8} columnCount={6} />
            </div>
          ) : (
            <TabsContent value="room-status" className="space-y-6 mt-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Room Status Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-secondary/10">
                          <th className="text-left p-4 font-medium text-gray-500">
                            Room
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Type
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Floor
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Status
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Last Cleaned
                          </th>
                          <th className="text-right p-4 font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRooms.map((room) => (
                          <tr
                            key={room.id}
                            className="border-b border-secondary/10 hover:bg-secondary/5"
                          >
                            <td className="p-4">
                              <div className="flex items-center">
                                <Bed className="h-4 w-4 text-secondary mr-2" />
                                <span className="font-medium">
                                  {room.roomNumber}
                                </span>
                              </div>
                            </td>
                            <td className="p-4">{room.roomType.name}</td>
                            <td className="p-4">{room.floor}</td>
                            <td className="p-4">
                              <StatusBadge status={room.status} />
                            </td>
                            <td className="p-4">
                              {room.lastCleaned
                                ? new Date(
                                    room.lastCleaned
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="p-4 text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark as Clean
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Brush className="h-4 w-4 mr-2" />
                                    Mark for Cleaning
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <AlertCircle className="h-4 w-4 mr-2" />
                                    Report Issue
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {loading ? (
            <div className="mt-6">
              <SkeletonTable rowCount={5} columnCount={6} />
            </div>
          ) : (
            <TabsContent value="cleaning-schedule" className="mt-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Cleaning Schedule</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-secondary/10">
                          <th className="text-left p-4 font-medium text-gray-500">
                            Room
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Type
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Status
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Assigned To
                          </th>
                          <th className="text-left p-4 font-medium text-gray-500">
                            Schedule
                          </th>
                          <th className="text-right p-4 font-medium text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRooms
                          .filter(
                            (room) =>
                              room.status === "Cleaning" ||
                              room.status === "Occupied"
                          )
                          .map((room) => (
                            <tr
                              key={room.id}
                              className="border-b border-secondary/10 hover:bg-secondary/5"
                            >
                              <td className="p-4">
                                <div className="flex items-center">
                                  <Bed className="h-4 w-4 text-secondary mr-2" />
                                  <span className="font-medium">
                                    {room.roomNumber}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4">{room.roomType.name}</td>
                              <td className="p-4">
                                <StatusBadge status={room.status} />
                              </td>
                              <td className="p-4">
                                {room.status === "Cleaning"
                                  ? "Lisa Davis"
                                  : "Not Assigned"}
                              </td>
                              <td className="p-4">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-secondary mr-2" />
                                  <span>
                                    {room.status === "Cleaning"
                                      ? "In Progress"
                                      : room.status === "Occupied"
                                      ? "After Check-out"
                                      : "Not Scheduled"}
                                  </span>
                                </div>
                              </td>
                              <td className="p-4 text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                      Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark as Complete
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Calendar className="h-4 w-4 mr-2" />
                                      Reschedule
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Users className="h-4 w-4 mr-2" />
                                      Reassign
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </Layout>
  );
};

export default HouseKeepingPage;
