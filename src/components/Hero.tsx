import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, RefreshCw, Calculator, ArrowRight, Activity, Terminal, Cpu } from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#0B0F19] pt-24 pb-20 md:pt-32 md:pb-28 border-b border-gray-900">
      {/* Decorative radial gradients for cyberpunk glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold tracking-wider uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Equipos de Alta Gama • Sin Restricciones
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-white leading-none"
            >
              Estrena ordenador <br />
              como quieras:{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300">
                Compra o Alquila
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed"
            >
              Equípate con lo último de NVIDIA y AMD de inmediato. Ofrecemos venta de hardware garantizada y renting flexible a medida para autónomos, empresas y entusiastas del gaming. Cambia de equipo, prorroga o cómpralo cuando desees.
            </motion.p>

            {/* Quick value badges */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 w-full max-w-lg pt-2"
            >
              {[
                { icon: Shield, text: "Seguro a todo riesgo incluido", col: "text-emerald-400" },
                { icon: RefreshCw, text: "Opción de cambio anual", col: "text-blue-400" },
                { icon: Activity, text: "Mantenimiento proactivo", col: "text-cyan-400" },
                { icon: Terminal, text: "Factura deducible 100%", col: "text-teal-400" }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-900/40 border border-gray-800/40">
                  <div className={`p-1.5 rounded-lg bg-gray-800/80 ${badge.col}`}>
                    <badge.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-gray-300">{badge.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full pt-4"
            >
              <button
                onClick={() => onScrollTo('catalog')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-bold text-base hover:from-blue-500 hover:to-cyan-400 shadow-xl shadow-blue-500/10 hover:shadow-cyan-500/15 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Ver Catálogo de Equipos <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onScrollTo('calculator')}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gray-900 text-gray-200 hover:text-white font-semibold text-base border border-gray-800 hover:border-gray-700 hover:bg-gray-850/80 transition-all duration-300 cursor-pointer"
              >
                <Calculator className="w-4 h-4" /> Configurar Simulador
              </button>
            </motion.div>
          </div>

          {/* Graphical Representation of PC-Elite inside Obsidian Chassis */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-[420px] bg-gradient-to-tr from-gray-950 to-gray-900/90 rounded-2xl border border-gray-800 shadow-2xl p-6 relative overflow-hidden"
            >
              {/* Internal glowing elements simulated */}
              <div className="absolute top-4 right-4 text-[10px] font-mono text-cyan-400/70 border border-cyan-400/20 px-2 py-0.5 rounded bg-cyan-950/30">
                TEMP MONITOR: 42°C
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-800/80 pb-4">
                  <h3 className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">Chasis Pro-Active PC-Elite</h3>
                  <div className="flex gap-2 items-center mt-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
                    <span className="font-mono text-[10px] text-gray-400">SISTEMA ELECTROLUMINISCENTE OPERATIVO</span>
                  </div>
                </div>

                {/* PC parts layout */}
                <div className="relative border border-gray-800 rounded-xl p-4 bg-gray-950/80 flex flex-col gap-3 min-h-[220px] justify-between">
                  {/* CPU Area */}
                  <div className="flex items-center justify-between border-b border-gray-850 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                        <Cpu className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-sans font-bold text-xs text-white">PROCESAMIENTO</p>
                        <p className="text-[10px] text-gray-500">Core i9 / Ryzen High Performance</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-blue-400 font-medium">9.8 pts</span>
                  </div>

                  {/* GPU Cooling Loop */}
                  <div className="relative border border-cyan-500/20 rounded-lg p-2.5 bg-cyan-500/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                        <span className="font-mono text-[11px] font-bold text-white uppercase">RTX Geforce Extreme</span>
                      </div>
                      <span className="font-mono text-[10px] text-cyan-400">LIQUID ACTIVE</span>
                    </div>
                    <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden mt-1.5">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-11/12 animate-pulse" />
                    </div>
                  </div>

                  {/* Memory Channels */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 border border-blue-500/10 rounded bg-gray-900/60 leading-tight">
                      <p className="text-gray-500 uppercase">DDR5 RAM</p>
                      <p className="text-white font-mono font-bold">64GB CL30 Active</p>
                    </div>
                    <div className="p-2 border border-blue-500/10 rounded bg-gray-900/60 leading-tight">
                      <p className="text-gray-500 uppercase">NVMe STORAGE</p>
                      <p className="text-white font-mono font-bold">PCIe Gen 4 7kMB/s</p>
                    </div>
                  </div>
                </div>

                {/* Simulated rent tag value */}
                <div className="bg-[#111A2E]/50 border border-blue-500/25 rounded-xl p-3 flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-gray-400">Renting desde</span>
                    <span className="font-sans text-xl font-extrabold text-white">19€<span className="text-xs font-normal text-gray-400">/Mes</span></span>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-mono text-right text-gray-400">Precio compra desde</span>
                    <span className="font-sans text-sm font-semibold text-blue-400">489€ pago único</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
