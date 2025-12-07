import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import AdminPanel from './components/AdminPanel';
import { AdminProvider } from './contexts/AdminContext';

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    setSearchFilter(searchTerm);
    // Scroll to destinations section
    setTimeout(() => {
      const destinationsSection = document.getElementById('destinations');
      if (destinationsSection) {
        destinationsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onBookNow={() => navigate('/booking')}
      />
      <HomePage onSearch={handleSearch} searchFilter={searchFilter} />
      <Footer />
      <AdminPanel />
    </div>
  );
}

function BookingWrapper() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BookingPage onBack={() => navigate('/')} />
    </div>
  );
}

function App() {
  return (
    <AdminProvider>
      <SEO />
      <StructuredData destination={null} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/booking" element={<BookingWrapper />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default App;
