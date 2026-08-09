"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, Plus, Trash2 } from "lucide-react";
import { upload } from "@vercel/blob/client";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "ZAPATOS",
  });

  const [variants, setVariants] = useState(
    [35, 36, 37, 38, 39, 40].map(size => ({ size: size.toString(), color: "Negro", stock: "0" }))
  );

  const addVariant = () => {
    setVariants([...variants, { size: "", color: "", stock: "0" }]);
  };

  const addColorCurve = () => {
    const newVariants = [35, 36, 37, 38, 39, 40].map(size => ({
      size: size.toString(),
      color: "Negro",
      stock: "0"
    }));
    setVariants([...variants, ...newVariants]);
  };

  const updateVariant = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;

      if (file) {
        const newBlob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
        });
        imageUrl = newBlob.url;
      }

      // Calcular stock total sumando todas las variantes
      const totalStock = variants.reduce((acc, curr) => acc + parseInt(curr.stock || "0"), 0);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: totalStock,
          variants,
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
    <div className="max-w-3xl mx-auto pb-20">
      <h2 className="text-2xl font-serif text-gray-900 mb-6">Subir Nuevo Producto</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-100 shadow-sm rounded-lg space-y-8">
        
        {/* FOTO */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto del Producto</label>
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
                <p className="text-xs mt-1">Se recortará automáticamente al tamaño de la web.</p>
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
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Descripción</label>
          <textarea 
            rows={4}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full border border-gray-300 p-3 focus:outline-none focus:border-[#c9b07c]"
            placeholder="Describí el material, el calce y los detalles..."
          ></textarea>
        </div>

        {/* VARIANTES (TALLES Y COLORES) */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex justify-between items-center mb-4">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">Talles, Colores y Stock</label>
            <div className="flex gap-4">
              <button 
                type="button" 
                onClick={addColorCurve}
                className="text-xs uppercase tracking-widest font-bold text-[#c9b07c] hover:text-black flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" /> Curva 35 al 40
              </button>
              <button 
                type="button" 
                onClick={addVariant}
                className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-black flex items-center gap-1 transition-colors"
              >
                <Plus className="w-4 h-4" /> Talle Individual
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-3 items-center bg-gray-50 p-3 border border-gray-200">
                <input 
                  type="text" 
                  placeholder="Talle (ej: 38)" 
                  required
                  value={variant.size}
                  onChange={e => updateVariant(index, 'size', e.target.value)}
                  className="flex-1 border border-gray-300 p-2 text-sm focus:outline-none focus:border-[#c9b07c]"
                />
                <input 
                  type="text" 
                  placeholder="Color (ej: Negro)" 
                  required
                  value={variant.color}
                  onChange={e => updateVariant(index, 'color', e.target.value)}
                  className="flex-1 border border-gray-300 p-2 text-sm focus:outline-none focus:border-[#c9b07c]"
                />
                <input 
                  type="number" 
                  placeholder="Stock" 
                  required
                  min="0"
                  value={variant.stock}
                  onChange={e => updateVariant(index, 'stock', e.target.value)}
                  className="w-24 border border-gray-300 p-2 text-sm focus:outline-none focus:border-[#c9b07c]"
                />
                {variants.length > 1 && (
                  <button type="button" onClick={() => removeVariant(index)} className="text-gray-400 hover:text-red-600 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#1a1a1a] hover:bg-black text-white py-4 font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Guardando...</>
          ) : (
            "Guardar Zapato y Publicar"
          )}
        </button>
      </form>
    </div>
  );
}
