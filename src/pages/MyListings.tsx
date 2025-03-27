
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Home } from "lucide-react";

type Listing = {
  id: string;
  title: string;
  description: string;
  location: string;
  image_url: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  created_at: string;
};

const MyListings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchListings = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from("listings")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        
        if (error) throw error;
        
        setListings(data || []);
      } catch (error: any) {
        console.error("Error fetching listings:", error);
        toast({
          title: "Error fetching listings",
          description: error.message || "Could not load your listings",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchListings();
  }, [user, toast]);
  
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    try {
      const { error } = await supabase
        .from("listings")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      
      setListings(listings.filter(listing => listing.id !== id));
      
      toast({
        title: "Listing deleted",
        description: "Your property has been removed successfully",
      });
    } catch (error: any) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Error deleting listing",
        description: error.message || "Could not delete the listing",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="h-1 w-24 bg-gradient-to-r from-gold-dark to-gold rounded animate-pulse mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your listings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 bg-stone-light">
      <div className="page-container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif">My Listings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your properties listed on Stay Beyond
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-gold hover:bg-gold-dark">
            <Link to="/become-host">
              <Plus className="mr-2 h-4 w-4" /> Add New Property
            </Link>
          </Button>
        </div>
        
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={listing.image_url} 
                    alt={listing.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white/90 hover:bg-white"
                      onClick={() => {/* Edit functionality */}}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="bg-white/90 hover:bg-white text-destructive hover:text-destructive"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="line-clamp-1">{listing.title}</CardTitle>
                  <CardDescription>{listing.location}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price per night</span>
                      <span className="font-medium">
                        {listing.currency === "INR" ? "₹" : "$"}
                        {listing.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Accommodates</span>
                      <span className="font-medium">{listing.max_guests} guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rooms</span>
                      <span className="font-medium">{listing.bedrooms} BR, {listing.bathrooms} BA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-stone-lightest p-4 mb-4">
                  <Home className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No listings yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  You haven't listed any properties yet. Create your first listing to start hosting!
                </p>
                <Button 
                  asChild
                  className="bg-gold hover:bg-gold-dark"
                >
                  <Link to="/become-host">
                    <Plus className="mr-2 h-4 w-4" /> Add New Property
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

export default MyListings;
