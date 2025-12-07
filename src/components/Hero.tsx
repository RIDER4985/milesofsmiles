import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight, Star, Shield, Globe } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

interface HeroProps {
  onSearch?: (searchTerm: string) => void;
  searchFilter?: string;
}

const iconMap: Record<string, any> = {
  Star,
  Shield,
  Globe,
};

export default function Hero({ onSearch, searchFilter }: HeroProps) {
  const { content } = useAdmin();
  const [searchParams, setSearchParams] = useState({
    destination: '',
    date: '',
    travelers: '',
  });

  // Sync input with searchFilter when it's cleared
  useEffect(() => {
    if (!searchFilter) {
      setSearchParams(prev => ({ ...prev, destination: '' }));
    }
  }, [searchFilter]);

  const [searchResults, setSearchResults] = useState<string | null>(null);

  const handleSearch = () => {
    if (searchParams.destination || searchParams.date || searchParams.travelers) {
      const results = `Searching for trips to ${searchParams.destination || 'any destination'} ${
        searchParams.date ? `on ${searchParams.date}` : ''
      } ${searchParams.travelers ? `for ${searchParams.travelers} travelers` : ''}`;
      setSearchResults(results);

      // Pass search term to parent component for filtering
      if (onSearch && searchParams.destination) {
        onSearch(searchParams.destination);
      }

      setTimeout(() => {
        setSearchResults(null);
      }, 3000);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_#000_1px,_transparent_0)] bg-[length:24px_24px]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Text and Features */}
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  {content.hero.badge}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {content.hero.title}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mt-2">
                  {content.hero.titleHighlight}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {content.hero.description}
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {content.hero.features.map((feature, index) => {
                const IconComponent = iconMap[feature.icon] || Star;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => {
                  const destinationsSection = document.getElementById('destinations');
                  if (destinationsSection) {
                    destinationsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
              >
                <span>Explore Destinations</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-gray-200 dark:border-gray-600 font-semibold text-lg"
              >
                plan Your Trip
              </button>
            </div>
          </div>

          {/* Right Content - Image with Overlay */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Premium luxury travel experience with Miles of Smiles - Discover amazing destinations worldwide"
                className="w-full h-[600px] object-cover"
                loading="eager"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              {/* Content Overlay */}
              {/* <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold mb-2">Bali Premium Package</h3>
                  <p className="text-white/80 mb-4">7 days of luxury in tropical paradise</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">4.9</span>
                      <span className="text-white/70">(2.4k reviews)</span>
                    </div>
                    <div className="text-2xl font-bold">$1,299</div>
                  </div>
                </div>
              </div> */}
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{content.hero.stats.happyTravelers}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Travelers</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-blue-600 dark:bg-blue-500 rounded-2xl shadow-2xl p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{content.hero.stats.destinations}</div>
                <div className="text-sm text-blue-100">Destinations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Find Your Perfect Trip
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Search through our curated collection of amazing destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="group relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <input
                type="text"
                placeholder="Where to?"
                value={searchParams.destination}
                onChange={(e) => {
                  handleInputChange('destination', e.target.value);
                  if (onSearch) {
                    onSearch(e.target.value);
                  }
                }}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-200"
              />
            </div>

            <div className="group relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <input
                type="date"
                value={searchParams.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-200"
              />
            </div>

            <div className="group relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <input
                type="number"
                placeholder="Travelers"
                min="1"
                value={searchParams.travelers}
                onChange={(e) => handleInputChange('travelers', e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 outline-none transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl font-semibold text-lg"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>

          {searchResults && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-800 dark:text-green-200 text-center">
              {searchResults}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}