"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/TextArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Users,
  UserPlus,
  UserX,
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
} from "lucide-react";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  checkIn: string;
  checkOut: string;
  roomNumber: string;
  roomType: string;
  status: "checked-in" | "checked-out" | "reserved" | "cancelled";
  totalAmount: number;
  paymentStatus: "paid" | "pending" | "partial";
}

interface Reservation {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: number;
  specialRequests: string;
  status: "confirmed" | "pending" | "cancelled";
  totalAmount: number;
}

const StatsCard: React.FC<{
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  trend: { value: number; isPositive: boolean };
}> = ({ title, value, icon: Icon, trend }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90">
          {title}
        </CardTitle>
        <Icon className="h-5 w-5 opacity-80" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs opacity-80 mt-1">
          {trend.isPositive ? "+" : ""}
          {trend.value} from last month
        </p>
      </CardContent>
    </Card>
  );
};

const FrontOfficePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("guests");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [isAddReservationOpen, setIsAddReservationOpen] = useState(false);
  const [isViewGuestOpen, setIsViewGuestOpen] = useState(false);
  const [isEditGuestOpen, setIsEditGuestOpen] = useState(false);
  const [isViewReservationOpen, setIsViewReservationOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  // Mock data
  const guests: Guest[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1234567890",
      address: "123 Main St, City",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      roomNumber: "101",
      roomType: "Deluxe",
      status: "checked-in",
      totalAmount: 450,
      paymentStatus: "paid",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1234567891",
      address: "456 Oak Ave, City",
      checkIn: "2024-01-16",
      checkOut: "2024-01-20",
      roomNumber: "205",
      roomType: "Suite",
      status: "reserved",
      totalAmount: 800,
      paymentStatus: "pending",
    },
  ];

  const reservations: Reservation[] = [
    {
      id: "1",
      guestName: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1234567892",
      checkIn: "2024-01-20",
      checkOut: "2024-01-23",
      roomType: "Standard",
      guests: 2,
      specialRequests: "Late check-in",
      status: "confirmed",
      totalAmount: 300,
    },
    {
      id: "2",
      guestName: "Bob Wilson",
      email: "bob.wilson@email.com",
      phone: "+1234567893",
      checkIn: "2024-01-22",
      checkOut: "2024-01-25",
      roomType: "Deluxe",
      guests: 1,
      specialRequests: "Ground floor room",
      status: "pending",
      totalAmount: 375,
    },
  ];

  const stats = [
    {
      title: "Total Guests",
      value: "24",
      icon: Users,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Check-ins Today",
      value: "8",
      icon: UserPlus,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Check-outs Today",
      value: "6",
      icon: UserX,
      trend: { value: 2, isPositive: false },
    },
    {
      title: "Reservations",
      value: "15",
      icon: Calendar,
      trend: { value: 8, isPositive: true },
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "checked-in":
      case "confirmed":
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "reserved":
      case "pending":
      case "partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "checked-out":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsViewGuestOpen(true);
  };

  const handleEditGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setIsEditGuestOpen(true);
  };

  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsViewReservationOpen(true);
  };

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch = guest.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || guest.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch = reservation.guestName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || reservation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Front Office Dashboard...
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
              Front Office Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Manage guests, reservations, and check-ins/check-outs efficiently
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search guests..."
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
            <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Guest
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    Add New Guest
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="guestName"
                      className="text-[#213555] font-medium"
                    >
                      Guest Name
                    </Label>
                    <Input
                      id="guestName"
                      placeholder="Enter guest name"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="guestEmail"
                      className="text-[#213555] font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      placeholder="Enter email"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="guestPhone"
                      className="text-[#213555] font-medium"
                    >
                      Phone
                    </Label>
                    <Input
                      id="guestPhone"
                      placeholder="Enter phone number"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="roomNumber"
                      className="text-[#213555] font-medium"
                    >
                      Room Number
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="101">101 - Standard</SelectItem>
                        <SelectItem value="102">102 - Deluxe</SelectItem>
                        <SelectItem value="201">201 - Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setIsAddGuestOpen(false)}
                      className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                    >
                      Add Guest
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddGuestOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={isAddReservationOpen}
              onOpenChange={setIsAddReservationOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  New Reservation
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-0 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-[#213555] text-xl font-bold">
                    New Reservation
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="reservationName"
                      className="text-[#213555] font-medium"
                    >
                      Guest Name
                    </Label>
                    <Input
                      id="reservationName"
                      placeholder="Enter guest name"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="reservationEmail"
                      className="text-[#213555] font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="reservationEmail"
                      type="email"
                      placeholder="Enter email"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="reservationPhone"
                      className="text-[#213555] font-medium"
                    >
                      Phone
                    </Label>
                    <Input
                      id="reservationPhone"
                      placeholder="Enter phone number"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="checkInDate"
                        className="text-[#213555] font-medium"
                      >
                        Check-in
                      </Label>
                      <Input
                        id="checkInDate"
                        type="date"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="checkOutDate"
                        className="text-[#213555] font-medium"
                      >
                        Check-out
                      </Label>
                      <Input
                        id="checkOutDate"
                        type="date"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="roomType"
                      className="text-[#213555] font-medium"
                    >
                      Room Type
                    </Label>
                    <Select>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="deluxe">Deluxe</SelectItem>
                        <SelectItem value="suite">Suite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="specialRequests"
                      className="text-[#213555] font-medium"
                    >
                      Special Requests
                    </Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requests..."
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setIsAddReservationOpen(false)}
                      className="flex-1 bg-[#213555] hover:bg-[#4F709C] transition-colors duration-200"
                    >
                      Create Reservation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddReservationOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl font-bold">
                Guest Management
              </CardTitle>
              <div className="flex space-x-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="checked-in">Checked In</SelectItem>
                    <SelectItem value="checked-out">Checked Out</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-50 border-b">
                <TabsTrigger
                  value="guests"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Current Guests ({filteredGuests.length})
                </TabsTrigger>
                <TabsTrigger
                  value="reservations"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Reservations ({filteredReservations.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guests" className="mt-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Guest Name
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Room
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Check-in
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Check-out
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Payment
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuests.map((guest) => (
                        <TableRow
                          key={guest.id}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-[#4F709C]">
                                {guest.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {guest.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {guest.roomNumber} ({guest.roomType})
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(guest.checkIn).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(guest.checkOut).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(guest.status)}>
                              {guest.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusColor(guest.paymentStatus)}
                            >
                              {guest.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewGuest(guest)}
                                className="hover:bg-blue-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditGuest(guest)}
                                className="hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-900 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              {guest.status === "reserved" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600 hover:text-green-900 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="reservations" className="mt-0">
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-[#213555]">
                          Guest Name
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Room Type
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Check-in
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Check-out
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Guests
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-[#213555]">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReservations.map((reservation) => (
                        <TableRow
                          key={reservation.id}
                          className="hover:bg-blue-50 transition-colors duration-200"
                        >
                          <TableCell>
                            <div>
                              <div className="font-medium text-[#4F709C]">
                                {reservation.guestName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {reservation.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200"
                            >
                              {reservation.roomType}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(reservation.checkIn).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {new Date(
                              reservation.checkOut
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {reservation.guests}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={getStatusColor(reservation.status)}
                            >
                              {reservation.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleViewReservation(reservation)
                                }
                                className="hover:bg-blue-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-blue-50"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-900 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              {reservation.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600 hover:text-green-900 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* View Guest Dialog */}
        <Dialog open={isViewGuestOpen} onOpenChange={setIsViewGuestOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Guest Details
              </DialogTitle>
            </DialogHeader>
            {selectedGuest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Guest Name
                    </Label>
                    <p className="font-medium">{selectedGuest.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Room
                    </Label>
                    <p className="font-medium">
                      {selectedGuest.roomNumber} ({selectedGuest.roomType})
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Email
                    </Label>
                    <p>{selectedGuest.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p>{selectedGuest.phone}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Address
                  </Label>
                  <p>{selectedGuest.address}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check-in
                    </Label>
                    <p>
                      {new Date(selectedGuest.checkIn).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check-out
                    </Label>
                    <p>
                      {new Date(selectedGuest.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Status
                    </Label>
                    <Badge className={getStatusColor(selectedGuest.status)}>
                      {selectedGuest.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Payment Status
                    </Label>
                    <Badge
                      className={getStatusColor(selectedGuest.paymentStatus)}
                    >
                      {selectedGuest.paymentStatus}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Total Amount
                  </Label>
                  <p className="font-bold text-lg">
                    ${selectedGuest.totalAmount}
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewGuestOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C]">
                    Edit Guest
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Guest Dialog */}
        <Dialog open={isEditGuestOpen} onOpenChange={setIsEditGuestOpen}>
          <DialogContent className="bg-white border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Edit Guest
              </DialogTitle>
            </DialogHeader>
            {selectedGuest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editGuestName"
                      className="text-[#213555] font-medium"
                    >
                      Guest Name
                    </Label>
                    <Input
                      id="editGuestName"
                      defaultValue={selectedGuest.name}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="editGuestEmail"
                      className="text-[#213555] font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="editGuestEmail"
                      defaultValue={selectedGuest.email}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editGuestPhone"
                      className="text-[#213555] font-medium"
                    >
                      Phone
                    </Label>
                    <Input
                      id="editGuestPhone"
                      defaultValue={selectedGuest.phone}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="editGuestRoom"
                      className="text-[#213555] font-medium"
                    >
                      Room Number
                    </Label>
                    <Input
                      id="editGuestRoom"
                      defaultValue={selectedGuest.roomNumber}
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="editGuestAddress"
                    className="text-[#213555] font-medium"
                  >
                    Address
                  </Label>
                  <Textarea
                    id="editGuestAddress"
                    defaultValue={selectedGuest.address}
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editGuestStatus"
                      className="text-[#213555] font-medium"
                    >
                      Status
                    </Label>
                    <Select defaultValue={selectedGuest.status}>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="checked-in">Checked In</SelectItem>
                        <SelectItem value="checked-out">Checked Out</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="editPaymentStatus"
                      className="text-[#213555] font-medium"
                    >
                      Payment Status
                    </Label>
                    <Select defaultValue={selectedGuest.paymentStatus}>
                      <SelectTrigger className="border-gray-200 focus:border-[#4F709C]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditGuestOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C]">
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Reservation Dialog */}
        <Dialog
          open={isViewReservationOpen}
          onOpenChange={setIsViewReservationOpen}
        >
          <DialogContent className="bg-white border-0 shadow-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-[#213555]">
                Reservation Details
              </DialogTitle>
            </DialogHeader>
            {selectedReservation && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Guest Name
                    </Label>
                    <p className="font-medium">
                      {selectedReservation.guestName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Room Type
                    </Label>
                    <p className="font-medium">
                      {selectedReservation.roomType}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Email
                    </Label>
                    <p>{selectedReservation.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p>{selectedReservation.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check-in
                    </Label>
                    <p>
                      {new Date(
                        selectedReservation.checkIn
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check-out
                    </Label>
                    <p>
                      {new Date(
                        selectedReservation.checkOut
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Number of Guests
                    </Label>
                    <p>{selectedReservation.guests}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Status
                    </Label>
                    <Badge
                      className={getStatusColor(selectedReservation.status)}
                    >
                      {selectedReservation.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Special Requests
                  </Label>
                  <p>{selectedReservation.specialRequests || "None"}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Total Amount
                  </Label>
                  <p className="font-bold text-lg">
                    ${selectedReservation.totalAmount}
                  </p>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewReservationOpen(false)}
                  >
                    Close
                  </Button>
                  <Button className="bg-[#213555] hover:bg-[#4F709C]">
                    Edit Reservation
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FrontOfficePage;
