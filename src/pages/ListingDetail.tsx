
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Star, MapPin, Users, Bed, Bath, Calendar, Share2, Heart, 
  ChevronLeft, ChevronRight, ArrowLeft, X
} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import stays from "@/data/stays";
import transport from "@/data/transport";
import StayCard from "@/components/StayCard";
import TransportCard from "@/components/TransportCard";
import { useToast } from "@/hooks/use-toast";

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stay, setStay] = useState(stays.find(s => s.id === id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [similarStays, setSimilarStays] = useState(stays.filter(s => s.id !== id && s.state === stay?.state).slice(0, 3));
  const [relevantTransport, setRelevantTransport] = useState(
    transport.filter(t => t.availableLocations.includes(stay?.city || '')).slice(0, 2)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (!stay) {
      navigate("/listings");
      toast({
        title: "Property not found",
        description: "The property you're looking for doesn't exist or has been removed.",
        variant: "destructive",
      });
    } else {
      setSimilarStays(
        stays.filter(s => s.id !== id && s.state === stay.state).slice(0, 3)
      );
      setRelevantTransport(
        transport.filter(t => t.availableLocations.includes(stay.city)).slice(0, 2)
      );
      
      // Simulate loading images
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }
  }, [id, navigate, stay, toast]);

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % (stay?.images.length || 1));
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? (stay?.images.length || 1) - 1 : prev - 1
    );
  };

  const openGallery = (index: number = 0) => {
    setActiveImageIndex(index);
    setGalleryOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeGallery = () => {
    setGalleryOpen(false);
    document.body.style.overflow = "auto";
  };

  if (!stay) return null;

  return (
    <div className="min-h-screen pt-16 pb-16">
      {/* Gallery modal */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="p-4 flex justify-between items-center">
            <button 
              onClick={closeGallery}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-white text-sm">
              {activeImageIndex + 1} / {stay.images.length}
            </div>
            <div className="w-6"></div> {/* For centering */}
          </div>
          
          <div className="flex-1 flex items-center justify-center relative">
            <button 
              onClick={prevImage}
              className="absolute left-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <img 
              src={stay.images[activeImageIndex]} 
              alt={stay.name} 
              className="max-h-full max-w-full object-contain"
            />
            
            <button 
              onClick={nextImage}
              className="absolute right-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="p-4 overflow-x-auto">
            <div className="flex space-x-2">
              {stay.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 h-16 w-24 rounded overflow-hidden border-2 transition-all ${
                    activeImageIndex === index 
                      ? "border-gold" 
                      : "border-transparent hover:border-white/30"
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${stay.name} ${index + 1}`} 
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Back button */}
      <div className="page-container pt-4">
        <Link 
          to="/listings" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to listings
        </Link>
      </div>
      
      {/* Image gallery */}
      <div className="page-container pt-4">
        {isLoading ? (
          <div className="aspect-[2/1] max-h-[500px] w-full rounded-lg overflow-hidden bg-stone flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-2 border-gold border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-lg overflow-hidden max-h-[500px]">
            <div 
              className="aspect-[4/3] md:aspect-auto relative cursor-pointer"
              onClick={() => openGallery(0)}
            >
              <img 
                src={stay.images[0]} 
                alt={stay.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="hidden md:grid grid-cols-2 gap-2">
              {stay.images.slice(1, 5).map((image, index) => (
                <div 
                  key={index}
                  className="aspect-[4/3] relative cursor-pointer"
                  onClick={() => openGallery(index + 1)}
                >
                  <img 
                    src={image} 
                    alt={`${stay.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {index === 3 && stay.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                      <span>+{stay.images.length - 5} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => openGallery()}
              className="absolute right-4 bottom-4 bg-white rounded-md px-3 py-1 text-sm font-medium hidden md:flex items-center shadow-md hover:bg-stone-light transition-colors"
            >
              <span>View all photos</span>
            </button>
          </div>
        )}
      </div>
      
      {/* Main content */}
      <div className="page-container pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="border-b border-border pb-6">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-3xl font-serif font-medium mb-2">{stay.name}</h1>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin size={16} className="mr-1" />
                    <span>{stay.location}, {stay.city}, {stay.state}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 rounded-full border border-border hover:bg-stone-light transition-colors">
                    <Share2 size={18} />
                  </button>
                  <button className="p-2 rounded-full border border-border hover:bg-stone-light transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center mt-4 gap-4">
                <div className="flex items-center">
                  <Star size={16} className="text-gold fill-gold mr-1" />
                  <span className="font-medium">{stay.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    ({stay.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{stay.maxGuests} guests</span>
                </div>
                
                <div className="flex items-center">
                  <Bed size={16} className="mr-1" />
                  <span>{stay.bedrooms} bedrooms, {stay.beds} beds</span>
                </div>
                
                <div className="flex items-center">
                  <Bath size={16} className="mr-1" />
                  <span>{stay.baths} baths</span>
                </div>
                
                <div className="inline-flex items-center bg-gold/10 text-gold rounded-full px-3 py-1 text-xs font-medium">
                  <span className="capitalize">{stay.propertyType}</span>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="py-6 border-b border-border">
              <h2 className="text-xl font-medium mb-4">About this place</h2>
              <p className="text-muted-foreground mb-4">
                {stay.longDescription || stay.description}
              </p>
            </div>
            
            {/* Amenities */}
            <div className="py-6 border-b border-border">
              <h2 className="text-xl font-medium mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                {stay.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mr-3">
                      <span className="w-3 h-3 bg-gold rounded-full"></span>
                    </div>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Host */}
            <div className="py-6 border-b border-border">
              <h2 className="text-xl font-medium mb-4">Hosted by {stay.host.name}</h2>
              <div className="flex items-center">
                {stay.host.image ? (
                  <img 
                    src={stay.host.image} 
                    alt={stay.host.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-stone-dark text-white flex items-center justify-center mr-4">
                    <span className="text-xl font-medium">{stay.host.name.charAt(0)}</span>
                  </div>
                )}
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {stay.host.isSuperhost && (
                      <span className="inline-flex items-center bg-gold/10 text-gold rounded-full px-2 py-0.5 text-xs font-medium">
                        Superhost
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      Hosting since {stay.host.joinedDate.split('-')[0]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Always ready to ensure you have a perfect stay. Feel free to reach out with any questions.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Calendar/Availability */}
            <div className="py-6 border-b border-border">
              <div className="flex items-center mb-4">
                <Calendar size={20} className="mr-2" />
                <h2 className="text-xl font-medium">Availability</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Select check-in and check-out dates to book this property. Minimum stay may apply.
              </p>
              <div className="lg:hidden">
                <BookingForm 
                  price={stay.price} 
                  currency={stay.currency} 
                  maxGuests={stay.maxGuests} 
                  bedrooms={stay.bedrooms}
                />
              </div>
            </div>
            
            {/* Transport options */}
            {relevantTransport.length > 0 && (
              <div className="py-6 border-b border-border">
                <h2 className="text-xl font-medium mb-4">Transport Options in {stay.city}</h2>
                <p className="text-muted-foreground mb-4">
                  Explore {stay.city} and beyond with our premium transport services:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relevantTransport.map(item => (
                    <div key={item.id}>
                      <TransportCard transport={item} />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link 
                    to="/transport" 
                    className="text-gold hover:text-gold-dark flex items-center transition-colors"
                  >
                    <span className="mr-1">View all transport options</span>
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            )}
            
            {/* Similar properties */}
            {similarStays.length > 0 && (
              <div className="py-6">
                <h2 className="text-xl font-medium mb-4">Similar Properties in {stay.state}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarStays.map(item => (
                    <div key={item.id}>
                      <StayCard stay={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Booking widget */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <BookingForm 
                price={stay.price} 
                currency={stay.currency} 
                maxGuests={stay.maxGuests} 
                bedrooms={stay.bedrooms}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
