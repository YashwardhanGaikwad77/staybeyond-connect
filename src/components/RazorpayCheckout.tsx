
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loadRazorpayScript, initializeRazorpayPayment, RazorpayOptions, RazorpayResponse, RAZORPAY_KEY_ID } from '@/utils/razorpay';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RazorpayCheckoutProps {
  amount: number;
  currency: string;
  bookingData: {
    stayName: string;
    stayId: string;
    stayLocation: string;
    stayImage: string;
    startDate: Date;
    endDate: Date;
    guests: number;
    nights: number;
  };
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
}

const RazorpayCheckout = ({ amount, currency, bookingData, onSuccess, onError }: RazorpayCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadScript = async () => {
      try {
        setIsLoading(true);
        const loaded = await loadRazorpayScript();
        setIsScriptLoaded(loaded);
        if (!loaded) {
          setError("Failed to load Razorpay. Please refresh the page and try again.");
          toast({
            title: "Failed to load Razorpay",
            description: "Please refresh the page and try again",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Error loading Razorpay script:", err);
        setError("An error occurred while loading Razorpay. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadScript();
  }, [toast]);

  const handlePayment = async () => {
    if (!isScriptLoaded) {
      toast({
        title: "Razorpay not loaded",
        description: "Please refresh the page and try again",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, you would create an order from your backend
      // For this demo, we'll mock the order_id
      const orderId = "order_" + new Date().getTime();
      
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay expects amount in smallest currency unit (paise for INR)
        currency: currency,
        name: "Stay Beyond",
        description: `Booking for ${bookingData.stayName}`,
        image: bookingData.stayImage, // Use the stay image as the logo
        order_id: orderId,
        handler: function (response: RazorpayResponse) {
          console.log("Payment successful:", response);
          onSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: "", // User's name would go here
          email: "", // User's email would go here
          contact: "", // User's phone would go here
        },
        notes: {
          stay_id: bookingData.stayId,
          checkin_date: bookingData.startDate.toISOString(),
          checkout_date: bookingData.endDate.toISOString(),
          guests: bookingData.guests.toString(),
          nights: bookingData.nights.toString(),
        },
        theme: {
          color: "#B8860B", // Gold color to match your app theme
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
            setError("Payment cancelled or dismissed");
            toast({
              title: "Payment cancelled",
              description: "You have cancelled the payment process",
              variant: "destructive",
            });
          },
          escape: false,
          backdrop_close: false,
        }
      };

      initializeRazorpayPayment(options);
    } catch (error) {
      console.error("Payment initialization error:", error);
      setError("There was an error processing your payment. Please try again.");
      onError(error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Button 
        onClick={handlePayment} 
        className="w-full mt-4 bg-gold hover:bg-gold-dark text-white"
        disabled={isLoading || !isScriptLoaded}
      >
        {isLoading ? "Processing..." : `Pay with Razorpay (${currency} ${amount})`}
      </Button>
    </div>
  );
};

export default RazorpayCheckout;
