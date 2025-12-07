import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Destination {
  name: string;
  image: string;
  tag?: string;
  rating: number;
  duration: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
}

interface WebsiteContent {
  // Header
  header: {
    logoText: string;
    navigation: Array<{ name: string; href: string }>;
  };

  // Hero
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    features: Array<{ icon: string; text: string }>;
    stats: {
      happyTravelers: string;
      destinations: string;
    };
  };

  // Footer
  footer: {
    companyName: string;
    description: string;
    phone: string;
    email: string;
    address: string;
    quickLinks: Array<{ name: string; href: string }>;
    services: Array<{ name: string; href: string }>;
    socialLinks: {
      facebook: string;
      twitter: string;
      instagram: string;
      youtube: string;
    };
    copyright: string;
  };

  // Contact
  contact: {
    title: string;
    subtitle: string;
    phone1: string;
    phone2: string;
    email: string;
    address: string;
    whatsappNumber: string;
    hours: string;

  };

  // Features
  features: {
    title: string;
    subtitle: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };

  destinations: Destination[];
}

const defaultDestinations: Destination[] = [
  {
    name: 'Magical Kerala',
    image: 'https://images.pexels.com/photos/12625830/pexels-photo-12625830.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Best Seller',
    rating: 4.8,
    duration: '6 Days',
    description:
      "Experience the enchanting beauty of Kerala - from serene backwaters to lush tea plantations. A perfect blend of nature, culture, and relaxation in God's Own Country.",
    highlights: [
      'Alleppey backwaters cruise',
      'Munnar tea gardens',
      'Thekkady wildlife spotting',
      'Traditional Kathakali performance',
      'Spice plantation tour',
    ],
    inclusions: [
      '5 nights accommodation (double sharing)',
      'Daily breakfast',
      'Private AC vehicle (750 km limit)',
      'Driver (8 AM–8 PM)',
      'GST, toll, parking, bata',
      'Non-AC rooms at hill stations',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cochin',
        description: 'Arrive & check-in. Visit Fort Kochi, Chinese Fishing Nets, Jew Town & Synagogue. Evening shopping.',
      },
      {
        day: 2,
        title: 'Cochin → Munnar',
        description: 'Visit Cheeyappara & Valara waterfalls. Check-in. Tea Museum & optional park visit.',
      },
      {
        day: 3,
        title: 'Full Day Munnar',
        description: 'Eravikulam National Park, trek, Tea Garden, Mattupetty Dam & Kundala Lake.',
      },
      {
        day: 4,
        title: 'Munnar → Thekkady',
        description: 'Periyar Lake boat ride, wildlife spotting & spice plantation visit.',
      },
      {
        day: 5,
        title: 'Thekkady → Alleppey',
        description: 'Backwater boating, scenic cruise & Alleppey Beach visit.',
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Shopping & airport drop in Cochin.',
      },
    ],
  },
  {
    name: 'Magical Himachal',
    image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Popular',
    rating: 4.9,
    duration: '9 Days',
    description:
      'Discover the majestic beauty of Himachal Pradesh - from snow-capped mountains to spiritual temples. An unforgettable journey through the Himalayas.',
    highlights: [
      'Kufri Himalayan views',
      'Solang Valley adventure sports',
      'Golden Temple visit',
      'Wagah Border ceremony',
      'Dharamshala Tibetan culture',
    ],
    inclusions: [
      '8 nights accommodation (MAP plan)',
      'Daily breakfast and dinner',
      'Private cab for all transfers',
      'Toll, parking, driver expenses',
      'All sightseeing as per itinerary',
    ],
    itinerary: [
      { day: 1, title: 'Chandigarh → Shimla', description: '115 km scenic drive. Check-in & leisure time.' },
      {
        day: 2,
        title: 'Shimla & Kufri',
        description: 'Kufri sightseeing, Himalayan Park & Shimla local visits.',
      },
      {
        day: 3,
        title: 'Shimla → Manali',
        description: '235 km drive. Pandoh Dam, river rafting & shawl factory.',
      },
      { day: 4, title: 'Solang Valley', description: 'Adventure sports: paragliding, zorbing & ropeway.' },
      {
        day: 5,
        title: 'Manali Local',
        description: 'Temples, Vashisht Bath, Club House & Mall Road.',
      },
      {
        day: 6,
        title: 'Manali → Dharamshala',
        description: 'Scenic drive via Chamunda Devi Temple.',
      },
      {
        day: 7,
        title: 'Dharamshala → Dalhousie',
        description: 'Dalai Lama Temple, waterfalls & transfer to Dalhousie.',
      },
      {
        day: 8,
        title: 'Dalhousie → Amritsar',
        description: 'Golden Temple, Jallianwala Bagh & Wagah Border.',
      },
      { day: 9, title: 'Departure', description: 'Shopping & airport/station drop.' },
    ],
  },
  {
    name: 'Santorini, Greece',
    image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Featured',
    rating: 4.9,
    duration: '7 Days',
    description:
      'Experience the breathtaking beauty of Santorini with its iconic white-washed buildings, stunning sunsets, and pristine beaches.',
    highlights: [
      'Visit the famous blue dome churches',
      'Watch the sunset in Oia',
      'Explore volcanic beaches',
      'Wine tasting at local vineyards',
      'Traditional Greek village tours',
    ],
    inclusions: ['5-star hotel accommodation', 'Daily breakfast', 'Guided tours', 'Ferry transfers', 'Airport transport'],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Santorini',
        description: 'Airport transfer & hotel check-in. Explore Kamari streets.',
      },
      {
        day: 2,
        title: 'Oia Village & Sunset',
        description: 'Visit Oia village & experience famous sunset views.',
      },
      {
        day: 3,
        title: 'Volcanic Islands',
        description: 'Boat tour to volcanic islands & natural hot springs.',
      },
      { day: 4, title: 'Wine Tasting', description: 'Local wineries & authentic Santorinian wines tasting.' },
      {
        day: 5,
        title: 'Beach Day',
        description: 'Relax on volcanic black sand beaches & water activities.',
      },
      {
        day: 6,
        title: 'Cultural Exploration',
        description: 'Museums, historical sites & traditional villages.',
      },
      { day: 7, title: 'Departure', description: 'Final shopping & airport transfer.' },
    ],
  },
  {
    name: 'Bali, Indonesia',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Popular',
    rating: 4.8,
    duration: '6 Days',
    description:
      'Discover the tropical paradise of Bali with its lush rice terraces, ancient temples, and vibrant culture.',
    highlights: [
      'Visit Tanah Lot Temple',
      'Explore rice terraces and waterfalls',
      'Monkey forest sanctuary tour',
      'Spa and wellness treatments',
      'Beach clubs and water sports',
    ],
    inclusions: [
      '4-star beachfront resort',
      'Daily breakfast',
      'Guided cultural tours',
      'Spa treatment',
      'Airport pickup and dropoff',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Bali', description: 'Airport transfer & beachfront resort check-in.' },
      {
        day: 2,
        title: 'Temple & Culture',
        description: 'Tanah Lot Temple & local cultural sites visit.',
      },
      { day: 3, title: 'Rice Terraces', description: 'Trek through rice terraces & visit waterfalls.' },
      {
        day: 4,
        title: 'Monkey Forest & Spa',
        description: 'Monkey Forest Sanctuary & Balinese spa treatment.',
      },
      {
        day: 5,
        title: 'Beach Activities',
        description: 'Beach clubs, surfing, snorkeling & water sports.',
      },
      { day: 6, title: 'Departure', description: 'Last-minute shopping & airport transfer.' },
    ],
  },
  {
    name: 'Paris, France',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Featured',
    rating: 4.9,
    duration: '5 Days',
    description:
      'Fall in love with the City of Lights. Visit iconic landmarks, world-class museums, and authentic French cuisine.',
    highlights: [
      'Eiffel Tower tour',
      'Louvre Museum visit',
      'Seine River cruise',
      'Michelin-star dining',
      'Champs-Élysées shopping',
    ],
    inclusions: [
      '5-star luxury hotel',
      'Buffet breakfast daily',
      'Museum passes',
      'Seine cruise',
      'Restaurant reservations',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Paris',
        description: 'Arrive & check into luxury hotel in city center.',
      },
      {
        day: 2,
        title: 'Iconic Landmarks',
        description: 'Eiffel Tower, Champs-Élysées & Arc de Triomphe.',
      },
      {
        day: 3,
        title: 'Museums & Culture',
        description: "Louvre Museum & Musée d'Orsay art visit.",
      },
      {
        day: 4,
        title: 'Seine Cruise & Dining',
        description: 'Romantic Seine cruise & Michelin-star dinner.',
      },
      { day: 5, title: 'Departure', description: 'Final shopping & airport transfer.' },
    ],
  },
  {
    name: 'Dubai, UAE',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Best Value',
    rating: 4.7,
    duration: '4 Days',
    description:
      'Experience luxury and modernity in Dubai. Stunning architecture, luxury shopping, and desert safaris.',
    highlights: [
      'Burj Khalifa visit',
      'Desert safari adventure',
      'Dubai Mall shopping',
      'Gold souk exploration',
      'Beach clubs',
    ],
    inclusions: ['5-star hotel', 'Breakfast & dinner', 'Desert safari', 'Burj Khalifa tickets', 'Transfers included'],
    itinerary: [
      { day: 1, title: 'Dubai Arrival', description: 'Arrive & check into luxury hotel.' },
      {
        day: 2,
        title: 'Burj Khalifa & Shopping',
        description: 'Burj Khalifa visit & Dubai Mall shopping.',
      },
      {
        day: 3,
        title: 'Desert Safari',
        description: 'Dune bashing, camel riding & Bedouin dinner.',
      },
      { day: 4, title: 'Departure', description: 'Beach club time & airport transfer.' },
    ],
  },
  {
    name: 'Maldives',
    image: 'https://images.pexels.com/photos/3250613/pexels-photo-3250613.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Luxury',
    rating: 5,
    duration: '8 Days',
    description:
      'Paradise on Earth - crystal clear waters, pristine beaches, and exclusive resort experiences.',
    highlights: [
      'Overwater bungalows',
      'Snorkeling & diving',
      'Spa treatments',
      'Sunset dolphin cruise',
      'Water sports',
    ],
    inclusions: [
      'All-inclusive luxury resort',
      'All meals & beverages',
      'Snorkeling equipment',
      'Spa credit',
      'Water sports',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Maldives',
        description: 'Transfer to overwater bungalow & welcome dinner.',
      },
      { day: 2, title: 'Snorkeling', description: 'Coral reef exploration with professional guides.' },
      { day: 3, title: 'Diving', description: 'Diving excursion to explore marine life.' },
      {
        day: 4,
        title: 'Spa & Relaxation',
        description: 'World-class spa treatments & wellness activities.',
      },
      {
        day: 5,
        title: 'Island Exploration',
        description: 'Visit local islands & Maldivian culture experience.',
      },
      {
        day: 6,
        title: 'Water Sports',
        description: 'Kayaking, paddleboarding & jet skiing.',
      },
      {
        day: 7,
        title: 'Sunset Cruise',
        description: 'Romantic sunset dolphin cruise with dinner.',
      },
      { day: 8, title: 'Departure', description: 'Final relaxation & airport transfer.' },
    ],
  },
  {
    name: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Popular',
    rating: 4.8,
    duration: '6 Days',
    description:
      'Blend of ancient tradition and cutting-edge modernity. Experience temples, gardens, and authentic culture.',
    highlights: [
      'Senso-ji Temple visit',
      'Shibuya Crossing experience',
      'Sumo wrestling match',
      'Japanese tea ceremony',
      'Karaoke & nightlife',
    ],
    inclusions: ['4-star hotel', 'Breakfast & dinner', 'JR Pass', 'Temple tours', 'Cultural experiences'],
    itinerary: [
      { day: 1, title: 'Tokyo Arrival', description: 'Arrive & settle into hotel. Explore neighborhood.' },
      {
        day: 2,
        title: 'Ancient Tokyo',
        description: 'Senso-ji Temple & historic Asakusa district.',
      },
      {
        day: 3,
        title: 'Modern Tokyo',
        description: 'Shibuya Crossing & teamLab Digital Museum.',
      },
      {
        day: 4,
        title: 'Sumo & Culture',
        description: 'Sumo wrestling match & tea ceremony.',
      },
      { day: 5, title: 'Day Trip', description: 'Mount Fuji & Hakone scenic views visit.' },
      { day: 6, title: 'Departure', description: 'Final shopping & airport transfer.' },
    ],
  },
];

