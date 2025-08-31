"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react"; // Still useful for the icon

interface YearRangePickerProps {
  onYearChange: (range: { from?: Date; to?: Date }) => void;
  initialRange?: { from?: Date; to?: Date };
  className?: string;
  minYear?: number; // New prop for minimum selectable year
  maxYear?: number; // New prop for maximum selectable year
}

export function YearRangePicker({
  onYearChange,
  initialRange,
  className,
  minYear, // Destructure new props
  maxYear, // Destructure new props
}: YearRangePickerProps) {
  const currentYear = new Date().getFullYear();
  // Generate years based on minYear and maxYear props, or default to 1900 to current year
  const startYear = minYear !== undefined ? minYear : 1900;
  const endYear = maxYear !== undefined ? maxYear : currentYear;

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).reverse();

  const [fromYear, setFromYear] = React.useState<string | undefined>(
    initialRange?.from ? String(initialRange.from.getFullYear()) : undefined
  );
  const [toYear, setToYear] = React.useState<string | undefined>(
    initialRange?.to ? String(initialRange.to.getFullYear()) : undefined
  );

  // Effect to update internal state when initialRange prop changes (for reset)
  React.useEffect(() => {
    setFromYear(initialRange?.from ? String(initialRange.from.getFullYear()) : undefined);
    setToYear(initialRange?.to ? String(initialRange.to.getFullYear()) : undefined);
  }, [initialRange]);

  React.useEffect(() => {
    const fromDate = fromYear ? new Date(parseInt(fromYear), 0, 1) : undefined; // Jan 1st of fromYear
    const toDate = toYear ? new Date(parseInt(toYear), 11, 31, 23, 59, 59, 999) : undefined; // Dec 31st of toYear

    onYearChange({ from: fromDate, to: toDate });
  }, [fromYear, toYear, onYearChange]);

  const displayValue = React.useMemo(() => {
    if (fromYear && toYear) {
      return `${fromYear} - ${toYear}`;
    } else if (fromYear) {
      return `From ${fromYear}`;
    } else if (toYear) {
      return `To ${toYear}`;
    } else {
      return "Select year range";
    }
  }, [fromYear, toYear]);

  return (
    <div className={cn("grid gap-2", className)}> {/* Apply className here */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="year-range"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal", // Keep w-full for the button inside its container
              (!fromYear && !toYear) && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{displayValue}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex space-x-2">
            <Select value={fromYear} onValueChange={setFromYear}>
              <SelectTrigger className="w-[120px]"> {/* Made select triggers smaller */}
                <SelectValue placeholder="From Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={toYear} onValueChange={setToYear}>
              <SelectTrigger className="w-[120px]"> {/* Made select triggers smaller */}
                <SelectValue placeholder="To Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}