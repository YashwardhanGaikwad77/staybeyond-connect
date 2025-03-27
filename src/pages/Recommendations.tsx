
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThumbsUp, MapPin, Calendar } from "lucide-react";

type Recommendation = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  image_url: string | null;
  likes: number;
  created_at: string;
  // Instead of relying on the user relation, store these fields separately
  user_name: string | null;
};

const Recommendations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("browse");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  useEffect(() => {
    fetchRecommendations();
  }, []);
  
  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("recommendations")
        .select(`
          id,
          title,
          description,
          category,
          location,
          image_url,
          likes,
          created_at,
          user_id
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Process the data to include user name
      const processedData = await Promise.all(
        (data || []).map(async (rec) => {
          let userName = "Anonymous";
          
          if (rec.user_id) {
            const { data: userData, error: userError } = await supabase
              .from("profiles")
              .select("first_name, last_name")
              .eq("id", rec.user_id)
              .single();
            
            if (!userError && userData) {
              userName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || "Anonymous";
            }
          }
          
          return {
            ...rec,
            user_name: userName,
          };
        })
      );
      
      setRecommendations(processedData);
    } catch (error: any) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load recommendations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add a recommendation",
        variant: "destructive",
      });
      return;
    }
    
    if (!title || !description || !category || !location) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setFormSubmitting(true);
      
      const { error } = await supabase.from("recommendations").insert({
        user_id: user.id,
        title,
        description,
        category,
        location,
        image_url: imageUrl || null,
      });
      
      if (error) throw error;
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setImageUrl("");
      
      toast({
        title: "Success",
        description: "Your recommendation has been added",
      });
      
      // Refresh recommendations
      fetchRecommendations();
      
      // Switch to browse tab
      setActiveTab("browse");
    } catch (error: any) {
      console.error("Error adding recommendation:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to add recommendation",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  return (
    <div className="min-h-screen pt-16 bg-stone-light">
      <div className="page-container py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-serif mb-2">Community Recommendations</h1>
            <p className="text-muted-foreground">
              Discover local attractions, activities, and hidden gems recommended by our community
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse">Browse Recommendations</TabsTrigger>
              <TabsTrigger value="add">Add Recommendation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              {loading ? (
                <div className="text-center py-12">
                  <div className="h-1 w-24 bg-gradient-to-r from-gold-dark to-gold rounded animate-pulse mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading recommendations...</p>
                </div>
              ) : recommendations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map((rec) => (
                    <Card key={rec.id} className="h-full">
                      {rec.image_url && (
                        <div className="w-full h-48 overflow-hidden">
                          <img 
                            src={rec.image_url} 
                            alt={rec.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{rec.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1" /> {rec.location}
                            </CardDescription>
                          </div>
                          <span className="bg-stone-lightest px-3 py-1 rounded-full text-xs font-medium">
                            {rec.category}
                          </span>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(rec.created_at)}
                          <span className="mx-2">•</span>
                          By {rec.user_name}
                        </div>
                        
                        <div className="flex items-center">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          {rec.likes}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-stone-lightest rounded-lg">
                  <p className="text-muted-foreground mb-4">No recommendations yet.</p>
                  <Button onClick={() => setActiveTab("add")} className="bg-gold hover:bg-gold-dark">
                    Add the first recommendation
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle>Share Your Recommendation</CardTitle>
                  <CardDescription>
                    Help fellow travelers discover amazing experiences in your favorite destinations
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">
                        Title *
                      </label>
                      <Input
                        id="title"
                        placeholder="E.g., Amazing Sunset Spot"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">
                          Category *
                        </label>
                        <Select value={category} onValueChange={setCategory} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                            <SelectItem value="Attractions">Attractions</SelectItem>
                            <SelectItem value="Activities">Activities</SelectItem>
                            <SelectItem value="Shopping">Shopping</SelectItem>
                            <SelectItem value="Nightlife">Nightlife</SelectItem>
                            <SelectItem value="Nature">Nature</SelectItem>
                            <SelectItem value="Culture">Culture</SelectItem>
                            <SelectItem value="Hidden Gem">Hidden Gem</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="location" className="text-sm font-medium">
                          Location *
                        </label>
                        <Input
                          id="location"
                          placeholder="E.g., Jaipur, Rajasthan"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description *
                      </label>
                      <Textarea
                        id="description"
                        placeholder="Share details about what makes this place special..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="image" className="text-sm font-medium">
                        Image URL (optional)
                      </label>
                      <Input
                        id="image"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        type="submit" 
                        className="w-full bg-gold hover:bg-gold-dark"
                        disabled={formSubmitting}
                      >
                        {formSubmitting ? "Submitting..." : "Submit Recommendation"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
