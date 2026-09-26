import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, MessageCircle, Menu, X } from 'lucide-react';

const WHATSAPP_NUMBER = '5355511093';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Zero%20Grados`;

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const handleNavClick = useCallback((sectionId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      onNavigate(sectionId);
    }, 100);
  }, [onNavigate]);

  const navLinks = [
    { name: 'Inicio', href: 'inicio' },
    { name: 'Servicios', href: 'servicios' },
    { name: 'Venta de Equipos', href: 'venta' },
    { name: 'Garantía', href: 'garantia' },
    { name: 'Contacto', href: 'contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => handleNavClick('inicio')}
              className="flex items-center gap-2 group"
            >
              <Snowflake
                className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 ${
                  scrolled || isMenuOpen ? 'text-blue-600' : 'text-white'
                } group-hover:text-blue-400`}
              />
              <span
                className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 ${
                  scrolled || isMenuOpen ? 'text-gray-900' : 'text-white'
                }`}
              >
                Zero Grados
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-blue-400 relative ${
                    scrolled ? 'text-gray-700' : 'text-white/90'
                  } ${activeSection === link.href ? 'text-blue-400' : ''}`}
                >
                  {link.name}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              className="md:hidden p-2 -mr-2 active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-gray-900" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              ref={menuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-white shadow-2xl z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Snowflake className="w-6 h-6 text-blue-600" />
                  <span className="text-lg font-bold text-gray-900">Zero Grados</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2 active:scale-95 transition-transform"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-medium transition-all duration-200 active:scale-[0.98] ${
                      activeSection === link.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    {activeSection === link.href && (
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    )}
                    <span>{link.name}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-100 space-y-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 active:bg-green-600 text-white px-4 py-3.5 rounded-xl font-semibold transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp: +53 5 5511 0934</span>
                </a>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 active:bg-blue-100 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f text-gray-600 text-sm" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-100 active:bg-pink-100 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram text-gray-600 text-sm" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
