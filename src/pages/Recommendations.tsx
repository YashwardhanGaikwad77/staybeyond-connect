
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, ThumbsUp, Clock, User } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

type Recommendation = {
  id: string;
  user_id: string | null;
  title: string;
  description: string;
  category: string;
  location: string;
  image_url: string | null;
  likes: number;
  created_at: string;
  user_first_name?: string;
  user_last_name?: string;
};

const recommendationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(3, "Category is required"),
  location: z.string().min(3, "Location is required"),
  image_url: z.string().url("Please enter a valid image URL").optional().or(z.literal(''))
});

const categoryOptions = [
  "Food & Dining",
  "Adventure & Activities",
  "Cultural Experiences",
  "Shopping",
  "Nightlife",
  "Family-friendly",
  "Wellness & Relaxation",
  "Tours & Excursions"
];

const Recommendations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof recommendationSchema>>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      image_url: ""
    },
  });
  
  useEffect(() => {
    fetchRecommendations();
  }, [selectedCategory]); // Added selectedCategory as dependency
  
  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setFetchError(null);
      
      console.log("Fetching recommendations...");
      
      const query = supabase
        .from("recommendations")
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name
          )
        `)
        .order("created_at", { ascending: false });
      
      if (selectedCategory) {
        query.eq("category", selectedCategory);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      console.log("Fetched data:", data);
      
      if (!data) {
        setRecommendations([]);
        return;
      }
      
      const recommendationsWithUserNames = data.map(rec => ({
        ...rec,
        user_first_name: rec.profiles?.first_name,
        user_last_name: rec.profiles?.last_name,
        likes: rec.likes || 0 // Ensure likes is never null
      }));
      
      setRecommendations(recommendationsWithUserNames);
    } catch (error: any) {
      console.error("Error fetching recommendations:", error);
      setFetchError(error.message || "Could not load recommendations");
      toast({
        title: "Error fetching recommendations",
        description: error.message || "Could not load recommendations",
        variant: "destructive",
      });
      setRecommendations([]); // Set empty array in case of error
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (values: z.infer<typeof recommendationSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add a recommendation",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from("recommendations")
        .insert({
          user_id: user.id,
          title: values.title,
          description: values.description,
          category: values.category,
          location: values.location,
          image_url: values.image_url || null,
          likes: 0 // Initialize likes to 0
        });
      
      if (error) throw error;
      
      toast({
        title: "Recommendation added!",
        description: "Your recommendation has been added successfully",
      });
      
      form.reset();
      setShowForm(false);
      fetchRecommendations();
    } catch (error: any) {
      console.error("Error adding recommendation:", error);
      toast({
        title: "Error adding recommendation",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };
  
  const handleLike = async (id: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like recommendations",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Find the recommendation to update
      const recommendation = recommendations.find(r => r.id === id);
      if (!recommendation) return;
      
      // Update in the database
      const { error } = await supabase
        .from("recommendations")
        .update({ likes: recommendation.likes + 1 })
        .eq("id", id);
      
      if (error) throw error;
      
      // Update locally
      setRecommendations(recommendations.map(r => 
        r.id === id ? { ...r, likes: r.likes + 1 } : r
      ));
    } catch (error: any) {
      console.error("Error liking recommendation:", error);
      toast({
        title: "Error",
        description: error.message || "Could not like this recommendation",
        variant: "destructive",
      });
    }
  };

  // Function to retry fetching recommendations
  const handleRetryFetch = () => {
    fetchRecommendations();
  };
  
  return (
    <div className="min-h-screen pt-16 bg-stone-light">
      <div className="page-container py-12">
        <div className="text-center mb-8">
          <span className="text-sm uppercase tracking-widest text-gold font-medium">
            Local Insights
          </span>
          <h1 className="text-3xl md:text-4xl font-serif mt-2">Community Recommendations</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover the best activities, dining spots, and experiences recommended by our community of travelers and local experts.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-gold hover:bg-gold-dark" : ""}
              onClick={() => {
                setSelectedCategory(null);
              }}
            >
              All
            </Button>
            {categoryOptions.map(category => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-gold hover:bg-gold-dark" : ""}
                onClick={() => {
                  setSelectedCategory(category);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gold hover:bg-gold-dark"
          >
            {showForm ? "Cancel" : "Add Recommendation"}
          </Button>
        </div>
        
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add a Recommendation</CardTitle>
              <CardDescription>
                Share your favorite places and activities with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Best Rooftop Restaurant" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              {...field}
                            >
                              <option value="">Select a category</option>
                              {categoryOptions.map(category => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Udaipur, Rajasthan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Share your experience and tips..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-gold hover:bg-gold-dark">
                      Submit Recommendation
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((skeleton) => (
              <Card key={skeleton} className="overflow-hidden">
                <div className="h-48">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : fetchError ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-stone-lightest p-4 mb-4">
                  <MapPin className="w-8 h-8 text-destructive" />
                </div>
                <h3 className="text-lg font-medium mb-2">Failed to load recommendations</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  {fetchError}
                </p>
                <Button 
                  onClick={handleRetryFetch}
                  className="bg-gold hover:bg-gold-dark"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="overflow-hidden">
                {rec.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={rec.image_url} 
                      alt={rec.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Replace with a placeholder if image fails to load
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1601233211928-8b8e61f364cb?auto=format&fit=crop&w=800";
                      }}
                    />
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-stone-lightest rounded">
                      {rec.category}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => handleLike(rec.id)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" /> {rec.likes}
                    </Button>
                  </div>
                  <CardTitle className="mt-2">{rec.title}</CardTitle>
                  <CardDescription className="flex items-center text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" /> {rec.location}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-foreground">{rec.description}</p>
                </CardContent>
                
                <CardFooter className="flex justify-between text-xs text-muted-foreground border-t pt-4">
                  <div className="flex items-center">
                    <User className="h-3.5 w-3.5 mr-1" />
                    {rec.user_first_name ? `${rec.user_first_name} ${rec.user_last_name?.charAt(0) || ''}` : 'Anonymous'}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {format(new Date(rec.created_at), 'MMM d, yyyy')}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-stone-lightest p-4 mb-4">
                  <MapPin className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No recommendations yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Be the first to share your favorite activities and places with our community!
                </p>
                <Button 
                  onClick={() => setShowForm(true)}
                  className="bg-gold hover:bg-gold-dark"
                >
                  Add Recommendation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
