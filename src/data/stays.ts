
export interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface StayAmenity {
  name: string;
  description?: string;
}

export interface Stay {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  description: string;
  longDescription?: string;
  price: number;
  currency: string;
  images: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  amenities: StayAmenity[];
  bookingAvailable: boolean;
  featured?: boolean;
  propertyType: string;
  host: {
    name: string;
    image?: string;
    joinedDate: string;
    isSuperhost: boolean;
  };
}

// Sample data for 20 luxurious stays across India
const stays: Stay[] = [
  {
    id: "1",
    name: "Lakeside Villa in Udaipur",
    location: "Lake Pichola, Udaipur",
    city: "Udaipur",
    state: "Rajasthan",
    description: "Luxurious villa with stunning views of Lake Pichola and the City Palace.",
    longDescription: "Experience royal living in this magnificent lakeside villa in Udaipur. Wake up to panoramic views of the shimmering Lake Pichola and the majestic City Palace. Each room is meticulously designed with traditional Rajasthani décor and modern amenities. Enjoy private access to the lake, personalized butler service, and authentic Rajasthani cuisine prepared by our in-house chef. The rooftop terrace offers a perfect setting for sunset cocktails with the Aravalli hills in the backdrop.",
    price: 35000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800"
    ],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 4,
    rating: 4.9,
    reviewCount: 128,
    amenities: [
      { name: "Private Pool" },
      { name: "Lake View" },
      { name: "Butler Service" },
      { name: "In-house Chef" },
      { name: "Boat Access" },
      { name: "Air Conditioning" },
      { name: "WiFi" },
      { name: "Breakfast Included" }
    ],
    bookingAvailable: true,
    featured: true,
    propertyType: "Villa",
    host: {
      name: "Lakshmi Devi",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100",
      joinedDate: "2018-05-23",
      isSuperhost: true
    }
  },
  {
    id: "2",
    name: "Himalayan Retreat in Shimla",
    location: "Wildflower Hall, Shimla",
    city: "Shimla",
    state: "Himachal Pradesh",
    description: "A mountain lodge nestled in the Himalayas with breathtaking valley views.",
    longDescription: "Escape to this secluded mountain lodge nestled in the majestic Himalayas. Set amidst cedar forests, this retreat offers unparalleled views of snow-capped peaks and lush valleys. The architecture blends colonial charm with Himalayan influences, featuring stone walls, wooden beams, and cozy fireplaces. Spend your days hiking mountain trails, enjoying forest picnics, or simply relaxing on your private deck. Evenings bring stargazing opportunities and fireside dining with local Himachali cuisine.",
    price: 28000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1506974210756-8e1b8985d348?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    rating: 4.8,
    reviewCount: 95,
    amenities: [
      { name: "Mountain View" },
      { name: "Fireplace" },
      { name: "Hiking Trails" },
      { name: "Heated Floors" },
      { name: "Breakfast Included" },
      { name: "WiFi" },
      { name: "Private Deck" }
    ],
    bookingAvailable: true,
    propertyType: "Lodge",
    host: {
      name: "Vikram Singh",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100",
      joinedDate: "2019-01-15",
      isSuperhost: true
    }
  },
  {
    id: "3",
    name: "Beachfront Villa in Goa",
    location: "Vagator Beach, Goa",
    city: "Vagator",
    state: "Goa",
    description: "Modern luxury villa with private beach access and infinity pool.",
    longDescription: "Indulge in the ultimate Goan luxury at this spectacular beachfront villa. With direct access to the pristine sands of Vagator Beach, this modern retreat beautifully combines contemporary design with Portuguese influences. The villa features an infinity pool that seems to merge with the Arabian Sea, spacious outdoor living areas, and floor-to-ceiling windows that capture the magnificent ocean views. Enjoy private beach dinners, sunset yoga sessions, and personalized cocktail service from our resident mixologist.",
    price: 42000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800"
    ],
    maxGuests: 10,
    bedrooms: 5,
    beds: 6,
    baths: 5,
    rating: 4.9,
    reviewCount: 142,
    amenities: [
      { name: "Private Beach Access" },
      { name: "Infinity Pool" },
      { name: "Outdoor Dining" },
      { name: "BBQ Grill" },
      { name: "Beach Service" },
      { name: "Air Conditioning" },
      { name: "WiFi" }
    ],
    bookingAvailable: true,
    featured: true,
    propertyType: "Villa",
    host: {
      name: "Miguel Fernandes",
      image: "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?auto=format&fit=crop&w=100",
      joinedDate: "2017-11-08",
      isSuperhost: true
    }
  },
  {
    id: "4",
    name: "Heritage Haveli in Jaipur",
    location: "Old City, Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    description: "Restored 18th-century haveli with traditional Rajasthani architecture and modern luxuries.",
    longDescription: "Step back in time at this exquisitely restored 18th-century haveli in the heart of Jaipur's Old City. This architectural gem features ornate jharokhas (overhanging enclosed balconies), intricate mirror work, and traditional frescoes, all meticulously preserved. The courtyard garden offers a tranquil retreat from the bustling city, while the rooftop terrace provides stunning views of the Pink City and Nahargarh Fort. Each suite is uniquely decorated with antique furniture, hand-painted motifs, and silk textiles.",
    price: 25000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 3,
    rating: 4.7,
    reviewCount: 84,
    amenities: [
      { name: "Heritage Architecture" },
      { name: "Courtyard Garden" },
      { name: "Rooftop Terrace" },
      { name: "Cultural Performances" },
      { name: "Traditional Breakfast" },
      { name: "WiFi" },
      { name: "Air Conditioning" }
    ],
    bookingAvailable: true,
    propertyType: "Heritage Home",
    host: {
      name: "Rajvi Sharma",
      image: "https://images.unsplash.com/photo-1592621385612-4d7129426394?auto=format&fit=crop&w=100",
      joinedDate: "2020-02-10",
      isSuperhost: false
    }
  },
  {
    id: "5",
    name: "Luxury Houseboat in Kerala",
    location: "Alleppey Backwaters, Kerala",
    city: "Alleppey",
    state: "Kerala",
    description: "Traditional kettuvallam houseboat with premium amenities cruising through the backwaters.",
    longDescription: "Float through Kerala's serene backwaters on this luxurious traditional kettuvallam houseboat. Hand-crafted with natural materials like bamboo, rattan, and local wood, the boat offers an authentic experience with all modern comforts. The vessel features spacious bedrooms with panoramic windows, an open-air dining area serving fresh seafood and Kerala cuisine, and a sundeck perfect for yoga or relaxation. The journey takes you through narrow canals lined with coconut trees, past rural villages, and into expansive lake waters, all accompanied by a dedicated crew including a personal chef.",
    price: 32000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1605538032404-d5e869096a7b?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800"
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    rating: 4.9,
    reviewCount: 106,
    amenities: [
      { name: "Private Cruise" },
      { name: "Full Board Meals" },
      { name: "Sundeck" },
      { name: "Air Conditioning" },
      { name: "Personal Chef" },
      { name: "Guided Village Tours" }
    ],
    bookingAvailable: true,
    featured: true,
    propertyType: "Houseboat",
    host: {
      name: "Thomas Kurien",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100",
      joinedDate: "2019-07-22",
      isSuperhost: true
    }
  },
  {
    id: "6",
    name: "Tented Camp in Ranthambore",
    location: "Ranthambore National Park, Rajasthan",
    city: "Sawai Madhopur",
    state: "Rajasthan",
    description: "Luxury safari tents at the edge of Ranthambore National Park with tiger safari access.",
    longDescription: "Experience the wild in style at this luxury tented camp bordering Ranthambore National Park. The spacious canvas tents combine colonial safari aesthetics with modern luxury, featuring teakwood floors, four-poster beds, and private verandas overlooking the wilderness. Each tent has an en-suite bathroom with rain shower and clawfoot tub. The camp offers twice-daily tiger safaris with expert naturalists, campfire dinners under the stars, and wildlife photography workshops. The elevated location provides stunning views of the Aravalli Hills and occasional wildlife sightings right from your tent.",
    price: 38000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1561273575-42d3c5b3d4df?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1669024024763-e30138267b6e?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800"
    ],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    rating: 4.8,
    reviewCount: 72,
    amenities: [
      { name: "Safari Included" },
      { name: "Full Board Meals" },
      { name: "Private Veranda" },
      { name: "Naturalist Guide" },
      { name: "Campfire Dinners" },
      { name: "Wildlife Viewing" },
      { name: "Outdoor Shower" }
    ],
    bookingAvailable: true,
    propertyType: "Tented Camp",
    host: {
      name: "Arjun Singhania",
      image: "https://images.unsplash.com/photo-1609010697446-11f2155278f0?auto=format&fit=crop&w=100",
      joinedDate: "2018-09-30",
      isSuperhost: true
    }
  },
  {
    id: "7",
    name: "Tea Estate Bungalow in Darjeeling",
    location: "Happy Valley Tea Estate, Darjeeling",
    city: "Darjeeling",
    state: "West Bengal",
    description: "Colonial-era bungalow set amidst rolling tea gardens with views of Kanchenjunga.",
    longDescription: "Experience the charm of British colonial life at this heritage bungalow nestled within an active tea plantation. Originally built in the 1860s, the residence has been lovingly restored to maintain its period character while offering modern comforts. Surrounded by terraced tea gardens, the property features wrap-around verandas, a manicured English garden, and panoramic views of the world's third-highest mountain, Kanchenjunga. Enjoy private tea tasting sessions, guided plantation tours, and traditional Anglo-Indian cuisine prepared with organic produce from the estate's kitchen garden.",
    price: 29000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1598082897099-fd39f6e2a5a2?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1614267861476-0d129972190b?auto=format&fit=crop&w=800"
    ],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 3,
    rating: 4.7,
    reviewCount: 63,
    amenities: [
      { name: "Mountain View" },
      { name: "Tea Plantation" },
      { name: "Heritage Building" },
      { name: "Fireplace" },
      { name: "English Garden" },
      { name: "Tea Tasting" },
      { name: "Breakfast Included" }
    ],
    bookingAvailable: true,
    propertyType: "Heritage Bungalow",
    host: {
      name: "Elizabeth Walker",
      image: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?auto=format&fit=crop&w=100",
      joinedDate: "2019-03-15",
      isSuperhost: false
    }
  },
  {
    id: "8",
    name: "Desert Palace in Jaisalmer",
    location: "Sam Sand Dunes, Jaisalmer",
    city: "Jaisalmer",
    state: "Rajasthan",
    description: "Sandstone palace with desert views, traditional architecture, and luxury amenities.",
    longDescription: "Rise like a mirage from the golden sands of the Thar Desert at this magnificent sandstone palace. This architectural marvel combines the grandeur of Rajputana design with contemporary luxury. The intricately carved jharokhas, jaali screens, and domed ceilings showcase exquisite craftsmanship, while the interiors feature hand-knotted carpets, antique furniture, and Rajasthani artwork. From your private terrace, watch the desert sunset transform the landscape into a golden canvas. Experience camel safaris, desert folk performances, and traditional Rajasthani thali dinners under the stars. The rooftop infinity pool creates a stunning visual effect of merging with the desert horizon.",
    price: 45000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1594394489329-eaa0772bc8f9?auto=format&fit=crop&w=800"
    ],
    maxGuests: 12,
    bedrooms: 6,
    beds: 8,
    baths: 7,
    rating: 4.9,
    reviewCount: 87,
    amenities: [
      { name: "Desert View" },
      { name: "Infinity Pool" },
      { name: "Camel Safaris" },
      { name: "Cultural Performances" },
      { name: "Rooftop Dining" },
      { name: "Air Conditioning" },
      { name: "Butler Service" }
    ],
    bookingAvailable: true,
    featured: true,
    propertyType: "Heritage Palace",
    host: {
      name: "Maharaj Singh",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=100",
      joinedDate: "2018-02-28",
      isSuperhost: true
    }
  },
  {
    id: "9",
    name: "Cliff-Top Villa in Varkala",
    location: "Varkala Cliff, Kerala",
    city: "Varkala",
    state: "Kerala",
    description: "Contemporary villa perched on the cliffs of Varkala with panoramic Arabian Sea views.",
    longDescription: "Suspended between sea and sky, this contemporary villa sits dramatically on the red cliffs of Varkala. Floor-to-ceiling glass walls provide uninterrupted views of the Arabian Sea, while minimalist architecture emphasizes the natural beauty of the surroundings. The infinity pool extends toward the horizon, creating a seamless blend with the ocean. Descend the private pathway to access the pristine beach below. The villa's design incorporates local materials like laterite stone and teak wood, complemented by modern artwork from Kerala's contemporary artists. Enjoy private yoga sessions on the cliff-edge deck, Ayurvedic treatments, and fresh seafood prepared by your personal chef.",
    price: 36000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 3,
    rating: 4.8,
    reviewCount: 59,
    amenities: [
      { name: "Ocean View" },
      { name: "Infinity Pool" },
      { name: "Private Beach Access" },
      { name: "Yoga Deck" },
      { name: "Personal Chef" },
      { name: "Ayurvedic Treatments" },
      { name: "Air Conditioning" }
    ],
    bookingAvailable: true,
    propertyType: "Villa",
    host: {
      name: "Anita Menon",
      image: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?auto=format&fit=crop&w=100",
      joinedDate: "2019-10-05",
      isSuperhost: true
    }
  },
  {
    id: "10",
    name: "Riverside Cottage in Rishikesh",
    location: "Ganges Riverfront, Rishikesh",
    city: "Rishikesh",
    state: "Uttarakhand",
    description: "Serene cottage on the banks of the Ganges with yoga facilities and mountain views.",
    longDescription: "Find spiritual renewal at this tranquil cottage set directly on the sacred banks of the Ganges River. The property blends Himalayan architectural elements with mindful luxury, creating spaces that inspire both comfort and contemplation. Wake to the gentle sounds of temple bells and flowing water, practice yoga on your private riverside deck, and meditate in the garden sanctuary. The cottage features natural building materials, including river stone, local timber, and handwoven textiles. Expansive windows frame views of the river and the lush foothills beyond. In the evenings, witness the magical Ganga Aarti ceremony from your doorstep and enjoy vegetarian farm-to-table meals prepared with organic ingredients.",
    price: 22000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800"
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    rating: 4.8,
    reviewCount: 94,
    amenities: [
      { name: "River View" },
      { name: "Yoga Deck" },
      { name: "Meditation Garden" },
      { name: "Organic Meals" },
      { name: "Ganga Aarti View" },
      { name: "WiFi" },
      { name: "Nature Trails" }
    ],
    bookingAvailable: true,
    propertyType: "Cottage",
    host: {
      name: "Swami Ramdev",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100",
      joinedDate: "2017-08-12",
      isSuperhost: true
    }
  },
  {
    id: "11",
    name: "Backwater Island Retreat in Kumarakom",
    location: "Vembanad Lake, Kumarakom",
    city: "Kumarakom",
    state: "Kerala",
    description: "Private island resort with traditional architecture and luxury amenities in the backwaters.",
    longDescription: "Escape to your own private island in the heart of Kerala's backwaters. This exclusive retreat spans a lush 3-acre island on Vembanad Lake, accessible only by boat. Accommodations feature traditional Kerala architecture with elevated pitched roofs, intricate woodwork, and open-to-nature bathrooms. Each villa has its own private pond or lake frontage with direct water access. The property showcases indigenous plants, organic vegetable gardens, and abundant bird life. Facilities include an infinity pool that blends into the lake, Ayurvedic spa pavilions, and multiple dining locations. A team of chefs prepares authentic Kerala cuisine featuring seafood harvested daily from the surrounding waters.",
    price: 48000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1602343168117-bb8a12d7ee1b?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1618498897507-280375164a21?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800"
    ],
    maxGuests: 10,
    bedrooms: 5,
    beds: 7,
    baths: 5,
    rating: 4.9,
    reviewCount: 83,
    amenities: [
      { name: "Private Island" },
      { name: "Waterfront" },
      { name: "Infinity Pool" },
      { name: "Ayurvedic Spa" },
      { name: "Boat Transfers" },
      { name: "Full Board Meals" },
      { name: "Birdwatching" }
    ],
    bookingAvailable: true,
    featured: true,
    propertyType: "Island Resort",
    host: {
      name: "Priya Nair",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100",
      joinedDate: "2018-11-30",
      isSuperhost: true
    }
  },
  {
    id: "12",
    name: "Coffee Plantation Estate in Coorg",
    location: "Madikeri, Coorg",
    city: "Madikeri",
    state: "Karnataka",
    description: "Historic plantation bungalow in the Western Ghats surrounded by coffee and spice gardens.",
    longDescription: "Immerse yourself in plantation life at this historic estate nestled in the misty hills of Coorg. Dating back to 1880, this planter's bungalow sits amidst 100 acres of active coffee plantations, pepper vines, and cardamom gardens. The main house maintains its colonial charm with wide verandas, period furniture, and a crackling fireplace for cool evenings. Wake to birdsong and distant views of the Western Ghats, enjoy guided tours of the plantation, and learn about coffee production from bean to cup. The property includes bubbling streams, natural pools for swimming, and hiking trails through pristine forests. Each evening, dine on traditional Kodava cuisine featuring estate-grown spices and produce from the organic garden.",
    price: 27000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1597211833712-5e41df5f903b?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1577071332481-b320d52a7860?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800"
    ],
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 4,
    rating: 4.8,
    reviewCount: 76,
    amenities: [
      { name: "Coffee Plantation" },
      { name: "Guided Tours" },
      { name: "Heritage Building" },
      { name: "Fireplace" },
      { name: "Hiking Trails" },
      { name: "Natural Swimming Pool" },
      { name: "Organic Meals" }
    ],
    bookingAvailable: true,
    propertyType: "Plantation Estate",
    host: {
      name: "Karan Thimmaiah",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=100",
      joinedDate: "2019-02-18",
      isSuperhost: true
    }
  },
  {
    id: "13",
    name: "Luxury Forest Cabin in Binsar",
    location: "Binsar Wildlife Sanctuary, Uttarakhand",
    city: "Binsar",
    state: "Uttarakhand",
    description: "Eco-luxury cabin with panoramic Himalayan views and forest hiking trails.",
    longDescription: "Retreat to this sustainable forest haven nestled within the pristine Binsar Wildlife Sanctuary. This eco-luxury cabin is constructed primarily from reclaimed timber and local stone, with green living roofs that blend into the surrounding landscape. Floor-to-ceiling windows showcase 180-degree views of the Himalayan peaks, including Nanda Devi and Trishul. Designed for minimal environmental impact, the cabin features solar power, rainwater harvesting, and organic amenities. Explore the ancient oak and rhododendron forests via private hiking trails, spot Himalayan wildlife with expert guides, and enjoy mountain picnics in hidden meadows. Return to evenings by the wood-burning fireplace and stargazing from your private deck.",
    price: 26000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1520984032042-162d526883e0?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1539881888761-ce8838858165?auto=format&fit=crop&w=800"
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    rating: 4.7,
    reviewCount: 53,
    amenities: [
      { name: "Mountain View" },
      { name: "Wildlife Sanctuary" },
      { name: "Hiking Trails" },
      { name: "Fireplace" },
      { name: "Eco-Friendly" },
      { name: "Stargazing Deck" },
      { name: "Organic Meals" }
    ],
    bookingAvailable: true,
    propertyType: "Cabin",
    host: {
      name: "Deepak Rawat",
      image: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?auto=format&fit=crop&w=100",
      joinedDate: "2020-01-10",
      isSuperhost: false
    }
  },
  {
    id: "14",
    name: "Royal Tent at Pushkar",
    location: "Pushkar Desert, Rajasthan",
    city: "Pushkar",
    state: "Rajasthan",
    description: "Opulent desert tent inspired by royal caravans with modern amenities and desert views.",
    longDescription: "Experience the romance of a bygone era in this opulent desert tent inspired by the royal caravans of Rajasthan's maharajas. Located on the edge of the Pushkar Desert, this luxurious accommodation combines traditional craftsmanship with modern comforts. The spacious tent features hand-blocked fabrics, embroidered tapestries, and antique furniture, all illuminated by brass lanterns and candlelight. A private dining tent and observation deck offer spectacular views of the Aravalli Hills and the sacred Pushkar Lake. During your stay, participate in private camel safaris, witness the renowned Pushkar Camel Fair (seasonal), and enjoy authentic Rajasthani folk music and dance performances under the desert stars.",
    price: 30000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1587297699056-0df75f28ae06?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1493306337546-2eea4b83a8f7?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1498813095029-de93be87adc6?auto=format&fit=crop&w=800"
    ],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    rating: 4.8,
    reviewCount: 67,
    amenities: [
      { name: "Desert View" },
      { name: "Private Dining" },
      { name: "Camel Safaris" },
      { name: "Cultural Performances" },
      { name: "Butler Service" },
      { name: "Air Conditioning" },
      { name: "Outdoor Shower" }
    ],
    bookingAvailable: true,
    propertyType: "Luxury Tent",
    host: {
      name: "Raghuvir Singh",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=100",
      joinedDate: "2019-05-20",
      isSuperhost: true
    }
  },
  {
    id: "15",
    name: "Colonial Mansion in Pondicherry",
    location: "French Quarter, Pondicherry",
    city: "Pondicherry",
    state: "Tamil Nadu",
    description: "Restored Franco-Tamil mansion in the historic French Quarter with courtyard garden.",
    longDescription: "Step into Indo-French elegance at this meticulously restored 19th-century mansion in Pondicherry's famous French Quarter. The architecture harmoniously blends colonial French design with traditional Tamil influences, creating a unique aesthetic that reflects the region's rich cultural heritage. High ceilings, original tile floors, and period antiques grace the interiors, while the central courtyard features a tranquil garden with a small plunge pool. Louvered windows open to catch the sea breeze from the nearby Bay of Bengal. Wander the charming streets of the French Quarter, cycle along the scenic Beach Promenade, and explore Auroville just a short drive away. The mansion's kitchen serves Franco-Tamil fusion cuisine, and guests can enjoy aperitifs in the rooftop garden overlooking the colonial skyline.",
    price: 24000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3c7?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1618219740975-d40978bb7378?auto=format&fit=crop&w=800"
    ],
    maxGuests: 8,
    bedrooms: 4,
    beds: 4,
    baths: 4,
    rating: 4.7,
    reviewCount: 89,
    amenities: [
      { name: "Heritage Building" },
      { name: "Courtyard Garden" },
      { name: "Plunge Pool" },
      { name: "Rooftop Terrace" },
      { name: "Bicycles Provided" },
      { name: "Air Conditioning" },
      { name: "Walking Distance to Beach" }
    ],
    bookingAvailable: true,
    propertyType: "Heritage Mansion",
    host: {
      name: "Claire Dupleix",
      image: "https://images.unsplash.com/photo-1554727242-741c14fa561c?auto=format&fit=crop&w=100",
      joinedDate: "2018-07-05",
      isSuperhost: true
    }
  },
  {
    id: "16",
    name: "Mountain Lodge in Pahalgam",
    location: "Lidder Valley, Pahalgam",
    city: "Pahalgam",
    state: "Jammu & Kashmir",
    description: "Cedar wood lodge overlooking the Lidder River with mountain views and luxury interiors.",
    longDescription: "Escape to this secluded cedar wood lodge perched above the pristine Lidder River in Kashmir's famed Pahalgam valley. The architecture draws inspiration from traditional Kashmiri craftsmanship, featuring intricate woodwork, local khatamband ceilings, and handwoven namdas (felt rugs). Large picture windows frame stunning views of snow-capped peaks and dense pine forests. In winter, gather around the bukhari (traditional wood-burning stove) in your living room, while summer invites alfresco dining on your private riverside deck. Activities include guided treks to high-altitude lakes, fly fishing in the Lidder River, and horseback riding through coniferous forests. Evenings bring starlit dinners featuring traditional wazwan cuisine prepared by an in-house Kashmiri chef.",
    price: 31000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1486999619268-6aa409dbecd1?auto=format&fit=crop&w=800"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    rating: 4.9,
    reviewCount: 43,
    amenities: [
      { name: "Mountain View" },
      { name: "Riverside" },
      { name: "Fireplace" },
      { name: "Private Deck" },
      { name: "Trekking Guides" },
      { name: "Fly Fishing" },
      { name: "Traditional Cuisine" }
    ],
    bookingAvailable: true,
    propertyType: "Lodge",
    host: {
      name: "Farooq Abdullah",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&w=100",
      joinedDate: "2019-04-02",
      isSuperhost: true
    }
  },
  {
    id: "17",
    name: "Heritage Fort in Nagaur",
    location: "Nagaur Fort, Rajasthan",
    city: "Nagaur",
    state: "Rajasthan",
    description: "Restored 12th-century fort with luxury suites and authentic Rajasthani experiences.",
    longDescription: "Live like royalty in this 12th-century desert fort, meticulously restored to its former glory. This architectural marvel spans 35 acres and features massive ramparts, multiple courtyards, and historic royal apartments now converted into luxury suites. The restoration preserves original frescoes, mirror work, and stone carvings while discreetly incorporating modern amenities. Each suite is uniquely decorated with antique furniture, traditional textiles, and artifacts that reflect Rajasthan's rich cultural heritage. The property includes formal gardens, a heritage spa offering royal treatments, and dining venues in historic settings. Experience falconry demonstrations, desert equestrian sports, and traditional Rajasthani entertainment in the same spaces where maharajas once held court.",
    price: 65000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1581793746485-04698e73b775?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800"
    ],
    maxGuests: 16,
    bedrooms: 8,
    beds: 10,
    baths: 8,
    rating: 4.9,
    reviewCount: 37,
    amenities: [
      { name: "Historic Fort" },
      { name: "Heritage Spa" },
      { name: "Royal Dining" },
      { name: "Cultural Performances" },
      { name: "Falconry" },
      { name: "Guided Tours" },
      { name: "Butler Service" }
    ],
    bookingAvailable: true,
    featured: true,
    propertyType: "Heritage Fort",
    host: {
      name: "Thakur Singh",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=100",
      joinedDate: "2017-06-18",
      isSuperhost: true
    }
  },
  {
    id: "18",
    name: "Cliffside Villa in Munnar",
    location: "High Range, Munnar",
    city: "Munnar",
    state: "Kerala",
    description: "Contemporary glass villa perched on a tea plantation hillside with panoramic valley views.",
    longDescription: "Perched dramatically on a cliffside tea plantation, this contemporary glass and steel villa offers unparalleled 180-degree views of Munnar's emerald valleys. The minimalist design emphasizes the breathtaking natural surroundings, with floor-to-ceiling windows that blur the boundary between inside and outside. The three-level structure features a cantilevered infinity pool, outdoor living spaces on multiple terraces, and a glass-bottom viewing deck suspended over the valley. The interior showcases polished concrete floors, sustainable teak furnishings, and specially commissioned artwork from Kerala's contemporary artists. Wake to misty mountain vistas, watch tea pickers at work on the slopes below, and enjoy organic farm-to-table cuisine featuring produce from the villa's own kitchen garden.",
    price: 40000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 3,
    rating: 4.8,
    reviewCount: 45,
    amenities: [
      { name: "Valley View" },
      { name: "Infinity Pool" },
      { name: "Tea Plantation" },
      { name: "Glass Viewing Deck" },
      { name: "Chef Service" },
      { name: "Multiple Terraces" },
      { name: "Plantation Tours" }
    ],
    bookingAvailable: true,
    propertyType: "Villa",
    host: {
      name: "Maya Thomas",
      image: "https://images.unsplash.com/photo-1558898479-33c0057a5d12?auto=format&fit=crop&w=100",
      joinedDate: "2019-09-12",
      isSuperhost: true
    }
  },
  {
    id: "19",
    name: "Lakeside Mansion in Nainital",
    location: "Naini Lake, Nainital",
    city: "Nainital",
    state: "Uttarakhand",
    description: "Historic colonial mansion with private lake access and mountain views in Nainital.",
    longDescription: "Step back into the British colonial era at this grand lakeside mansion dating from 1885. One of Nainital's oldest residences, this heritage property combines Victorian architecture with subtle Himalayan influences. The estate includes manicured English gardens, a private boathouse with direct access to Naini Lake, and terraced lawns offering views of the surrounding mountains. Inside, you'll find original fireplaces, wood-paneled libraries, and four-poster beds, alongside thoughtfully integrated modern amenities. Spend your days boating on the lake, hiking to panoramic viewpoints, or simply enjoying high tea in the garden. Evenings bring crackling fires, drinks in the colonial-style bar, and meals featuring both European and Kumaoni cuisine.",
    price: 33000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=800"
    ],
    maxGuests: 10,
    bedrooms: 5,
    beds: 7,
    baths: 5,
    rating: 4.7,
    reviewCount: 58,
    amenities: [
      { name: "Lake View" },
      { name: "Private Boathouse" },
      { name: "Heritage Building" },
      { name: "English Gardens" },
      { name: "Fireplace" },
      { name: "Library" },
      { name: "Boat Rides" }
    ],
    bookingAvailable: true,
    propertyType: "Heritage Mansion",
    host: {
      name: "William Richards",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100",
      joinedDate: "2018-03-25",
      isSuperhost: false
    }
  },
  {
    id: "20",
    name: "Island Lighthouse in Andamans",
    location: "Havelock Island, Andaman Islands",
    city: "Havelock Island",
    state: "Andaman & Nicobar Islands",
    description: "Converted lighthouse on a private peninsula with 360-degree ocean views and beach access.",
    longDescription: "Experience extraordinary seclusion at this converted lighthouse perched on a private peninsula of Havelock Island. Originally built in the 1930s and meticulously transformed into luxury accommodations, this unique property offers 360-degree views of the turquoise Andaman Sea. The cylindrical three-story structure maintains its historic exterior while the interior features contemporary design with nautical accents. The top-floor living space occupies the former lantern room, with wrap-around glass walls providing spectacular panoramas and stargazing opportunities. A private pathway leads to three white sand beaches, each with different characteristics for swimming, snorkeling, and sunset viewing. The property includes an infinity pool that appears to merge with the ocean horizon, tropical gardens with hammocks strung between coconut palms, and a dedicated boat for island-hopping excursions.",
    price: 55000,
    currency: "INR",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1505881402582-c5bc11054f91?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1577717908546-37182a6c979f?auto=format&fit=crop&w=800"
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    baths: 3,
    rating: 4.9,
    reviewCount: 32,
    amenities: [
      { name: "Ocean View" },
      { name: "Private Beaches" },
      { name: "Infinity Pool" },
      { name: "Historic Building" },
      { name: "Island Boat Tours" },
      { name: "Snorkeling Equipment" },
      { name: "Chef Service" }
    ],
    bookingAvailable: true,
    featured: true,
    propertyType: "Lighthouse",
    host: {
      name: "Isla Sharma",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100",
      joinedDate: "2020-01-05",
      isSuperhost: true
    }
  }
];

export default stays;
