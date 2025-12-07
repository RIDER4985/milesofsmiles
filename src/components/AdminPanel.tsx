import { useState, useEffect } from 'react';
import { X, Save, LogOut, Settings, Edit, Eye, Plus, Trash2, Shield, Power } from 'lucide-react';
import { useAdmin, Destination } from '../contexts/AdminContext';

export default function AdminPanel() {
  const { content, updateContent, isAdmin, login, logout, changePassword } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'header' | 'hero' | 'footer' | 'contact' | 'features' | 'destinations' | 'security'>('header');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [hasAccess, setHasAccess] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.hash === '#admin';
  });
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    next: '',
    confirm: '',
  });
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setHasAccess(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (!hasAccess) {
    return null;
  }

  const handleDestinationFieldChange = (index: number, field: keyof Destination, value: unknown) => {
    const updated = [...(content.destinations || [])];
    if (!updated[index]) return;
    updated[index] = { ...updated[index], [field]: value } as Destination;
    updateContent('destinations', updated);
  };

  const handleDestinationListChange = (index: number, field: 'highlights' | 'inclusions', value: string) => {
    const list = value
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);
    handleDestinationFieldChange(index, field, list);
  };

  const handleItineraryChange = (
    destinationIndex: number,
    itineraryIndex: number,
    field: keyof Destination['itinerary'][number],
    value: string | number,
  ) => {
    const updated = [...(content.destinations || [])];
    if (!updated[destinationIndex]) return;
    const itinerary = [...updated[destinationIndex].itinerary];
    itinerary[itineraryIndex] = {
      ...itinerary[itineraryIndex],
      [field]: field === 'day' ? Number(value) : value,
    };
    updated[destinationIndex] = { ...updated[destinationIndex], itinerary };
    updateContent('destinations', updated);
  };

  const addItineraryItem = (destinationIndex: number) => {
    const updated = [...(content.destinations || [])];
    if (!updated[destinationIndex]) return;
    const nextDayNumber = (updated[destinationIndex].itinerary.slice(-1)[0]?.day || 0) + 1;
    const itinerary = [
      ...updated[destinationIndex].itinerary,
      { day: nextDayNumber, title: 'New Day', description: 'Describe the activities for this day.' },
    ];
    updated[destinationIndex] = { ...updated[destinationIndex], itinerary };
    updateContent('destinations', updated);
  };

  const removeItineraryItem = (destinationIndex: number, itineraryIndex: number) => {
    const updated = [...(content.destinations || [])];
    if (!updated[destinationIndex]) return;
    const itinerary = updated[destinationIndex].itinerary.filter((_, idx) => idx !== itineraryIndex);
    updated[destinationIndex] = { ...updated[destinationIndex], itinerary };
    updateContent('destinations', updated);
  };

  const addDestination = () => {
    const newDestination: Destination = {
      name: 'New Destination',
      image: 'https://via.placeholder.com/800x600?text=Destination',
      tag: 'Featured',
      rating: 4.5,
      duration: '4 Days',
      description: 'Add a compelling description for this package.',
      highlights: ['Highlight 1', 'Highlight 2'],
      inclusions: ['Inclusion 1', 'Inclusion 2'],
      itinerary: [
        {
          day: 1,
          title: 'Day 1',
          description: 'Describe the planned activities for Day 1.',
        },
      ],
    };

    updateContent('destinations', [...(content.destinations || []), newDestination]);
    setActiveTab('destinations');
  };

  const handleRemoveDestination = (index: number) => {
    if (typeof window !== 'undefined' && !window.confirm('Are you sure you want to remove this destination?')) {
      return;
    }
    const updated = (content.destinations || []).filter((_, idx) => idx !== index);
    updateContent('destinations', updated);
  };

  const destinations = content.destinations || [];

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.next || !passwordForm.current) {
      setPasswordStatus({ type: 'error', message: 'Please complete all fields.' });
      return;
    }

    if (passwordForm.next !== passwordForm.confirm) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match.' });
      return;
    }

    const success = changePassword(passwordForm.current, passwordForm.next);
    if (!success) {
      setPasswordStatus({ type: 'error', message: 'Current password is incorrect.' });
      return;
    }

    setPasswordStatus({ type: 'success', message: 'Password updated successfully.' });
    setPasswordForm({ current: '', next: '', confirm: '' });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 dark:bg-gray-900/90 backdrop-blur rounded-3xl shadow-2xl border border-white/10 dark:border-gray-800 p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/10 text-blue-600">
              <Settings className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Access</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter the admin password to manage website content.</p>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (login(password)) {
                setPassword('');
                setLoginError('');
              } else {
                setLoginError('Incorrect password. Please try again.');
              }
            }}
          >
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-600/20 outline-none"
              />
            </div>

            {loginError && <p className="text-sm text-red-600 dark:text-red-400">{loginError}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-600/30"
            >
              <Settings className="h-5 w-5" />
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <p className="text-xs text-center text-gray-400">
            This page is private. Remove <code className="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800">#admin</code> from the URL to
            exit.
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'header' as const, label: 'Header' },
    { id: 'hero' as const, label: 'Hero' },
    { id: 'footer' as const, label: 'Footer' },
    { id: 'contact' as const, label: 'Contact' },
    { id: 'features' as const, label: 'Features' },
    { id: 'destinations' as const, label: 'Destinations' },
    { id: 'security' as const, label: 'Security' },
  ];

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200"
          title="Admin Panel"
        >
          {isOpen ? <Eye className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
            logout();
          }}
          className="bg-gray-900/80 hover:bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-200 text-sm inline-flex items-center space-x-2"
          title="Logout"
        >
          <Power className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div
            className="fixed right-0 top-0 h-full w-full max-w-4xl bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Edit className="h-6 w-6" />
                Admin Panel
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Tabs */}
              <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 font-semibold transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Header Tab */}
              {activeTab === 'header' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Logo Text
                    </label>
                    <input
                      type="text"
                      value={content.header.logoText}
                      onChange={(e) => updateContent('header', { logoText: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Navigation Items
                    </label>
                    {content.header.navigation.map((item, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const newNav = [...content.header.navigation];
                            newNav[index].name = e.target.value;
                            updateContent('header', { navigation: newNav });
                          }}
                          placeholder="Name"
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                        />
                        <input
                          type="text"
                          value={item.href}
                          onChange={(e) => {
                            const newNav = [...content.header.navigation];
                            newNav[index].href = e.target.value;
                            updateContent('header', { navigation: newNav });
                          }}
                          placeholder="Link"
                          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hero Tab */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={content.hero.badge}
                      onChange={(e) => updateContent('hero', { badge: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={content.hero.title}
                      onChange={(e) => updateContent('hero', { title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Title Highlight
                    </label>
                    <input
                      type="text"
                      value={content.hero.titleHighlight}
                      onChange={(e) => updateContent('hero', { titleHighlight: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Description
                    </label>
                    <textarea
                      value={content.hero.description}
                      onChange={(e) => updateContent('hero', { description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Stats - Happy Travelers
                    </label>
                    <input
                      type="text"
                      value={content.hero.stats.happyTravelers}
                      onChange={(e) => updateContent('hero', { stats: { ...content.hero.stats, happyTravelers: e.target.value } })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Stats - Destinations
                    </label>
                    <input
                      type="text"
                      value={content.hero.stats.destinations}
                      onChange={(e) => updateContent('hero', { stats: { ...content.hero.stats, destinations: e.target.value } })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Footer Tab */}
              {activeTab === 'footer' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={content.footer.companyName}
                      onChange={(e) => updateContent('footer', { companyName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Description
                    </label>
                    <textarea
                      value={content.footer.description}
                      onChange={(e) => updateContent('footer', { description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={content.footer.phone}
                      onChange={(e) => updateContent('footer', { phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={content.footer.email}
                      onChange={(e) => updateContent('footer', { email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={content.footer.address}
                      onChange={(e) => updateContent('footer', { address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Copyright Text
                    </label>
                    <input
                      type="text"
                      value={content.footer.copyright}
                      onChange={(e) => updateContent('footer', { copyright: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Contact Tab */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={content.contact.title}
                      onChange={(e) => updateContent('contact', { title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.contact.subtitle}
                      onChange={(e) => updateContent('contact', { subtitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone 1
                    </label>
                    <input
                      type="text"
                      value={content.contact.phone1}
                      onChange={(e) => updateContent('contact', { phone1: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone 2
                    </label>
                    <input
                      type="text"
                      value={content.contact.phone2}
                      onChange={(e) => updateContent('contact', { phone2: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={content.contact.email}
                      onChange={(e) => updateContent('contact', { email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Address (HTML allowed)
                    </label>
                    <textarea
                      value={content.contact.address}
                      onChange={(e) => updateContent('contact', { address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      WhatsApp Number (without +)
                    </label>
                    <input
                      type="text"
                      value={content.contact.whatsappNumber}
                      onChange={(e) => updateContent('contact', { whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Hours
                    </label>
                    <input
                      type="text"
                      value={content.contact.hours}
                      onChange={(e) => updateContent('contact', { hours: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Features Tab */}
              {activeTab === 'features' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={content.features.title}
                      onChange={(e) => updateContent('features', { title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.features.subtitle}
                      onChange={(e) => updateContent('features', { subtitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Feature Items
                    </label>
                    {content.features.items.map((item, index) => (
                      <div key={index} className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const newItems = [...content.features.items];
                            newItems[index].title = e.target.value;
                            updateContent('features', { items: newItems });
                          }}
                          placeholder="Title"
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none mb-2"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => {
                            const newItems = [...content.features.items];
                            newItems[index].description = e.target.value;
                            updateContent('features', { items: newItems });
                          }}
                          placeholder="Description"
                          rows={2}
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Destinations Tab */}
              {activeTab === 'destinations' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Manage Destinations</h3>
                    <button
                      onClick={addDestination}
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Destination</span>
                    </button>
                  </div>

                  {destinations.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-300">No destinations available. Add one to get started.</p>
                  )}

                  {destinations.map((destination, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 space-y-4 bg-gray-50/60 dark:bg-gray-800/50"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{destination.name}</h4>
                        <button
                          onClick={() => handleRemoveDestination(index)}
                          className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove</span>
                        </button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Destination Name
                          </label>
                          <input
                            type="text"
                            value={destination.name}
                            onChange={(e) => handleDestinationFieldChange(index, 'name', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Tag</label>
                          <input
                            type="text"
                            value={destination.tag}
                            onChange={(e) => handleDestinationFieldChange(index, 'tag', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={destination.duration}
                            onChange={(e) => handleDestinationFieldChange(index, 'duration', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Rating
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={destination.rating}
                            onChange={(e) => handleDestinationFieldChange(index, 'rating', Number(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={destination.image}
                            onChange={(e) => handleDestinationFieldChange(index, 'image', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={destination.description}
                          onChange={(e) => handleDestinationFieldChange(index, 'description', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Highlights (one per line)
                          </label>
                          <textarea
                            rows={4}
                            value={destination.highlights.join('\n')}
                            onChange={(e) => handleDestinationListChange(index, 'highlights', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Inclusions (one per line)
                          </label>
                          <textarea
                            rows={4}
                            value={destination.inclusions.join('\n')}
                            onChange={(e) => handleDestinationListChange(index, 'inclusions', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Itinerary</h5>
                          <button
                            onClick={() => addItineraryItem(index)}
                            className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl bg-gray-900/5 dark:bg-white/10 hover:bg-gray-900/10 dark:hover:bg-white/20 text-sm font-semibold text-gray-800 dark:text-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Day</span>
                          </button>
                        </div>

                        {destination.itinerary.map((item, itineraryIndex) => (
                          <div
                            key={itineraryIndex}
                            className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3 bg-white dark:bg-gray-900/40"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                  Day {item.day}
                                </span>
                              </div>
                              <button
                                onClick={() => removeItineraryItem(index, itineraryIndex)}
                                className="inline-flex items-center space-x-1 text-xs text-red-600 dark:text-red-400 hover:underline"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Remove Day</span>
                              </button>
                            </div>
                            <div className="grid md:grid-cols-3 gap-3">
                              <input
                                type="number"
                                min="1"
                                value={item.day}
                                onChange={(e) => handleItineraryChange(index, itineraryIndex, 'day', Number(e.target.value))}
                                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                              />
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => handleItineraryChange(index, itineraryIndex, 'title', e.target.value)}
                                className="md:col-span-2 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                                placeholder="Title"
                              />
                            </div>
                            <textarea
                              rows={2}
                              value={item.description}
                              onChange={(e) => handleItineraryChange(index, itineraryIndex, 'description', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                              placeholder="Description"
                            />
                          </div>
                        ))}

                        {destination.itinerary.length === 0 && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">No itinerary yet. Add a day to begin.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                      <Shield className="h-6 w-6 text-blue-600" />
                      <span>Password Settings</span>
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Update the admin password. Make sure to keep it secure and share only with trusted team members.
                    </p>
                  </div>

                  <form className="space-y-5" onSubmit={handlePasswordChange}>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.current}
                        onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                        placeholder="Enter current password"
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">New Password</label>
                        <input
                          type="password"
                          value={passwordForm.next}
                          onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          placeholder="Enter new password"
                          required
                          minLength={6}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordForm.confirm}
                          onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none"
                          placeholder="Re-enter new password"
                          required
                          minLength={6}
                        />
                      </div>
                    </div>

                    {passwordStatus && (
                      <div
                        className={`p-3 rounded-xl text-sm ${
                          passwordStatus.type === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-800'
                        }`}
                      >
                        {passwordStatus.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-600/20"
                    >
                      <Shield className="h-5 w-5" />
                      <span>Update Password</span>
                    </button>
                  </form>
                </div>
              )}

              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <p className="text-sm text-green-800 dark:text-green-200 flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Changes are saved automatically
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

