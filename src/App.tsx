import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  BookOpen, 
  Compass, 
  HelpCircle, 
  MessageSquare, 
  ChevronRight, 
  Heart, 
  ShieldCheck, 
  Menu, 
  X,
  UserCheck,
  Star,
  ArrowRight,
  Bookmark,
  Calendar,
  Layers,
  Award
} from "lucide-react";
import { ebooksData } from "./data";
import ResourceLibrary from "./components/ResourceLibrary";
import DiagnosticCenter from "./components/DiagnosticCenter";
import PastoralContact from "./components/PastoralContact";
import appLogo from "./assets/images/app_logo_1781233600045.jpg";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recommendedBookId, setRecommendedBookId] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Carlos & Elena Mendoza",
      age: "42 años",
      tagline: "Matrimonio Restaurado",
      quote: "Estábamos atrapados en un ciclo de reclamos y desconexión silenciosa. Los ejercicios de 'Límites Redentores' nos enseñaron a comunicarnos con una verdad desprovista de ira. La pauta pastoral del pastor Josue fue un oasis en nuestra crisis.",
      stars: 5
    },
    {
      name: "Dra. Sofía Rivas",
      age: "38 años",
      tagline: "Líder de Comunidad y Médico",
      quote: "Como profesional de la salud y mentora, sufría de un agotamiento silencioso. Creía erróneamente que estar exhausta era sinónimo de entrega fiel. Gracias al de autodiagnóstico y el libro 'Anclas del Alma', recuperé el descanso sagrado.",
      stars: 5
    },
    {
      name: "Andrés Delgado",
      age: "51 años",
      tagline: "Padre de dos adolescentes",
      quote: "Guiar a mis hijos en la era digital me parecía una batalla perdida. Las directivas de 'Padres de Luz' nos ayudaron a establecer santuarios de paz en casa, recuperando la sobremesa interactiva con diálogos profundos.",
      stars: 5
    }
  ];

  const handleRecommendBook = (bookId: string) => {
    setRecommendedBookId(bookId);
    // Scroll smooth to resources section
    const element = document.getElementById("recursos-seccion");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-brand-bg text-brand-text min-h-screen relative font-sans overflow-x-hidden selection:bg-brand-accent selection:text-brand-bg">
      
      {/* GLOBAL NAVBAR */}
      <header className="sticky top-0 z-40 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border/60">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Name */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-accent/40 shadow-md shadow-brand-accent/5 bg-white flex items-center justify-center">
              <img 
                src={appLogo} 
                alt="Logo Levántate Resplandece" 
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
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
          <nav className="hidden md:flex items-center gap-8 text-xs font-space uppercase tracking-wider">
            <button 
              onClick={() => scrollToAnchor("recursos-seccion")}
              className="text-brand-muted hover:text-brand-accent transition-colors"
            >
              Biblioteca
            </button>
            <button 
              onClick={() => scrollToAnchor("diagnosticos-seccion")}
              className="text-brand-muted hover:text-brand-accent transition-colors"
            >
              Autodiagnósticos
            </button>
            <button 
              onClick={() => scrollToAnchor("sobre-seccion")}
              className="text-brand-muted hover:text-brand-accent transition-colors"
            >
              Sobre Josue
            </button>
            <button 
              onClick={() => scrollToAnchor("contacto-seccion")}
              className="text-brand-muted hover:text-brand-accent transition-colors"
            >
              Citas & FAQ
            </button>
          </nav>

          {/* Contact Button Desktop */}
          <div className="hidden md:block">
            <a
              href="mailto:levantateresplandecepagina@gmail.com"
              className="inline-block bg-gradient-to-r from-brand-card to-brand-border hover:from-brand-accent hover:to-brand-hover text-brand-accent hover:text-brand-bg px-5 py-2.5 rounded-lg border border-brand-accent/30 hover:border-brand-hover font-space text-[10px] uppercase font-bold tracking-wider transition-all duration-300 shadow-md shadow-brand-accent/5 cursor-pointer text-center"
            >
              Contáctate
            </a>
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
                onClick={() => scrollToAnchor("recursos-seccion")}
                className="text-brand-muted hover:text-brand-accent py-2"
              >
                Biblioteca de Recursos
              </button>
              <button 
                onClick={() => scrollToAnchor("diagnosticos-seccion")}
                className="text-brand-muted hover:text-brand-accent py-2"
              >
                Diagnósticos Interactivos
              </button>
              <button 
                onClick={() => scrollToAnchor("sobre-seccion")}
                className="text-brand-muted hover:text-brand-accent py-2"
              >
                Sobre Josue
              </button>
              <button 
                onClick={() => scrollToAnchor("contacto-seccion")}
                className="text-brand-muted hover:text-brand-accent py-2"
              >
                Consultas & Preguntas
              </button>
              
              <a
                href="mailto:levantateresplandecepagina@gmail.com"
                className="w-full bg-brand-accent text-brand-bg font-bold py-3.5 rounded-xl text-xs uppercase tracking-widest mt-4 text-center block"
              >
                Contáctate
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EPIC HERO BANNER */}
      <section className="relative pt-16 pb-24 md:py-32 overflow-hidden bg-brand-bg">
        {/* Decorative Vector Radial Glows */}
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-radial/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[5%] left-[-10%] w-[450px] h-[450px] bg-[#1C3A5E]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          
          {/* Scripture Passage Quote */}
          <div className="mb-8 inline-flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="px-4 py-1.5 rounded-full bg-[#1C3A5E]/20 border border-brand-accent/20 text-brand-accent font-space text-[10px] tracking-[0.25em] uppercase mb-4"
            >
              Isaías 60:1
            </motion.div>
            
            <p className="font-serif italic font-light text-xl md:text-2xl text-brand-text/90 max-w-2xl px-4 leading-relaxed">
              &ldquo;Levántate, resplandece; porque ha venido tu luz, y la gloria del Señor ha nacido sobre ti.&rdquo;
            </p>
            <div className="w-16 h-px bg-brand-accent/30 mt-4" />
          </div>

          {/* Main Hero Hook */}
          <div className="max-w-4xl mx-auto space-y-6 mt-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-brand-text leading-[1.08] tracking-tight">
              Conocimiento que <span className="text-brand-accent italic font-normal">transforma</span>.<br />
              Recursos que <span className="text-brand-accent italic font-normal">acompañan</span>.
            </h1>
            
            <p className="text-brand-muted text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
              Te damos la bienvenida al ecosistema digital de recursos y autoevaluaciones de <b>Josue Cortés</b>. 
              Desarrollamos herramientas de consejería bíblica y crecimiento personal orientadas a la reconciliación y restauración de vidas.
            </p>
          </div>

          {/* CTA Action Splitters */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4.5 mt-10">
            <button
              onClick={() => scrollToAnchor("recursos-seccion")}
              className="w-full sm:w-auto bg-brand-accent hover:bg-brand-hover text-brand-bg font-space text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-xl shadow-brand-accent/5 cursor-pointer text-center"
            >
              Explorar Biblioteca Gratuita
            </button>
            <button
              onClick={() => scrollToAnchor("diagnosticos-seccion")}
              className="w-full sm:w-auto bg-brand-card hover:bg-brand-border border border-brand-border text-brand-text font-space text-xs hover:text-brand-accent py-4 px-8 rounded-xl transition-all cursor-pointer text-center"
            >
              Iniciar Autodiagnóstico
            </button>
          </div>

          {/* Devotional App Banner/Button */}
          <div className="mt-8 flex justify-center px-4">
            <a
              href="https://levantateresplandece.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-lg bg-gradient-to-r from-brand-card via-[#0A0D1A] to-brand-card hover:via-[#11162C] border-2 border-brand-accent/40 hover:border-brand-accent/80 rounded-2xl p-5 hover:translate-y-[-1px] transition-all duration-300 shadow-xl shadow-brand-accent/5 flex flex-col sm:flex-row items-center justify-between gap-4 group cursor-pointer text-center sm:text-left"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                  <span className="font-space text-[10px] uppercase tracking-widest text-brand-accent font-bold">
                    Aplicación Devocional Exclusiva
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                  365 Días con Dios
                </h3>
                <p className="text-[11px] text-brand-muted font-sans font-normal max-w-sm leading-relaxed">
                  Descubre diariamente un atributo de Dios y profundiza en tu verdadera identidad en Él.
                </p>
              </div>
              
              <div className="bg-brand-accent/10 group-hover:bg-brand-accent/20 border border-brand-accent/20 text-brand-accent px-4 py-2.5 rounded-xl font-space text-[11px] uppercase font-bold tracking-wider transition-colors flex items-center gap-1.5 whitespace-nowrap">
                Acceder a la App
                <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* DYNAMIC RESOURCE LIBRARY SECTION */}
      <ResourceLibrary 
        selectedBookId={recommendedBookId} 
        onClearSelectedBook={() => setRecommendedBookId(null)} 
      />

      {/* DYNAMIC DIAGNOSTIC CENTER */}
      <DiagnosticCenter onRecommendBook={handleRecommendBook} />

      {/* BIOGRAPHY / ABOUT THE PASTOR JOSUE */}
      <section id="sobre-seccion" className="py-24 bg-brand-bg border-t border-brand-border scroll-mt-20">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Editorial Styled Profile Cover */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-brand-bg to-transparent z-10" />
              
              {/* Gold decorative corner brackets */}
              <div className="absolute top-[-10px] left-[-10px] w-20 h-20 border-t-2 border-l-2 border-brand-accent pointer-events-none" />
              <div className="absolute bottom-[-10px] right-[-10px] w-20 h-20 border-b-2 border-r-2 border-brand-accent pointer-events-none" />

              <div className="bg-brand-card border border-brand-border rounded-2xl p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-[-30px] right-[-30px] w-48 h-48 bg-brand-accent/5 rounded-full blur-2xl" />
                
                {/* Profile Avatar / Credentials Logo */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#1C3A5E] to-brand-accent/40 border border-brand-accent flex items-center justify-center text-brand-accent">
                  <UserCheck className="w-10 h-10" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-2xl font-bold text-brand-text">Josue Cortés</h4>
                  <p className="text-xs font-space text-brand-accent uppercase tracking-wider">Pastor & Consejero Bíblico</p>
                </div>

                <p className="text-brand-muted font-serif italic text-xs leading-relaxed">
                  &ldquo;Acompaño a matrimonios y líderes en etapas de transición a desatar nudos relacionales mediante la teología de la gracia y pautas de salud mental ordenada.&rdquo;
                </p>

                <div className="space-y-2.5 pt-4 border-t border-brand-border text-[11px] font-space text-brand-muted">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Teólogo & Licenciado en Consejería Bíblica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
                    <span>Miembro activo de redes de mentoría pastoral</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Philosophy Text representation */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-space text-xs text-brand-accent tracking-[0.25em] uppercase">CONOCE AL AUTOR</span>
              <h2 className="text-4.5xl font-serif font-light text-brand-text leading-tight">
                El Pastor que <span className="text-brand-accent italic font-normal">Escucha</span> antes de <span className="text-brand-accent italic font-normal">Aconsejar</span>
              </h2>
              
              <div className="space-y-4 text-xs md:text-sm text-brand-muted leading-relaxed font-sans">
                <p>
                  Josue Cortés cuenta con más de dos décadas de dedicación al estudio filológico de las Escrituras, 
                  la pastoral familiar activa y la estructuración de talleres presenciales para líderes comunitarios. 
                  Su enfoque surge de una profunda convicción: la consejería bíblica debe carecer de legalismo restrictivo 
                  para en su lugar, abrazar una verdad restauradora y compasiva.
                </p>
                <p>
                  A través de su ecosistema <strong>Levántate Resplandece</strong>, Josue canaliza contenido escrito estructurado, 
                  autoevaluaciones adaptadas de diagnósticos clínicos-pastorales, y asesoría cercana para adultos hispanos en 
                  etapas críticas de fatiga vocacional o desgaste relacional en el hogar.
                </p>
              </div>

              {/* Quotes Testimonials Slider */}
              <div className="bg-brand-card border border-brand-border p-6 rounded-2xl space-y-4 relative overflow-hidden">
                <div className="flex justify-between items-center border-b border-brand-border/40 pb-3">
                  <span className="font-space text-[10px] text-brand-accent font-bold uppercase tracking-wider">Testimonios de Restauración</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E8C96A] text-[#E8C96A]" />
                    ))}
                  </div>
                </div>

                <p className="text-brand-text font-serif italic text-sm leading-relaxed">
                  &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                </p>

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <span className="block font-space text-[10px] text-brand-text font-bold uppercase">{testimonials[activeTestimonial].name}</span>
                    <span className="block text-[9px] text-brand-muted font-sans font-medium">{testimonials[activeTestimonial].tagline} • {testimonials[activeTestimonial].age}</span>
                  </div>

                  {/* Carousel Page dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonial(idx)}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${
                          activeTestimonial === idx ? "bg-brand-accent" : "bg-brand-border hover:bg-brand-muted"
                        }`}
                        title={`Ir al testimonio ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* PASTORAL CONTACT & DIAGNOSTICS FAQS */}
      <PastoralContact />

      {/* FOOTER */}
      <footer className="bg-brand-bg border-t border-brand-border/50 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 text-center md:text-left">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-accent/30 bg-white flex items-center justify-center">
                <img 
                  src={appLogo} 
                  alt="Logo Levántate Resplandece" 
                  className="w-full h-full object-cover scale-105"
                  referrerPolicy="no-referrer"
                />
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
                <button onClick={() => scrollToAnchor("recursos-seccion")} className="hover:text-brand-accent transition-colors">
                  Biblioteca de Ebooks
                </button>
              </li>
              <li>
                <button onClick={() => scrollToAnchor("diagnosticos-seccion")} className="hover:text-brand-accent transition-colors">
                  Autodiagnósticos de Salud
                </button>
              </li>
              <li>
                <button onClick={() => scrollToAnchor("sobre-seccion")} className="hover:text-brand-accent transition-colors">
                  Sobre Josue Cortés
                </button>
              </li>
              <li>
                <button onClick={() => scrollToAnchor("contacto-seccion")} className="hover:text-brand-accent transition-colors">
                  Consultas de Consejería
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
              contacto@levantateresplandece.org
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
