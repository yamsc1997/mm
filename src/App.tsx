import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ComputerCard from './components/ComputerCard';
import RentalCalculator from './components/RentalCalculator';
import CompareSection from './components/CompareSection';
import FAQSection from './components/FAQSection';
import InquiryForm from './components/InquiryForm';
import { INVENTORY } from './data/computers';
import { ComputerCategory } from './types';
import { 
  Laptop, ShieldCheck, Mail, Phone, MapPin, Layers, Cpu, Compass, HelpCircle, 
  ArrowUpRight, Heart, Star, Check 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Category Filtering
  const [activeFilter, setActiveFilter] = useState<ComputerCategory | 'all'>('all');
  
  // Selected configuration inside calculator sync
  const [selectedCalcComputerId, setSelectedCalcComputerId] = useState<string>(INVENTORY[0].id);
  
  // Inquiry form modal controllers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentFormSetup, setCurrentFormSetup] = useState<{
    computerId: string;
    durationMonths: number;
    accessories: string[];
    monthlyTotal: number;
    buyTotal: number;
    mode: 'rental' | 'purchase';
  } | null>(null);

  // Smooth scroll handler
  const handleScrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync selection details from computer card straight into calculator scroll
  const handleSelectConfigure = (computerId: string) => {
    setSelectedCalcComputerId(computerId);
    
    // Set default initial details for when they click directly from cards
    setCurrentFormSetup({
      computerId: computerId,
      durationMonths: 12,
      accessories: [],
      monthlyTotal: 0, 
      buyTotal: 0,
      mode: 'rental'
    });

    handleScrollToSection('calculator');
  };

  // Directly triggers reservation request form modal
  const handleDirectInquiry = (computerId: string, type: 'rental' | 'purchase') => {
    const found = INVENTORY.find(item => item.id === computerId);
    if (!found) return;

    setCurrentFormSetup({
      computerId: computerId,
      durationMonths: type === 'rental' ? 12 : 0,
      accessories: [],
      monthlyTotal: type === 'rental' ? found.rentPrice : 0,
      buyTotal: type === 'purchase' ? found.buyPrice : 0,
      mode: type
    });

    setIsFormOpen(true);
  };

  // Triggering from calculator quote submission
  const handleFormWithSetup = (setup: {
    computerId: string;
    durationMonths: number;
    accessories: string[];
    monthlyTotal: number;
    buyTotal: number;
    mode: 'rental' | 'purchase';
  }) => {
    setCurrentFormSetup(setup);
    setIsFormOpen(true);
  };

  // Computes filtered list items
  const filteredComputers = activeFilter === 'all' 
    ? INVENTORY 
    : INVENTORY.filter(item => item.category === activeFilter);

  // Highlight points for the bottom trust badge
  const trustPoints = [
    { title: 'Soporte SLA Premiado', desc: 'Asistencia telefónica y remota prioritaria 24h, sustituciones físicas en 24h laborables.', col: 'border-blue-500/20' },
    { title: 'Ahorro Fiscal Directo', desc: 'Gasto corriente 100% deducible sin inversión inicial, conserva tu liquidez financiera.', col: 'border-cyan-500/20' },
    { title: 'Flexibilidad Anual', desc: 'Upgrade opcional de equipo a los 12 meses. Sin penalizaciones por cambiar a mejor tecnología.', col: 'border-[#10B981]/20' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-200 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Navigation Header */}
      <Header onScrollTo={handleScrollToSection} />

      {/* Hero presentation block */}
      <Hero onScrollTo={handleScrollToSection} />

      {/* Catalog items Section */}
      <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Section title header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-950/40 border border-violet-500/20 text-violet-400 font-mono text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5" /> Equipamiento de Alta Gama
              </div>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
                Dispositivos Disponibles en Inventario
              </h2>
              <p className="text-sm text-gray-400 mt-2 max-w-xl">
                Haz clic en cualquier categoría para filtrar la selección. Disponemos de equipos ensamblados a mano listos para entrega inmediata.
              </p>
            </div>

            {/* Filter buttons tabs layout */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {[
                { label: 'Todos los equipos', id: 'all' },
                { label: 'Gaming Rigs', id: 'gaming' },
                { label: 'Estaciones Pro', id: 'pro' },
                { label: 'Oficina / Eco', id: 'office' },
                { label: 'Portátiles', id: 'portable' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-4.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 select-none cursor-pointer border ${
                    activeFilter === tab.id
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                      : 'bg-[#0E1424] border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of Cards */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredComputers.map((computer) => (
                <motion.div
                  key={computer.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ComputerCard 
                    computer={computer} 
                    onSelectConfigure={handleSelectConfigure}
                    onInquire={handleDirectInquiry}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Corporate Trust Banner Row */}
      <section className="bg-[#090D1A] py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustPoints.map((point, idx) => (
              <div 
                key={idx} 
                className={`p-6 rounded-2xl bg-[#0E1424]/60 border ${point.col} space-y-3`}
              >
                <div className="inline-flex p-2.5 rounded-xl bg-gray-900 text-blue-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-sans font-bold text-white text-base leading-tight">{point.title}</h4>
                <p className="text-xs text-gray-400 leading-normal">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Calculator block */}
      <RentalCalculator 
        selectedComputerId={selectedCalcComputerId}
        onComputerChange={setSelectedCalcComputerId}
        onOpenInquiryFormWithSetup={handleFormWithSetup}
      />

      {/* Informative Side-by-Side comparison section */}
      <CompareSection />

      {/* Expandable FAQs support accordion block */}
      <FAQSection />

      {/* Bottom Contact Bar Banner info */}
      <section className="bg-gradient-to-tr from-[#161D30] to-[#0E1424] py-14 px-4 sm:px-6 lg:px-8 border-b border-gray-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="font-sans font-extrabold text-2xl text-white">¿Hablamos con café virtual de por medio?</h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Nuestra oficina está abierta para que pruebes los ordenadores en persona. También podemos llamarte directamente por teléfono gratis para detallar los planes corporativos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Soporte telefónico: <strong className="text-white">900 839 042 (Gratis)</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Correo corporativo: <strong className="text-white">contacto@pc-elite.es</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Sede Central: <strong className="text-white">Gran Vía 42, Madrid (España)</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-gray-950 py-10 px-4 sm:px-6 lg:px-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand Info */}
          <div className="flex items-center gap-2 text-left">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-gray-300">PC-Elite Hardware S.L.</span>
              <span className="block text-[10px] text-gray-600">Renting Tecnológico & Venta de Estaciones Creativas. CIF B-8392813. El hardware premium que impulsa tus proyectos.</span>
            </div>
          </div>

          {/* Quick link actions */}
          <div className="flex items-center gap-4 text-[11px]">
            <a href="#catalog" className="hover:text-white transition-colors">Catálogo</a>
            <a href="#calculator" className="hover:text-white transition-colors">Simulador</a>
            <a href="#compare" className="hover:text-white transition-colors">Renting vs Compra</a>
            <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
          </div>

          {/* Copyright, zero tech larping */}
          <div>
            <p className="text-center md:text-right font-mono text-[10px] uppercase">
              © {new Date().getFullYear()} PC-Elite SL. Todos los derechos reservados.
            </p>
          </div>

        </div>
      </footer>

      {/* Inquiry Form Modal (Sliding / Glassmorphism) */}
      <InquiryForm 
        isOpen={isFormOpen} 
        initialSetup={currentFormSetup}
        onClose={() => setIsFormOpen(false)}
      />

    </div>
  );
}
