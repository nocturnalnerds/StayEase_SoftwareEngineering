"use client";

import type React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateRangeChange,
  className,
}) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border-secondary/20 hover:bg-secondary/5 transition-all duration-300",
              !dateRange && "text-muted-foreground"
            )}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="mr-2"
            >
              <CalendarIcon className="h-4 w-4 text-secondary" />
            </motion.div>
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Select dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-secondary/20"
          align="start"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              className="rounded-md border-secondary/20"
            />
          </motion.div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
