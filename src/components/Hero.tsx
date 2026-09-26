import { motion } from 'framer-motion';
import { Snowflake, MessageCircle, ChevronDown } from 'lucide-react';

const WHATSAPP_NUMBER = '5355511093';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Zero%20Grados`;

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://image.qwenlm.ai/generated-images/9bfd83fe-247c-4802-88b7-a8ffcd388bf6/_result.png"
          alt="Aire acondicionado moderno"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/80 to-cyan-900/70" />
      </div>

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
              onClick={() => onNavigate('servicios')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 active:bg-white/20 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-medium transition-all duration-300 active:scale-95"
            >
              Ver Servicios
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
