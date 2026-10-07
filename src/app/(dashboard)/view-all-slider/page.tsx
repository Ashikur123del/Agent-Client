"use client";

import { useState, useEffect, useCallback } from "react";
import { FaPlus, FaTrash, FaEye, FaArrowLeft, FaEdit, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { getSliders } from "@/lib/serviceapi/slider.service";
import { deleteSliderAction, updateSliderAction } from "@/lib/serviceapi/serveraction/slider.service";


interface Slide {
  id: string | number;
  image: string;
  alt?: string;
  firstText: string;
  highlightText: string;
  secondText?: string;
  description: string;
}

export default function ViewAllSliderPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [fetchingSlides, setFetchingSlides] = useState(true);

  // Modal States
  const [selectedSlide, setSelectedSlide] = useState<Slide | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Edit Form States
  const [editForm, setEditForm] = useState({
    alt: "",
    firstText: "",
    highlightText: "",
    secondText: "",
    description: "",
  });
  const [editImage, setEditImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useCallback ব্যবহার করার ফলে এটি ক্যাস্কেডিং রেন্ডার ওয়ার্নিং দূর করবে
  const fetchSlidesList = useCallback(async () => {
    try {
      setFetchingSlides(true);
      const data = await getSliders();
      setSlides(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch slides:", error);
      toast.error("Failed to load sliders!");
    } finally {
      setFetchingSlides(false);
    }
  }, []);

  useEffect(() => {
    fetchSlidesList();
  }, [fetchSlidesList]);

  // Open Edit Modal & Set Values
  const handleOpenEdit = (slide: Slide) => {
    setSelectedSlide(slide);
    setEditForm({
      alt: slide.alt || "",
      firstText: slide.firstText || "",
      highlightText: slide.highlightText || "",
      secondText: slide.secondText || "",
      description: slide.description || "",
    });
    setEditImage(null);
    setIsEditOpen(true);
  };

  // Handle Edit Submit
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlide) return;

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("alt", editForm.alt);
      formData.append("firstText", editForm.firstText);
      formData.append("highlightText", editForm.highlightText);
      formData.append("secondText", editForm.secondText);
      formData.append("description", editForm.description);
      
      if (editImage) {
        formData.append("image", editImage);
      } else {
        formData.append("image", selectedSlide.image);
      }

      const res = await updateSliderAction(String(selectedSlide.id), formData);
      if (res?.success) {
        toast.success("Slide updated successfully!");
        setIsEditOpen(false);
        fetchSlidesList();
      } else {
        toast.error(res?.message || "Failed to update slide!");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // স্লাইড ডিলিট হ্যান্ডলার (Modal Confirm)
  const handleDeleteConfirm = async () => {
    if (!selectedSlide) return;

    try {
      const res = await deleteSliderAction(selectedSlide.id);
      if (res?.success) {
        toast.success("Slide deleted successfully!");
        setIsDeleteOpen(false);
        fetchSlidesList();
      } else {
        toast.error(res?.message || "Failed to delete slide!");
      }
    } catch (error) {
      console.error("Error deleting slide:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200/80 gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              All Hero Sliders ({slides.length})
            </h1>
            <p className="text-xs text-slate-500">
              Manage, view details, edit, or delete your existing website sliders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/heroslider"
              className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
            >
              <FaArrowLeft /> Back to Add Slide
            </Link>
            <Link
              href="/heroslider"
              className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-sm font-semibold flex items-center gap-2 transition shadow-md shadow-emerald-600/20"
            >
              <FaPlus /> Add New Slide
            </Link>
          </div>
        </div>

        {/* Existing Slides Table Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
          {fetchingSlides ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-slate-500 text-base animate-pulse font-medium">
                Loading sliders from server...
              </p>
            </div>
          ) : slides.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 space-y-3 m-8">
              <p className="text-slate-500 font-medium">No slides found in database.</p>
              <Link
                href="/heroslider"
                className="inline-block px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition"
              >
                Create your first slide
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-600 text-xs uppercase tracking-wider font-semibold">
                    <th className="py-4 px-6">Image</th>
                    <th className="py-4 px-6">Title Text</th>
                    <th className="py-4 px-6">Description</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm">
                  {slides.map((slide, index) => {
                    const imageUrl = slide.image?.startsWith("http")
                      ? slide.image
                      : slide.image?.startsWith("/")
                      ? slide.image
                      : `/${slide.image}`;

                    return (
                      <tr key={slide.id || index} className="hover:bg-slate-50/80 transition">
                        {/* Image Column */}
                        <td className="py-4 px-6">
                          <div className="relative h-12 w-20 rounded-lg overflow-hidden bg-slate-200 shadow-sm">
                            {slide.image ? (
                              <Image
                                src={imageUrl}
                                alt={slide.alt || "Slide"}
                                fill
                                unoptimized={true}
                                className="object-cover"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-[10px] text-slate-400">
                                No Image
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Title Column */}
                        <td className="py-4 px-6">
                          <p className="font-semibold text-slate-800 line-clamp-1">
                            {slide.firstText}{" "}
                            <span className="text-amber-600">{slide.highlightText}</span>{" "}
                            {slide.secondText}
                          </p>
                        </td>

                        {/* Description Column */}
                        <td className="py-4 px-6 max-w-xs">
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {slide.description}
                          </p>
                        </td>

                        {/* Actions Column */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => {
                                setSelectedSlide(slide);
                                setIsDetailsOpen(true);
                              }}
                              className="p-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                              title="View Details"
                            >
                              <FaEye />
                            </button>

                            <button
                              onClick={() => handleOpenEdit(slide)}
                              className="p-2 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                              title="Edit Slide"
                            >
                              <FaEdit />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedSlide(slide);
                                setIsDeleteOpen(true);
                              }}
                              className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                              title="Delete Slide"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= 1. DETAILS MODAL ================= */}
        {isDetailsOpen && selectedSlide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-bold text-slate-800">Slide Details</h3>
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={selectedSlide.image?.startsWith("http") ? selectedSlide.image : `/${selectedSlide.image}`}
                  alt="Details"
                  fill
                  unoptimized={true}
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 text-sm">
                <p><strong className="text-slate-700">First Text:</strong> {selectedSlide.firstText}</p>
                <p><strong className="text-slate-700">Highlight Text:</strong> <span className="text-amber-600 font-semibold">{selectedSlide.highlightText}</span></p>
                <p><strong className="text-slate-700">Second Text:</strong> {selectedSlide.secondText || "N/A"}</p>
                <p><strong className="text-slate-700">Alt Text:</strong> {selectedSlide.alt || "N/A"}</p>
                <p><strong className="text-slate-700">Description:</strong> {selectedSlide.description}</p>
              </div>

              <div className="flex justify-end pt-3 border-t">
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. EDIT MODAL ================= */}
        {isEditOpen && selectedSlide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-bold text-slate-800">Edit Slide</h3>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">First Text</label>
                  <input
                    type="text"
                    value={editForm.firstText}
                    onChange={(e) => setEditForm({ ...editForm, firstText: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Highlight Text</label>
                  <input
                    type="text"
                    value={editForm.highlightText}
                    onChange={(e) => setEditForm({ ...editForm, highlightText: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Second Text</label>
                  <input
                    type="text"
                    value={editForm.secondText}
                    onChange={(e) => setEditForm({ ...editForm, secondText: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full border rounded-xl px-3 py-2 text-sm focus:outline-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Upload New Image (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setEditImage(e.target.files[0])}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= 3. DELETE MODAL ================= */}
        {isDeleteOpen && selectedSlide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl text-center">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-xl">
                <FaTrash />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Are you sure?</h3>
              <p className="text-xs text-slate-500">
                Do you really want to delete this slide? This action cannot be undone.
              </p>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setIsDeleteOpen(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition shadow-md shadow-rose-600/20"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}