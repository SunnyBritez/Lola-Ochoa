import Link from "next/link";
import { Plus, Package, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  // Fetch more stats later

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-serif text-gray-900">Resumen del Negocio</h2>
          <p className="text-sm text-gray-500 mt-1">Acá vas a ver cómo vienen tus ventas diarias.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/products"
            className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 px-5 py-2.5 text-sm uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
          >
            Mis Productos
          </Link>
          <Link 
            href="/admin/products/new"
            className="bg-[#1a1a1a] hover:bg-black text-white px-5 py-2.5 text-sm uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Subir Zapato Nuevo
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Productos Activos</p>
              <h3 className="text-3xl font-bold text-gray-900">{productsCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Ventas del Mes</p>
              <h3 className="text-3xl font-bold text-gray-900">$0</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-lg">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Conversión Funnel</p>
              <h3 className="text-3xl font-bold text-gray-900">0%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-serif mb-4">Últimas Ventas</h3>
        <div className="text-center py-10 text-gray-500">
          <ShoppingCart className="w-10 h-10 mx-auto text-gray-300 mb-3" />
          <p>Todavía no hay ventas registradas.</p>
          <p className="text-sm mt-1">¡Inyectá tráfico al funnel para empezar a vender!</p>
        </div>
      </div>
    </div>
  );
}
