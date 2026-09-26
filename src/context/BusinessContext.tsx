import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchBusinessData, updateBusinessData, resetBusinessData, defaultBusinessData } from '../services/businessService';

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

// Contexto
interface BusinessContextType {
  data: BusinessData;
  updateData: (newData: Partial<BusinessData>) => Promise<boolean>;
  resetData: () => Promise<boolean>;
  isLoading: boolean;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

// Provider
export function BusinessProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<BusinessData>(defaultBusinessData);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    const loadData = async () => {
      try {
        const loadedData = await fetchBusinessData();
        setData(loadedData);
      } catch (error) {
        console.error('Error loading business data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const updateData = async (newData: Partial<BusinessData>): Promise<boolean> => {
    const success = await updateBusinessData(newData);
    if (success) {
      setData(prev => ({ ...prev, ...newData }));
    }
    return success;
  };

  const resetData = async (): Promise<boolean> => {
    const success = await resetBusinessData();
    if (success) {
      setData(defaultBusinessData);
    }
    return success;
  };

  return (
    <BusinessContext.Provider value={{ data, updateData, resetData, isLoading }}>
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
