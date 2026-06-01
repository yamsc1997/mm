import React from 'react';
import { motion } from 'motion/react';
import { 
  Building, User, Shield, RefreshCw, Landmark, ShoppingCart, Key, Sparkles, Check, ChevronRight 
} from 'lucide-react';

export default function CompareSection() {
  return (
    <section id="compare" className="relative bg-[#0B0F19] py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-900 scroll-mt-20">
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-cyan-900/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/45 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Pros y Contras del Hardware
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            ¿Es mejor Comprar o Alquilar en Renting?
          </h2>
          <p className="text-sm sm:text-base text-gray-400 mt-3">
            Tanto la compra tradicional como el alquiler operativo tienen ventajas. Entiende cuál es la mejor estrategia financiera para tu situación personal o corporativa.
          </p>
        </div>

        {/* Info Cards Row (Target: Freelancer/Companies and Gamers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          {/* Card: Renting (Ideal for Businesses and Freelancer) */}
          <div className="bg-[#0E1424] border border-blue-500/15 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sans font-extrabold text-lg text-white">Renting Operativo Flexible</h3>
                <p className="text-xs text-blue-400 font-mono">IDEAL PARA AUTÓNOMOS, PYMES Y GAMERS CONSTANTES</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 leading-normal">
              Evita la descapitalización masiva y mantén el flujo de caja. Consiste en un alquiler con una cómoda cuota mensual fija deducible del IRPF o Impuesto de Sociedades. Lo mejor: puedes solicitar upgrades o renovar de equipo anualmente para estar siempre a la vanguardia.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                'Mantenimiento técnico preventivo anual gratis.',
                'Seguro integral contra fallos fortuitos, caídas de líquido y robos.',
                'Sustitución exprés del ordenador en menos de 24 horas si falla.',
                'La cuota mensual computa como gasto operativo (no endeuda tu CIRBE).'
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card: Buying (Ideal for long term single device) */}
          <div className="bg-[#0E1424] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sans font-extrabold text-lg text-white">Compra Tradicional Directa</h3>
                <p className="text-xs text-[#10B981] font-mono">IDEAL PARA QUIEN TIENE LIQUIDEZ Y NO QUIERE CUOTAS</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-normal">
              Adquiere la propiedad total del equipo desde el minuto uno. Realizas un desembolso inicial integral y el ordenador pasa a formar parte de tu activo permanente. Adecuado si pretendes usar exactamente el mismo hardware durante más de 3 o 4 años sin cambiarlo.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                'Propiedad jurídica absoluta e indefinida del ordenador.',
                'Garantía oficial del fabricante de 2 a 3 años según legislación.',
                'Posibilidad de realizar modificaciones físicas completas bajo tu responsabilidad.',
                'Sin contratos periódicos ni de permanencia mínima obligatoria.'
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Head-to-Head Table */}
        <div className="overflow-x-auto rounded-2xl border border-gray-850 bg-[#0E1424]/40">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-800/80 bg-gray-950/40 text-xs font-mono text-gray-400 uppercase tracking-wider">
                <th className="py-4 px-6 font-bold">Criterio Comparativo</th>
                <th className="py-4 px-6 font-bold text-blue-400">Renting Operativo (Alquiler)</th>
                <th className="py-4 px-6 font-bold text-[#10B981]">Compra Tradicional</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-300 divide-y divide-gray-850">
              
              <tr>
                <td className="py-4 px-6 font-semibold text-white">Desembolso Inicial</td>
                <td className="py-4 px-6">Mínimo (Solo la primera cuota corriente)</td>
                <td className="py-4 px-5">Total en pago único (100% del valor del PC)</td>
              </tr>
              
              <tr>
                <td className="py-4 px-6 font-semibold text-white">Obsolescencia</td>
                <td className="py-4 px-6">Protección total. Cambias de PC a los 12-24 meses</td>
                <td className="py-4 px-6">La asumes tú. El PC pierde ~30% de valor el primer año</td>
              </tr>

              <tr>
                <td className="py-4 px-6 font-semibold text-white">Averías Especiales</td>
                <td className="py-4 px-6 text-emerald-400">Todo incluido. Reparación o sustitución gratis en 24h</td>
                <td className="py-4 px-6">Garantía oficial (envíos a fábrica, esperas de 10-20 días)</td>
              </tr>

              <tr>
                <td className="py-4 px-6 font-semibold text-white">Ventaja Fiscal</td>
                <td className="py-4 px-6">Gasto operativo deducible al 100% (IRPF, Soc., IVA deducible)</td>
                <td className="py-4 px-6">Amortización gradual en balance según tablas fiscales oficiales</td>
              </tr>

              <tr>
                <td className="py-4 px-6 font-semibold text-white">Fin de contrato / Uso</td>
                <td className="py-4 px-6">Devuelves el PC, lo cambias por uno nuevo o compras el actual</td>
                <td className="py-4 px-6">Conservas el equipo viejo o debes venderlo de segunda mano</td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
