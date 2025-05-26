"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Home,
  AlertTriangle,
  Edit2,
  Plus,
} from "lucide-react";
import type { RoomStatus } from "@/lib/types";

interface Room {
  id: number;
  roomNumber: string;
  type: string;
  status: RoomStatus;
  lastCleaned: string;
  assignedTo: string;
  priority: "low" | "medium" | "high";
  notes?: string;
}

export default function HouseKeepingPage() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockRooms: Room[] = Array.from({ length: 20 }).map((_, index) => {
        const roomStatuses: RoomStatus[] = [
          "Occupied",
          "Available",
          "Maintenance",
          "Cleaning",
        ];
        const priorities = ["low", "medium", "high"] as const;
        const randomStatus =
          roomStatuses[Math.floor(Math.random() * roomStatuses.length)];
        const staffMembers = [
          "John Doe",
          "Jane Smith",
          "Robert Johnson",
          "Emily Davis",
        ];
        const randomStaff =
          staffMembers[Math.floor(Math.random() * staffMembers.length)];
        const randomPriority =
          priorities[Math.floor(Math.random() * priorities.length)];

        return {
          id: index + 1,
          roomNumber: `${101 + index}`,
          type:
            index % 3 === 0 ? "Standard" : index % 3 === 1 ? "Deluxe" : "Suite",
          status: randomStatus,
          lastCleaned: new Date(
            Date.now() - Math.floor(Math.random() * 7) * 86400000
          ).toLocaleDateString(),
          assignedTo: randomStaff,
          priority: randomPriority,
          notes:
            randomStatus === "Maintenance" ? "AC unit needs repair" : undefined,
        };
      });

      setRooms(mockRooms);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const updateRoomStatus = (roomId: number, newStatus: RoomStatus) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: newStatus,
              lastCleaned:
                newStatus === "Available"
                  ? new Date().toLocaleDateString()
                  : room.lastCleaned,
            }
          : room
      )
    );
  };

  const updateRoom = (updatedRoom: Room) => {
    setRooms(
      rooms.map((room) => (room.id === updatedRoom.id ? updatedRoom : room))
    );
    setIsEditDialogOpen(false);
    setSelectedRoom(null);
  };

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case "Occupied":
        return "bg-red-100 text-red-800 border-red-200";
      case "Available":
        return "bg-green-100 text-green-800 border-green-200";
      case "Maintenance":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Cleaning":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingRooms = filteredRooms.filter(
    (room) => room.status === "Cleaning"
  );
  const completedRooms = filteredRooms.filter(
    (room) => room.status === "Available"
  );
  const maintenanceRooms = filteredRooms.filter(
    (room) => room.status === "Maintenance"
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Housekeeping Dashboard...
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
              Housekeeping Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage room cleaning and maintenance efficiently
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search rooms..."
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
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Add New Housekeeping Task
                  </DialogTitle>
                  <DialogDescription className="text-gray-600">
                    Create a new cleaning or maintenance task
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="room-number"
                        className="text-[#213555] font-medium"
                      >
                        Room Number
                      </Label>
                      <Input
                        id="room-number"
                        placeholder="e.g., 101"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="task-type"
                        className="text-[#213555] font-medium"
                      >
                        Task Type
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="task-type"
                          className="border-gray-200 focus:border-[#4F709C]"
                        >
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="cleaning">Cleaning</SelectItem>
                          <SelectItem value="maintenance">
                            Maintenance
                          </SelectItem>
                          <SelectItem value="inspection">Inspection</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="priority"
                        className="text-[#213555] font-medium"
                      >
                        Priority
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="priority"
                          className="border-gray-200 focus:border-[#4F709C]"
                        >
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="assigned-to"
                        className="text-[#213555] font-medium"
                      >
                        Assign To
                      </Label>
                      <Select>
                        <SelectTrigger
                          id="assigned-to"
                          className="border-gray-200 focus:border-[#4F709C]"
                        >
                          <SelectValue placeholder="Select staff" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="john">John Doe</SelectItem>
                          <SelectItem value="jane">Jane Smith</SelectItem>
                          <SelectItem value="robert">Robert Johnson</SelectItem>
                          <SelectItem value="emily">Emily Davis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="notes"
                      className="text-[#213555] font-medium"
                    >
                      Notes
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any special instructions..."
                      className="min-h-[100px] border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C]">
                    Create Task
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Rooms
              </CardTitle>
              <Home className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{rooms.length}</div>
              <p className="text-xs opacity-80 mt-1">All hotel rooms</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Pending Cleaning
              </CardTitle>
              <Clock className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingRooms.length}</div>
              <p className="text-xs opacity-80 mt-1">Awaiting housekeeping</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Ready Rooms
              </CardTitle>
              <CheckCircle className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedRooms.length}</div>
              <p className="text-xs opacity-80 mt-1">Available for guests</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Maintenance
              </CardTitle>
              <AlertTriangle className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {maintenanceRooms.length}
              </div>
              <p className="text-xs opacity-80 mt-1">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
            >
              Pending ({pendingRooms.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              Completed ({completedRooms.length})
            </TabsTrigger>
            <TabsTrigger
              value="maintenance"
              className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Maintenance ({maintenanceRooms.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Cleaning Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Room
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Type
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Priority
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Assigned To
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Last Cleaned
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRooms.length > 0 ? (
                        pendingRooms.map((room) => (
                          <TableRow
                            key={room.id}
                            className="hover:bg-blue-50 transition-colors duration-200"
                          >
                            <TableCell className="font-medium text-[#4F709C]">
                              {room.roomNumber}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200"
                              >
                                {room.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getPriorityColor(
                                  room.priority
                                )} transition-all duration-200 hover:scale-105`}
                              >
                                {room.priority.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-400" />
                              {room.assignedTo}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {room.lastCleaned}
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white transition-all duration-200 hover:scale-105"
                                  onClick={() =>
                                    updateRoomStatus(room.id, "Available")
                                  }
                                >
                                  <CheckCircle className="mr-1 h-4 w-4" />
                                  Complete
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                                  onClick={() =>
                                    updateRoomStatus(room.id, "Maintenance")
                                  }
                                >
                                  <XCircle className="mr-1 h-4 w-4" />
                                  Issue
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                                  onClick={() => {
                                    setSelectedRoom(room);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-12">
                            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">
                              All caught up!
                            </h3>
                            <p className="text-gray-500">
                              No pending cleaning tasks
                            </p>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Completed Rooms
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Room
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Type
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Cleaned By
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Completed
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedRooms.map((room) => (
                        <TableRow
                          key={room.id}
                          className="hover:bg-green-50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-green-600">
                            {room.roomNumber}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {room.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            {room.assignedTo}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {room.lastCleaned}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                              onClick={() => {
                                setSelectedRoom(room);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit2 className="mr-1 h-4 w-4" />
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Maintenance Required
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Room
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Type
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Issue
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Reported
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {maintenanceRooms.map((room) => (
                        <TableRow
                          key={room.id}
                          className="hover:bg-red-50 transition-colors duration-200"
                        >
                          <TableCell className="font-medium text-red-600">
                            {room.roomNumber}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 border-red-200"
                            >
                              {room.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {room.notes || "General maintenance"}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {room.lastCleaned}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-white transition-all duration-200 hover:scale-105"
                                onClick={() =>
                                  updateRoomStatus(room.id, "Available")
                                }
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Resolved
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                                onClick={() => {
                                  setSelectedRoom(room);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit2 className="mr-1 h-4 w-4" />
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Room Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Edit Room {selectedRoom?.roomNumber}
              </DialogTitle>
              <DialogDescription>
                Update room details and maintenance information
              </DialogDescription>
            </DialogHeader>
            {selectedRoom && (
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="status"
                      className="text-[#213555] font-medium"
                    >
                      Status
                    </Label>
                    <Select defaultValue={selectedRoom.status}>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Occupied">Occupied</SelectItem>
                        <SelectItem value="Cleaning">Cleaning</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="priority"
                      className="text-[#213555] font-medium"
                    >
                      Priority
                    </Label>
                    <Select defaultValue={selectedRoom.priority}>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="assignedTo"
                    className="text-[#213555] font-medium"
                  >
                    Assigned To
                  </Label>
                  <Select defaultValue={selectedRoom.assignedTo}>
                    <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="John Doe">John Doe</SelectItem>
                      <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                      <SelectItem value="Robert Johnson">
                        Robert Johnson
                      </SelectItem>
                      <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-[#213555] font-medium">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any special instructions or notes..."
                    defaultValue={selectedRoom.notes}
                    className="min-h-[100px] border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                onClick={() => {
                  if (selectedRoom) {
                    updateRoom(selectedRoom);
                  }
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
