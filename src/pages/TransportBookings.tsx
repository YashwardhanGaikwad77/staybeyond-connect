
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, MapPin, Plane, Bus, Ship, Train } from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface TransportBooking {
  id: string;
  user_id: string;
  transport_id: string;
  transport_name: string;
  transport_type: string;
  transport_image: string;
  departure_date: string;
  passengers: number;
  origin: string | null;
  destination: string | null;
  total_price: number;
  currency: string;
  created_at: string;
}

const TransportBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<TransportBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      
      if (!user) return;

      const { data, error } = await supabase
        .from("transport_bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching transport bookings:", error);
      toast({
        title: "Failed to load bookings",
        description: "There was an error loading your transport bookings.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'air':
        return <Plane className="h-5 w-5" />;
      case 'road':
        return <Bus className="h-5 w-5" />;
      case 'rail':
        return <Train className="h-5 w-5" />;
      case 'water':
        return <Ship className="h-5 w-5" />;
      default:
        return <Plane className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-dark text-white py-12">
        <div className="page-container">
          <h1 className="text-3xl md:text-4xl font-serif mb-2">Your Transport Bookings</h1>
          <p className="text-white/70">Manage and view your transport reservations</p>
        </div>
      </div>

      <div className="py-12 page-container">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto relative">
                    <img
                      src={booking.transport_image}
                      alt={booking.transport_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback image if the original fails to load
                        e.currentTarget.src = "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1920";
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white flex items-center">
                      {getTransportIcon(booking.transport_type)}
                      <span className="ml-2 capitalize">{booking.transport_type}</span>
                    </div>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h2 className="text-xl font-medium mb-2">{booking.transport_name}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <CalendarIcon className="mr-2 h-5 w-5 text-gold" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Departure Date</p>
                          <p className="text-sm">
                            {format(parseISO(booking.departure_date), "MMMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                      
                      {(booking.origin || booking.destination) && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="mr-2 h-5 w-5 text-gold" />
                          <div>
                            <p className="text-sm font-medium text-foreground">Route</p>
                            <p className="text-sm">
                              {booking.origin} {booking.destination && `→ ${booking.destination}`}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center text-muted-foreground">
                        <div className="mr-2 h-5 w-5 flex items-center justify-center text-gold">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Passengers</p>
                          <p className="text-sm">{booking.passengers} {booking.passengers === 1 ? 'person' : 'people'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground">
                        <div className="mr-2 h-5 w-5 flex items-center justify-center text-gold">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Total Price</p>
                          <p className="text-sm">
                            {booking.currency}{booking.total_price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Booked on {format(parseISO(booking.created_at), "MMMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-light mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">No transport bookings found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              You haven't made any transport bookings yet. Explore our luxury transport options and book your first journey.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransportBookings;
