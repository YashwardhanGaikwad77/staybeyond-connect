
import React from "react";

interface BookingSummaryProps {
  nights: number;
  price: number;
  currency: string;
  subtotal: number;
  serviceFee: number;
  taxesFee: number;
  total: number;
}

const BookingSummary = ({ 
  nights, 
  price, 
  currency, 
  subtotal, 
  serviceFee, 
  taxesFee, 
  total 
}: BookingSummaryProps) => {
  const currencySymbol = currency === "INR" ? "₹" : "$";
  
  return (
    <div className="mt-4 space-y-3 text-sm">
      <div className="flex justify-between">
        <span className="underline">
          {currencySymbol}
          {price.toLocaleString()} x {nights} nights
        </span>
        <span>
          {currencySymbol}
          {subtotal.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="underline">Service fee</span>
        <span>
          {currencySymbol}
          {serviceFee.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="underline">Taxes (18%)</span>
        <span>
          {currencySymbol}
          {taxesFee.toLocaleString()}
        </span>
      </div>
      <div className="border-t border-border pt-3 flex justify-between font-medium">
        <span>Total</span>
        <span>
          {currencySymbol}
          {total.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default BookingSummary;
