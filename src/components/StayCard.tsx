
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import type { Stay } from "../data/stays";

interface StayCardProps {
  stay: Stay;
  variant?: "default" | "featured";
}

const StayCard = ({ stay, variant = "default" }: StayCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (variant === "featured") {
    return (
      <Link 
        to={`/listings/${stay.id}`}
        className="group relative overflow-hidden rounded-lg shadow-lg transition-all hover-lift block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[16/9] w-full overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone p-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent"></div>
            </div>
          )}
          <img
            src={stay.images[0]}
            alt={stay.name}
            className={`h-full w-full object-cover transition-transform duration-700 ease-in-out ${
              isHovered ? "scale-110" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={handleImageLoad}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white">
          <div className="mb-2 flex items-center">
            <span className="mr-1 rounded-full bg-gold px-2 py-0.5 text-xs font-medium">
              Featured
            </span>
            <div className="ml-auto flex items-center space-x-1">
              <Star size={14} className="fill-gold text-gold" />
              <span className="text-sm font-medium">{stay.rating}</span>
              <span className="text-xs text-white/70">({stay.reviewCount})</span>
            </div>
          </div>
          
          <h3 className="mb-1 text-xl font-medium">{stay.name}</h3>
          
          <div className="mb-3 flex items-center text-sm text-white/80">
            <MapPin size={14} className="mr-1" />
            <span>{stay.location}</span>
          </div>
          
          <p className="mb-4 text-sm text-white/80 line-clamp-2">{stay.description}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-medium">₹{stay.price.toLocaleString()}</span>
              <span className="text-sm text-white/70"> / night</span>
            </div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm transition-colors group-hover:bg-gold">
              View Details
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/listings/${stay.id}`}
      className="group block overflow-hidden rounded-lg bg-white shadow-md hover-lift h-full transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone p-4">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent"></div>
          </div>
        )}
        <img
          src={stay.images[0]}
          alt={stay.name}
          className={`h-full w-full object-cover transition-transform duration-700 ease-in-out ${
            isHovered ? "scale-110" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleImageLoad}
        />
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
          <Star size={14} className="fill-gold text-gold" />
          <span className="text-xs font-medium">{stay.rating}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-1 flex items-center text-xs text-muted-foreground">
          <MapPin size={12} className="mr-1" />
          <span>{stay.city}, {stay.state}</span>
        </div>
        
        <h3 className="mb-1 text-lg font-medium">{stay.name}</h3>
        
        <div className="mb-3 flex flex-wrap gap-1">
          {stay.amenities.slice(0, 3).map((amenity, i) => (
            <span key={i} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
              {amenity.name}
            </span>
          ))}
          {stay.amenities.length > 3 && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
              +{stay.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div>
            <span className="font-medium">₹{stay.price.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground"> / night</span>
          </div>
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold transition-colors group-hover:bg-gold group-hover:text-white">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StayCard;
