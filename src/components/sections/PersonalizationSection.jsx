import React, { useState } from 'react';
import { Check, Building2, Stethoscope, Briefcase, ShoppingBag } from 'lucide-react';

const BUSINESS_ARCHETYPES = {
  inmobiliaria: {
    label: 'Inmobiliaria',
    icon: Building2,
    tone: 'Consultivo y enfocado en agendar visita',
    rag: 'Fichas técnicas, metraje, precios y fotos HD',
    rule: 'Filtra presupuesto antes de pasar al broker',
  },
  salud: {
    label: 'Salud',
    icon: Stethoscope,
    tone: 'Empático, confidencial y orientador',
    rag: 'Tratamientos, sedes y preparación previa',
    rule: 'Valida disponibilidad y agenda valoración',
  },
  rrhh: {
    label: 'RRHH',
    icon: Briefcase,
    tone: 'Ágil y evaluador de perfil laboral',
    rag: 'Vacantes activas, requisitos y turnos',
    rule: 'Lee hojas de vida en PDF y clasifica el cargo',
  },
  ecommerce: {
    label: 'Retail',
    icon: ShoppingBag,
    tone: 'Dinámico y enfocado en cierre inmediato',
    rag: 'Inventario vivo, tallas y envíos',
    rule: 'Verifica stock y estructura el pedido',
  },
};

const TIME_BARS = [
  { label: 'Investigación', hours: '2h', width: '32%', color: 'bg-[#84cc16]', checked: true },
  { label: 'In Situ Cliente', hours: '8h', width: '92%', color: 'bg-[#01122a]', checked: true },
  { label: 'Configuración Bot', hours: '3h', width: '48%', color: 'bg-[#84cc16]', checked: true },
  { label: 'Pruebas Técnicas', hours: '2h', width: '32%', color: 'bg-[#01122a]', checked: false },
  { label: 'Capacitación', hours: '4h', width: '62%', color: 'bg-[#84cc16]', checked: true },
];

/**
 * SECTION 4: Personalización de Software
 * Follows Screen 5 (Bottom-Center) of the reference image:
 * - Segmented Pill Selector at the top
 * - Clean Horizontal Progress Bars for the 19 Hours of Time Architecture
 * - Overlapping Stacked Cards at the bottom with big "19h" metric
 * - STRICT COMPLIANCE: ZERO mention of hourly rates, profit margins, viáticos, or commercial terms.
 */
export default function PersonalizationSection() {
  const [activeType, setActiveType] = useState('inmobiliaria');
  const current = BUSINESS_ARCHETYPES[activeType];

  return (
    <section
      id="sec-personalizacion"
      className="relative min-h-screen w-full py-20 px-6 md:px-14 lg:px-20 z-10"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Minimal Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#AEF905]/15 border border-[#AEF905]/40 text-[#AEF905] text-xs font-bold mb-2">
              04 • Arquitectura del Tiempo
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
              PERSONALIZACIÓN <span className="text-[#AEF905]">A MEDIDA</span>
            </h2>
          </div>

          {/* Segmented Pill Switcher (Reference Screen 5 Top Tabs) */}
          <div className="inline-flex p-1.5 rounded-full bg-[#010d1c] border border-white/15 self-start">
            {Object.entries(BUSINESS_ARCHETYPES).map(([key, item]) => {
              const selected = activeType === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveType(key)}
                  className={`px-4 py-2 rounded-full text-xs font-display font-bold transition cursor-pointer ${
                    selected
                      ? 'bg-[#AEF905] text-[#01122a] shadow'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Screen-5 Style Split Bento Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Clean Light Card with Horizontal Time Bars (Reference Screen 5 Top Half) */}
          <div className="lg:col-span-7 rounded-[36px] bg-[#F5F4F3] text-[#01122a] p-7 md:p-8 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Ingeniería Dedicada por Empresa
                </span>
                <h3 className="font-display font-black text-2xl text-[#01122a]">
                  Estructura de 19 Horas
                </h3>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-[#01122a] text-[#AEF905] font-display font-black text-sm">
                19h Total
              </span>
            </div>

            {/* 5 Clean Horizontal Bars */}
            <div className="space-y-4">
              {TIME_BARS.map((bar, idx) => (
                <div key={idx} className="grid grid-cols-12 items-center gap-3">
                  <span className="col-span-4 text-xs font-bold text-slate-800 truncate">
                    {bar.label}
                  </span>
                  <div className="col-span-6 h-5 rounded-full bg-slate-200/90 p-1 flex items-center">
                    <div
                      className={`h-full rounded-full ${bar.color} transition-all duration-500`}
                      style={{ width: bar.width }}
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-1.5">
                    <span className="font-display font-black text-xs text-[#01122a]">
                      {bar.hours}
                    </span>
                    {bar.checked && (
                      <span className="w-4 h-4 rounded-full bg-[#84cc16] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Inmersión técnica pura</span>
              <span className="text-[#01122a] font-bold">5 Etapas de Ingeniería</span>
            </div>
          </div>

          {/* RIGHT: Dark Drawer with Overlapping Stacked Cards & Giant "19h" (Reference Screen 5 Bottom Half) */}
          <div className="lg:col-span-5 rounded-[36px] bg-[#010d1c]/95 border border-white/15 p-7 md:p-8 shadow-2xl flex flex-col justify-between space-y-5 relative overflow-hidden">
            {/* Top Notch Accent */}
            <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto" />

            <div className="space-y-3">
              {/* Top Stacked Lime Card */}
              <div className="rounded-[28px] bg-[#AEF905] text-[#01122a] p-5 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-0.5 rounded-full bg-[#01122a] text-[#AEF905] text-[10px] font-mono font-bold uppercase">
                    Vertical: {current.label}
                  </span>
                  <span className="font-display font-black text-3xl leading-none">
                    19h
                  </span>
                </div>
                <p className="text-xs font-bold uppercase opacity-75">Tono del Bot</p>
                <p className="font-display font-black text-base leading-snug">
                  {current.tone}
                </p>
              </div>

              {/* Middle Stacked Dark-Slate Card */}
              <div className="rounded-[28px] bg-[#032244] border border-white/15 text-white p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-[#02E7C1] font-bold">
                      Conocimiento RAG
                    </p>
                    <p className="font-display font-bold text-sm mt-0.5">
                      {current.rag}
                    </p>
                  </div>
                  <span className="font-display font-black text-2xl text-[#02E7C1]">
                    100%
                  </span>
                </div>
              </div>

              {/* Bottom Stacked Accent Card */}
              <div className="rounded-[28px] bg-[#02CCB5] text-[#01122a] p-5 shadow-xl">
                <p className="text-[10px] font-mono uppercase font-extrabold opacity-80">
                  Regla de Filtrado
                </p>
                <p className="font-display font-black text-sm mt-0.5">
                  {current.rule}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
