
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Transport } from "@/data/transport";

interface TransportBookingFormProps {
  transport: Transport;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const TransportBookingForm = ({
  transport,
  onSuccess,
  onCancel,
}: TransportBookingFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
  const [passengers, setPassengers] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const totalPrice = transport.basePrice * passengers;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to make a booking",
        variant: "destructive",
      });
      return;
    }

    if (!departureDate) {
      toast({
        title: "Date required",
        description: "Please select a departure date",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const bookingData = {
        user_id: user.id,
        transport_id: transport.id,
        transport_name: transport.name,
        transport_type: transport.type,
        transport_image: transport.image,
        departure_date: format(departureDate, "yyyy-MM-dd"),
        passengers: passengers,
        origin: transport.origin || null,
        destination: transport.destination || null,
        total_price: totalPrice,
        currency: "₹",
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("transport_bookings")
        .insert([bookingData]);

      if (error) throw error;

      toast({
        title: "Booking successful!",
        description: `Your ${transport.type} transport has been booked.`,
      });
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium">Departure Date</label>
          {departureDate && (
            <button
              type="button"
              onClick={() => setDepartureDate(undefined)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {departureDate ? (
                format(departureDate, "PPP")
              ) : (
                <span>Select departure date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={departureDate}
              onSelect={setDepartureDate}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Passengers</label>
        <div className="flex items-center">
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center border border-border rounded-l-md bg-background hover:bg-muted transition-colors"
            onClick={() => setPassengers(Math.max(1, passengers - 1))}
          >
            -
          </button>
          <input
            type="number"
            className="w-16 h-10 text-center border-y border-border"
            value={passengers}
            min="1"
            max="20"
            readOnly
          />
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center border border-border rounded-r-md bg-background hover:bg-muted transition-colors"
            onClick={() => setPassengers(Math.min(20, passengers + 1))}
          >
            +
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex justify-between text-sm mb-2">
          <span>Base price per person</span>
          <span>₹{transport.basePrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Passengers</span>
          <span>x {passengers}</span>
        </div>
        <div className="flex justify-between font-medium text-base pt-2 border-t border-border mt-2">
          <span>Total</span>
          <span className="text-gold">₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <Button
          type="button"
          variant="outline" 
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="flex-1 bg-gold hover:bg-gold-dark"
          disabled={isSubmitting || !departureDate}
        >
          {isSubmitting ? "Processing..." : "Book Now"}
        </Button>
      </div>
    </form>
  );
};

export default TransportBookingForm;
