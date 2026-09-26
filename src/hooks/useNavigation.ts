import { useState, useEffect, useCallback } from 'react';

const HEADER_HEIGHT = 64;

export function useNavigation() {
  const [activeSection, setActiveSection] = useState('inicio');

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'servicios', 'venta', 'garantia', 'contacto'];
      
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section with header offset
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  return { activeSection, scrollToSection };
}
