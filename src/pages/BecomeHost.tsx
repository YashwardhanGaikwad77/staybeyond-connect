
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Upload, Bed, Bath, Users, IndianRupee } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(5, "Location must be at least 5 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  image_url: z.string().url("Please enter a valid image URL"),
  bedrooms: z.number().min(1, "Must have at least 1 bedroom"),
  bathrooms: z.number().min(1, "Must have at least 1 bathroom"),
  max_guests: z.number().min(1, "Must accommodate at least 1 guest"),
  amenities: z.array(z.string()).optional()
});

const BecomeHost = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: 100,
      image_url: "",
      bedrooms: 1,
      bathrooms: 1,
      max_guests: 2,
      amenities: []
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list your property",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("listings")
        .insert({
          user_id: user.id,
          title: values.title,
          description: values.description,
          location: values.location,
          price: values.price,
          currency: "INR",
          image_url: values.image_url,
          bedrooms: values.bedrooms,
          bathrooms: values.bathrooms,
          max_guests: values.max_guests,
          amenities: values.amenities || []
        });
      
      if (error) throw error;
      
      toast({
        title: "Listing created!",
        description: "Your property has been listed successfully",
      });
      
      navigate("/my-listings");
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast({
        title: "Error creating listing",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Common amenities
  const amenitiesOptions = [
    { id: "wifi", label: "WiFi" },
    { id: "ac", label: "Air Conditioning" },
    { id: "pool", label: "Swimming Pool" },
    { id: "kitchen", label: "Kitchen" },
    { id: "parking", label: "Free Parking" },
    { id: "breakfast", label: "Breakfast" },
    { id: "gym", label: "Gym" },
    { id: "tv", label: "TV" },
    { id: "washer", label: "Washer" },
    { id: "dryer", label: "Dryer" }
  ];
  
  return (
    <div className="min-h-screen pt-16 bg-stone-light">
      <div className="page-container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <span className="text-sm uppercase tracking-widest text-gold font-medium">
              Share Your Space
            </span>
            <h1 className="text-3xl md:text-4xl font-serif mt-2">Become a Host</h1>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              List your property on Stay Beyond and start earning. Join our community of hosts offering exceptional stays across India.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>List Your Property</CardTitle>
              <CardDescription>
                Fill in the details below to create your listing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Luxury Villa with Mountain View" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Jaipur, Rajasthan" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your property in detail..." 
                            className="min-h-[120px]"
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
                        <FormLabel>Main Image URL</FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                            <Upload className="text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per Night (₹)</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <IndianRupee className="text-muted-foreground h-4 w-4" />
                              <Input 
                                type="number" 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Bed className="text-muted-foreground h-4 w-4" />
                              <Input 
                                type="number" 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Bath className="text-muted-foreground h-4 w-4" />
                              <Input 
                                type="number" 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="max_guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Guests</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <Users className="text-muted-foreground h-4 w-4" />
                              <Input 
                                type="number" 
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormLabel>Amenities</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
                      {amenitiesOptions.map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={amenity.id} 
                            checked={form.watch("amenities")?.includes(amenity.id)}
                            onCheckedChange={(checked) => {
                              const currentAmenities = form.getValues("amenities") || [];
                              if (checked) {
                                form.setValue("amenities", [...currentAmenities, amenity.id]);
                              } else {
                                form.setValue(
                                  "amenities", 
                                  currentAmenities.filter(value => value !== amenity.id)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={amenity.id}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gold hover:bg-gold-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "List Your Property"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BecomeHost;
