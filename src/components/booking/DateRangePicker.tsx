
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
  nights: number;
}

const DateRangePicker = ({ 
  startDate, 
  endDate, 
  onDateChange,
  nights 
}: DateRangePickerProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpenChange = (open: boolean) => {
    setIsPopoverOpen(open);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate)) {
      onDateChange(date, undefined);
    } else {
      if (date && date >= startDate) {
        onDateChange(startDate, date);
        setIsPopoverOpen(false);
      } else {
        onDateChange(date, undefined);
      }
    }
  };

  return (
    <div className="rounded-t-md border border-border overflow-hidden">
      <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between p-3 text-left text-sm transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center">
              <CalendarIcon size={16} className="mr-2 text-muted-foreground" />
              <div>
                {startDate && endDate ? (
                  <span>
                    {format(startDate, "MMM dd")} → {format(endDate, "MMM dd")}
                  </span>
                ) : startDate ? (
                  <span>
                    {format(startDate, "MMM dd")} → Select end date
                  </span>
                ) : (
                  <span className="text-muted-foreground">Select dates</span>
                )}
              </div>
            </div>
            <span className="text-muted-foreground">
              {nights > 0 ? `${nights} nights` : ""}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={startDate || new Date()}
            selected={{
              from: startDate,
              to: endDate,
            }}
            onDayClick={handleDateSelect}
            numberOfMonths={2}
            disabled={(date) => date < new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
