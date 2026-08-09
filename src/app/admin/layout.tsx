import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold tracking-widest uppercase">Lola Ochoa</h1>
            <p className="text-xs text-gray-500 uppercase mt-1 tracking-widest">Panel de Control</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <LayoutDashboard className="w-5 h-5 text-[#c9b07c]" />
              Resumen
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Package className="w-5 h-5" />
              Zapatos y Productos
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              Ventas y Envíos
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 w-full rounded-lg hover:bg-red-50 transition-colors">
              <LogOut className="w-5 h-5" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 md:hidden">
          <h1 className="text-lg font-bold tracking-widest uppercase">Panel Admin</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
