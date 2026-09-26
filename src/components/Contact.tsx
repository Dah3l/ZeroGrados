import { motion } from 'framer-motion';
import { MessageCircle, Clock, MapPin } from 'lucide-react';

const WHATSAPP_NUMBER = '5355511093';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Zero%20Grados`;

export default function Contact() {
  return (
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
  );
}
