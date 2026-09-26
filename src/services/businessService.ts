import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { BusinessData } from '../context/BusinessContext';

const STORAGE_KEY = 'zero_grados_business_data';

// Datos por defecto
export const defaultBusinessData: BusinessData = {
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

// Mapeo entre campos del contexto y columnas de Supabase
const fieldToColumn: Record<keyof BusinessData, string> = {
  businessName: 'business_name',
  phoneNumber: 'phone_number',
  phoneDisplay: 'phone_display',
  whatsappMessage: 'whatsapp_message',
  schedule: 'schedule',
  scheduleDays: 'schedule_days',
  coverageZone: 'coverage_zone',
  facebookUrl: 'facebook_url',
  instagramUrl: 'instagram_url',
  heroTitle: 'hero_title',
  heroSubtitle: 'hero_subtitle',
  heroDescription: 'hero_description',
  adminPassword: 'admin_password',
};

// Mapeo inverso
const columnToField: Record<string, keyof BusinessData> = Object.fromEntries(
  Object.entries(fieldToColumn).map(([key, value]) => [value, key as keyof BusinessData])
) as Record<string, keyof BusinessData>;

// Convertir datos de Supabase a formato del contexto
function supabaseToBusinessData(row: Record<string, any>): BusinessData {
  const data: Partial<BusinessData> = {};
  
  for (const [column, field] of Object.entries(columnToField)) {
    if (row[column] !== undefined) {
      data[field] = row[column];
    }
  }
  
  return { ...defaultBusinessData, ...data };
}

// Convertir datos del contexto a formato de Supabase
function businessDataToSupabase(data: Partial<BusinessData>): Record<string, any> {
  const row: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };
  
  for (const [field, column] of Object.entries(fieldToColumn)) {
    if (data[field as keyof BusinessData] !== undefined) {
      row[column] = data[field as keyof BusinessData];
    }
  }
  
  return row;
}

// Obtener datos del negocio
export async function fetchBusinessData(): Promise<BusinessData> {
  // Intentar con Supabase primero
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('business_config')
        .select('*')
        .eq('id', 1)
        .single();
      
      if (!error && data) {
        return supabaseToBusinessData(data);
      }
      
      console.warn('Supabase error, falling back to localStorage:', error);
    } catch (error) {
      console.warn('Supabase fetch failed, falling back to localStorage:', error);
    }
  }
  
  // Fallback a localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultBusinessData, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  
  return defaultBusinessData;
}

// Actualizar datos del negocio
export async function updateBusinessData(newData: Partial<BusinessData>): Promise<boolean> {
  // Intentar con Supabase primero
  if (isSupabaseConfigured() && supabase) {
    try {
      const row = businessDataToSupabase(newData);
      
      const { error } = await supabase
        .from('business_config')
        .update(row)
        .eq('id', 1);
      
      if (!error) {
        return true;
      }
      
      console.warn('Supabase update error, falling back to localStorage:', error);
    } catch (error) {
      console.warn('Supabase update failed, falling back to localStorage:', error);
    }
  }
  
  // Fallback a localStorage
  try {
    const current = await fetchBusinessData();
    const updated = { ...current, ...newData };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

// Restablecer datos por defecto
export async function resetBusinessData(): Promise<boolean> {
  // Intentar con Supabase primero
  if (isSupabaseConfigured() && supabase) {
    try {
      const row = businessDataToSupabase(defaultBusinessData);
      
      const { error } = await supabase
        .from('business_config')
        .update(row)
        .eq('id', 1);
      
      if (!error) {
        return true;
      }
      
      console.warn('Supabase reset error, falling back to localStorage:', error);
    } catch (error) {
      console.warn('Supabase reset failed, falling back to localStorage:', error);
    }
  }
  
  // Fallback a localStorage
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error resetting localStorage:', error);
    return false;
  }
}
