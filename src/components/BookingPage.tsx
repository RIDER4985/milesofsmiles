import { useState } from 'react';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';

// WhatsApp phone number - Update this with your WhatsApp number (include country code, no + or spaces)
const WHATSAPP_NUMBER = '916353568077'; // Update this with your WhatsApp number

interface BookingPageProps {
  onBack: () => void;
}

export default function BookingPage({ onBack }: BookingPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelers: '',
    travelDate: '',
    returnDate: '',
    message: '',
  });

  const [showNotification, setShowNotification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const message = `*New Booking Request*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `*Trip Details:*\n` +
      `Destination: ${formData.destination || 'Not specified'}\n` +
      `Number of Travelers: ${formData.travelers}\n` +
      `Travel Date: ${formData.travelDate}\n` +
      `${formData.returnDate ? `Return Date: ${formData.returnDate}\n` : ''}\n` +
      `*Message:*\n${formData.message || 'No additional message'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Show notification
    setShowNotification(true);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      destination: '',
      travelers: '',
      travelDate: '',
      returnDate: '',
      message: '',
    });

    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-8 flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Back to Home</span>
        </button>

        {/* Notification */}
        {showNotification && (
          <div className="mb-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-4 flex items-start space-x-3 animate-fadeIn shadow-lg">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-green-900 dark:text-green-200 mb-1">Booking Details Sent!</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your booking details have been sent successfully. After confirmation, our agent will contact you shortly.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Book Your Dream Trip
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you to confirm your booking
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Destination
                </label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                  placeholder="Santorini, Greece"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Number of Travelers *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.travelers}
                  onChange={(e) => handleInputChange('travelers', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                  placeholder="2"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Travel Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.travelDate}
                  onChange={(e) => handleInputChange('travelDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Return Date
                </label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => handleInputChange('returnDate', e.target.value)}
                  min={formData.travelDate}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Additional Message
              </label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200 resize-none"
                placeholder="Tell us about your travel preferences, special requests, or any questions you have..."
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 dark:bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to WhatsApp</span>
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 text-center">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> We handle all bookings personally via WhatsApp to ensure the best service.
            Clicking "Continue to WhatsApp" will open a chat with our travel agent with your pre-filled details.
          </p>
        </div>
      </div>
    </div>
  );
}

