import { motion } from 'framer-motion';
import { Wind, Settings, Wrench, ThermometerSnowflake, HelpCircle, CheckCircle } from 'lucide-react';

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

export default function Services() {
  return (
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
  );
}
