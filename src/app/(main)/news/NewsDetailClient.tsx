"use client";

import { useState, useEffect } from "react";
import { FaNewspaper, FaTrash, FaEdit, FaSpinner, FaArrowLeft, FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import { getNews } from "@/lib/serviceapi/slider.service";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/news`;

// নিউজ আইটেমের জন্য সুনির্দিষ্ট টাইপ বা ইন্টারফেস
interface NewsItem {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  category: string;
  excerpt: string;
  content: string;
  date?: string;
  readTime?: string;
  author?: string;
  image?: string;
}

export default function NewsViewDetailsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // সব নিউজ ডাটা ফেচ করা (Get News)
  const fetchNewsList = async () => {
    try {
      setLoading(true);
      const data = await getNews();
      setNewsList(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error("Error fetching news:", error);
      toast.error("Failed to load news list!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsList();
  }, []);

  // নিউজ ডিলিট হ্যান্ডলার (Delete API Call)
  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this news article?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete news.");
      }

      toast.success("News deleted successfully!");
      setNewsList((prev) => prev.filter((item) => (item._id || item.id) !== id));
      if (selectedNews?._id === id || selectedNews?.id === id) {
        setSelectedNews(null);
        setIsEditing(false);
      }
    } catch (error: any) {
      console.error("Delete Error:", error);
      toast.error(error?.message || "Something went wrong!");
    }
  };

  // নিউজ আপডেট হ্যান্ডলার (Update API Call - JSON format)
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNews) return;

    try {
      setIsSubmitting(true);
      const id = selectedNews._id || selectedNews.id;
      
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedNews),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update news.");
      }

      toast.success("News updated successfully!");
      setIsEditing(false);
      fetchNewsList();
    } catch (error: any) {
      console.error("Update Error:", error);
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/30 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/85 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <FaNewspaper className="text-emerald-600" /> News Management
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Browse through articles, view details, modify content, or remove items.
            </p>
          </div>
          {selectedNews && (
            <button
              onClick={() => { setSelectedNews(null); setIsEditing(false); }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition"
            >
              <FaArrowLeft className="text-xs" /> Back to All News
            </button>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-emerald-600 text-3xl" />
          </div>
        ) : !selectedNews ? (
          /* News List View */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {newsList.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">No articles available to manage.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {newsList.map((item) => {
                  const itemId = item._id || item.id;
                  return (
                    <div key={itemId} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          {item.image && <Image src={item.image} alt={item.title || "News"} fill className="object-cover" />}
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {item.category || "General"}
                          </span>
                          <h2 className="text-base font-bold text-slate-800 line-clamp-1">{item.title}</h2>
                          <p className="text-xs text-slate-400 flex items-center gap-2">
                            <span><FaCalendarAlt className="inline text-amber-500 mr-1" /> {item.date || "N/A"}</span>
                            <span>•</span>
                            <span><FaUser className="inline text-amber-500 mr-1" /> {item.author || "Admin"}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => { setSelectedNews(item); setIsEditing(false); }}
                          className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl transition border border-blue-200"
                        >
                          Read Details
                        </button>
                        <button
                          onClick={() => { setSelectedNews(item); setIsEditing(true); }}
                          className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-xl transition border border-emerald-200 flex items-center gap-1.5"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(itemId!)}
                          className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold rounded-xl transition border border-rose-200 flex items-center gap-1.5"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : isEditing ? (
          /* Edit Form View */
          <form onSubmit={handleUpdateSubmit} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-800 border-b pb-3">Edit Article Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">Article Title</label>
                <input
                  type="text"
                  value={selectedNews.title || ""}
                  onChange={(e) => setSelectedNews({ ...selectedNews, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Category</label>
                <input
                  type="text"
                  value={selectedNews.category || ""}
                  onChange={(e) => setSelectedNews({ ...selectedNews, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Author Name</label>
                <input
                  type="text"
                  value={selectedNews.author || ""}
                  onChange={(e) => setSelectedNews({ ...selectedNews, author: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">Short Excerpt</label>
                <textarea
                  rows={2}
                  value={selectedNews.excerpt || ""}
                  onChange={(e) => setSelectedNews({ ...selectedNews, excerpt: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">Full Content Body</label>
                <textarea
                  rows={6}
                  value={selectedNews.content || ""}
                  onChange={(e) => setSelectedNews({ ...selectedNews, content: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          /* Single News View Details */
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                Detailed View Mode
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedNews._id || selectedNews.id!)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>

            <article className="space-y-6 max-w-3xl mx-auto">
              <span className="bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                {selectedNews.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                {selectedNews.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 border-y border-slate-100 py-3">
                <span className="flex items-center gap-1"><FaCalendarAlt className="text-amber-500" /> {selectedNews.date || "N/A"}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><FaClock className="text-amber-500" /> {selectedNews.readTime || "3 min read"}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><FaUser className="text-amber-500" /> {selectedNews.author || "Admin"}</span>
              </div>

              {selectedNews.image && (
                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md bg-slate-100">
                  <Image src={selectedNews.image} alt={selectedNews.title || "News"} fill className="object-cover" />
                </div>
              )}

              <div className="p-5 bg-emerald-50/50 border-l-4 border-emerald-600 rounded-r-xl text-slate-700 font-medium text-base">
                {selectedNews.excerpt}
              </div>

              <div className="text-slate-700 text-base leading-relaxed space-y-4 whitespace-pre-line">
                {selectedNews.content}
              </div>
            </article>
          </div>
        )}

      </div>
    </div>
  );
}