const defaultContent: WebsiteContent = {
  header: {
    logoText: 'Miles of smiles',
    navigation: [
      { name: 'Home', href: '#home' },
      { name: 'Destinations', href: '#destinations' },
      { name: 'About', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    badge: '✨ Premium Travel Experiences',
    title: 'Discover Your',
    titleHighlight: 'Perfect Journey',
    description: 'Experience world-class travel with curated destinations, exclusive deals, and personalized service. Your adventure of a lifetime starts here.',
    features: [
      { icon: 'Star', text: '4.9/5 Customer Rating' },
      { icon: 'Shield', text: 'Secure Booking' },
      { icon: 'Globe', text: '50+ Destinations' },
    ],
    stats: {
      happyTravelers: '10K+',
      destinations: '50+',
    },
  },
  footer: {
    companyName: 'Miles of Smiles',
    description: 'Creating unforgettable travel experiences around the world. Your adventure starts here with personalized service and curated destinations.',
    phone: '+91 63535 68077',
    email: 'milesofsmiles.tours@gmail.com',
    address: 'Ahmedabad, Gujarat 380001',
    quickLinks: [
      { name: 'Home', href: '#home' },
      { name: 'Destinations', href: '#destinations' },
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
    services: [
      { name: 'Tour Packages', href: '#' },
      { name: 'Hotel Booking', href: '#' },
      { name: 'Flight Tickets', href: '#' },
      { name: 'Travel Insurance', href: '#' },
    ],
    socialLinks: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      youtube: '#',
    },
    copyright: '© 2025 Miles of Smiles Travel. All rights reserved.',
  },
  contact: {
    title: 'Get In Touch',
    subtitle: "Have questions? We're here to help plan your perfect adventure",
    phone1: '+91 9924779147',
    phone2: '+91 6353568077',
    email: 'milesofsmiles.tours@gmail.com',
    address: '123 Travel Street, Suite 100<br />Ahmedabad, Gujarat 380001',
    whatsappNumber: '916353568077',
    hours: 'Our travel experts are available Monday to Sunday, 9AM to 9PM IST',
  },
  features: {
    title: 'Why Choose Us',
    subtitle: 'We provide exceptional travel experiences with unmatched service and value',
    items: [
      {
        icon: 'Shield',
        title: 'Safe & Secure',
        description: 'Your safety is our priority with verified accommodations and 24/7 support',
      },
      {
        icon: 'Clock',
        title: 'Best Price Guarantee',
        description: 'We offer the most competitive prices with no hidden charges',
      },
      {
        icon: 'Award',
        title: 'Award Winning',
        description: 'Recognized globally for excellence in travel services',
      },
      {
        icon: 'HeadphonesIcon',
        title: '24/7 Support',
        description: 'Round-the-clock customer service for all your travel needs',
      },
      {
        icon: 'Wallet',
        title: 'Flexible Payment',
        description: 'Multiple payment options with easy installment plans',
      },
      {
        icon: 'Globe',
        title: 'Global Coverage',
        description: 'Access to destinations across 100+ countries worldwide',
      },
    ],
  },
  destinations: defaultDestinations,
};

const mergeContent = (saved?: Partial<WebsiteContent>): WebsiteContent => {
  if (!saved) {
    return defaultContent;
  }

  return {
    header: { ...defaultContent.header, ...(saved.header || {}) },
    hero: {
      ...defaultContent.hero,
      ...(saved.hero || {}),
      stats: {
        ...defaultContent.hero.stats,
        ...(saved.hero?.stats || {}),
      },
      features: saved.hero?.features || defaultContent.hero.features,
    },
    footer: { ...defaultContent.footer, ...(saved.footer || {}) },
    contact: { ...defaultContent.contact, ...(saved.contact || {}) },
    features: {
      ...defaultContent.features,
      ...(saved.features || {}),
      items: saved.features?.items || defaultContent.features.items,
    },
    destinations: saved.destinations || defaultDestinations,
  };
};

interface AdminContextType {
  content: WebsiteContent;
  updateContent: (section: keyof WebsiteContent, data: any) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const DEFAULT_ADMIN_PASSWORD = 'admin123';

export function AdminProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<WebsiteContent>(() => {
    const saved = localStorage.getItem('websiteContent');
    return saved ? mergeContent(JSON.parse(saved)) : defaultContent;
  });
  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('adminPassword') || DEFAULT_ADMIN_PASSWORD;
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Fetch from Supabase on mount
  useEffect(() => {
    const fetchContent = async () => {
      if (!supabase) return;

      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('content')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) {
          return;
        }

        if (data?.content) {
          setContent(mergeContent(data.content));
        }
      } catch (err) {
        console.error('Error fetching from Supabase:', err);
      }
    };

    fetchContent();

    // Subscribe to real-time changes
    if (supabase) {
      const channel = supabase
        .channel('website_content_changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'website_content',
          },
          (payload) => {
            const newContent = payload.new as { content: WebsiteContent };
            if (newContent.content) {
              setContent(mergeContent(newContent.content));
            }
          }
        )
        .subscribe();

      return () => {
        if (supabase) {
          supabase.removeChannel(channel);
        }
      };
    }
  }, []);

  // Listen for local storage changes (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'websiteContent' && e.newValue) {
        setContent(mergeContent(JSON.parse(e.newValue)));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save to Supabase and LocalStorage on change
  useEffect(() => {
    // Save to local storage
    localStorage.setItem('websiteContent', JSON.stringify(content));

    const saveContent = async () => {
      if (!supabase) return;

      try {
        const { error } = await supabase
          .from('website_content')
          .insert({ content });

        if (error) throw error;
      } catch (error) {
        // Silent fail if no credentials or network error
      }
    };

    // Debounce the save to avoid too many requests
    const timeoutId = setTimeout(saveContent, 1000);
    return () => clearTimeout(timeoutId);
  }, [content]);

  const updateContent = (section: keyof WebsiteContent, data: any) => {
    setContent(prev => {
      const prevSection = prev[section];
      let nextSection: WebsiteContent[keyof WebsiteContent];

      if (typeof data === 'function') {
        nextSection = data(prevSection);
      } else if (Array.isArray(prevSection)) {
        nextSection = Array.isArray(data) ? data : prevSection;
      } else if (typeof prevSection === 'object' && prevSection !== null) {
        nextSection = { ...prevSection, ...data };
      } else {
        nextSection = data;
      }

      return {
        ...prev,
        [section]: nextSection,
      };
    });
  };

  const login = (password: string): boolean => {
    if (password === adminPassword) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (currentPassword !== adminPassword) {
      return false;
    }
    setAdminPassword(newPassword);
    localStorage.setItem('adminPassword', newPassword);
    return true;
  };

  return (
    <AdminContext.Provider value={{ content, updateContent, isAdmin, login, logout, changePassword }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

