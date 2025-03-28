
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Hero from "@/components/Hero";
import StayCard from "@/components/StayCard";
import TransportCard from "@/components/TransportCard";
import stays from "@/data/stays";
import transport from "@/data/transport";

const Index = () => {
  const [featuredStays, setFeaturedStays] = useState(stays.filter(stay => stay.featured).slice(0, 4));
  const [featuredTransport, setFeaturedTransport] = useState(transport.filter(t => t.featured).slice(0, 3));

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <Hero />
      
      {/* Featured accommodations */}
      <section className="section-padding bg-stone-light">
        <div className="page-container">
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span className="text-sm uppercase tracking-widest text-gold font-medium">
                Exclusive Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2">
                Featured Stays
              </h2>
              <p className="text-muted-foreground max-w-xl mt-2">
                Discover our handpicked selection of extraordinary accommodations across India's most captivating destinations.
              </p>
            </div>
            <Link 
              to="/listings" 
              className="mt-4 md:mt-0 flex items-center text-gold hover:text-gold-dark transition-colors"
            >
              <span className="mr-1 text-sm font-medium">View all stays</span>
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStays.map((stay) => (
              <div key={stay.id} className="flex flex-col h-full animate-fade-in-up">
                <StayCard stay={stay} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Experience banner */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://imageio.forbes.com/specials-images/imageserve/6518920b4cb81fadd99954e8/Landscape-with-Halong-bay/960x0.jpg?format=jpg&width=960" 
            alt="Luxury experience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="page-container relative z-10 text-white">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-gold rounded-full mb-4">
              Beyond Ordinary
            </span>
            <h2 className="text-3xl md:text-5xl font-serif mb-4 leading-tight">
              Elevate Your Travel Experience
            </h2>
            <p className="mb-6 text-white/80">
              From regal palaces to serene houseboats, we curate experiences that transcend conventional travel. Our dedication to excellence ensures every moment of your journey is extraordinary.
            </p>
            <Link
              to="/about"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 rounded-md transition-all text-sm font-medium inline-block"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured transport */}
      <section className="section-padding bg-white">
        <div className="page-container">
          <div className="mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <span className="text-sm uppercase tracking-widest text-gold font-medium">
                Premier Services
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2">
                Luxury Transportation
              </h2>
              <p className="text-muted-foreground max-w-xl mt-2">
                Travel in style with our exclusive transport options, from private jets to vintage royal trains.
              </p>
            </div>
            <Link 
              to="/transport" 
              className="mt-4 md:mt-0 flex items-center text-gold hover:text-gold-dark transition-colors"
            >
              <span className="mr-1 text-sm font-medium">Explore transport options</span>
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTransport.map((item) => (
              <div key={item.id} className="flex flex-col h-full animate-fade-in-up">
                <TransportCard transport={item} variant="featured" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="section-padding bg-stone-light">
        <div className="page-container">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-widest text-gold font-medium">
              Guest Experiences
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-2">
              What Our Guests Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover why discerning travelers choose Stay Beyond for their luxury accommodation and transport needs across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The attention to detail was impeccable. From the moment we were picked up at the airport in a vintage car to our stay at the heritage haveli, everything was beyond expectations.",
                author: "Amrita K.",
                location: "Delhi",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100"
              },
              {
                quote: "The houseboat experience in Kerala arranged by StayBeyond was the highlight of our trip. The service was exceptional, and the food prepared by our private chef was outstanding.",
                author: "Michael T.",
                location: "London",
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100"
              },
              {
                quote: "Booking through StayBeyond gave us access to properties and experiences we couldn't have found elsewhere. Their local knowledge and attention to our preferences made all the difference.",
                author: "Priya S.",
                location: "Mumbai",
                image: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?auto=format&fit=crop&w=100"
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className="glass-card p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold/20 mb-4">
                  <path 
                    fill="currentColor" 
                    d="M17.5,10 L17.5,17.5 L10,17.5 L10,25 C10,28.75 13.25,32 17.5,32 L17.5,40 C8.75,40 0,31.25 0,22.5 L0,10 L17.5,10 Z M40,10 L40,17.5 L32.5,17.5 L32.5,25 C32.5,28.75 35.75,32 40,32 L40,40 C31.25,40 22.5,31.25 22.5,22.5 L22.5,10 L40,10 Z"
                  />
                </svg>
                <p className="mb-4 text-foreground">{testimonial.quote}</p>
                <div className="flex items-center mt-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gold/10">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 max-w-2xl mx-auto leading-tight">
            Ready to Experience Extraordinary Travel Across India?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Begin your journey with StayBeyond and discover a world of luxury accommodations and premium transport options.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/listings"
              className="px-8 py-3 bg-gold hover:bg-gold-dark text-white rounded-md transition-all text-sm font-medium"
            >
              Browse Accommodations
            </Link>
            <Link
              to="/transport"
              className="px-8 py-3 bg-white hover:bg-stone-light text-foreground border border-border rounded-md transition-all text-sm font-medium"
            >
              Explore Transport Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
