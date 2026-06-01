import React, { useState } from 'react';
import { Computer } from '../types';
import { Star, ShieldCheck, HeartHandshake, Eye, Cpu, HardDrive, CpuIcon, Check, Settings, Laptop } from 'lucide-react';
import { motion } from 'motion/react';

interface ComputerCardProps {
  computer: Computer;
  onSelectConfigure: (id: string) => void;
  onInquire: (computerId: string, type: 'rental' | 'purchase') => void;
}

export default function ComputerCard({ computer, onSelectConfigure, onInquire }: ComputerCardProps) {
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  // Category Badge render helper
  const renderCategoryBadge = () => {
    switch (computer.category) {
      case 'gaming':
        return <span className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 text-red-400 font-mono text-[10px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">Gaming Rig</span>;
      case 'pro':
        return <span className="bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-[10px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">Estación Pro</span>;
      case 'portable':
        return <span className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-400 font-mono text-[10px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">Portátil ultrabook</span>;
      case 'office':
        return <span className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider">Oficina / Eco</span>;
    }
  };

  // Icon depending on card structure
  const getSubTitleIcon = () => {
    if (computer.category === 'portable') {
      return <Laptop className="w-12 h-12 text-amber-400 opacity-60" />;
    }
    return <Cpu className="w-12 h-12 text-blue-400 opacity-60" />;
  };

  return (
    <motion.div 
      layout
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="flex flex-col h-full bg-[#0E1424] rounded-2.5xl border border-gray-800/80 hover:border-blue-500/30 overflow-hidden shadow-xl"
    >
      {/* Top Graphic Banner */}
      <div className="relative h-44 bg-gradient-to-b from-[#161D30] to-[#0E1424] p-5 flex flex-col justify-between overflow-hidden border-b border-gray-850">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.12),transparent_60%)]" />
        
        {/* Row 1: Badges */}
        <div className="flex justify-between items-center relative z-10">
          {renderCategoryBadge()}
          <span className="text-[10px] font-mono font-semibold text-gray-400 bg-gray-900/60 px-2 py-1 rounded border border-gray-800">
            Stock: {computer.stock} u.
          </span>
        </div>

        {/* Row 2: Computer Visual Logo Concept */}
        <div className="flex items-center justify-between relative z-10">
          <div>
            <h3 className="font-sans font-extrabold text-xl text-white tracking-tight">{computer.name}</h3>
            <p className="text-xs text-gray-400">{computer.tagline}</p>
          </div>
          {getSubTitleIcon()}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="space-y-6">
          
          {/* Section: Specs Highlights */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-3 bg-gray-950/40 rounded-xl border border-gray-850">
              <span className="block text-[9px] uppercase font-mono text-gray-500 font-bold">Procesador (CPU)</span>
              <span className="text-xs text-gray-300 font-medium line-clamp-2 mt-0.5">{computer.specs.cpu.split('(')[0]}</span>
            </div>
            <div className="p-3 bg-gray-950/40 rounded-xl border border-gray-850">
              <span className="block text-[9px] uppercase font-mono text-gray-500 font-bold">Gracción GPU</span>
              <span className="text-xs text-gray-300 font-medium line-clamp-2 mt-0.5">{computer.specs.gpu.split('(')[0]}</span>
            </div>
            <div className="p-3 bg-gray-950/40 rounded-xl border border-gray-850">
              <span className="block text-[9px] uppercase font-mono text-gray-500 font-bold">Memoria RAM</span>
              <span className="text-xs text-gray-300 font-mono mt-0.5">{computer.specs.ram.split('Corsair')[0].split('Crucial')[0].split('Kingston')[0]}</span>
            </div>
            <div className="p-3 bg-gray-950/40 rounded-xl border border-gray-850">
              <span className="block text-[9px] uppercase font-mono text-gray-500 font-bold">Almacenamiento</span>
              <span className="text-xs text-gray-300 font-mono mt-0.5">{computer.specs.storage.split('(')[0]}</span>
            </div>
          </div>

          {/* Expandable Technical Specs Detail */}
          <div>
            <button
              onClick={() => setShowAllSpecs(!showAllSpecs)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 cursor-pointer select-none transition-colors"
            >
              <Settings className="w-3.5 h-3.5" />
              {showAllSpecs ? 'Ocultar especificaciones detalladas' : 'Ver ficha técnica completa'}
            </button>

            {showAllSpecs && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-3 bg-gray-950/80 border border-gray-850 rounded-xl space-y-2 text-xs text-gray-400"
              >
                <div>
                  <strong className="text-gray-300 font-mono">CPU: </strong> {computer.specs.cpu}
                </div>
                <div>
                  <strong className="text-gray-300 font-mono">GPU: </strong> {computer.specs.gpu}
                </div>
                <div>
                  <strong className="text-gray-300 font-mono">RAM: </strong> {computer.specs.ram}
                </div>
                <div>
                  <strong className="text-gray-300 font-mono">SSD: </strong> {computer.specs.storage}
                </div>
                {computer.specs.screen && (
                  <div>
                    <strong className="text-gray-300 font-mono">Pantalla: </strong> {computer.specs.screen}
                  </div>
                )}
                {computer.specs.powerSupply && (
                  <div>
                    <strong className="text-gray-300 font-mono">Alimentación: </strong> {computer.specs.powerSupply}
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Section: Key Strengths Bullet list */}
          <div className="border-t border-gray-850 pt-4 space-y-2.5">
            {computer.highlights.map((hlt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{hlt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing tag blocks */}
        <div className="mt-8 pt-5 border-t border-gray-850 space-y-4">
          
          {/* Dual pricing display */}
          <div className="grid grid-cols-2 gap-4 divide-x divide-gray-800">
            {/* Rent price display */}
            <div>
              <span className="block text-[10px] uppercase font-mono text-gray-500 font-bold tracking-wider">Alquilar</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-white">{computer.rentPrice}€</span>
                <span className="text-xs text-gray-400">/Mes</span>
              </div>
              <span className="block text-[10pt] text-cyan-400/80 mt-0.5">Contrato min. {computer.rentMinMonths}m</span>
            </div>

            {/* Purchase price display */}
            <div className="pl-4">
              <span className="block text-[10px] uppercase font-mono text-gray-500 font-bold tracking-wider">Comprar</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-extrabold text-[#10B981]">{computer.buyPrice}€</span>
                <span className="text-[10px] text-gray-400 uppercase font-mono">Pago único</span>
              </div>
              <span className="block text-[10pt] text-gray-400 mt-0.5">Soporte 2 años inc.</span>
            </div>
          </div>

          {/* Custom Action Call row */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectConfigure(computer.id)}
              className="px-3 py-3 rounded-xl bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 text-blue-400 hover:text-white font-semibold text-xs text-center transition-all duration-250 cursor-pointer uppercase tracking-wider"
            >
              Configurar Alquiler
            </button>
            <button
              onClick={() => onInquire(computer.id, 'purchase')}
              className="px-3 py-3 rounded-xl bg-[#10B981]/10 hover:bg-[#10B981] border border-[#10B981]/20 hover:border-[#10B981] hover:shadow-lg hover:shadow-emerald-500/10 text-[#10B981] hover:text-white font-semibold text-xs text-center transition-all duration-250 cursor-pointer uppercase tracking-wider"
            >
              Adquirir / Comprar
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
