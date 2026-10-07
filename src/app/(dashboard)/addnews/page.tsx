"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaNewspaper, FaArrowLeft, FaUpload, FaSpinner, FaEye, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { createNewsAction } from "@/lib/serviceapi/serveraction/news.service";

export default function AddNewsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false); // লাইভ প্রিভিউ টগল

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    categoryColor: "from-amber-500 to-orange-500",
    excerpt: "",
    content: "",
    date: new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
    readTime: "3 min read",
    author: "Travel Desk",
    featured: false,
  });

  // ইনপুট পরিবর্তন হ্যান্ডলার
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // টাইটেল থেকে অটো স্লাগ জেনারেটর
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, title, slug }));
  };

  // ইমেজ সিলেক্ট হ্যান্ডলার
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ফর্ম সাবমিট হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      toast.error("Please select a featured image!");
      return;
    }

    try {
      setIsSubmitting(true);
      const data = new FormData();
      data.append("image", imageFile);
      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append("category", formData.category);
      data.append("categoryColor", formData.categoryColor);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("date", formData.date);
      data.append("readTime", formData.readTime);
      data.append("author", formData.author);
      data.append("featured", String(formData.featured));

      const result = await createNewsAction(data);

      if (result.success) {
        toast.success("News added successfully!");
        router.push("/news");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to add news!");
      }
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/30 p-4 sm:p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/85 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <FaNewspaper className="text-emerald-600" /> Create Travel Article
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Publish rich content, visa guidelines, or exclusive travel insights.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/news-view-details"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl transition border border-emerald-200"
            >
              {isPreviewMode ? <FaEdit className="text-xs" /> : <FaEye className="text-xs" />}
              {isPreviewMode ? "Edit Form" : "Live Preview"}
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition"
            >
              <FaArrowLeft className="text-xs" />
              Back
            </Link>
          </div>
        </div>

        {/* Form Section with onSubmit Handler */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700">
              Featured Cover Image <span className="text-rose-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-44 w-full sm:w-80 bg-slate-50 rounded-2xl overflow-hidden border-2 border-dashed border-slate-300 flex items-center justify-center group hover:border-emerald-500 transition">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <FaUpload className="mx-auto text-slate-300 text-2xl mb-2 group-hover:text-emerald-500 transition" />
                    <span className="text-xs text-slate-400 font-medium">Click or drag image to upload</span>
                  </div>
                )}
              </div>
              <div className="flex-1 w-full space-y-2">
                <label className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl cursor-pointer transition shadow-md shadow-emerald-600/20">
                  <FaUpload className="text-xs" />
                  <span>Choose Cover Image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <p className="text-xs text-slate-400">Supports JPG, PNG, WEBP.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Title */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">Article Title <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g., Ultimate Guide to Exploring Switzerland"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">URL Slug <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g., ultimate-guide-switzerland"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Category <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Visa Guide, Travel Tips"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Category Color Gradient */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Badge Theme Gradient</label>
              <select
                name="categoryColor"
                value={formData.categoryColor}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm bg-slate-50/50"
              >
                <option value="from-amber-500 to-orange-500">Amber to Orange</option>
                <option value="from-emerald-500 to-teal-500">Emerald to Teal</option>
                <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                <option value="from-rose-500 to-red-600">Rose to Red</option>
              </select>
            </div>

            {/* Date */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Display Date <span className="text-rose-500">*</span></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="e.g., 22 June 2026"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Read Time */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Read Time</label>
              <input
                type="time"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g., 4 min read"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Author */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Author Name</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g., Travel Desk Editorial"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm bg-slate-50/50"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-3 pt-6 sm:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="featured" className="text-sm font-semibold text-slate-700 cursor-pointer">
                🔥 Mark as Featured Article
              </label>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">Short Excerpt / Summary <span className="text-rose-500">*</span></label>
              <textarea
                name="excerpt"
                rows={2}
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a catchy summary for card view..."
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm resize-none bg-slate-50/50"
              />
            </div>

            {/* Content */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700">Full Content Body <span className="text-rose-500">*</span></label>
              <textarea
                name="content"
                rows={7}
                value={formData.content}
                onChange={handleChange}
                placeholder="Write full article description in detail..."
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 text-sm resize-none bg-slate-50/50"
              />
            </div>

            {/* Submit Button Section Added */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-200/60 sm:col-span-2">
              <Link
                href="/news"
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-emerald-600/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin text-sm" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Publish Article</span>
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}