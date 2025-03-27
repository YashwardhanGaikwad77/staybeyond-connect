
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const heroImages = [
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920",
  "https://images.unsplash.com/photo-1605538032404-d5e869096a7b?auto=format&fit=crop&w=1920",
  "https://images.unsplash.com/photo-1601699861307-b37d35fc925c?auto=format&fit=crop&w=1920"
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    Array(heroImages.length).fill(false)
  );

  useEffect(() => {
    // Preload all images
    heroImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          if (newState.every(Boolean)) {
            setIsLoading(false);
          }
          return newState;
        });
      };
    });

    // Set up image rotation
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-dark z-10">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Background images */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      ))}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="animate-fade-in-down max-w-4xl mx-auto">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-4 leading-tight tracking-wide">
            Experience Extraordinary <span className="text-gold">Journeys</span> Across India
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover curated luxury stays and premium transport options that transform travel into an art form.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/listings"
              className="px-8 py-3 bg-gold hover:bg-gold-dark text-white rounded-md transition-all text-sm font-medium transform hover:scale-105 shadow-lg"
            >
              Explore Accommodations
            </Link>
            <Link
              to="/transport"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-md transition-all text-sm font-medium transform hover:scale-105 shadow-lg"
            >
              View Transport Options
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-8 h-12 rounded-full border-2 border-white/50 flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
