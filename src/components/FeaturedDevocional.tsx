import { BookOpen, Calendar, ArrowRight, Sparkles } from "lucide-react";

interface FeaturedDevocionalProps {
  onOpenDevocional: () => void;
}

export default function FeaturedDevocional({ onOpenDevocional }: FeaturedDevocionalProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-dark border-b border-white/15">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-gold font-space text-[10px] tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              Recurso destacado · 365 Días con Dios
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#FAF7F0] leading-tight">
              Conoce a Dios,{" "}
              <span className="text-brand-gold italic font-normal">conoce quién eres</span>
            </h2>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Un devocional diario para descubrir un atributo de Dios y profundizar en tu
              verdadera identidad en Él: Su inmutabilidad, Su omnisciencia, Su soberanía,
              Su santidad y Su fidelidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onOpenDevocional}
                className="inline-flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-hover text-white font-space text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl transition-all shadow-xl shadow-brand-accent/20 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                Lee el devocional de hoy
              </button>
              <button
                onClick={onOpenDevocional}
                className="inline-flex items-center justify-center gap-2 bg-brand-dark hover:bg-brand-dark-2 text-brand-gold border border-white/20 font-space text-xs font-bold uppercase tracking-wider py-4 px-8 rounded-xl transition-all cursor-pointer"
              >
                Recibirlo cada día por WhatsApp o correo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Día 1 — muestra */}
          <div className="lg:col-span-6">
            <div className="bg-brand-dark-2 border border-brand-accent/25 rounded-3xl p-6 md:p-8 shadow-xl shadow-brand-accent/[0.06] space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-space text-[10px] text-brand-gold font-bold uppercase tracking-widest">
                  Día 1 · Su Inmutabilidad
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-space uppercase tracking-wider text-white/70">
                  <Calendar className="w-3.5 h-3.5" />
                  Muestra gratuita
                </span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-[#FAF7F0] leading-tight">
                La Roca inamovible de tu identidad
              </h3>
              <p className="font-serif italic text-brand-gold text-sm md:text-base leading-relaxed">
                Malaquías 3:6 — “Porque yo Jehová no cambio; por esto, hijos de Jacob, no
                habéis sido consumidos.”
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                Es fácil despertar sintiendo que todo en tu vida es un castillo de naipes.
                Los ánimos suben y bajan, las opiniones de la gente cambian en un par de
                clics, y el temor de que tu mundo colapse puede paralizarte.
              </p>
              <p className="text-[#FAF7F0] font-serif italic text-sm md:text-base leading-relaxed border-t border-white/10 pt-4">
                ¿En qué área de tu vida has estado sintiendo inestabilidad? Medita en que
                la inmutabilidad de Dios es el ancla segura para esa tormenta.
              </p>
              <button
                onClick={onOpenDevocional}
                className="inline-flex items-center gap-1.5 text-brand-gold font-space text-[11px] font-bold uppercase tracking-wider hover:gap-3 transition-all cursor-pointer"
              >
                Seguir leyendo el devocional
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
