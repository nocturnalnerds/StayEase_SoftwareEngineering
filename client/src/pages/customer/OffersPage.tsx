"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RoomType, RoomFilter } from "@/lib/types";
import { roomTypes, getAvailableRoomTypes, discountRates } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

import RoomCard from "@/components/customer/RoomCard";
import RoomFilterComponent from "@/components/customer/RoomFilter";
import Heading from "@/components/general/Heading";

const OffersPage: React.FC = () => {
  const navigate = useNavigate();
  const [availableRoomTypes, setAvailableRoomTypes] =
    useState<RoomType[]>(roomTypes);
  const [filters, setFilters] = useState<RoomFilter>({});
  const [loading, setLoading] = useState<boolean>(false);

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
        filters.checkInDate,
        filters.checkOutDate,
        filters.adults,
        filters.children
      );

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
  }, [filters]);

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

  return (
    <section className="offers pt-[70px]">
      <Heading
        image={"/images/offers.avif"}
        title="Offers Page"
        description="Explore a range of meticulously curated hotel room types, each designed to elevate your stay with a perfect blend of comfort"
      />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="sticky top-4">
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
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
                  className="bg-whitey rounded-lg p-8 text-center shadow-md"
                >
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    No Rooms Available
                  </h3>
                  <p className="text-gray-600 mb-4">
                    No rooms match your current filters. Please try adjusting
                    your search criteria.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => setFilters({})}
                      className="bg-secondary hover:bg-primary text-whitey py-2 px-4 rounded-md transition-colors duration-300"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersPage;
