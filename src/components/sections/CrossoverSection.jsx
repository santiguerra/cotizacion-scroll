import React from 'react';
import { Check, Trophy, FileText, Sparkles } from 'lucide-react';

const SERVIRPLUS_TIMELINE = [
  {
    time: '14:22:00 • WhatsApp',
    title: 'Candidato envía Hoja de Vida (PDF)',
    badge: 'HV_Carlos.pdf',
  },
  {
    time: '14:22:02 • Lectura IA en 2.1s',
    title: 'Extrae cargo, 4 años exp. y ciudad',
    badge: 'Match 96%',
  },
  {
    time: '14:22:05 • Cero Humanos',
    title: 'Candidato calificado y agendado',
    badge: '+500 Chats',
  },
];

/**
 * SECTION 5: Casos de Éxito (El Crossover MetaLevelCode)
 * - Top (#stage-crossover): Transparent 3D Arena where the 3D Scroll Logo and True 3D MetaLevelCode "M" Logo
 *   approach each other, meet, MetaLevelCode absorbs Scroll's color palette, and triggers the 3D shockwave ring!
 * - Bottom Left (Screen 4 style): ServirPlus HR Chat UI Timeline.
 * - Bottom Right (Screen 3 style): Faros Training Center Hero Trophy Banner + 3 Alternating Pill Rows.
 */
