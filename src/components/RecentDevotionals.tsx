import { Calendar, ArrowRight } from "lucide-react";

const devotionals = [
  {
    date: "11 nov 2026",
    title: "Un padre que ora en casa",
    verse: "Deuteronomio 6:6–7",
    url: "https://www.instagram.com/reel/DfmwAtXj5NZ/",
  },
  {
    date: "10 nov 2026",
    title: "Cuando la mente no se calla",
    verse: "Filipenses 4:6–7",
    url: "https://www.instagram.com/p/DfkKQPjD_Ap/",
  },
  {
    date: "9 nov 2026",
    title: "Nehemías: primero lloró, luego edificó",
    verse: "Nehemías 2:18",
    url: "https://www.instagram.com/reel/DfhgV5Vj_m1/",
  },
];

export default function RecentDevotionals() {
  return (
    <section
      id="devocionales-recientes"
      className="py-16 md:py-24 bg-brand-bg border-t border-brand-border scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="font-space text-xs text-brand-accent tracking-[0.25em] uppercase">
            Devocionales recientes
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-brand-text leading-tight">
            Palabra fresca para{" "}
            <span className="text-brand-accent italic font-normal">esta semana</span>
          </h2>
          <p className="text-brand-muted text-sm leading-relaxed">
            Los devocionales que compartimos a diario en Instagram, ahora también desde aquí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {devotionals.map((item) => (
            <article
              key={item.url}
              className="bg-brand-card border border-brand-border/40 rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/[0.05] transition-all"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-space uppercase tracking-wider text-brand-muted">
                  <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                  {item.date}
                </span>
                <h3 className="font-serif text-xl md:text-2xl font-light text-brand-text leading-snug">
                  {item.title}
                </h3>
                <p className="font-serif italic text-brand-accent text-sm">{item.verse}</p>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-brand-accent font-space text-[11px] font-bold uppercase tracking-wider hover:gap-3 transition-all"
              >
                Ver en Instagram
                <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
