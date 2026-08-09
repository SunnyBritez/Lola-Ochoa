import Link from "next/link";
import { Plus, Package, Edit, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-serif text-gray-900">Catálogo de Productos</h2>
          <p className="text-sm text-gray-500 mt-1">Acá administrás tus zapatos, carteras y combos.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-[#1a1a1a] hover:bg-black text-white px-5 py-2.5 text-sm uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Subir Zapato Nuevo
        </Link>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-lg">Tu vidriera está vacía.</p>
            <p className="text-sm mt-1 mb-6">Tocá el botón negro de arriba para subir tu primer producto a la base de datos.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-widest text-[10px] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 flex-shrink-0 border border-gray-200 overflow-hidden">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-5 h-5 mx-auto mt-3 text-gray-300" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{product.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">${product.price.toLocaleString("es-AR")}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? `${product.stock} disp.` : 'Sin stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-[#c9b07c] p-2 transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600 p-2 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
