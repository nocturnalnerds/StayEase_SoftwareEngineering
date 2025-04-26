"use client";

import React, { useState } from "react";
import type { DateRange } from "react-day-picker";
import type { RoomFilter } from "@/lib/types";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import DateRangePicker from "./DateRangePicker";
import { Input } from "@/components/ui/input";

interface RoomFilterProps {
  onFilterChange: (filters: RoomFilter) => void;
  amenities: string[];
  priceRange: [number, number];
}

const RoomFilterComponent: React.FC<RoomFilterProps> = ({
  onFilterChange,
  amenities,
  priceRange: [minPrice, maxPrice],
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState<number | undefined>(undefined);
  const [children, setChildren] = useState<number | undefined>(undefined);
  const [currentPriceRange, setCurrentPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    }
  };

  const handleApplyFilters = () => {
    setIsFiltering(true);

    onFilterChange({
      checkInDate: dateRange?.from,
      checkOutDate: dateRange?.to,
      adults,
      children,
      priceRange: currentPriceRange,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
    });

    setTimeout(() => setIsFiltering(false), 600);
  };

  const handleResetFilters = () => {
    setDateRange(undefined);
    setAdults(undefined);
    setChildren(undefined);
    setCurrentPriceRange([minPrice, maxPrice]);
    setSelectedAmenities([]);
    setSearchQuery("");

    onFilterChange({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="bg-primary text-whitey rounded-t-lg py-4">
          <CardTitle className="text-lg font-bold flex items-center">
            <SlidersHorizontal className="h-5 w-5 mr-2" />
            Filter Rooms
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by room name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-secondary/20 focus-visible:ring-secondary"
            />
          </div>

          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Label className="text-primary font-medium">Stay Dates</Label>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Label
                htmlFor="adults-filter"
                className="text-primary font-medium"
              >
                Adults
              </Label>
              <Select
                value={adults?.toString() || ""}
                onValueChange={(value) =>
                  setAdults(value ? Number.parseInt(value) : undefined)
                }
              >
                <SelectTrigger
                  id="adults-filter"
                  className="border-secondary/20"
                >
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="border-secondary/20">
                  <SelectItem value="any">Any</SelectItem>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Label
                htmlFor="children-filter"
                className="text-primary font-medium"
              >
                Children
              </Label>
              <Select
                value={children?.toString() || ""}
                onValueChange={(value) =>
                  setChildren(value ? Number.parseInt(value) : undefined)
                }
              >
                <SelectTrigger
                  id="children-filter"
                  className="border-secondary/20"
                >
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="border-secondary/20">
                  <SelectItem value="any">Any</SelectItem>
                  {[0, 1, 2, 3].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </div>

          <motion.div
            className="space-y-3"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between">
              <Label className="text-primary font-medium">Price Range</Label>
              <span className="text-sm font-medium text-secondary">
                ${currentPriceRange[0]} - ${currentPriceRange[1]}
              </span>
            </div>
            <Slider
              defaultValue={[minPrice, maxPrice]}
              min={minPrice}
              max={maxPrice}
              step={10}
              value={currentPriceRange}
              onValueChange={(value) =>
                setCurrentPriceRange(value as [number, number])
              }
              className="py-4"
            />
          </motion.div>

          <motion.div
            className="space-y-3"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <Label className="text-primary font-medium">Amenities</Label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
              {amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={selectedAmenities.includes(amenity)}
                    onCheckedChange={(checked) =>
                      handleAmenityChange(amenity, checked as boolean)
                    }
                    className="border-secondary/30 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                  />
                  <label
                    htmlFor={`amenity-${amenity}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-between pt-2 gap-3">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="border-secondary/20 hover:bg-secondary/5 text-secondary font-medium transition-all duration-300"
            >
              Reset
            </Button>
            <Button
              className="bg-secondary hover:bg-primary text-whitey font-medium flex-1 transition-all duration-300"
              onClick={handleApplyFilters}
              disabled={isFiltering}
            >
              {isFiltering ? (
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
                  Filtering...
                </span>
              ) : (
                "Apply Filters"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RoomFilterComponent;
