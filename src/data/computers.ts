import { Computer, ExtraAccessory } from '../types';

export const INVENTORY: Computer[] = [
  {
    id: 'pc-gaming-ultra',
    name: 'Valkyria RGB Extreme v9',
    tagline: 'Domina cualquier juego en 4K con trazado de rayos al máximo',
    description: 'La máquina de gaming definitiva construida para entusiastas y competidores de e-sports. Refrigeración líquida personalizada, chasis de cristal templado y rendimiento térmico sobresaliente.',
    category: 'gaming',
    specs: {
      cpu: 'Intel Core i9-14900K (24 Núcleos, hasta 6.0GHz)',
      gpu: 'NVIDIA GeForce RTX 4080 Super 16GB GDDR6X',
      ram: '64GB DDR5 Corsair Vengeance 6000MHz CL30',
      storage: '2TB NVMe PCIe 4.0 Samsung 990 Pro (7450 MB/s)',
      powerSupply: '1000W Corsair RM1000x 80+ Gold Modular',
    },
    rating: 4.9,
    reviewsCount: 42,
    buyPrice: 2899,
    rentPrice: 119, // per month base (12-month contract)
    rentMinMonths: 3,
    isFeatured: true,
    stock: 5,
    isAvailableForRent: true,
    isAvailableForBuy: true,
    highlights: [
      'Garantía total de sustitución en menos de 24 horas (alquiler)',
      'Configurado con Windows 11 Pro optimizado para gaming sin bloatware',
      'Incluye mantenimiento de limpieza anual y cambio de pasta térmica gratis'
    ]
  },
  {
    id: 'pc-pro-station',
    name: 'Hydra Studio Threadripper',
    tagline: 'Ideal para renderizado 3D, edición cinematográfica y deep learning',
    description: 'Estación de trabajo brutal diseñada para agencias creativas, arquitectos e ingenieros que necesitan el rendimiento de cómputo más avanzado del sector sin cuellos de botella.',
    category: 'pro',
    specs: {
      cpu: 'AMD Ryzen Threadripper 7960X (24 Núcleos, 48 Hilos)',
      gpu: 'NVIDIA RTX A5000 24GB GDDR6 ECC Especializada',
      ram: '128GB DDR5 ECC Registered Workstation Memory',
      storage: '4TB NVMe PCIe 4.0 RAID (2x 2TB Kingston KC3000)',
      powerSupply: '1200W BeQuiet Straight Power Platinum',
    },
    rating: 5.0,
    reviewsCount: 15,
    buyPrice: 4799,
    rentPrice: 189,
    rentMinMonths: 6,
    isFeatured: true,
    stock: 3,
    isAvailableForRent: true,
    isAvailableForBuy: true,
    highlights: [
      'Perfecto para deducción fiscal completa del 100% como gasto (renting)',
      'Soporte técnico prioritario corporativo telefónico 24/7',
      'Configuración escalable bajo pedido antes del envío'
    ]
  },
  {
    id: 'laptop-zenith-14',
    name: 'Zenith Air 14 OLED Pro',
    tagline: 'Potencia ultra-portátil con pantalla OLED alucinante',
    description: 'Portátil premium fabricado íntegramente de aluminio aeroespacial. Ideal para programadores, nómadas digitales y ejecutivos que buscan elegancia, larga duración de batería y ligereza extrema.',
    category: 'portable',
    specs: {
      cpu: 'Intel Core Ultra 7 155H (16 Núcleos, NPU Inteligencia Artificial)',
      gpu: 'Graphics Intel Arc Integrada con trazado de rayos',
      ram: '32GB LPDDR5X 7467MHz Dual Channel',
      storage: '1TB NVMe PCIe 4.0 de bajísimo consumo',
      screen: '14.0" OLED 2.8K (2880x1800) HDR 120Hz Calibrado Pantone',
    },
    rating: 4.8,
    reviewsCount: 56,
    buyPrice: 1499,
    rentPrice: 59,
    rentMinMonths: 1,
    isFeatured: true,
    stock: 12,
    isAvailableForRent: true,
    isAvailableForBuy: true,
    highlights: [
      'Batería con autonomía real de hasta 14 horas de autonomía',
      'Solo 1.25 Kg de peso para una portabilidad sin esfuerzo',
      'Incluido seguro contra caídas, golpes y derrame de líquidos (alquiler)'
    ]
  },
  {
    id: 'pc-office-nexus',
    name: 'Nexus Business Slim',
    tagline: 'Eficacia silenciosa para oficinas y tareas administrativas',
    description: 'Gabinete compacto de factor de forma pequeño que cabe en cualquier escritorio de oficina. Su bajísimo consumo eléctrico y silencio absoluto lo convierten en el rey del trabajo diario administrativo.',
    category: 'office',
    specs: {
      cpu: 'Intel Core i5-14400 (10 Núcleos, hasta 4.7GHz)',
      gpu: 'Intel UHD Graphics 730 integrada',
      ram: '16GB DDR5 Crucial 4800MHz',
      storage: '512GB NVMe M.2 Western Digital Black',
      powerSupply: '350W Flex ATX 80+ Bronze Altamente Eficiente',
    },
    rating: 4.6,
    reviewsCount: 89,
    buyPrice: 699,
    rentPrice: 29,
    rentMinMonths: 6,
    isFeatured: false,
    stock: 25,
    isAvailableForRent: true,
    isAvailableForBuy: true,
    highlights: [
      'Amortización financiera inmediata ideal para equipamiento de oficinas',
      'Chasis metálico compacto para optimizar espacio del escritorio',
      'Incluye suite de seguridad preconfigurada y listas para teletrabajo'
    ]
  },
  {
    id: 'laptop-aero-raider',
    name: 'Aero Raider Pro 16',
    tagline: 'Portátil de gaming y creación de contenido sin miedos',
    description: 'El equilibrio idóneo entre estación de trabajo portátil y máquina de gaming de alta fidelidad. Su pantalla de alta tasa de refresco y teclado RGB te darán victorias dentro y fuera del trabajo.',
    category: 'portable',
    specs: {
      cpu: 'AMD Ryzen 7 7840HS (8 Núcleos / 16 Hilos, Zen 4)',
      gpu: 'NVIDIA GeForce RTX 4070 Laptop GPU 8GB GDDR6',
      ram: '32GB DDR5 Dual Channel Corsair 5600MHz',
      storage: '1TB NVMe M.2 de máxima velocidad',
      screen: '16.0" IPS QHD+ (2560x1600) 165Hz con cobertura 100% sRGB',
    },
    rating: 4.7,
    reviewsCount: 23,
    buyPrice: 1799,
    rentPrice: 79,
    rentMinMonths: 3,
    isFeatured: false,
    stock: 8,
    isAvailableForRent: true,
    isAvailableForBuy: true,
    highlights: [
      'Revisión preventiva semestral incluida con renovación térmica',
      'Pantalla IPS de alta precisión cromática idónea para diseñadores',
      'Teclado mecánico de perfil bajo optimizado para respuesta rápida'
    ]
  },
  {
    id: 'pc-work-slim',
    name: 'Axioma Standard Eco',
    tagline: 'Rendimiento diario equilibrado al precio más competitivo',
    description: 'Un equipo ideal para estudiantes, comercios locales, puntos de venta o teletrabajo básico. Construido con componentes estándares 100% reparables con costes nulos.',
    category: 'office',
    specs: {
      cpu: 'AMD Ryzen 5 5600G con gráficos Radeon Vega integrados',
      gpu: 'AMD Radeon Vega Graphics (Integrada de alto desempeño)',
      ram: '16GB DDR4 Kingston Fury 3200MHz',
      storage: '512GB SSD SATA3 ultra-robusto',
      powerSupply: '500W Standard de bajo ruido',
    },
    rating: 4.5,
    reviewsCount: 114,
    buyPrice: 489,
    rentPrice: 19,
    rentMinMonths: 12,
    isFeatured: false,
    stock: 18,
    isAvailableForRent: true,
    isAvailableForBuy: true,
    highlights: [
      'Gasto de alquiler deducible 100% de la cuota de autónomo empresarial',
      'Componentes ampliamente estándar ideales para expansiones a futuro',
      'Arranque instantáneo en solo 8 segundos'
    ]
  }
];

