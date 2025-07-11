"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  Bed,
  Users,
  DollarSign,
  ImageIcon,
  ArrowLeft,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/TextArea";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Room, RoomType } from "@/lib/types";
import useRoomQuery from "@/hooks/queries/useRoomQuery";
import useRoomTypeQuery from "@/hooks/queries/useRoomTypeQuery";
import useRoomMutation from "@/hooks/mutations/useRoomMutation";
import useRoomTypeMutation from "@/hooks/mutations/useRoomTypeMutation";

const RoomSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("room-types");
  const [isAddRoomTypeOpen, setIsAddRoomTypeOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isEditRoomTypeOpen, setIsEditRoomTypeOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingRoomType, setEditingRoomType] = useState<RoomType | null>(null);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const { roomData, isLoading: isRoomsLoading } = useRoomQuery();
  const { roomTypeData, isLoading: isRoomTypesLoading } = useRoomTypeQuery();
  const { addRoomMutation, updateRoomMutation, deleteRoomMutation } =
    useRoomMutation();
  const {
    addRoomTypeMutation,
    updateRoomTypeMutation,
    deleteRoomTypeMutation,
  } = useRoomTypeMutation();

  useEffect(() => {
    if (!isRoomsLoading && !isRoomTypesLoading) {
      setIsLoading(false);
    }
  }, [isRoomsLoading, isRoomTypesLoading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setIsEditRoomOpen(true);
  };

  const handleAddUpdateRoom = () => {
    const roomField = {
      roomNumber: (
        document.getElementById("roomNumber") as HTMLInputElement | null
      )?.value,
      floor: (document.getElementById("floor") as HTMLInputElement | null)
        ?.value,
      roomTypeId: (
        document.getElementById("roomTypeSelect") as HTMLSelectElement | null
      )?.value,
      status: (document.getElementById("status") as HTMLSelectElement | null)
        ?.value,
      smoking:
        (document.getElementById("smoking") as HTMLSelectElement | null)
          ?.value === "true",
      notes: (document.getElementById("notes") as HTMLTextAreaElement | null)
        ?.value,
    };

    // Ensure required fields are filled
    if (
      !roomField.roomNumber ||
      !roomField.floor ||
      !roomField.roomTypeId ||
      !roomField.status
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // If editing an existing room, update it; otherwise, add a new room
    if (editingRoom) {
      // Update room
      updateRoomMutation.mutate(
        { ...editingRoom, ...roomField },
        {
          onSuccess: () => {
            setIsEditRoomOpen(false);
            setEditingRoom(null);
          },
        }
      );
    } else {
      // Add new room
      addRoomMutation.mutate(roomField, {
        onSuccess: () => {
          setIsAddRoomOpen(false);
          setEditingRoom(null);
        },
      });
    }
  };

  const handleDeleteRoom = (roomId: number) => {
    deleteRoomMutation.mutate(roomId, {
      onSuccess: () => {
        setEditingRoom(null);
      },
    });
  };

  const handleAddUpdateRoomType = () => {
    const roomTypeField = {
      name: (document.getElementById("roomTypeName") as HTMLInputElement | null)
        ?.value,
      description: (
        document.getElementById(
          "roomTypeDescription"
        ) as HTMLTextAreaElement | null
      )?.value,
      basePrice: parseFloat(
        (
          document.getElementById(
            "roomTypeBasePrice"
          ) as HTMLInputElement | null
        )?.value || "0"
      ),
      capacity: parseInt(
        (document.getElementById("roomTypeCapacity") as HTMLInputElement | null)
          ?.value || "0"
      ),
      maxOccupancy: parseInt(
        (
          document.getElementById(
            "roomTypeMaxOccupancy"
          ) as HTMLInputElement | null
        )?.value || "0"
      ),
      amenities: (
        document.getElementById("roomTypeAmenities") as HTMLInputElement | null
      )?.value.split(","),
    };

    // Ensure required fields are filled
    if (
      !roomTypeField.name ||
      !roomTypeField.basePrice ||
      !roomTypeField.capacity ||
      !roomTypeField.maxOccupancy
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    // If editing an existing room type, update it; otherwise, add a new room type
    if (editingRoomType) {
      // Update room type
      updateRoomTypeMutation.mutate(
        { ...editingRoomType, ...roomTypeField },
        {
          onSuccess: () => {
            setIsEditRoomTypeOpen(false);
            setEditingRoomType(null);
          },
        }
      );
    } else {
      // Add new room type
      addRoomTypeMutation.mutate(roomTypeField, {
        onSuccess: () => {
          setIsAddRoomTypeOpen(false);
          setEditingRoomType(null);
        },
      });
    }
  };

  const handleDeleteRoomType = (roomTypeId: number) => {
    deleteRoomTypeMutation.mutate(roomTypeId, {
      onSuccess: () => {
        setEditingRoomType(null);
      },
    });
  };

  const handleCloseRoomTypeModal = () => {
    setIsAddRoomTypeOpen(false);
    setIsEditRoomTypeOpen(false);
    setEditingRoomType(null);
  };

  const handleCloseRoomModal = () => {
    setIsAddRoomOpen(false);
    setIsEditRoomOpen(false);
    setEditingRoom(null);
  };

  const filteredRoomTypes = roomTypeData.filter((roomType) =>
    roomType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRooms = roomData.filter((room) =>
    room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Room Settings...
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
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/staff/settings")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-[#213555]">
                Room Settings
              </h1>
              <p className="text-gray-600 mt-2">
                Manage room types, amenities, and room numbers
              </p>
            </div>
          </div>

          {activeTab === "room-types" ? (
            <Button
              className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsAddRoomTypeOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Room Type
            </Button>
          ) : (
            <Button
              className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsAddRoomOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Room
            </Button>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={`Search ${
                activeTab === "room-types" ? "room types" : "rooms"
              }...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[250px] border-gray-200 focus:border-[#4F709C] focus:ring-[#4F709C] transition-all duration-200"
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Room Types
              </CardTitle>
              <Bed className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomTypeData.length}</div>
              <p className="text-xs opacity-80 mt-1">Available types</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Total Rooms
              </CardTitle>
              <Bed className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomData.length}</div>
              <p className="text-xs opacity-80 mt-1">All rooms</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Available Rooms
              </CardTitle>
              <Users className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {roomData.filter((room) => room.status === "Available").length}
              </div>
              <p className="text-xs opacity-80 mt-1">Ready for guests</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Avg Price
              </CardTitle>
              <DollarSign className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {formatCurrency(
                  roomTypeData.length > 0
                    ? Math.round(
                        roomTypeData.reduce(
                          (acc, type) => acc + type.basePrice,
                          0
                        ) / roomTypeData.length
                      )
                    : 0
                )}
              </div>
              <p className="text-xs opacity-80 mt-1">Average rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="room-types" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border">
            <TabsTrigger
              value="room-types"
              className="data-[state=active]:bg-[#213555] data-[state=active]:text-white"
            >
              Room Types
            </TabsTrigger>
            <TabsTrigger
              value="rooms"
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              Rooms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="room-types" className="space-y-4 mt-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  Room Types
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredRoomTypes.map((roomType) => (
                    <motion.div
                      key={roomType.id}
                      variants={itemVariants}
                      className="w-full"
                    >
                      <Card className="overflow-hidden border-secondary/10 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                          <img
                            src={roomType.images[0] || "/placeholder.svg"}
                            alt={roomType.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>

                        <CardHeader className="pb-3 flex-shrink-0">
                          <div className="grid grid-cols-2 items-center w-full">
                            <CardTitle className="text-lg font-semibold text-[#213555] justify-self-start">
                              {roomType.name}
                            </CardTitle>
                            <div className="justify-self-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  onClick={(e) => e.stopPropagation()}
                                  className="focus:outline-none"
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-[#213555] hover:bg-[#213555] hover:text-white transition-colors"
                                  >
                                    Actions
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-white shadow-md rounded-md"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAddUpdateRoomType();
                                    }}
                                  >
                                    <Pencil className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (
                                        window.confirm(
                                          "Are you sure you want to delete this room type?"
                                        )
                                      ) {
                                        handleDeleteRoomType(roomType.id);
                                      }
                                    }}
                                    className="text-red-600 cursor-pointer hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col justify-between pt-0">
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                              {roomType.description}
                            </p>

                            <div className="flex items-center justify-between py-2 border-t border-gray-100">
                              <div className="flex items-center gap-1">
                                <span className="font-semibold text-lg text-[#213555]">
                                  {formatCurrency(roomType.basePrice)}
                                </span>
                                <span className="text-xs text-gray-500">
                                  /night
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Users className="h-4 w-4 text-[#4F709C]" />
                                <span>{roomType.capacity} guests</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {roomType.amenities
                                .slice(0, 3)
                                .map((amenity, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="bg-[#213555]/5 border-[#213555]/20 text-xs py-1 px-2"
                                  >
                                    {amenity}
                                  </Badge>
                                ))}
                              {roomType.amenities.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="bg-[#4F709C]/10 border-[#4F709C]/30 text-xs py-1 px-2"
                                >
                                  +{roomType.amenities.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms" className="mt-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  Individual Rooms
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full table-fixed min-w-[800px]">
                    <thead>
                      <tr className="border-b border-secondary/10 bg-gray-50">
                        <th
                          className="text-left p-4 font-semibold text-[#213555]"
                          style={{ width: "14%" }}
                        >
                          Room Number
                        </th>
                        <th
                          className="text-left p-4 font-semibold text-[#213555]"
                          style={{ width: "18%" }}
                        >
                          Type
                        </th>
                        <th
                          className="text-left p-4 font-semibold text-[#213555]"
                          style={{ width: "10%" }}
                        >
                          Floor
                        </th>
                        <th
                          className="text-left p-4 font-semibold text-[#213555]"
                          style={{ width: "15%" }}
                        >
                          Status
                        </th>
                        <th
                          className="text-left p-4 font-semibold text-[#213555]"
                          style={{ width: "12%" }}
                        >
                          Smoking
                        </th>
                        <th
                          className="text-left p-4 font-semibold text-[#213555]"
                          style={{ width: "16%" }}
                        >
                          Last Cleaned
                        </th>
                        <th
                          className="text-right p-4 font-semibold text-[#213555]"
                          style={{ width: "15%" }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRooms.map((room) => (
                        <tr
                          key={room.id}
                          className="border-b border-secondary/10 hover:bg-blue-50 transition-colors duration-200"
                        >
                          <td className="p-4 truncate" style={{ width: "14%" }}>
                            <div className="flex items-center gap-2">
                              <Bed className="h-4 w-4 text-secondary flex-shrink-0" />
                              <span className="font-medium truncate">
                                {room.roomNumber}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 truncate" style={{ width: "18%" }}>
                            <span className="truncate block">
                              {room.roomType.name}
                            </span>
                          </td>
                          <td className="p-4" style={{ width: "10%" }}>
                            {room.floor}
                          </td>
                          <td className="p-4" style={{ width: "15%" }}>
                            <Badge
                              className={`
                              ${
                                room.status === "Available"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : ""
                              }
                              ${
                                room.status === "Occupied"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : ""
                              }
                              ${
                                room.status === "Cleaning"
                                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                  : ""
                              }
                              ${
                                room.status === "Maintenance"
                                  ? "bg-orange-100 text-orange-800 border-orange-200"
                                  : ""
                              }
                              ${
                                room.status === "Out of Order"
                                  ? "bg-red-100 text-red-800 border-red-200"
                                  : ""
                              }
                              ${
                                room.status === "Reserved"
                                  ? "bg-purple-100 text-purple-800 border-purple-200"
                                  : ""
                              }
                              text-xs px-2 py-1 font-medium whitespace-nowrap
                            `}
                            >
                              {room.status}
                            </Badge>
                          </td>
                          <td className="p-4" style={{ width: "12%" }}>
                            <span className="text-gray-600">No</span>
                          </td>
                          <td className="p-4" style={{ width: "16%" }}>
                            <span className="text-sm text-gray-600 block truncate">
                              {room.lastCleaned
                                ? new Date(
                                    room.lastCleaned
                                  ).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </td>
                          <td
                            className="p-4 text-right"
                            style={{ width: "15%" }}
                          >
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-[#213555] hover:bg-[#213555] hover:text-white transition-colors"
                                >
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-white shadow-md rounded-md"
                              >
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditRoom(room);
                                  }}
                                >
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit Room
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (
                                      window.confirm(
                                        "Are you sure you want to delete this room?"
                                      )
                                    ) {
                                      handleDeleteRoom(room.id);
                                    }
                                  }}
                                  className="text-red-600 cursor-pointer hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
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
        </Tabs>

        <Dialog
          open={isAddRoomTypeOpen || isEditRoomTypeOpen}
          onOpenChange={handleCloseRoomTypeModal}
          key={editingRoomType ? "edit-room-type" : "add-room-type"}
        >
          <DialogContent className="sm:max-w-[550px] bg-white border-0 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#213555] text-xl font-bold">
                {editingRoomType ? "Edit Room Type" : "Add New Room Type"}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {editingRoomType
                  ? "Modify this room type details"
                  : "Create a new room type with details and amenities."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#213555] font-medium">
                    Room Type Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Deluxe Room"
                    className="border-gray-200 focus:border-[#4F709C]"
                    defaultValue={editingRoomType?.name || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="basePrice"
                    className="text-[#213555] font-medium"
                  >
                    Base Price
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="basePrice"
                      type="number"
                      className="pl-8 border-gray-200 focus:border-[#4F709C]"
                      placeholder="150"
                      defaultValue={editingRoomType?.basePrice || ""}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="capacity"
                    className="text-[#213555] font-medium"
                  >
                    Capacity
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="capacity"
                      type="number"
                      className="pl-8 border-gray-200 focus:border-[#4F709C]"
                      placeholder="2"
                      defaultValue={editingRoomType?.capacity || ""}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="maxOccupancy"
                    className="text-[#213555] font-medium"
                  >
                    Max Occupancy
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="maxOccupancy"
                      type="number"
                      className="pl-8 border-gray-200 focus:border-[#4F709C]"
                      placeholder="3"
                      defaultValue={editingRoomType?.maxOccupancy || ""}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-[#213555] font-medium"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the room type..."
                  className="border-gray-200 focus:border-[#4F709C]"
                  defaultValue={editingRoomType?.description || ""}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="amenities"
                  className="text-[#213555] font-medium"
                >
                  Amenities (comma separated)
                </Label>
                <Input
                  id="amenities"
                  placeholder="Wi-Fi, TV, Air Conditioning, Mini Bar"
                  className="border-gray-200 focus:border-[#4F709C]"
                  defaultValue={editingRoomType?.amenities.join(", ") || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images" className="text-[#213555] font-medium">
                  Images
                </Label>
                <div className="border border-dashed border-secondary/20 rounded-md p-4 text-center cursor-pointer hover:bg-secondary/5 transition-colors">
                  <ImageIcon className="h-6 w-6 mx-auto text-gray-400" />
                  <p className="text-sm text-gray-500 mt-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleAddUpdateRoomType}
              >
                {editingRoomType ? "Update" : "Save"} Room Type
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isAddRoomOpen || isEditRoomOpen}
          onOpenChange={handleCloseRoomModal}
          key={editingRoomType ? "edit" : "add"}
        >
          <DialogContent className="sm:max-w-[550px] bg-white border-0 shadow-2xl">
            <div className="absolute right-4 top-4">
              <DialogClose onClick={handleCloseRoomModal}>
                <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </DialogClose>
            </div>
            <DialogHeader>
              <DialogTitle className="text-[#213555] text-xl font-bold">
                {editingRoom ? "Edit Room" : "Add New Room"}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                {editingRoom
                  ? "Modify this room details"
                  : "Create a new room with room number and details."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="roomNumber"
                    className="text-[#213555] font-medium"
                  >
                    Room Number
                  </Label>
                  <Input
                    id="roomNumber"
                    placeholder="e.g. 101"
                    className="border-gray-200 focus:border-[#4F709C]"
                    defaultValue={editingRoom?.roomNumber || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floor" className="text-[#213555] font-medium">
                    Floor
                  </Label>
                  <Input
                    id="floor"
                    type="number"
                    placeholder="1"
                    className="border-gray-200 focus:border-[#4F709C]"
                    defaultValue={editingRoom?.floor || ""}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="roomTypeSelect"
                  className="text-[#213555] font-medium"
                >
                  Room Type
                </Label>
                <select
                  id="roomTypeSelect"
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm focus:border-[#4F709C] focus:outline-none"
                  defaultValue={editingRoom?.roomType?.id || ""}
                >
                  <option value="" disabled>
                    Select a room type
                  </option>
                  {roomTypeData.map((rt) => (
                    <option key={rt.id} value={rt.id}>
                      {rt.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="status"
                    className="text-[#213555] font-medium"
                  >
                    Status
                  </Label>
                  <select
                    id="status"
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm focus:border-[#4F709C] focus:outline-none"
                    defaultValue={editingRoom?.status || "Available"}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Out of Order">Out of Order</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="smoking"
                    className="text-[#213555] font-medium"
                  >
                    Smoking
                  </Label>
                  <select
                    id="smoking"
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm focus:border-[#4F709C] focus:outline-none"
                    defaultValue={editingRoom ? "false" : "true"}
                  >
                    <option value="false">Non-Smoking</option>
                    <option value="true">Smoking</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-[#213555] font-medium">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes about this room..."
                  className="border-gray-200 focus:border-[#4F709C]"
                  defaultValue={editingRoom?.notes || ""}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleAddUpdateRoom}
              >
                {editingRoom ? "Update" : "Add"} Room
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RoomSettingsPage;
