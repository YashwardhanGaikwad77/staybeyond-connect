
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import DateRangePicker from "./DateRangePicker";
import GuestSelector from "./GuestSelector";
import PaymentMethodSelector from "./PaymentMethodSelector";
import BookingSummary from "./BookingSummary";

interface BookingFormContainerProps {
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

const BookingFormContainer = ({
  price,
  currency,
  maxGuests,
  bedrooms,
  onClose,
  stayId,
  stayName,
  stayLocation,
  stayImage,
}: BookingFormContainerProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);
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

  const handleDateChange = (newStartDate: Date | undefined, newEndDate: Date | undefined) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const saveBooking = async (paymentId?: string) => {
    if (!user || !startDate || !endDate) {
      toast({
        title: "Missing information",
        description: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setPaymentError(null);
    
    try {
      console.log("Saving booking with params:", {
        user_id: user.id,
        stay_id: stayId,
        checkin_date: startDate.toISOString(),
        checkout_date: endDate.toISOString(),
        payment_method: paymentId ? 'razorpay' : 'default'
      });
      
      const { data, error } = await supabase.from('bookings').insert({
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
      }).select();
      
      if (error) {
        console.error("Database error:", error);
        throw error;
      }
      
      console.log("Booking created successfully:", data);
      
      toast({
        title: "Booking confirmed!",
        description: `Your stay has been booked for ${nights} nights`,
      });
      
      setStartDate(undefined);
      setEndDate(undefined);
      setGuests(1);
      setBookingCreated(false);
      
      navigate("/bookings");
      
    } catch (error: any) {
      console.error('Error saving booking:', error);
      setPaymentError("There was an error saving your booking. Please try again.");
      toast({
        title: "Booking failed",
        description: error.message || "There was an error saving your booking. Please try again.",
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
          <DateRangePicker 
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            nights={nights}
          />

          <div className="rounded-b-md border-x border-b border-border">
            <GuestSelector 
              guests={guests}
              maxGuests={maxGuests}
              onGuestsChange={setGuests}
            />
          </div>
        </div>

        {nights > 0 && (
          <div className="mb-4">
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
            />
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
          <BookingSummary
            nights={nights}
            price={price}
            currency={currency}
            subtotal={subtotal}
            serviceFee={serviceFee}
            taxesFee={taxesFee}
            total={total}
          />
        )}
      </form>
    </div>
  );
};

export default BookingFormContainer;
