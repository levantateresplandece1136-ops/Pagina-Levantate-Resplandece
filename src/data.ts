import { EBook, Diagnostic } from "./types";

export const ebooksData: EBook[] = [
  {
    id: "mesa-de-la-escucha",
    title: "Renueva tu Mente y Transforma tu Vida",
    subtitle: "Descubre tus creencias profundas y renuévalas con la verdad de Cristo",
    category: "Renueva tu mente. Transforma tu vida.",
    badge: "Especializado",
    pages: 160,
    readTime: "4 horas",
    description: "Una guía práctica y bíblica para desmantelar las fortalezas mentales y renovar tus pensamientos cotidianos bajo la luz de la verdad redentora de la Palabra de Dios.",
    tableOfContents: [
      "Capítulo 1: El Poder de los Pensamientos en el Diario Vivir",
      "Capítulo 2: Desmantelando Fortalezas Mentales y Creencias Arraigadas",
      "Capítulo 3: Romanos 12 y la Metamorfosis de la Mente",
      "Capítulo 4: El Espejo de la Escritura: Tu Verdadera Identidad",
      "Capítulo 5: Caminando en Libertad Cotidiana y Renovación Diaria"
    ],
    excerpt: {
      title: "Capítulo 3: La Metamorfosis de la Mente",
      content: "Nuestra mente no se renueva mediante la inercia del optimismo humano, sino a través de la inmersión activa en las verdades de la gracia de Dios. Cuando identificamos y confrontamos las mentiras que el dolor, el rechazo o el temor sembraron en nuestro corazón, y las sustituimos deliberadamente por la voz de nuestro Padre Celestial, iniciamos una transformación duradera e integral."
    },
    downloadCount: 750,
    isPopular: false
  },
  {
    id: "limites-redentores",
    title: "Límites Redentores",
    subtitle: "Establecer fronteras con amor, verdad y libertad espiritual",
    category: "Más conexión, menos conflicto.",
    badge: "Guía Práctica",
    pages: 124,
    readTime: "2.5 horas",
    description: "Aprende a decir 'no' sin culpa y a amar 'sí' con sabiduría. Ideal para líderes, madres, padres e hijos en transición ocupacional que sufren de cansancio relacional continuo.",
    tableOfContents: [
      "Capítulo 1: La Geografía del Corazón: ¿Qué es un límite?",
      "Capítulo 2: El Mito del 'Sí' Perpetuo en la Vida Cristiana",
      "Capítulo 3: Marcos familiares dañinos y cómo confrontarlos en amor",
      "Capítulo 4: Estructurar límites en la era del celular invasivo",
      "Capítulo 5: El rol del perdón frente a límites cruzados"
    ],
    excerpt: {
      title: "Capítulo 2: El Mito del 'Sí' Perpetuo",
      content: "Se nos ha enseñado erróneamente que amar significa estar infinitamente disponibles a cualquier hora, sacrificando nuestro descanso espiritual y emocional. Pero observemos a Jesucristo: Él se apartaba de las multitudes enfebrecidas de necesidades para orar a solas. Jesús dijo 'no' a las urgencias de otros para priorizar la obediencia al Padre. Tu disponibilidad limitada no te hace menos compasivo, te hace un mayordomo prudente de los recursos temporales que Dios te confió."
    },
    downloadCount: 980
  },
  {
    id: "padres-de-luz",
    title: "Padres de Luz",
    subtitle: "Crianza con enfoque intencional y liderazgo de sabiduría bíblica",
    category: "Lidera con integridad y propósito.",
    badge: "¡Nuevo!",
    pages: 110,
    readTime: "2 horas",
    description: "Una guía de contrapeso dedicada a padres hispanos que buscan guiar a sus hijos de 10 a 18 años hacia una vida con propósito, fe firme y discernimiento digital saludable.",
    tableOfContents: [
      "Capítulo 1: Entendiendo la Atmósfera Cultural de tus Hijos",
      "Capítulo 2: El Altar Familiar: Reclamando la conversación real",
      "Capítulo 3: Dispositivos Móviles: Directrices, convenios y asombro",
      "Capítulo 4: Modelar el Fruto del Espíritu bajo Estrés de Crianza",
      "Capítulo 5: El Destino a Largo Plazo: Soltar con Confianza en la Promesa"
    ],
    excerpt: {
      title: "Capítulo 3: Convenios en el Hogar sobre Dispositivos",
      content: "La tecnología no es un enemigo intrínseco, sino un potente amplificador de la inclinación del corazón. Si permitimos que las pantallas sean las únicas educadoras silenciosas de nuestros hijos en momentos de soledad, no deberíamos asombrarnos si su cosmovisión es forjada por tendencias efímeras antes que por verdades eternas. La crianza intencional requiere establecer 'santuarios libres de pantallas' en el hogar y reemplazar el scroll hipnótico por diálogos cálidos de sobremesa."
    },
    downloadCount: 1150,
    isPopular: true
  },
  {
    id: "anclas-del-alma",
    title: "Anclas del Alma",
    subtitle: "Manejo del estrés y la ansiedad a la luz de las Escrituras",
    category: "Esperanza para la batalla interior.",
    badge: "Más Solicitado",
    pages: 148,
    readTime: "3 horas",
    description: "Una guía pastoral-psicológica con base bíblica para comprender la ansiedad y el estrés contemporáneos. Integra teología práctica y herramientas de autorregulación emocional para devolver el reposo interior.",
    tableOfContents: [
      "Capítulo 1: El Ruido de la Mente en un Mundo Acelerado",
      "Capítulo 2: Filípenses 4 y la Anatomía de la Preocupación",
      "Capítulo 3: El Altar de la Rendición: Dejar ir el Control",
      "Capítulo 4: Prácticas Diarias de Silencio, Oración y Cuidado Físico",
      "Capítulo 5: Cuándo Buscar Ayuda Sola y Cuándo Caminar Acompañado"
    ],
    excerpt: {
      title: "Capítulo 3: El Altar de la Rendición",
      content: "La ansiedad suele alimentarse de la ilusión del control absoluto. Queremos blindar el futuro de nuestros hijos, asegurar nuestras finanzas y garantizar la aprobación de los demás. Sin embargo, la paz duradera no proviene de un control impecable, sino de una confianza total. Rendirse en el altar divino no es resignación estéril; es colocar activamente nuestras insostenibles cargas en las manos de Aquel que sostiene el universo entero, sabiendo que Su fidelidad precede nuestro desvelo."
    },
    downloadCount: 1420,
    isPopular: true
  }
];

