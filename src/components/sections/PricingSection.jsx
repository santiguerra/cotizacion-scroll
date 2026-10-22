import React, { useState } from 'react';
import { Check, Crown, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { setInteractiveState } from '../../store/scrollStore';

const PRICING_PLAN = {
  id: 'ALIANZA',
  tag: 'PROPUESTA INTEGRAL',
  name: 'Plataforma & Alianza Tecnológica',
  price: '$6M',
  icon: Crown,
  pills: [
    { label: 'Plataforma SaaS Multi-Empresa', badge: 'Marca Scroll' },
    { label: 'WhatsApp Business Cloud API Oficial', badge: 'Meta Directo' },
    { label: 'Panel Master + Catálogos Aislados', badge: 'Full Acceso' },
    { label: 'Inbox Web Multiagente (Handoff)', badge: 'En Vivo' },
    { label: 'Dashboard de Trazabilidad & Reporte ROI', badge: 'Export Excel' },
    { label: 'Servidores & Infraestructura Cloud 24/7', badge: 'Incluido' },
  ],
};

const TOKEN_OPTIONS = {
  '90k': {
    id: '90k',
    label: 'Opción 1: Mensualidad Base',
    priceAmount: '$90k',
    priceBadge: '$90.000 / mes',
    subtext: 'Scroll gestiona los tokens de IA',
    description: 'Scroll administra sus propias API keys o traslada el cobro del consumo directamente a sus clientes finales mediante el medidor en tiempo real de la plataforma.',
    badge: 'Medidor en Plataforma',
    icon: Cpu,
  },
  '150k': {
    id: '150k',
    label: 'Opción 2: Mensualidad All-Inclusive',
    priceAmount: '$150k',
    priceBadge: '$150.000 / mes',
    subtext: 'Tokens de IA 100% Cubiertos',
    description: 'Meta Level se encarga de forma integral del consumo, provisión y costos de los tokens de IA. Scroll se desprende totalmente de recargas, trámites o facturas adicionales.',
    badge: 'Cero Fricción',
    icon: Sparkles,
  },
};

/**
 * SECTION 6: Formas de Implementación y Pago
 * - Inversión inicial: $6M COP
 * - 2 opciones de mensualidad operativa por empresa activa:
 *   1) $90k/mes (Tokens a cargo de Scroll con medidor)
 *   2) $150k/mes (Tokens 100% cubiertos y gestionados por Meta Level)
 */
export default function PricingSection() {
  const [tokenModality, setTokenModality] = useState('90k'); // '90k' | '150k'
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ rotateX: -y * 10, rotateY: x * 10 });
  };

  const handleMouseLeave = () => {
    setInteractiveState({ hoveredPlan: null });
    setCardTilt({ rotateX: 0, rotateY: 0 });
  };

  const Icon = PRICING_PLAN.icon;
  const currentOption = TOKEN_OPTIONS[tokenModality];

  return (
    <section
      id="sec-pricing"
      className="relative min-h-screen w-full py-20 px-6 md:px-14 lg:px-20 z-10 flex flex-col justify-center"
    >
      <div className="max-w-4xl mx-auto w-full space-y-10">
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#AEF905]/15 border border-[#AEF905]/40 text-[#AEF905] text-xs font-bold mb-2">
              06 • Inversión &amp; Modelos de Mensualidad
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-tight">
              PROPUESTA <span className="text-[#AEF905]">CLARA Y DIRECTA</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xs">
            Inversión inicial transparente + dos modalidades de mensualidad según la gestión de tokens.
          </p>
        </div>

        {/* Clean Bento Pricing Card with Mouse Parallax */}
        <div
          className="w-full"
          style={{ perspective: '1200px' }}
        >
          <div
            onMouseEnter={() => setInteractiveState({ hoveredPlan: PRICING_PLAN.id })}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg) translateZ(12px)`,
              transformStyle: 'preserve-3d',
            }}
            className="rounded-[36px] p-8 md:p-12 flex flex-col justify-between transition-transform duration-150 ease-out select-none shadow-2xl bg-[#AEF905] text-[#01122a] border border-[#AEF905]"
          >
            <div className="space-y-6">
              {/* Top Badge + Icon */}
              <div className="flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full text-xs font-display font-black uppercase tracking-wider bg-[#01122a] text-[#AEF905]">
                  {PRICING_PLAN.tag}
                </span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#01122a] text-[#AEF905]">
                  <Icon className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Giant Price */}
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#01122a]">
                  {PRICING_PLAN.name}
                </h3>
                <div className="mt-4 flex flex-wrap items-baseline gap-2">
                  <span className="font-display font-black text-5xl sm:text-6xl tracking-tight text-[#01122a]">
                    {PRICING_PLAN.price}
                  </span>
                  <span className="text-sm font-bold text-[#01122a]/80">COP Inicial</span>
                  <span className="text-2xl font-bold text-[#01122a]/40 mx-1">+</span>
                  <span className="font-display font-black text-4xl sm:text-5xl tracking-tight text-[#01122a]">
                    {currentOption.priceAmount}
                  </span>
                  <span className="text-sm font-bold text-[#01122a]/80">/mes por empresa</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold mt-2 text-[#01122a]/85">
                  $6.000.000 COP Desarrollo Inicial + {currentOption.priceBadge} por empresa activa ({currentOption.subtext})
                </p>
              </div>

              {/* Selector interactivo de modalidad de tokens */}
              <div className="pt-2">
                <p className="text-xs font-black uppercase tracking-wider text-[#01122a]/70 mb-2.5">
                  Selecciona la modalidad de mensualidad por empresa:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.values(TOKEN_OPTIONS).map((opt) => {
                    const isSelected = tokenModality === opt.id;
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setTokenModality(opt.id)}
                        className={`p-4 rounded-2xl text-left transition-all flex flex-col justify-between border cursor-pointer ${
                          isSelected
                            ? 'bg-[#01122a] text-white border-[#01122a] shadow-xl ring-2 ring-[#01122a]'
                            : 'bg-white/80 hover:bg-white text-[#01122a] border-[#01122a]/15'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-2">
                          <div className="flex items-center gap-2">
                            <OptIcon className={`w-4 h-4 ${isSelected ? 'text-[#AEF905]' : 'text-[#01122a]'}`} />
                            <span className="text-xs font-black uppercase tracking-wide">
                              {opt.label}
                            </span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-lg text-xs font-mono font-black ${
                              isSelected
                                ? 'bg-[#AEF905] text-[#01122a]'
                                : 'bg-[#01122a]/10 text-[#01122a]'
                            }`}
                          >
                            {opt.priceBadge}
                          </span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-slate-300' : 'text-[#01122a]/80'}`}>
                          {opt.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clean Pill Rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {PRICING_PLAN.pills.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl p-3.5 flex items-center justify-between gap-3 bg-white text-[#01122a] shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-[#01122a] text-[#AEF905]">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span className="text-xs sm:text-sm font-bold">{item.label}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-extrabold bg-[#01122a] text-[#AEF905] shrink-0">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <a
              href="#sec-climax"
              className="mt-8 w-full py-4 px-6 rounded-2xl font-display font-black text-sm uppercase tracking-wider flex items-center justify-between transition bg-[#01122a] text-[#AEF905] hover:opacity-90 shadow-lg group"
            >
              <span>Elegir Plan ({PRICING_PLAN.price} + {currentOption.priceBadge})</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
