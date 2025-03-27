
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type Booking = {
  id: string;
  created_at: string;
  checkin_date: string;
  checkout_date: string;
  guests: number;
  total_price: number;
  stay_id: string;
  stay_name: string;
  stay_location: string;
  stay_image: string;
  currency: string;
};

const Bookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setLoading(true);
        
        if (!user) return;
        
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setBookings(data as Booking[]);
        }
      } catch (error) {
        console.error('Error loading bookings', error);
        toast({
          title: "Error loading bookings",
          description: "We couldn't load your booking data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchBookings();
  }, [user, toast]);

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="h-1 w-24 bg-gradient-to-r from-gold-dark to-gold rounded animate-pulse mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-stone-light">
      <div className="page-container py-12">
        <h1 className="text-3xl font-serif mb-8">Your Bookings</h1>
        
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={booking.stay_image} 
                    alt={booking.stay_name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{booking.stay_name}</CardTitle>
                  <CardDescription>{booking.stay_location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in</span>
                      <span className="font-medium">
                        {format(new Date(booking.checkin_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out</span>
                      <span className="font-medium">
                        {format(new Date(booking.checkout_date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guests</span>
                      <span className="font-medium">{booking.guests}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="font-medium">Total</span>
                      <span className="font-medium">
                        {booking.currency === "INR" ? "₹" : "$"}
                        {booking.total_price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    className="w-full mt-4"
                  >
                    <Link to={`/listings/${booking.stay_id}`}>
                      View Property
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-stone-lightest p-4 mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You haven't made any bookings yet. Start by exploring our luxury accommodations.
                </p>
                <Button 
                  asChild
                  className="bg-gold hover:bg-gold-dark"
                >
                  <Link to="/listings">
                    Browse Stays
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Bookings;
