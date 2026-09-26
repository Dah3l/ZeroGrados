import { motion } from 'framer-motion';
import { ShoppingCart, Search, CheckCircle, Snowflake, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5355511093';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20quiero%20cotizar%20un%20equipo%20de%20aire%20acondicionado`;

export default function BuySell() {
  return (
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
            <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-cyan-200/30 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200/30 rounded-full blur-xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
