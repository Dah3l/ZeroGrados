import { motion } from 'framer-motion';
import { Shield, CheckCircle, Clock, Snowflake } from 'lucide-react';

export default function Guarantee() {
  return (
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
  );
}
