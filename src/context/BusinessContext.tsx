import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos de datos del negocio
export interface BusinessData {
  // Contacto
  businessName: string;
  phoneNumber: string;
  phoneDisplay: string;
  whatsappMessage: string;
  
  // Ubicación y horario
  schedule: string;
  scheduleDays: string;
  coverageZone: string;
  
  // Redes sociales
  facebookUrl: string;
  instagramUrl: string;
  
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Credenciales admin
  adminPassword: string;
}

// Datos por defecto
const defaultBusinessData: BusinessData = {
  businessName: 'Zero Grados',
  phoneNumber: '5355511093',
  phoneDisplay: '+53 5 5511 0934',
  whatsappMessage: 'Hola, me interesa información sobre los servicios de Zero Grados',
  schedule: '8:00 AM - 6:00 PM',
  scheduleDays: 'Lunes a Sábado',
  coverageZone: 'La Habana y alrededores',
  facebookUrl: '#',
  instagramUrl: '#',
  heroTitle: '¡NO ESPERES AL VERANO!',
  heroSubtitle: '¡TEN TU ESPACIO CLIMATIZADO YA!',
  heroDescription: 'Soluciones integrales para tu hogar y negocio. Mantenimiento, reparación e instalación profesional para que disfrutes del confort en todo momento.',
  adminPassword: 'zero2024',
};

// Clave de localStorage
const STORAGE_KEY = 'zero_grados_business_data';

// Contexto
interface BusinessContextType {
  data: BusinessData;
  updateData: (newData: Partial<BusinessData>) => void;
  resetData: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

// Provider
export function BusinessProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BusinessData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultBusinessData, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Error loading business data:', e);
    }
    return defaultBusinessData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving business data:', e);
    }
  }, [data]);

  const updateData = (newData: Partial<BusinessData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const resetData = () => {
    setData(defaultBusinessData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <BusinessContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </BusinessContext.Provider>
  );
}

// Hook para consumir el contexto
export function useBusiness() {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
}
