import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans selection:bg-[#c9b07c] selection:text-white flex flex-col">
      
      {/* 1. TOP BAR */}
      <div className="w-full bg-[#1a1a1a] text-white text-[10px] sm:text-xs text-center py-2 px-4 font-semibold tracking-widest uppercase">
        <p>Tienda online 24/7 — Envíos a todo el país</p>
      </div>

      {/* 2. HEADER */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 grid grid-cols-3 items-center">
          
          <div className="flex items-center justify-start">
            <button className="lg:hidden text-gray-900">
              <Menu className="w-6 h-6" />
            </button>
            <nav className="hidden lg:flex gap-4 xl:gap-6 text-[10px] xl:text-xs font-semibold uppercase tracking-widest text-gray-500 whitespace-nowrap">
              <Link href="/store" className="hover:text-[#c9b07c] transition-colors">Volver a la Tienda</Link>
            </nav>
          </div>

          <div className="flex justify-center items-center">
            <Link href="/store">
              <h1 className="text-xl md:text-2xl lg:text-3xl tracking-[0.2em] font-light uppercase text-center whitespace-nowrap">
                Lola Ochoa
              </h1>
            </Link>
          </div>

          <div className="flex items-center justify-end gap-5 text-gray-900">
            <button className="hover:text-[#c9b07c] transition-colors hidden sm:block"><Search className="w-5 h-5" /></button>
            <button className="hover:text-[#c9b07c] transition-colors hidden sm:block"><User className="w-5 h-5" /></button>
            <button className="hover:text-[#c9b07c] transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. CONTENIDO PRINCIPAL */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-16">
        <div className="mb-4 text-xs tracking-widest text-gray-400 uppercase">
          <Link href="/store" className="hover:text-[#c9b07c]">Inicio</Link> <span className="mx-2">.</span> <span className="text-gray-900">Contacto</span>
        </div>
        
        <h2 className="text-3xl font-light tracking-[0.1em] uppercase mb-12">Contacto</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Columna Izquierda: Información */}
          <div>
            <div className="space-y-8 text-sm text-gray-600 font-medium">
              <p className="leading-relaxed">
                Somos una tienda online 24/7.<br />
                No tenemos local físico.
              </p>
              
              <div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Teléfono / WhatsApp</p>
                <p>1169486697</p>
              </div>

              <div>
                <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">Email</p>
                <p>solopediosdelola@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">* Nombre</label>
                <input type="text" required className="w-full border border-gray-200 bg-gray-50 p-3 focus:outline-none focus:border-[#c9b07c] focus:bg-white transition-colors" />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">* Email</label>
                <input type="email" required className="w-full border border-gray-200 bg-gray-50 p-3 focus:outline-none focus:border-[#c9b07c] focus:bg-white transition-colors" />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">* Teléfono</label>
                <input type="tel" required className="w-full border border-gray-200 bg-gray-50 p-3 focus:outline-none focus:border-[#c9b07c] focus:bg-white transition-colors" />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">* Mensaje</label>
                <textarea required rows={5} className="w-full border border-gray-200 bg-gray-50 p-3 focus:outline-none focus:border-[#c9b07c] focus:bg-white transition-colors resize-none"></textarea>
              </div>

              <button type="button" className="w-full bg-[#c9b07c] hover:bg-[#b0965b] text-white py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-sm">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl tracking-[0.2em] font-light uppercase mb-6">Lola Ochoa</h3>
            <p className="text-gray-500 mb-2">Tienda online 24/7. No tenemos local.</p>
            <p className="text-gray-500 font-semibold mb-1">WhatsApp: 1169486697</p>
            <p className="text-gray-500">solopediosdelola@gmail.com</p>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-900">Atención al Cliente</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link href="#" className="hover:text-[#c9b07c]">Preguntas Frecuentes</Link></li>
              <li><Link href="#" className="hover:text-[#c9b07c]">Políticas de Envío</Link></li>
              <li><Link href="#" className="hover:text-[#c9b07c]">Cambios y Devoluciones</Link></li>
              <li><Link href="#" className="hover:text-[#c9b07c]">Guía de Talles</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-900">Legal</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link href="#" className="hover:text-[#c9b07c]">Botón de Arrepentimiento</Link></li>
              <li><Link href="#" className="hover:text-[#c9b07c]">Términos y Condiciones</Link></li>
              <li><Link href="#" className="hover:text-[#c9b07c]">Defensa de las y los Consumidores</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-gray-900">Newsletter</h4>
            <p className="text-gray-500 mb-4 text-xs">Anotate para recibir novedades y descuentos exclusivos.</p>
            <div className="flex">
              <input type="email" placeholder="Tu email" className="w-full border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#c9b07c]" />
              <button className="bg-[#1a1a1a] text-white px-4 uppercase text-xs tracking-widest hover:bg-black">Enviar</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>© 2026 Lola Ochoa. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="#" className="hover:text-[#c9b07c]">Instagram</Link>
            <Link href="#" className="hover:text-[#c9b07c]">TikTok</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
