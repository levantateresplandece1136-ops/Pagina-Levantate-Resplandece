import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Download, 
  FileText, 
  Clock, 
  X, 
  CheckCircle, 
  Bookmark, 
  ChevronRight,
  Inbox,
  ArrowRight,
  ShoppingBag,
  ExternalLink
} from "lucide-react";
import { ebooksData } from "../data";
import { EBook } from "../types";

interface ResourceLibraryProps {
  selectedBookId: string | null;
  onClearSelectedBook: () => void;
}

interface DiagnosticLink {
  hook?: string;
  title: string;
  name: string;
  url: string;
  description?: string;
  buttonLabel?: string;
}

interface PaidProduct {
  name: string;
  url: string;
  description: string;
  priceLabel: string | null;
  buttonLabel: string;
  note?: string;
}

// Productos de paga en Nuestra Tienda (enlaces Hotmart dados por Josue).
// Método C.O.N.E.C.T.A.: sin precio publicado en la página del producto,
// así que no se inventa precio y la tarjeta dice "Ver precio en Hotmart".
const paidProducts: PaidProduct[] = [
  {
    name: "Método C.O.N.E.C.T.A. — Reconecta con tu hijo adolescente",
    url: "https://go.hotmart.com/A107154990F",
    description:
      "Ebook para padres que no se rinden: los 7 pilares — Comprender, Observar, Normalizar, Escuchar, Conducir hacia Cristo, Transformar y Acompañar — con workbook de 30 días, kit de conversaciones, guía de crisis y plan familiar. De Josué Ricardo Cortés Pérez.",
    priceLabel: null,
    buttonLabel: "Ver en Hotmart",
    note: "Garantía de 7 días",
  },
  {
    name: "Cuando todo se derrumba",
    url: "https://go.hotmart.com/C107811930Y",
    description:
      "Experiencia guiada interactiva de acompañamiento devocional: plan de 30 días, 11 prácticas para calmar la emoción, diario \"Mi Ebenezer\" y registro diario.",
    priceLabel: "$145 MXN",
    buttonLabel: "Comprar en Hotmart",
    note: "Pago único, sin suscripción",
  },
];

