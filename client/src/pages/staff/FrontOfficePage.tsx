"use client";

import type React from "react";
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  UserCheck,
  ClipboardList,
} from "lucide-react";
import { Reservation, RoomType } from "@/lib/types";
import useReservationQuery from "@/hooks/queries/useReservationQuery";
import useReservationMutation from "@/hooks/mutations/useReservationMutation";
import toast from "react-hot-toast";
import useRoomQuery from "@/hooks/queries/useRoomQuery";
import useRoomTypeQuery from "@/hooks/queries/useRoomTypeQuery";

type StatsCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs opacity-80 mt-1">Stable</p>
      </CardContent>
    </Card>
  );
};

const FrontOfficePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("guests");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddGuestOpen, setIsAddGuestOpen] = useState(false);
  const [isAddReservationOpen, setIsAddReservationOpen] = useState(false);
  const [isViewGuestOpen, setIsViewGuestOpen] = useState(false);
  const [isEditGuestOpen, setIsEditGuestOpen] = useState(false);
  const [isViewReservationOpen, setIsViewReservationOpen] = useState(false);
  const [selectedConfirmed, setSelectedConfirmed] =
    useState<Reservation | null>(null);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const { reservationData, dashboardData, isLoading } = useReservationQuery();
  const {
    addReservation,
    deleteReservation,
    updateReservation,
    confirmReservation,
  } = useReservationMutation();
  const { roomTypeData } = useRoomTypeQuery();

  const handleViewConfirmed = (reservation: Reservation) => {
    setSelectedConfirmed(reservation);
    setIsViewGuestOpen(true);
  };

  const handleEditConfirmed = (reservation: Reservation) => {
    setSelectedConfirmed(reservation);
    setIsEditGuestOpen(true);
  };

  const handleViewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsViewReservationOpen(true);
  };

  const handleCreateReservation = () => {
    const guestName = (
      document.getElementById("reservationName") as HTMLInputElement
    ).value;
    const [firstName, lastName] = guestName.split(" ");

    const reservationData = {
      firstName: firstName || guestName, // If no last name, use full name as first name
      lastName: lastName || firstName, // If no last name, set the first part as last name
      email: (document.getElementById("reservationEmail") as HTMLInputElement)
        .value,
      phone: (document.getElementById("reservationPhone") as HTMLInputElement)
        .value,
      checkInDate: (document.getElementById("checkInDate") as HTMLInputElement)
        .value,
      checkOutDate: (
        document.getElementById("checkOutDate") as HTMLInputElement
      ).value,
      roomTypeId: parseInt(
        (document.getElementById("roomTypeId") as HTMLSelectElement).value
      ),
      roomNumber: parseInt(
        (document.getElementById("roomNumber") as HTMLInputElement).value
      ),
      specialRequests: (
        document.getElementById("specialRequests") as HTMLTextAreaElement
      ).value,
      children: parseInt(
        (document.getElementById("totalChildren") as HTMLInputElement).value ||
          "0"
      ),
      adults: parseInt(
        (document.getElementById("totalAdult") as HTMLInputElement).value || "0"
      ),
    };

    if (
      !reservationData.firstName ||
      !reservationData.lastName ||
      !reservationData.email ||
      !reservationData.phone ||
      !reservationData.checkInDate ||
      !reservationData.checkOutDate ||
      !reservationData.roomTypeId ||
      !reservationData.roomNumber ||
      !reservationData.adults ||
      !reservationData.children
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    addReservation.mutate(reservationData, {
      onSuccess: () => {
        setIsAddReservationOpen(false);
        setSelectedReservation(null);
      },
    }); // Calling the mutation
  };

  const handleUpdateReservation = () => {
    if (!selectedConfirmed) return;

    // Ambil value dari input, jika kosong maka undefined
    const fullName = (
      document.getElementById("editFullName") as HTMLInputElement
    )?.value?.trim();
    const [firstName, lastName] = fullName
      ? fullName.split(" ")
      : [undefined, undefined];
    const email = (
      document.getElementById("editGuestEmail") as HTMLInputElement
    )?.value?.trim();
    const phone = (
      document.getElementById("editGuestPhone") as HTMLInputElement
    )?.value?.trim();
    const roomNumber = parseInt(
      (
        document.getElementById("editGuestRoom") as HTMLInputElement
      )?.value?.trim()
    );
    const status = (
      document.getElementById("editGuestStatus") as HTMLSelectElement
    )?.value;
    const paymentStatus = (
      document.getElementById("editPaymentStatus") as HTMLSelectElement
    )?.value;

    // Hanya masukkan field yang ada valuenya
    const updatedData: any = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(roomNumber && { roomNumber }),
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      ...selectedConfirmed,
    };

    updateReservation.mutate(updatedData, {
      onSuccess: () => {
        setIsEditGuestOpen(false);
        setSelectedConfirmed(null);
        toast.success("Reservation updated successfully!");
      },
    });
  };

  const handleDeleteReservation = (reservationId: number) => {
    deleteReservation.mutate(reservationId);
  };

  const handleConfirmedReservation = (id: number) => {
    confirmReservation.mutate(id);
  };

  const filteredConfirmed = reservationData
    .filter((reservation) => {
      const matchesSearch =
        `${reservation.customer.firstName} ${reservation.customer.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const isConfirmed = reservation.status.toLowerCase() !== "pending";
      return matchesSearch && isConfirmed;
    })
    .sort(
      (a, b) =>
        new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime()
    );

  const filteredReservations = reservationData
    .filter((reservation) => {
      const matchesSearch =
        `${reservation.customer.firstName} ${reservation.customer.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const isPending = reservation.status.toLowerCase() === "pending";
      return matchesSearch && isPending;
    })
    .sort(
      (a, b) =>
        new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime()
    );

  if (isLoading) {
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
            <Dialog open={isAddGuestOpen} onOpenChange={setIsAddGuestOpen}>
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
                      Guest Full Name
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="roomTypeId"
                        className="text-[#213555] font-medium"
                      >
                        Room Type
                      </Label>
                      <select
                        id="roomTypeId"
                        className="border-gray-200 border-1 bg-white focus:border-[#4F709C]! rounded px-3 py-1 w-full"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select room type
                        </option>
                        {roomTypeData.map((roomType: RoomType) => (
                          <option key={roomType.id} value={roomType.id}>
                            {roomType.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label
                        htmlFor="roomNumber"
                        className="text-[#213555] font-medium"
                      >
                        Room Number
                      </Label>
                      <Input
                        id="roomNumber"
                        placeholder="Enter room number"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <Label
                        htmlFor="totalAdult"
                        className="text-[#213555] font-medium"
                      >
                        Adult Total
                      </Label>
                      <Input
                        id="totalAdult"
                        type="number"
                        placeholder="Enter number of adults"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="totalChildren"
                        className="text-[#213555] font-medium"
                      >
                        Children Total
                      </Label>
                      <Input
                        id="totalChildren"
                        type="number"
                        placeholder="Enter number of children"
                        className="border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
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
                      variant="outline"
                      onClick={() => setIsAddReservationOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateReservation}
                      className="flex-1 bg-[#213555] hover:bg-[#4F709C] text-white transition-colors duration-200"
                    >
                      Create Reservation
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Guests"
            value={dashboardData.totalGuests}
            icon={<Users className="w-5 h-5" />}
          />
          <StatsCard
            title="Check-ins Today"
            value={dashboardData.checkInToday}
            icon={<UserCheck className="w-5 h-5" />}
          />
          <StatsCard
            title="Check-outs Today"
            value={dashboardData.checkOutToday}
            icon={<Calendar className="w-5 h-5" />}
          />
          <StatsCard
            title="Reservations"
            value={dashboardData.totalReservations}
            icon={<ClipboardList className="w-5 h-5" />}
          />
        </div>

        {/* Main Content */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm min-h-screen">
          <CardHeader className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white rounded-t-lg">
            <div className="flex justify-between items-center gap-8">
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
          <CardContent className="p-0 pb-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 bg-gray-50 border-b">
                <TabsTrigger
                  value="guests"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Confirmed Reservations ({filteredConfirmed.length})
                </TabsTrigger>
                <TabsTrigger
                  value="reservations"
                  className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
                >
                  Reservations ({filteredReservations.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guests" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/5">
                          Guest Name
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/6">
                          Room
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/8">
                          Check-in
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/8">
                          Check-out
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/8">
                          Status
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/8">
                          Payment
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/6">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConfirmed.map((confirmed, index) => (
                        <tr
                          key={confirmed.id}
                          className={`group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-100 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                          }`}
                        >
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-semibold text-[#4F709C] group-hover:text-[#213555] transition-colors text-base">
                                {confirmed.customer.firstName}{" "}
                                {confirmed.customer.lastName}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {confirmed.customer.email}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 font-medium px-3 py-1 text-sm"
                            >
                              {`${confirmed.assignedRooms[0].room.roomNumber} (${confirmed.assignedRooms[0].room.roomType.name})`}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-700 font-medium">
                              {new Date(
                                confirmed.checkInDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-700 font-medium">
                              {new Date(
                                confirmed.checkOutDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge
                              className={`${getStatusColor(
                                confirmed.status
                              )} font-medium px-3 py-1 text-sm border`}
                            >
                              {confirmed.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <Badge
                              className={`${getStatusColor(
                                confirmed.paymentStatus
                              )} font-medium px-3 py-1 text-sm border`}
                            >
                              {confirmed.paymentStatus}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewConfirmed(confirmed)}
                                className="hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-lg p-2 group/btn"
                                title="View Guest"
                              >
                                <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditConfirmed(confirmed)}
                                className="hover:bg-amber-100 hover:text-amber-700 transition-all duration-200 rounded-lg p-2 group/btn"
                                title="Edit Guest"
                              >
                                <Edit className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-900 hover:bg-red-100 transition-all duration-200 rounded-lg p-2 group/btn"
                                title="Delete Guest"
                                onClick={() =>
                                  handleDeleteReservation(confirmed.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                              </Button>
                              {confirmed.status.toLowerCase() ===
                                "reserved" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600 hover:text-green-900 hover:bg-green-100 transition-all duration-200 rounded-lg p-2 group/btn"
                                  title="Check In"
                                >
                                  <CheckCircle className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="reservations" className="mt-0">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b-2 border-gray-200">
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/5">
                          Guest Name
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/7">
                          Room Type
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/8">
                          Check-in
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/8">
                          Check-out
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/10">
                          Guests
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/8">
                          Status
                        </th>
                        <th className="font-bold text-[#213555] py-4 px-6 text-sm uppercase tracking-wide text-left w-1/6">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReservations.map((reservation, index) => (
                        <tr
                          key={reservation.id}
                          className={`group hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border-b border-gray-100 ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                          }`}
                        >
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-semibold text-[#4F709C] group-hover:text-[#213555] transition-colors text-base">
                                {`${reservation.customer.firstName} ${reservation.customer.lastName}`}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {reservation.customer.email}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 border-blue-200 font-medium px-3 py-1 text-sm"
                            >
                              {reservation.assignedRooms[0]?.room.roomType.name}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-700 font-medium">
                              {new Date(
                                reservation.checkInDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-700 font-medium">
                              {new Date(
                                reservation.checkOutDate
                              ).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-700 font-bold text-center">
                              {reservation.adults + reservation.children}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <Badge
                              className={`${getStatusColor(
                                reservation.status
                              )} font-medium px-3 py-1 text-sm border`}
                            >
                              {reservation.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleViewReservation(reservation)
                                }
                                className="hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 rounded-lg p-2 group/btn"
                                title="View Reservation"
                              >
                                <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-amber-100 hover:text-amber-700 transition-all duration-200 rounded-lg p-2 group/btn"
                                title="Edit Reservation"
                                onClick={() => handleEditConfirmed(reservation)}
                              >
                                <Edit className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-900 hover:bg-red-100 transition-all duration-200 rounded-lg p-2 group/btn"
                                title="Cancel Reservation"
                                onClick={() =>
                                  handleDeleteReservation(reservation.id)
                                }
                              >
                                <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                              </Button>
                              {reservation.status.toLocaleLowerCase() ===
                                "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-green-600 hover:text-green-900 hover:bg-green-100 transition-all duration-200 rounded-lg p-2 group/btn"
                                  title="Confirm Reservation"
                                  onClick={() =>
                                    handleConfirmedReservation(reservation.id)
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                Confirmed Reservation Details
              </DialogTitle>
            </DialogHeader>
            {selectedConfirmed && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Guest Name
                    </Label>
                    <p className="font-medium">
                      {`${selectedConfirmed.customer.firstName} ${selectedConfirmed.customer.lastName}`}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Room
                    </Label>
                    <p className="font-medium">
                      {`${selectedConfirmed.assignedRooms[0].room.roomNumber} (${selectedConfirmed.assignedRooms[0]?.room.roomType.name})`}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Email
                    </Label>
                    <p>{selectedConfirmed.customer.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p>{selectedConfirmed.customer.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check-in
                    </Label>
                    <p>
                      {new Date(
                        selectedConfirmed.customer.email
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check-out
                    </Label>
                    <p>
                      {new Date(
                        selectedConfirmed.checkOutDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Status
                    </Label>
                    <Badge className={getStatusColor(selectedConfirmed.status)}>
                      {selectedConfirmed.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Payment Status
                    </Label>
                    <Badge
                      className={getStatusColor(
                        selectedConfirmed.paymentStatus
                      )}
                    >
                      {selectedConfirmed.paymentStatus}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Total Amount
                    </Label>
                    <p className="font-bold text-lg">
                      ${selectedConfirmed.totalAmount}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Total Guest
                    </Label>
                    <p>
                      {selectedConfirmed.adults + selectedConfirmed.children}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsViewGuestOpen(false)}
                  >
                    Close
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
            {selectedConfirmed && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editFullName"
                      className="text-[#213555] font-medium"
                    >
                      Guest Name
                    </Label>
                    <Input
                      id="editFullName"
                      defaultValue={`${selectedConfirmed.customer.firstName} ${selectedConfirmed.customer.lastName}`}
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
                      defaultValue={selectedConfirmed.customer.email}
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
                      defaultValue={selectedConfirmed.customer.phone}
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
                      defaultValue={
                        selectedConfirmed.assignedRooms[0].room.roomNumber
                      }
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="editGuestStatus"
                      className="text-[#213555] font-medium"
                    >
                      Status
                    </Label>
                    <select
                      id="editGuestStatus"
                      defaultValue={selectedConfirmed.status.toLowerCase()}
                      className="border-gray-200 rounded px-3 py-2 w-full focus:border-[#4F709C]"
                    >
                      <option value="checked-in">Checked In</option>
                      <option value="checked-out">Checked Out</option>
                      <option value="reserved">Reserved</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <Label
                      htmlFor="editPaymentStatus"
                      className="text-[#213555] font-medium"
                    >
                      Payment Status
                    </Label>
                    <select
                      id="editPaymentStatus"
                      defaultValue={selectedConfirmed.paymentStatus.toLocaleLowerCase()}
                      className="border-gray-200 rounded px-3 py-2 w-full focus:border-[#4F709C]"
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsEditGuestOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className=" bg-[#213555] hover:bg-[#4F709C] text-white"
                    onClick={handleUpdateReservation}
                  >
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
                      {selectedReservation.customer.firstName}{" "}
                      {selectedReservation.customer.lastName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Room Type
                    </Label>
                    <p className="font-medium">
                      {selectedReservation.assignedRooms[0]?.room.roomType.name}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Email
                    </Label>
                    <p>{selectedReservation.customer.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Phone
                    </Label>
                    <p>{selectedReservation.customer.phone}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check-in
                    </Label>
                    <p>
                      {new Date(
                        selectedReservation.checkInDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Check-out
                    </Label>
                    <p>
                      {new Date(
                        selectedReservation.checkOutDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Number of Guests
                    </Label>
                    <p>
                      {selectedReservation.children +
                        selectedReservation.adults}
                    </p>
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
                  <Button className=" bg-[#213555] hover:bg-[#4F709C] text-white">
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

function getStatusColor(status: string) {
  switch (status.toLocaleLowerCase()) {
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
}

export default FrontOfficePage;
