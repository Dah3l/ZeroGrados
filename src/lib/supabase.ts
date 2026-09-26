import { createClient } from '@supabase/supabase-js';

// Variables de entorno (se configuran en Cloudflare Pages)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Crear cliente de Supabase
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Verificar si Supabase está configurado
export const isSupabaseConfigured = () => {
  return supabase !== null;
};
