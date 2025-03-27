
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Search, X, SlidersHorizontal } from "lucide-react";
import StayCard from "@/components/StayCard";
import stays from "@/data/stays";
import type { Stay } from "@/data/stays";

const Listings = () => {
  const location = useLocation();
  const [filteredStays, setFilteredStays] = useState<Stay[]>(stays);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>("");
  const [priceRangeFilter, setPriceRangeFilter] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  // All available states
  const states = Array.from(new Set(stays.map(stay => stay.state))).sort();
  
  // All available property types
  const propertyTypes = Array.from(new Set(stays.map(stay => stay.propertyType))).sort();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Apply filters
    const filtered = stays.filter((stay) => {
      // Search filter
      const searchMatch = 
        searchQuery === "" || 
        stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      // State filter
      const stateMatch = stateFilter === "" || stay.state === stateFilter;
      
      // Property type filter
      const propertyTypeMatch = propertyTypeFilter === "" || stay.propertyType === propertyTypeFilter;
      
      // Price range filter
      const priceMatch = stay.price >= priceRangeFilter[0] && stay.price <= priceRangeFilter[1];
      
      return searchMatch && stateMatch && propertyTypeMatch && priceMatch;
    });
    
    setFilteredStays(filtered);
  }, [searchQuery, stateFilter, propertyTypeFilter, priceRangeFilter]);

  const handleStateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStateFilter(e.target.value);
  };

  const handlePropertyTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyTypeFilter(e.target.value);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRangeFilter(prevRange => [prevRange[0], value]);
  };

  const resetFilters = () => {
    setSearchQuery("");
    setStateFilter("");
    setPropertyTypeFilter("");
    setPriceRangeFilter([0, 100000]);
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
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920" 
            alt="Accommodations" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 page-container">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 animate-fade-in-down">
            Luxury Accommodations
          </h1>
          <p className="max-w-xl text-white/80 mb-6 animate-fade-in-down" style={{ animationDelay: "100ms" }}>
            Discover our curated collection of extraordinary stays across India, from heritage palaces to beachfront villas.
          </p>
          
          {/* Search bar */}
          <div className="relative max-w-2xl animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="flex-1 flex items-center pl-4">
                <Search size={18} className="text-muted-foreground mr-2" />
                <input
                  type="text"
                  placeholder="Search by location, city, or property name"
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
                  <label className="block text-sm text-muted-foreground mb-1">State</label>
                  <select
                    className="w-full sm:w-auto px-3 py-2 border border-border rounded-md"
                    value={stateFilter}
                    onChange={handleStateFilterChange}
                  >
                    <option value="">All States</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-auto">
                  <label className="block text-sm text-muted-foreground mb-1">Property Type</label>
                  <select
                    className="w-full sm:w-auto px-3 py-2 border border-border rounded-md"
                    value={propertyTypeFilter}
                    onChange={handlePropertyTypeFilterChange}
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
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
                    max="100000"
                    step="1000"
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
      
      {/* Results */}
      <div className="bg-stone-light py-12">
        <div className="page-container">
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredStays.length} {filteredStays.length === 1 ? "property" : "properties"} found
              {stateFilter && ` in ${stateFilter}`}
              {propertyTypeFilter && ` • ${propertyTypeFilter}`}
              {searchQuery && ` • Matching "${searchQuery}"`}
            </p>
          </div>
          
          {filteredStays.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStays.map((stay) => (
                <div key={stay.id} className="animate-fade-in-up">
                  <StayCard stay={stay} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
                <MapPin size={24} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No properties found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any properties matching your criteria. Try adjusting your filters or search terms.
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

export default Listings;
