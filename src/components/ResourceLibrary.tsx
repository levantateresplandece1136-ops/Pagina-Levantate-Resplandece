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
  Sparkles,
  ArrowRight
} from "lucide-react";
import { ebooksData } from "../data";
import { EBook } from "../types";

interface ResourceLibraryProps {
  selectedBookId: string | null;
  onClearSelectedBook: () => void;
}

interface DiagnosticLink {
  title: string;
  url: string;
  description?: string;
  buttonLabel?: string;
}

export default function ResourceLibrary({ selectedBookId, onClearSelectedBook }: ResourceLibraryProps) {
  // Pestaña activa de Recursos: por defecto, el primer pilar
  const [activeTabId, setActiveTabId] = useState<string>("renueva-mente");
  const [activeBook, setActiveBook] = useState<EBook | null>(null);
  
  // Subscription Form states for download
  const [subscriberName, setSubscriberName] = useState<string>("");
  const [subscriberEmail, setSubscriberEmail] = useState<string>("");
  const [optInNews, setOptInNews] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const librarySections: {
    id: string;
    tabName: string;
    title: string;
    subtitle: string;
    categoryName: string;
    image: string;
    tag: string;
    quote: string;
    longDesc: string;
    diagnostics: DiagnosticLink[];
  }[] = [
    {
      id: "renueva-mente",
      tabName: "Renueva tu mente",
      title: "1. Renueva tu mente. Transforma tu vida.",
      subtitle: "Descubre las creencias que están dirigiendo tu vida y reemplázalas por la verdad de Cristo para experimentar una transformación duradera.",
      categoryName: "Renueva tu mente. Transforma tu vida.",
      image: "",
      tag: "Verdad & Identidad",
      quote: "“La verdad tiene el poder de cambiar la historia que te cuentas a ti mismo.”",
      longDesc: "Descubre las mentiras y falsas creencias que han moldeado tus decisiones, y permite que la luz y verdad de Cristo reescriba tu propósito y renueve tu vida.",
      diagnostics: [
        {
          title: 'Test "¿Qué Me Detiene?"',
          url: 'https://qu-me-detiene.vercel.app/',
          description: 'Diagnóstico profundo para consejería. Descubre qué creencias están dirigiendo tus decisiones y llévate un mapa pastoral para trabajarlo con tu consejero.',
          buttonLabel: 'Realizar diagnóstico profundo'
        }
      ]
    },
    {
      id: "mas-conexion",
      tabName: "Más conexión",
      title: "2. Más conexión, menos conflicto.",
      subtitle: "Aprende a comprender, conectar y disfrutar tus relaciones personales desde una perspectiva bíblica y llena de esperanza.",
      categoryName: "Más conexión, menos conflicto.",
      image: "",
      tag: "Comprensión & Vínculo Especial",
      quote: "“Comprender y conectar es el puente para apagar las llamas del conflicto continuo.”",
      longDesc: "Aprende a reconciliar diferencias y cultivar un perdón auténtico que profundice el amor paternal, familiar y conyugal desde un enfoque redentor y lleno de esperanza.",
      diagnostics: [
        {
          title: 'Realizar Diagnóstico Matrimonial',
          url: 'https://test-matrimonios.vercel.app/'
        },
        {
          title: 'Experiencia "El Pacificador"',
          url: 'https://pacificador.vercel.app/'
        }
      ]
    },
    {
      id: "lidera-integridad",
      tabName: "Lidera con integridad",
      title: "3. Lidera con integridad y propósito.",
      subtitle: "Ordena tus prioridades, fortalece tu carácter y lidera con sabiduría bíblica.",
      categoryName: "Lidera con integridad y propósito.",
      image: "",
      tag: "Fortaleza & Carácter",
      quote: "“Cuando un hombre encuentra su propósito en Dios, lidera con integridad y sabiduría.”",
      longDesc: "Ordena tus prioridades, fortalece tu carácter masculino o ministerial bajo principios inquebrantables, y asume la responsabilidad de guiar con amor y firmeza.",
      diagnostics: [
        {
          title: 'Test "Rompiendo Creencias"',
          url: 'https://renovados-rompiendo-las-creencias-l.vercel.app/',
          description: 'Programa personal de 4 semanas. Descubre tu creencia dominante y renuévala día a día con misiones, versículos y un plan personal.',
          buttonLabel: 'Empezar mi renovación'
        },
        {
          title: 'Test "Redimidos"',
          url: 'https://redimidos-tau.vercel.app/'
        }
      ]
    },
    {
      id: "esperanza-batalla",
      tabName: "Batalla interior",
      title: "4. Esperanza para la batalla interior.",
      subtitle: "Descubre cómo salir de la ansiedad y depresion, enfrentar el pecado persistente y crecer en una relación más profunda con Cristo.",
      categoryName: "Esperanza para la batalla interior.",
      image: "",
      tag: "Victoria & Paz Interior",
      quote: "“Levántate y resplandece, porque ha venido tu luz, y la gloria de Jehová ha nacido sobre ti.”",
      longDesc: "Encuentra herramientas bíblicas y fortaleza espiritual para triunfar sobre la ansiedad, la depresión, romper ciclos destructivos y caminar en plena libertad.",
      diagnostics: [
        {
          title: 'Realizar Test "Vence la Ansiedad"',
          url: 'https://vence-la-ansiedad.vercel.app/'
        },
        {
          title: 'Experiencia "Cuando Todo se Derrumba"',
          url: 'https://cuando-todo-se-derrumba.vercel.app/'
        }
      ]
    }
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

  // Pilar activo según la pestaña seleccionada
  const activeSection = librarySections.find(s => s.id === activeTabId) ?? librarySections[0];
  const activeSectionBooks = ebooksData.filter(book => book.category === activeSection.categoryName);

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

        {/* Section Header */}
        <div className="text-left max-w-3xl mb-16">
          <span className="font-space text-xs text-brand-accent tracking-[0.25em] uppercase">Ecosistema de Formación</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-text mt-3">
            Los 4 Pilares de <span className="text-brand-accent italic font-normal">Crecimiento & Restauración</span>
          </h2>
          <p className="text-brand-muted text-sm mt-3 max-w-2xl leading-relaxed">
            Estructuras fundamentales y recursos pastorales diseñados para desatar nudos relacionales, 
            renovar el entendimiento y guiarte a una vida de profunda paz espiritual y comunión real.
          </p>
          {/* Línea orientadora: ¿por cuál diagnóstico empiezo? */}
          <div className="mt-6 bg-brand-card border-l-4 border-brand-terra rounded-r-2xl px-5 py-4 max-w-2xl shadow-sm">
            <p className="text-sm text-brand-text leading-relaxed">
              <span className="font-space font-bold text-brand-terra">¿Por cuál empiezo? </span>
              Si quieres entender a fondo qué te detiene —ideal para llevarlo a consejería—, haz ¿Qué Me Detiene? Si quieres un plan diario para renovar tu mente, empieza Rompiendo Creencias.
            </p>
          </div>
        </div>

        {/* Pestañas de pilares: un clic abre el pilar, sin botones "Explorar" duplicados */}
        <div
          role="tablist"
          aria-label="Pilares de crecimiento y restauración"
          className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 md:flex-wrap md:overflow-visible"
        >
          {librarySections.map((section) => {
            const isActive = section.id === activeTabId;
            return (
              <button
                key={section.id}
                type="button"
                role="tab"
                id={`tab-${section.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${section.id}`}
                onClick={() => setActiveTabId(section.id)}
                className={`shrink-0 whitespace-nowrap font-space text-xs md:text-sm font-bold uppercase tracking-wider px-4 md:px-5 py-3 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-brand-accent text-white border-brand-accent shadow-md shadow-brand-accent/20"
                    : "bg-brand-card text-brand-text border-brand-border hover:border-brand-accent/50 hover:text-brand-accent"
                }`}
              >
                {section.tabName}
              </button>
            );
          })}
        </div>

        {/* Contenido del pilar activo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection.id}
            role="tabpanel"
            id={`panel-${activeSection.id}`}
            aria-labelledby={`tab-${activeSection.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="mt-8"
          >
            {/* Título, cita y descripción del pilar */}
            <div className="text-left space-y-4 max-w-3xl mb-10">
              <span className="inline-flex items-center gap-1.5 bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                <span className="font-space text-[9px] uppercase tracking-widest text-brand-accent font-bold">
                  {activeSection.tag}
                </span>
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-light text-brand-text leading-tight">
                {activeSection.title}
              </h3>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                {activeSection.subtitle}
              </p>
              <blockquote className="border-l-4 border-brand-accent pl-4 py-1">
                <p className="text-sm md:text-base font-serif text-brand-text leading-relaxed font-semibold italic">
                  {activeSection.quote}
                </p>
              </blockquote>
              <p className="text-brand-muted text-sm md:text-base leading-relaxed">
                {activeSection.longDesc}
              </p>
            </div>

            {/* Dos columnas: diagnósticos y ebooks del pilar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Columna izquierda: diagnósticos (tests) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-space text-xs font-bold text-brand-accent tracking-wider uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Pruebas de Autodiagnóstico
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Herramientas de evaluación personalizadas para medir el estado actual de tu alma y tus relaciones.
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {activeSection.diagnostics.map((diag, index) => (
                    <div key={index} className="space-y-2">
                      {diag.description && (
                        <p className="text-xs text-brand-muted leading-relaxed">
                          {diag.description}
                        </p>
                      )}
                      <a
                        href={diag.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-3 bg-brand-accent text-white hover:bg-brand-hover text-sm font-space font-bold py-3.5 px-5 rounded-2xl transition-all shadow-md hover:shadow-lg shadow-brand-accent/10 cursor-pointer text-left"
                      >
                        <span className="font-medium">{diag.buttonLabel ?? diag.title}</span>
                        <ChevronRight className="w-5 h-5 shrink-0" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna derecha: ebooks y guías */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-space text-xs font-bold text-brand-accent tracking-wider uppercase flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Recursos de Estudio &amp; Guías
                  </h4>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    Descarga o lee guías teológicas y prácticas preparadas por el pastor Josué Cortés para guiar tu proceso paso a paso.
                  </p>
                </div>

                <div className="space-y-4">
                  {activeSectionBooks.length > 0 ? (
                    activeSectionBooks.map(book => {
                      return (
                        <div
                          key={book.id}
                          className="bg-brand-card/80 border border-brand-border rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:border-brand-accent/30 hover:bg-brand-card transition-all"
                        >
                          <div className="space-y-2 text-left flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="font-serif font-semibold text-brand-text text-base sm:text-lg leading-tight">
                                {book.title}
                              </h5>
                              {book.isPopular && (
                                <span className="bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider font-space">
                                  Destacado
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                              {book.description}
                            </p>
                            <div className="flex gap-4 text-[10px] font-space text-brand-accent/80 font-medium">
                              <span>{book.pages} páginas</span>
                              <span>•</span>
                              <span>{book.readTime} de lectura</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleOpenBook(book)}
                            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-brand-accent text-white hover:bg-brand-hover font-space text-xs uppercase font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
                          >
                            <span>Estudiar Recurso</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-brand-card border border-brand-border p-8 rounded-2xl text-center">
                      <p className="text-xs text-brand-muted italic font-sans">
                        Próximamente se añadirán más recursos descargables y guías escritas para este pilar de crecimiento.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Recordatorio */}
            <div className="mt-12 pt-8 border-t border-brand-border/40 text-center">
              <p className="text-xs text-brand-muted italic max-w-md mx-auto leading-relaxed">
                Todos estos recursos son totalmente gratuitos y están diseñados con base en el acompañamiento pastoral.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

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
