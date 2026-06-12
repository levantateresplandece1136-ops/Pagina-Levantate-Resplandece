import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Download, 
  Search, 
  FileText, 
  Clock, 
  Layers, 
  Share2, 
  X, 
  CheckCircle, 
  Bookmark, 
  ChevronRight,
  TrendingUp,
  Inbox
} from "lucide-react";
import { ebooksData } from "../data";
import { EBook } from "../types";

interface ResourceLibraryProps {
  selectedBookId: string | null;
  onClearSelectedBook: () => void;
}

export default function ResourceLibrary({ selectedBookId, onClearSelectedBook }: ResourceLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeBook, setActiveBook] = useState<EBook | null>(null);
  
  // Subscription Form states for download
  const [subscriberName, setSubscriberName] = useState<string>("");
  const [subscriberEmail, setSubscriberEmail] = useState<string>("");
  const [optInNews, setOptInNews] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Categories extracted dynamically plus 'Todos'
  const categories = ["Todos", "Bienestar Emocional", "Relaciones & Familia", "Consejería Bíblica", "Crianza Intencional"];

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

  // Filtered eBooks
  const filteredBooks = ebooksData.filter(book => {
    const matchesCategory = selectedCategory === "Todos" || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          book.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    let coverStyle = "from-[#0F172A] to-[#1E293B]";
    let trimStyle = "border-amber-500/20";
    
    if (book.id === "anclas-del-alma") {
      coverStyle = "from-[#111827] via-[#1F2937] to-[#0D1527]";
    } else if (book.id === "limites-redentores") {
      coverStyle = "from-[#0A0F1E] via-[#111C38] to-[#0D1525]";
    } else if (book.id === "mesa-de-la-escucha") {
      coverStyle = "from-[#1E1B4B] via-[#311147] to-[#0F172A]";
    } else if (book.id === "padres-de-luz") {
      coverStyle = "from-[#1E1B4B] via-[#10304D] to-[#090F16]";
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
          <h4 className="font-serif font-semibold text-brand-text text-xl md:text-[22px] leading-tight text-center tracking-normal">
            {book.title}
          </h4>
          <div className="w-10 h-0.5 bg-brand-accent mx-auto" />
          <p className="text-[10px] text-brand-muted uppercase tracking-wider text-center font-space leading-snug">
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-space text-xs text-brand-accent tracking-[0.25em] uppercase">BIBLIOTECA DE CRECIMIENTO</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-text mt-3">
              Recursos de <span className="text-brand-accent italic font-normal">Formación Bíblica</span>
            </h2>
            <p className="text-brand-muted text-sm mt-3 max-w-xl">
              Descarga guías, cuadernillos prácticos y libros estructurados por Josue Cortés. 
              Seleccionados inteligentemente bajo filtros temáticos indispensables.
            </p>
          </div>

          {/* Search Inputs */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Buscar por palabra clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-card text-brand-text pl-10 pr-4 py-3 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none font-sans text-sm transition-colors"
            />
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Filter Categories Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10 border-b border-brand-border pb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-space text-[11px] uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-brand-accent text-brand-bg font-bold border border-brand-accent"
                  : "bg-brand-card/50 text-brand-muted border border-brand-border hover:text-brand-text hover:border-brand-accent/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Ebooks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => {
            const hasLocalDownload = localStorage.getItem(`dl_${book.id}`);
            return (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-brand-card border border-brand-border p-5 rounded-2xl flex flex-col justify-between group transition-all duration-300 hover:border-brand-accent/30"
              >
                <div className="space-y-5">
                  
                  {/* Book cover visual block */}
                  {renderBookCover(book, "card")}

                  {/* Metadata and texts */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-space text-brand-accent">
                      <span>{book.category}</span>
                      {book.isPopular && (
                        <span className="flex items-center gap-1 bg-brand-accent/10 border border-brand-accent/20 text-[#E8C96A] px-2 py-0.5 rounded-full text-[9px] font-bold">
                          <TrendingUp className="w-2.5 h-2.5" /> {book.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-brand-text leading-snug group-hover:text-brand-accent transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-brand-muted text-xs line-clamp-3 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                </div>

                {/* Card footer activation */}
                <div className="pt-5 mt-4 border-t border-brand-border flex items-center justify-between gap-3">
                  <span className="text-[10px] font-space text-brand-muted">
                    {book.downloadCount + (hasLocalDownload ? 1 : 0)} descargas
                  </span>
                  
                  <button
                    onClick={() => handleOpenBook(book)}
                    className="flex items-center gap-2 bg-[#1C3A5E]/30 hover:bg-brand-accent hover:text-brand-bg text-brand-accent border border-brand-accent/25 hover:border-brand-accent font-space text-[10px] uppercase font-bold py-2 px-4 rounded-lg transition-all"
                  >
                    Estudiar <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Empty States on Filter */}
        {filteredBooks.length === 0 && (
          <div className="py-16 text-center border border-dashed border-brand-border rounded-2xl max-w-lg mx-auto">
            <Layers className="w-10 h-10 text-brand-muted mx-auto mb-4" />
            <h4 className="font-serif text-lg text-brand-text">Ningún material coincide con la búsqueda</h4>
            <p className="text-brand-muted text-xs font-space mt-1">Intenta ajustando los filtros temáticos de tu biblioteca o reescribe tu palabra clave.</p>
            <button 
              onClick={() => { setSelectedCategory("Todos"); setSearchQuery(""); }}
              className="mt-4 bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/30 text-brand-accent font-space text-[10px] uppercase font-bold py-2 px-4 rounded-md transition-colors"
            >
              Resetear filtros
            </button>
          </div>
        )}

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
                        className="bg-[#1C3A5E]/20 border border-brand-accent/30 p-5 rounded-2xl flex flex-col items-center justify-center text-center space-y-4"
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
