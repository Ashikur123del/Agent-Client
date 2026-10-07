"use client";

import { useState } from "react";
import { FaPlus, FaImage, FaHeading, FaParagraph, FaList } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";
import { createSliderAction } from "@/lib/serviceapi/serveraction/slider.service";


export default function AdminHeroSliderPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);

    try {
      const result = await createSliderAction(formData);

      if (result.success) {
        toast.success("Hero Slide added successfully!");
        formElement.reset();
      } else {
        toast.error(result.message || "Failed to add slide. Try again.");
      }
    } catch (error) {
      console.error("Error submitting slide:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Header with Correct Link */}
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200/80">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Hero Slider Management</h1>
            <p className="text-xs text-slate-500">Create or manage your website hero banner slides.</p>
          </div>
          <Link
            href="/view-all-slider"
            className="px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-sm font-semibold flex items-center gap-2 transition"
          >
            <FaList /> View All Slides
          </Link>
        </div>

        {/* Add New Form Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-900 to-emerald-950 px-8 py-6 text-white">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <FaPlus className="text-amber-400 text-lg" /> Add New Hero Slider
            </h2>
            <p className="text-teal-100 text-sm mt-1">
              Upload a local image and fill up the details to add a dynamic banner slide.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FaImage className="text-emerald-600" /> Upload Background Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full text-slate-700 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 border border-slate-300 rounded-xl cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  name="alt"
                  placeholder="e.g. Beach destination view"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FaHeading className="text-cyan-600" /> First Text (Normal)
                </label>
                <input
                  type="text"
                  name="firstText"
                  placeholder="e.g. Your trusted partner"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FaHeading className="text-amber-600" /> Highlight Text (Gradient)
                </label>
                <input
                  type="text"
                  name="highlightText"
                  placeholder="e.g. Visa & Ticket"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FaHeading className="text-indigo-600" /> Second Text (End Line)
                </label>
                <input
                  type="text"
                  name="secondText"
                  placeholder="e.g. Hajj & Umrah services."
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <FaParagraph className="text-teal-600" /> Slide Description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Write a short summary text..."
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              ></textarea>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 font-bold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-600 transition disabled:opacity-50"
              >
                {loading ? "Saving Slide..." : "Publish Slide"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}