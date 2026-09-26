import { Snowflake, Phone } from 'lucide-react';

const WHATSAPP_NUMBER = '5355511093';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Zero%20Grados`;

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const navLinks = [
    { name: 'Inicio', href: 'inicio' },
    { name: 'Servicios', href: 'servicios' },
    { name: 'Venta de Equipos', href: 'venta' },
    { name: 'Garantía', href: 'garantia' },
    { name: 'Contacto', href: 'contacto' },
  ];

  return (
    <footer id="footer" className="bg-gray-900 text-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
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

          <div>
            <h4 className="font-bold text-base sm:text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-gray-400 hover:text-cyan-400 active:text-cyan-300 transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

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

        <div className="border-t border-gray-800 pt-6 sm:pt-8 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} Zero Grados. Soluciones Integrales para tu Hogar y
            Negocio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
