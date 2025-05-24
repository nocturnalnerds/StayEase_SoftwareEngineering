"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DateRange } from "react-day-picker";
import type { BookingFormData, RoomType } from "@/lib/types";
import { calculateTotalPrice } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, CreditCard, CheckCircle2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
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
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedRoomType,
  initialDates,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDates
  );
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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

    setIsSubmitting(true);

    const formData: BookingFormData = {
      checkInDate: dateRange.from,
      checkOutDate: dateRange.to,
      adults,
      children,
      roomTypeId: selectedRoomType.id,
      specialRequests: specialRequests || undefined,
    };

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1000);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="w-full border-none shadow-lg overflow-hidden">
        <CardHeader className="bg-primary text-whitey rounded-t-lg pb-4">
          <CardTitle className="text-xl font-bold">
            Complete Your Booking
          </CardTitle>
          <CardDescription className="text-whitey/90">
            {selectedRoomType.name} - ${selectedRoomType.basePrice}/night
          </CardDescription>

          <div className="flex justify-between items-center mt-4 px-2">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`rounded-full p-2 ${
                    index <= formStep
                      ? "bg-tertiary text-blacky"
                      : "bg-whitey/20 text-whitey/60"
                  } transition-all duration-300`}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1 font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-6">
            <AnimatePresence mode="wait">
              {formStep === 0 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="date-range"
                      className="text-primary font-medium"
                    >
                      Select Dates
                    </Label>
                    <DateRangePicker
                      dateRange={dateRange}
                      onDateRangeChange={setDateRange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="adults"
                        className="text-primary font-medium"
                      >
                        Adults
                      </Label>
                      <Select
                        value={adults.toString()}
                        onValueChange={(value) =>
                          setAdults(Number.parseInt(value))
                        }
                      >
                        <SelectTrigger
                          id="adults"
                          className="border-secondary/20"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border-secondary/20">
                          {[1, 2, 3, 4].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="children"
                        className="text-primary font-medium"
                      >
                        Children
                      </Label>
                      <Select
                        value={children.toString()}
                        onValueChange={(value) =>
                          setChildren(Number.parseInt(value))
                        }
                      >
                        <SelectTrigger
                          id="children"
                          className="border-secondary/20"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="border-secondary/20">
                          {[0, 1, 2, 3].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="special-requests"
                      className="text-primary font-medium"
                    >
                      Special Requests (Optional)
                    </Label>
                    <Textarea
                      id="special-requests"
                      placeholder="Any special requests or requirements?"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="resize-none border-secondary/20 min-h-[100px]"
                    />
                  </div>

                  <motion.div
                    className="rounded-lg bg-whitey p-5 space-y-3 border border-secondary/10"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-semibold text-primary text-lg">
                      Booking Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center py-1 border-b border-secondary/10">
                        <span className="text-gray-600">Check-in:</span>
                        <span className="font-medium text-blacky">
                          {dateRange?.from?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-secondary/10">
                        <span className="text-gray-600">Check-out:</span>
                        <span className="font-medium text-blacky">
                          {dateRange?.to?.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-secondary/10">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium text-blacky">
                          {adults} adults, {children} children
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-secondary/10">
                        <span className="text-gray-600">
                          Room ({nights} {nights === 1 ? "night" : "nights"})
                        </span>
                        <span className="font-medium text-blacky">
                          ${selectedRoomType.basePrice} × {nights}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 mt-2">
                        <span className="font-bold text-primary text-base">
                          Total
                        </span>
                        <span className="font-bold text-primary text-base">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex justify-between py-4 border-t border-secondary/10">
            {formStep === 0 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/offers")}
                  className="border-secondary/20 hover:bg-secondary/5 text-secondary transition-all duration-300"
                >
                  Back to Rooms
                </Button>
                <Button
                  type="button"
                  className="bg-secondary hover:bg-primary text-whitey font-medium transition-all duration-300"
                  onClick={nextStep}
                  disabled={!dateRange?.from || !dateRange?.to}
                >
                  Continue
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="border-secondary/20 hover:bg-secondary/5 text-secondary transition-all duration-300"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="bg-secondary hover:bg-primary text-whitey font-medium transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </>
            )}
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
};

export default BookingForm;
