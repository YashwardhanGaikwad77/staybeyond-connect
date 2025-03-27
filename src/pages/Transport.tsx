
import { useState, useEffect } from "react";
import { MapPin, Search, X, SlidersHorizontal } from "lucide-react";
import TransportCard from "@/components/TransportCard";
import transport from "@/data/transport";
import type { Transport } from "@/data/transport";

const TransportPage = () => {
  const [filteredTransport, setFilteredTransport] = useState<Transport[]>(transport);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>([0, 400000]);
  const [showFilters, setShowFilters] = useState(false);

  // All available types
  const types = ["air", "road", "rail", "water"];
  
  // All available locations
  const locations = Array.from(
    new Set(
      transport.flatMap(item => item.availableLocations)
    )
  ).sort();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Apply filters
    const filtered = transport.filter((item) => {
      // Search filter
      const searchMatch = 
        searchQuery === "" || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.origin && item.origin.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.destination && item.destination.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Type filter
      const typeMatch = typeFilter === "" || item.type === typeFilter;
      
      // Location filter
      const locationMatch = locationFilter === "" || item.availableLocations.includes(locationFilter);
      
      // Price range filter
      const priceMatch = item.basePrice >= priceRangeFilter[0] && item.basePrice <= priceRangeFilter[1];
      
      return searchMatch && typeMatch && locationMatch && priceMatch;
    });
    
    setFilteredTransport(filtered);
  }, [searchQuery, typeFilter, locationFilter, priceRangeFilter]);

  const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };

  const handleLocationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationFilter(e.target.value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRangeFilter(prevRange => [prevRange[0], value]);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setTypeFilter("");
    setLocationFilter("");
    setPriceRangeFilter([0, 400000]);
  };

  const toggleFilters = () => {
    setShowFilters(prevState => !prevState);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero section */}
      <div className="relative bg-stone-dark text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1920" 
            alt="Transport" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 page-container">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 animate-fade-in-down">
            Luxury Transport Options
          </h1>
          <p className="max-w-xl text-white/80 mb-6 animate-fade-in-down" style={{ animationDelay: "100ms" }}>
            Travel in style with our premium transportation services, from private jets to vintage trains and luxury houseboats.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-2xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="flex-1 flex items-center pl-4">
                <Search size={18} className="text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="Search by name, location, or type"
                  className="w-full py-3 px-2 text-foreground focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                onClick={toggleFilters}
                className="px-4 py-3 bg-gold hover:bg-gold-dark text-white transition-colors flex items-center"
              >
                <SlidersHorizontal size={18} className="mr-2" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-border shadow-sm animate-fade-in-down">
          <div className="page-container py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="w-full sm:w-auto">
                  <label className="block text-sm text-muted-foreground mb-1">Type</label>
                  <select
                    className="w-full sm:w-auto px-3 py-2 border border-border rounded-md"
                    value={typeFilter}
                    onChange={handleTypeFilterChange}
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type} className="capitalize">{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <label className="block text-sm text-muted-foreground mb-1">Location</label>
                  <select
                    className="w-full sm:w-auto px-3 py-2 border border-border rounded-md"
                    value={locationFilter}
                    onChange={handleLocationFilterChange}
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <label className="block text-sm text-muted-foreground mb-1">
                    Price Range (up to ₹{priceRangeFilter[1].toLocaleString()})
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="400000"
                    step="10000"
                    value={priceRangeFilter[1]}
                    onChange={handlePriceRangeChange}
                    className="w-full sm:w-48"
                  />
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button
                  onClick={resetFilters}
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} className="mr-1" />
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Transport type sections */}
      <div className="bg-stone-light py-12">
        <div className="page-container">
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredTransport.length} {filteredTransport.length === 1 ? "transport option" : "transport options"} found
              {typeFilter && ` • ${typeFilter}`}
              {locationFilter && ` • ${locationFilter}`}
              {searchQuery && ` • Matching "${searchQuery}"`}
            </p>
          </div>
          
          {filteredTransport.length > 0 ? (
            <div>
              {typeFilter === "" ? (
                // Group by type when no type filter is applied
                <>
                  {types.map(type => {
                    const typeOptions = filteredTransport.filter(item => item.type === type);
                    if (typeOptions.length === 0) return null;
                    
                    return (
                      <div key={type} className="mb-12">
                        <h2 className="text-2xl font-serif mb-6 capitalize">{type} Transport</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {typeOptions.map((item) => (
                            <div key={item.id} className="animate-fade-in-up">
                              <TransportCard transport={item} />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                // Show all filtered results when a type filter is applied
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTransport.map((item) => (
                    <div key={item.id} className="animate-fade-in-up">
                      <TransportCard transport={item} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
                <MapPin size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No transport options found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any transport options matching your criteria. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 border border-border rounded-md text-sm hover:bg-white transition-colors"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransportPage;
