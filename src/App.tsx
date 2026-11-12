import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Menu,
  X,
  Star,
  ArrowRight
} from "lucide-react";
import { ebooksData } from "./data";
import ResourceLibrary from "./components/ResourceLibrary";
import PastoralContact from "./components/PastoralContact";
import SocialCommunity from "./components/SocialCommunity";
import Devocional365 from "./components/Devocional365";
import FeaturedDevocional from "./components/FeaturedDevocional";
import RecentDevotionals from "./components/RecentDevotionals";
import TestimonioJosue from "./components/TestimonioJosue";

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "devocional365">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recommendedBookId, setRecommendedBookId] = useState<string | null>(null);
  const [showFullStory, setShowFullStory] = useState(false);

  const [testimonios, setTestimonios] = useState(() => {
    const saved = localStorage.getItem("testimonios_resplandece");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return [
      {
        id: "t-1",
        name: "Carlos & Elena Mendoza",
        tagline: "Matrimonio Restaurado",
        quote: "Estábamos atrapados en un ciclo de reclamos y desconexión silenciosa. Los ejercicios de autodiagnóstico y la guía pastoral nos enseñaron a comunicarnos con una verdad de gracia. Encontrar luz en medio de la tormenta restauró nuestro hogar.",
        stars: 5,
        date: "Reciente"
      },
      {
        id: "t-2",
        name: "Dra. Sofía Rivas",
        tagline: "Líder de Comunidad y Médico",
        quote: "Como profesional de la salud y mentora, sufría de un agotamiento silencioso. Creía erróneamente que estar exhausta era sinónimo de entrega fiel. Gracias al test y el libro 'Anclas del Alma', recuperé el descanso sagrado.",
        stars: 5,
        date: "Reciente"
      }
    ];
  });

  const [newNombre, setNewNombre] = useState("");
  const [newTagline, setNewTagline] = useState("Restauración Personal");
  const [newQuote, setNewQuote] = useState("");
  const [newStars, setNewStars] = useState(5);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmitTestimonio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNombre.trim() || !newQuote.trim()) return;

    const nuevoTestimonio = {
      id: "t-" + Date.now(),
      name: newNombre,
      tagline: newTagline,
      quote: newQuote,
      stars: newStars,
      date: "Publicado por el usuario"
    };

    const updated = [nuevoTestimonio, ...testimonios];
    setTestimonios(updated);
    localStorage.setItem("testimonios_resplandece", JSON.stringify(updated));

    setNewNombre("");
    setNewQuote("");
    setNewStars(5);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const animateScroll = (targetY: number, duration: number = 800) => {
    const startY = window.scrollY || window.pageYOffset;
    const difference = targetY - startY;
    const startTime = performance.now();

    // Cubic bezier-like easing function: easeInOutCubic
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + difference * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const animateScrollToId = (id: string, offset: number = 80) => {
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + (window.scrollY || window.pageYOffset);
      const offsetPosition = elementPosition - offset;
      animateScroll(offsetPosition, 850);
    }
  };

  const handleRecommendBook = (bookId: string) => {
    setRecommendedBookId(bookId);
    // Scroll smooth to resources section
    animateScrollToId("recursos-seccion");
  };

  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false);
    setCurrentView("home");
    setTimeout(() => {
      animateScrollToId(id);
    }, 120);
  };

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen relative font-sans overflow-x-hidden selection:bg-brand-accent selection:text-brand-bg">
      
      {/* GLOBAL NAVBAR */}
      <header className="sticky top-0 z-40 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border/60">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Name */}
          <button 
            onClick={() => {
              setCurrentView("home");
              animateScroll(0, 850);
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-brand-accent/40 shadow-md shadow-brand-accent/5 bg-brand-dark flex items-center justify-center">
              <span className="font-serif font-semibold text-sm text-[#FAF7F0]">LR</span>
            </div>
            <div>
              <span className="block font-serif font-semibold text-base tracking-wide text-brand-text group-hover:text-brand-accent transition-colors">
                Levántate Resplandece
              </span>
              <span className="block font-space text-[9px] uppercase tracking-wider text-brand-accent">
                Josue Cortés
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-6 text-[11px] font-space uppercase tracking-wider">
            <button
              onClick={() => {
                setCurrentView("home");
                animateScroll(0, 850);
              }}
              className="text-brand-muted hover:text-brand-accent transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToAnchor("recursos-seccion")}
              className="text-brand-muted hover:text-brand-accent transition-colors cursor-pointer"
            >
              Recursos
            </button>
            <button
              onClick={() => scrollToAnchor("contacto-seccion")}
              className="text-brand-muted hover:text-brand-accent transition-colors cursor-pointer"
            >
              Contacto
            </button>
          </nav>

          {/* Contact Button Desktop */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToAnchor("contacto-seccion")}
              className="inline-block bg-brand-accent hover:bg-brand-hover text-white px-5 py-2.5 rounded-lg font-space text-[10px] uppercase font-bold tracking-wider transition-all duration-300 shadow-md shadow-brand-accent/20 cursor-pointer text-center"
            >
              Contáctame
            </button>
          </div>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-brand-muted hover:text-brand-text transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-20 left-0 w-full bg-brand-bg/95 backdrop-blur-lg border-b border-brand-border/80 z-30 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-center font-space text-sm uppercase tracking-wider">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView("home");
                  animateScroll(0, 850);
                }}
                className="text-brand-muted hover:text-brand-accent py-2 cursor-pointer"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToAnchor("recursos-seccion")}
                className="text-brand-muted hover:text-brand-accent py-2 cursor-pointer"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollToAnchor("contacto-seccion")}
                className="text-brand-muted hover:text-brand-accent py-2 cursor-pointer"
              >
                Contacto
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToAnchor("sobre-seccion");
                }}
                className="text-brand-muted hover:text-brand-accent py-2 cursor-pointer"
              >
                Sobre Josué
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToAnchor("contacto-seccion");
                }}
                className="w-full bg-brand-accent text-brand-bg font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest mt-4 text-center block cursor-pointer"
              >
                Contáctame
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentView === "home" ? (
        <>
          {/* SECCIÓN 1 · PORTADA OSCURA */}
      <section id="inicio-seccion" className="relative w-full bg-brand-dark text-[#FAF7F0] overflow-hidden scroll-mt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center space-y-8">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FAF7F0]/90 font-space text-[10px] tracking-[0.25em] uppercase mb-6">
              Isaías 60:1
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight leading-none">
              Levántate <span className="text-[#E8C96A] italic">Resplandece</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light text-white/85 tracking-wide mt-4">
              Un llamado para volver a Dios
            </p>
          </div>

          <p className="font-serif italic font-light text-xl md:text-2xl text-[#FAF7F0]/90 max-w-2xl mx-auto leading-relaxed">
            &ldquo;Levántate, resplandece; porque ha venido tu luz, y la gloria del Señor ha nacido sobre ti.&rdquo;
          </p>

          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
              Acompañamiento bíblico para padres, líderes y hombres en crisis que
              necesitan levantarse de nuevo y volver a Dios.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Hubo una temporada en mi vida que puedo describir con dos palabras: oscuridad y silencio.
              Fueron entre tres y cinco años de sequía espiritual, emocional y ministerial.
              En Isaías 49 encontré mi respuesta, y ahí entendí la necesidad de la consejería bíblica.
            </p>
            <button
              onClick={() => scrollToAnchor("sobre-seccion")}
              className="inline-flex items-center gap-2 text-[#E8C96A] font-space text-[11px] font-bold uppercase tracking-wider hover:gap-3 transition-all cursor-pointer"
            >
              Lee mi historia completa
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
            <button
              onClick={() => {
                setCurrentView("devocional365");
                animateScroll(0, 850);
              }}
              className="w-full sm:w-auto bg-brand-accent hover:bg-brand-hover text-white font-space text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-xl shadow-black/30 cursor-pointer text-center"
            >
              Lee el devocional de hoy
            </button>
            <button
              onClick={() => scrollToAnchor("contacto-seccion")}
              className="w-full sm:w-auto bg-brand-terra hover:bg-brand-terra-hover text-white font-space text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-xl shadow-black/30 cursor-pointer text-center"
            >
              Agenda consejería
            </button>
          </div>
        </div>
      </section>

      {/* RECURSO DESTACADO: DEVOCIONAL 365 */}
      <FeaturedDevocional
        onOpenDevocional={() => {
          setCurrentView("devocional365");
          animateScroll(0, 850);
        }}
      />

      {/* BIOGRAPHY / ABOUT THE AUTOR JOSUE */}
      <section id="sobre-seccion" className="py-24 bg-brand-dark border-t border-white/10 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          
          <div className="text-center space-y-3">
            <span className="font-space text-xs text-brand-gold tracking-[0.25em] uppercase">CONOCE AL AUTOR</span>
            <h2 className="text-4.5xl font-serif font-light text-[#FAF7F0] leading-tight">
              Un testimonio de <span className="text-brand-gold italic font-normal">gracia</span> y <span className="text-brand-gold italic font-normal">restauración</span>
            </h2>
          </div>
          
          <div className="space-y-4 text-xs md:text-sm text-white/70 leading-relaxed font-sans">
            <p>
              Hubo una temporada en mi vida que puedo describir con dos palabras: oscuridad y silencio. No fue una semana ni un mal mes. Fueron entre tres y cinco años de sequía espiritual, emocional y ministerial.
            </p>
            <p>
              Yo era pastor. Sí, de esos que oran, predican, aconsejan, visitan, ayunan, dan hasta lo poco que tienen y esperan con esperanza que algo suceda&hellip; pero nada pasaba. La iglesia no crecía. No había fruto, no había respuestas, no había nada.
            </p>
            <p>
              En Isaías 49 encontré mi respuesta: &ldquo;Tú eres mi siervo, Israel, en quien mostraré mi gloria.&rdquo; Y luego: &ldquo;mi causa está delante del Señor, y mi recompensa con mi Dios.&rdquo; Ahí entendí la necesidad de la consejería bíblica: aplicar la Palabra de Dios a las heridas reales de la vida.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowFullStory(!showFullStory)}
              className="inline-flex items-center gap-2 text-brand-gold font-space text-[11px] font-bold uppercase tracking-wider hover:gap-3 transition-all cursor-pointer"
            >
              {showFullStory ? "Ocultar historia completa" : "Conoce su historia completa"}
              <ChevronRight className={`w-4 h-4 transition-transform ${showFullStory ? "-rotate-90" : ""}`} />
            </button>
          </div>

          {showFullStory && (
            <TestimonioJosue />
          )}

          
        </div>
      </section>

      {/* DEVOCIONALES RECIENTES */}
      <RecentDevotionals />

      {/* DYNAMIC RESOURCE LIBRARY SECTION */}
      <ResourceLibrary 
        selectedBookId={recommendedBookId} 
        onClearSelectedBook={() => setRecommendedBookId(null)} 
      />

      {/* PASTORAL CONTACT & DIAGNOSTICS FAQS */}
      <PastoralContact />
      {/* SOCIAL MEDIA & PODCAST COMMUNITY */}
      <SocialCommunity />

      {/* SECCIÓN 3 · PON TU RESEÑA O TESTIMONIO */}
      <section id="resenas-seccion" className="py-20 bg-brand-dark border-t border-white/10 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
{/* SECCIÓN COMPARTE TU TESTIMONIO */}
          <div className="pt-10 border-t border-white/10 space-y-12">
            <div className="text-center space-y-2">
              <span className="font-space text-xs text-brand-gold tracking-[0.25em] uppercase">VOCES DE GRACIA</span>
              <h3 className="text-2xl font-serif font-light text-[#FAF7F0]">
                Pon tu <span className="text-brand-gold italic font-normal">reseña</span> o testimonio
              </h3>
              <p className="text-white/70 text-xs max-w-lg mx-auto leading-relaxed">
                ¿Has experimentado un nuevo comienzo a través de los recursos, mentoría o autodiagnósticos? Tu testimonio puede ser la luz que alguien más necesita hoy.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Formulario */}
              <div className="lg:col-span-6 bg-brand-dark-2 border border-white/10 p-6 rounded-2xl space-y-5 text-left shadow-sm">
                <h4 className="font-serif text-base font-bold text-[#FAF7F0] border-b border-white/10 pb-2.5">
                  Diseña tu Reseña
                </h4>

                <form onSubmit={handleSubmitTestimonio} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-space uppercase tracking-wider text-white/70">
                      Tu Nombre / Pareja / Familia
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Carlos & Elena o Familia Ruiz"
                      value={newNombre}
                      onChange={(e) => setNewNombre(e.target.value)}
                      className="w-full bg-brand-dark border border-white/10 focus:border-brand-accent/50 rounded-xl px-4 py-2 text-xs text-[#FAF7F0] focus:outline-none transition-all placeholder:text-white/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-space uppercase tracking-wider text-white/70">
                      Área de Restauración
                    </label>
                    <select
                      value={newTagline}
                      onChange={(e) => setNewTagline(e.target.value)}
                      className="w-full bg-brand-dark border border-white/10 focus:border-brand-accent/50 rounded-xl px-4 py-2 text-xs text-[#FAF7F0] focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Restauración Personal">Restauración Personal</option>
                      <option value="Matrimonio Restaurado">Matrimonio Restaurado</option>
                      <option value="Liderazgo e Integridad">Liderazgo e Integridad</option>
                      <option value="Paz sobre la Ansiedad">Paz sobre la Ansiedad</option>
                      <option value="Familia y Adolescentes">Familia y Adolescentes</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="block text-[10px] font-space uppercase tracking-wider text-white/70">
                        Puntuación / Estrellas
                      </label>
                      <span className="text-[10px] text-brand-gold font-semibold font-space">{newStars} de 5</span>
                    </div>
                    <div className="flex gap-1.5 items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewStars(star)}
                          className="p-0.5 cursor-pointer hover:scale-110 transition-transform focus:outline-none"
                          title={`Calificar con ${star} estrellas`}
                        >
                          <Star 
                            className={`w-5 h-5 transition-colors ${
                              star <= newStars 
                                ? "fill-[#E8C96A] text-[#E8C96A]" 
                                : "text-white/20 hover:text-white/70"
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-space uppercase tracking-wider text-white/70">
                      Tu Testimonio o Mensaje de Gracia
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Escribe brevemente cómo Dios restauró tu vida, tu paz o tu hogar..."
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      className="w-full bg-brand-dark border border-white/10 focus:border-brand-accent/50 rounded-xl px-4 py-2.5 text-xs text-[#FAF7F0] focus:outline-none transition-all resize-none placeholder:text-white/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-accent text-white hover:bg-brand-hover text-xs font-space font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-brand-accent/10 cursor-pointer flex items-center justify-center gap-2"
                  >
                    Publicar Testimonio
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {submitSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-xl text-center"
                      >
                        <p className="text-[10.5px] font-space font-medium text-green-400">
                          ¡Testimonio publicado con éxito en la galería de abajo! Gracias por bendecir a otros.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

              {/* Vista previa en vivo */}
              <div className="lg:col-span-6 space-y-4">
                <span className="block text-[10px] font-space tracking-widest text-brand-gold uppercase text-left font-bold pl-1">
                  Vista Previa en Vivo
                </span>
                
                <div className="bg-gradient-to-b from-brand-card to-brand-bg border border-brand-accent/20 p-6 rounded-2xl space-y-4 relative overflow-hidden text-left shadow-sm min-h-[220px] flex flex-col justify-between">
                  <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="font-space text-[10px] text-brand-gold font-bold uppercase tracking-wider">
                        {newTagline || "Restauración"}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(newStars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#E8C96A] text-[#E8C96A]" />
                        ))}
                      </div>
                    </div>

                    <p className="text-[#FAF7F0] font-serif italic text-sm leading-relaxed min-h-[60px]">
                      {newQuote ? `“${newQuote}”` : "“Aquí se mostrará tu hermoso testimonio en tiempo real mientras lo redactas en el formulario de la izquierda...”"}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10/20 flex justify-between items-center">
                    <div>
                      <span className="block font-space text-[10px] text-[#FAF7F0] font-bold uppercase">
                        {newNombre || "Tu Nombre"}
                      </span>
                      <span className="block text-[9px] text-white/70 font-sans font-medium">
                        Tu Reseña • Borrador en vivo
                      </span>
                    </div>
                    <span className="bg-brand-accent/10 text-brand-gold border border-brand-accent/20 text-[8px] font-bold px-2 py-0.5 rounded-full font-space uppercase">
                      Borrador
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Galería de testimonios publicados */}
            <div className="space-y-4 pt-6 text-left">
              <h4 className="font-serif text-lg font-light text-[#FAF7F0] border-b border-white/10 pb-2">
                Galería de Historias de <span className="text-brand-gold italic">Gracia</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonios.map((t: any) => (
                  <div key={t.id} className="bg-brand-dark-2/60 border border-white/10 p-5 rounded-2xl space-y-3 relative overflow-hidden flex flex-col justify-between hover:border-white/25 transition-all">
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center border-b border-white/10/20 pb-2">
                        <span className="font-space text-[9px] text-brand-gold font-bold uppercase tracking-wider">
                          {t.tagline}
                        </span>
                        <div className="flex items-center gap-0.5">
                          {[...Array(t.stars)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#E8C96A] text-[#E8C96A]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#FAF7F0]/90 font-serif italic text-xs leading-relaxed">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10/20 flex justify-between items-center">
                      <div>
                        <span className="block font-space text-[9px] text-[#FAF7F0] font-bold uppercase">{t.name}</span>
                        <span className="block text-[8px] text-white/70 font-sans">{t.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

        </>
      ) : (
        <Devocional365 onBackToHome={() => {
          setCurrentView("home");
          animateScroll(0, 850);
        }} />
      )}

      {/* FOOTER */}
      <footer className="bg-brand-bg border-t border-brand-border/50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-left">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-full border border-brand-accent/30 bg-brand-dark flex items-center justify-center">
                <span className="font-serif font-semibold text-xs text-[#FAF7F0]">LR</span>
              </div>
              <span className="font-serif font-medium text-base text-brand-text">Levántate Resplandece</span>
            </div>
            
            <p className="text-brand-muted text-xs leading-relaxed max-w-sm">
              Una plataforma creada bajo la premisa de Isaías 60:1. Promovemos el crecimiento personal espiritual 
              y la sanidad integral a través del sabio consejo bíblico y la mayordomía emocional.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="block font-space text-[10px] text-brand-accent uppercase tracking-widest font-bold">Enlaces Directos</span>
            <ul className="text-xs text-brand-muted space-y-2">
              <li>
                <button
                  onClick={() => {
                    setCurrentView("devocional365");
                    animateScroll(0, 850);
                  }}
                  className="hover:text-brand-accent transition-colors"
                >
                  Devocional 365
                </button>
              </li>
              <li>
                <button onClick={() => scrollToAnchor("recursos-seccion")} className="hover:text-brand-accent transition-colors">
                  Recursos
                </button>
              </li>
              <li>
                <button onClick={() => scrollToAnchor("sobre-seccion")} className="hover:text-brand-accent transition-colors">
                  Sobre Josué
                </button>
              </li>
              <li>
                <button onClick={() => scrollToAnchor("contacto-seccion")} className="hover:text-brand-accent transition-colors">
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="block font-space text-[10px] text-brand-accent uppercase tracking-widest font-bold">Respaldo Confesional</span>
            <p className="text-brand-muted text-[11px] leading-relaxed">
              El material provisto en este sitio no sustituye el acompañamiento psiquiátrico calificado en emergencias críticas. 
              Nuestra labor se enmarca estrictamente en la pastoral bíblica, el mentoring relacional y la reconciliación familiar.
            </p>
            <div className="pt-2 text-[10px] text-brand-accent font-space">
              levantateresplandecepagina@gmail.com
            </div>
          </div>

        </div>

        {/* Legal block */}
        <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-brand-border/30 flex flex-col md:flex-row justify-between items-center text-[10.5px] text-brand-muted font-space gap-4">
          <span>&copy; {new Date().getFullYear()} Levántate Resplandece. Todos los derechos reservados.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-accent">Política de Privacidad</a>
            <span>•</span>
            <a href="#" className="hover:text-brand-accent">Términos de Servicio</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
