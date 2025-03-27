
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loadRazorpayScript, initializeRazorpayPayment, RazorpayOptions, RazorpayResponse } from '@/utils/razorpay';

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
  const { toast } = useToast();

  // Test Razorpay Key - Replace with your actual key in production
  const razorpayKey = "rzp_test_xvlZZHOwS3gzcY";

  useEffect(() => {
    const loadScript = async () => {
      const loaded = await loadRazorpayScript();
      setIsScriptLoaded(loaded);
      if (!loaded) {
        toast({
          title: "Failed to load Razorpay",
          description: "Please refresh the page and try again",
          variant: "destructive",
        });
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

    try {
      // In a real implementation, you would create an order from your backend
      // For this demo, we'll mock the order_id
      const orderId = "order_" + new Date().getTime();
      
      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: amount * 100, // Razorpay expects amount in smallest currency unit (paise for INR)
        currency: currency,
        name: "Stay Beyond",
        description: `Booking for ${bookingData.stayName}`,
        image: "https://your-company-logo.png", // Replace with your company logo
        order_id: orderId,
        handler: function (response: RazorpayResponse) {
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
        },
        theme: {
          color: "#B8860B", // Gold color to match your app theme
        },
      };

      initializeRazorpayPayment(options);
    } catch (error) {
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
    <Button 
      onClick={handlePayment} 
      className="w-full mt-4 bg-gold hover:bg-gold-dark text-white"
      disabled={isLoading || !isScriptLoaded}
    >
      {isLoading ? "Processing..." : `Pay with Razorpay (${currency} ${amount})`}
    </Button>
  );
};

export default RazorpayCheckout;
