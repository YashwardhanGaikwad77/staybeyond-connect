
import { useEffect } from "react";
import { Link } from "react-router-dom";

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero section */}
      <div className="relative bg-stone-dark text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1483213097414-365e22ee107b?auto=format&fit=crop&w=1920" 
            alt="About StayBeyond" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 page-container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 animate-fade-in-down">
              Our Story
            </h1>
            <p className="text-white/80 mb-6 animate-fade-in-down" style={{ animationDelay: "100ms" }}>
              Redefining luxury travel across India's most captivating destinations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="text-sm uppercase tracking-widest text-gold font-medium">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">
                Elevating Travel Beyond Expectations
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2018, StayBeyond was born from a passion to showcase India's extraordinary accommodations and provide travelers with seamless, luxurious experiences from arrival to departure.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that where you stay and how you travel fundamentally shapes your journey. Our mission is to curate accommodations and transport options that aren't merely places to sleep or ways to move—but destinations and experiences in themselves.
              </p>
              <p className="text-muted-foreground">
                Each property and transport option in our collection has been personally vetted by our team to ensure it meets our exacting standards for luxury, authenticity, service, and that special quality that creates lasting memories.
              </p>
            </div>
            
            <div className="relative animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800" 
                  alt="Luxury accommodation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-lg overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1553773077-91173e3d6b22?auto=format&fit=crop&w=800" 
                  alt="Luxury train" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values section */}
      <section className="py-16 md:py-24 bg-stone-light">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-widest text-gold font-medium">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
              The Principles That Guide Us
            </h2>
            <p className="text-muted-foreground">
              At StayBeyond, we're guided by a set of core values that define our approach to luxury travel and our commitment to our guests.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                description: "We showcase accommodations and experiences that authentically represent India's rich cultural heritage and natural splendor, avoiding the generic and embracing the unique.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M15 21v-3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                    <path d="M17 21v-3a2 2 0 0 1 2-2h4v5" />
                    <circle cx="9" cy="8" r="4" />
                    <path d="M19 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  </svg>
                )
              },
              {
                title: "Excellence",
                description: "We maintain unwavering standards of excellence in every aspect of our service, from the properties we select to the transport options we offer and the support we provide.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                )
              },
              {
                title: "Sustainability",
                description: "We prioritize partnerships with accommodations and transport providers committed to environmental stewardship, cultural preservation, and positive community impact.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M2 22c1.25-1.25 2.5-2.5 3.5-2.5C7 19.5 7 22 9 22c1.37 0 1.37-2 3-2 1.5 0 1.5 2 3 2 1.37 0 1.37-2 3-2 1.5 0 1.5 2 3 2 1.25 0 2.5-1.25 3-2" />
                    <path d="M19.4 17a14.6 14.6 0 0 0 1.1-10.5M4.4 17c-1.3-2.5-2-5.5-1-9.6M9.8 15c-1.4-2.5-2-5-1.5-8.3M14.7 15a20.8 20.8 0 0 0 1-9.2" />
                  </svg>
                )
              }
            ].map((value, i) => (
              <div 
                key={i} 
                className="glass-card p-6 animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-widest text-gold font-medium">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-4">
              The People Behind StayBeyond
            </h2>
            <p className="text-muted-foreground">
              Our passionate team combines decades of experience in luxury hospitality with deep local knowledge of India's diverse regions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Aryan Patel",
                title: "Founder & CEO",
                bio: "With over 15 years in luxury hospitality, Aryan founded StayBeyond to showcase India's extraordinary accommodations to discerning travelers.",
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400"
              },
              {
                name: "Priya Sharma",
                title: "Head of Curation",
                bio: "Priya personally visits and vets every property in our collection, bringing her background in interior design and hospitality management.",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400"
              },
              {
                name: "Rahul Mehta",
                title: "Transport Specialist",
                bio: "A former luxury tour operator, Rahul oversees our transport offerings and partnerships with premium providers across India.",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400"
              },
              {
                name: "Maya Iyer",
                title: "Guest Experience Director",
                bio: "Maya ensures every StayBeyond guest receives personalized service and seamless travel experiences from booking to return.",
                image: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?auto=format&fit=crop&w=400"
              }
            ].map((member, i) => (
              <div 
                key={i} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="aspect-square rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                <p className="text-gold text-sm mb-2">{member.title}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 md:py-24 bg-gold/10">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 max-w-2xl mx-auto leading-tight">
            Begin Your Extraordinary Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover India's most exceptional stays and premium transport options curated by our expert team.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/listings"
              className="px-8 py-3 bg-gold hover:bg-gold-dark text-white rounded-md transition-all text-sm font-medium"
            >
              Explore Accommodations
            </Link>
            <Link
              to="/transport"
              className="px-8 py-3 bg-white hover:bg-stone-light text-foreground border border-border rounded-md transition-all text-sm font-medium"
            >
              View Transport Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
