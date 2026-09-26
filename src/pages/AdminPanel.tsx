import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  LogOut,
  Save,
  RotateCcw,
  Check,
  Phone,
  Clock,
  MapPin,
  Share2,
  Type,
  Key,
  AlertTriangle,
  Cloud,
  HardDrive,
} from 'lucide-react';
import { useBusiness, BusinessData } from '../context/BusinessContext';
import { isSupabaseConfigured } from '../lib/supabase';

interface AdminPanelProps {
  onBack: () => void;
  onLogout: () => void;
}

type TabId = 'contact' | 'schedule' | 'social' | 'hero' | 'security';

interface Tab {
  id: TabId;
  name: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 'contact', name: 'Contacto', icon: <Phone className="w-4 h-4" /> },
  { id: 'schedule', name: 'Horario', icon: <Clock className="w-4 h-4" /> },
  { id: 'social', name: 'Redes', icon: <Share2 className="w-4 h-4" /> },
  { id: 'hero', name: 'Inicio', icon: <Type className="w-4 h-4" /> },
  { id: 'security', name: 'Seguridad', icon: <Key className="w-4 h-4" /> },
];

export default function AdminPanel({ onBack, onLogout }: AdminPanelProps) {
  const { data, updateData, resetData } = useBusiness();
  const [activeTab, setActiveTab] = useState<TabId>('contact');
  const [formData, setFormData] = useState<BusinessData>(data);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleFieldChange = (field: keyof BusinessData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const success = await updateData(formData);
    if (success) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } else {
      alert('Error al guardar los cambios. Por favor, intenta de nuevo.');
    }
  };

  const handleReset = async () => {
    const success = await resetData();
    if (success) {
      setFormData(data);
      setShowResetConfirm(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } else {
      alert('Error al restablecer los datos. Por favor, intenta de nuevo.');
    }
  };

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(data);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Volver al sitio"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ZG</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-bold text-gray-900">Panel de Administración</h1>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500">{data.businessName}</p>
                    {isSupabaseConfigured() ? (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        <Cloud className="w-3 h-3" />
                        Nube
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full">
                        <HardDrive className="w-3 h-3" />
                        Local
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AnimatePresence>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Guardado</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {hasChanges && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleSave}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors active:scale-95"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </motion.button>
              )}

              <button
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Cerrar sesión"
                title="Cerrar sesión"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar Tabs */}
          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'contact' && (
                  <ContactTab formData={formData} onChange={handleFieldChange} />
                )}
                {activeTab === 'schedule' && (
                  <ScheduleTab formData={formData} onChange={handleFieldChange} />
                )}
                {activeTab === 'social' && (
                  <SocialTab formData={formData} onChange={handleFieldChange} />
                )}
                {activeTab === 'hero' && (
                  <HeroTab formData={formData} onChange={handleFieldChange} />
                )}
                {activeTab === 'security' && (
                  <SecurityTab
                    formData={formData}
                    onChange={handleFieldChange}
                    onReset={() => setShowResetConfirm(true)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">¿Restablecer todo?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Esta acción restaurará todos los datos a sus valores por defecto. No se puede deshacer.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Restablecer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ TABS ============

interface TabProps {
  formData: BusinessData;
  onChange: (field: keyof BusinessData, value: string) => void;
}

function ContactTab({ formData, onChange }: TabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Información de Contacto</h2>
        <p className="text-sm text-gray-600">Configura el teléfono y nombre del negocio.</p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Nombre del negocio"
          value={formData.businessName}
          onChange={(v) => onChange('businessName', v)}
          placeholder="Zero Grados"
        />
        <InputField
          label="Número de WhatsApp (solo dígitos)"
          value={formData.phoneNumber}
          onChange={(v) => onChange('phoneNumber', v)}
          placeholder="5355511093"
          helper="Sin espacios, guiones ni el símbolo +"
        />
        <InputField
          label="Número visible"
          value={formData.phoneDisplay}
          onChange={(v) => onChange('phoneDisplay', v)}
          placeholder="+53 5 5511 0934"
          helper="Así se mostrará en la web"
        />
        <InputField
          label="Mensaje predeterminado de WhatsApp"
          value={formData.whatsappMessage}
          onChange={(v) => onChange('whatsappMessage', v)}
          placeholder="Hola, me interesa..."
          helper="Mensaje que se envía al tocar el botón"
          multiline
        />
      </div>
    </div>
  );
}

function ScheduleTab({ formData, onChange }: TabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Horario y Cobertura</h2>
        <p className="text-sm text-gray-600">Define tu horario de atención y zona de servicio.</p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Días de atención"
          value={formData.scheduleDays}
          onChange={(v) => onChange('scheduleDays', v)}
          placeholder="Lunes a Sábado"
          icon={<Clock className="w-4 h-4" />}
        />
        <InputField
          label="Horario"
          value={formData.schedule}
          onChange={(v) => onChange('schedule', v)}
          placeholder="8:00 AM - 6:00 PM"
          icon={<Clock className="w-4 h-4" />}
        />
        <InputField
          label="Zona de cobertura"
          value={formData.coverageZone}
          onChange={(v) => onChange('coverageZone', v)}
          placeholder="La Habana y alrededores"
          icon={<MapPin className="w-4 h-4" />}
        />
      </div>
    </div>
  );
}

function SocialTab({ formData, onChange }: TabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Redes Sociales</h2>
        <p className="text-sm text-gray-600">Agrega los enlaces a tus perfiles.</p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Facebook"
          value={formData.facebookUrl}
          onChange={(v) => onChange('facebookUrl', v)}
          placeholder="https://facebook.com/tu-pagina"
          icon={<i className="fab fa-facebook-f text-sm" />}
        />
        <InputField
          label="Instagram"
          value={formData.instagramUrl}
          onChange={(v) => onChange('instagramUrl', v)}
          placeholder="https://instagram.com/tu-perfil"
          icon={<i className="fab fa-instagram text-sm" />}
        />

        <div className="p-4 bg-blue-50 rounded-xl">
          <p className="text-xs text-blue-700">
            💡 Deja el campo vacío o con <code className="bg-white px-1.5 py-0.5 rounded">#</code> si no tienes esa red social.
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroTab({ formData, onChange }: TabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Sección de Inicio</h2>
        <p className="text-sm text-gray-600">Personaliza los textos principales de tu web.</p>
      </div>

      <div className="space-y-4">
        <InputField
          label="Título principal"
          value={formData.heroTitle}
          onChange={(v) => onChange('heroTitle', v)}
          placeholder="¡NO ESPERES AL VERANO!"
        />
        <InputField
          label="Subtítulo"
          value={formData.heroSubtitle}
          onChange={(v) => onChange('heroSubtitle', v)}
          placeholder="¡TEN TU ESPACIO CLIMATIZADO YA!"
        />
        <InputField
          label="Descripción"
          value={formData.heroDescription}
          onChange={(v) => onChange('heroDescription', v)}
          placeholder="Soluciones integrales para tu hogar..."
          multiline
        />

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-xs text-amber-800">
            ⚠️ Los textos largos pueden afectar el diseño en móviles. Mantén los títulos cortos y directos.
          </p>
        </div>
      </div>
    </div>
  );
}

function SecurityTab({ formData, onChange, onReset }: TabProps & { onReset: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Seguridad</h2>
        <p className="text-sm text-gray-600">Cambia tu contraseña de acceso al panel.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contraseña de administrador
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.adminPassword}
              onChange={(e) => onChange('adminPassword', e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Nueva contraseña"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Esta contraseña se usa para acceder a este panel de administración.
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Zona peligrosa</h3>
          <p className="text-xs text-gray-600 mb-4">
            Restablecer todos los datos a los valores por defecto.
          </p>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Restablecer todos los datos
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ INPUT FIELD COMPONENT ============

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helper?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  helper,
  icon,
  multiline,
}: InputFieldProps) {
  const inputClasses = `w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
    icon ? 'pl-10' : ''
  }`;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className={`${inputClasses} resize-none`}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={inputClasses}
          />
        )}
      </div>
      {helper && <p className="mt-1.5 text-xs text-gray-500">{helper}</p>}
    </div>
  );
}
