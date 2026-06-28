import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  BookOpen, 
  Clock, 
  Heart, 
  ShieldCheck, 
  ArrowLeft, 
  ChevronRight, 
  Star, 
  Send, 
  CheckCircle, 
  Flame, 
  Compass, 
  UserCheck, 
  BookMarked,
  Volume2,
  Calendar
} from "lucide-react";

interface Devocional365Props {
  onBackToHome: () => void;
}

interface AttributeItem {
  id: string;
  name: string;
  biblicalTerm: string;
  description: string;
  lieBroken: string;
  identityStatement: string;
  bibleVerse: string;
  icon: React.ReactNode;
}

export default function Devocional365({ onBackToHome }: Devocional365Props) {
  // Subscription Form State
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberContact, setSubscriberContact] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("whatsapp");
  const [selectedHour, setSelectedHour] = useState("06:00 AM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // PDF Download State
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Active Attribute Card State
  const [activeAttrId, setActiveAttrId] = useState<string>("inmutabilidad");

  // Daily Devotional Sample State
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Attributes data
  const attributes: AttributeItem[] = [
    {
      id: "inmutabilidad",
      name: "Su Inmutabilidad",
      biblicalTerm: "Él no cambia jamás",
      description: "En un universo donde las estaciones cambian, las economías colapsan y las personas fallan o se alejan, Dios permanece exactamente igual ayer, hoy y por los siglos.",
      lieBroken: "“Todo a mi alrededor es inestable, las crisis guían mi futuro y estoy a merced del viento y del caos.”",
      identityStatement: "Estás seguro, anclado y protegido. Puedes construir tu vida sobre un cimiento firme que jamás se sacudirá ni se desmoronará.",
      bibleVerse: "Santiago 1:17 — “Toda buena dádiva y todo don perfecto desciende de lo alto, del Padre de las luces, en el cual no hay mudanza, ni sombra de variación.”",
      icon: <ShieldCheck className="w-5 h-5" />
    },
    {
      id: "omnisciencia",
      name: "Su Omnisciencia",
      biblicalTerm: "Él lo sabe todo",
      description: "Él conoce cada rincón de tu mente, tus mayores temores, tus secretos guardados en silencio, tu pasado y tus intenciones más íntimas antes de que las hables.",
      lieBroken: "“Si las personas supieran quién soy realmente, me rechazarían. Debo usar máscaras y actuar perfecto para ser amado.”",
      identityStatement: "Eres plenamente conocido y profundamente amado. No hay secreto tuyo que ahuyente la gracia redentora de tu Padre Celestial.",
      bibleVerse: "Salmo 139:1 — “Oh Jehová, tú me has examinado y conocido. Tú has conocido mi sentarme y mi levantarme...”",
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: "soberania",
      name: "Su Soberanía",
      biblicalTerm: "Él tiene el control absoluto",
      description: "Él reina sobre la historia, el tiempo, las naciones y las circunstancias individuales de tu vida. Nada escapa de Su mano protectora.",
      lieBroken: "“Mi vida está completamente arruinada por mis errores pasados, por las decisiones de otros o por la mala suerte.”",
      identityStatement: "Eres parte de un propósito eterno. Nada está perdido en manos de Dios; Él tiene el poder de redimir tus ruinas y convertirlas en un nuevo inicio.",
      bibleVerse: "Efesios 1:11 — “...habiendo sido predestinados conforme al propósito del que hace todas las cosas según el designio de su voluntad.”",
      icon: <Flame className="w-5 h-5" />
    },
    {
      id: "santidad",
      name: "Su Santidad",
      biblicalTerm: "Él es puro y perfecto",
      description: "Él es infinitamente puro, sin mancha de maldad ni injusticia. Es la luz suprema que disipa toda tiniebla y falsedad.",
      lieBroken: "“Soy demasiado sucio, indigno y defectuoso. Dios no quiere escucharme ni estar cerca de alguien tan quebrado como yo.”",
      identityStatement: "Eres apartado, limpio y digno por Su gracia. Jesús te vistió con Sus ropas perfectas para que entres confiado al trono de la gracia.",
      bibleVerse: "1 Pedro 1:15 — “Sino, como aquel que os llamó es santo, sed también vosotros santos en toda vuestra manera de vivir.”",
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: "fidelidad",
      name: "Su Fidelidad",
      biblicalTerm: "Él cumple todas Sus promesas",
      description: "Dios nunca rompe un pacto. Sus promesas de sustento, perdón, paz y provisión diaria son un hecho inquebrantable que no depende de tu desempeño.",
      lieBroken: "“Estoy huérfano y solo en esto. Todo depende de mis fuerzas y afanes, porque nadie velará realmente por mí.”",
      identityStatement: "Eres un hijo amparado, provisto y guardado. Tu porvenir está respaldado por el Dios que alimenta a las aves y viste los lirios del campo.",
      bibleVerse: "Lamentaciones 3:22-23 — “Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.”",
      icon: <Heart className="w-5 h-5" />
    }
  ];

  // Devotional samples
  const devotionals = [
    {
      day: 1,
      title: "La Roca inamovible de tu identidad",
      attribute: "Su Inmutabilidad",
      verse: "Malaquías 3:6 — “Porque yo Jehová no cambio; por esto, hijos de Jacob, no habéis sido consumidos.”",
      meditation: "Es fácil despertar sintiendo que todo en tu vida es un castillo de naipes. Los ánimos suben y bajan, las opiniones de la gente cambian en un par de clics, y el temor de que tu mundo colapse puede paralizarte. Pero hoy, detente un segundo. Tu valor y tu salvación no flotan en el mar de las circunstancias. Dios no se despertó hoy con una opinión diferente de ti que la de ayer. Él te amó ayer, te ama hoy y te amará mañana con la misma intensidad. Como Él es inmutable, tu identidad como Su hijo amado está sellada con cemento eterno. No tienes que ganarte Su favor de nuevo hoy.",
      reflection: "¿En qué área de tu vida has estado sintiendo inestabilidad? Medita en que la inmutabilidad de Dios es el ancla segura para esa tormenta.",
      affirmation: "“Como mi Padre no cambia, yo no tengo que temer al mañana. Estoy seguro, amado y firme en Su fidelidad.”"
    },
    {
      day: 2,
      title: "Plenamente conocido, infinitamente amado",
      attribute: "Su Omnisciencia",
      verse: "Salmo 139:23-24 — “Examíname, oh Dios, y conoce mi corazón; pruébame y conoce mis pensamientos...”",
      meditation: "A menudo nos escondemos. Escondemos nuestros errores detrás de sonrisas, nuestros fracasos detrás de filtros y nuestra vulnerabilidad bajo el manto del activismo. Vivimos aterrados de que, si alguien supiera 'todo' de nosotros, saldría huyendo. Sin embargo, Dios ya lo sabe todo. Conoce ese pensamiento egoísta de hace cinco minutos, conoce el error de tu juventud y las heridas que aún te duelen. Y aquí está la maravilla del Evangelio: conociéndote al máximo, te ama de igual manera. En Él encuentras un lugar seguro para desarmarte, llorar y ser restaurado. Su conocimiento no es para juzgarte, sino para liberarte de la pesada carga de fingir.",
      reflection: "Suelta la necesidad de presentarte perfecto ante Dios hoy. Entra en Su presencia en honestidad; Él ya te conoce y te abraza con gracia.",
      affirmation: "“Dios me conoce por completo y me ama sin condiciones. Puedo desarmar mis defensas y descansar en Su gracia.”"
    },
    {
      day: 3,
      title: "La soberanía sobre tus capítulos rotos",
      attribute: "Su Soberanía",
      verse: "Génesis 50:20 — “Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy...”",
      meditation: "Miramos hacia atrás y vemos cicatrices. Decisiones torpes que tomamos, injusticias dolorosas que otros cometieron contra nosotros o temporadas áridas que parecieron no tener sentido. El enemigo susurra que tu vida se desvió de su propósito y que ahora solo quedan sobras. Pero la soberanía de Dios significa que Él es el supremo Redentor. Él no desperdicia el dolor. Él toma los hilos rotos, las traiciones y los fracasos cotidianos, y los teje pacientemente en una historia de gracia y fortaleza. Tu peor temporada no tiene la última palabra; Dios es el autor de tu historia y aún está escribiendo capítulos hermosos de restauración sobre tus ruinas.",
      reflection: "Piensa en un suceso del pasado que considerabas un desastre sin sentido. Pídele a Dios que te ayude a ver Su mano soberana redimiéndolo.",
      affirmation: "“Mis errores y las heridas del pasado no frustran el plan de Dios. Él tiene el control y está redimiendo todo para mi bien.”"
    }
  ];

  const currentDevotional = devotionals.find(d => d.day === selectedDay) || devotionals[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberName || !subscriberContact) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 1500);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setDownloadSuccess(true);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div className="py-12 bg-brand-bg relative z-10">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-[5%] left-[10%] w-[350px] h-[350px] bg-brand-radial rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-space font-bold uppercase tracking-wider text-brand-muted hover:text-brand-accent transition-colors bg-brand-card hover:bg-brand-bg px-4 py-2.5 rounded-xl border border-brand-border cursor-pointer mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        {/* HERO SECTION / ATTRACTIVE HOOK */}
        <div className="space-y-6 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/25 px-4 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-brand-accent animate-pulse" />
            <span className="font-space text-[10px] uppercase tracking-widest text-brand-accent font-bold">
              Iniciativa Espiritual 365 Días
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light text-brand-text leading-tight">
            ¿Y si tu verdadera identidad comienza por conocer <span className="text-brand-accent italic font-normal">quién es Dios</span>?
          </h1>

          <p className="text-brand-muted text-sm sm:text-base md:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            La gran crisis del alma moderna proviene de una <strong>amnesia espiritual</strong>: intentamos construir nuestra identidad en base a nuestro desempeño, opiniones o fracasos, porque olvidamos los atributos de Aquel que nos diseñó. 
          </p>

          <div className="border-l-4 border-brand-accent bg-brand-card py-3.5 px-5 rounded-r-2xl max-w-2xl mx-auto text-left">
            <p className="text-xs md:text-sm font-serif italic text-brand-text leading-relaxed">
              &ldquo;No puedes entender con claridad quién eres tú frente al espejo, hasta que descubres Quién es Dios en Su trono. Conectar Sus atributos eternos con tu identidad diaria transforma las próximas 24 horas.&rdquo;
            </p>
          </div>
        </div>

        {/* RAZONES & MAPA INTERACTIVO ATRIBUTO-IDENTIDAD */}
        <div className="space-y-8 mb-20 text-left">
          <div className="space-y-2 border-b border-brand-border pb-4">
            <span className="font-space text-xs text-brand-accent tracking-widest uppercase font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-accent" /> El Puente de la Gracia
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-light text-brand-text">
              ¿Por qué es vital conocer a Dios en sus atributos?
            </h2>
            <p className="text-xs md:text-sm text-brand-muted leading-relaxed max-w-2xl">
              Nuestra identidad es un reflejo de lo que adoramos. Cuando comprendes un atributo divino, una mentira destructiva en tu interior se rompe y es reemplazada por una verdad sólida sobre quién eres tú. Haz clic en los atributos a continuación para experimentar esta alineación:
            </p>
          </div>

          {/* Interactive Attribute Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector buttons */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {attributes.map((attr) => {
                const isActive = activeAttrId === attr.id;
                return (
                  <button
                    key={attr.id}
                    onClick={() => setActiveAttrId(attr.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                      isActive 
                        ? "bg-brand-card border-brand-accent/50 shadow-md shadow-brand-accent/[0.02]" 
                        : "bg-white border-brand-border/65 hover:border-brand-accent/25 hover:bg-brand-card/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-colors ${
                        isActive ? "bg-brand-accent text-white" : "bg-brand-alt text-brand-muted group-hover:text-brand-accent"
                      }`}>
                        {attr.icon}
                      </div>
                      <div>
                        <span className="block font-serif font-bold text-sm text-brand-text">
                          {attr.name}
                        </span>
                        <span className="block text-[10px] font-space text-brand-muted uppercase tracking-wider">
                          {attr.biblicalTerm}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-all ${
                      isActive ? "text-brand-accent translate-x-1" : "text-brand-border group-hover:text-brand-muted"
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right details panel */}
            <div className="lg:col-span-7 bg-brand-card border border-brand-border rounded-2xl p-6 md:p-8 relative min-h-[350px] flex flex-col justify-between shadow-sm">
              <AnimatePresence mode="wait">
                {attributes.map((attr) => {
                  if (attr.id !== activeAttrId) return null;
                  return (
                    <motion.div
                      key={attr.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start border-b border-brand-border pb-3">
                          <div>
                            <span className="font-space text-[10px] text-brand-accent font-bold uppercase tracking-widest block">Atributo Divino</span>
                            <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-text">{attr.name}</h3>
                          </div>
                          <span className="bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider font-space">
                            {attr.biblicalTerm}
                          </span>
                        </div>

                        <p className="text-xs md:text-sm text-brand-muted leading-relaxed font-sans">
                          {attr.description}
                        </p>

                        <div className="space-y-3 pt-2">
                          <div className="bg-red-500/5 border border-red-500/10 p-3.5 rounded-xl text-left">
                            <span className="block text-[9px] font-space text-red-500 uppercase tracking-widest font-bold mb-1">La mentira que se quiebra:</span>
                            <p className="text-xs font-serif text-brand-text italic font-medium leading-relaxed">
                              {attr.lieBroken}
                            </p>
                          </div>

                          <div className="bg-green-500/5 border border-green-500/10 p-3.5 rounded-xl text-left">
                            <span className="block text-[9px] font-space text-green-500 uppercase tracking-widest font-bold mb-1">Tu verdadera identidad relacionada:</span>
                            <p className="text-xs font-sans text-brand-text font-semibold leading-relaxed flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                              <span>{attr.identityStatement}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-6 border-t border-brand-border/50 text-[11px] font-space text-brand-accent/90 italic flex items-center gap-1.5">
                        <BookMarked className="w-4 h-4 text-brand-accent/70 shrink-0" />
                        <span>{attr.bibleVerse}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* MOTIVACION: EL TIEMPO CON DIOS CORTO, PRECISO Y CONSTANTE */}
        <div className="bg-gradient-to-br from-brand-card to-white border border-brand-border rounded-3xl p-8 md:p-12 mb-20 text-left relative overflow-hidden shadow-sm">
          <div className="absolute top-[-40px] right-[-40px] w-48 h-48 bg-brand-radial rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="font-space text-[10px] text-brand-accent tracking-widest uppercase font-bold flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-accent" /> El Poder de la Constancia
              </span>
              
              <h2 className="text-2xl md:text-3.5xl font-serif font-light text-brand-text leading-tight">
                Menos ruido mental, <span className="text-brand-accent italic font-normal">más anclaje</span>: Solo 5 minutos al día
              </h2>

              <p className="text-brand-muted text-xs md:text-sm leading-relaxed font-sans">
                Creemos erróneamente que para tener una comunión real con Dios necesitamos horas de aislamiento o un conocimiento teológico inalcanzable. Pero Dios no busca tu cansancio, busca tu constancia. Un momento diario corto, preciso y atrayente enfoca tu mente, rompe el afán del día y le recuerda a tu corazón de quién eres hijo.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent flex items-center justify-center text-xs font-bold font-space shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-brand-text">1 Minuto: Detente & Respira</h4>
                    <p className="text-[11px] text-brand-muted font-sans leading-relaxed">Apaga notificaciones, silencia tus preocupaciones y enfoca tu mente en Quién es Dios.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent flex items-center justify-center text-xs font-bold font-space shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-brand-text">2 Minutos: Alimenta tu Mente</h4>
                    <p className="text-[11px] text-brand-muted font-sans leading-relaxed">Lee un atributo diario corto de la Palabra y aprende cómo destruye la mentira del enemigo.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent flex items-center justify-center text-xs font-bold font-space shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-brand-text">2 Minutos: Afirma tu Identidad</h4>
                    <p className="text-[11px] text-brand-muted font-sans leading-relaxed">Ora declarando activamente quién eres tú hoy gracias a lo que Él es eternamente.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-brand-bg border border-brand-border p-6 rounded-2xl w-full max-w-sm shadow-md text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 text-brand-accent mx-auto flex items-center justify-center">
                  <Flame className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-text">¿Por qué empezar hoy?</h3>
                <p className="text-brand-muted text-[11px] font-sans leading-relaxed">
                  Las decisiones difíciles, las tensiones con tus hijos o el estrés matrimonial se afrontan de manera diferente cuando inicias el día recordando que Dios cuida de ti.
                </p>
                <div className="border-t border-brand-border/40 pt-4 text-xs font-space font-bold text-brand-accent uppercase tracking-wider">
                  ¡Toma el desafío de 5 días de muestra abajo!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE DEVOTIONAL SAMPLES */}
        <div className="space-y-6 mb-20 text-left">
          <div className="space-y-1.5 border-b border-brand-border pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
            <div>
              <span className="font-space text-xs text-brand-accent tracking-widest uppercase font-bold flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-brand-accent" /> Muestra Interactiva
              </span>
              <h2 className="text-2xl md:text-3.5xl font-serif font-light text-brand-text">
                Prueba el Devocional de Hoy
              </h2>
            </div>

            {/* Day selectors */}
            <div className="flex gap-2 font-space text-[11px] font-bold">
              {[1, 2, 3].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4.5 py-2 rounded-xl border cursor-pointer transition-all ${
                    selectedDay === day
                      ? "bg-brand-accent text-white border-brand-accent shadow-md shadow-brand-accent/10"
                      : "bg-brand-card border-brand-border text-brand-muted hover:text-brand-text hover:bg-white"
                  }`}
                >
                  Día {day}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
            <div className="absolute top-4 right-4 text-[45px] sm:text-[60px] font-space font-bold text-brand-border/30 select-none pointer-events-none">
              0{selectedDay}
            </div>

            <div className="space-y-6 max-w-3xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-accent" />
                  <span className="font-space text-[10px] uppercase tracking-wider text-brand-accent font-bold">
                    {currentDevotional.attribute}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-text">
                  Día {currentDevotional.day}: {currentDevotional.title}
                </h3>
              </div>

              {/* Bible Verse Banner */}
              <div className="bg-brand-bg border border-brand-border/60 py-3 px-4.5 rounded-xl font-serif italic text-xs md:text-sm text-brand-text/90 leading-relaxed border-l-4 border-brand-accent">
                {currentDevotional.verse}
              </div>

              {/* Meditation Text */}
              <div className="space-y-3.5 text-xs sm:text-sm text-brand-muted leading-relaxed font-sans text-justify">
                <p>{currentDevotional.meditation}</p>
              </div>

              {/* Practical Reflection */}
              <div className="pt-4 border-t border-brand-border/30 space-y-2">
                <h4 className="font-space text-[10px] text-brand-accent uppercase tracking-widest font-bold">Pregunta de Reflexión Práctica</h4>
                <p className="text-xs font-serif text-brand-text leading-relaxed italic">
                  {currentDevotional.reflection}
                </p>
              </div>

              {/* Affirmation Box */}
              <div className="bg-brand-radial/50 border border-brand-accent/20 p-4.5 rounded-2xl flex items-start gap-3.5 text-left">
                <UserCheck className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-space text-brand-accent uppercase tracking-widest font-bold mb-1">Afirmación de Identidad Diaria</span>
                  <p className="text-xs sm:text-sm font-sans font-semibold text-brand-text">
                    {currentDevotional.affirmation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA HUB & DELIVERY FORM */}
        <div id="desafio-registro" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
          
          {/* Left Block: Join the Daily Devotional Community */}
          <div className="lg:col-span-7 bg-brand-card border border-brand-border rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm">
            <div className="space-y-2">
              <span className="font-space text-[10px] text-brand-accent tracking-widest uppercase font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-brand-accent" /> Comunidad de Restauración
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-light text-brand-text">
                Recibe el Devocional Diario gratis
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Únete a miles de personas que inician su mañana edificando su fe. Recibe un mensaje diario corto, preciso y atrayente directamente en tu canal de preferencia.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form 
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 pt-1"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-space uppercase tracking-wider text-brand-muted font-bold">
                        Tu Nombre
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Andrés o Familia Ruiz"
                        value={subscriberName}
                        onChange={(e) => setSubscriberName(e.target.value)}
                        className="w-full bg-white border border-brand-border focus:border-brand-accent/50 rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none transition-all placeholder:text-brand-muted/40"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-space uppercase tracking-wider text-brand-muted font-bold">
                        Número de Teléfono o Correo
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. +52 55 1234 5678 o email@ejemplo.com"
                        value={subscriberContact}
                        onChange={(e) => setSubscriberContact(e.target.value)}
                        className="w-full bg-white border border-brand-border focus:border-brand-accent/50 rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none transition-all placeholder:text-brand-muted/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[9px] font-space uppercase tracking-wider text-brand-muted font-bold">
                        Medio de Entrega Preferido
                      </label>
                      <select
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                        className="w-full bg-white border border-brand-border focus:border-brand-accent/50 rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none transition-all cursor-pointer font-sans"
                      >
                        <option value="whatsapp">WhatsApp (Mensaje Directo)</option>
                        <option value="email">Correo Electrónico (Boletín)</option>
                        <option value="telegram">Telegram (Canal)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] font-space uppercase tracking-wider text-brand-muted font-bold">
                        Hora Preferida de Envío
                      </label>
                      <select
                        value={selectedHour}
                        onChange={(e) => setSelectedHour(e.target.value)}
                        className="w-full bg-white border border-brand-border focus:border-brand-accent/50 rounded-xl px-4 py-2.5 text-xs text-brand-text focus:outline-none transition-all cursor-pointer font-sans"
                      >
                        <option value="05:00 AM">05:00 AM (Madrugador)</option>
                        <option value="06:00 AM">06:00 AM (Predeterminado)</option>
                        <option value="07:00 AM">07:00 AM (Inicio de Rutina)</option>
                        <option value="08:00 AM">08:00 AM (Camino al Trabajo)</option>
                        <option value="09:00 PM">09:00 PM (Devocional Nocturno)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-accent text-white hover:bg-brand-hover text-xs font-space font-bold uppercase tracking-widest py-3 px-6 rounded-xl transition-all shadow-md shadow-brand-accent/10 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Conectando...</span>
                      </>
                    ) : (
                      <>
                        <span>Comenzar mi Desafío Gratis</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/5 border border-green-500/20 p-6 rounded-2xl text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500/15 text-green-500 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-serif font-bold text-lg text-brand-text">¡Inscripción Exitosa!</h4>
                    <p className="text-xs text-brand-muted leading-relaxed max-w-sm mx-auto">
                      Hola <strong>{subscriberName}</strong>, te hemos inscrito correctamente. A partir de mañana a las <strong>{selectedHour}</strong> comenzarás a recibir el devocional 365 Días vía <strong>{deliveryMethod.toUpperCase()}</strong> en tu contacto <strong>{subscriberContact}</strong>.
                    </p>
                  </div>
                  <div className="text-[10px] font-space text-brand-accent uppercase tracking-widest font-bold">
                    ¡Prepara tu corazón para ver la fidelidad de Dios!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Block: Simulated PDF resource download */}
          <div className="lg:col-span-5 bg-gradient-to-b from-brand-card to-white border border-brand-border rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between shadow-sm min-h-[350px]">
            <div className="space-y-3">
              <span className="font-space text-[10px] text-brand-accent tracking-widest uppercase font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-brand-accent" /> Recurso de Estudio Adicional
              </span>
              <h3 className="text-xl font-serif font-bold text-brand-text leading-tight">
                Guía de Atributos & Identidad (PDF)
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Obtén un resumen imprimible de alta definición que contiene los 25 atributos principales de Dios mapeados con sus correspondientes afirmaciones de identidad. Ideal para pegar en tu espejo, diario o refrigerador.
              </p>
            </div>

            <div className="space-y-4">
              {/* Progress bar when downloading */}
              {isDownloading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-space text-brand-accent uppercase font-bold">
                    <span>Generando PDF...</span>
                    <span>{downloadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-accent transition-all duration-200"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {downloadSuccess && (
                <div className="bg-green-500/5 border border-green-500/10 p-3 rounded-xl text-center">
                  <span className="text-[10px] font-space font-medium text-green-600 block">
                    ¡Descarga Iniciada Correctamente!
                  </span>
                </div>
              )}

              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full bg-brand-bg text-brand-text hover:bg-brand-accent hover:text-white border border-brand-border hover:border-brand-accent text-xs font-space font-bold uppercase tracking-widest py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Descargar Guía de Atributos</span>
                <Clock className="w-4 h-4 shrink-0" />
              </button>
            </div>

            <div className="pt-4 border-t border-brand-border/40 text-center">
              <p className="text-[10px] text-brand-muted font-sans italic">
                Formato PDF de alta resolución • 14 páginas • Completamente Gratuito.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
