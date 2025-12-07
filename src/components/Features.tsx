import { Shield, Clock, Award, HeadphonesIcon, Wallet, Globe } from 'lucide-react';
import { useAdmin } from '../contexts/AdminContext';

const iconMap: Record<string, any> = {
  Shield,
  Clock,
  Award,
  HeadphonesIcon,
  Wallet,
  Globe,
};

export default function Features() {
  const { content } = useAdmin();

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {content.features.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {content.features.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.items.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Shield;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors duration-300">
                  <IconComponent className="h-7 w-7 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