export const diagnosticsData: Diagnostic[] = [
  {
    id: "integral-salud",
    title: "Autodiagnóstico de Salud Emocional y Espiritual",
    tagline: "Mide el nivel de sobrecarga, descanso restaurativo y alineación espiritual en tu vida cotidiana.",
    description: "Un cuestionario reflexivo diseñado especialmente para adultos hispanos que equilibran familia, profesión u obra comunitaria. Obtén sugerencias inmediatas según tu nivel actual.",
    duration: "6 minutos",
    badge: "Recomendado",
    iconName: "HeartPulse",
    questions: [
      {
        id: 1,
        text: "¿Con qué frecuencia te resulta difícil apartar el trabajo, las pantallas o las demandas familiares para disfrutar de un descanso real y regenerativo?",
        options: [
          { text: "Casi nunca: Protejo rígidamente mi tiempo de refrigerio y oración.", score: 4, feedback: "Excelente mayordomía de tu descanso." },
          { text: "Ocasionalmente: Lo intento, pero a menudo me interrumpen o me culpo por parar.", score: 3, feedback: "Hay intención, pero te falta blindar ese espacio ante intrusiones." },
          { text: "Frecuentemente: Solo descanso cuando mi cuerpo enferma o colapsa físicamente.", score: 2, feedback: "Estás operando en piloto automático y alerta constante. Riesgo de burnout." },
          { text: "Siempre: Siento que si yo me detengo, todo mi entorno se desmorona de inmediato.", score: 1, feedback: "Cargas un complejo de autosuficiencia que ahoga tu salud. Es clave delegar." }
        ]
      },
      {
        id: 2,
        text: "Ante una crítica o situación profundamente injusta en tus relaciones indispensables, ¿cómo reacciona tu corazón?",
        options: [
          { text: "Busco paz en Dios, filtro falsedades y expongo mis límites con sobria calma.", score: 4, feedback: "Madurez espiritual alta ante el agravio exterior." },
          { text: "Me guardo el dolor en silencio, pero continúo rumiándolo internamente durante días.", score: 3, feedback: "Sueles confundir pacificación con pasividad. Atento al rencor acumulado." },
          { text: "Reacciono con impulsividad o amargura defensiva, lamentándolo después.", score: 2, feedback: "La emoción gobierna tu raciocinio momentáneo; necesitas un anclaje bíblico antes de hablar." },
          { text: "Me invade un sentimiento constante de nulidad e inadecuación personal profunda.", score: 1, feedback: "Tus defensas emocionales están debilitadas. Tu identidad depende de la aprobación externa." }
        ]
      },
      {
        id: 3,
        text: "¿Cuál es tu ritmo actual de devoción, silencio personal y lectura contemplativa de las Escrituras?",
        options: [
          { text: "Consistente: Es mi pan diario y mi oasis prioritario de recarga espiritual.", score: 4, feedback: "Tu pozo de agua viva se mantiene lleno." },
          { text: "Esporádico: Solo busco el silencio cuando las crisis particulares azotan mi vida.", score: 3, feedback: "Tu relación espiritual es de 'bombero'. Necesitas nutrir la disciplina diaria." },
          { text: "Profesional/Eclesiástico: Leo o hablo de la Biblia solo para preparar clases, predicar o debatir con otros.", score: 2, feedback: "Atención: Estás alimentando a otros mientras tu propia alma padece desnutrición." },
          { text: "Nulo: Mi vida espiritual se limita a la inercia del servicio o rituales vacíos de conexión.", score: 1, feedback: "Es vital regresar al primer amor y a la sencillez del silencio con Dios." }
        ]
      },
      {
        id: 4,
        text: "Al evaluar tus límites personales en el servicio voluntario, eclesial o laboral, ¿cómo te describes?",
        options: [
          { text: "Establezco un 'no' saludable cada vez que mi paz o cuidado familiar se ven amenazados.", score: 4, feedback: "Control de prioridades sabio y compasivo." },
          { text: "Acepto casi todo para evitar tensiones o disgustar a otros, pero sobrecargo mi agenda desmedidamente.", score: 3, feedback: "Falta de límites asertivos por temor al rechazo social." },
          { text: "Siento un resentimiento latente hacia los demás porque asumo responsabilidades que ellos deberían llevar.", score: 2, feedback: "Señal de alerta: de la sobrecarga no gestionada nace el rencor pastoral." },
          { text: "Estoy al borde del agotamiento total, sintiéndome atrapado por compromisos ineludibles.", score: 1, feedback: "Urgente: necesitas hacer un alto absoluto y renegociar tus compromisos actuales." }
        ]
      }
    ],
    interpretations: [
      {
        minScore: 13,
        maxScore: 16,
        title: "Salud Integral Floreciente (Santuario del Alma)",
        pastoralCounsel: "¡Alabado sea Dios! Reflejas un ritmo de vida equilibrado, donde la disciplina espiritual alimenta tus respuestas emocionales y relacionales. Continúas protegiendo tus linderos cotidianos y permites que Cristo edifique tu identidad. Sigue sirviendo de mentor y compartiendo esta paz con quienes lideras.",
        actionSteps: [
          "Establece mentorships informales para sostener a otros en sobrecarga.",
          "Profundiza en la lectura de teología contemplativa clásica.",
          "Registra por escrito en un diario tus gratitudes cotidianas."
        ],
        recommendedBookId: "mesa-de-la-escucha"
      },
      {
        minScore: 9,
        maxScore: 12,
        title: "Salud Moderada con Grietas en los Límites",
        pastoralCounsel: "Tu disposición espiritual es genuina, pero las exigencias del entorno están minando la estabilidad de tu templo personal. Si prestas atención al cansancio físico o a tu impaciencia recurrente en las horas de sobremesa, sabrás que has cedido un territorio precioso. Recordar que tu primera área de cuidado ministerial es tu propio hogar y corazón te ayudará a equilibrar la balanza.",
        actionSteps: [
          "Aprende a decir 'no' a una oferta de servicio adicional esta misma semana.",
          "Establece una franja de exclusión total de pantallas después de las 9:00 p.m.",
          "Dedica 15 minutos de oración en completo silencio por la mañana sin objetivos utilitarios."
        ],
        recommendedBookId: "limites-redentores"
      },
      {
        minScore: 4,
        maxScore: 8,
        title: "Alerta de Sequía Espiritual y Emocional",
        pastoralCounsel: "Amado amigo/a, te encuentras operando en la reserva. El ruido mental, la falta de reposo genuino y la condescendencia patológica con las demandas ajenas te han conducido a un terreno árido. No puedes seguir dando lo que ya no tienes en tu interior. Jesús les dijo a sus discípulos agobiados: 'Vengan conmigo a solas a un lugar desierto y descansen un poco' (Marcos 6:31). Es hora de hacer caso a esa amorosa sugerencia pastoral hoy mismo.",
        actionSteps: [
          "Solicita una cita de consejería pastoral/bíblica de orientación.",
          "Descarga urgentemente el recurso 'Anclas del Alma' para estructurar un cimiento diario contra el desaliento.",
          "Declara un día libre de responsabilidades adicionales en las próximas dos semanas."
        ],
        recommendedBookId: "anclas-del-alma"
      }
    ]
  }
];