export default function CrossoverSection({ progress = 0 }) {
  const isAbsorbed = progress >= 0.58;

  return (
    <section
      id="sec-crossover"
      className="relative min-h-[155vh] w-full py-20 px-6 md:px-14 lg:px-20 z-10 overflow-hidden"
    >
      {/* Smooth single-pass radial wave when MetaLevelCode absorbs Scroll's palette */}
      <div
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-700"
        style={{
          opacity: progress > 0.52 && progress < 0.78 ? 0.26 : 0,
          background:
            'radial-gradient(circle at 50% 35%, rgba(174,249,5,0.45), rgba(2,231,193,0.22) 45%, transparent 75%)',
        }}
      />

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Clean Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold border transition-colors duration-500 ${
              isAbsorbed
                ? 'bg-[#AEF905] text-[#01122a] border-[#AEF905]'
                : 'bg-[#7c3aed]/25 border-[#00f0ff]/50 text-[#00f0ff]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {isAbsorbed
              ? '05 • Paleta Absorbida: Scroll × MetaLevelCode'
              : '05 • El Crossover 3D: Scroll × MetaLevelCode'}
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
            CASOS DE <span className="text-[#AEF905]">ÉXITO REALES</span>
          </h2>
        </div>

        {/* 100% Transparent 3D Encounter Stage (#stage-crossover) so both 3D Logos shine without occlusion */}
        <div
          id="stage-crossover"
          className="relative h-[260px] sm:h-[300px] w-full rounded-[36px] border border-white/15 bg-transparent flex flex-col justify-between p-5 pointer-events-none"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="px-3.5 py-1 rounded-full bg-[#01122a]/85 border border-[#02E7C1]/40 text-[#02E7C1] font-bold">
              ● LOGO SCROLL 3D
            </span>
            <span className="px-3.5 py-1 rounded-full bg-[#01122a]/85 border border-white/20 text-white font-bold">
              {isAbsorbed
                ? '⚡ ONDA EXPANSIVA: VIBES SCROLL RESTAURADAS'
                : '⟷ HAZ SCROLL PARA UNIR LOS LOGOS 3D'}
            </span>
            <span
              className={`px-3.5 py-1 rounded-full bg-[#01122a]/85 border font-bold ${
                isAbsorbed
                  ? 'border-[#AEF905]/60 text-[#AEF905]'
                  : 'border-[#a855f7]/60 text-white'
              }`}
            >
              LOGO METALEVELCODE 3D ●
            </span>
          </div>

          <div className="text-center text-[11px] font-mono text-slate-300">
            {isAbsorbed
              ? 'MetaLevelCode ha absorbido el ADN Turquesa + Lima de Scroll'
              : 'El logo 3D "M" de MetaLevelCode se acerca al logo 3D de Scroll'}
          </div>
        </div>

        {/* Two Clean Cards Following Reference Screen 4 (Left) and Screen 3 (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT CARD (Screen 4 Style): Recorrido UI Chat RRHH — ServirPlus */}
          <div className="lg:col-span-6 rounded-[36px] bg-[#F5F4F3] text-[#01122a] p-7 md:p-8 shadow-2xl flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-4 py-1.5 rounded-full bg-[#01122a] text-white text-xs font-display font-bold">
                  Chat RRHH
                </span>
                <span className="px-3 py-1.5 rounded-full text-xs font-bold text-slate-500">
                  ServirPlus
                </span>
              </div>
              <span className="text-xs font-mono font-extrabold text-[#01122a]">
                +500 Chats IA
              </span>
            </div>

            <div className="space-y-3 relative pl-4 border-l-2 border-[#01122a]/20">
              {SERVIRPLUS_TIMELINE.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-[24px] bg-[#01122a] text-white p-4 flex items-center justify-between gap-4 shadow-lg"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-[#02E7C1] font-bold block">
                      {step.time}
                    </span>
                    <p className="font-display font-bold text-sm text-white">
                      {step.title}
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-[#AEF905]">
                      <FileText className="w-3 h-3" /> {step.badge}
                    </span>
                  </div>

                  <div className="w-7 h-14 rounded-full bg-[#AEF905] text-[#01122a] flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD (Screen 3 Style): Faros Training Center Trophy Card + Alternating Pills */}
          <div className="lg:col-span-6 rounded-[36px] bg-[#010d1c]/95 border border-white/15 p-7 md:p-8 shadow-2xl flex flex-col justify-between space-y-5">
            <div className="rounded-[28px] bg-[#032244] border border-white/12 p-6 flex items-center justify-between gap-4 relative overflow-hidden">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-[#02E7C1] font-bold">
                  Plataforma en Producción
                </span>
                <h3 className="font-display font-black text-2xl text-white">
                  Faros Training Center
                </h3>
                <p className="text-xs text-slate-300">
                  Arquitectura multi-rol en tiempo real
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="px-3.5 py-1 rounded-full bg-[#AEF905] text-[#01122a] text-xs font-display font-black">
                  99.9% Uptime
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#AEF905]/20 border border-[#AEF905]/50 text-[#AEF905] flex items-center justify-center">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-[24px] bg-[#AEF905] p-2.5 flex items-center justify-between gap-2.5">
                <div className="flex-1 rounded-2xl bg-white text-[#01122a] px-4 py-3 font-display font-bold text-xs sm:text-sm">
                  Digitalización Multi-Rol
                </div>
                <div className="rounded-2xl bg-[#01122a] text-[#AEF905] px-4 py-3 font-display font-black text-xs sm:text-sm shrink-0">
                  100%
                </div>
              </div>

              <div className="rounded-[24px] bg-[#AEF905] p-2.5 flex items-center justify-between gap-2.5">
                <div className="rounded-2xl bg-[#01122a] text-[#AEF905] px-4 py-3 font-display font-black text-xs sm:text-sm shrink-0">
                  -85% Carga
                </div>
                <div className="flex-1 rounded-2xl bg-white text-[#01122a] px-4 py-3 font-display font-bold text-xs sm:text-sm">
                  Cero Hojas de Cálculo
                </div>
              </div>

              <div className="rounded-[24px] bg-[#AEF905] p-2.5 flex items-center justify-between gap-2.5">
                <div className="flex-1 rounded-2xl bg-white text-[#01122a] px-4 py-3 font-display font-bold text-xs sm:text-sm">
                  Pagos, Cupos y Analítica
                </div>
                <div className="rounded-2xl bg-[#01122a] text-[#02E7C1] px-4 py-3 font-display font-black text-xs sm:text-sm shrink-0">
                  En Vivo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
