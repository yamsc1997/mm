import React, { useState } from 'react';
import { Cpu, Menu, X, Landmark, FileText } from 'lucide-react';

interface HeaderProps {
  onScrollTo: (elementId: string) => void;
}

export default function Header({ onScrollTo }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Equipos', id: 'catalog' },
    { label: 'Simulador Renting', id: 'calculator' },
    { label: 'Comprar vs Alquilar', id: 'compare' },
    { label: 'Preguntas Frecuentes', id: 'faqs' },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0B0F19]/80 border-b border-gray-850/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('hero')}
          >
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform duration-300">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="font-sans font-bold text-xl tracking-tight text-white bg-clip-text">
                PC-ELITE
              </span>
              <span className="block text-[10px] uppercase font-mono tracking-widest text-[#10B981] font-semibold">
                Hardware & Renting
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-gray-300 hover:text-white font-medium text-sm transition-colors duration-200 cursor-pointer relative py-2 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Action Call for custom budgets */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('calculator')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-700 text-white font-semibold text-sm hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-500/20 active:translate-y-0.5 transition-all duration-250 cursor-pointer"
            >
              Calcular Cuota
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0F1424] border-b border-gray-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="block w-full text-left py-3 px-4 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/40 text-base font-medium transition-colors"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 px-4">
            <button
              onClick={() => handleNavClick('calculator')}
              className="block w-full text-center py-3 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              Calcular Cuota Ahora
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
