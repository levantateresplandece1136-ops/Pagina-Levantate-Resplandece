import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  HeartPulse, 
  Activity, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  RefreshCw,
  Compass,
  AlertTriangle,
  FileCheck2,
  Lock
} from "lucide-react";
import { diagnosticsData, ebooksData } from "../data";
import { Diagnostic, DiagnosticQuestion } from "../types";

interface DiagnosticCenterProps {
  onRecommendBook: (bookId: string) => void;
}

export default function DiagnosticCenter({ onRecommendBook }: DiagnosticCenterProps) {
  const [activeTab, setActiveTab] = useState<"test" | "rueda">("test");
  
  // Test State
  const [currentTestIndex, setCurrentTestIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [testResult, setTestResult] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  // Rueda State
  const [ruedaScores, setRuedaScores] = useState({
    espiritual: 7,
    familia: 6,
    emocional: 5,
    fisico: 7,
    vocacional: 8
  });
  const [ruedaResult, setRuedaResult] = useState<any | null>(null);

  const testInfo = diagnosticsData[0];

  // Handler for test option select
  const handleSelectOption = (questionId: number, score: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // Submit test
  const calculateTestResults = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let totalScore = 0;
      testInfo.questions.forEach(q => {
        totalScore += selectedAnswers[q.id] || 0;
      });

      // Find suitable interpretation
      const matched = testInfo.interpretations.find(
        inte => totalScore >= inte.minScore && totalScore <= inte.maxScore
      ) || testInfo.interpretations[testInfo.interpretations.length - 1];

      setTestResult({
        score: totalScore,
        maxScore: testInfo.questions.length * 4,
        interpretation: matched
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentTestIndex < testInfo.questions.length - 1) {
      setCurrentTestIndex(prev => prev + 1);
    } else {
      calculateTestResults();
    }
  };

  const handlePrevQuestion = () => {
    if (currentTestIndex > 0) {
      setCurrentTestIndex(prev => prev - 1);
    }
  };

  const handleResetTest = () => {
    setCurrentTestIndex(0);
    setSelectedAnswers({});
    setTestResult(null);
  };

  // Rueda Dimension Metadata
  const ruedaDimensions = [
    { key: "espiritual", label: "Conexión Espiritual & Fe", desc: "Tiempo a solas con Dios, lectura meditativa, oración sincera y asombro.", color: "from-blue-500 to-indigo-500" },
    { key: "familia", label: "Matrimonio & Núcleo Familiar", desc: "Calidad de conversación, resolución pacífica de conflictos y tiempo de presencia.", color: "from-amber-600 to-amber-400" },
    { key: "emocional", label: "Salud Emocional & Reposo", desc: "Manejo del estrés, límites asertivos, desconexión digital de pantallas.", color: "from-purple-500 to-pink-500" },
    { key: "fisico", label: "Bienestar Físico & Vitalidad", desc: "Horas estables de sueño, hábitos alimenticios sanos y actividad revitalizante.", color: "from-emerald-500 to-teal-500" },
    { key: "vocacional", label: "Vocación, Finanzas & Límites", desc: "Satisfacción laboral, administración sabia de ingresos y control de horas extras.", color: "from-yellow-600 to-yellow-400" }
  ];

  const handleRuedaChange = (key: string, val: number) => {
    setRuedaScores(prev => ({
      ...prev,
      [key]: val
    }));
  };

  // Submit Rueda
  const handleCalculateRueda = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      // Find lowest and highest
      const entries = Object.entries(ruedaScores) as [string, number][];
      const lowest = entries.reduce((min, entry) => entry[1] < min[1] ? entry : min, entries[0]);
      const average = entries.reduce((sum, entry) => sum + entry[1], 0) / entries.length;

      let guidance = "";
      let challenge = "";
      let bookId = "anclas-del-alma";

      if (lowest[0] === "espiritual") {
        guidance = "Tu pozo espiritual se encuentra desgastado por la prisa cotidiana. Jesús enseñó que separados de la vid nada podemos hacer. Estás intentando nutrir tu vida con técnicas humanas en lugar de reposar en Su gracia primordial.";
        challenge = "Separa 10 minutos al iniciar la mañana lejos del teléfono, tan solo respirando y leyendo un solo versículo bíblico en calma.";
        bookId = "mesa-de-la-escucha";
      } else if (lowest[0] === "familia") {
        guidance = "Tu círculo íntimo está recibiendo el remanente de tu energía en lugar de tu primicia. De nada sirve resplandecer ante el público externo si en tu propio salón familiar hay sombras de indiferencia o queja latente.";
        challenge = "Ten una cita o cena intencional de 1 hora con tu cónyuge o hijo esta semana con una regla de oro: cero teléfonos sobre la mesa.";
        bookId = "padres-de-luz";
      } else if (lowest[0] === "emocional") {
        guidance = "Estás sufriendo una sobrecarga relacional y de expectativas. Dices sí a los demás por temor a desilusionarlos, pero ese 'sí' es un rotundo 'no' silencioso a tu propia salud emocional y al cuidado ordenado de Dios para ti.";
        challenge = "Declara un 'no' amoroso pero asertivo a una petición o carga de servicio adicional que recibas esta semana.";
        bookId = "limites-redentores";
      } else if (lowest[0] === "fisico") {
        guidance = "El cuerpo es el templo del Espíritu Santo y el sustrato biológico de tu mente. El profeta Elías huyó exhausto y deprimido, y la respuesta pastoral de Dios fue mandarle a dormir y comer antes de hablarle. No ignores tus límites corporales.";
        challenge = "Establece tu hora fija de sueño para ir a la cama a las 10:30 p.m. al menos 4 días de los próximos 7 días.";
        bookId = "anclas-del-alma";
      } else {
        guidance = "Estás permitiendo que los quehaceres cotidianos o el perfeccionismo vocacional eclipsen tu paz financiera y de servicio. La codicia o el temor a la escasez te impiden disfrutar del fruto de tu esfuerzo reposado.";
        challenge = "Define un inventario claro de tus gastos prioritarios y no permitas que las horas extras devoren la cena con tus seres queridos.";
        bookId = "limites-redentores";
      }

      setRuedaResult({
        lowest: lowest[0],
        lowestLabel: rodaLabel(lowest[0]),
        lowestScore: lowest[1],
        average: parseFloat(average.toFixed(1)),
        guidance,
        challenge,
        bookId
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const rodaLabel = (key: string) => {
    return ruedaDimensions.find(d => d.key === key)?.label || key;
  };

  const handleResetRueda = () => {
    setRuedaScores({
      espiritual: 7,
      familia: 6,
      emocional: 5,
      fisico: 7,
      vocacional: 8
    });
    setRuedaResult(null);
  };

  // SVG Radar generator helper
  const renderRuedaVisual = () => {
    const points = [];
    const keys = ["espiritual", "familia", "emocional", "fisico", "vocacional"];
    const width = 280;
    const height = 280;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 100;

    // Generate grid rings
    const rings = [3, 5, 8, 10];
    
    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="mx-auto max-w-[280px]">
        {/* Background Dark Circle */}
        <circle cx={cx} cy={cy} r={radius} fill="var(--color-brand-card)" stroke="var(--color-brand-border)" strokeWidth="1" />
        
        {/* Ring Grids */}
        {rings.map((ring, idx) => {
          const r = (ring / 10) * radius;
          return (
            <circle 
              key={idx} 
              cx={cx} 
              cy={cy} 
              r={r} 
              fill="none" 
              stroke="var(--color-brand-border)" 
              strokeDasharray={idx < 2 ? "3,3" : "none"} 
              strokeWidth="0.8" 
            />
          );
        })}

        {/* Dynamic score polygon */}
        {(() => {
          const polygonPoints = keys.map((key, i) => {
            const score = (ruedaScores as any)[key] || 0;
            const angle = (i * 2 * Math.PI) / keys.length - Math.PI / 2;
            const r = (score / 10) * radius;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(" ");

          const axisLabels = keys.map((key, i) => {
            const angle = (i * 2 * Math.PI) / keys.length - Math.PI / 2;
            const r = radius + 22;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            const shortL = key === "espiritual" ? "Fe & Devoción" : 
                           key === "familia" ? "Hogar" :
                           key === "emocional" ? "Salud Emoc." :
                           key === "fisico" ? "Restauración" : "Vocación";
            
            return (
              <text 
                key={key} 
                x={x} 
                y={y} 
                textAnchor="middle" 
                alignmentBaseline="middle"
                className="fill-brand-text font-space text-[10px] uppercase font-bold tracking-tight"
              >
                {shortL}
              </text>
            );
          });

          return (
            <>
              {/* Axes lines */}
              {keys.map((key, i) => {
                const angle = (i * 2 * Math.PI) / keys.length - Math.PI / 2;
                const x = cx + radius * Math.cos(angle);
                const y = cy + radius * Math.sin(angle);
                return (
                  <line 
                    key={i} 
                    x1={cx} 
                    y1={cy} 
                    x2={x} 
                    y2={y} 
                    stroke="var(--color-brand-border)" 
                    strokeWidth="1.5" 
                  />
                );
              })}

              {/* Polygon area */}
              <polygon 
                points={polygonPoints} 
                fill="rgba(234, 88, 12, 0.15)" 
                stroke="var(--color-brand-accent)" 
                strokeWidth="2.5" 
                className="transition-all duration-300"
              />

              {/* Points markers */}
              {keys.map((key, i) => {
                const score = (ruedaScores as any)[key] || 0;
                const angle = (i * 2 * Math.PI) / keys.length - Math.PI / 2;
                const r = (score / 10) * radius;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                return (
                  <g key={key}>
                    <circle 
                      cx={x} 
                      cy={y} 
                      r="4.5" 
                      fill="var(--color-brand-accent)" 
                      stroke="var(--color-brand-bg)" 
                      strokeWidth="1.5" 
                    />
                    <text 
                      x={x} 
                      y={y - 10} 
                      textAnchor="middle" 
                      className="fill-brand-text text-[10px] font-space font-bold"
                    >
                      {score}
                    </text>
                  </g>
                );
              })}
              {axisLabels}
            </>
          );
        })()}
      </svg>
    );
  };

  return (
    <div id="diagnosticos-seccion" className="py-20 bg-brand-alt border-y border-brand-border">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-space text-xs text-brand-accent tracking-[0.25em] uppercase">EXPERIENCIAS INTERACTIVAS</span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-brand-text mt-3">
            Herramientas de <span className="text-brand-accent italic font-normal">Autoconocimiento</span>
          </h2>
          <p className="text-brand-muted text-base mt-4 max-w-2xl mx-auto">
            El verdadero crecimiento inicia con la lucidez y el autoanálisis guiado. Responde con total honestidad. 
            Tus respuestas son completamente privadas y procesadas localmente. Sin suscripciones ni compromisos.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-brand-bg p-1.5 rounded-full border border-brand-border max-w-lg w-full md:w-auto">
            <button
              onClick={() => { setActiveTab("test"); handleResetTest(); }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-full font-space text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === "test"
                  ? "bg-brand-card text-brand-accent border border-brand-border shadow-lg"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              Test de Salud Integral
            </button>
            <button
              onClick={() => { setActiveTab("rueda"); handleResetRueda(); }}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-full font-space text-xs uppercase tracking-wider transition-all duration-300 ${
                activeTab === "rueda"
                  ? "bg-brand-card text-brand-accent border border-brand-border shadow-lg"
                  : "text-brand-muted hover:text-brand-text"
              }`}
            >
              <Compass className="w-4 h-4" />
              Rueda de las Prioridades
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-brand-card border border-brand-border rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Background Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-radial/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-radial/5 rounded-full blur-3xl pointer-events-none" />

          {/* Tab 1: Autodiagnóstico de Salud Emocional y Espiritual */}
          <AnimatePresence mode="wait">
            {activeTab === "test" && (
              <motion.div
                key="test-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {!testResult && !isAnalyzing && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-4 space-y-5">
                      <span className="inline-block bg-brand-accent/10 text-brand-accent border border-brand-border text-xs px-3 py-1 rounded-full font-space">
                        {testInfo.badge}
                      </span>
                      <h3 className="text-3xl font-serif text-brand-text leading-tight">{testInfo.title}</h3>
                      <p className="text-brand-muted leading-relaxed text-sm">
                        {testInfo.tagline} Evaluaremos 4 pilares estratégicos:
                      </p>
                      <ul className="space-y-2 text-xs font-space text-brand-muted">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"/> Autogestión del Reposo</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"/> Límites Familiares y Sociales</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"/> Profundidad Espiritual Personal</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-brand-accent rounded-full"/> Resiliencia de Identidad</li>
                      </ul>
                      <div className="text-xs text-brand-accent bg-brand-accent/10 p-3 rounded-xl border border-brand-accent/20 flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 shrink-0" />
                        <span>Estimado: {testInfo.duration} • Completamente gratuíto</span>
                      </div>
                    </div>

                    <div className="lg:col-span-8 bg-brand-bg border border-brand-border p-5 md:p-8 rounded-2xl">
                      {/* Progress Bar */}
                      <div className="flex justify-between items-center text-xs font-space text-brand-muted mb-4">
                        <span>Paso {currentTestIndex + 1} de {testInfo.questions.length}</span>
                        <span>{Math.round(((currentTestIndex + 1) / testInfo.questions.length) * 100)}% Completado</span>
                      </div>
                      <div className="w-full bg-brand-border h-1 rounded-full mb-8 overflow-hidden">
                        <div 
                          className="bg-brand-accent h-full transition-all duration-300"
                          style={{ width: `${((currentTestIndex + 1) / testInfo.questions.length) * 100}%` }}
                        />
                      </div>

                      {/* Current Question */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentTestIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-6"
                        >
                          <h4 className="text-lg md:text-xl font-serif text-brand-text leading-relaxed">
                            {testInfo.questions[currentTestIndex].text}
                          </h4>

                          <div className="space-y-3.5">
                            {testInfo.questions[currentTestIndex].options.map((option, idx) => {
                              const isSelected = selectedAnswers[testInfo.questions[currentTestIndex].id] === option.score;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleSelectOption(testInfo.questions[currentTestIndex].id, option.score)}
                                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                                    isSelected 
                                      ? "bg-brand-card border-brand-accent text-brand-text shadow-md shadow-brand-accent/5 translate-x-1" 
                                      : "bg-brand-bg/50 border-brand-border text-brand-muted hover:border-brand-accent/40 hover:text-brand-text"
                                  }`}
                                >
                                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${
                                    isSelected ? "border-brand-accent bg-brand-accent/20" : "border-brand-border"
                                  }`}>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-brand-accent rounded-full" />}
                                  </div>
                                  <span className="text-sm font-sans">{option.text}</span>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Controls */}
                      <div className="flex justify-between mt-8 pt-6 border-t border-brand-border">
                        <button
                          onClick={handlePrevQuestion}
                          disabled={currentTestIndex === 0}
                          className="flex items-center gap-2 text-xs font-space text-brand-muted hover:text-brand-text disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" /> Anterior
                        </button>

                        <button
                          onClick={handleNextQuestion}
                          disabled={!selectedAnswers[testInfo.questions[currentTestIndex].id]}
                          className="flex items-center gap-2 text-xs font-space bg-brand-accent hover:bg-brand-hover text-brand-bg font-bold px-5 py-2.5 rounded-lg disabled:opacity-40 disabled:pointer-events-none transition-all"
                        >
                          {currentTestIndex === testInfo.questions.length - 1 ? "Ver Resultados" : "Siguiente"}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Analysis State Loader */}
                {isAnalyzing && (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-full"
                    >
                      <RefreshCw className="w-10 h-10 text-brand-accent" />
                    </motion.div>
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl text-brand-text">Compilando guía personalizada...</h4>
                      <p className="text-brand-muted text-sm max-w-sm font-space">
                        Evaluando tus respuestas con base en metodologías de consejería bíblica de Josue Cortés.
                      </p>
                    </div>
                  </div>
                )}

                {/* Question Results Block */}
                {testResult && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      
                      {/* Metric Card */}
                      <div className="lg:col-span-4 bg-brand-bg border border-brand-border p-6 rounded-2xl flex flex-col justify-between items-center text-center">
                        <div className="w-full text-left">
                          <span className="font-space text-[10px] text-brand-accent uppercase tracking-[0.2em]">Puntuaje Obtenido</span>
                        </div>
                        
                        <div className="py-8 relative">
                          {/* Circle Progress */}
                          <div className="w-36 h-36 border-4 border-brand-border rounded-full flex flex-col items-center justify-center">
                            <span className="text-4xl font-serif font-bold text-brand-accent">{testResult.score}</span>
                            <span className="text-xs font-space text-brand-muted">de {testResult.maxScore} ptos</span>
                          </div>
                          <div className="absolute inset-0 border border-brand-accent/20 rounded-full animate-ping opacity-10 pointer-events-none scale-90" />
                        </div>

                        <div className="w-full">
                          <h4 className="font-serif text-lg text-brand-text mt-2 font-semibold">
                            {testResult.interpretation.title}
                          </h4>
                          <span className="block mt-1 font-space text-xs text-brand-muted">Diagnóstico de Salud Emocional</span>
                        </div>
                      </div>

                      {/* Counsel Sheet */}
                      <div className="lg:col-span-8 bg-brand-bg/60 border border-brand-border p-6 md:p-8 rounded-2xl space-y-6">
                        <div className="flex items-center gap-3 border-b border-brand-border pb-4">
                          <Compass className="w-5 h-5 text-brand-accent" />
                          <h4 className="font-serif text-xl font-bold text-brand-text">Consejo Pastoral & Bíblico de Josue:</h4>
                        </div>
                        
                        <p className="text-brand-text font-serif italic text-base leading-relaxed bg-brand-accent/5 p-4 rounded-xl border-l-[3px] border-brand-accent">
                          &ldquo;{testResult.interpretation.pastoralCounsel}&rdquo;
                        </p>

                        <div className="space-y-3">
                          <span className="font-space text-xs text-brand-accent uppercase tracking-wider block">Tres Ejercicios Prácticos Inmediatos:</span>
                          <ul className="space-y-2.5">
                            {testResult.interpretation.actionSteps.map((step: string, i: number) => (
                              <li key={i} className="flex items-start gap-2.5 text-sm text-brand-muted">
                                <CheckCircle2 className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                    </div>

                    {/* Integrated Resource Call-out */}
                    {(() => {
                      const book = ebooksData.find(b => b.id === testResult.interpretation.recommendedBookId);
                      if (!book) return null;
                      return (
                        <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div className="space-y-2 md:max-w-xl text-center md:text-left">
                            <span className="font-space text-[10px] text-brand-accent tracking-widest uppercase">RECOMENDACIÓN COMPLEMENTARIA</span>
                            <h4 className="text-xl md:text-2xl font-serif text-brand-text">
                              Lectura sugerida: <span className="font-medium underline decoration-brand-accent decoration-2 underline-offset-4">{book.title}</span>
                            </h4>
                            <p className="text-brand-muted text-xs md:text-xs">
                              Para afianzar tu plan de acción, te recomendamos descargar este recurso gratuito de nuestro ecosistema. Contiene el desarrollo detallado del consejo bíblico que necesitas hoy.
                            </p>
                          </div>
                          
                          <div className="flex gap-4 shrink-0 w-full md:w-auto">
                            <button
                              onClick={() => handleResetTest()}
                              className="flex-1 md:flex-none border border-brand-border font-space text-xs hover:bg-brand-card font-bold py-3 px-5 rounded-lg transition-colors flex items-center justify-center gap-2 text-brand-muted uppercase tracking-wider"
                            >
                              <RefreshCw className="w-3.5 h-3.5" /> Volver a evaluar
                            </button>
                            <button
                              onClick={() => {
                                onRecommendBook(book.id);
                              }}
                              className="flex-1 md:flex-none bg-brand-accent hover:bg-brand-hover text-brand-bg font-bold font-space text-xs py-3 px-5 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wide"
                            >
                              Descargar Ebook <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })()}

                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Tab 2: Rueda de la Alineación General (Rueda de la Vida) */}
            {activeTab === "rueda" && (
              <motion.div
                key="rueda-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {!ruedaResult && !isAnalyzing && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* SVG Visual Column */}
                    <div className="lg:col-span-5 bg-brand-bg border border-brand-border p-6 rounded-2xl flex flex-col items-center justify-center space-y-6">
                      <div className="w-full text-left">
                        <span className="font-space text-[10px] text-brand-accent uppercase tracking-widest block mb-1">REAL-TIME VISUALIZER</span>
                        <h4 className="font-serif text-lg text-brand-text">Crea tu Geografía Relacional</h4>
                      </div>

                      <div className="w-full py-4 flex items-center justify-center">
                        {renderRuedaVisual()}
                      </div>

                      <p className="text-center text-[11px] font-space text-brand-muted max-w-xs mt-2">
                        Manipula los controles laterales de la derecha. Observa cómo cambia la simetría de tu rueda de salud personal.
                      </p>
                    </div>

                    {/* Inputs Sliders Column */}
                    <div className="lg:col-span-7 bg-brand-bg border border-brand-border p-5 md:p-8 rounded-2xl space-y-6">
                      <div className="border-b border-brand-border pb-3">
                        <h4 className="font-serif text-xl text-brand-text">Pondera tus 5 dimensiones básicas:</h4>
                        <p className="text-xs text-brand-muted font-space mt-1">Arrastra el control de 1 (vacío/emergencia) a 10 (alineación ideal).</p>
                      </div>

                      <div className="space-y-4">
                        {ruedaDimensions.map((dim) => {
                          const val = (ruedaScores as any)[dim.key] || 0;
                          return (
                            <div key={dim.key} className="space-y-1.5">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-space font-bold uppercase text-brand-text">{dim.label}</span>
                                <span className="font-space font-bold text-brand-accent bg-brand-accent/10 border border-brand-accent/25 px-2 py-0.5 rounded-md text-[11px]">
                                  {val} / 10
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <input
                                  type="range"
                                  min="1"
                                  max="10"
                                  value={val}
                                  onChange={(e) => handleRuedaChange(dim.key, parseInt(e.target.value))}
                                  className="w-full h-1.5 bg-brand-border rounded-lg appearance-none cursor-pointer accent-brand-accent"
                                />
                              </div>
                              <p className="text-[10.5px] text-brand-muted leading-tight">{dim.desc}</p>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={handleCalculateRueda}
                        className="w-full bg-brand-accent hover:bg-brand-hover text-brand-bg py-3.5 rounded-xl font-bold font-space text-xs uppercase tracking-wider transition-all mt-4 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-accent/5"
                      >
                        Generar Mapeo de Alineación <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

                {/* Loading state for Rueda */}
                {isAnalyzing && (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-full"
                    >
                      <Compass className="w-10 h-10 text-brand-accent" />
                    </motion.div>
                    <div className="space-y-2">
                      <h4 className="font-serif text-2xl text-brand-text">Calculando asimetrías de vida...</h4>
                      <p className="text-brand-muted text-sm max-w-sm font-space">
                        Analizando la holgura en tu balance pastoral-familiar de las dimensiones más sobrecargadas.
                      </p>
                    </div>
                  </div>
                )}

                {/* Final Rueda Results View */}
                {ruedaResult && !isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-8"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                      
                      {/* Left: Graphic View */}
                      <div className="lg:col-span-4 bg-brand-bg border border-brand-border p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                        <span className="font-space text-[10px] text-brand-accent uppercase tracking-widest block mb-4">REPRESENTACIÓN RESULTANTE</span>
                        <div className="w-full max-w-[200px] aspect-square flex items-center justify-center mb-4">
                          {renderRuedaVisual()}
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-space text-brand-muted uppercase block">PROMEDIO VITAL</span>
                          <span className="text-3xl font-serif font-bold text-brand-text">{ruedaResult.average} / 10</span>
                        </div>
                      </div>

                      {/* Right: Rich Pastoral Diagnostics Analysis */}
                      <div className="lg:col-span-8 bg-brand-bg border border-brand-border p-6 md:p-8 rounded-2xl flex flex-col justify-between space-y-6">
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 border-b border-brand-border pb-3.5">
                            <span className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 mt-0.5">
                              <AlertTriangle className="w-4 h-4" />
                            </span>
                            <div>
                              <h4 className="font-serif text-[19px] font-bold text-brand-text">Dimensión más frágil detectada:</h4>
                              <p className="text-xs font-space text-brand-accent uppercase font-bold tracking-wider mt-0.5">
                                {ruedaResult.lowestLabel} (Puntaje: {ruedaResult.lowestScore}/10)
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <span className="font-space text-[10px] text-brand-accent uppercase tracking-wider block">CONSEJERÍA AL CORAZÓN</span>
                            <p className="text-brand-text font-serif italic text-base leading-relaxed bg-brand-accent/5 p-4 rounded-xl border-l-[3px] border-brand-accent">
                              &ldquo;{ruedaResult.guidance}&rdquo;
                            </p>
                          </div>

                          <div className="space-y-2 bg-brand-card/30 border border-brand-border p-4 rounded-xl">
                            <span className="font-space text-xs text-brand-accent uppercase tracking-wider flex items-center gap-2 font-bold">
                              <Sparkles className="w-3.5 h-3.5 text-brand-hover" /> El Reto de la Semana:
                            </span>
                            <p className="text-sm text-brand-muted pl-5 font-sans leading-relaxed">
                              {ruedaResult.challenge}
                            </p>
                          </div>
                        </div>

                        {/* Integration footer with bookstore */}
                        {(() => {
                          const book = ebooksData.find(b => b.id === ruedaResult.bookId);
                          if (!book) return null;
                          return (
                            <div className="bg-brand-accent/5 border border-brand-accent/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                              <div className="text-center sm:text-left">
                                <span className="font-space text-[9px] text-brand-accent tracking-widest uppercase">EBOOK ALINEADO RECOMENDADO</span>
                                <h5 className="font-serif text-sm font-bold text-brand-text mt-0.5">{book.title} (PDF)</h5>
                              </div>
                              <div className="flex gap-2.5 w-full sm:w-auto">
                                <button
                                  onClick={handleResetRueda}
                                  className="flex-1 sm:flex-none border border-brand-border text-brand-muted hover:bg-brand-card font-space text-[10px] font-bold py-2.5 px-3.5 rounded-lg transition-colors uppercase"
                                >
                                  Reiniciar
                                </button>
                                <button
                                  onClick={() => onRecommendBook(book.id)}
                                  className="flex-1 sm:flex-none bg-brand-accent hover:bg-brand-hover text-brand-bg font-space text-[10px] font-bold py-2.5 px-3.5 rounded-lg transition-all uppercase"
                                >
                                  Descargar Guía
                                </button>
                              </div>
                            </div>
                          );
                        })()}

                      </div>

                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core Disclaimers */}
          <div className="mt-8 border-t border-brand-border pt-4 flex items-center gap-1.5 text-[10px] text-brand-muted font-space justify-center">
            <Lock className="w-3 h-3 text-brand-accent" />
            <span>Encriptación Local: Tus datos de evaluación no se registran en bases de datos remotas. Diseñado para intimidad espiritual.</span>
          </div>

        </div>

      </div>
    </div>
  );
}
