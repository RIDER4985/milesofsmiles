import { useState } from 'react';
import { X, MapPin, Clock, Send } from 'lucide-react';

interface DestinationModalProps {
  destination: {
    name: string;
    image: string;
    tag?: string;
    rating: number;
    duration: string;
    description: string;
    highlights: string[];
    itinerary: Array<{
      day: number;
      title: string;
      description: string;
    }>;
    inclusions: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

// WhatsApp phone number - Update this with your WhatsApp number (include country code, no + or spaces)
// Example: 1234567890 for US number
const WHATSAPP_NUMBER = '916353568077'; // Update this with your WhatsApp number

export default function DestinationModal({ destination, isOpen, onClose }: DestinationModalProps) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '',
    travelDate: '',
    message: '',
  });

  if (!isOpen || !destination) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `*New Booking Request*\n\n` +
      `*Destination:* ${destination.name}\n` +
      `*Tag:* ${destination.tag || 'Premium Package'}\n` +
      `*Duration:* ${destination.duration}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${bookingData.name}\n` +
      `Email: ${bookingData.email}\n` +
      `Phone: ${bookingData.phone}\n` +
      `Number of Travelers: ${bookingData.travelers}\n` +
      `Travel Date: ${bookingData.travelDate}\n\n` +
      `*Message:*\n${bookingData.message || 'No additional message'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Reset form
    setBookingData({
      name: '',
      email: '',
      phone: '',
      travelers: '',
      travelDate: '',
      message: '',
    });
    setShowBookingForm(false);
    alert('Opening WhatsApp to send your booking request...');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] my-4 sm:my-8 overflow-hidden animate-slideUp flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors z-10"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300" />
        </button>

        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8">
            <div className="space-y-4">
              <img
                src={destination.image}
                alt={`${destination.name} travel destination - ${destination.duration} package with ${destination.rating} star rating`}
                className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl sm:rounded-2xl shadow-lg"
                loading="lazy"
              />
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">Package Type</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{destination.tag || 'Premium Package'}</p>
                </div>
                {!showBookingForm && (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base">
                    Request a Quote
                  </button>
                )}
              </div>

              {showBookingForm && (
                <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">Inquiry Form</h3>
                  <form onSubmit={handleBookingSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Number of Travelers *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={bookingData.travelers}
                        onChange={(e) => setBookingData({ ...bookingData, travelers: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none"
                        placeholder="2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Preferred Travel Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingData.travelDate}
                        onChange={(e) => setBookingData({ ...bookingData, travelDate: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Additional Message
                      </label>
                      <textarea
                        rows={3}
                        value={bookingData.message}
                        onChange={(e) => setBookingData({ ...bookingData, message: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none resize-none"
                        placeholder="Any special requests or questions..."
                      ></textarea>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 dark:bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-sm sm:text-base flex items-center justify-center space-x-2"
                      >
                        <span>Send via WhatsApp</span>
                        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowBookingForm(false)}
                        className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-all duration-200 font-semibold text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            <div className="overflow-y-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">{destination.name}</h2>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold">{destination.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold">{destination.rating}</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">{destination.description}</p>

              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">Trip Highlights</h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">What's Included</h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {destination.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3 bg-green-50 dark:bg-green-900/20 p-2 sm:p-3 rounded-lg">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                      </div>
                      <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Day-by-Day Itinerary</h3>
            <div className="space-y-3 sm:space-y-4">
              {destination.itinerary.map((day, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 border-l-4 border-blue-600 dark:border-blue-500 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400 font-bold text-sm sm:text-lg">Day {day.day}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">{day.title}</h4>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
