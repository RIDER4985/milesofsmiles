import { Plane, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

export default function Footer() {
  const { content } = useAdmin();

  const formatPhoneForTel = (phoneNumber: string) => {
    // Remove all non-digit characters except + for tel: link
    // Keep + if present, otherwise remove all non-digits
    if (phoneNumber.startsWith('+')) {
      return phoneNumber.replace(/[^\d+]/g, '');
    }
    return phoneNumber.replace(/\D/g, '');
  };

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">{content.footer.companyName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 text-lg max-w-md">
              {content.footer.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <a
                href={`tel:${formatPhoneForTel(content.footer.phone)}`}
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
              >
                <Phone className="h-5 w-5 text-blue-400" />
                <span>{content.footer.phone}</span>
              </a>
              <a
                href={`mailto:${content.footer.email}`}
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-400" />
                <span>{content.footer.email}</span>
              </a>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{content.footer.address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {content.footer.quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Services</h3>
            <ul className="space-y-4">
              {content.footer.services.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex space-x-6 mb-6 sm:mb-0">
            <a href={content.footer.socialLinks.facebook} className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-200 hover:scale-110">
              <Facebook className="h-6 w-6" />
            </a>
            <a href={content.footer.socialLinks.twitter} className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-400 transition-all duration-200 hover:scale-110">
              <Twitter className="h-6 w-6" />
            </a>
            <a href={content.footer.socialLinks.instagram} className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-pink-600 transition-all duration-200 hover:scale-110">
              <Instagram className="h-6 w-6" />
            </a>
            <a href={content.footer.socialLinks.youtube} className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-red-600 transition-all duration-200 hover:scale-110">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-gray-400 text-lg">{content.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}