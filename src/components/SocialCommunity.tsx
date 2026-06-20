import React from "react";
import { motion } from "motion/react";
import { 
  Youtube, 
  Facebook, 
  Instagram, 
  Play, 
  Radio, 
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function SocialCommunity() {
  const socialLinks = [
    {
      name: "YouTube",
      url: "https://youtube.com/@levantateresplandece9524?si=OtaYzZjlEMMlBz4L",
      icon: <Youtube className="w-5 h-5 text-[#FF0000]" />,
      username: "@levantateresplandece9524",
      description: "Mensajes, enseñanzas de gracia y reflexiones en video.",
      bgHover: "hover:border-[#FF0000]/30 hover:bg-[#FF0000]/5",
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@levantate.resplandece?is_from_webapp=1&sender_device=pc",
      icon: (
        <svg className="w-5 h-5 text-brand-text fill-current" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.15 2.27 1.93 3.73 2.19v3.91c-1.27-.08-2.52-.52-3.56-1.26a8.04 8.04 0 0 1-2.54-2.82c-.04 1.76-.02 3.53-.03 5.29s.02 3.52-.03 5.29c-.06 1.45-.55 2.89-1.42 4.07-1.12 1.48-2.84 2.45-4.71 2.65-2.01.21-4.08-.34-5.63-1.66-1.57-1.31-2.47-3.34-2.46-5.38.01-1.92.79-3.8 2.15-5.15C5.35 10.15 7.15 9.3 9 9.32a8.55 8.55 0 0 1 1.7.17v4.06c-.52-.16-1.07-.22-1.62-.17-1.04.1-2.02.66-2.6 1.53-.55.83-.69 1.88-.39 2.84.3.97 1.05 1.77 2 2.14 1.04.41 2.25.21 3.12-.49.77-.61 1.17-1.59 1.19-2.57.03-2.61.01-5.23.02-7.84.01-2.98.01-5.97.03-8.96z"/>
        </svg>
      ),
      username: "@levantate.resplandece",
      description: "Consejo breve, directo y edificante para el día a día.",
      bgHover: "hover:border-black/30 hover:bg-black/5",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/levantate._resplandece?igsh=MTJ4M3FvZnhyM3E0Nw==",
      icon: <Instagram className="w-5 h-5 text-[#E1306C]" />,
      username: "@levantate._resplandece",
      description: "Infografías, recordatorios diarios y versículos inspiradores.",
      bgHover: "hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1VizuVdLJA/",
      icon: <Facebook className="w-5 h-5 text-[#1877F2]" />,
      username: "Levántate Resplandece",
      description: "Una comunidad de apoyo donde compartimos estudios y devocionales.",
      bgHover: "hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5",
    }
  ];

  return (
    <section id="comunidad-seccion" className="relative py-20 bg-brand-card border-b border-brand-border/40 overflow-hidden">
      {/* Background soft styling */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-radial rounded-full blur-[120px] pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-brand-radial rounded-full blur-[100px] pointer-events-none opacity-60" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-space text-xs text-brand-accent tracking-[0.25em] uppercase">CONECTA & CRECE</span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-brand-text mt-3">
            Sintoniza y Sé Parte de <span className="text-brand-accent italic font-normal">Nuestra Comunidad</span>
          </h2>
          <p className="text-brand-muted text-sm mt-3.5 leading-relaxed font-sans">
            Llevamos el mensaje de restauración y fe a todos los espacios digitales. 
            Te invitamos a sintonizarnos y seguirnos de forma directa en nuestras plataformas oficiales.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Spotify Highlight Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-brand-bg rounded-3xl border border-brand-border shadow-xl shadow-brand-accent/[0.02] relative overflow-hidden group">
            {/* Spotify Green/Accent gradient accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#1DB954]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#1DB954]/10 transition-colors" />
            
            <div className="space-y-6">
              {/* Top Row with Podcast badge */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20 text-[#1DB954] text-[10px] font-space font-bold uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  Podcast Disponible
                </div>
                
                {/* Spotify SVG icon */}
                <svg className="w-8 h-8 text-[#1DB954] fill-current" viewBox="0 0 24 24">
                  <path d="M12.01 0C5.38 0 0 5.38 0 12c0 6.63 5.38 12 12.01 12 6.63 0 12-5.37 12-12C24.01 5.38 18.64 0 12.01 0zm5.49 17.3c-.22.35-.67.47-1.02.24-2.81-1.72-6.35-2.11-10.52-1.16-.4.09-.8-.16-.89-.56-.09-.4.16-.8.56-.89 4.56-1.04 8.46-.59 11.62 1.35.35.21.46.67.25 1.02zm1.46-3.26c-.27.44-.85.58-1.29.3-3.22-1.98-8.12-2.55-11.93-1.4-1 .3-1.58-.28-1.58-.78s.27-.99.78-1.15c4.35-1.32 9.76-.68 13.48 1.61.44.27.59.85.3 1.29.01.01.01.01 0 0zm.13-3.4c-3.86-2.29-10.23-2.5-13.93-1.38-.59.18-1.22-.15-1.4-.74-.18-.59.15-1.22.74-1.4 4.25-1.29 11.29-1.05 15.74 1.59.53.31.71 1 .4 1.53-.31.53-1 .71-1.53.4h-.02z"/>
                </svg>
              </div>

              {/* Title & description */}
              <div className="space-y-3">
                <span className="font-space text-xs text-brand-accent tracking-wider font-bold">ESCUCHA NUESTRO PODCAST</span>
                <h3 className="text-3xl font-serif font-bold text-brand-text leading-tight group-hover:text-brand-accent transition-colors">
                  Levántate Resplandece
                </h3>
                <p className="text-brand-muted text-xs md:text-sm leading-relaxed font-sans">
                  Profundiza en la palabra, confronta las creencias limitantes y encuentra dirección pastoral en cada episodio de audio diseñado especialmente para tu renovación espiritual.
                </p>
              </div>

              {/* Visual Simulated Track Card */}
              <div className="bg-brand-card/80 rounded-2xl p-4 border border-brand-border/60 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1DB954]/10 border border-[#1DB954]/10 flex items-center justify-center shrink-0">
                  <Play className="w-4 h-4 text-[#1DB954] fill-[#1DB954]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-[11px] font-space text-[#1DB954] font-bold uppercase tracking-wider">Episodio Reciente</span>
                  <span className="block text-xs font-serif font-bold text-brand-text truncate">Volver a Dios en tiempos de crisis</span>
                </div>
              </div>
            </div>

            {/* CTA Spotify Button */}
            <div className="mt-8 pt-4">
              <a 
                href="https://open.spotify.com/show/0ciqmTc1TK9LUkRSta2BuO?si=e8f6ac54cee44e55" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 bg-[#1DB954] hover:bg-[#1bd760] text-white font-space text-xs font-bold uppercase tracking-wider py-4 px-6 rounded-2xl transition-all shadow-lg shadow-[#1DB954]/10 hover:shadow-[#1DB954]/25 cursor-pointer text-center"
              >
                Escuchar en Spotify
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Other social networks grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-6 bg-brand-bg rounded-2xl border border-brand-border flex flex-col justify-between text-left transition-all hover:translate-y-[-2px] hover:shadow-lg ${link.bgHover} group`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="p-2.5 rounded-xl bg-brand-card border border-brand-border/80 group-hover:bg-white transition-colors">
                      {link.icon}
                    </div>
                    <span className="text-[10px] text-brand-muted font-space group-hover:text-brand-accent transition-colors flex items-center gap-1">
                      Seguir <ArrowRight className="w-3 h-3 text-brand-muted/70 group-hover:text-brand-accent transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-serif text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors">
                      {link.name}
                    </h4>
                    <span className="block text-[10px] font-space text-brand-accent">
                      {link.username}
                    </span>
                  </div>

                  <p className="text-[11px] text-brand-muted leading-relaxed font-sans">
                    {link.description}
                  </p>
                </div>
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
