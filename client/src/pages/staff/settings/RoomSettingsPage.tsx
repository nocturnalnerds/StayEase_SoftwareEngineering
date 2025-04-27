"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  MoreHorizontal,
  Bed,
  Users,
  DollarSign,
  ImageIcon,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/staff/Layout";
import { roomTypeData, roomData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const RoomSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("room-types");
  const [isAddRoomTypeOpen, setIsAddRoomTypeOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);

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

  const filteredRoomTypes = roomTypeData.filter((roomType) =>
    roomType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRooms = roomData.filter((room) =>
    room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => navigate("/settings")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-primary">Room Settings</h1>
          </div>

          {activeTab === "room-types" ? (
            <Dialog
              open={isAddRoomTypeOpen}
              onOpenChange={setIsAddRoomTypeOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room Type
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Room Type</DialogTitle>
                  <DialogDescription>
                    Create a new room type with details and amenities.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Room Type Name</Label>
                      <Input id="name" placeholder="e.g. Deluxe Room" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="basePrice">Base Price</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="basePrice"
                          type="number"
                          className="pl-8"
                          placeholder="150"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <div className="relative">
                        <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="capacity"
                          type="number"
                          className="pl-8"
                          placeholder="2"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxOccupancy">Max Occupancy</Label>
                      <div className="relative">
                        <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="maxOccupancy"
                          type="number"
                          className="pl-8"
                          placeholder="3"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the room type..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amenities">
                      Amenities (comma separated)
                    </Label>
                    <Input
                      id="amenities"
                      placeholder="Wi-Fi, TV, Air Conditioning, Mini Bar"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="images">Images</Label>
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
                  <Button
                    variant="outline"
                    onClick={() => setIsAddRoomTypeOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    Save Room Type
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Room</DialogTitle>
                  <DialogDescription>
                    Create a new room with room number and details.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomNumber">Room Number</Label>
                      <Input id="roomNumber" placeholder="e.g. 101" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floor">Floor</Label>
                      <Input id="floor" type="number" placeholder="1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roomType">Room Type</Label>
                    <select
                      id="roomType"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-secondary/20"
                    >
                      {roomTypeData.map((roomType) => (
                        <option key={roomType.id} value={roomType.id}>
                          {roomType.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <select
                        id="status"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-secondary/20"
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
                      <Label htmlFor="smoking">Smoking</Label>
                      <select
                        id="smoking"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-secondary/20"
                      >
                        <option value="false">Non-Smoking</option>
                        <option value="true">Smoking</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any additional notes about this room..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddRoomOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90">
                    Save Room
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={`Search ${
                activeTab === "room-types" ? "room types" : "rooms"
              }...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 border-secondary/20"
            />
          </div>
          <Button variant="outline" size="icon" className="border-secondary/20">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="room-types" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="room-types">Room Types</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
          </TabsList>

          <TabsContent value="room-types" className="space-y-4 mt-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredRoomTypes.map((roomType) => (
                <motion.div key={roomType.id} variants={itemVariants}>
                  <Card className="overflow-hidden border-secondary/10 hover:shadow-md transition-shadow duration-300">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={roomType.images[0] || "/placeholder.svg"}
                        alt={roomType.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{roomType.name}</CardTitle>
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
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {roomType.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-secondary mr-1" />
                            <span className="font-medium">
                              {formatCurrency(roomType.basePrice)}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              /night
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-secondary mr-1" />
                            <span>{roomType.capacity} guests</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {roomType.amenities.slice(0, 3).map((amenity, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="bg-secondary/5 border-secondary/20"
                            >
                              {amenity}
                            </Badge>
                          ))}
                          {roomType.amenities.length > 3 && (
                            <Badge
                              variant="outline"
                              className="bg-secondary/5 border-secondary/20"
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
          </TabsContent>

          <TabsContent value="rooms" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-secondary/10">
                        <th className="text-left p-4 font-medium text-gray-500">
                          Room Number
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
                          Smoking
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
                            <Badge
                              className={`
                              ${
                                room.status === "Available"
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                              ${
                                room.status === "Occupied"
                                  ? "bg-blue-100 text-blue-800"
                                  : ""
                              }
                              ${
                                room.status === "Cleaning"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : ""
                              }
                              ${
                                room.status === "Maintenance"
                                  ? "bg-orange-100 text-orange-800"
                                  : ""
                              }
                              ${
                                room.status === "Out of Order"
                                  ? "bg-red-100 text-red-800"
                                  : ""
                              }
                              ${
                                room.status === "Reserved"
                                  ? "bg-purple-100 text-purple-800"
                                  : ""
                              }
                            `}
                            >
                              {room.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {room.isSmoking ? "Yes" : "No"}
                          </td>
                          <td className="p-4">
                            {room.lastCleaned
                              ? new Date(room.lastCleaned).toLocaleDateString()
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
                                  <Pencil className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
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
      </div>
    </Layout>
  );
};

export default RoomSettingsPage;
