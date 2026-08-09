"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Upload, Loader2, Plus, Trash2 } from "lucide-react";
import { upload } from "@vercel/blob/client";
import imageCompression from "browser-image-compression";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    costPrice: "",
    wholesalePrice: "",
    category: "ZAPATOS",
  });

  const [variants, setVariants] = useState<{size: string, color: string, stock: number}[]>([]);
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newStock, setNewStock] = useState("1");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/products/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setFormData({
            name: data.name,
            description: data.description || "",
            price: data.price.toString(),
            costPrice: data.costPrice?.toString() || "",
            wholesalePrice: data.wholesalePrice?.toString() || "",
            category: data.category || "ZAPATOS",
          });
          setVariants(data.variants || []);
          setExistingImages(data.images || []);
          setExistingImageUrl(data.imageUrl);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load product", err);
          setLoading(false);
        });
    }
  }, [params.id]);

  const addVariant = () => {
    if (newSize && newColor && newStock) {
      setVariants([...variants, { size: newSize, color: newColor, stock: parseInt(newStock) }]);
      setNewSize("");
    }
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = existingImageUrl;
      let images = existingImages;

      if (files.length > 0) {
        // Si hay archivos nuevos, los subimos y pisamos los viejos (por simplicidad)
        const uploadPromises = files.map(async (file) => {
          const options = {
            maxSizeMB: 0.5, // 500KB max
            maxWidthOrHeight: 1920,
            useWebWorker: true
          };
          
          try {
            const compressedFile = await imageCompression(file, options);
            return upload(compressedFile.name, compressedFile, {
              access: 'public',
              handleUploadUrl: '/api/upload',
            });
          } catch (error) {
            console.error("Error comprimiendo imagen:", error);
            return upload(file.name, file, {
              access: 'public',
              handleUploadUrl: '/api/upload',
            });
          }
        });
        
        const blobs = await Promise.all(uploadPromises);
        images = blobs.map(b => b.url);
        imageUrl = images[0];
      }

      const totalStock = variants.reduce((acc, v) => acc + v.stock, 0);

      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          costPrice: formData.costPrice ? parseFloat(formData.costPrice) : undefined,
          wholesalePrice: formData.wholesalePrice ? parseFloat(formData.wholesalePrice) : undefined,
          stock: totalStock,
          variants,
          imageUrl,
          images,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Error al actualizar el producto");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-20 text-center text-gray-500 flex items-center justify-center"><Loader2 className="animate-spin w-6 h-6 mr-3"/> Cargando producto...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-gray-900 mb-2">Editar Producto</h1>
        <p className="text-sm text-gray-500">Modificá los detalles del zapato, precios o agregá más fotos.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* FOTO */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto del Producto</label>
            <div className="border-2 border-dashed border-gray-200 p-8 text-center flex flex-col items-center justify-center relative hover:border-[#c9b07c] transition-colors cursor-pointer bg-white">
              <input 
                type="file" 
                multiple
                accept="image/*"
                onChange={e => {
                  if (e.target.files) {
                    setFiles(Array.from(e.target.files));
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-8 h-8 text-gray-300 mb-3" />
              <p className="text-sm font-bold text-gray-700">Reemplazar Galería de Fotos</p>
              <p className="text-xs text-gray-500 mt-1">Arrastrá nuevas fotos para pisar las anteriores</p>
              {files.length > 0 ? (
                <div className="mt-4 p-2 bg-[#FDFBF7] text-[#c9b07c] text-xs font-bold border border-[#c9b07c]">
                  {files.length} fotos nuevas seleccionadas
                </div>
              ) : existingImages.length > 0 ? (
                <div className="mt-4 p-2 bg-gray-50 text-gray-500 text-xs font-bold border border-gray-200">
                  {existingImages.length} fotos actuales guardadas
                </div>
              ) : null}
            </div>
        </div>

        {/* NOMBRE */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nombre del Zapato</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#c9b07c] font-serif text-lg"
            placeholder="Ej: Bota Mónaco"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Precio Costo ($)</label>
            <input 
              type="number"
              min="0"
              value={formData.costPrice}
              onChange={e => setFormData({ ...formData, costPrice: e.target.value })}
              className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#c9b07c] text-sm"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Precio Mayorista ($)</label>
            <input 
              type="number"
              min="0"
              value={formData.wholesalePrice}
              onChange={e => setFormData({ ...formData, wholesalePrice: e.target.value })}
              className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#c9b07c] text-sm"
              placeholder="70000"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Precio Público ($)</label>
            <input 
              type="number"
              min="0"
              required
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#c9b07c] text-sm"
              placeholder="135000"
            />
          </div>
        </div>

          {/* CATEGORIA */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Categoría</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
              className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#c9b07c] bg-white text-sm"
            >
              <option value="ZAPATOS">Zapatos</option>
              <option value="CARTERAS">Carteras</option>
              <option value="COMBOS">Combos / Look</option>
            </select>
          </div>

        {/* DESCRIPCION */}
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Descripción Corta</label>
          <textarea 
            rows={3}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full border border-gray-200 p-4 focus:outline-none focus:border-[#c9b07c] text-sm resize-none"
            placeholder="Materiales, detalles de confección..."
          />
        </div>

        {/* VARIANTES / CURVA DE TALLES */}
        <div className="border border-gray-200 bg-white p-6">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Curva de Talles y Colores</label>
          
          <div className="flex gap-4 mb-4">
            <input 
              type="text" 
              placeholder="Talle (ej: 36)" 
              value={newSize}
              onChange={e => setNewSize(e.target.value)}
              className="w-1/4 border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c9b07c]"
            />
            <input 
              type="text" 
              placeholder="Color (ej: Negro)" 
              value={newColor}
              onChange={e => setNewColor(e.target.value)}
              className="w-1/4 border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c9b07c]"
            />
            <input 
              type="number" 
              min="1"
              placeholder="Stock" 
              value={newStock}
              onChange={e => setNewStock(e.target.value)}
              className="w-1/4 border border-gray-200 p-3 text-sm focus:outline-none focus:border-[#c9b07c]"
            />
            <button 
              type="button" 
              onClick={addVariant}
              className="w-1/4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm tracking-widest uppercase transition-colors"
            >
              Agregar
            </button>
          </div>

          {variants.length > 0 && (
            <div className="mt-4">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-2 font-normal">Talle</th>
                    <th className="py-2 font-normal">Color</th>
                    <th className="py-2 font-normal">Stock</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 font-semibold">{v.size}</td>
                      <td className="py-3">{v.color}</td>
                      <td className="py-3">{v.stock} unid.</td>
                      <td className="py-3 text-right">
                        <button type="button" onClick={() => removeVariant(idx)} className="text-red-500 hover:text-red-700 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-gray-200 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto bg-[#1a1a1a] hover:bg-black text-white px-10 py-4 text-sm font-bold tracking-widest uppercase flex items-center justify-center transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Guardar Cambios"}
          </button>
        </div>

      </form>
    </div>
  );
}
