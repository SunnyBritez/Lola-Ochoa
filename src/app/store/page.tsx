import Link from "next/link";
import { Search, ShoppingBag, User, ArrowRight, Menu, Star, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function StoreFront() {
  const cookieStore = cookies();
  const isWholesale = cookieStore.get("wholesale_mode")?.value === "true";

  // Fetch real products from DB
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-gray-900 font-sans selection:bg-[#c9b07c] selection:text-white">
      
      {/* 1. TOP BAR (Anuncios) */}
      {isWholesale ? (
        <div className="w-full bg-[#c9b07c] text-black text-[10px] md:text-xs py-2 uppercase tracking-[0.2em] text-center font-bold">
          MODO MAYORISTA ACTIVO • ESTÁS VIENDO PRECIOS EXCLUSIVOS
        </div>
      ) : (
        <div className="w-full bg-[#1a1a1a] text-white text-[10px] md:text-xs py-2 uppercase tracking-[0.2em] text-center font-bold">
          Envío gratis a todo el país • 25% OFF Transferencia • 6 Cuotas sin interés
        </div>
      )}

      {/* 1. HEADER LIMPIO */}
      <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 grid grid-cols-3 items-center">
          
          {/* Menú Mobile / Desktop Izquierda */}
          <div className="flex items-center justify-start">
            <button className="lg:hidden text-gray-900">
              <Menu className="w-6 h-6" />
            </button>
            <nav className="hidden lg:flex gap-4 xl:gap-6 text-[10px] xl:text-xs font-semibold uppercase tracking-widest text-gray-500 whitespace-nowrap">
              <Link href="#" className="text-gray-900 hover:text-[#c9b07c] transition-colors">Nueva Colección</Link>
              <Link href="#" className="hover:text-[#c9b07c] transition-colors">Calzado</Link>
              <Link href="#" className="hover:text-[#c9b07c] transition-colors">Ropa & Carteras</Link>
              <Link href="#" className="text-red-700 hover:text-red-900 transition-colors">Sale</Link>
            </nav>
          </div>

          {/* Logo Centro */}
          <div className="flex justify-center items-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl tracking-[0.2em] font-light uppercase text-center whitespace-nowrap">
              Lola Ochoa
            </h1>
          </div>

          {/* Iconos Derecha */}
          <div className="flex items-center justify-end gap-5 text-gray-900">
            <button className="hover:text-[#c9b07c] transition-colors hidden sm:block"><Search className="w-5 h-5" /></button>
            <button className="hover:text-[#c9b07c] transition-colors hidden sm:block"><User className="w-5 h-5" /></button>
            <button className="hover:text-[#c9b07c] transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#c9b07c] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 2. HERO SECTION */}
        <section className="relative h-[80vh] md:h-[90vh] bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* Fondo Placeholder (Acá iría la foto o video) */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm tracking-widest uppercase">
            [FOTO / VIDEO DE CAMPAÑA TOTAL LOOK]
          </div>

          <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
            <h2 className="text-white text-4xl md:text-6xl font-serif mb-4 drop-shadow-lg">
              12 Años de Cuero Genuino y Calce Perfecto.
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-10 tracking-wide font-light drop-shadow-md">
              La nueva colección está pensada para la mujer que no se detiene.
            </p>
            <Link 
              href="#"
              className="bg-white text-black hover:bg-[#c9b07c] hover:text-white transition-colors py-4 px-10 text-sm font-bold tracking-widest uppercase inline-flex items-center gap-3 group"
            >
              Comprar la Nueva Colección
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* 3. SECCIÓN: COMPRÁ POR LOOKS */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#c9b07c] text-xs font-bold uppercase tracking-[0.2em] mb-2 block">El Sistema Lola Ochoa</span>
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Total Look</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">No pierdas tiempo combinando. Llevate el conjunto exacto pensado por nuestros diseñadores.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-gray-100 mb-4 relative overflow-hidden flex items-center justify-center text-gray-400 text-xs">
                  [FOTO LOOK {item}]
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold uppercase tracking-widest px-6 py-3 w-[80%] text-center">
                    Ver Combo
                  </div>
                </div>
                <h3 className="font-serif text-xl mb-1">Look Ejecutiva {item}</h3>
                <p className="text-sm text-gray-500 mb-2">Campera + Texanas + Bandolera</p>
                <div className="text-lg font-semibold text-gray-900">$350.000 <span className="text-xs text-green-600 font-normal ml-2">Llevando el set</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SECCIÓN: NAVEGACIÓN RÁPIDA (Categorías) */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif text-center mb-10">Explorá nuestro catálogo</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {['Botas & Texanas', 'Zapatos & Zuecos', 'Carteras & Bolsos', 'Prendas de Cuero'].map((cat, idx) => (
                <Link href="#" key={idx} className="block group">
                  <div className="aspect-square bg-[#FDFBF7] flex items-center justify-center border border-gray-100 group-hover:border-[#c9b07c] transition-colors mb-4 text-xs text-gray-400">
                    [FOTO CAT {idx + 1}]
                  </div>
                  <h3 className="text-center text-xs md:text-sm font-bold uppercase tracking-widest text-gray-900 group-hover:text-[#c9b07c] transition-colors">{cat}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 5. SECCIÓN: FILOSOFÍA Y PRUEBA SOCIAL */}
        <section className="py-24 px-6 bg-[#1a1a1a] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#c9b07c] font-serif text-3xl md:text-5xl mb-6">12 Años Vistiendo Mujeres Imparables</h2>
            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-12">
              No hacemos calzado descartable. Hacemos piezas de cuero legítimo que te acompañan, te visten y te dan la seguridad para comerte el mundo, desde la reunión de las 9am hasta la cena a la noche.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { name: "Luciana G.", text: "Compro mis texanas acá hace 5 años. Son indestructibles y cómodas desde el primer uso." },
                { name: "María Inés", text: "La campera de cuero es un viaje de ida. La atención y la calidad de Lola Ochoa no tiene igual." },
                { name: "Sofía T.", text: "Por fin zapatos elegantes con los que puedo caminar cuadras sin morir de dolor." }
              ].map((testimonio, idx) => (
                <div key={idx} className="bg-[#262626] p-6 border border-[#333]">
                  <div className="flex text-[#c9b07c] mb-4">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">"{testimonio.text}"</p>
                  <p className="text-xs uppercase tracking-widest font-bold text-white">— {testimonio.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. SECCIÓN: BEST SELLERS */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif text-gray-900 mb-2">Favoritos de Siempre</h2>
              <p className="text-gray-500 text-sm">Los clásicos que nunca fallan.</p>
            </div>
            <Link href="#" className="hidden md:flex text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-[#c9b07c] hover:border-[#c9b07c] transition-colors">
              Ver todos
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400">
                <Package className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p>Próximamente nueva colección...</p>
              </div>
            ) : (
              products.map((product) => (
                <Link href="#" key={product.id} className="group block cursor-pointer">
                  <div className="aspect-[4/5] bg-gray-100 mb-4 overflow-hidden relative group-hover:shadow-lg transition-all">
                    {product.imageUrl ? (
                      <>
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className={`w-full h-full object-cover transition-opacity duration-500 ${product.images.length > 1 ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                        />
                        {product.images.length > 1 && (
                          <img 
                            src={product.images[1]} 
                            alt={`${product.name} detalle`} 
                            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105"
                          />
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Package className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-lg mb-1 group-hover:text-[#c9b07c] transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    {isWholesale && product.wholesalePrice ? (
                      <>
                        <span className="text-gray-400 line-through text-xs">${product.price.toLocaleString("es-AR")}</span>
                        <span className="font-semibold text-[#c9b07c]">${product.wholesalePrice.toLocaleString("es-AR")}</span>
                      </>
                    ) : product.salePrice ? (
                      <>
                        <span className="text-gray-400 line-through text-xs">${product.price.toLocaleString("es-AR")}</span>
                        <span className="font-semibold text-gray-900">${product.salePrice.toLocaleString("es-AR")}</span>
                      </>
                    ) : (
                      <span className="font-semibold text-gray-900">${product.price.toLocaleString("es-AR")}</span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>

      {/* 7. FOOTER (Burocracia) */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-sm">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl tracking-[0.2em] font-light uppercase mb-6">Lola Ochoa</h3>
            <p className="text-gray-500 mb-4">Zapatos de autor. Cuero legítimo.</p>
            <p className="text-gray-500 font-semibold mb-1">WhatsApp: +54 9 11 XXXX-XXXX</p>
            <p className="text-gray-500">hola@lolaochoa.com.ar</p>
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
