"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2 } from "lucide-react";
import type { put } from "@vercel/blob";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "ZAPATOS",
    stock: "10",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;

      // 1. Upload image to Vercel Blob if selected
      if (file) {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: 'POST',
          body: file,
        });
        const blob = await response.json();
        imageUrl = blob.url;
      }

      // 2. Save product to Database
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          imageUrl,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Subir Nuevo Producto</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-100 shadow-sm rounded-lg space-y-6">
        
        {/* FOTO */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto del Producto (Alta Calidad)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
            <input 
              type="file" 
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
            {file ? (
              <div className="text-green-600 font-medium">{file.name} (Lista para subir)</div>
            ) : (
              <div className="text-gray-500 flex flex-col items-center">
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p>Hacé clic acá para seleccionar la foto desde tu compu</p>
                <p className="text-xs mt-1">Formato JPG o PNG.</p>
              </div>
            )}
          </div>
        </div>

        {/* NOMBRE */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nombre Comercial</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full border border-gray-300 p-3 focus:outline-none focus:border-[#c9b07c]"
            placeholder="Ej: Texanas Arizona Negras"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* PRECIO */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Precio de Venta ($)</label>
            <input 
              type="number" 
              required
              min="0"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-[#c9b07c]"
              placeholder="150000"
            />
          </div>

          {/* CATEGORIA */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Categoría</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-[#c9b07c] bg-white"
            >
              <option value="ZAPATOS">Zapatos / Botas</option>
              <option value="CARTERAS">Carteras / Bolsos</option>
              <option value="ROPA">Camperas / Ropa</option>
              <option value="TOTAL_LOOK">Combo "Total Look"</option>
            </select>
          </div>
        </div>

        {/* DESCRIPCION */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Descripción (Para la web)</label>
          <textarea 
            rows={4}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full border border-gray-300 p-3 focus:outline-none focus:border-[#c9b07c]"
            placeholder="Describí el material, el calce y los detalles..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#1a1a1a] hover:bg-black text-white py-4 font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Guardando en Base de Datos...</>
          ) : (
            "Guardar Producto y Publicar"
          )}
        </button>
      </form>
    </div>
  );
}
