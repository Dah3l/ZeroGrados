# Zero Grados - Panel de Administración con Supabase

## 🚀 Configuración de Base de Datos Compartida

Para que los cambios del panel de administración sean visibles en **todos los dispositivos**, necesitas configurar Supabase.

### Paso 1: Crear cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto

### Paso 2: Crear la tabla de configuración

En el **SQL Editor** de Supabase, ejecuta este script:

```sql
-- Crear tabla de configuración del negocio
CREATE TABLE business_config (
  id SERIAL PRIMARY KEY,
  business_name TEXT NOT NULL DEFAULT 'Zero Grados',
  phone_number TEXT NOT NULL DEFAULT '5355511093',
  phone_display TEXT NOT NULL DEFAULT '+53 5 5511 0934',
  whatsapp_message TEXT NOT NULL DEFAULT 'Hola, me interesa información sobre los servicios de Zero Grados',
  schedule TEXT NOT NULL DEFAULT '8:00 AM - 6:00 PM',
  schedule_days TEXT NOT NULL DEFAULT 'Lunes a Sábado',
  coverage_zone TEXT NOT NULL DEFAULT 'La Habana y alrededores',
  facebook_url TEXT NOT NULL DEFAULT '#',
  instagram_url TEXT NOT NULL DEFAULT '#',
  hero_title TEXT NOT NULL DEFAULT '¡NO ESPERES AL VERANO!',
  hero_subtitle TEXT NOT NULL DEFAULT '¡TEN TU ESPACIO CLIMATIZADO YA!',
  hero_description TEXT NOT NULL DEFAULT 'Soluciones integrales para tu hogar y negocio. Mantenimiento, reparación e instalación profesional para que disfrutes del confort en todo momento.',
  admin_password TEXT NOT NULL DEFAULT 'zero2024',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar configuración inicial
INSERT INTO business_config DEFAULT VALUES;

-- Habilitar Row Level Security
ALTER TABLE business_config ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública
CREATE POLICY "Permitir lectura pública" ON business_config
  FOR SELECT
  USING (true);

-- Política para permitir escritura pública (puedes hacerla más restrictiva)
CREATE POLICY "Permitir escritura pública" ON business_config
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### Paso 3: Obtener las credenciales

1. En Supabase, ve a **Settings** → **API**
2. Copia:
   - **Project URL** (ejemplo: `https://abcdefg.supabase.co`)
   - **anon public key** (una cadena larga)

### Paso 4: Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Paso 5: Configurar en Cloudflare Pages

1. Ve a tu proyecto en Cloudflare Pages
2. **Settings** → **Environment variables**
3. Agrega las mismas variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy

---

## 📝 Cómo funciona

- **Sin Supabase**: Los cambios solo se guardan en `localStorage` (visibles solo en ese dispositivo)
- **Con Supabase**: Los cambios se sincronizan en la nube (visibles en todos los dispositivos)

El sistema detecta automáticamente si Supabase está configurado y usa la opción apropiada.

---

## 🔐 Seguridad

Para mayor seguridad en producción, considera:

1. **Restringir las políticas de escritura** en Supabase para solo permitir actualizaciones autenticadas
2. **Usar Supabase Auth** para manejar el login del administrador
3. **No exponer el admin_password** en la base de datos, usar autenticación real

---

## 🛠️ Desarrollo local

```bash
# Instalar dependencias
npm install

# Crear archivo .env con tus credenciales
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
