import React, { useState, useEffect } from 'react';
import { InquiryFormData, Computer, ExtraAccessory } from '../types';
import { INVENTORY, ACCESSORIES } from '../data/computers';
import { 
  X, Check, ClipboardCopy, Send, Sparkles, Building2, User, Phone, 
  Mail, MessageSquare, AlertCircle, Calendar, Shield, ArrowRight, Download, Printer, CircleCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InquiryFormProps {
  initialSetup?: {
    computerId: string;
    durationMonths: number;
    accessories: string[];
    monthlyTotal: number;
    buyTotal: number;
    mode: 'rental' | 'purchase';
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryForm({ initialSetup, isOpen, onClose }: InquiryFormProps) {
  
  const [selectedComp, setSelectedComp] = useState<Computer>(INVENTORY[0]);
  const [mode, setMode] = useState<'rental' | 'purchase'>('rental');
  const [duration, setDuration] = useState<number>(12);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedAccs, setSelectedAccs] = useState<string[]>([]);
  
  // Form values
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isCompany, setIsCompany] = useState(false);
  const [message, setMessage] = useState('');
  const [ticketId, setTicketId] = useState('');

  // Sync initial setup details when they come from the calculator
  useEffect(() => {
    if (initialSetup) {
      const copyVal = INVENTORY.find(c => c.id === initialSetup.computerId);
      if (copyVal) {
        setSelectedComp(copyVal);
      }
      setMode(initialSetup.mode);
      setDuration(initialSetup.durationMonths || 12);
      setSelectedAccs(initialSetup.accessories || []);
    }
  }, [initialSetup]);

  if (!isOpen) return null;

  // Manual configuration sum
  const basePrice = mode === 'rental' ? selectedComp.rentPrice : selectedComp.buyPrice;
  
  // Calculate price dynamically in form in case they change the computer inside the form
  const rawMonths = duration || 12;
  const priceFactor = rawMonths === 1 ? 1.35 : rawMonths === 3 ? 1.20 : rawMonths === 6 ? 1.10 : rawMonths === 12 ? 1.00 : 0.85;
  const calculatedPCMonthly = Math.round(selectedComp.rentPrice * priceFactor);
  
  const selectedAccDetails = ACCESSORIES.filter(acc => selectedAccs.includes(acc.id));
  
  const calculatedAccMonthly = selectedAccDetails.reduce((sum, acc) => sum + acc.monthlyRentPrice, 0);
  const calculatedAccPurchase = selectedAccDetails.reduce((sum, acc) => sum + acc.oneTimeBuyPrice, 0);

  const finalMonthlyRent = calculatedPCMonthly + calculatedAccMonthly;
  const finalPurchaseCost = selectedComp.buyPrice + calculatedAccPurchase;

  const handleToggleAcc = (id: string) => {
    setSelectedAccs(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  };

  const handleValidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Por favor, introduce tu nombre.';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Introduce un email válido.';
    if (!phone.trim() || phone.length < 9) newErrors.phone = 'Introduce un teléfono de contacto válido (mínimo 9 dígitos).';
    if (isCompany && !companyName.trim()) newErrors.companyName = 'Por favor, introduce el nombre o razón social de la empresa.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Simulate database write with typical network offset
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Generate a formal reference code
      setTicketId(`EST-${Math.floor(100000 + Math.random() * 900000)}-EX`);
    }, 1250);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setIsCompany(false);
    setCompanyName('');
    setMessage('');
    setSelectedAccs([]);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-3xl bg-[#0E1424] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        
        {/* Absolute header bar */}
        <div className="bg-gray-950/70 py-4 px-6 border-b border-gray-850 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="font-sans font-extrabold text-[#F3F4F6] text-base">
              {submitted ? 'Presupuesto Generado Correctamente' : 'Solicitud de Presupuesto Técnico'}
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                onSubmit={handleValidateSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Intro advice banner */}
                <div className="p-3.5 bg-blue-950/30 border border-blue-500/15 rounded-xl text-xs text-blue-300 leading-normal">
                  Estás tramitando un presupuesto formal personalizado para el equipo <strong className="text-white">{selectedComp.name}</strong> en modalidad de <strong>{mode === 'rental' ? `Alquiler (renting a ${duration} meses)` : 'Compra Directa'}</strong>. No te cobraremos nada ahora: te enviaremos una propuesta formal en PDF para tu firma.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* LEFT SECTION: Configuration recap */}
                  <div className="space-y-5 bg-black/20 p-5 rounded-2xl border border-gray-850/60">
                    <h4 className="font-sans font-bold text-sm text-white border-b border-gray-800 pb-2">Tu Configuración Seleccionada</h4>
                    
                    <div className="space-y-3 text-xs text-gray-300">
                      <div>
                        <span className="text-gray-500">Ordenador Base:</span>
                        <p className="font-bold text-white text-sm mt-0.5">{selectedComp.name}</p>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{selectedComp.tagline}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-gray-850">
                        <div>
                          <span className="text-gray-500">Modalidad:</span>
                          <span className={`block font-bold mt-0.5 ${mode === 'rental' ? 'text-blue-400' : 'text-emerald-400'}`}>
                            {mode === 'rental' ? 'Alquiler (Renting)' : 'Compra Directa'}
                          </span>
                        </div>
                        {mode === 'rental' && (
                          <div>
                            <span className="text-gray-500">Duración:</span>
                            <span className="block font-bold text-white mt-0.5">{duration} meses</span>
                          </div>
                        )}
                      </div>

                      {/* Display Selected Extras */}
                      {selectedAccs.length > 0 && (
                        <div className="pt-2.5 border-t border-gray-850">
                          <span className="text-gray-500 font-medium">Extras incluidos:</span>
                          <ul className="mt-1 space-y-1">
                            {selectedAccDetails.map(acc => (
                              <li key={acc.id} className="text-[11px] text-gray-400 flex justify-between items-center">
                                <span>• {acc.name}</span>
                                <span className="text-white font-mono font-medium">
                                  {mode === 'rental' ? `+${acc.monthlyRentPrice}€/mes` : `+${acc.oneTimeBuyPrice}€`}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Estimated values */}
                      <div className="pt-3.5 border-t border-gray-800 flex justify-between items-center text-sm font-bold bg-[#141C30]/40 p-2.5 rounded-xl border border-blue-500/10">
                        <span className="text-gray-300">Total Estimado:</span>
                        <span className="text-white font-mono">
                          {mode === 'rental' 
                            ? <span className="text-xl font-extrabold text-blue-400">{finalMonthlyRent}€<span className="text-xs font-normal">/mes</span></span>
                            : <span className="text-xl font-extrabold text-[#10B981]">{finalPurchaseCost}€</span>
                          }
                        </span>
                      </div>
                    </div>

                    {/* Change options triggers directly in form */}
                    <div className="space-y-2.5 pt-1">
                      <span className="block text-[10px] uppercase font-mono text-gray-500">Modificar Modelo Base</span>
                      <select 
                        value={selectedComp.id}
                        onChange={(e) => {
                          const found = INVENTORY.find(c => c.id === e.target.value);
                          if (found) setSelectedComp(found);
                        }}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {INVENTORY.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* RIGHT SECTION: Form details */}
                  <div className="space-y-4">
                    <h4 className="font-sans font-bold text-sm text-white border-b border-gray-800 pb-2">Información del Cliente</h4>
                    
                    {/* Full name input */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-400" /> Nombre Completo y Apellidos <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej. Carlos Mendoza Gil"
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      {errors.fullName && <p className="text-[10px] text-red-400 mt-0.5">{errors.fullName}</p>}
                    </div>

                    {/* Email and Phone group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-blue-400" /> Email de Contacto <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ejemplo@correo.com"
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        {errors.email && <p className="text-[10px] text-red-400 mt-0.5">{errors.email}</p>}
                      </div>

                      {/* Phone input */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-blue-400" /> Teléfono Móvil <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="600 000 000"
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        {errors.phone && <p className="text-[10px] text-red-400 mt-0.5">{errors.phone}</p>}
                      </div>

                    </div>

                    {/* Autonomo Checkbox */}
                    <div className="pt-2">
                      <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={isCompany}
                          onChange={(e) => setIsCompany(e.target.checked)}
                          className="w-4 h-4 rounded border-gray-800 text-blue-500 bg-gray-950 focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-xs text-gray-300 font-medium flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-gray-400" /> Solicito como Autónomo, Empresa o Entidad
                        </span>
                      </label>
                    </div>

                    {/* Conditional Company input */}
                    {isCompany && (
                      <motion.div 
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1.5 pt-1"
                      >
                        <label className="text-xs text-gray-400 font-medium">Razón Social de la Empresa (o CIF) <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Ej. Suministros Tecnológicos SL, o CIF B83..."
                          className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        {errors.companyName && <p className="text-[10px] text-red-400 mt-0.5">{errors.companyName}</p>}
                      </motion.div>
                    )}

                    {/* Custom Message comment */}
                    <div className="space-y-1.5">
                      <label className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-gray-400" /> Comentarios o Requisitos Especiales (Opcional)
                      </label>
                      <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="ej. necesito una distribución de teclado americana, o preinstalar Ubuntu LTS en lugar de Windows."
                        rows={3}
                        className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>

                  </div>

                </div>

                {/* Terms Acceptance note & submit buttons */}
                <div className="pt-4 border-t border-gray-850 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 text-left">
                    <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Tus datos están protegidos bajo Reglamento General de Protección de Datos (RGPD) europeo.</span>
                  </div>

                  <div className="flex gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-3 rounded-xl border border-gray-800 text-gray-400 hover:text-white font-medium text-xs text-center transition-colors hover:bg-gray-850 cursor-pointer w-full sm:w-auto"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-500/10 hover:shadow-blue-500/25 transition-all cursor-pointer w-full sm:w-auto hover:from-blue-500 hover:to-indigo-500"
                    >
                      {submitting ? (
                        <>
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Procesando...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Solicitar Propuesta</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.form>
            ) : (
              // SUBMITTED TICKETING VIEW
              <motion.div 
                key="submitted"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 py-4"
              >
                
                {/* Success icon & ticket heading */}
                <div className="text-center space-y-3">
                  <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CircleCheck className="w-12 h-12 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-sans font-extrabold text-white text-xl">¡Solicitud Procesada Correctamente!</h4>
                    <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                      Hemos recibido tu configuración y generado tu presupuesto comercial pre-aprobado. Te hemos enviado una copia en formato digital firmado a <span className="text-gray-200 font-semibold">{email}</span>.
                    </p>
                  </div>
                </div>

                {/* Printable Receipt Block */}
                <div id="printable-receipt" className="bg-gray-950 border border-gray-850 rounded-2xl p-6 space-y-4 text-xs select-text">
                  
                  {/* Receipt Header details */}
                  <div className="flex justify-between items-start pb-4 border-b border-gray-850">
                    <div>
                      <span className="block text-[9px] uppercase font-mono tracking-widest text-blue-400 font-semibold">PRESUPUESTO COMERCIAL</span>
                      <strong className="text-white text-base font-mono mt-0.5 block">{ticketId}</strong>
                      <span className="text-gray-500 font-mono block mt-1">Fecha: {new Date().toLocaleDateString('es-ES')}</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-white text-sm">PC-Elite Hardware S.L.</span>
                      <span className="text-gray-500 block">Soporte Corporativo Integral</span>
                      <span className="text-gray-500 block">C/ Gran Vía 42, Madrid (España)</span>
                    </div>
                  </div>

                  {/* Customer Information recap */}
                  <div>
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-2">Información de Facturación</span>
                    <div className="grid grid-cols-2 gap-4 text-gray-300">
                      <div>
                        <span className="text-gray-500 block">Cliente:</span>
                        <span className="font-bold text-white block">{fullName}</span>
                        {isCompany && <span className="text-gray-400">{companyName}</span>}
                      </div>
                      <div>
                        <span className="text-gray-500 block">Contacto:</span>
                        <span className="block">{phone}</span>
                        <span className="block">{email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing table block */}
                  <div className="border-t border-gray-850 pt-4">
                    <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block mb-1.5">Ficha Desglosada</span>
                    
                    <div className="space-y-2 text-gray-300 pr-1">
                      
                      {/* Product Base Row */}
                      <div className="flex justify-between items-center">
                        <div>
                          <strong>{selectedComp.name}</strong>
                          <span className="text-gray-500 block text-[11px]">{selectedComp.tagline}</span>
                        </div>
                        <span className="font-mono text-white">
                          {mode === 'rental' 
                            ? `${basePrice}€ / mes` 
                            : `${basePrice}€ payment`
                          }
                        </span>
                      </div>

                      {/* Factor pricing Adjustment row if rental */}
                      {mode === 'rental' && (
                        <div className="flex justify-between text-[11px] text-gray-400 pl-2">
                          <span>Ajuste precio duración contratada ({duration} meses)</span>
                          <span className="font-mono text-gray-300">{priceFactor.toFixed(2)}x factor ({calculatedPCMonthly}€/mes)</span>
                        </div>
                      )}

                      {/* Accessories breakdown list inside receipt block */}
                      {selectedAccDetails.length > 0 && selectedAccDetails.map(acc => (
                        <div key={acc.id} className="flex justify-between text-[11px] text-gray-400 pl-2">
                          <span>Añadido: {acc.name}</span>
                          <span className="font-mono text-gray-300">
                            {mode === 'rental' ? `+${acc.monthlyRentPrice}€ / mes` : `+${acc.oneTimeBuyPrice}€`}
                          </span>
                        </div>
                      ))}

                    </div>
                  </div>

                  {/* Overall Total and Tax terms receipt row */}
                  <div className="pt-4 border-t border-gray-850 flex justify-between items-center text-sm font-bold bg-[#141C30]/20 p-3 rounded-xl border border-gray-850">
                    <div>
                      <span className="text-gray-400 font-semibold">Total Presupuestado:</span>
                      <p className="text-[10px] text-gray-500 font-normal">Sujeto a verificación financiera en renting</p>
                    </div>
                    <div className="text-right">
                      {mode === 'rental' ? (
                        <div>
                          <span className="text-xl font-extrabold text-[#3B82F6]">
                            {finalMonthlyRent}€
                          </span>
                          <span className="text-xs text-gray-400 font-medium"> / Mes + IVA</span>
                          <span className="block text-[11px] text-gray-500 font-mono font-normal">Contrato {duration} meses</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-xl font-extrabold text-[#10B981]">
                            {finalPurchaseCost}€
                          </span>
                          <span className="text-xs text-gray-400 font-medium font-normal"> (Impuestos Inc.)</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Instructions SLA footer */}
                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/10 text-xs text-gray-300 space-y-1.5">
                  <strong className="text-white">¿Cuál es el siguiente paso?</strong>
                  <p className="leading-relaxed text-gray-400">
                    Un asesor especializado de nuestro equipo comercial revisará tus datos e iniciará el proceso de aprobación rápido. Nos pondremos en contacto contigo por teléfono o email en menos de <strong className="text-white">2 horas laborables</strong> para explicarte el envío.
                  </p>
                </div>

                {/* Custom Action row triggers native print frame */}
                <div className="flex flex-col sm:flex-row gap-2 w-full justify-end pt-2 border-t border-gray-850">
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2.5 rounded-xl border border-gray-800 hover:bg-gray-850 text-gray-400 hover:text-white text-xs font-semibold select-none cursor-pointer text-center"
                  >
                    Calcular un nuevo presupuesto
                  </button>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-750 text-white font-semibold text-xs select-none cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Presupuesto</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold select-none cursor-pointer text-center"
                  >
                    Cerrar Guardando
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  );
}
