import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Snowflake,
  Phone,
  MessageCircle,
  Wrench,
  Shield,
  ShoppingCart,
  CheckCircle,
  Clock,
  MapPin,
  Menu,
  X,
  ChevronDown,
  Wind,
  ThermometerSnowflake,
  Settings,
  HelpCircle,
  Search,
} from 'lucide-react';

const WHATSAPP_NUMBER = '5355511093';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Zero%20Grados`;

const HEADER_HEIGHT = 64; // height of fixed header in px

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section for nav highlighting
      const sections = ['inicio', 'servicios', 'venta', 'garantia', 'contacto'];
      for (const id of sections.reverse()) {
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMenuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Smooth scroll to section with header offset
  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const menuBtn = document.getElementById('mobile-menu-btn');
        if (menuBtn && !menuBtn.contains(e.target as Node)) {
          setIsMenuOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Inicio', href: 'inicio' },
    { name: 'Servicios', href: 'servicios' },
    { name: 'Venta de Equipos', href: 'venta' },
    { name: 'Garantía', href: 'garantia' },
    { name: 'Contacto', href: 'contacto' },
  ];

  const services = [
    {
      icon: <Wind className="w-7 h-7 sm:w-8 sm:h-8" />,
      title: 'Cargas de Refrigerante',
      description: 'Recarga de gas profesional para optimizar el enfriamiento de tu equipo.',
    },
    {
      icon: <Settings className="w-7 h-7 sm:w-8 sm:h-8" />,
      title: 'Mantenimientos',
      description: 'Limpieza profunda y revisión preventiva para alargar la vida de tu equipo.',
    },
    {
      icon: <Wrench className="w-7 h-7 sm:w-8 sm:h-8" />,
      title: 'Reparaciones',
      description: 'Solución de averías eléctricas y mecánicas con garantía.',
    },
    {
      icon: <ThermometerSnowflake className="w-7 h-7 sm:w-8 sm:h-8" />,
      title: 'Montajes',
      description: 'Instalación profesional de sistemas Split, Ventana y más.',
    },
    {
      icon: <HelpCircle className="w-7 h-7 sm:w-8 sm:h-8" />,
      title: '¡Y Más!',
      description: 'Asesoría técnica especializada para tu hogar o negocio.',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-[Inter,sans-serif] overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('inicio')}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <Snowflake
                  className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors duration-300 ${
                    scrolled || isMenuOpen ? 'text-blue-600' : 'text-white'
                  } group-hover:text-blue-400`}
                />
              </div>
              <span
                className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300 ${
                  scrolled || isMenuOpen ? 'text-gray-900' : 'text-white'
                }`}
              >
                Zero Grados
              </span>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
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

            {/* CTA Button Desktop */}
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

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-btn"
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

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 md:hidden z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Panel */}
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-white shadow-2xl md:hidden z-50 flex flex-col"
              >
                {/* Menu Header */}
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

                {/* Menu Links */}
                <nav className="flex-1 overflow-y-auto py-4 px-2">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={() => scrollToSection(link.href)}
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

                {/* Menu Footer CTA */}
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
      </header>

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://image.qwenlm.ai/generated-images/9bfd83fe-247c-4802-88b7-a8ffcd388bf6/_result.png"
            alt="Aire acondicionado moderno"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-cyan-900/70" />
        </div>

        {/* Animated Snowflakes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10"
              style={{
                left: `${(i * 10) + Math.random() * 5}%`,
              }}
              initial={{ y: -50, rotate: 0 }}
              animate={{ y: '110vh', rotate: 360 }}
              transition={{
                duration: Math.random() * 10 + 12,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: 'linear',
              }}
            >
              <Snowflake className="w-3 h-3 sm:w-5 sm:h-5" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6">
              <Snowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-300" />
              <span className="text-white/90 text-xs sm:text-sm font-medium">
                Climatización Profesional
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-4 sm:mb-6">
              ¡NO ESPERES AL{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                VERANO
              </span>
              !
              <br />
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 block">
                ¡TEN TU ESPACIO CLIMATIZADO YA!
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium mb-3 sm:mb-4">
              Soluciones integrales para tu hogar y negocio.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              Mantenimiento, reparación e instalación profesional para que disfrutes del confort en
              todo momento.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-green-500 active:bg-green-600 hover:bg-green-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-green-500/30 active:scale-95"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                Contáctanos por WhatsApp
              </a>
              <button
                onClick={() => scrollToSection('servicios')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 active:bg-white/20 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 active:scale-95"
              >
                Ver Servicios
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-16 sm:py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Lo que hacemos
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Servicios Completos de{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Climatización
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Realizamos todo tipo de trabajos técnicos con la mayor calidad y rapidez.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 active:scale-[0.98]"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-3 sm:mt-4 flex items-center gap-2 text-blue-600 font-medium text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Servicio garantizado
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy & Sell Section */}
      <section id="venta" className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Compra y Venta
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                ¿Buscas o Vendes un Equipo de{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Aire Acondicionado
                </span>
                ?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                ¡Te ayudamos con la gestión e instalación a buen precio!
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">Si buscas:</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Te asesoramos para elegir el equipo ideal según el tamaño de tu habitación.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base sm:text-lg">Si vendes:</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Gestionamos la compra de tu equipo usado o nuevo.
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 active:from-blue-700 active:to-cyan-600 hover:from-blue-700 hover:to-cyan-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 mt-6 sm:mt-8"
              >
                <MessageCircle className="w-5 h-5" />
                Cotizar mi Equipo
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-8 md:mt-0"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-6 sm:p-8 md:p-10 border border-blue-100">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Snowflake className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Asesoría Gratuita</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    'Evaluamos tus necesidades',
                    'Recomendamos el equipo ideal',
                    'Instalación profesional incluida',
                    'Garantía de satisfacción',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl text-center">
                  <p className="text-xs sm:text-sm text-blue-600 font-medium">
                    📞 Llámanos o escríbenos por WhatsApp
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900 mt-1">+53 5 5511 0934</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-cyan-200/30 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200/30 rounded-full blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section id="garantia" className="py-16 sm:py-20 md:py-28 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10">
            <Snowflake className="w-20 h-20 sm:w-32 sm:h-32 text-white" />
          </div>
          <div className="absolute bottom-10 right-10">
            <Snowflake className="w-28 h-28 sm:w-48 sm:h-48 text-white" />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl shadow-green-500/30">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 px-2">
              Ofrecemos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                UN MES DE GARANTÍA
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/80 mb-4 sm:mb-6">
              Por cualquier servicio realizado.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              En Zero Grados nos comprometemos con la calidad de nuestro trabajo. Si algo falla
              después de nuestra intervención, volvemos a revisarlo{' '}
              <strong className="text-white">sin costo adicional</strong> dentro del período de
              garantía.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              {[
                { icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'Servicio garantizado' },
                { icon: <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />, text: 'Sin costo adicional' },
                { icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />, text: '30 días de cobertura' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-5"
                >
                  <div className="text-green-300 mb-2 flex justify-center">{item.icon}</div>
                  <p className="text-white font-medium text-sm sm:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16 sm:py-20 md:py-28 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              ¡Contáctanos y Vive con{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Confort
              </span>
              !
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 px-2">
              Toca el enlace para más información y serás atendido.
            </p>

            {/* WhatsApp Button */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 sm:gap-4 bg-green-500 active:bg-green-600 hover:bg-green-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 shadow-2xl hover:shadow-green-500/30 active:scale-95 mb-10 sm:mb-12"
            >
              <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              <div className="text-left">
                <div className="text-xs sm:text-sm font-normal opacity-80">Enviar Mensaje</div>
                <div className="text-base sm:text-xl">+53 5 5511 0934</div>
              </div>
            </a>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto">
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100">
                <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Horario de Atención</h4>
                <p className="text-gray-600 text-xs sm:text-sm">Lunes a Sábado</p>
                <p className="text-gray-600 text-xs sm:text-sm">8:00 AM - 6:00 PM</p>
              </div>
              <div className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100">
                <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-blue-500 mx-auto mb-3" />
                <h4 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">Zona de Cobertura</h4>
                <p className="text-gray-600 text-xs sm:text-sm">La Habana y alrededores</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Snowflake className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
                <span className="text-lg sm:text-xl font-bold">Zero Grados</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Soluciones integrales de climatización para tu hogar y negocio. Calidad, rapidez y
                garantía en cada servicio.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-base sm:text-lg mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-cyan-400 active:text-cyan-300 transition-colors text-xs sm:text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="sm:col-span-2 md:col-span-1">
              <h4 className="font-bold text-base sm:text-lg mb-4">Síguenos</h4>
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 active:bg-blue-600 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f text-white text-sm" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 active:bg-pink-600 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-white text-sm" />
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 active:bg-green-600 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp text-white text-sm" />
                </a>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-2" />
                +53 5 5511 0934
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
            <p className="text-gray-500 text-xs sm:text-sm">
              © {new Date().getFullYear()} Zero Grados. Soluciones Integrales para tu Hogar y
              Negocio. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-green-500 active:bg-green-600 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/40 transition-all duration-300 active:scale-90 hover:scale-110 group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
          ¡Escríbenos!
        </span>
      </a>
    </div>
  );
}

export default App;
