"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  Tag,
  Calendar,
  Percent,
  Hotel,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { discountRateData, roomTypeData } from "@/lib/data";
import { formatDate } from "@/lib/utils";

const DiscountRatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
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

  const filteredDiscounts = discountRateData.filter(
    (discount) =>
      discount.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discount.roomType.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4F709C] border-t-[#213555] rounded-full animate-spin mx-auto"></div>
          <p className="mt-6 text-[#213555] font-medium animate-pulse">
            Loading Discount Rates...
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
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => navigate("/staff/settings")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-[#213555]">
                Discount Rates
              </h1>
              <p className="text-gray-600 mt-2">
                Manage special offers and promotional rates
              </p>
            </div>
          </div>

          <Dialog open={isAddDiscountOpen} onOpenChange={setIsAddDiscountOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" />
                Add Discount
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] bg-white border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-[#213555] text-xl font-bold">
                  Add New Discount Rate
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Create a new discount rate for room bookings.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-[#213555] font-medium"
                    >
                      Discount Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Summer Special"
                      className="border-gray-200 focus:border-[#4F709C]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="ratePercentage"
                      className="text-[#213555] font-medium"
                    >
                      Discount Percentage
                    </Label>
                    <div className="relative">
                      <Percent className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="ratePercentage"
                        type="number"
                        className="pl-8 border-gray-200 focus:border-[#4F709C]"
                        placeholder="15"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="roomType"
                    className="text-[#213555] font-medium"
                  >
                    Room Type
                  </Label>
                  <select
                    id="roomType"
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-sm focus:border-[#4F709C] focus:outline-none"
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
                    <Label
                      htmlFor="startDate"
                      className="text-[#213555] font-medium"
                    >
                      Start Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="startDate"
                        type="date"
                        className="pl-8 border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="endDate"
                      className="text-[#213555] font-medium"
                    >
                      End Date
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="endDate"
                        type="date"
                        className="pl-8 border-gray-200 focus:border-[#4F709C]"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="minNights"
                    className="text-[#213555] font-medium"
                  >
                    Minimum Nights
                  </Label>
                  <Input
                    id="minNights"
                    type="number"
                    placeholder="2"
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
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
                    placeholder="Describe the discount rate..."
                    className="border-gray-200 focus:border-[#4F709C]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="isActive" defaultChecked />
                  <Label
                    htmlFor="isActive"
                    className="text-[#213555] font-medium"
                  >
                    Discount is active
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDiscountOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-[#213555] hover:bg-[#4F709C] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  Save Discount
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search discounts..."
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
                Total Discounts
              </CardTitle>
              <Tag className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {discountRateData.length}
              </div>
              <p className="text-xs opacity-80 mt-1">All discount rates</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Active Discounts
              </CardTitle>
              <Check className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {discountRateData.filter((d) => d.isActive).length}
              </div>
              <p className="text-xs opacity-80 mt-1">Currently active</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Average Discount
              </CardTitle>
              <Percent className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(
                  discountRateData.reduce(
                    (acc, d) => acc + d.ratePercentage,
                    0
                  ) / discountRateData.length
                )}
                %
              </div>
              <p className="text-xs opacity-80 mt-1">Average rate</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">
                Room Types
              </CardTitle>
              <Hotel className="h-5 w-5 opacity-80" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{roomTypeData.length}</div>
              <p className="text-xs opacity-80 mt-1">Available types</p>
            </CardContent>
          </Card>
        </div>

        {/* Discount Cards */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#213555] to-[#4F709C] text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Discount Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredDiscounts.map((discount) => (
                <motion.div key={discount.id} variants={itemVariants}>
                  <Card className="overflow-hidden border-secondary/10 hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                              discount.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <Tag className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {discount.name}
                            </CardTitle>
                            <p className="text-sm text-gray-500">
                              {discount.roomType.name}
                            </p>
                          </div>
                        </div>
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
                            <DropdownMenuItem>
                              {discount.isActive ? (
                                <>
                                  <X className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <Check className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
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
                        <div className="flex items-center justify-between">
                          <Badge className="bg-tertiary text-blacky">
                            <Percent className="h-3 w-3 mr-1" />
                            {discount.ratePercentage}% Off
                          </Badge>
                          <Badge
                            className={
                              discount.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {discount.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-500">
                          {discount.description}
                        </p>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-500">Valid From</p>
                            <p className="font-medium">
                              {formatDate(discount.startDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Valid Until</p>
                            <p className="font-medium">
                              {formatDate(discount.endDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-secondary/10">
                          <div className="flex items-center">
                            <Hotel className="h-4 w-4 text-secondary mr-1" />
                            <span className="text-sm">
                              Min {discount.minNights} nights
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-secondary/20 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                          >
                            <Pencil className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredDiscounts.length === 0 && (
              <div className="text-center py-12">
                <Tag className="h-12 w-12 mx-auto text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No discount rates found
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search or add a new discount rate.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiscountRatesPage;
