"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";

interface DateRangePickerProps {
  dateRange?: DateRange;
  onDateRangeChange: (range?: DateRange) => void;
  placeholder?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateRangeChange,
  placeholder,
}) => {
  return (
    <DayPicker
      mode="range"
      selected={dateRange}
      onSelect={onDateRangeChange}
      footer={placeholder}
    />
  );
};

export default DateRangePicker;
