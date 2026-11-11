// Redes y comunidad, versión resumida: solo enlaces de texto, sin tarjetas ni imágenes.
// Las URLs son las mismas que ya tenía el sitio.

const socialLinks = [
  {
    name: "YouTube",
    username: "@levantateresplandece9524",
    url: "https://youtube.com/@levantateresplandece9524?si=OtaYzZjlEMMlBz4L",
    description: "Mensajes, enseñanzas de gracia y reflexiones en video.",
  },
  {
    name: "TikTok",
    username: "@levantate.resplandece",
    url: "https://www.tiktok.com/@levantate.resplandece?is_from_webapp=1&sender_device=pc",
    description: "Consejo breve, directo y edificante para el día a día.",
  },
  {
    name: "Instagram",
    username: "@levantate._resplandece",
    url: "https://www.instagram.com/levantate._resplandece?igsh=MTJ4M3FvZnhyM3E0Nw==",
    description: "Infografías, recordatorios diarios y versículos inspiradores.",
  },
  {
    name: "Facebook",
    username: "Levántate Resplandece",
    url: "https://www.facebook.com/share/1VizuVdLJA/",
    description: "Una comunidad de apoyo donde compartimos estudios y devocionales.",
  },
  {
    name: "Spotify · Podcast",
    username: "Levántate Resplandece",
    url: "https://open.spotify.com/show/0ciqmTc1TK9LUkRSta2BuO?si=e8f6ac54cee44e55",
    description: "Escucha el podcast: profundiza en la Palabra y encuentra dirección pastoral en cada episodio.",
  },
];

export default function SocialCommunity() {
  return (
    <section id="comunidad-seccion" className="py-16 bg-brand-bg border-t border-brand-border/40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="font-space text-xs text-brand-accent tracking-[0.25em] uppercase">
            Conecta &amp; Crece
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-brand-text leading-tight">
            Sintoniza y sé parte de{" "}
            <span className="text-brand-accent italic font-normal">nuestra comunidad</span>
          </h2>
        </div>

        <ul className="max-w-3xl mx-auto divide-y divide-brand-border border-y border-brand-border">
          {socialLinks.map((link) => (
            <li key={link.name} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-6">
              <div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg font-semibold text-brand-text hover:text-brand-accent transition-colors"
                >
                  {link.name} <span className="text-brand-accent">→</span>
                </a>
                <span className="block text-[11px] font-space text-brand-accent">{link.username}</span>
                <p className="text-xs text-brand-muted leading-relaxed">{link.description}</p>
              </div>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 font-space text-[11px] font-bold uppercase tracking-wider text-brand-accent hover:text-brand-hover transition-colors"
              >
                Seguir
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
