import { useState, useEffect } from 'react';
import { BusinessProvider } from './context/BusinessContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BuySell from './components/BuySell';
import Guarantee from './components/Guarantee';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import { useNavigation } from './hooks/useNavigation';

type View = 'home' | 'admin-login' | 'admin-panel';

function AppContent() {
  const [view, setView] = useState<View>(() => {
    // Check if user is already logged in
    const session = sessionStorage.getItem('admin_session');
    const path = window.location.hash;
    if (path === '#/admin' && session === 'true') {
      return 'admin-panel';
    }
    if (path === '#/admin') {
      return 'admin-login';
    }
    return 'home';
  });

  const { activeSection, scrollToSection } = useNavigation();

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash;
      if (path === '#/admin') {
        const session = sessionStorage.getItem('admin_session');
        setView(session === 'true' ? 'admin-panel' : 'admin-login');
      } else {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleLogin = () => {
    window.location.hash = '#/admin';
    setView('admin-panel');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session');
    window.location.hash = '';
    setView('home');
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setView('home');
  };

  if (view === 'admin-login') {
    return <AdminLogin onLogin={handleLogin} onBack={handleBackToHome} />;
  }

  if (view === 'admin-panel') {
    return <AdminPanel onBack={handleBackToHome} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif] overflow-x-hidden">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />
      <Hero onNavigate={scrollToSection} />
      <Services />
      <BuySell />
      <Guarantee />
      <Contact />
      <Footer onNavigate={scrollToSection} />
      <FloatingWhatsApp />
    </div>
  );
}

function App() {
  return (
    <BusinessProvider>
      <AppContent />
    </BusinessProvider>
  );
}

export default App;
