import React from 'react';
import { PhoneCall, ArrowDown, ArrowUpRight } from 'lucide-react';
import { setInteractiveState } from '../../store/scrollStore';

/**
 * SECTION 1: Hero Section (Inmersión Z-Axis)
 * Follows the ultra-clean minimalist hierarchy of Screen 1 in the reference:
 * - Centered 3D Smartphone + 3D Scroll Logo with generous breathing room
 * - Bold typographic statement on the left + single rounded pill CTA ("Let's Start" style)
 * - 3 high-contrast bento stat pills on the right (Zero walls of text)
 */
export default function HeroSection({ progress = 0, onDiveClick }) {
  const hudOpacity = Math.max(0, 1 - progress * 2.2);
  const hudScale = 1 + progress * 0.25;

  return (
    <section id="sec-hero" className="relative h-[210vh] w-full select-none">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 py-8 md:px-14 lg:px-20">
        {/* Top Minimal Pill Header */}
        <div
          className="flex items-center justify-between z-10 transition-opacity duration-300"
          style={{ opacity: hudOpacity }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#021830]/90 border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#AEF905]" />
            <span className="text-xs font-display font-bold tracking-wider uppercase text-white">
              Scroll × MetaLevelCode
            </span>
          </div>

          <span className="px-4 py-1.5 rounded-full bg-[#AEF905] text-[#01122a] font-display font-black text-xs uppercase tracking-wider">
            Cotización 3D
          </span>
        </div>

        {/* Center 3-Column Stage with Maximum Breathing Room */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto z-10 max-w-7xl mx-auto w-full"
          style={{
            opacity: hudOpacity,
            transform: `scale(${hudScale})`,
            pointerEvents: hudOpacity < 0.15 ? 'none' : 'auto',
          }}
        >
          {/* Left Column: Clean Title + Single Pill Action (Screen 1 Reference Hierarchy) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#02E7C1]/15 border border-[#02E7C1]/40 text-[#02E7C1] text-xs font-semibold">
              Inmersión Z-Axis
            </span>

            <h1 className="font-display font-black text-4xl sm:text-5xl xl:text-6xl leading-[1.02] tracking-tight text-white">
              TU PROPIO <br />
              <span className="text-[#AEF905]">SISTEMA</span> <br />
              <span className="text-[#02E7C1]">DE VENTAS</span>
            </h1>

            <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
              Entra a la pantalla y descubre qué ocurre después de cada Reel viral.
            </p>

            {/* Sleek Pill Button (Inspired by "TODU -> Let's Start" pill in Reference) */}
            <div className="pt-1 flex items-center gap-4">
              <button
                onClick={() => {
                  setInteractiveState({ callAnswered: true });
                  if (onDiveClick) onDiveClick();
                }}
                className="group inline-flex items-center gap-4 pl-6 pr-3 py-3 rounded-full bg-[#AEF905] text-[#01122a] font-display font-black text-sm uppercase tracking-wider shadow-[0_12px_30px_rgba(174,249,5,0.35)] hover:scale-105 transition-all cursor-pointer"
              >
                <span>Entrar</span>
                <span className="w-9 h-9 rounded-full bg-[#01122a] text-[#AEF905] flex items-center justify-center">
                  <PhoneCall className="w-4 h-4" />
                </span>
              </button>
            </div>
          </div>

          {/* Center Column: Pure Unobstructed Stage for 3D Smartphone & 3D Scroll Arrow */}
          <div className="lg:col-span-4 h-[380px] sm:h-[460px] flex flex-col items-center justify-end pointer-events-none">
            <div className="px-4 py-1.5 rounded-full bg-[#010d1c]/90 border border-white/10 text-[11px] font-medium text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#AEF905] animate-ping" />
              Llamada Entrante
            </div>
          </div>

          {/* Right Column: 3 Tall Vertical Bento Stat Pills (Screen 6 Top Hierarchy) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              {/* Pill 1: Solid Lime */}
              <div className="rounded-[28px] bg-[#AEF905] text-[#01122a] p-4 flex flex-col justify-between h-40 shadow-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                  IA Chat
                </span>
                <div>
                  <p className="font-display font-black text-2xl sm:text-3xl leading-none">
                    &lt;10s
                  </p>
                  <p className="text-[11px] font-semibold mt-1 opacity-85">
                    Respuesta
                  </p>
                </div>
              </div>

              {/* Pill 2: Solid Turquoise with Corner Arrow */}
              <div className="rounded-[28px] bg-[#02E7C1] text-[#01122a] p-4 flex flex-col justify-between h-40 shadow-xl relative">
                <div className="w-7 h-7 rounded-full bg-[#01122a] text-white flex items-center justify-center self-end">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-display font-black text-2xl sm:text-3xl leading-none">
                    24/7
                  </p>
                  <p className="text-[11px] font-semibold mt-1 opacity-85">
                    Filtro Activo
                  </p>
                </div>
              </div>

              {/* Pill 3: Dark Obsidian Card */}
              <div className="rounded-[28px] bg-[#021830]/95 border border-white/15 text-white p-4 flex flex-col justify-between h-40 shadow-xl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#02E7C1]">
                  SaaS
                </span>
                <div>
                  <p className="font-display font-black text-2xl sm:text-3xl leading-none text-[#AEF905]">
                    100%
                  </p>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Tu Marca
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div
          className="flex items-center justify-center gap-2 z-10"
          style={{ opacity: hudOpacity }}
        >
          <span className="text-xs font-medium text-slate-400">
            Haz scroll para sumergirte
          </span>
          <ArrowDown className="w-4 h-4 text-[#AEF905] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