export const ACCESSORIES: ExtraAccessory[] = [
  {
    id: 'acc-monitor-4k',
    name: 'Monitor Pro Creative 27" 4K',
    description: 'Monitor profesional IPS HDR con espacio de color Adobe RGB para diseño y productividad.',
    monthlyRentPrice: 15,
    oneTimeBuyPrice: 349,
    icon: 'Monitor'
  },
  {
    id: 'acc-keyboard-mouse',
    name: 'Pack Periféricos Premium Ergo',
    description: 'Teclado mecánico e inatlámbrico y ratón ergonómico multidispositivo recargable.',
    monthlyRentPrice: 6,
    oneTimeBuyPrice: 119,
    icon: 'Keyboard'
  },
  {
    id: 'acc-ups-protection',
    name: 'SAI de Alimentación Continuada 800VA',
    description: 'Sistema anti-apagones y protectores de tensión eléctrica para prevenir pérdida de datos.',
    monthlyRentPrice: 8,
    oneTimeBuyPrice: 129,
    icon: 'ShieldCheck'
  },
  {
    id: 'acc-insurance-plus',
    name: 'Seguro Contra Todo Riesgo Plus',
    description: 'Cero franquicia ante cualquier avería por uso o accidente accidental grave.',
    monthlyRentPrice: 5,
    oneTimeBuyPrice: 79,
    icon: 'HeartHandshake'
  }
];

export const RENTAL_DURATIONS = [
  { durationMonths: 1, priceFactor: 1.35, label: 'Alquiler Flexible (1 mes)' },
  { durationMonths: 3, priceFactor: 1.20, label: 'Corto Plazo (3 meses)' },
  { durationMonths: 6, priceFactor: 1.10, label: 'Medio Plazo (6 meses)' },
  { durationMonths: 12, priceFactor: 1.00, label: 'Anual Estándar (12 meses)' },
  { durationMonths: 24, priceFactor: 0.85, label: 'Largo Plazo (24 meses)' },
];
