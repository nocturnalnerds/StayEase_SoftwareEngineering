"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RoomType, RoomFilter } from "@/lib/types";
import { roomTypes, getAvailableRoomTypes, discountRates } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hotel, Filter } from "lucide-react";

import RoomCard from "@/components/customer/RoomCard";
import RoomFilterComponent from "@/components/customer/RoomFilter";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OffersPage: React.FC = () => {
  const navigate = useNavigate();
  const [availableRoomTypes, setAvailableRoomTypes] =
    useState<RoomType[]>(roomTypes);
  const [filters, setFilters] = useState<RoomFilter>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique amenities from room types
  const allAmenities = Array.from(
    new Set(roomTypes.flatMap((room) => room.amenities))
  ).sort();

  // Get min and max prices
  const minPrice = Math.min(...roomTypes.map((room) => room.basePrice));
  const maxPrice = Math.max(...roomTypes.map((room) => room.basePrice));

  useEffect(() => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      let filteredRooms = getAvailableRoomTypes(
        filters.checkInDate instanceof Date ? filters.checkInDate : undefined,
        filters.checkOutDate instanceof Date ? filters.checkOutDate : undefined
      );

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredRooms = filteredRooms.filter(
          (room) =>
            room.name.toLowerCase().includes(query) ||
            room.description.toLowerCase().includes(query) ||
            room.amenities.some((amenity) =>
              amenity.toLowerCase().includes(query)
            )
        );
      }

      // Filter by price range
      if (filters.priceRange) {
        filteredRooms = filteredRooms.filter(
          (room) =>
            room.basePrice >= filters.priceRange![0] &&
            room.basePrice <= filters.priceRange![1]
        );
      }

      // Filter by amenities
      if (filters.amenities && filters.amenities.length > 0) {
        filteredRooms = filteredRooms.filter((room) =>
          filters.amenities!.every((amenity) =>
            room.amenities.includes(amenity)
          )
        );
      }

      setAvailableRoomTypes(filteredRooms);
      setLoading(false);
    }, 800);
  }, [filters, searchQuery]);

  const handleRoomSelect = (roomTypeId: number) => {
    // Navigate to booking page with selected room type and dates if available
    navigate(`/booking/${roomTypeId}`, {
      state: {
        checkInDate: filters.checkInDate,
        checkOutDate: filters.checkOutDate,
        adults: filters.adults,
        children: filters.children,
      },
    });
  };

  const handleFilterChange = (newFilters: RoomFilter) => {
    setFilters(newFilters);
  };

  // Get discount percentage for a room type if available
  const getDiscountPercentage = (roomTypeId: number): number | undefined => {
    const discount = discountRates.find(
      (dr) => dr.roomTypeId === roomTypeId && dr.isActive
    );
    return discount?.ratePercentage;
  };

  // Count active filters
  const activeFilterCount = Object.values(filters).filter((value) => {
    if (Array.isArray(value) && value.length === 0) return false;
    return value !== undefined;
  }).length;

  return (
    <div className="bg-whitey min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-8 pt-4 md:pt-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center md:justify-start mt-[80px]">
            <Hotel className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold text-primary">Available Rooms</h1>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 mt-[70px]">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-secondary/20 focus-visible:ring-secondary w-full"
              />
            </div>
            <Button
              className="bg-secondary text-whitey md:hidden w-full sm:w-auto"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <Badge className="ml-1 bg-tertiary text-blacky h-5 w-5 p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div
            className={`lg:col-span-1 ${
              showFilters ? "block" : "hidden"
            } md:block w-full h-full`}
          >
            <div className="w-full h-full">
              <RoomFilterComponent
                onFilterChange={handleFilterChange}
                amenities={allAmenities}
                priceRange={[minPrice, maxPrice]}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center h-64"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Hotel className="h-6 w-6 text-secondary" />
                      </div>
                    </div>
                    <p className="mt-4 text-primary font-medium">
                      Finding perfect rooms for you...
                    </p>
                  </div>
                </motion.div>
              ) : availableRoomTypes.length > 0 ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {availableRoomTypes.map((roomType, index) => (
                      <motion.div
                        key={roomType.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <RoomCard
                          roomType={roomType}
                          onSelect={handleRoomSelect}
                          discountPercentage={getDiscountPercentage(
                            roomType.id
                          )}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="no-results"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-lg p-8 text-center shadow-md"
                >
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-secondary/10 p-4">
                      <Search className="h-8 w-8 text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    No Rooms Available
                  </h3>
                  <p className="text-gray-600 mb-6">
                    No rooms match your current filters. Please try adjusting
                    your search criteria.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => {
                        setFilters({});
                        setSearchQuery("");
                      }}
                      className="bg-secondary hover:bg-primary text-whitey py-2 px-6 rounded-md transition-colors duration-300"
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
