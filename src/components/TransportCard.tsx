
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import type { Transport } from "../data/transport";

interface TransportCardProps {
  transport: Transport;
  variant?: "default" | "featured";
}

const TransportCard = ({ transport, variant = "default" }: TransportCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'air':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>
          </svg>
        );
      case 'road':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11 2 11.3V15c0 .6.4 1 1 1h1" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        );
      case 'rail':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8.5C2 5 4 3.5 6 3.5h12c2 0 4 1.5 4 5s-2 5-4 5H6c-2 0-4-1.5-4-5Z" />
            <path d="M9 20.5H6.5a2 2 0 0 1-2-2v-8H18v8a2 2 0 0 1-2 2H13.5" />
            <path d="M9 15.5h6" />
            <path d="M17 3.5H7" />
            <path d="m9 20.5-2 2" />
            <path d="m17 20.5-2 2" />
            <path d="m16 20.5 2 2" />
            <path d="m8 20.5 2 2" />
          </svg>
        );
      case 'water':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" />
            <path d="M21 13a8 8 0 0 0-16 0" />
            <path d="M15.9 5.6C15.2 3.5 13.7 2 12 2s-3.2 1.5-3.9 3.6" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (variant === "featured") {
    return (
      <Link 
        to={`/transport`}
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
            src={transport.image}
            alt={transport.name}
            className={`h-full w-full object-cover transition-transform duration-700 ease-in-out ${
              isHovered ? "scale-110" : "scale-100"
            } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={handleImageLoad}
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white">
          <div className="mb-2 flex items-center">
            <span className="mr-1 rounded-full bg-gold px-2 py-0.5 text-xs font-medium flex items-center">
              {getTypeIcon(transport.type)}
              <span className="ml-1 capitalize">{transport.type}</span>
            </span>
            <span className="ml-2 rounded-full bg-gold/20 backdrop-blur-xs px-2 py-0.5 text-xs font-medium">
              Featured
            </span>
          </div>
          
          <h3 className="mb-1 text-xl font-medium">{transport.name}</h3>
          
          {(transport.origin || transport.destination) && (
            <div className="mb-3 flex items-center text-sm text-white/80">
              <MapPin size={14} className="mr-1" />
              <span>{transport.origin} {transport.destination && `→ ${transport.destination}`}</span>
            </div>
          )}
          
          <p className="mb-4 text-sm text-white/80 line-clamp-2">{transport.description}</p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-medium">₹{transport.basePrice.toLocaleString()}</span>
              <span className="text-sm text-white/70"> onwards</span>
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
      to={`/transport`}
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
          src={transport.image}
          alt={transport.name}
          className={`h-full w-full object-cover transition-transform duration-700 ease-in-out ${
            isHovered ? "scale-110" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={handleImageLoad}
        />
        <div className="absolute top-3 right-3 flex items-center space-x-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
          <span className="text-xs font-medium flex items-center">
            {getTypeIcon(transport.type)}
            <span className="ml-1 capitalize">{transport.type}</span>
          </span>
        </div>
      </div>
      
      <div className="p-4">
        {(transport.origin || transport.destination) && (
          <div className="mb-1 flex items-center text-xs text-muted-foreground">
            <MapPin size={12} className="mr-1" />
            <span>{transport.origin} {transport.destination && `→ ${transport.destination}`}</span>
          </div>
        )}
        
        <h3 className="mb-1 text-lg font-medium">{transport.name}</h3>
        
        <div className="mb-3 flex flex-wrap gap-1">
          {transport.features.slice(0, 3).map((feature, i) => (
            <span key={i} className="rounded-full bg-secondary px-2 py-0.5 text-xs">
              {feature}
            </span>
          ))}
          {transport.features.length > 3 && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
              +{transport.features.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between border-t border-border pt-3">
          <div>
            <span className="font-medium">₹{transport.basePrice.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground"> onwards</span>
          </div>
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold transition-colors group-hover:bg-gold group-hover:text-white">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TransportCard;
