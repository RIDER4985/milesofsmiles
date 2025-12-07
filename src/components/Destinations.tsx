import { MapPin, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';

interface DestinationsProps {
  onSelectDestination: (destination: any) => void;
  searchFilter?: string;
  onClearSearch?: () => void;
}

export default function Destinations({ onSelectDestination, searchFilter = '', onClearSearch }: DestinationsProps) {
  const { content } = useAdmin();
  const [showAllDestinations, setShowAllDestinations] = useState(false);

  const allDestinations = content.destinations || [];

  // Filter destinations based on search term
  const filteredDestinations = useMemo(() => {
    if (!searchFilter.trim()) {
      return allDestinations;
    }
    
    const searchLower = searchFilter.toLowerCase().trim();
    return allDestinations.filter(destination => 
      destination.name.toLowerCase().includes(searchLower) ||
      destination.description.toLowerCase().includes(searchLower)
    );
  }, [searchFilter, allDestinations]);

  // Show only 6 destinations initially, or all when showAllDestinations is true or when searching
  const destinations = useMemo(() => {
    if (searchFilter || showAllDestinations) {
      return filteredDestinations;
    }
    return filteredDestinations.slice(0, 6);
  }, [filteredDestinations, showAllDestinations, searchFilter]);

  const handleViewAllDestinations = () => {
    setShowAllDestinations(true);
  };

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {searchFilter ? `Search Results for "${searchFilter}"` : 'Popular Destinations'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {searchFilter 
              ? `Found ${destinations.length} destination${destinations.length !== 1 ? 's' : ''} matching your search`
              : "Explore our handpicked selection of the world's most amazing destinations"
            }
          </p>
        </div>

        {destinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No destinations found matching "{searchFilter}"
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Try searching for: Kerala, Himachal, Santorini, Bali, Paris, Dubai, Maldives, or Tokyo
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {destinations.map((destination, index) => (
            <div
              key={index}
              onClick={() => onSelectDestination(destination)}
              className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-[4/3] w-full flex-shrink-0">
                <img
                  src={destination.image}
                  alt={`${destination.name} - Travel package with ${destination.duration} duration, rated ${destination.rating} stars`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{destination.rating}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm">{destination.name}</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{destination.duration}</p>
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">{destination.tag}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDestination(destination);
                    }}
                    className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap ml-4">
                    Inquiry for Best Price
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        {searchFilter && destinations.length > 0 && (
          <div className="text-center mt-12">
            <button 
              onClick={() => {
                if (onClearSearch) {
                  onClearSearch();
                }
              }}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-blue-600 dark:border-blue-400 font-semibold">
              Clear Search
            </button>
          </div>
        )}

        {!searchFilter && !showAllDestinations && destinations.length > 0 && (
          <div className="text-center mt-12">
            <button 
              onClick={handleViewAllDestinations}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-blue-600 dark:border-blue-400 font-semibold">
              View All Destinations
            </button>
          </div>
        )}

        {!searchFilter && showAllDestinations && (
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAllDestinations(false)}
              className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-blue-600 dark:border-blue-400 font-semibold">
              Show Less Destinations
            </button>
          </div>
        )}
      </div>
    </section>
  );
}