import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5355511093';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20los%20servicios%20de%20Zero%20Grados`;

export default function FloatingWhatsApp() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const footer = document.getElementById('footer');
    if (!footer) return;

    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.position = 'absolute';
    sentinel.style.pointerEvents = 'none';
    footer.parentNode?.insertBefore(sentinel, footer);
    sentinelRef.current = sentinel;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 pointer-events-none">
      <AnimatePresence>
        {!isFooterVisible && (
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-green-500 active:bg-green-600 hover:bg-green-600 rounded-full shadow-2xl hover:shadow-green-500/40 transition-colors duration-300 active:scale-90 hover:scale-110 group"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
              ¡Escríbenos!
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
