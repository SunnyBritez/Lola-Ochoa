"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronRight, Lock, Star } from "lucide-react";

type Stage = "START" | "QUIZ" | "EMAIL" | "RESULT" | "VSL" | "SALES_PAGE";

export default function FunnelPage() {
  const [stage, setStage] = useState<Stage>("START");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const questions = [
    {
      id: 1,
      text: "¿Cuántas horas pasás fuera de casa en promedio?",
      options: [
        "Menos de 4 horas",
        "Entre 4 y 8 horas",
        "Todo el día, salgo a la mañana y vuelvo de noche",
        "Vivo de reunión en reunión"
      ]
    },
    {
      id: 2,
      text: "Cuando abrís tu placard a la mañana, ¿qué es lo primero que pensás?",
      options: [
        "Siento que siempre me visto igual",
        "Necesito algo cómodo porque hoy no paro un segundo",
        "Quiero estar elegante pero sin sufrir",
        "Pierdo demasiado tiempo pensando cómo combinar la ropa"
      ]
    },
    {
      id: 3,
      text: "¿Cuál es tu mayor frustración al comprar zapatos o carteras?",
      options: [
        "Son muy lindos pero me lastiman a las dos horas",
        "Siento que la calidad bajó mucho y no duran",
        "Tengo cosas sueltas pero me cuesta armar el look completo",
        "Me cuesta encontrar puro cuero genuino con buen diseño"
      ]
    },
    {
      id: 4,
      text: "Si pudieras resolver un solo problema hoy, ¿cuál sería?",
      options: [
        "Tener un calzado comodísimo que me sirva de 8 am a 8 pm",
        "Armar conjuntos rápidos y sin pensar a la mañana",
        "Sentirme más elegante, femenina y segura",
        "Encontrar accesorios y prendas de calidad que me duren años"
      ]
    }
  ];

  const handleAnswer = (option: string) => {
    setAnswers({ ...answers, [currentQuestion]: option });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("EMAIL");
    }
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setStage("RESULT");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans selection:bg-[#c9b07c] selection:text-white">
      {/* HEADER LOGO */}
      <header className="w-full p-6 flex justify-center border-b border-gray-100 bg-white">
        <h1 className="text-2xl tracking-[0.2em] font-light uppercase">Lola Ochoa</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12">
        
        {/* STAGE: START */}
        {stage === "START" && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="text-[#c9b07c] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Quiz Interactivo
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6 leading-tight">
              ¿Qué te frena a la hora de armar tu look perfecto cada mañana?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              No vamos a decirte simplemente que compres un zapato nuevo. Este breve cuestionario está diseñado para identificar tu <b>Perfil de Estilo</b> y entender exactamente qué tipo de piezas necesitás para potenciar tu seguridad sin sacrificar comodidad.
            </p>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-10 flex items-center justify-center gap-3 text-sm text-gray-500">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Toma solo 60 segundos.
            </div>
            <button 
              onClick={() => setStage("QUIZ")}
              className="w-full bg-[#1a1a1a] hover:bg-black text-white py-5 px-8 rounded-none tracking-widest text-sm uppercase transition-all flex items-center justify-center gap-2 group"
            >
              Comenzar Evaluación
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* STAGE: QUIZ */}
        {stage === "QUIZ" && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-400 font-medium mb-3 tracking-widest uppercase">
                <span>Pregunta {currentQuestion + 1}</span>
                <span>{questions.length}</span>
              </div>
              <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-[#c9b07c] h-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h3 className="text-2xl font-serif text-gray-800 mb-8 leading-snug">
              {questions[currentQuestion].text}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className="w-full text-left p-5 bg-white border border-gray-200 hover:border-[#c9b07c] hover:bg-[#FDFBF7] transition-all text-gray-700 shadow-sm group flex items-center justify-between"
                >
                  <span className="leading-relaxed">{option}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#c9b07c] transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STAGE: EMAIL */}
        {stage === "EMAIL" && (
          <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-16 h-16 bg-[#FDFBF7] border border-[#c9b07c] rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-6 h-6 text-[#c9b07c]" />
            </div>
            <h2 className="text-3xl font-serif text-gray-800 mb-4">
              Tu perfil de estilo está listo.
            </h2>
            <p className="text-gray-600 mb-8">
              Dejanos tu email para enviarte el resultado detallado y habilitarte tu acceso exclusivo a la nueva colección.
            </p>

            <form onSubmit={submitEmail} className="space-y-4 max-w-sm mx-auto text-left">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Tu Nombre</label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-300 p-4 focus:outline-none focus:border-[#c9b07c] bg-white transition-colors"
                  placeholder="Ej: Florencia"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Tu Email</label>
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-4 focus:outline-none focus:border-[#c9b07c] bg-white transition-colors"
                  placeholder="florencia@email.com"
                />
              </div>
              
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-[#1a1a1a] hover:bg-black text-white py-5 px-8 tracking-widest text-sm uppercase transition-all flex items-center justify-center gap-2 group"
                >
                  Revelar mi resultado
                  <Lock className="w-4 h-4" />
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  * 100% libre de spam. Tus datos están seguros.
                </p>
              </div>
            </form>
          </div>
        )}

        {/* STAGE: RESULT */}
        {stage === "RESULT" && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white border-t-4 border-[#c9b07c] p-8 shadow-xl">
              <span className="text-[#c9b07c] uppercase tracking-widest text-xs font-semibold mb-2 block">
                Diagnóstico de Estilo
              </span>
              <h2 className="text-3xl font-serif text-gray-800 mb-6">
                La Ejecutiva Todoterreno
              </h2>
              
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  Hola <b>{name}</b>. Según tus respuestas, lo que más te cuesta no es la falta de gusto, sino la <b>falta de funcionalidad</b>. 
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Estás todo el día en movimiento, corriendo de un lado a otro. Históricamente te hicieron creer que para estar elegante había que aguantar el dolor de un zapato rígido, o que si querías estar cómoda tenías que caer en zapatillas deportivas que arruinan tu look profesional.
                </p>
                <h3 className="text-lg font-bold text-gray-800 mt-8 mb-4 border-b pb-2">La Micro-Revelación</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  El problema no sos vos. El problema es que estuviste comprando piezas sueltas de moda rápida que no están diseñadas para acompañar tu ritmo. <b>Necesitás un sistema.</b> Un "Total Look" de cuero genuino que te vista de la cabeza a los pies, combinando carteras y zapatos pensados para tu anatomía.
                </p>
              </div>

              <div className="mt-10 bg-[#FDFBF7] p-6 border border-[#e5d5b5]">
                <h4 className="font-serif text-xl mb-3 text-center">Hay algo importante que todavía no viste...</h4>
                <p className="text-sm text-gray-600 text-center mb-6">
                  ¿Por qué tantos intentos de compras fallidas te dejan siempre con la sensación de "no tengo qué ponerme"? Mirá la siguiente presentación.
                </p>
                <button 
                  onClick={() => setStage("VSL")}
                  className="w-full bg-[#c9b07c] hover:bg-[#b89f6b] text-white py-4 tracking-widest text-sm uppercase transition-all flex items-center justify-center gap-2 group"
                >
                  VER EXPLICACIÓN COMPLETA
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE: VSL (Video Sales Letter) */}
        {stage === "VSL" && (
          <div className="animate-in fade-in zoom-in-95 duration-1000">
            <h2 className="text-2xl font-serif text-center mb-6">La verdad sobre el confort y la elegancia</h2>
            <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden mb-8 shadow-2xl border border-gray-200">
              {/* VIDEO PLACEHOLDER */}
              <div className="text-center text-white/70 p-6 z-10">
                <p className="text-sm uppercase tracking-widest mb-2">Espacio para Video VSL</p>
                <p className="text-xs">Aquí va el video grabado contando los 12 años de Lola Ochoa, mostrando el proceso de diseño y la calidad del cuero, con voz en off y B-roll del producto.</p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={() => setStage("SALES_PAGE")}
                className="bg-[#1a1a1a] hover:bg-black text-white py-5 px-10 tracking-widest text-sm uppercase transition-all inline-flex items-center gap-2 group"
              >
                DESCUBRIR LA COLECCIÓN TOTAL LOOK
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE: SALES PAGE */}
        {stage === "SALES_PAGE" && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                No necesitás más zapatos. <br/><span className="text-[#c9b07c] italic">Necesitás una ruta de estilo.</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                El sistema Lola Ochoa está diseñado para mujeres que no se detienen. Calzado de autor, camperas de cuero legítimo y carteras de diseño preciso.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Product Card 1 */}
              <div className="bg-white border border-gray-100 shadow-sm p-6 flex flex-col">
                <div className="aspect-[4/5] bg-gray-100 mb-6 flex items-center justify-center text-gray-400 relative overflow-hidden">
                   <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 font-bold tracking-widest uppercase">Más Vendido</div>
                   FOTO PRODUCTO
                </div>
                <h3 className="font-serif text-2xl mb-2">Botas Texanas de Autor</h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">Cuero genuino, taco de descanso perfecto para usar de 8 am a 8 pm sin dolor. Hechas a mano en Argentina.</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$180.000</div>
                    <div className="text-xl font-bold text-gray-900">$135.000 <span className="text-xs font-normal text-green-600">-25% Transferencia</span></div>
                  </div>
                  <a href="https://lolaochoa.com.ar/" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors">
                    COMPRAR
                  </a>
                </div>
              </div>

              {/* Product Card 2 */}
              <div className="bg-white border border-gray-100 shadow-sm p-6 flex flex-col">
                <div className="aspect-[4/5] bg-gray-100 mb-6 flex items-center justify-center text-gray-400 relative overflow-hidden">
                   <div className="absolute top-4 left-4 bg-[#c9b07c] text-white text-xs px-3 py-1 font-bold tracking-widest uppercase">Nuevo Total Look</div>
                   FOTO PRODUCTO (CARTERA + ROPA)
                </div>
                <h3 className="font-serif text-2xl mb-2">Combo Cartera + Campera</h3>
                <p className="text-gray-500 mb-4 text-sm leading-relaxed">Elevá tus básicos. Cartera de diseño y campera de cuero a juego. El sistema infalible para salir perfecta en 5 minutos.</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400 line-through">$250.000</div>
                    <div className="text-xl font-bold text-gray-900">$187.500 <span className="text-xs font-normal text-green-600">-25% Transferencia</span></div>
                  </div>
                  <a href="https://lolaochoa.com.ar/" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors">
                    COMPRAR
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-8 md:p-12 text-center border border-[#e5d5b5]">
              <h3 className="text-2xl font-serif mb-4">12 Años Haciendo Calzado en Argentina</h3>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                No vendemos promesas, vendemos oficio. Cada pieza que sale de nuestro taller está pensada para acompañarte años, no meses. 
                <br/><br/>
                <b>✅ Envío Gratis a todo el país <br/> ✅ 6 Cuotas Sin Interés <br/> ✅ 25% OFF por Transferencia</b>
              </p>
              <a href="https://lolaochoa.com.ar/" target="_blank" rel="noopener noreferrer" className="bg-[#c9b07c] text-white px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-[#b89f6b] transition-colors inline-block">
                IR A LA TIENDA OFICIAL AHORA
              </a>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
