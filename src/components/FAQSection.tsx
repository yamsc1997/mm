import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: '¿Qué ocurre si el ordenador alquilado se avería o se rompe accidentalmente?',
      answer: '¡No te preocupes por nada! Si seleccionas la opción de renting, dispones de garantía total con sustitución y reparación. Si un componente falla o hay una avería por el desgaste normal, nuestro servicio de asistencia técnica recoge el equipo roto y te entrega uno de idénticas o superiores características en menos de 24 horas laborables.'
    },
    {
      question: '¿Puedo quedarme en propiedad el ordenador una vez terminen los meses de alquiler?',
      answer: 'Sí, por supuesto. Todos nuestros contratos de renting operativo incluyen una cláusula opcional de "Renting-to-Own" (Renting con Opción de Compra). Al finalizar la permanencia contratada, puedes elegir quedarte el equipo pagando una pequeña cuota residual muy reducida, renovarlo por un modelo de última generación o devolverlo sin coste alguno.'
    },
    {
      question: '¿Cuáles son los requisitos fiscales/documentales para autónomos o empresas?',
      answer: 'El proceso de estudio financiero es ultra-rápido y se completa 100% online en menos de 2 horas. Generalmente solo requerimos: el último modelo 303 o 390 de IVA (para empresas/autónomos), el DNI/CIF oficial del firmante, y el recibo bancario para domiciliar la cuota mensual. No computa CIRBE, así que no reduce tu capacidad de financiación bancaria.'
    },
    {
      question: '¿Vienen listos para trabajar, jugar o requieren configuración adicional?',
      answer: 'Nuestros ingenieros ensamblan, prueban bajo estrés y configuran individualmente cada ordenador antes del envío. Se entregan con Windows 11 Pro con licencias oficiales genuinas activadas, con los drivers más actualizados de NVIDIA/AMD instalados y sin ningún tipo de software basura comercial molestos ("bloatware"). Pon el cable, enciende y ponte a rendir.'
    },
    {
      question: '¿Tiene algún coste el envío inicial de la máquina?',
      answer: 'El envío express a cualquier punto de la España peninsular es totalmente gratuito en todos nuestros renting anuales o de largo plazo. El ordenador viaja embalado en contenedores especiales ultra-protegidos e inside de cajas herméticas para evitar golpes accidentales de paquetería.'
    },
    {
      question: '¿Las personas físicas (particulares) también pueden alquilar?',
      answer: 'Sí, alquilamos tanto a empresas y autónomos como a particulares. Para particulares realizamos una verificación crediticia instantánea sencilla online de solvencia habitual antes de proceder con el envío de ordenadores de alta gama.'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="relative bg-[#090D1A] py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <div className="absolute bottom-5 left-10 w-80 h-80 rounded-full bg-blue-900/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/40 border border-blue-500/20 text-blue-400 font-mono text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Todo lo que debes saber
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            Aclaramos tus dudas operativas, financieras y de soporte técnico para que tomes el control de tus equipos con total tranquilidad.
          </p>
        </div>

        {/* Accordion Group */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-[#0E1424] border border-gray-800/80 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 cursor-pointer focus:outline-none hover:bg-gray-850/40"
                >
                  <span className="font-sans font-bold text-sm sm:text-base text-gray-200 hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400'}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-gray-850/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Simple Support box */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-tr from-[#111A2E] to-[#0E1424] border border-gray-800 text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-blue-500/10 text-blue-400">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-white text-base">¿Tienes una duda concreta o necesitas un equipo personalizado?</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-lg mx-auto">
              Contamos con ingenieros de hardware que te sugerirán los componentes perfectos para tu flujo de trabajo o juego favorito en menos de una hora.
            </p>
          </div>
          <div>
            <a 
              href="#calculator" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300"
            >
              <span>Prueba nuestro simulador interactivo</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
