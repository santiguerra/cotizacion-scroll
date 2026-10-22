import React from 'react';
import {
  Cpu,
  Layers,
  Database,
  Gauge,
  BellRing,
  BarChart3,
  Check,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const SAAS_TABS = [
  {
    id: 0,
    tabName: '01 • Panel Master',
    badge: 'CONTROL TOTAL',
    title: 'Panel Master de Scroll',
    subtitle: 'Activa, pausa o supervisa todas las empresas clientes desde un único centro de mando con tu propia marca.',
    metricBig: '1-Clic',
    metricLabel: 'Gestión Multi-Cliente',
    accent: '#AEF905',
    icon: Cpu,
    cards: [
      { name: 'Inmobiliaria Inverti', status: 'ACTIVO • 24/7', pill: '142 Leads' },
      { name: 'Clínica Estética Nova', status: 'ACTIVO • 24/7', pill: '89 Citas' },
      { name: 'ServirPlus RRHH', status: 'ACTIVO • 24/7', pill: '512 HVs' },
    ],
  },
  {
    id: 1,
    tabName: '02 • Multi-Empresa',
    badge: 'AISLAMIENTO 100%',
    title: 'Aislamiento Total por Empresa',
    subtitle: 'Cada cliente tiene su propio número de WhatsApp, su propia base de datos y su propio cerebro IA sin mezclar información.',
    metricBig: '100%',
    metricLabel: 'Entornos Aislados',
    accent: '#02E7C1',
    icon: Layers,
    cards: [
      { name: 'Contenedor Empresa A', status: 'WhatsApp + RAG Propio', pill: 'Blindado' },
      { name: 'Contenedor Empresa B', status: 'Reglas + Tono Propio', pill: 'Blindado' },
      { name: 'Contenedor Empresa C', status: 'Catálogo Independiente', pill: 'Blindado' },
    ],
  },
  {
    id: 2,
    tabName: '03 • Catálogo Vivo',
    badge: 'TIEMPO REAL',
    title: 'Catálogo, Precios y Reglas Vivas',
    subtitle: 'Cambia un precio, sube fotos nuevas o ajusta una promoción y el bot aprende el cambio en el mismo segundo.',
    metricBig: '0.2s',
    metricLabel: 'Sincronización RAG',
    accent: '#AEF905',
    icon: Database,
    cards: [
      { name: 'Precio Casa Tradición', status: 'Actualizado: $1.450M COP', pill: 'En Vivo' },
      { name: 'Galería HD (Cocina/Sala)', status: '8 Fotos Indexadas', pill: 'Listo' },
      { name: 'Regla de Descuento Contado', status: 'Activa para Cierre', pill: 'Regla IA' },
    ],
  },
  {
    id: 3,
    tabName: '04 • Medidor IA',
    badge: 'TRANSPARENCIA',
    title: 'Medidor Transparente de Consumo',
    subtitle: 'Visualiza en vivo cuántos mensajes, conversaciones y recursos ha consumido cada empresa durante el mes.',
    metricBig: 'Real-Time',
    metricLabel: 'Telemetría por Cliente',
    accent: '#02E7C1',
    icon: Gauge,
    cards: [
      { name: 'Conversaciones Atendidas', status: '1.840 Chats este mes', pill: '99.8% IA' },
      { name: 'Velocidad Media', status: 'Respuesta en 1.3 segundos', pill: '< 10s' },
      { name: 'Consumo Operativo', status: 'Dentro del rango óptimo', pill: 'Controlado' },
    ],
  },
  {
    id: 4,
    tabName: '05 • Alerta Humana',
    badge: 'HANDOFF COMERCIAL',
    title: 'Alertas a Humanos & Exportación',
    subtitle: 'Cuando el cliente está listo para pagar o agendar, la IA alerta al vendedor humano y exporta los leads en 1 clic.',
    metricBig: 'Hot Lead',
    metricLabel: 'Notificación Inmediata',
    accent: '#AEF905',
    icon: BellRing,
    cards: [
      { name: 'Alerta WhatsApp al Vendedor', status: 'Lead calificado listo para cita', pill: 'Urgente 🔥' },
      { name: 'Ficha Completa Extraída', status: 'Nombre + Teléfono + Correo', pill: 'CRM' },
      { name: 'Base de Datos Mensual', status: 'Descarga directa Excel / CSV', pill: '1-Clic' },
    ],
  },
  {
    id: 5,
    tabName: '06 • Reporte ROI',
    badge: 'RETENCIÓN B2B',
    title: 'Reportes de Retorno para el Cliente',
    subtitle: 'Demuéstrale a cada dueño de negocio cuántos leads generaron las pautas de Scroll y cuántos dejó listos la IA.',
    metricBig: 'x4.8',
    metricLabel: 'Conversión Comercial',
    accent: '#02E7C1',
    icon: BarChart3,
    cards: [
      { name: 'Tráfico Capturado de Pauta', status: '100% Atendido en < 10s', pill: '0 Perdidos' },
      { name: 'Citas Comerciales Agendadas', status: '68 Visitas Reales este mes', pill: '+310%' },
      { name: 'Renovación con Scroll', status: 'Cliente fidelizado con datos', pill: 'Retención' },
    ],
  },
];

/**
 * SECTION 3: Tu Propio Software SaaS (Plataforma Propia de Scroll)
 * - ZERO buttons.
 * - Pinned scroll experience (h-[340vh]): As the user scrolls down, the 3D-tilted SaaS Workstation Device
 *   automatically switches tabs (01 -> 06) with a dynamic transition while the 3D R3F node cluster rotates behind it!
 */
export default function SaaSSection({ progress = 0 }) {
  // Map scroll progress (0..1) across the 6 tabs automatically
  const activeTabIndex = Math.min(
    SAAS_TABS.length - 1,
    Math.max(0, Math.floor(progress * SAAS_TABS.length))
  );
  const current = SAAS_TABS[activeTabIndex];
  const Icon = current.icon;

  // Local sub-progress within the current tab for smooth entrance feel
  const tabProgress = (progress * SAAS_TABS.length) % 1;
  const tiltX = (0.5 - progress) * 8;

  return (
    <section id="sec-saas" className="relative h-[340vh] w-full z-10 select-none">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-10 px-6 md:px-14 lg:px-20">
        {/* 3D Stage Anchor for the R3F Node Cluster behind the device */}
        <div
          id="stage-saas"
          className="pointer-events-none absolute inset-0 m-auto w-[600px] h-[450px]"
        />

        {/* Top Header + Scroll Progress Pill */}
        <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#02E7C1]/15 border border-[#02E7C1]/40 text-[#02E7C1] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> 03 • Tu Propio Software SaaS • Scroll-Driven
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white leading-none">
              PLATAFORMA <span className="text-[#AEF905]">PROPIA DE SCROLL</span>
            </h2>
          </div>

          {/* Automatic Scroll Tab Indicator */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#010d1c]/90 border border-white/15">
            <span className="text-xs font-mono text-slate-300">
              Haz scroll para cambiar de pestaña
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#AEF905] text-[#01122a] font-display font-black text-xs">
              {activeTabIndex + 1} / {SAAS_TABS.length}
            </span>
          </div>
        </div>

        {/* CENTER: The 3D-Tilted SaaS Device Screen that switches tabs automatically on scroll */}
        <div
          className="max-w-5xl mx-auto w-full my-auto z-10"
          style={{ perspective: '1400px' }}
        >
          <div
            style={{
              transform: `rotateX(${tiltX}deg)`,
              transformStyle: 'preserve-3d',
            }}
            className="rounded-[36px] bg-[#010b18]/90 backdrop-blur-2xl border-2 border-[#02E7C1]/35 shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_40px_rgba(2,231,193,0.15)] overflow-hidden transition-transform duration-200"
          >
            {/* Device Top OS Bar + Automatic Tab Strip (Zero Click Buttons — Pure Scroll Driven) */}
            <div className="bg-[#02162e] border-b border-white/10 px-5 py-3.5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 text-[11px] font-mono text-slate-400">
                    app.scroll.saas / {current.tabName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#AEF905] font-bold">
                  ● MOTOR IA EN VIVO
                </span>
              </div>

              {/* 6 Browser Tabs that automatically highlight as you scroll */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {SAAS_TABS.map((tab, idx) => {
                  const isActive = idx === activeTabIndex;
                  const isPassed = idx < activeTabIndex;
                  return (
                    <div
                      key={tab.id}
                      className={`rounded-2xl px-3 py-2 text-center transition-all duration-300 ${
                        isActive
                          ? 'bg-[#AEF905] text-[#01122a] font-display font-black shadow-[0_0_20px_rgba(174,249,5,0.45)] scale-[1.03]'
                          : isPassed
                          ? 'bg-[#03264e] text-[#02E7C1] font-semibold'
                          : 'bg-white/5 text-slate-400'
                      }`}
                    >
                      <span className="text-[11px] block truncate">{tab.tabName}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Continuous Scroll Progress Bar under the tabs */}
            <div className="w-full h-1 bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-[#02E7C1] to-[#AEF905] transition-all duration-150"
                style={{ width: `${Math.min(100, Math.max(4, progress * 100))}%` }}
              />
            </div>

            {/* Device Screen Body: Bento Layout that morphs on each tab change */}
            <div
              key={current.id}
              className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-[fadeIn_0.35s_ease-out]"
            >
              {/* Left Bento Card inside Device Screen: Feature Identity & Giant Metric */}
              <div
                className="lg:col-span-5 rounded-[28px] p-6 flex flex-col justify-between shadow-xl"
                style={{
                  backgroundColor: current.accent,
                  color: '#01122a',
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#01122a] text-[#AEF905] text-[10px] font-mono font-bold uppercase">
                      {current.badge}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#01122a] text-white flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight">
                    {current.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold opacity-85 leading-relaxed">
                    {current.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-[#01122a]/15 flex items-end justify-between">
                  <div>
                    <p className="font-display font-black text-4xl leading-none">
                      {current.metricBig}
                    </p>
                    <p className="text-xs font-bold uppercase mt-1 opacity-80">
                      {current.metricLabel}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#01122a] text-[#AEF905] flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Right 3 Pill Rows inside Device Screen (Reference Screen 3 & 4 Style) */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
                {current.cards.map((row, rIdx) => (
                  <div
                    key={rIdx}
                    className="rounded-[24px] bg-[#032042] border border-white/12 p-4 sm:p-5 flex items-center justify-between gap-4 shadow-lg"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#AEF905] text-[#01122a] flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm sm:text-base text-white">
                          {row.name}
                        </p>
                        <p className="text-xs text-[#02E7C1] font-medium mt-0.5">
                          {row.status}
                        </p>
                      </div>
                    </div>

                    <span className="px-3.5 py-1.5 rounded-2xl bg-[#010d1c] text-[#AEF905] font-display font-black text-xs shrink-0 border border-[#AEF905]/30">
                      {row.pill}
                    </span>
                  </div>
                ))}

                {/* Sub-progress bar for the active tab */}
                <div className="rounded-2xl bg-[#010d1c] px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Sincronizado con el Scroll</span>
                  <span className="text-[#02E7C1]">
                    Pestaña {activeTabIndex + 1} de 6 ({Math.round(tabProgress * 100)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Subtle Caption */}
        <div className="text-center text-xs font-mono text-slate-400 z-10">
          Sigue haciendo scroll para recorrer las 6 pestañas del dispositivo SaaS
        </div>
      </div>
    </section>
  );
}
