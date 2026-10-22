import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Home,
  ExternalLink,
  RotateCcw,
  Check,
  BrainCircuit,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const WHATSAPP_CASA_TRADICION_URL =
  'https://wa.me/573113585296?text=Hola%20MetaLevelCode%2C%20vengo%20de%20la%20presentaci%C3%B3n%203D%20de%20Scroll%20y%20quiero%20informaci%C3%B3n%20sobre%20la%20Casa%20Tradici%C3%B3n';

const INITIAL_MESSAGES = [
  {
    id: 'm1',
    sender: 'user',
    text: 'Hola MetaLevelCode, vengo de la presentación 3D de Scroll y quiero información sobre la Casa Tradición.',
    time: 'Payload QR',
  },
  {
    id: 'm2',
    sender: 'bot',
    latency: '1.2s',
    thought:
      'Captar atención en <10s, despertar deseo con el atributo estrella (Piscina Sinfín en Cerritos) y pedir Nombre + Contacto antes de soltar el precio en frío.',
    text: '¡Buenas tardes! Qué gusto saludarte 🌴. Casa Tradición es una de las propiedades campestres más exclusivas de Cerritos (1.850 m² con piscina sinfín climatizada).\n\nPara enviarte el dossier y las fotos reales aquí mismo, ¿con quién tengo el gusto y a qué número o correo te registro?',
    time: 'IA < 10s',
  },
];

/**
 * SECTION 7: Trabajemos Juntos (La Cúspide & Demo del Asesor)
 * - Left (#stage-qr): 100% Transparent window so the Floating 3D QR Monolith in Canvas3D shines through
 *   without being hidden behind any opaque card!
 * - Right: Smart Consultative Sales Bot for "Casa Tradición" that actively thinks how to sell,
 *   anchors value, qualifies intent, extracts Name/Phone/Email, sends HD photos, and closes the appointment.
 */
