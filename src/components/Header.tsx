import { Menu, X, Plane, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAdmin } from '../contexts/AdminContext';

interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onBookNow?: () => void;
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen, onBookNow }: HeaderProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { content } = useAdmin();

  return (
    <header className="fixed w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{content.header.logoText}</span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {content.header.navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
              <button 
                onClick={onBookNow}
                className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
                Book Now
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {content.header.navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button 
              onClick={() => {
                if (onBookNow) onBookNow();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200">
              Book Now
            </button>
          </div>
        </div>
        
      )}
    </header>
  );
}
