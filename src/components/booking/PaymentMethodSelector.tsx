
import React from "react";

interface PaymentMethodSelectorProps {
  paymentMethod: "default" | "razorpay";
  onPaymentMethodChange: (method: "default" | "razorpay") => void;
}

const PaymentMethodSelector = ({ 
  paymentMethod, 
  onPaymentMethodChange 
}: PaymentMethodSelectorProps) => {
  return (
    <div className="flex items-center justify-between mb-2">
      <label htmlFor="payment-method" className="text-sm font-medium">
        Payment Method
      </label>
      <select
        id="payment-method"
        value={paymentMethod}
        onChange={(e) => onPaymentMethodChange(e.target.value as "default" | "razorpay")}
        className="rounded-md border-border bg-transparent p-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
      >
        <option value="default">Pay Later</option>
        <option value="razorpay">Razorpay</option>
      </select>
    </div>
  );
};

export default PaymentMethodSelector;
