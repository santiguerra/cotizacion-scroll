import React from 'react';
import { Check, Flame, Sparkles, Filter } from 'lucide-react';

const SURFACE_CHANNELS = [
  { label: 'Reels', done: true },
  { label: 'Ads', done: true },
  { label: 'Cine 4K', done: true },
  { label: 'TikTok', done: true },
  { label: 'Tráfico', active: true },
];

/**
 * SECTION 2: Dentro del Sistema Scroll (El Iceberg)
 * Follows Screen 2 (Top-Center) of the reference image:
 * 1. Top "Daily Goal" style pill card with circular channel badges (La Punta: Pautas y Multimedia)
 * 2. Two side-by-side square Bento Cards:
 *    - Left Solid Lime Card ("Filtro IA")
 *    - Right Dark Obsidian Card ("< 10s" Respuesta con icono de fuego)
 * 3. Bottom "Task Board" style visual bar chart showing conversion funnel without text clutter
 */
export default function IcebergSection() {
  return (
    <section
      id="sec-iceberg"
      className="relative min-h-[160vh] w-full py-20 px-6 md:px-14 lg:px-20 z-10 pointer-events-none"
    >
      {/* 3D Anchor Stage for the Iceberg Rig */}
      <div
        id="stage-iceberg"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px]"
      />

      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[135vh]">
        {/* TOP ROW: LA PUNTA DEL ICEBERG (Superficie: Contenido Multimedia y Pautas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pointer-events-auto">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#02E7C1]/15 border border-[#02E7C1]/40 text-[#02E7C1] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> 02 • El Iceberg de Scroll
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-white leading-tight">
              LA PUNTA ATRAE. <br />
              <span className="text-[#AEF905]">EL FONDO CIERRA.</span>
            </h2>

            {/* Reference Screen 2 "Daily Goal" Card: Surface Multimedia & Ads */}
            <div className="rounded-[32px] bg-[#010e1f]/95 border border-white/12 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#02E7C1] font-bold">
                    La Superficie (15%)
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">
                    Contenido Multimedia &amp; Pautas
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#AEF905] text-[#01122a] text-xs font-black">
                  Tráfico Masivo
                </span>
              </div>

              {/* Row of Vertical Pill Capsules (like Mon/Tue/Wed/Thu/Fri in Reference Screen 2) */}
              <div className="grid grid-cols-5 gap-2.5 pt-1">
                {SURFACE_CHANNELS.map((ch, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl py-3 px-1 flex flex-col items-center justify-between gap-2 border ${
                      ch.active
                        ? 'bg-[#AEF905] text-[#01122a] border-[#AEF905]'
                        : 'bg-[#032244] text-white border-white/10'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        ch.active
                          ? 'bg-[#01122a] text-[#AEF905]'
                          : 'bg-[#AEF905] text-[#01122a]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-tight">
                      {ch.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center-Right left open so the 3D Iceberg Tip is completely clear */}
          <div className="lg:col-span-7" />
        </div>

        {/* BOTTOM ROW: LA PROFUNDIDAD (Bajo el agua: Software IA < 10s) */}
        <div className="mt-24 lg:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pointer-events-auto">
          {/* Left open for 3D Underwater Iceberg Core */}
          <div className="lg:col-span-6" />

          {/* Right Column: Bento Grid exactly matching Reference Screen 2 (2 Square Cards + Bottom Bar Board) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Two Square Bento Cards Side by Side */}
            <div className="grid grid-cols-2 gap-4">
              {/* Square 1: Solid Lime Card ("Habit" in reference) */}
              <div className="rounded-[32px] bg-[#AEF905] text-[#01122a] p-6 flex flex-col justify-between min-h-[180px] shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-base">
                    Filtro IA
                  </span>
                  <div className="w-9 h-9 rounded-2xl bg-[#01122a] text-[#AEF905] flex items-center justify-center">
                    <Filter className="w-4 h-4" />
                  </div>
                </div>

                <div className="rounded-2xl bg-[#01122a] text-white p-3.5 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#02E7C1] block">
                    Bajo el Agua (85%)
                  </span>
                  <p className="text-xs font-semibold leading-snug">
                    Califica presupuesto y filtra curiosos.
                  </p>
                </div>
              </div>

              {/* Square 2: Dark Obsidian Metric Card ("25 Streak Days" in reference) */}
              <div className="rounded-[32px] bg-[#010d1c]/95 border border-white/15 text-white p-6 flex flex-col justify-between min-h-[180px] shadow-2xl relative overflow-hidden">
                <div>
                  <p className="font-display font-black text-4xl sm:text-5xl text-[#AEF905] leading-none">
                    &lt;10s
                  </p>
                  <p className="text-xs text-slate-300 font-medium mt-1.5">
                    Tiempo de Respuesta
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono text-[#02E7C1]">
                    24/7 Activo
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#AEF905] to-[#02E7C1] text-[#01122a] flex items-center justify-center shadow-lg">
                    <Flame className="w-6 h-6 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card: Visual Bar Board ("Task Board" in Reference Screen 2) */}
            <div className="rounded-[32px] bg-[#F5F4F3] text-[#01122a] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-black text-lg text-[#01122a]">
                    Embudo Bajo el Agua
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600 mt-0.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16]" /> IA Califica
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#01122a]" /> Cierre Humano
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#01122a] text-white text-[11px] font-bold">
                  En Vivo
                </span>
              </div>

              {/* Clean Horizontal Gantt Bars */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold w-24 text-slate-700">1. Recepción</span>
                  <div className="flex-1 h-3.5 rounded-full bg-slate-200 overflow-hidden p-0.5">
                    <div className="h-full w-[92%] rounded-full bg-[#84cc16]" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold w-24 text-slate-700">2. Catálogo RAG</span>
                  <div className="flex-1 h-3.5 rounded-full bg-slate-200 overflow-hidden p-0.5 flex justify-end">
                    <div className="h-full w-[78%] rounded-full bg-[#01122a]" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-bold w-24 text-slate-700">3. Lead Listo</span>
                  <div className="flex-1 h-3.5 rounded-full bg-slate-200 overflow-hidden p-0.5">
                    <div className="h-full w-[86%] rounded-full bg-[#84cc16]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
