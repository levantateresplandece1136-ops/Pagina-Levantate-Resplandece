import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  User, 
  Mail, 
  HelpCircle, 
  Send, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  BookmarkCheck,
  HeartHandshake,
  HeartPulse,
  Info
} from "lucide-react";
import { CounselingRequest } from "../types";

export default function PastoralContact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  
  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [ageGroup, setAgeGroup] = useState("30-45");
  const [counselingArea, setCounselingArea] = useState("Personal");
  const [urgency, setUrgency] = useState("Normal");
  const [message, setMessage] = useState("");

  const faqs = [
    {
      q: "¿Qué diferencia hay entre la consejería bíblica y la psicología tradicional?",
      a: "La consejería bíblica enfoca el bienestar de la persona reconociendo su dimensión espiritual además de la mental y física. Mientras que los enfoques terapéuticos se centran únicamente en el comportamiento y teorías humanas, nosotros utilizamos la Revelación de Dios (las Escrituras) como el cimiento último de verdad y sanidad del alma. Entendemos al ser humano con ternura, pero dirigiendo siempre sus anhelos al carácter de Jesucristo."
    },
    {
      q: "¿La consejería pastoral tiene costo? ¿Es confidencial?",
      a: "El discernimiento bíblico y el acompañamiento pastoral son ministerios de gracia. Ofrecemos sesiones de orientación inicial completamente gratuitas para guiar diagnósticos relacionales. Al igual que con cualquier otra orientación bajo ordenación eclesiástica, mantenemos un estándar de confidencialidad absoluto bajo secreto de confesión bíblica tradicional."
    },
    {
      q: "¿Cómo son las sesiones y bajo qué modalidad se efectúan?",
      a: "Para la comodidad de todo hispanohablante a nivel global, realizamos sesiones interactivas virtuales seguras por videollamada de 50 minutos. Si te encuentras en un radio geográfico inmediato, es posible planificar consultas presenciales periódicas en nuestras oficinas pastorales autorizadas."
    },
    {
      q: "¿Necesito pertenecer a alguna congregación eclesial específica?",
      a: "De ningún modo. Las herramientas espirituales de 'Levántate Resplandece' están abiertas a todo adulto, líder o familia en busca de orden y reconciliación personal, independientemente de su trasfondo eclesiástico o etapa de escepticismo actual."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const handleResetForm = () => {
    setFullName("");
    setEmail("");
    setMessage("");
    setFormSubmitted(false);
  };

  return (
    <div id="contacto-seccion" className="py-20 bg-brand-alt border-t border-brand-border scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-space text-xs text-brand-accent tracking-[0.25em] uppercase">MENTORÍA & ORIENTACIÓN</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-text mt-3">
            Caminar en <span className="text-brand-accent italic font-normal">Comunidad</span>
          </h2>
          <p className="text-brand-muted text-sm mt-4">
            La transformación personal raramente ocurre en el aislamiento. Encuentra respuestas a tus dudas pastorales 
            o solicita una cita de orientación personalizada de 30 minutos sin coste alguno.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* FAQ Column (Left Side) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-1.5 border-b border-brand-border pb-4">
              <span className="font-space text-[10px] text-brand-accent uppercase tracking-widest block">CONOCIMIENTO COMPARTIDO</span>
              <h3 className="font-serif text-2xl text-brand-text">Preguntas Frecuentes</h3>
              <p className="text-xs text-brand-muted">Entiende nuestro enfoque de salud integral espiritual-emocional.</p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="bg-brand-card border border-brand-border rounded-xl transition-all duration-300"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4.5 text-left text-sm font-serif text-brand-text hover:text-brand-accent transition-colors"
                    >
                      <span className="font-semibold pr-4 leading-relaxed">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-brand-accent shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4.5 pt-0 border-t border-brand-border/40 text-xs text-brand-muted font-sans leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Quality Certification */}
            <div className="bg-brand-card/45 border border-brand-border p-5 rounded-2xl flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <h4 className="font-space text-xs text-brand-text uppercase font-bold">Reserva Confesional Garantizada</h4>
                <p className="text-[11px] text-brand-muted leading-relaxed">
                  Todo el intercambio de información y diarios de consejería están protegidos por el fuero interno de la teología reformada tradicional, respetando la total confidencialidad e intimidad relacional de cada consultante.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Appointment Form (Right Side) */}
          <div className="lg:col-span-6 bg-brand-card border border-brand-border rounded-3xl p-6 md:p-8 relative shadow-xl">
            
            {/* Visual Accent */}
            <div className="absolute top-0 right-10 w-24 h-1 bg-brand-accent rounded-b-full" />

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-brand-text">Solicitud de Orientación</h3>
                  <p className="text-xs text-brand-muted font-space">Agenda una llamada de orientación pastoral privada de 30 minutos.</p>
                </div>

                <div className="space-y-4">
                  {/* Name field */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-space text-brand-accent uppercase block">Nombre Completo</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Ej. Carlos Martínez"
                          className="w-full bg-brand-bg text-brand-text pl-9 pr-3.5 py-2.5 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none text-xs text-brand-text transition-colors"
                        />
                        <User className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-3.5" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-space text-brand-accent uppercase block">Correo Electrónico</label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="ejemplo@correo.com"
                          className="w-full bg-brand-bg text-brand-text pl-9 pr-3.5 py-2.5 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none text-xs text-brand-text transition-colors"
                        />
                        <Mail className="w-3.5 h-3.5 text-brand-muted absolute left-3 top-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Selector field */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-space text-brand-accent uppercase block">Rango de Edad</label>
                      <select
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                        className="w-full bg-brand-bg text-brand-text px-3.5 py-3.5 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none text-xs transition-colors"
                      >
                        <option value="18-29">18 - 29 años</option>
                        <option value="30-45">30 - 45 años</option>
                        <option value="46-55">46 - 55 años</option>
                        <option value="56+">Más de 55 años</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-space text-brand-accent uppercase block">Área de Apoyo</label>
                      <select
                        value={counselingArea}
                        onChange={(e) => setCounselingArea(e.target.value)}
                        className="w-full bg-brand-bg text-brand-text px-3.5 py-3.5 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none text-xs transition-colors"
                      >
                        <option value="Personal">Crecimiento Personal</option>
                        <option value="Emocional">Estrés o Ansiedad</option>
                        <option value="Matrimonial">Límites / Matrimonio</option>
                        <option value="Paternidad">Crianza Familiar</option>
                        <option value="Ministerio">Mentoring Ministerial</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-space text-brand-accent uppercase block">Urgencia Sugerida</label>
                      <select
                        value={urgency}
                        onChange={(e) => setUrgency(e.target.value)}
                        className="w-full bg-brand-bg text-brand-text px-3.5 py-3.5 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none text-xs transition-colors"
                      >
                        <option value="Informativa">Solo Informativo</option>
                        <option value="Normal">Ritmo Normal</option>
                        <option value="Prioritaria">Prioritaria</option>
                      </select>
                    </div>
                  </div>

                  {/* Context Textarea */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-space text-brand-accent uppercase block">Describe tu necesidad brevemente</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Comparte con confianza qué área te gustaría enfocar en la consulta. Toda palabra vertida aquí está protegida bajo reserva total."
                      className="w-full bg-brand-bg text-brand-text px-3.5 py-2.5 rounded-xl border border-brand-border focus:border-brand-accent focus:outline-none text-xs text-brand-text transition-colors resize-none leading-relaxed"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-accent hover:bg-brand-hover text-brand-bg font-space text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "Tramitando tu espacio..." : "Enviar Solicitud Confidencial"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex justify-center items-center gap-1 text-[10px] text-brand-muted font-space mt-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Citas agendadas vía Zoom o Microsoft Teams.</span>
                </div>

              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="p-4 bg-brand-accent/15 border border-brand-accent/30 rounded-full text-brand-accent">
                  <BookmarkCheck className="w-12 h-12" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-brand-text">¡Solicitud Procesada!</h4>
                  <p className="text-sm text-brand-muted pl-4 pr-4 leading-relaxed font-sans max-w-sm">
                    Estimado/a <b>{fullName}</b>, tu propuesta de orientación pastoral respecto a <b>{counselingArea}</b> ha sido despachada con absoluta reserva de confesión.
                  </p>
                </div>

                <div className="p-4 bg-brand-bg border border-brand-border rounded-xl text-[11px] text-brand-muted leading-relaxed max-w-xs text-left space-y-2 font-sans">
                  <div className="flex items-center gap-1.5 font-space text-[10px] text-brand-accent uppercase font-bold">
                    <Info className="w-3.5 h-3.5" /> Próximo paso:
                  </div>
                  <p>
                    Revisa tu casilla <b>{email}</b> en un lapso no mayor a 24-48 horas hábiles. Nuestro asistente administrativo te enviará los tres horarios de disponibilidad disponibles para tu videollamada.
                  </p>
                </div>

                <button
                  onClick={handleResetForm}
                  className="bg-brand-accent hover:bg-brand-hover text-brand-bg font-space text-xs font-bold uppercase tracking-wider py-2.5 px-6 rounded-lg transition-all"
                >
                  Volver a Empezar
                </button>
              </motion.div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