export default function ResourceLibrary({ selectedBookId, onClearSelectedBook }: ResourceLibraryProps) {
  // Grupo de recursos: gratis o de paga. Ninguno abierto por defecto: el
  // visitante elige un botón para ver su lista (clic de nuevo lo cierra).
  const [priceFilter, setPriceFilter] = useState<"gratis" | "paga" | null>(null);
  const [activeBook, setActiveBook] = useState<EBook | null>(null);
  
  // Subscription Form states for download
  const [subscriberName, setSubscriberName] = useState<string>("");
  const [subscriberEmail, setSubscriberEmail] = useState<string>("");
  const [optInNews, setOptInNews] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Recursos gratuitos en UNA SOLA LISTA, sin categorías ni pestañas.
  // El gancho (hook) va primero: es la descripción corta antes del enlace,
  // como la escribió Josue. ¿Qué Me Detiene? es el paso 1 (diagnóstico
  // profundo) y Rompiendo Creencias el paso 2 (plan diario de 30 días).
  const freeDiagnostics: DiagnosticLink[] = [
    {
      hook: "Encuentra tus creencias limitantes",
      title: 'Test "¿Qué Me Detiene?"',
      name: "¿Qué Me Detiene?",
      url: "https://qu-me-detiene.vercel.app/",
      description:
        "Diagnóstico profundo para consejería: descubre qué creencias están dirigiendo tus decisiones y llévate un mapa pastoral para trabajarlo con tu consejero. Paso 1: entiende a fondo qué te detiene.",
      buttonLabel: "Realizar diagnóstico profundo",
    },
    {
      hook: "Matrimonios: ¿cómo está tu matrimonio?",
      title: "Realizar Diagnóstico Matrimonial",
      name: "Diagnóstico Matrimonial",
      url: "https://test-matrimonios.vercel.app/",
      description:
        "Un diagnóstico para parejas: mide cómo está tu matrimonio hoy y descubre por dónde empezar a restaurarlo.",
      buttonLabel: "Realizar diagnóstico matrimonial",
    },
    {
      hook: "¿Quieres resolver un conflicto?",
      title: 'Experiencia "El Pacificador"',
      name: "El Pacificador",
      url: "https://pacificador.vercel.app/",
      description:
        "Aprende a reconciliar diferencias y a cultivar un perdón auténtico que profundice el amor en tu familia y en tu matrimonio.",
      buttonLabel: "Resolver un conflicto",
    },
    {
      hook: "Renueva tu forma de pensar en 30 días",
      title: 'Test "Rompiendo Creencias"',
      name: "Rompiendo Creencias",
      url: "https://renovados-rompiendo-las-creencias-l.vercel.app/",
      description:
        "Programa personal de 4 semanas: descubre tu creencia dominante y renuévala día a día con misiones, versículos y un plan personal. Paso 2: después de diagnosticar, renueva tu mente.",
      buttonLabel: "Empezar mi renovación",
    },
    {
      hook: "Vuelve a la cruz",
      title: 'Test "Redimidos"',
      name: "Redimidos",
      url: "https://redimidos-tau.vercel.app/",
      description:
        "Una experiencia de redención: vuelve a la cruz y recuerda lo que Cristo ya hizo por ti. Tus respuestas son 100% privadas.",
      buttonLabel: "Vivir la experiencia Redimidos",
    },
    {
      hook: "Regula tus emociones",
      title: 'Realizar Test "Vence la Ansiedad"',
      name: "Vence la Ansiedad",
      url: "https://vence-la-ansiedad.vercel.app/",
      description:
        "Herramientas bíblicas y prácticas para calmar la ansiedad, regular tus emociones y recuperar la paz interior.",
      buttonLabel: 'Realizar test "Vence la Ansiedad"',
    },
    {
      hook: "Encuentra ánimo cuando todo se viene abajo",
      title: 'Experiencia "Cuando Todo se Derrumba"',
      name: "Cuando Todo se Derrumba",
      url: "https://cuando-todo-se-derrumba.vercel.app/",
      description:
        "Acompañamiento para los días en que todo se derrumba: detente, vacía tu mochila, recupera claridad y escucha al Pastor.",
      buttonLabel: "Empezar la experiencia",
    },
  ];

  // Handle outside activation from Diagnostic Center recommendations
  React.useEffect(() => {
    if (selectedBookId) {
      const book = ebooksData.find(b => b.id === selectedBookId);
      if (book) {
        setActiveBook(book);
        onClearSelectedBook(); // Reset state in parent
      }
    }
  }, [selectedBookId, onClearSelectedBook]);

  const handleOpenBook = (book: EBook) => {
    setActiveBook(book);
    setDownloadSuccess(false);
    setSubscriberName("");
    setSubscriberEmail("");
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberName || !subscriberEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDownloadSuccess(true);
      // Simulate incrementing downloads locally
      const currentCount = localStorage.getItem(`dl_${activeBook?.id}`) || "0";
      localStorage.setItem(`dl_${activeBook?.id}`, (parseInt(currentCount) + 1).toString());
    }, 1500);
  };

  // Helper for rendering custom 3D-effect book covers using Tailwind
  const renderBookCover = (book: EBook, scale: "card" | "modal" = "card") => {
    const isModal = scale === "modal";
    
    // Choose cover background design to fit premium vibe based on ID
    let coverStyle = "from-brand-dark to-brand-dark-2";
    let trimStyle = "border-amber-500/20";
    
    if (book.id === "anclas-del-alma") {
      coverStyle = "from-brand-dark via-[#22402C] to-brand-dark";
    } else if (book.id === "limites-redentores") {
      coverStyle = "from-[#3A1F12] via-brand-terra to-[#5C2E15]";
    } else if (book.id === "mesa-de-la-escucha") {
      coverStyle = "from-brand-dark via-brand-accent to-[#2C4A08]";
    } else if (book.id === "padres-de-luz") {
      coverStyle = "from-[#22402C] via-brand-dark to-brand-dark-2";
    }

    return (
      <div 
        className={`relative bg-gradient-to-br ${coverStyle} border border-brand-border rounded-xl shadow-2xl transition-all duration-500 hover:shadow-brand-accent/5 overflow-hidden flex flex-col justify-between p-6 ${
          isModal ? "w-64 h-[22rem] cursor-default" : "w-full aspect-[3/4] cursor-pointer hover:scale-[1.02]"
        }`}
        onClick={!isModal ? () => handleOpenBook(book) : undefined}
      >
        {/* Spine Edge shadow overlay */}
        <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-white/5 to-transparent border-r border-white/5" />
        
        {/* Gold Frame accents */}
        <div className="absolute inset-2.5 border border-brand-accent/20 rounded-lg pointer-events-none" />
        
        {/* Emblem */}
        <div className="flex justify-between items-start pt-1">
          <span className="font-space text-[9px] uppercase tracking-[0.25em] text-brand-accent">
            Josue Cortés
          </span>
          <Bookmark className="w-4 h-4 text-brand-accent/60" />
        </div>

        {/* Title central */}
        <div className="my-auto space-y-2 relative z-10 px-3">
          <h4 className="font-serif font-semibold text-[#FAF7F0] text-xl md:text-[22px] leading-tight text-center tracking-normal">
            {book.title}
          </h4>
          <div className="w-10 h-0.5 bg-brand-accent mx-auto" />
          <p className="text-[10px] text-white/70 uppercase tracking-wider text-center font-space leading-snug">
            {book.category}
          </p>
        </div>

        {/* Bottom Metadata */}
        <div className="flex justify-between items-center text-[9px] font-space text-brand-accent/70 pt-2 relative z-10 border-t border-brand-border/40">
          <div className="flex items-center gap-1">
            <FileText className="w-3 h-3" />
            <span>{book.pages} pág</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{book.readTime}</span>
          </div>
        </div>

        {/* Gloss overlay reflection */}
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none transform -skew-x-12" />
      </div>
    );
  };

  return (
    <div id="recursos-seccion" className="py-20 bg-brand-bg scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Encabezado: solo el título, un texto que introduce a los 2 botones y los botones */}
        <div className="text-left max-w-3xl mb-8">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-text mt-3">
            Recursos
          </h2>
          <p className="text-brand-muted text-sm mt-3 max-w-2xl leading-relaxed">
            Empieza hoy, sin pagar nada: diagnósticos gratuitos para
            renovar tu mente, restaurar tus relaciones y crecer en Cristo. Y si
            quieres profundizar más, en Nuestra Tienda encontrarás recursos de
            paga para tu crecimiento.
          </p>
        </div>

        {/* Los 2 botones: recursos gratis y Nuestra Tienda */}
        <div
          role="tablist"
          aria-label="Recursos gratis o de paga"
          className="flex gap-2 mb-8"
        >
          {([
            { id: "gratis", label: "Recursos gratis", count: freeDiagnostics.length },
            { id: "paga", label: "Nuestra Tienda", count: paidProducts.length },
          ] as const).map((group) => {
            const isActive = priceFilter === group.id;
            return (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setPriceFilter(priceFilter === group.id ? null : group.id)}
                className={`shrink-0 font-space text-xs md:text-sm font-bold uppercase tracking-wider px-4 md:px-5 py-3 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand-accent text-white border-brand-accent shadow-md shadow-brand-accent/20"
                    : "bg-brand-card text-brand-text border-brand-border hover:border-brand-accent/50 hover:text-brand-accent"
                }`}
              >
                {group.label} ({group.count})
              </button>
            );
          })}
        </div>

        {priceFilter === "gratis" ? (
          /* Recursos gratis: una sola lista con los 7 diagnósticos,
             sin categorías ni pestañas. Los ebooks no van aquí. */
          <ul className="divide-y divide-brand-border/60 border-y border-brand-border/60">
            {freeDiagnostics.map((diag) => (
              <li key={diag.url} className="py-6 first:pt-0">
                <p className="font-space text-xs font-bold uppercase tracking-wider text-brand-terra">
                  {diag.hook}
                </p>
                <div className="flex items-center gap-2 flex-wrap mt-1.5">
                  <h3 className="text-xl font-serif font-semibold text-brand-text leading-snug">
                    {diag.name}
                  </h3>
                  <span className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-space">
                    Gratis
                  </span>
                </div>
                <p className="text-sm text-brand-muted leading-relaxed mt-1.5 max-w-2xl">
                  {diag.description}
                </p>
                <a
                  href={diag.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 bg-brand-accent text-white hover:bg-brand-hover text-sm font-space font-bold py-3 px-5 rounded-2xl transition-all shadow-md hover:shadow-lg shadow-brand-accent/10 cursor-pointer"
                >
                  <span>{diag.buttonLabel ?? diag.title}</span>
                  <ChevronRight className="w-5 h-5 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        ) : priceFilter === "paga" ? (
          /* Nuestra Tienda: recursos de paga (Hotmart) */
          <div className="space-y-6">
            <div className="text-left max-w-2xl space-y-2">
              <h3 className="text-3xl md:text-4xl font-serif font-light text-brand-text leading-tight">
                Nuestra Tienda
              </h3>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                Recursos de paga para profundizar tu crecimiento — entra y descubre
                lo que viene para ti.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {paidProducts.map((product) => (
                <div
                  key={product.url}
                  className="bg-brand-card border border-brand-border rounded-3xl p-6 md:p-7 flex flex-col gap-4 hover:border-brand-terra/40 transition-all"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-9 h-9 rounded-full bg-brand-terra/10 border border-brand-terra/20 flex items-center justify-center shrink-0">
                      <ShoppingBag className="w-4 h-4 text-brand-terra" />
                    </span>
                    {product.priceLabel ? (
                      <span className="bg-brand-terra text-white px-3 py-1 rounded-full text-xs font-bold font-space">
                        {product.priceLabel}
                      </span>
                    ) : (
                      <span className="bg-brand-terra/10 border border-brand-terra/20 text-brand-terra px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-space">
                        Ver precio en Hotmart
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-serif font-semibold text-brand-text leading-snug">
                    {product.name}
                  </h4>
                  <p className="text-sm text-brand-muted leading-relaxed flex-1">
                    {product.description}
                  </p>
                  {product.note && (
                    <p className="text-xs text-brand-accent font-space font-bold">
                      {product.note}
                    </p>
                  )}
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 bg-brand-terra hover:bg-[#A84A20] text-white text-sm font-space font-bold py-3.5 px-5 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>{product.buttonLabel}</span>
                    <ExternalLink className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setPriceFilter("gratis")}
                className="inline-flex items-center gap-2 bg-brand-accent text-white hover:bg-brand-hover font-space text-xs uppercase font-bold py-3 px-5 rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Ver los recursos gratis
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}

      </div>
      {/* Book Detail Drawer Modal Overlay */}
      <AnimatePresence>
        {activeBook && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-card border border-brand-border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              
              {/* Close Button Trigger */}
              <button
                onClick={() => { setActiveBook(null); setDownloadSuccess(false); }}
                className="absolute top-5 right-5 p-2 rounded-full bg-brand-bg hover:bg-brand-border text-brand-muted hover:text-brand-text transition-colors border border-brand-border cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Side: Cover Display */}
                <div className="lg:col-span-5 flex flex-col items-center justify-between space-y-6">
                  {renderBookCover(activeBook, "modal")}
                  
                  {/* Download Metrics */}
                  <div className="w-full bg-brand-bg/50 border border-brand-border rounded-xl p-4 flex items-center justify-around text-center text-xs">
                    <div>
                      <span className="block font-space text-[10px] text-brand-muted uppercase">PÁGINAS</span>
                      <span className="font-serif font-bold text-lg text-brand-text">{activeBook.pages}</span>
                    </div>
                    <div className="w-px h-8 bg-brand-border" />
                    <div>
                      <span className="block font-space text-[10px] text-brand-muted uppercase">DURACIÓN</span>
                      <span className="font-serif font-bold text-lg text-brand-text">{activeBook.readTime}</span>
                    </div>
                    <div className="w-px h-8 bg-brand-border" />
                    <div>
                      <span className="block font-space text-[10px] text-brand-muted uppercase text-brand-accent">ACCESO</span>
                      <span className="font-space font-bold text-xs text-brand-accent uppercase">Gratuito</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Description, Excerpt, Table of contents, and Subscription Form */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className="font-space text-xs text-brand-accent uppercase tracking-widest">{activeBook.category}</span>
                    <h3 className="text-2xl md:text-3xl font-serif text-brand-text mt-1">{activeBook.title}</h3>
                    <p className="text-brand-muted text-sm italic font-serif mt-1 font-light">{activeBook.subtitle}</p>
                  </div>

                  {/* Summary / Description */}
                  <div className="space-y-2">
                    <h4 className="font-space text-[10px] font-bold text-brand-accent uppercase tracking-wider">Acerca de este recurso:</h4>
                    <p className="text-brand-text text-sm leading-relaxed">{activeBook.description}</p>
                  </div>

                  {/* Chapter Interactive Excerpt */}
                  <div className="bg-brand-bg border border-brand-border p-4 rounded-xl space-y-2 max-h-40 overflow-y-auto">
                    <h5 className="font-space text-[9px] font-bold text-brand-accent uppercase tracking-wider flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Lectura de Muestra: {activeBook.excerpt.title}
                    </h5>
                    <p className="text-brand-muted text-xs font-serif leading-relaxed italic pr-2">
                      &ldquo;{activeBook.excerpt.content}&rdquo;
                    </p>
                  </div>

                  {/* Table of contents */}
                  <div className="space-y-2">
                    <h4 className="font-space text-[10px] font-bold text-brand-accent uppercase tracking-wider">Estructura del Libro (Capítulos):</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-brand-muted">
                      {activeBook.tableOfContents.map((chapter, i) => (
                        <div key={i} className="flex items-center gap-2 py-1 border-b border-brand-border/40">
                          <CheckCircle className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                          <span className="truncate">{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Submission Block */}
                  <div className="border-t border-brand-border pt-6">
                    {!downloadSuccess ? (
                      <form onSubmit={handleDownloadSubmit} className="space-y-4">
                        <div className="bg-brand-bg p-4 rounded-2xl border border-brand-border space-y-3.5">
                          <div className="flex items-start gap-2.5 mb-2">
                            <Inbox className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                            <div className="space-y-0.5">
                              <h5 className="text-xs font-space text-brand-text uppercase font-bold">Descarga Digital Segura</h5>
                              <p className="text-[11px] text-brand-muted">Introduce tu correo para recibir el enlace de descarga directa en formato PDF.</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              value={subscriberName}
                              onChange={(e) => setSubscriberName(e.target.value)}
                              placeholder="Tu nombre completo"
                              className="bg-brand-card text-brand-text px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none text-xs font-sans"
                            />
                            <input
                              type="email"
                              required
                              value={subscriberEmail}
                              onChange={(e) => setSubscriberEmail(e.target.value)}
                              placeholder="Tu correo electrónico"
                              className="bg-brand-card text-brand-text px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none text-xs font-sans"
                            />
                          </div>

                          <label className="flex items-center gap-2 select-none cursor-pointer">
                            <input
                              type="checkbox"
                              checked={optInNews}
                              onChange={(e) => setOptInNews(e.target.checked)}
                              className="rounded border-brand-border bg-brand-card text-brand-accent focus:ring-brand-accent w-3.5 h-3.5"
                            />
                            <span className="text-[10px] text-brand-muted font-sans leading-none">Deseo recibir reflexiones semanales de Josue Cortés.</span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-brand-accent hover:bg-brand-hover text-brand-bg font-space text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                          {isSubmitting ? "Enviando recursos..." : "Solicitar Enlace de Descarga Gratuita"}
                          <Download className="w-4 h-4" />
                        </button>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-brand-accent/5 border border-brand-accent/20 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-brand-accent/15 flex items-center justify-center text-brand-accent border border-brand-accent/20">
                          <CheckCircle className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-serif text-lg text-brand-text">¡Enlace Generado Exitosamente!</h5>
                          <p className="text-xs text-brand-muted max-w-sm font-space">
                            Gracias, {subscriberName}. Acabamos de despachar un enlace de descarga remota de <b>{activeBook.title}</b> a <b>{subscriberEmail}</b>.
                          </p>
                        </div>
                        
                        {/* Instant opening shortcut to give high performance */}
                        <div className="flex gap-3 w-full max-w-xs">
                          <button
                            onClick={() => {
                              // Local file simulation triggering instant preview
                              alert(`Se abre la simulación del PDF con 10 o 15 de las primeras páginas muestra del eBook "${activeBook.title}".`);
                            }}
                            className="flex-1 bg-brand-card hover:bg-brand-bg text-brand-accent border border-brand-border text-[10px] font-space font-bold py-2 px-4 rounded-xl uppercase tracking-wider transition-colors"
                          >
                            Previsualizar PDF
                          </button>
                          <button
                            onClick={() => {
                              setActiveBook(null);
                              setDownloadSuccess(false);
                            }}
                            className="flex-1 bg-brand-accent hover:bg-brand-hover text-brand-bg text-[10px] font-space font-bold py-2 px-4 rounded-xl uppercase tracking-wider transition-colors"
                          >
                            Entendido
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
