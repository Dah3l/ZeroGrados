import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BuySell from './components/BuySell';
import Guarantee from './components/Guarantee';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { useNavigation } from './hooks/useNavigation';

function App() {
  const { activeSection, scrollToSection } = useNavigation();

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

export default App;
