import React, { useState, useEffect } from 'react';
import { INVENTORY, ACCESSORIES, RENTAL_DURATIONS } from '../data/computers';
import { Computer, ExtraAccessory } from '../types';
import { 
  Calculator, Monitor, Keyboard, ShieldAlert, HeartHandshake, CheckCircle2, 
  HelpCircle, Info, Landmark, ArrowRight, Sparkles, AlertCircle, ShoppingBag, ShieldCheck, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RentalCalculatorProps {
  selectedComputerId: string;
  onComputerChange: (id: string) => void;
  onOpenInquiryFormWithSetup: (setup: {
    computerId: string;
    durationMonths: number;
    accessories: string[];
    monthlyTotal: number;
    buyTotal: number;
    mode: 'rental' | 'purchase';
  }) => void;
}

export default function RentalCalculator({ 
  selectedComputerId, 
  onComputerChange,
  onOpenInquiryFormWithSetup 
}: RentalCalculatorProps) {
  
  const [activeComputer, setActiveComputer] = useState<Computer>(INVENTORY[0]);
  const [calcMode, setCalcMode] = useState<'rental' | 'purchase'>('rental');
  const [selectedDuration, setSelectedDuration] = useState(RENTAL_DURATIONS[3]); // Standard 12 Months
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);
  const [customBuildDone, setCustomBuildDone] = useState(false);

  // Sync selected laptop from prop
  useEffect(() => {
    const found = INVENTORY.find(item => item.id === selectedComputerId);
    if (found) {
      setActiveComputer(found);
    }
  }, [selectedComputerId]);

  const handleComputerSelect = (id: string) => {
    const found = INVENTORY.find(item => item.id === id);
    if (found) {
      setActiveComputer(found);
      onComputerChange(id);
    }
  };

  const handleAccessoryToggle = (id: string) => {
    setSelectedAccessories(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const baseRentPrice = activeComputer.rentPrice;
  const factor = selectedDuration.priceFactor;
  const monthlyPCPrice = Math.round(baseRentPrice * factor);
  
  // Sum accessory rentals
  const monthlyAccPrice = ACCESSORIES
    .filter(acc => selectedAccessories.includes(acc.id))
    .reduce((sum, acc) => sum + acc.monthlyRentPrice, 0);

  const finalMonthlyRentTotal = monthlyPCPrice + monthlyAccPrice;
  const totalRentalContractSum = finalMonthlyRentTotal * selectedDuration.durationMonths;

  // Buying Calculations
  const oneTimePCCost = activeComputer.buyPrice;
  const oneTimeAccCost = ACCESSORIES
    .filter(acc => selectedAccessories.includes(acc.id))
    .reduce((sum, acc) => sum + acc.oneTimeBuyPrice, 0);

  const finalPurchaseTotal = oneTimePCCost + oneTimeAccCost;

  // Corporate VAT & Tax writeoff estimation (Spanish general corporate standards)
  const corporateEstimatedTaxBenefit = calcMode === 'rental' 
    ? Math.round(totalRentalContractSum * 0.30) // Renting behaves as fully tax-deductible expenditure
    : Math.round(finalPurchaseTotal * 0.25); // Depreciation savings

  // Map icons
  const getAccIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor':
        return <Monitor className="w-5 h-5 text-blue-400" />;
      case 'Keyboard':
        return <Keyboard className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-emerald-400" />;
      default:
        return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <section id="calculator" className="relative bg-[#090D1A] py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-900 scroll-mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/40 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" /> Simulador de Presupuestos
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            Configura tu Hardware y Descubre el Ahorro
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3">
            Selecciona el ordenador, añade accesorios opcionales y decide el modo que prefieras: comprar o alquilar. Ajusta la duración del renting para ver las tarifas con descuento.
          </p>
        </div>

        {/* Tab Selection (Renting vs Compra) */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-2xl bg-gray-950 border border-gray-800">
            <button
              onClick={() => setCalcMode('rental')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                calcMode === 'rental' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Landmark className="w-4 h-4" /> Alquilar en Renting
            </button>
            <button
              onClick={() => setCalcMode('purchase')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                calcMode === 'purchase' 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Comprar con Pago Único
            </button>
          </div>
        </div>

        {/* Outer Split Pane Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Controls Panel (Left) */}
          <div className="lg:col-span-7 bg-[#0E1424] border border-gray-800/80 rounded-3xl p-6 sm:p-8 space-y-8">
            
            {/* Step 1: Computer selector */}
            <div>
              <label className="block text-xs uppercase font-mono font-bold text-gray-400 tracking-wider mb-3">
                Paso 1: Selecciona el Ordenador Base
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {INVENTORY.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleComputerSelect(item.id)}
                    className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-250 cursor-pointer ${
                      activeComputer.id === item.id 
                        ? 'bg-blue-600/10 border-blue-500 text-white ring-1 ring-blue-500/20' 
                        : 'bg-black/20 border-gray-850 hover:bg-black/30 hover:border-gray-800 text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <span className="font-sans font-bold text-sm text-white">{item.name}</span>
                    <span className="text-[10px] text-gray-500 mt-1 line-clamp-1">{item.tagline}</span>
                    <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-gray-900 w-full text-xs">
                      <span className="font-semibold text-white">
                        {calcMode === 'rental' 
                          ? `${item.rentPrice}€/mes` 
                          : `${item.buyPrice}€ pago único`
                        }
                      </span>
                      <span className="text-[10px] text-gray-600 font-mono">•</span>
                      <span className="text-[10px] text-gray-500 uppercase font-mono">{item.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Renting Schedule selection (Only visible if rental mode is selected) */}
            <AnimatePresence mode="wait">
              {calcMode === 'rental' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <label className="block text-xs uppercase font-mono font-bold text-gray-400 tracking-wider">
                      Paso 2: Periodo de Alquiler y Descuentos
                    </label>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/40 border border-cyan-800/30 px-2 py-0.5 rounded">
                      Cuanto más tiempo, menos pagas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                    {RENTAL_DURATIONS.map((dur) => (
                      <button
                        key={dur.durationMonths}
                        onClick={() => setSelectedDuration(dur)}
                        className={`flex flex-col items-center justify-between p-3.5 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                          selectedDuration.durationMonths === dur.durationMonths
                            ? 'bg-blue-600/10 border-blue-500 text-blue-300'
                            : 'bg-black/20 border-gray-850 hover:bg-black/30 hover:border-gray-800 text-gray-400'
                        }`}
                      >
                        <span className="text-base font-extrabold text-white">{dur.durationMonths} {dur.durationMonths === 1 ? 'Mes' : 'Meses'}</span>
                        <div className="mt-2 text-[10px] leading-tight">
                          {dur.priceFactor > 1 ? (
                            <span className="text-amber-500 font-mono font-medium">+{Math.round((dur.priceFactor - 1) * 100)}% Tarifa</span>
                          ) : dur.priceFactor === 1 ? (
                            <span className="text-gray-500 font-mono">Tarifa Base</span>
                          ) : (
                            <span className="text-emerald-400 font-mono font-semibold">-{Math.round((1 - dur.priceFactor) * 100)}% Dto.</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Pricing feedback paragraph */}
                  <div className="p-3.5 bg-[#111625] border border-gray-800 rounded-xl flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-400 leading-normal">
                      Tu plan seleccionado es: <strong className="text-white">{selectedDuration.label}</strong>. Aplica un factor multiplicador de <strong>{selectedDuration.priceFactor}x</strong> sobre el coste del hardware.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3: Accessories and additions */}
            <div>
              <label className="block text-xs uppercase font-mono font-bold text-gray-400 tracking-wider mb-3">
                Paso {calcMode === 'rental' ? '3' : '2'}: Añade Periféricos y Servicios Extra
              </label>
              
              <div className="space-y-3">
                {ACCESSORIES.map((acc) => {
                  const isSelected = selectedAccessories.includes(acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => handleAccessoryToggle(acc.id)}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                        isSelected 
                          ? 'bg-blue-600/5 border-blue-500/50 text-white' 
                          : 'bg-black/25 border-gray-850 hover:bg-black/10 hover:border-gray-800 text-gray-400'
                      }`}
                    >
                      {/* Left Block */}
                      <div className="flex items-start gap-3.5">
                        <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-blue-900/30 text-blue-300' : 'bg-gray-900 text-gray-500'}`}>
                          {getAccIcon(acc.icon)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white leading-tight">{acc.name}</p>
                          <p className="text-xs text-gray-500 mt-1 max-w-md">{acc.description}</p>
                        </div>
                      </div>

                      {/* Right Block (Prices) */}
                      <div className="sm:text-right mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-850 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
                        <span className="text-[10px] uppercase font-mono text-gray-500 sm:hidden">Coste adicional</span>
                        <div>
                          <span className="font-sans font-extrabold text-base text-white">
                            {calcMode === 'rental' 
                              ? `+${acc.monthlyRentPrice}€` 
                              : `+${acc.oneTimeBuyPrice}€`
                            }
                          </span>
                          <span className="text-xs text-gray-400">
                            {calcMode === 'rental' ? '/Mes' : ' único'}
                          </span>
                        </div>
                        <span className="text-[10px] text-cyan-400 font-mono mt-0.5 block">
                          {isSelected ? '✓ Seleccionado' : '+ Añadir'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Pricing Estimation Detail Widget (Right) */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            <div className="bg-gradient-to-tr from-gray-950 to-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden relative">
              {/* Floating gradient accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="font-sans font-extrabold text-lg text-white pb-4 border-b border-gray-800">
                Resumen de Presupuesto
              </h3>

              {/* Items Breakdown inside estimate card */}
              <div className="py-4 space-y-3 border-b border-gray-800 text-xs">
                
                {/* Hardware item */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-gray-400 font-medium">Equipo seleccionado:</span>
                    <p className="font-bold text-white">{activeComputer.name}</p>
                  </div>
                  <span className="text-gray-200 font-mono">
                    {calcMode === 'rental' 
                      ? `${activeComputer.rentPrice}€/mes` 
                      : `${activeComputer.buyPrice}€`
                    }
                  </span>
                </div>

                {/* Scaling Factor */}
                {calcMode === 'rental' && (
                  <div className="flex justify-between items-center text-gray-400">
                    <span>Ajuste por duración ({selectedDuration.durationMonths}m):</span>
                    <span className="font-mono text-gray-200">{factor.toFixed(2)}x</span>
                  </div>
                )}

                {/* Rent Price after factor */}
                {calcMode === 'rental' && (
                  <div className="flex justify-between items-center pb-2 border-b border-gray-850/60 font-medium text-gray-300">
                    <span>Base Equipo ({selectedDuration.durationMonths}m):</span>
                    <span className="font-mono text-white">{monthlyPCPrice}€/mes</span>
                  </div>
                )}

                {/* Accessories Sum */}
                {selectedAccessories.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <span className="text-gray-400 font-medium">Accesorios seleccionados:</span>
                    {ACCESSORIES.filter(acc => selectedAccessories.includes(acc.id)).map(acc => (
                      <div key={acc.id} className="flex justify-between text-[11px] text-gray-500 pl-2">
                        <span>• {acc.name}</span>
                        <span className="font-mono">
                          {calcMode === 'rental' ? `+${acc.monthlyRentPrice}€/mes` : `+${acc.oneTimeBuyPrice}€`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Final totals */}
              <div className="py-5">
                {calcMode === 'rental' ? (
                  <div className="space-y-4">
                    
                    {/* Monthly Rental sum */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase font-mono text-blue-400 font-semibold tracking-wider">Cuota Total Mensual</span>
                        <p className="text-[10px] text-gray-430">IVA no incluido</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white">
                          {finalMonthlyRentTotal}€
                        </span>
                        <span className="text-sm text-gray-400">/Mes</span>
                      </div>
                    </div>

                    {/* Total overall contract rental value */}
                    <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-850 flex justify-between items-center text-xs">
                      <span className="text-gray-400">Total periodo ({selectedDuration.durationMonths} meses):</span>
                      <strong className="text-white font-mono text-sm">{totalRentalContractSum}€</strong>
                    </div>

                  </div>
                ) : (
                  <div className="space-y-4">
                    
                    {/* One-off Sale calculation */}
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs uppercase font-mono text-emerald-400 font-semibold tracking-wider">Importe Total Compra</span>
                        <p className="text-[10px] text-gray-430">Pago único, impuestos incluidos</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl sm:text-4xl font-extrabold text-[#10B981]">
                          {finalPurchaseTotal}€
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-gray-900/50 border border-gray-850 text-xs text-gray-400">
                      Incluye entrega exprés y <strong>2 años de garantía europea completa</strong> con soporte multicanal.
                    </div>

                  </div>
                )}
              </div>

              {/* Deductions card inside panel */}
              <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/15 text-xs text-blue-300 space-y-2">
                <div className="flex gap-2 items-center font-bold">
                  <Landmark className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Beneficio Fiscal Estimado (Autónomos/Empresas)</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-normal">
                  {calcMode === 'rental' 
                    ? '¿Sabías que el renting es un gasto financiero operativo deducible al 100%? No computa en CIRBE, mejorando el balance contable de tu negocio.' 
                    : 'La amortización contable de ordenadores permite reducir la factura del IRPF/Sociedades de forma lineal a 3 años.'
                  }
                </p>
                <div className="flex justify-between items-center pt-1.5 border-t border-blue-500/10 text-xs">
                  <span>Ahorro fiscal aprox:</span>
                  <strong className="text-emerald-400 font-mono">~{corporateEstimatedTaxBenefit}€</strong>
                </div>
              </div>

              {/* Call to action submitting setup details */}
              <div className="mt-6">
                <button
                  onClick={() => onOpenInquiryFormWithSetup({
                    computerId: activeComputer.id,
                    durationMonths: calcMode === 'rental' ? selectedDuration.durationMonths : 0,
                    accessories: selectedAccessories,
                    monthlyTotal: finalMonthlyRentTotal,
                    buyTotal: finalPurchaseTotal,
                    mode: calcMode
                  })}
                  className={`w-full py-4 px-5 rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-sm uppercase tracking-wider ${
                    calcMode === 'rental' 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/10 hover:shadow-blue-500/15'
                      : 'bg-[#10B981] hover:bg-emerald-500 text-white shadow-emerald-500/10 hover:shadow-emerald-550/15'
                  }`}
                >
                  <span>Solicitar Presupuesto Formal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Guarantees row footer */}
              <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-gray-800 text-[10px] text-gray-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Procesado Seguro SSL</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Respuesta en &lt; 2 horas</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
