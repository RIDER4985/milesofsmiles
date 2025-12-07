import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export default function Contact() {
  const { content } = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*New Contact Form Submission*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `*Message:*\n${formData.message || 'No message provided'}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${content.contact.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
    alert('Opening WhatsApp to send your message...');
  };

  const formatPhoneForTel = (phoneNumber: string) => {
    // Remove all non-digit characters except + for tel: link
    // Keep + if present, otherwise remove all non-digits
    if (phoneNumber.startsWith('+')) {
      return phoneNumber.replace(/[^\d+]/g, '');
    }
    return phoneNumber.replace(/\D/g, '');
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {content.contact.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {content.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 rounded-3xl p-8 lg:p-12 text-white h-full">
              <h3 className="text-3xl font-bold mb-8">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-2">Phone</p>
                    <a
                      href={`tel:${formatPhoneForTel(content.contact.phone1)}`}
                      className="block text-blue-100 hover:text-white mb-2 transition-colors cursor-pointer hover:underline"
                    >
                      {content.contact.phone1}
                    </a>
                    <a
                      href={`tel:${formatPhoneForTel(content.contact.phone2)}`}
                      className="block text-blue-100 hover:text-white transition-colors cursor-pointer hover:underline"
                    >
                      {content.contact.phone2}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href={`mailto:${content.contact.email}`} className="text-blue-100 hover:text-white transition-colors">
                      {content.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Office</p>
                    <p className="text-blue-100" dangerouslySetInnerHTML={{ __html: content.contact.address }} />
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-sm text-blue-100">
                  {content.contact.hours}
                </p>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/20 outline-none transition-all duration-200 resize-none"
                  placeholder="Tell us about your dream vacation..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 dark:bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center space-x-2"
              >
                <span>Send via WhatsApp</span>
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}