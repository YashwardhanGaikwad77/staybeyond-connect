
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
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920" 
            alt="About StayBeyond" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 page-container">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 animate-fade-in-down">
            Our Story
          </h1>
          <p className="max-w-xl text-white/80 mb-6 animate-fade-in-down" style={{ animationDelay: "100ms" }}>
            Redefining luxury travel across India with curated experiences and exceptional service since 2019.
          </p>
        </div>
      </div>
      
      {/* Mission section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-gold font-medium">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">
                Elevating Travel Experiences Across India
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                StayBeyond was born from a passion to showcase the rich tapestry of Indian hospitality while maintaining the highest standards of luxury and comfort.
              </p>
              <p className="mb-6">
                We curate extraordinary accommodations and exceptional transport options that allow travelers to experience India's diverse cultural heritage in unparalleled comfort and style. From historic palaces to modern luxury villas, from vintage royal trains to private jets, we connect discerning travelers with experiences that transcend ordinary tourism.
              </p>
              <p>
                Our mission is simple: to elevate travel in India by offering accommodations and transport that reflect the country's rich history and vibrant present while maintaining world-class standards of service and comfort.
              </p>
            </div>
            <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920" 
                alt="Luxury accommodation in India" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-8 px-6 text-white">
                <p className="font-serif italic text-lg">
                  "We believe travel should be transformative, comfortable, and authentic to the local culture."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values section */}
      <section className="py-16 md:py-20 bg-stone-light">
        <div className="page-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-widest text-gold font-medium">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">
              The Principles That Guide Us
            </h2>
            <p className="text-muted-foreground">
              At StayBeyond, our core values shape everything we do, from the properties we select to the experiences we create for our guests.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                    <path d="M20 7L12 3L4 7M20 7V17L12 21M20 7L12 11M12 21L4 17V7M12 21V11M4 7L12 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Authentic Luxury",
                description: "We believe luxury should be grounded in authenticity. Each property in our collection reflects the unique heritage and character of its location."
              },
              {
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                    <path d="M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.85 12.15L19 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18 5L19 4L20 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M15 8L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Exceptional Service",
                description: "We pride ourselves on attention to detail and personalized service that anticipates needs before they arise, creating truly memorable experiences."
              },
              {
                icon: (
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Responsible Tourism",
                description: "We partner with properties and operators committed to sustainable practices, supporting local communities and preserving cultural heritage."
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg shadow-md transition-transform hover:transform hover:-translate-y-1"
              >
                <div className="mb-5">{value.icon}</div>
                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="page-container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-sm uppercase tracking-widest text-gold font-medium">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">
              Meet The Experts Behind StayBeyond
            </h2>
            <p className="text-muted-foreground">
              Our team combines decades of experience in luxury hospitality with deep knowledge of India's diverse regions and cultures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Aashray Shukla",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQETgVaW1YpLgg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719151399005?e=1751500800&v=beta&t=ptSz2FHbp85D19PIDV21mj-1GF2EqRqMkB3o953pLus"
              },
              {
                name: "Siddhant Sakharkar",
                image: "https://media.licdn.com/dms/image/v2/D4D03AQG0HXNL8tPrng/profile-displayphoto-shrink_400_400/B4DZXco8vNGkAg-/0/1743163478298?e=1751500800&v=beta&t=FaTWKSMGCOca9i3TSqfrtx9JximsUDDE-r4BSHeDA1w"
              },
              {
                name: "Enayat Khan",
                image: "https://media.licdn.com/dms/image/v2/D4E03AQFJgLojosxvsA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1723130965819?e=1751500800&v=beta&t=wkwe6c_SWnozFwxrESwHMA5y210fAG2EUlsY3nGa6JU"
              },
              {
                name: "Yashwardhan Gaikwad",
                image:"https://www.google.com/imgres?q=black%20profile&imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2Fc0%2F74%2F9b%2Fc0749b7cc401421662ae901ec8f9f660.jpg&imgrefurl=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F792070653234421442%2F&docid=IXb5PH3FKQqNhM&tbnid=Hus9rsDo6r0IEM&vet=12ahUKEwj3_ebP_YONAxXSma8BHf2mCD0QM3oECBoQAA..i&w=736&h=736&hcb=2&ved=2ahUKEwj3_ebP_YONAxXSma8BHf2mCD0QM3oECBoQAA"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="h-64 w-64 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800";
                    }}
                  />
                </div>
                <h3 className="text-lg font-medium">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-stone-dark text-white">
        <div className="page-container text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 max-w-2xl mx-auto">
            Ready to Experience Luxury Travel With StayBeyond?
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8">
            Start planning your next extraordinary journey across India with our curated collection of luxury accommodations and premium transport options.
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
              className="px-8 py-3 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-md transition-all text-sm font-medium"
            >
              Explore Transport Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
