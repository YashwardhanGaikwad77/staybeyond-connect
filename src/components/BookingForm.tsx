import { useState } from "react";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import RazorpayCheckout from "./RazorpayCheckout";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BookingFormProps {
  price: number;
  currency: string;
  maxGuests: number;
  bedrooms: number;
  onClose?: () => void;
  stayId: string;
  stayName: string;
  stayLocation: string;
  stayImage: string;
}

const BookingForm = ({
  price,
  currency,
  maxGuests,
  bedrooms,
  onClose,
  stayId,
  stayName,
  stayLocation,
  stayImage,
}: BookingFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"default" | "razorpay">("default");
  const [bookingCreated, setBookingCreated] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const calculateNights = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const nights = calculateNights();
  const subtotal = nights * price;
  const serviceFee = Math.round(subtotal * 0.12);
  const taxesFee = Math.round(subtotal * 0.18);
  const total = subtotal + serviceFee + taxesFee;

  const handlePopoverOpenChange = (open: boolean) => {
    setIsPopoverOpen(open);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(undefined);
    } else {
      if (date && date >= startDate) {
        setEndDate(date);
        setIsPopoverOpen(false);
      } else {
        setStartDate(date);
        setEndDate(undefined);
      }
    }
  };

  const saveBooking = async (paymentId?: string) => {
    if (!user || !startDate || !endDate) return;
    
    setIsLoading(true);
    setPaymentError(null);
    
    try {
      const { error } = await supabase.from('bookings').insert({
        user_id: user.id,
        stay_id: stayId,
        stay_name: stayName,
        stay_location: stayLocation,
        stay_image: stayImage,
        checkin_date: startDate.toISOString(),
        checkout_date: endDate.toISOString(),
        guests: guests,
        total_price: total,
        currency: currency,
        payment_id: paymentId || null,
        payment_method: paymentId ? 'razorpay' : 'default',
        payment_status: paymentId ? 'completed' : 'pending'
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Booking confirmed!",
        description: `Your stay has been booked for ${nights} nights from ${format(startDate, "MMM dd, yyyy")} to ${format(endDate, "MMM dd, yyyy")}`,
      });
      
      setStartDate(undefined);
      setEndDate(undefined);
      setGuests(1);
      setBookingCreated(false);
      
      navigate("/bookings");
      
    } catch (error) {
      console.error('Error saving booking:', error);
      setPaymentError("There was an error saving your booking. Please try again.");
      toast({
        title: "Booking failed",
        description: "There was an error saving your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      if (onClose) {
        onClose();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please log in to book",
        description: "You need to be logged in to make a booking",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    if (!startDate || !endDate) {
      toast({
        title: "Please select check-in and check-out dates",
        variant: "destructive",
      });
      return;
    }

    setPaymentError(null);

    if (paymentMethod === "default") {
      await saveBooking();
    } else {
      setBookingCreated(true);
    }
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    console.log("Payment successful, ID:", paymentId);
    toast({
      title: "Payment successful!",
      description: `Payment ID: ${paymentId}`,
    });
    await saveBooking(paymentId);
  };

  const handlePaymentError = (error: any) => {
    console.error("Payment error:", error);
    setPaymentError("Payment failed. Please try again or choose a different payment method.");
    toast({
      title: "Payment failed",
      description: "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
    setBookingCreated(false);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-md">
      <h3 className="mb-4 text-xl font-medium">
        {currency === "INR" ? "₹" : "$"}
        {price.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">night</span>
      </h3>

      {paymentError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="rounded-t-md border border-border overflow-hidden">
            <Popover open={isPopoverOpen} onOpenChange={handlePopoverOpenChange}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-3 text-left text-sm transition-colors hover:bg-muted/50"
                >
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-muted-foreground" />
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
                <CalendarComponent
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

          <div className="rounded-b-md border-x border-b border-border">
            <div className="flex items-center justify-between p-3">
              <label htmlFor="guests" className="text-sm">
                Guests
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="rounded-md border-border bg-transparent p-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {nights > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="payment-method" className="text-sm font-medium">
                Payment Method
              </label>
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as "default" | "razorpay")}
                className="rounded-md border-border bg-transparent p-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="default">Pay Later</option>
                <option value="razorpay">Razorpay</option>
              </select>
            </div>
          </div>
        )}

        {!bookingCreated && (
          <Button 
            type="submit" 
            className="w-full bg-gold hover:bg-gold-dark text-white" 
            disabled={!startDate || !endDate || isLoading}
          >
            {isLoading ? "Processing..." : paymentMethod === "razorpay" ? "Proceed to Payment" : nights > 0 ? "Reserve" : "Check availability"}
          </Button>
        )}

        {bookingCreated && paymentMethod === "razorpay" && (
          <RazorpayCheckout 
            amount={total} 
            currency={currency} 
            bookingData={{
              stayName,
              stayId,
              stayLocation,
              stayImage,
              startDate: startDate!,
              endDate: endDate!,
              guests,
              nights
            }}
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        )}

        {nights > 0 && (
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="underline">
                {currency === "INR" ? "₹" : "$"}
                {price.toLocaleString()} x {nights} nights
              </span>
              <span>
                {currency === "INR" ? "₹" : "$"}
                {subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Service fee</span>
              <span>
                {currency === "INR" ? "₹" : "$"}
                {serviceFee.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Taxes (18%)</span>
              <span>
                {currency === "INR" ? "₹" : "$"}
                {taxesFee.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex justify-between font-medium">
              <span>Total</span>
              <span>
                {currency === "INR" ? "₹" : "$"}
                {total.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
