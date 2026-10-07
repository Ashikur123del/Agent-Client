"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaCloudUploadAlt, FaImages, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddGalleryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Hotels");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image file!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", image);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gallery`, {
        method: "POST",
        body: formData,
      });


      const textResponse = await res.text();
      let result;
      try {
        result = JSON.parse(textResponse);
      } catch (err) {
        console.error("Server returned non-JSON response:", textResponse);
        toast.error("Server error (500). Please check backend code/logs.");
        setLoading(false);
        return;
      }
      
      if (res.ok && (result.success || result._id || result.id)) {
        toast.success("Uploaded successfully!");
        setTitle("");
        setCategory("Hotels");
        setImage(null);
      } else {
        toast.error(result.message || "Failed to upload!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network or connection error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-4">
      {/* টপ হেডার */}
      <div className="flex max-w-2xl mx-auto flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/85 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FaImages className="text-emerald-600" /> Upload Gallery Image
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Add new photos to your hotel and travel gallery collection.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/gallery-view-details"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl transition border border-emerald-200"
          >
            View Gallery
          </Link>
          <Link
            href="/addgallery"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition"
          >
            <FaArrowLeft className="text-xs" />
            Back
          </Link>
        </div>
      </div>

      {/* ফর্ম সেকশন */}
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Image Title / Caption</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm text-slate-800"
              placeholder="Enter caption..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm text-slate-800"
              placeholder="e.g. Hotels, Rooms, Resorts"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Image File</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-emerald-500 transition">
              <FaCloudUploadAlt className="text-3xl text-slate-400 mb-2" />
              <span className="text-sm text-slate-600">
                {image ? image.name : "Browse gallery image"}
              </span>
              <input 
                type="file" 
                onChange={(e) => e.target.files && setImage(e.target.files[0])} 
                accept="image/*" 
                required 
                className="hidden" 
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading && <FaSpinner className="animate-spin text-sm" />}
            {loading ? "Uploading..." : "Upload to Gallery"}
          </button>
        </form>
      </div>
    </div>
  );
}