export default function ClimaxAdvisorSection() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeThought, setActiveThought] = useState(
    'Objetivo Comercial: Capturar Nombre, Teléfono y Correo antes de entregar precio y cerrar visita presencial.'
  );
  const [leadData, setLeadData] = useState({
    nombre: 'Pendiente',
    telefono: '+57 311 *** **96',
    correo: 'Pendiente',
    ready: false,
  });

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const processUserMessage = (rawText) => {
    if (!rawText.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text: rawText, time: 'Ahora' },
    ]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = rawText.toLowerCase();
      let botReply = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        latency: '1.1s',
        time: 'IA < 10s',
        thought: '',
        text: '',
        photos: [],
      };

      const emailMatch = rawText.match(/[\w.-]+@[\w.-]+\.\w+/);
      const phoneMatch = rawText.match(/(?:3\d{9}|\+?\d[\d\s-]{7,})/);

      if (
        emailMatch ||
        lower.includes('llamo') ||
        lower.includes('soy ') ||
        lower.includes('santiago')
      ) {
        const extractedEmail = emailMatch ? emailMatch[0] : 'santiago@scroll.co';
        const extractedPhone = phoneMatch ? phoneMatch[0] : '+57 311 358 5296';
        let extractedName = 'Santiago';
        const nameRegex = /(?:me llamo|soy|mi nombre es)\s+([a-záéíóúñ\s]{2,20})/i;
        const m = rawText.match(nameRegex);
        if (m && m[1]) {
          extractedName = m[1].trim().replace(/[,.].*$/, '');
        }

        setLeadData({
          nombre: extractedName,
          telefono: extractedPhone,
          correo: extractedEmail,
          ready: true,
        });

        try {
          confetti({ particleCount: 55, spread: 60, origin: { y: 0.75 } });
        } catch (_) {}

        botReply.thought =
          'Lead capturado en CRM (Nombre + Teléfono + Correo). Ahora descubro motivación de compra (vivir vs inversión) y ofrezco recorrido visual para subir el deseo.';
        botReply.text = `¡Mucho gusto, ${extractedName}! Ya registré tu WhatsApp (${extractedPhone}) y tu correo (${extractedEmail}) para enviarte la ficha.\n\nCuéntame algo clave para asesorarte mejor: ¿buscas Casa Tradición para vivir en familia o como inversión patrimonial en Cerritos? Mientras tanto, ¿te muestro fotos de la cocina, la sala o la fachada con piscina?`;
      } else if (lower.includes('cocina')) {
        botReply.thought =
          'El cliente pidió ver la cocina: uso venta emocional (isla en piedra sinterizada integrada a la terraza) y cierro preguntando si la distribución encaja con su familia.';
        botReply.text =
          'Mira esta joya: la Cocina Gourmet de Casa Tradición tiene isla central en piedra sinterizada y se conecta directo con el deck de la piscina para reuniones.\n\n¿Para cuántas personas estás buscando espacio en tu nueva casa?';
        botReply.photos = [
          { url: `${import.meta.env.BASE_URL}assets_casa/cocina_gourmet.jpg`, caption: 'Cocina Gourmet • Isla Central' },
        ];
      } else if (lower.includes('sala')) {
        botReply.thought =
          'El cliente quiere ver la sala: destaco la doble altura e iluminación natural para justificar el valor de $1.450M y empujo hacia los datos o la visita.';
        botReply.text =
          'Aquí tienes la Sala Principal de doble altura: ventanales piso a techo que mantienen la casa fresca todo el día con vista a la reserva de Cerritos.\n\n¿Te gustaría ver ahora la fachada y piscina, o revisamos medidas, estrato y precio?';
        botReply.photos = [
          { url: `${import.meta.env.BASE_URL}assets_casa/sala_principal.jpg`, caption: 'Sala Doble Altura • Vista Reserva' },
        ];
      } else if (lower.includes('fachada') || lower.includes('piscina') || lower.includes('foto')) {
        botReply.thought =
          'Muestro el gancho visual más fuerte (Fachada + Piscina Sinfín Climatizada) y lanzo cierre directo de agendamiento de visita presencial.';
        botReply.text =
          'Te comparto la Fachada Arquitectónica y la Terraza con Piscina Sinfín climatizada. En persona la vista al atardecer de Cerritos enamora.\n\n¿Te gustaría conocer el precio, medidas y administración, o agendamos tu visita privada esta semana?';
        botReply.photos = [
          { url: `${import.meta.env.BASE_URL}assets_casa/fachada_casa.jpg`, caption: 'Fachada Principal Contemporánea' },
          { url: `${import.meta.env.BASE_URL}assets_casa/terraza_piscina.jpg`, caption: 'Piscina Sinfín Climatizada' },
        ];
      } else if (
        lower.includes('visita') ||
        lower.includes('cita') ||
        lower.includes('jueves') ||
        lower.includes('sabado') ||
        lower.includes('sábado') ||
        lower.includes('agendar')
      ) {
        botReply.thought =
          '¡Intención de cierre detectada! Confirmo la cita inmediatamente y disparo alerta en vivo al vendedor humano con toda la ficha del cliente.';
        botReply.text =
          '¡Excelente decisión! He pre-reservado tu visita privada a Casa Tradición en Cerritos y acabo de notificar a nuestro Broker Senior con tus datos para recibirte en portería. 🔥';
      } else {
        botReply.thought =
          'El cliente pide precio y datos técnicos: primero anclo el valor patrimonial (1.850 m² en Estrato 6), doy los datos exactos y cierro con doble alternativa de cita.';
        botReply.text =
          'Por supuesto, te comparto los datos exactos de Casa Tradición (con el mejor valor por m² hoy en Cerritos):\n\n' +
          '• Medidas: Lote de 1.850 m² y 620 m² construidos (5 suites + estudio)\n' +
          '• Estrato: 6 Campestre (Condominio privado 24/7)\n' +
          '• Precio de Venta: $1.450.000.000 COP\n' +
          '• Administración: $980.000 COP/mes\n\n' +
          'Las propiedades con este metraje en Cerritos rotan muy rápido. ¿Te queda mejor visitarla este Jueves a las 4:00 PM o el Sábado a las 10:30 AM?';
      }

      setActiveThought(botReply.thought);
      setIsTyping(false);
      setMessages((prev) => [...prev, botReply]);
    }, 550);
  };

  return (
    <section
      id="sec-climax"
      className="relative min-h-screen w-full py-20 px-6 md:px-14 lg:px-20 z-10"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Clean Climax Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#AEF905] text-[#01122a] text-xs font-display font-black uppercase mb-2">
              07 • La Cúspide
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white leading-none">
              ¡TRABAJEMOS <span className="text-[#AEF905]">JUNTOS!</span>
            </h2>
          </div>

          <a
            href={WHATSAPP_CASA_TRADICION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#AEF905] text-[#01122a] font-display font-black text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition self-start"
          >
            <span>Abrir WhatsApp Real: Casa Tradición</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: 100% Transparent 3D QR Showcase Stage (#stage-qr) + 3 CRM Pills */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Transparent 3D QR Stage — NO opaque background covering the 3D QR Monolith! */}
            <a
              id="stage-qr"
              href={WHATSAPP_CASA_TRADICION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-[36px] bg-transparent border-2 border-[#02E7C1]/45 hover:border-[#AEF905] p-5 flex flex-col justify-between min-h-[330px] transition-all cursor-pointer"
              title="Haz clic o escanea el QR 3D para preguntar por Casa Tradición en WhatsApp"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#01122a]/90 border border-[#AEF905]/50 text-[#AEF905] text-[10px] font-mono font-bold uppercase">
                  ● QR 3D Dinámico en Vivo
                </span>
                <span className="px-3 py-1 rounded-full bg-[#01122a]/90 text-white text-[10px] font-mono">
                  Escanea o Haz Clic ↗
                </span>
              </div>

              {/* Center kept 100% clear so the 3D QR Monolith in Canvas3D is completely visible */}
              <div className="my-auto" />

              <div className="rounded-2xl bg-[#01122a]/90 backdrop-blur-md border border-white/15 px-4 py-2.5 flex items-center justify-between">
                <span className="text-xs font-display font-bold text-white">
                  Payload: &ldquo;Casa Tradición&rdquo;
                </span>
                <span className="text-xs font-display font-black text-[#AEF905] group-hover:translate-x-1 transition-transform">
                  WhatsApp →
                </span>
              </div>
            </a>

            {/* 3 Tall CRM Extraction Stat Capsules */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-[26px] bg-[#AEF905] text-[#01122a] p-4 flex flex-col justify-between h-28">
                <span className="text-[10px] font-bold uppercase opacity-75">Nombre</span>
                <p className="font-display font-black text-xs sm:text-sm truncate">
                  {leadData.nombre}
                </p>
              </div>

              <div className="rounded-[26px] bg-[#02E7C1] text-[#01122a] p-4 flex flex-col justify-between h-28">
                <span className="text-[10px] font-bold uppercase opacity-75">Teléfono</span>
                <p className="font-display font-black text-xs truncate">
                  {leadData.telefono}
                </p>
              </div>

              <div className="rounded-[26px] bg-[#010d1c]/95 border border-white/15 text-white p-4 flex flex-col justify-between h-28">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#AEF905]">Correo</span>
                  {leadData.ready && <Check className="w-3.5 h-3.5 text-[#AEF905]" />}
                </div>
                <p className="font-display font-bold text-xs truncate text-slate-200">
                  {leadData.correo}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Consultative Sales Bot Simulator for "Casa Tradición" */}
          <div className="lg:col-span-7 rounded-[36px] bg-[#F5F4F3] text-[#01122a] p-6 md:p-7 shadow-2xl flex flex-col justify-between space-y-3">
            {/* Minimal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#01122a] text-[#AEF905] flex items-center justify-center">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-[#01122a]">
                    Asesor Comercial IA • Casa Tradición
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">
                    Entrenado para calificar, persuadir y agendar visita en &lt; 10s
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setMessages(INITIAL_MESSAGES);
                  setActiveThought(
                    'Objetivo Comercial: Capturar Nombre, Teléfono y Correo antes de entregar precio y cerrar visita presencial.'
                  );
                }}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 text-[#01122a] cursor-pointer"
                title="Reiniciar"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Live AI Sales Reasoning Bar ("Cómo piensa el bot para vender") */}
            <div className="rounded-2xl bg-[#01122a] text-white px-4 py-3 flex items-start gap-3">
              <div className="w-7 h-7 rounded-xl bg-[#AEF905] text-[#01122a] flex items-center justify-center shrink-0 mt-0.5">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div className="text-xs leading-snug">
                <span className="text-[10px] font-mono uppercase text-[#AEF905] font-bold block">
                  🧠 Razonamiento Comercial IA en Vivo
                </span>
                <span className="text-slate-200 font-medium">{activeThought}</span>
              </div>
            </div>

            {/* Clean Pill Chips */}
            <div className="py-1 flex flex-wrap gap-2">
              {[
                {
                  label: '👤 1. Dar Nombre y Correo',
                  msg: 'Soy Santiago, mi teléfono es 3113585296 y mi correo santiago@scroll.co',
                  primary: true,
                },
                { label: '🍳 Cocina', msg: 'Muéstrame la cocina' },
                { label: '🛋️ Sala', msg: 'Muéstrame la sala' },
                { label: '🏡 Fachada y Piscina', msg: 'Foto de la fachada y piscina' },
                { label: '📐 Precio, Medidas y Estrato', msg: '¿Qué medidas, estrato, precio y administración tiene?' },
                { label: '📅 Agendar Jueves 4pm', msg: 'Agendemos visita el jueves a las 4pm' },
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => processUserMessage(chip.msg)}
                  className={`px-3 py-1.5 rounded-full text-xs font-display font-bold transition cursor-pointer ${
                    chip.primary
                      ? 'bg-[#01122a] text-[#AEF905]'
                      : 'bg-white border border-slate-300 text-[#01122a] hover:bg-[#AEF905]'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Chat Stream */}
            <div
              ref={chatContainerRef}
              className="h-[235px] overflow-y-auto space-y-3 py-1 pr-1"
            >
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-[22px] px-4 py-3 text-xs sm:text-sm space-y-2 ${
                        isBot
                          ? 'bg-[#01122a] text-white rounded-tl-sm'
                          : 'bg-[#AEF905] text-[#01122a] font-semibold rounded-tr-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      {msg.photos && msg.photos.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          {msg.photos.map((p, i) => (
                            <div key={i} className="rounded-xl overflow-hidden bg-black">
                              <img
                                src={p.url}
                                alt={p.caption}
                                className="w-full h-28 object-cover"
                              />
                              <span className="block px-2 py-1 text-[10px] text-[#AEF905] font-bold">
                                {p.caption}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#01122a] text-[#AEF905] text-xs font-bold">
                  Analizando intención de compra (&lt; 10s)...
                </div>
              )}
            </div>

            {/* Bottom Pill Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                processUserMessage(inputValue);
              }}
              className="mt-1 flex items-center gap-2 bg-[#01122a] p-1.5 rounded-full"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Pregunta medidas, precio, cocina, fachada o agenda cita..."
                className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-400 outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#AEF905] text-[#01122a] font-display font-black text-xs uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enviar</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
