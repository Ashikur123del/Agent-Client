// data/news.ts

export interface NewsItem {
  id: number;
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    slug: "saudi-tourist-visa",
    category: "Visa Update",
    categoryColor: "from-amber-500 to-orange-500",
    title: "Saudi Tourist Visa Now Open for Bangladeshis",
    excerpt:
      "Good news! Saudi Arabia has started issuing tourist visas for Bangladeshi citizens. Contact us for details and application support.",
    content: `Saudi Arabia has officially opened its doors to Bangladeshi tourists. Starting from July 2026, Bangladeshi passport holders can apply for an e-visa online. The visa allows for multiple entries and a stay of up to 90 days. This is a game-changer for travelers seeking to explore the rich culture, heritage, and modern attractions of the Kingdom.

**Key Highlights:**
- Online application process
- Multiple entries allowed
- Valid for 1 year
- 90-day stay per visit

Our agency is now offering full assistance for Saudi tourist visa applications – from document verification to submission. Contact us to start your journey.`,
    image:
      "https://images.unsplash.com/photo-1530545124313-ce5e8eae55af", 
    date: "15 June 2026",
    readTime: "3 min read",
    author: "Travel Desk",
    featured: true,
  },
  {
    id: 2,
    slug: "umrah-package-2026",
    category: "Offer",
    categoryColor: "from-emerald-500 to-teal-500",
    title: "Umrah Package 2026 – Early Bird Offer",
    excerpt:
      "Book your Umrah package now and get 10% off on flights and hotels. Limited time offer – don't miss out!",
    content: `We are excited to announce our exclusive Umrah packages for 2026. Book before 31 August 2026 and enjoy a 10% discount on flights and hotel accommodations. Our packages include visa processing, return flights, 5-star hotels near Haram, and Ziyarah tours.

**Package Inclusions:**
- Return airfare (Dhaka – Jeddah – Dhaka)
- 7 nights hotel in Makkah (5-star)
- 3 nights hotel in Madinah (5-star)
- Visa processing
- Airport transfers
- Ziyarah of holy sites

Early bird discount ends soon – secure your spot today!`,
    image:
      "https://plus.unsplash.com/premium_photo-1718146018997-a1059f9f9420", 
    date: "10 June 2026",
    readTime: "2 min read",
    author: "Travel Desk",
    featured: false,
  },
  {
    id: 3,
    slug: "direct-flights-bangkok",
    category: "Airline Update",
    categoryColor: "from-blue-500 to-cyan-500",
    title: "New Direct Flights to Bangkok from Dhaka",
    excerpt:
      "We are excited to announce new direct flight options to Bangkok at competitive prices. Starting from July 2026.",
    content: `Great news for travelers! Starting July 2026, a new direct flight service will connect Dhaka to Bangkok (BKK) daily. This service, operated by a major Asian airline, will offer competitive fares and excellent connections to other Southeast Asian destinations.

**Flight Details:**
- Airlines: Thai Airways & Biman Bangladesh Airlines
- Frequency: Daily
- Flight time: ~2.5 hours

Book your tickets now with our exclusive fares. Contact us for group discounts.`,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", 
    date: "5 June 2026",
    readTime: "2 min read",
    author: "Travel Desk",
    featured: false,
  },
  {
    id: 4,
    slug: "top-destinations-2026",
    category: "Travel Guide",
    categoryColor: "from-purple-500 to-pink-500",
    title: "Top 10 Destinations for 2026",
    excerpt:
      "Discover the most popular travel destinations for 2026 – from European cities to Asian beaches.",
    content: `Looking for travel inspiration for 2026? Here are our top 10 destinations that offer unforgettable experiences, stunning landscapes, and rich cultural heritage.

**1. Santorini, Greece** – Whitewashed buildings and breathtaking sunsets.
**2. Kyoto, Japan** – Cherry blossoms and ancient temples.
**3. Bali, Indonesia** – Tropical paradise with vibrant culture.
**4. Paris, France** – The city of love, art, and cuisine.
**5. Machu Picchu, Peru** – The lost city of the Incas.
**6. Dubai, UAE** – Modern architecture and desert adventures.
**7. Cape Town, South Africa** – Table Mountain and stunning coastlines.
**8. New York, USA** – The city that never sleeps.
**9. Maldives** – Overwater bungalows and crystal-clear waters.
**10. Barcelona, Spain** – Gaudí architecture and Mediterranean vibes.

Plan your dream trip with us – we offer custom itineraries for every destination.`,
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80", 
    date: "1 June 2026",
    readTime: "5 min read",
    author: "Travel Desk",
    featured: false,
  },
  {
    id: 5,
    slug: "thailand-visa-update",
    category: "Visa Update",
    categoryColor: "from-amber-500 to-orange-500",
    title: "Thailand Visa on Arrival Extended",
    excerpt:
      "Thailand has extended visa on arrival for Bangladeshi citizens. Find out more about the new rules.",
    content: `Good news for travelers to Thailand! The Thai government has extended the Visa on Arrival (VOA) facility for Bangladeshi citizens until further notice. This allows travelers to obtain a 15-day tourist visa directly at the airport.

**Important Details:**
- Valid for 15 days
- Available at all international airports
- Requires: Return ticket, hotel booking, and sufficient funds

Plan your Thailand trip with us – we offer flight + hotel packages at competitive prices.`,
    image:
      "https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?w=800&q=80", 
    date: "20 May 2026",
    readTime: "3 min read",
    author: "Travel Desk",
    featured: false,
  },
];