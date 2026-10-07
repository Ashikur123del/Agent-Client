"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaTrash, FaEdit, FaSpinner, FaImage, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description?: string; 
}

export default function GalleryViewDetailsPage() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [updating, setUpdating] = useState(false);

  const [readingItem, setReadingItem] = useState<GalleryItem | null>(null);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`, {
        cache: "no-store",
      });
      const result = await res.json();
      if (res.ok || result.success) {
        const items = Array.isArray(result) ? result : result.data || [];
        setGalleries(items);
      } else {
        toast.error(result.message || "Failed to fetch galleries");
      }
    } catch (error) {
      console.error("Error fetching galleries:", error);
      toast.error("Something went wrong while fetching!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  // Delete Action
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (res.ok || result.success) {
        toast.success("Gallery deleted successfully!");
        setGalleries((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error(result.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Internal server error!");
    }
  };

  // Open Edit Modal / Form
  const handleEditClick = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setImage(null);
  };

  // Update Action
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      
      if (image) {
        formData.append("image", image);
      } else if (editingItem.imageUrl) {
        formData.append("imageUrl", editingItem.imageUrl);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery/${editingItem.id}`, {
        method: "PUT",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response.");
      }

      const result = await res.json();

      if (res.ok || result.success) {
        toast.success("Gallery updated successfully!");
        setEditingItem(null);
        fetchGalleries();
      } else {
        toast.error(result.message || "Failed to update");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      console.error("Update error:", error);
      toast.error(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/85 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FaImage className="text-emerald-600" /> Gallery Management
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View, read, update, or delete your travel gallery items.
          </p>
        </div>
        <div>
          <Link
            href="/addgallery"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition shadow-sm"
          >
            <FaArrowLeft className="text-xs" /> Add New Image
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <FaSpinner className="animate-spin text-3xl text-emerald-600" />
        </div>
      ) : galleries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">No gallery items found.</p>
        </div>
      ) : (
        /* Gallery Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                  <Image 
                    src={item.imageUrl} 
                    alt={item.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover" 
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow z-10">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-800 line-clamp-1">{item.title}</h3>
                </div>
              </div>

              {/* Action Buttons (Read, Edit, Delete) */}
              <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setReadingItem(item)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition flex items-center gap-1"
                >
                  <FaEye /> Read
                </button>
                <button
                  onClick={() => handleEditClick(item)}
                  className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold rounded-lg transition flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg transition flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Read Details Modal */}
      {readingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-xl w-full p-6 rounded-2xl shadow-xl space-y-4 relative max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 w-full rounded-xl overflow-hidden bg-slate-100">
              <Image 
                src={readingItem.imageUrl} 
                alt={readingItem.title} 
                fill 
                className="object-cover"
              />
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                {readingItem.category}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{readingItem.title}</h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {readingItem.description || "No additional description available for this gallery item."}
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setReadingItem(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-2xl shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-slate-800">Edit Gallery Item</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">New Image (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => e.target.files && setImage(e.target.files[0])}
                  accept="image/*"
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition flex items-center gap-2"
                >
                  {updating && <FaSpinner className="animate-spin text-xs" />}
                  {updating ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}