
import React from "react";

interface GuestSelectorProps {
  guests: number;
  maxGuests: number;
  onGuestsChange: (guests: number) => void;
}

const GuestSelector = ({ guests, maxGuests, onGuestsChange }: GuestSelectorProps) => {
  return (
    <div className="flex items-center justify-between p-3">
      <label htmlFor="guests" className="text-sm">
        Guests
      </label>
      <select
        id="guests"
        value={guests}
        onChange={(e) => onGuestsChange(parseInt(e.target.value))}
        className="rounded-md border-border bg-transparent p-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
      >
        {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num} {num === 1 ? "guest" : "guests"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GuestSelector;
