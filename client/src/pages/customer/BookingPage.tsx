"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import type { DateRange } from "react-day-picker";
import type { BookingFormData, RoomType } from "@/lib/types";
import { roomTypes } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Star, Wifi, Coffee, Tv, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookingForm from "@/components/customer/BookingForm";

const BookingPage: React.FC = () => {
  const { roomTypeId } = useParams<{ roomTypeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);

  // Get dates from location state if available
  const initialDates: DateRange | undefined =
    location.state?.checkInDate && location.state?.checkOutDate
      ? {
          from: new Date(location.state.checkInDate),
          to: new Date(location.state.checkOutDate),
        }
      : undefined;

  useEffect(() => {
    if (!roomTypeId) {
      navigate("/offers");
      return;
    }

    // Simulate API call to get room type details
    setLoading(true);
    setTimeout(() => {
      const roomType = roomTypes.find(
        (rt) => rt.id === Number.parseInt(roomTypeId)
      );

      if (roomType) {
        setSelectedRoomType(roomType);
      } else {
        navigate("/offers");
      }

      setLoading(false);
    }, 500);
  }, [roomTypeId, navigate]);

  const handleBookingSubmit = (data: BookingFormData) => {
    // Simulate API call to create booking
    setTimeout(() => {
      setBookingData(data);
      setBookingSuccess(true);

      // In a real app, you would redirect to a confirmation page or show a success message
      // For now, we'll just show a success message in this component
    }, 1000);
  };

  // Helper function to get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes("wifi")) return <Wifi className="h-4 w-4" />;
    if (amenityLower.includes("coffee")) return <Coffee className="h-4 w-4" />;
    if (amenityLower.includes("tv")) return <Tv className="h-4 w-4" />;
    if (amenityLower.includes("capacity") || amenityLower.includes("guest"))
      return <Users className="h-4 w-4" />;
    return <Check className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Users className="h-6 w-6 text-secondary" />
          </div>
        </div>
      </div>
    );
  }

  if (bookingSuccess && bookingData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-2xl mx-auto border-none shadow-lg">
            <CardContent className="pt-6 pb-8 text-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="h-10 w-10 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Thank you for your reservation. We've sent a confirmation email
                with all the details.
              </p>

              <div className="bg-whitey rounded-lg p-6 mb-6 text-left shadow-sm border border-secondary/10">
                <h3 className="font-semibold text-primary mb-4 text-lg">
                  Booking Details:
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-secondary/10">
                    <span className="text-gray-600">Room:</span>
                    <span className="font-medium text-blacky">
                      {selectedRoomType?.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-secondary/10">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium text-blacky">
                      {bookingData.checkInDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-secondary/10">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium text-blacky">
                      {bookingData.checkOutDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-secondary/10">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium text-blacky">
                      {bookingData.adults} adults, {bookingData.children}{" "}
                      children
                    </span>
                  </div>
                  {bookingData.specialRequests && (
                    <div className="py-2">
                      <span className="text-gray-600 block mb-1">
                        Special Requests:
                      </span>
                      <span className="font-medium text-blacky">
                        {bookingData.specialRequests}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => navigate("/")}
                  className="bg-secondary hover:bg-primary text-whitey"
                >
                  Return to Homepage
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/offers")}
                  className="border-secondary/20 hover:bg-secondary/5 text-secondary"
                >
                  Browse More Rooms
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!selectedRoomType) {
    return null;
  }

  return (
    <div className="bg-whitey min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-7xl h-full">
        <Button
          variant="ghost"
          onClick={() => navigate("/offers")}
          className="mb-6 text-secondary hover:text-primary hover:bg-secondary/5"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Rooms
        </Button>

        <motion.h1
          className="text-3xl font-bold text-primary mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Complete Your Booking
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[800px]">
          <motion.div
            className="h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
           
              <div className="rounded-lg overflow-hidden mb-6 shadow-lg flex-shrink-0">
                <img
                  src={selectedRoomType.images[0] || "/placeholder.svg"}
                  alt={selectedRoomType.name}
                  className="w-full h-60 md:h-72 object-cover rounded-md"
                />
              </div>
        

            <div className="bg-white rounded-lg p-6 shadow-md space-y-6 flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    {selectedRoomType.name}
                  </h2>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= 4
                              ? "text-tertiary fill-tertiary"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      4.8 (120 reviews)
                    </span>
                  </div>
                </div>
                <Badge className="bg-secondary text-whitey text-sm px-3 py-1.5 rounded-md">
                  ${selectedRoomType.basePrice}/night
                </Badge>
              </div>

              <p className="text-gray-700">{selectedRoomType.description}</p>

              <div>
                <h3 className="font-semibold text-primary mb-3">
                  Room Amenities:
                </h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {selectedRoomType.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="mr-2 text-secondary">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-3">
                  Room Details:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-whitey p-3 rounded-md">
                    <span className="text-sm text-gray-500 block">
                      Capacity
                    </span>
                    <span className="font-medium">
                      {selectedRoomType.capacity} guests
                    </span>
                  </div>
                  <div className="bg-whitey p-3 rounded-md">
                    <span className="text-sm text-gray-500 block">
                      Max Occupancy
                    </span>
                    <span className="font-medium">
                      {selectedRoomType.maxOccupancy} people
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
          className="h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full h-full">
              <BookingForm
                selectedRoomType={selectedRoomType}
                initialDates={initialDates}
                onSubmit={handleBookingSubmit}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
