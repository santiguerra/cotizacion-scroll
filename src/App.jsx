import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Canvas3D from './components/Canvas3D';
import HeroSection from './components/sections/HeroSection';
import IcebergSection from './components/sections/IcebergSection';
import SaaSSection from './components/sections/SaaSSection';
import PersonalizationSection from './components/sections/PersonalizationSection';
import CrossoverSection from './components/sections/CrossoverSection';
import PricingSection from './components/sections/PricingSection';
import ClimaxAdvisorSection from './components/sections/ClimaxAdvisorSection';
import { scrollState } from './store/scrollStore';

gsap.registerPlugin(ScrollTrigger);

const SECTION_LIST = [
  { id: 'sec-hero', key: 'hero', label: '01 • Inmersión Z-Axis' },
  { id: 'sec-iceberg', key: 'iceberg', label: '02 • El Iceberg Scroll' },
  { id: 'sec-saas', key: 'saas', label: '03 • Tu Propio SaaS' },
  { id: 'sec-personalizacion', key: 'personalizacion', label: '04 • 19h Arquitectura' },
  { id: 'sec-crossover', key: 'crossover', label: '05 • Crossover MetaLevel' },
  { id: 'sec-pricing', key: 'pricing', label: '06 • Implementación' },
  { id: 'sec-climax', key: 'climax', label: '07 • Casa Tradición QR' },
];

export default function App() {
  const [sectionProg, setSectionProg] = useState({
    hero: 0,
    iceberg: 0,
    saas: 0,
    personalizacion: 0,
    crossover: 0,
    pricing: 0,
    climax: 0,
  });
  const [activeKey, setActiveKey] = useState('hero');

  useEffect(() => {
    // Mouse parallax listener for 3D camera & floating pricing cards
    const handleMouseMove = (e) => {
      scrollState.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Create GSAP ScrollTriggers for each of the 7 sections
    const triggers = SECTION_LIST.map(({ id, key }) => {
      const el = document.getElementById(id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: key === 'hero' || key === 'saas' ? 'top top' : 'top 75%',
        end:
          key === 'hero'
            ? 'bottom top'
            : key === 'saas'
            ? 'bottom bottom'
            : 'bottom 25%',
        scrub: 0.6,
        onEnter: () => {
          scrollState.activeSection = key;
          setActiveKey(key);
        },
        onEnterBack: () => {
          scrollState.activeSection = key;
          setActiveKey(key);
        },
        onUpdate: (self) => {
          const p = Number(self.progress.toFixed(4));
          scrollState.sections[key] = p;

          if (self.isActive) {
            scrollState.activeSection = key;
            setActiveKey(key);
          }

          // Section 5 (Crossover): Palette transition to MetaLevelCode -> Absorption -> Shockwave return to Scroll
          if (key === 'crossover') {
            if (p > 0.06 && p < 0.62) {
              document.body.setAttribute('data-theme', 'metalevel');
              scrollState.themeMode = 'metalevel';
            } else {
              document.body.removeAttribute('data-theme');
              scrollState.themeMode = 'scroll';
            }
          }

          setSectionProg((prev) =>
            Math.abs(prev[key] - p) > 0.01 ? { ...prev, [key]: p } : prev
          );
        },
      });
    });

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'instant' }), 100);
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      triggers.forEach((t) => t && t.kill());
    };
  }, []);

  const handleHeroDiveClick = () => {
    const icebergEl = document.getElementById('sec-iceberg');
    if (icebergEl) {
      icebergEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full selection:bg-[#AEF905] selection:text-[#01122a]">
      {/* Fixed 3D WebGL Canvas (R3F + Drei) */}
      <Canvas3D />

      {/* Minimalist Right-Side Section Progress Telemetry */}
      <nav
        aria-label="Navegación de secciones"
        className="fixed right-3 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-2.5 bg-[#01122a]/85 backdrop-blur-xl border border-white/15 px-2 py-3 rounded-full shadow-2xl"
      >
        {SECTION_LIST.map((sec) => {
          const isCurrent = activeKey === sec.key;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="group relative flex items-center justify-center"
              title={sec.label}
            >
              <span
                className={`pointer-events-none absolute right-full mr-3 whitespace-nowrap text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-lg border opacity-0 group-hover:opacity-100 transition-all ${
                  isCurrent
                    ? 'bg-[#01122a]/95 border-[#AEF905]/60 text-[#AEF905] font-bold shadow-lg'
                    : 'bg-[#021d3a]/95 border-white/15 text-slate-200'
                }`}
              >
                {sec.label}
              </span>
              <span
                className={`w-2.5 rounded-full transition-all ${
                  isCurrent
                    ? 'h-6 bg-[#AEF905] shadow-[0_0_12px_#AEF905]'
                    : 'h-2.5 bg-white/30 group-hover:bg-[#02E7C1]'
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Main Scrollable Narrative Layer (Zero Empty Gap between Hero and Iceberg) */}
      <main className="relative z-10">
        {/* 1. Hero Section (Inmersión Z-Axis) */}
        <HeroSection progress={sectionProg.hero} onDiveClick={handleHeroDiveClick} />

        {/* 2. Dentro del Sistema Scroll (El Iceberg) */}
        <IcebergSection progress={sectionProg.iceberg} />

        {/* 3. Tu Propio Software SaaS (Plataforma Propia de Scroll) */}
        <SaaSSection progress={sectionProg.saas} />

        {/* 4. Personalización de Software (19 Horas • Cero datos comerciales/tarifas) */}
        <PersonalizationSection progress={sectionProg.personalizacion} />

        {/* 5. Casos de Éxito (El Crossover MetaLevelCode) */}
        <CrossoverSection progress={sectionProg.crossover} />

        {/* 6. Formas de Implementación y Pago (Sin FAQ • Tarjetas 3D Parallax) */}
        <PricingSection progress={sectionProg.pricing} />

        {/* 7. Trabajemos Juntos (La Cúspide & Demo del Asesor Casa Tradición) */}
        <ClimaxAdvisorSection progress={sectionProg.climax} />
      </main>
    </div>
  );
}
