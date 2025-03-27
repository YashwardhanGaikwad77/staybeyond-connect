
export interface Transport {
  id: string;
  name: string;
  type: 'air' | 'road' | 'rail' | 'water';
  description: string;
  longDescription?: string;
  basePrice: number;
  currency: string;
  image: string;
  features: string[];
  duration?: string;
  origin?: string;
  destination?: string;
  featured?: boolean;
  availableLocations: string[];
}

const transport: Transport[] = [
  {
    id: "1",
    name: "Luxury Private Jet",
    type: "air",
    description: "Experience ultimate luxury with a private jet charter for your travels across India.",
    longDescription: "Elevate your travel experience with our premium private jet service, offering unparalleled comfort and convenience. Skip the hassles of commercial airports with dedicated terminals and expedited security. Our fleet features the latest luxury jets with spacious cabins, plush seating, and state-of-the-art entertainment systems. Enjoy gourmet catering customized to your preferences, premium beverages, and attentive cabin crew service. Our flexible scheduling allows for departures at your convenience, with the ability to visit multiple destinations in a single day.",
    basePrice: 250000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800",
    features: [
      "Personalized flight scheduling",
      "Luxury cabin with premium amenities",
      "Gourmet catering",
      "Expedited security and customs",
      "Door-to-door ground transportation",
      "Dedicated concierge service"
    ],
    featured: true,
    availableLocations: [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Chennai",
      "Hyderabad",
      "Kolkata",
      "Jaipur",
      "Udaipur",
      "Goa",
      "Kerala"
    ]
  },
  {
    id: "2",
    name: "Helicopter Transfer",
    type: "air",
    description: "Scenic helicopter transfers to remote destinations and hill stations.",
    longDescription: "Bypass winding mountain roads and long drives with our scenic helicopter transfer service. Perfect for reaching remote hill stations and mountain retreats in a fraction of the time of conventional travel. Our fleet of modern helicopters provides comfortable seating, panoramic windows for breathtaking aerial views, and skilled pilots familiar with mountain terrain. Available for airport pickups, resort transfers, or sightseeing tours over spectacular landscapes. Experience the thrill of flying over scenic valleys, snow-capped peaks, and pristine forests while arriving at your destination refreshed and ready to explore.",
    basePrice: 95000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1608236497015-3cdb8248ad56?auto=format&fit=crop&w=800",
    features: [
      "Aerial sightseeing",
      "Reaches remote locations",
      "Time-saving transfers",
      "Experienced mountain pilots",
      "Flexible scheduling",
      "Luggage allowance"
    ],
    availableLocations: [
      "Shimla",
      "Darjeeling",
      "Mussoorie",
      "Rishikesh",
      "Coorg",
      "Munnar",
      "Ladakh",
      "Andaman Islands"
    ]
  },
  {
    id: "3",
    name: "Vintage Royal Train",
    type: "rail",
    description: "Travel across Rajasthan in a refurbished royal train with luxury cabins and fine dining.",
    longDescription: "Step back in time and experience the grandeur of India's royal past aboard our meticulously restored vintage royal train. Modeled after the private railways of maharajas, this elegant train features wood-paneled cabins with plush furnishings, en-suite bathrooms, and attentive butler service. The journey includes stops at historic forts, palaces, and cultural sites with expertly guided excursions. On board, enjoy gourmet dining in opulent restaurant cars serving regional specialties and international cuisine. Evening entertainment showcases traditional music and dance performances in the lavishly decorated lounge car. Travel in regal splendor while watching the diverse landscapes of Rajasthan unfold outside your window.",
    basePrice: 185000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1553773077-91173e3d6b22?auto=format&fit=crop&w=800",
    features: [
      "Luxury private cabins",
      "Gourmet dining cars",
      "Butler service",
      "Guided heritage tours",
      "Evening cultural programs",
      "Observation lounge"
    ],
    duration: "7 days",
    origin: "Delhi",
    destination: "Udaipur",
    featured: true,
    availableLocations: [
      "Delhi",
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Jaisalmer",
      "Bikaner",
      "Agra"
    ]
  },
  {
    id: "4",
    name: "Premium Sedan Service",
    type: "road",
    description: "Chauffeured luxury sedan service with professional drivers across major cities.",
    longDescription: "Enjoy seamless travel with our premium chauffeured sedan service available in major cities and tourist destinations throughout India. Our fleet features luxury vehicles including Mercedes-Benz, BMW, and Audi models, all maintained to the highest standards of comfort and safety. Professional drivers are carefully selected for their experience, local knowledge, and commitment to customer service. Vehicles come equipped with complimentary Wi-Fi, bottled water, refreshment options, and charging ports. Whether for airport transfers, city tours, or day trips to nearby attractions, our service ensures you travel in style and comfort. Advance booking allows for personalization of your in-car experience, including temperature preferences, music selection, and specific amenities.",
    basePrice: 7500,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800",
    features: [
      "Luxury vehicles (Mercedes, BMW, Audi)",
      "Professional chauffeurs",
      "In-car Wi-Fi",
      "Refreshments",
      "Airport meet & greet",
      "Flexible hourly booking"
    ],
    availableLocations: [
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Chennai",
      "Hyderabad",
      "Kolkata",
      "Jaipur",
      "Agra",
      "Goa",
      "Kerala"
    ]
  },
  {
    id: "5",
    name: "Luxury Houseboat",
    type: "water",
    description: "Traditional Kerala houseboat with modern amenities cruising through backwaters.",
    longDescription: "Drift through Kerala's serene backwaters aboard a traditional kettuvallam (houseboat) enhanced with modern luxury. These floating villas are handcrafted using ancient techniques with natural materials like jackwood, bamboo, and coir, yet fitted with contemporary amenities for ultimate comfort. Spacious air-conditioned bedrooms feature premium bedding and en-suite bathrooms, while panoramic windows provide continuous views of the passing landscape. A dedicated crew including captain, chef, and attendant ensures personalized service throughout your journey. Your private chef prepares authentic Kerala cuisine featuring fresh seafood and local specialties, served in the open-air dining area. The route winds through narrow canals, past village life and lush paddy fields, with opportunities to stop for village walks, bird watching, or cultural interactions.",
    basePrice: 32000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1605538032404-d5e869096a7b?auto=format&fit=crop&w=800",
    features: [
      "Air-conditioned bedrooms",
      "Private chef",
      "Panoramic views",
      "Open-air dining",
      "Sundeck",
      "Authentic Kerala cuisine"
    ],
    duration: "1-3 days",
    origin: "Alleppey",
    destination: "Kumarakom",
    featured: true,
    availableLocations: [
      "Alleppey",
      "Kumarakom",
      "Kollam",
      "Kochi"
    ]
  },
  {
    id: "6",
    name: "Vintage Car Tour",
    type: "road",
    description: "Explore historic cities in a chauffeur-driven vintage car from the royal era.",
    longDescription: "Make your exploration of India's historic cities truly memorable with our collection of meticulously restored vintage and classic automobiles. Choose from elegant Rolls-Royces, sporty Jaguars, stately Daimlers, or classic Ambassadors—many with royal provenance. Each vehicle comes with a chauffeur dressed in period-appropriate attire, enhancing the authentic experience. These guided tours are customized to your interests, focusing on heritage sites, architectural marvels, or cultural districts. The unhurried pace allows for frequent photo opportunities and spontaneous stops. Evening drives are particularly magical, with illuminated monuments and the romance of bygone eras. Perfect for special occasions, honeymoons, or creating unique travel memories.",
    basePrice: 15000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1566879630465-796cf13eb508?auto=format&fit=crop&w=800",
    features: [
      "Restored vintage automobiles",
      "Knowledgeable guides",
      "Period-dressed chauffeurs",
      "Customized routes",
      "Photography stops",
      "Historical commentary"
    ],
    duration: "Half-day or Full-day",
    availableLocations: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Mysore",
      "Hyderabad",
      "Kolkata"
    ]
  },
  {
    id: "7",
    name: "Luxury Mountain Coach",
    type: "road",
    description: "Premium coach service with panoramic windows designed for mountain routes.",
    longDescription: "Travel in comfort through India's spectacular mountain regions in our specially designed luxury coaches. These vehicles feature panoramic windows and glass roofs that maximize scenic views of mountain passes, valleys, and villages. The specially engineered suspension system ensures a smooth ride even on winding mountain roads. Reclining seats with extended legroom, climate control, and onboard restrooms make long journeys comfortable. An experienced mountain driver and guide accompany each trip, providing commentary on local culture, geography, and points of interest. Regular stops at scenic viewpoints, tea houses, and local villages enhance your mountain experience. This service connects major hill stations and mountain retreats with convenient schedules and pickup points.",
    basePrice: 4500,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800",
    features: [
      "Panoramic windows",
      "Reclining premium seats",
      "Climate control",
      "Mountain-trained drivers",
      "Onboard refreshments",
      "Wi-Fi connectivity"
    ],
    duration: "Varies by route",
    availableLocations: [
      "Shimla",
      "Manali",
      "Dharamshala",
      "Mussoorie",
      "Darjeeling",
      "Gangtok",
      "Nainital",
      "Munnar",
      "Ooty"
    ]
  },
  {
    id: "8",
    name: "Desert Camel Safari",
    type: "road",
    description: "Traditional yet comfortable camel safari through the Thar Desert with luxury camping.",
    longDescription: "Experience the timeless romance of desert travel with our luxury camel safari through the golden dunes of the Thar Desert. This carefully curated journey combines traditional modes of transport with unexpected comforts. Travel aboard specially selected camels with ergonomic saddles designed for comfort during long rides. Expert camel men from local desert communities guide your journey, sharing generations of desert knowledge. The safari includes stops at remote villages, ancient temples, and spectacular dune formations. As the sun sets, arrive at a luxury desert camp featuring spacious tents with proper beds, en-suite bathrooms, and traditional décor. Evenings bring candlelit dinners under the stars, traditional Rajasthani folk performances, and storytelling around the campfire. Wake to spectacular desert sunrises before continuing your journey.",
    basePrice: 18000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1578912996078-50c9f6f59e7e?auto=format&fit=crop&w=800",
    features: [
      "Guided camel trekking",
      "Luxury desert camping",
      "Traditional performances",
      "Stargazing sessions",
      "Gourmet desert cuisine",
      "Sunset sundowners"
    ],
    duration: "2-5 days",
    origin: "Jaisalmer",
    destination: "Sam Sand Dunes",
    availableLocations: [
      "Jaisalmer",
      "Jodhpur",
      "Bikaner",
      "Pushkar"
    ]
  },
  {
    id: "9",
    name: "Hill Station Toy Train",
    type: "rail",
    description: "Heritage narrow-gauge mountain railway journey through picturesque Himalayan landscapes.",
    longDescription: "Step aboard a piece of living history with a journey on one of India's UNESCO World Heritage mountain railways. These charming narrow-gauge 'toy trains' have been winding through Himalayan landscapes since the British colonial era, offering an enchanting slow travel experience. The meticulously maintained vintage carriages include first-class observation cars with large windows and comfortable seating for optimal views. The train winds through spectacular mountain scenery, crossing impressive viaducts, passing through hand-cut tunnels, and climbing steep gradients via ingenious engineering solutions. The unhurried pace allows passengers to fully absorb the changing landscapes, from subtropical forests to rhododendron groves and tea plantations. The journey includes stops at quaint mountain stations where time seems to stand still, with opportunities for photography and refreshments.",
    basePrice: 9500,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1540228232483-1456648e366f?auto=format&fit=crop&w=800",
    features: [
      "Heritage mountain railway",
      "Panoramic viewing cars",
      "UNESCO World Heritage journey",
      "Historic mountain stations",
      "Guided commentary",
      "Picturesque photo stops"
    ],
    duration: "Full day",
    origin: "New Jalpaiguri",
    destination: "Darjeeling",
    availableLocations: [
      "Darjeeling-Himalayan Railway",
      "Kalka-Shimla Railway",
      "Nilgiri Mountain Railway (Ooty)"
    ]
  },
  {
    id: "10",
    name: "Private Yacht Charter",
    type: "water",
    description: "Exclusive yacht charter for coastal exploration and island hopping in Goa or Andamans.",
    longDescription: "Discover India's stunning coastlines and hidden coves with our private yacht charter service available in select coastal destinations. Choose from our fleet of luxury motor yachts and sailing vessels, ranging from intimate 40-foot cruisers to expansive 100-foot yachts with multiple cabins. Each vessel features premium amenities including spacious sundecks, climate-controlled interiors, and water sports equipment. Professional crew including captain, steward, and chef ensure a personalized experience, with gourmet meals prepared to your preferences using fresh local seafood and produce. Popular itineraries include sunset cruises, full-day island explorations, dolphin watching excursions, and multi-day sailing adventures. Snorkeling at vibrant coral reefs, visits to secluded beaches accessible only by boat, and anchoring in tranquil bays for swimming and water sports create unforgettable maritime experiences.",
    basePrice: 75000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1554254648-2d58a1bc3fd5?auto=format&fit=crop&w=800",
    features: [
      "Private captain and crew",
      "Gourmet catering",
      "Water sports equipment",
      "Snorkeling gear",
      "Island exploration",
      "Sunset cruises"
    ],
    duration: "Half-day to multi-day",
    featured: true,
    availableLocations: [
      "Goa",
      "Andaman Islands",
      "Mumbai",
      "Kerala",
      "Lakshadweep"
    ]
  },
  {
    id: "11",
    name: "Royal Elephant Safari",
    type: "road",
    description: "Ceremonial elephant ride with traditional howdah seating and royal procession.",
    longDescription: "Experience the majestic procession traditions of India's royal past with our carefully curated elephant safari experience. Travel like nobility aboard specially trained elephants adorned with vibrant ceremonial regalia and traditional painted designs. The comfortable howdah (elephant seat) is crafted from quality materials with cushioned seating, shade canopy, and secure railings. Expert mahouts from families with generations of elephant-handling experience ensure a safe and ethical journey. Available at select heritage properties and during certain festivals, this experience often includes a welcome ceremony with flower garlands, musicians, and ceremonial parasol bearers walking alongside. The gentle pace provides a unique vantage point for viewing palace grounds, ancient forts, or natural landscapes. Photography assistants help capture this remarkable experience, while historians provide context about royal elephant traditions.",
    basePrice: 22000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1577005233157-f49cca1b2877?auto=format&fit=crop&w=800",
    features: [
      "Traditional howdah seating",
      "Ceremonial elephant decoration",
      "Welcome rituals",
      "Accompanying musicians",
      "Historical commentary",
      "Professional photography"
    ],
    duration: "1-2 hours",
    availableLocations: [
      "Jaipur",
      "Udaipur",
      "Jodhpur",
      "Mysore",
      "Jaisalmer"
    ]
  },
  {
    id: "12",
    name: "Trekking Expedition",
    type: "road",
    description: "Guided Himalayan trekking with porters, quality equipment, and luxury camping.",
    longDescription: "Discover the magnificent Himalayan wilderness with our premium trekking expeditions that combine adventure with unexpected comforts. Unlike standard trekking packages, our service provides expedition-quality equipment, experienced guides with wilderness first-aid certification, and a support team that handles all logistics. Porters carry your gear between locations, allowing you to hike with only a light daypack. Overnight accommodations feature spacious weatherproof tents with raised cots, quality sleeping bags, and even hot water bottles on cold nights. After each day's trek, arrive to a fully established camp with a dining tent serving freshly prepared multi-course meals, solar charging stations for devices, and basic shower facilities. Routes are customized based on your fitness level and interests, from moderate walks through rhododendron forests and mountain villages to challenging high-altitude passes with panoramic views of snow-capped peaks.",
    basePrice: 25000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1496275068113-fff8c90750d1?auto=format&fit=crop&w=800",
    features: [
      "Expert Himalayan guides",
      "Porter service",
      "Quality camping equipment",
      "Freshly prepared meals",
      "Medical support",
      "Customized routes"
    ],
    duration: "5-12 days",
    availableLocations: [
      "Himachal Pradesh",
      "Uttarakhand",
      "Sikkim",
      "Ladakh",
      "Kashmir",
      "Arunachal Pradesh"
    ]
  },
  {
    id: "13",
    name: "Hot Air Balloon Safari",
    type: "air",
    description: "Scenic hot air balloon flights over historic cities, forests, or desert landscapes.",
    longDescription: "Gain a breathtaking new perspective on India's landscapes with our hot air balloon safari experience available in select destinations. Flights begin at dawn when weather conditions are optimal, starting with an exciting inflation process where you can watch your colorful balloon come to life. Once airborne, drift peacefully at varying altitudes guided by gentle winds. In Rajasthan, float over ancient forts, palaces, and the golden Thar Desert. In forest regions, glide above tree canopies with possibilities of spotting wildlife in their natural habitat. Your experienced pilot controls altitude and direction while providing informative commentary on landmarks and landscapes below. After approximately one hour in the air, enjoy a traditional champagne toast upon landing—a ballooning tradition—followed by a gourmet breakfast picnic. The entire experience is photographed, with digital images provided as a memento.",
    basePrice: 25000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800",
    features: [
      "Sunrise flights",
      "Experienced pilots",
      "Champagne celebration",
      "Gourmet breakfast",
      "Aerial photography",
      "Flight certificate"
    ],
    duration: "3-4 hours (1 hour flight)",
    availableLocations: [
      "Jaipur",
      "Pushkar",
      "Ranthambore",
      "Lonavala",
      "Goa"
    ]
  },
  {
    id: "14",
    name: "Luxury River Cruise",
    type: "water",
    description: "Multi-day cruise on the Ganges or Brahmaputra rivers with luxury cabins and cultural excursions.",
    longDescription: "Embark on a journey of discovery aboard our luxury river cruisers navigating India's mighty rivers. These floating boutique hotels feature spacious cabins with panoramic windows or private balconies, en-suite bathrooms, and elegant furnishings inspired by colonial and local designs. The vessels offer multiple decks including a panoramic observation lounge, a partially covered sundeck perfect for yoga or wildlife spotting, and a refined dining room serving regional and international cuisine. Expert guides lead daily excursions to riverside temples, historic sites, rural villages, and wildlife areas, returning to the comfort of your floating accommodation each evening. Cultural programs featuring local musicians and dancers, culinary demonstrations, and educational talks about history and wildlife enhance the onboard experience. The gentle pace of river travel reveals aspects of India rarely seen by conventional travelers, from religious rituals along the Ganges to remote tribal villages along the Brahmaputra.",
    basePrice: 250000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800",
    features: [
      "Luxury river vessels",
      "Private balcony cabins",
      "Guided shore excursions",
      "All-inclusive dining",
      "Cultural performances",
      "Expert naturalists"
    ],
    duration: "7-10 days",
    origin: "Kolkata",
    destination: "Varanasi",
    featured: true,
    availableLocations: [
      "Ganges River (Uttar Pradesh, Bihar, West Bengal)",
      "Brahmaputra River (Assam)",
      "Kerala Backwaters"
    ]
  },
  {
    id: "15",
    name: "Classic Indian Motorcycle Tour",
    type: "road",
    description: "Self-drive or chauffeur-driven tours on classic Royal Enfield motorcycles with support vehicle.",
    longDescription: "Experience the freedom of the open road and the nostalgia of classic motorcycling with our Royal Enfield touring experience. Choose from meticulously maintained Royal Enfield motorcycles—India's iconic bikes known for their distinctive thump and vintage appeal. Tours are available as self-drive experiences for licensed motorcyclists or with experienced drivers for those who prefer to ride pillion. Each journey is accompanied by a support vehicle carrying luggage, spare parts, refreshments, and first-aid equipment. Routes are carefully selected to combine scenic beauty, cultural interest, and good riding conditions, whether through the twisting roads of the Western Ghats, the high mountain passes of Ladakh, or the coastal highways of Kerala. Accommodations range from heritage properties to boutique hotels, with secure overnight parking for the motorcycles. Comprehensive briefings, quality safety gear, and detailed route maps with points of interest are provided for self-drivers.",
    basePrice: 18000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?auto=format&fit=crop&w=800",
    features: [
      "Classic Royal Enfield motorcycles",
      "Self-drive or chauffeur option",
      "Support vehicle",
      "Premium safety gear",
      "Curated scenic routes",
      "Boutique accommodations"
    ],
    duration: "3-15 days",
    availableLocations: [
      "Ladakh",
      "Rajasthan",
      "Himachal Pradesh",
      "Western Ghats",
      "Kerala",
      "Northeast India"
    ]
  },
  {
    id: "16",
    name: "Private Seaplane Service",
    type: "air",
    description: "Seaplane transfers between coastal cities and island destinations with water landings.",
    longDescription: "Combine the speed of air travel with the convenience of water landings through our private seaplane service operating in select coastal and lake regions. These versatile aircraft eliminate the need for conventional airports, landing directly on water bodies near your destination. The amphibious capability allows for dramatic arrivals, such as landing on a lake beside your mountain resort or near the private dock of your island accommodation. The aircraft feature spacious interiors with large windows offering spectacular aerial views of coastlines, islands, and marine life. Flying at lower altitudes than commercial aircraft provides an immersive sightseeing experience during transfers. Flights can be booked for direct transfers or scenic tours with professional pilots who double as knowledgeable guides. This service is particularly valuable for reaching remote island resorts or lakeside destinations that would otherwise require lengthy boat transfers.",
    basePrice: 85000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1518623001779-eb8242d71389?auto=format&fit=crop&w=800",
    features: [
      "Water landings",
      "Aerial sightseeing",
      "Time-saving transfers",
      "Remote destination access",
      "Flexible scheduling",
      "Exclusive arrival experience"
    ],
    availableLocations: [
      "Andaman Islands",
      "Goa",
      "Kerala",
      "Maharashtra coastal region",
      "Kashmir lakes",
      "Udaipur lakes"
    ]
  },
  {
    id: "17",
    name: "Wildlife Safari Jeep",
    type: "road",
    description: "Custom 4x4 safari vehicles with naturalist guides for wildlife excursions in national parks.",
    longDescription: "Explore India's diverse national parks and wildlife sanctuaries in our specially outfitted 4x4 safari vehicles designed for optimal wildlife viewing and photography. Unlike standard park transportation, our customized jeeps feature elevated seating for better sightlines, 360-degree visibility with canvas roofs that can be opened, camera rests for stabilization, and reduced engine noise for minimal wildlife disturbance. Each excursion is led by an expert naturalist guide with deep knowledge of animal behavior, tracking skills, and familiarity with the best wildlife viewing locations. The vehicles carry premium binoculars for all passengers, wildlife reference materials, and refreshments in cooling boxes. Morning drives include sunrise coffee stops in scenic locations, while evening safaris conclude with sundowner beverages at picturesque viewpoints. Special photography-focused excursions are available with adjusted timing and positioning for optimal lighting conditions.",
    basePrice: 12000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1624538698752-631c9c106d01?auto=format&fit=crop&w=800",
    features: [
      "Custom safari vehicles",
      "Expert naturalist guides",
      "Premium binoculars",
      "Strategic wildlife viewing",
      "Photo-optimized positioning",
      "Park entrance fees included"
    ],
    duration: "Half-day or Full-day",
    availableLocations: [
      "Ranthambore",
      "Bandhavgarh",
      "Kanha",
      "Corbett",
      "Kaziranga",
      "Gir",
      "Pench",
      "Sundarbans"
    ]
  },
  {
    id: "18",
    name: "Palace on Wheels Train",
    type: "rail",
    description: "India's iconic luxury train with royal cabins, fine dining, and curated heritage tours.",
    longDescription: "Experience the epitome of rail luxury aboard the legendary Palace on Wheels, a rolling palace that recreates the opulent train journeys once enjoyed by India's maharajas and British viceroys. The train features beautifully appointed cabins named after former princely states, each decorated with period furniture, rich textiles, and private bathrooms. Public areas include two restaurant cars serving continental and Indian royal cuisines, a well-stocked bar lounge with panoramic windows, and a spa car offering rejuvenating treatments during the journey. The meticulously planned itinerary includes daily excursions to UNESCO World Heritage sites, majestic forts, and cultural attractions, with local experts guiding each tour. Traditional welcomes with flower garlands, music, and dance performances greet passengers at each destination. The attentive onboard staff includes personal attendants assigned to each cabin, ensuring a truly royal experience as the train travels through the enchanting landscapes of northern India.",
    basePrice: 350000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1576577445342-258ab8fcd20e?auto=format&fit=crop&w=800",
    features: [
      "Deluxe private cabins",
      "Royal dining experience",
      "Daily guided excursions",
      "Traditional welcomes",
      "Onboard entertainment",
      "Personal attendants"
    ],
    duration: "7 days",
    origin: "Delhi",
    destination: "Delhi (circular route)",
    availableLocations: [
      "Delhi",
      "Jaipur",
      "Sawai Madhopur",
      "Chittorgarh",
      "Udaipur",
      "Jaisalmer",
      "Jodhpur",
      "Bharatpur",
      "Agra"
    ]
  },
  {
    id: "19",
    name: "Mountain Biking Expedition",
    type: "road",
    description: "Guided mountain biking tours through scenic routes with high-end bikes and support.",
    longDescription: "Challenge yourself with our premium mountain biking expeditions through India's most spectacular landscapes, from the high Himalayas to the rolling Western Ghats. We provide top-tier mountain bikes with full suspension, hydraulic disc brakes, and components selected for the specific terrain of your chosen route. Rides are led by certified mountain biking guides with intimate knowledge of the trails, local culture, and safety protocols. A support vehicle follows with spare parts, first aid equipment, hydration supplies, and the ability to transport tired riders. Routes range from moderate scenic rides suitable for intermediate cyclists to technical single-track adventures for experienced riders. Daily distances are customized to your fitness level, with flexible options for more challenging side excursions or shorter alternatives. Accommodations include carefully selected boutique hotels, eco-lodges, and luxury camping, all with secure bike storage and maintenance facilities.",
    basePrice: 15000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800",
    features: [
      "Premium mountain bikes",
      "Expert cycling guides",
      "Support vehicle",
      "Trail-side picnics",
      "GPS route mapping",
      "Technical riding instruction"
    ],
    duration: "3-10 days",
    availableLocations: [
      "Himachal Pradesh",
      "Uttarakhand",
      "Ladakh",
      "Western Ghats",
      "Meghalaya",
      "Nilgiri Hills"
    ]
  },
  {
    id: "20",
    name: "Luxury Sailboat Charter",
    type: "water",
    description: "Private sailing yacht with crew for coastal exploration and sunset cruises.",
    longDescription: "Harness the power of the wind with our luxury sailboat charter service available in select coastal destinations. Our fleet ranges from sporty 36-foot monohulls perfect for day sailing to spacious 50-foot catamarans ideal for overnight coastal explorations. Each vessel is equipped with comfortable cabins, well-appointed galleys, and outdoor lounging areas. Professional skippers with extensive local knowledge navigate coastal waters, finding secluded coves and beaches accessible only by boat. For longer charters, onboard chefs prepare fresh meals highlighting local seafood and produce. Activities include guided snorkeling over vibrant coral reefs, paddleboarding in tranquil bays, fishing excursions, and beach picnics on deserted shores. Sunset sails feature premium beverages and carefully selected appetizers as you watch the day end in spectacular fashion. Both experienced sailors looking for participatory adventures and non-sailors seeking relaxed cruising experiences are accommodated with customized sailing plans.",
    basePrice: 45000,
    currency: "INR",
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=800",
    features: [
      "Professional captain",
      "Sailing instruction option",
      "Snorkeling equipment",
      "Gourmet catering",
      "Water sports gear",
      "Sunset cruises"
    ],
    duration: "Half-day to multi-day",
    availableLocations: [
      "Goa",
      "Andaman Islands",
      "Kerala",
      "Mumbai",
      "Chennai"
    ]
  }
];

export default transport;
