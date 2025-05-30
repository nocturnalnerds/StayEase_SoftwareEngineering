"use client";

import type React from "react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { BookingFormData, RoomType } from "@/lib/types";
import { calculateTotalPrice } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, CreditCard, CheckCircle2 } from "lucide-react";
import "react-day-picker/dist/style.css";
import "../../styles/date.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/TextArea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateRangePicker from "@/components/customer/DateRangePicker";

interface BookingFormProps {
  selectedRoomType: RoomType;
  initialDates?: DateRange;
  onSubmit: (data: BookingFormData) => void;
  onBack?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedRoomType,
  initialDates,
  onSubmit,
  onBack,
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDates
  );
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [formStep, setFormStep] = useState<number>(0);

  const totalPrice =
    dateRange?.from && dateRange?.to
      ? calculateTotalPrice(selectedRoomType.id, dateRange.from, dateRange.to)
      : 0;

  const nights =
    dateRange?.from && dateRange?.to
      ? Math.ceil(
          (dateRange.to.getTime() - dateRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select check-in and check-out dates");
      return;
    }

    if (totalPrice <= 0) {
      alert("Invalid booking price. Please check your selection");
      return;
    }

    const bookingData: BookingFormData = {
      checkInDate: dateRange.from,
      checkOutDate: dateRange.to,
      adults,
      children,
      roomTypeId: selectedRoomType.id,
      specialRequests: specialRequests || undefined,
    };

    onSubmit(bookingData);
    nextStep();
  };

  const nextStep = () => {
    if (!dateRange?.from || !dateRange?.to) {
      alert("Please select check-in and check-out dates");
      return;
    }
    setFormStep(1);
  };

  const prevStep = () => {
    setFormStep(0);
  };

  const steps = [
    { icon: Calendar, label: "Dates" },
    { icon: Users, label: "Guests" },
    { icon: CreditCard, label: "Payment" },
    { icon: CheckCircle2, label: "Confirm" },
  ];

  return (
    <div className="w-full mx-auto p-4 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full"
      >
        <Card className="w-full border-2 border-slate-200 shadow-2xl bg-white rounded-2xl overflow-hidden backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white pb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 space-y-3">
              <CardTitle className="text-2xl font-bold tracking-tight">
                Complete Your Booking
              </CardTitle>
              <CardDescription className="text-blue-100 text-base">
                {selectedRoomType.name} - ${selectedRoomType.basePrice}/night
              </CardDescription>
            </div>

            {/* Progress Steps */}
            <div className="relative z-10 flex justify-between items-center mt-8 px-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2"
                >
                  <div
                    className={`rounded-full p-3 transition-all duration-500 transform ${
                      index <= formStep
                        ? "bg-yellow-400 text-gray-900 scale-110 shadow-lg"
                        : "bg-white/20 text-white/70 hover:bg-white/30"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold hidden sm:block tracking-wide">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-8 bg-gradient-to-b from-gray-50 to-white">
              <AnimatePresence mode="wait">
                {formStep === 0 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Date Selection */}
                    <div className="space-y-4">
                      <Label
                        htmlFor="date-range"
                        className="text-gray-800 font-semibold text-lg flex items-center gap-2"
                      >
                        <Calendar className="h-5 w-5 text-blue-600" />
                        Select Your Stay Dates
                      </Label>

                      <div className="w-full p-4 bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 [&_.rdp-button:hover]:!bg-blue-50">
                        <DateRangePicker
                          dateRange={dateRange}
                          onDateRangeChange={setDateRange}
                          placeholder="Pick check-in and check-out dates"
                        />
                      </div>

                      {dateRange?.from && dateRange?.to && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between text-sm bg-blue-50 border border-blue-200 p-4 rounded-xl"
                        >
                          <span className="flex items-center gap-2 text-blue-700 font-medium">
                            <Calendar className="h-4 w-4" />
                            {nights} {nights === 1 ? "night" : "nights"}{" "}
                            selected
                          </span>
                          <span className="font-bold text-blue-800 text-lg">
                            ${(selectedRoomType.basePrice * nights).toFixed(2)}
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Guest Selection */}
                    <div className="space-y-4">
                      <Label className="text-gray-800 font-semibold text-lg flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        Select Guests
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label
                            htmlFor="adults"
                            className="text-gray-700 font-medium text-sm"
                          >
                            Adults (18+)
                          </Label>
                          <Select
                            value={adults.toString()}
                            onValueChange={(value) =>
                              setAdults(Number.parseInt(value))
                            }
                          >
                            <SelectTrigger
                              id="adults"
                              className="w-full h-14 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-300 hover:border-gray-300 bg-white shadow-sm"
                            >
                              <div className="flex items-center gap-3">
                                <SelectValue placeholder="Select adults" />
                              </div>
                            </SelectTrigger>

                            <SelectContent className="rounded-xl border border-gray-200 shadow-xl bg-white z-50">
                              {[1, 2, 3, 4, 5, 6].map((num) => (
                                <SelectItem
                                  key={num}
                                  value={num.toString()}
                                  className="hover:bg-blue-50 focus:bg-blue-50 py-3 px-4 rounded-md transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <Users className="h-4 w-4 text-blue-600" />
                                    <span className="font-medium">
                                      {num} {num === 1 ? "Adult" : "Adults"}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label
                            htmlFor="children"
                            className="text-gray-700 font-medium text-sm"
                          >
                            Children (0-17)
                          </Label>
                          <Select
                            value={children.toString()}
                            onValueChange={(value) =>
                              setChildren(Number.parseInt(value))
                            }
                          >
                            <SelectTrigger
                              id="children"
                              className="w-full h-14 border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 rounded-xl transition-all duration-300 hover:border-gray-300 bg-white shadow-sm"
                            >
                              <div className="flex items-center gap-3">
                                <SelectValue placeholder="Select children" />
                              </div>
                            </SelectTrigger>

                            <SelectContent className="rounded-xl border border-gray-200 shadow-xl bg-white z-50">
                              {[0, 1, 2, 3, 4].map((num) => (
                                <SelectItem
                                  key={num}
                                  value={num.toString()}
                                  className="hover:bg-green-50 focus:bg-green-50 py-3 px-4 rounded-md transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <Users className="h-4 w-4 text-green-600" />
                                    <span className="font-medium">
                                      {num} {num === 1 ? "Child" : "Children"}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Special Requests */}
                    <div className="space-y-4">
                      <Label
                        htmlFor="special-requests"
                        className="text-gray-800 font-semibold text-lg"
                      >
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="special-requests"
                        placeholder="Tell us about any special requests, dietary requirements, accessibility needs, or room preferences..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full resize-none border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl min-h-[140px] transition-all duration-300 bg-white shadow-sm text-base p-4"
                      />
                    </div>

                    {/* Booking Summary */}
                    <motion.div
                      className="rounded-2xl bg-gradient-to-br from-gray-50 to-white p-6 space-y-5 border-2 border-gray-100 shadow-lg"
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-bold text-gray-900 text-xl flex items-center gap-2">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        Booking Summary
                      </h3>
                      <div className="space-y-4 text-base">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">
                            Check-in:
                          </span>
                          <span className="font-bold text-gray-900">
                            {dateRange?.from?.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">
                            Check-out:
                          </span>
                          <span className="font-bold text-gray-900">
                            {dateRange?.to?.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">
                            Guests:
                          </span>
                          <span className="font-bold text-gray-900">
                            {adults} adults
                            {children > 0 && `, ${children} children`}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">
                            Room ({nights} {nights === 1 ? "night" : "nights"})
                          </span>
                          <span className="font-bold text-gray-900">
                            ${selectedRoomType.basePrice} × {nights}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-4 mt-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-4 shadow-md">
                          <span className="font-bold text-lg">
                            Total Amount
                          </span>
                          <span className="font-bold text-2xl">
                            ${totalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 p-8 border-t-2 border-gray-100 bg-white">
              {formStep === 0 ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="w-full sm:w-auto h-12 px-8 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-semibold transition-all duration-300 rounded-xl"
                  >
                    Back to Rooms
                  </Button>
                  <Button
                    type="button"
                    className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={nextStep}
                    disabled={
                      !dateRange?.from ||
                      !dateRange?.to ||
                      !selectedRoomType?.basePrice ||
                      selectedRoomType.basePrice < 0 ||
                      totalPrice <= 0
                    }
                  >
                    Continue to Summary
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="w-full sm:w-auto h-12 px-8 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-semibold transition-all duration-300 rounded-xl"
                  >
                    Back to Dates
                  </Button>
                  <Button
                    type="button"
                    className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105"
                    onClick={handleSubmit}
                  >
                    Confirm Booking
                  </Button>
                </>
              )}
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingForm;
