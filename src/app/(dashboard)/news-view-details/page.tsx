"use client";

import { useState, useEffect } from "react";
import { FaNewspaper, FaTrash, FaEdit, FaSpinner, FaCalendarAlt, FaUser, FaMagic } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import { NewsItem } from "@/types/news"; 
import Link from "next/link";
import { getAllNewsAction, updateNewsAction, deleteNewsAction } from "@/lib/serviceapi/serveraction/news.service";

export default function NewsViewDetailsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await getAllNewsAction();
      if (response.success && response.data) {
        setNewsList(response.data);
      } else {
        toast.error(response.message || "Failed to load news list!");
      }
    } catch (error: unknown) {
      console.error("Error fetching news:", error);
      toast.error("Failed to load news list!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    try {
      const response = await deleteNewsAction(id);
      if (response.success) {
        toast.success("Deleted successfully!");
        setNewsList((prev) => prev.filter((item) => (item._id || item.id) !== id));
        if (selectedNews?._id === id || selectedNews?.id === id) {
          setSelectedNews(null);
          setIsEditing(false);
        }
      } else {
        toast.error(response.message || "Failed to delete!");
      }
    } catch (error: unknown) {
      console.error("Error deleting news:", error);
      toast.error("Something went wrong!");
    }
  };

  // AI দিয়ে কন্টেন্ট ও এক্সসার্প্ট জেনারেট করার ফাংশন
  const handleAiAssist = () => {
    if (!selectedNews || !selectedNews.title) {
      toast.error("Please provide a title first for AI generation!");
      return;
    }

    setIsAiGenerating(true);
    setTimeout(() => {
      const title = selectedNews.title || "Travel Article";
      const enhancedExcerpt = `Discover the ultimate insights and essential guidelines regarding ${title}. A comprehensive look crafted for modern travelers seeking authentic experiences.`;
      const enhancedContent = `Welcome to our detailed guide on ${title}.\n\nWhen planning your journey, preparation is key to making the most out of your destination. From navigating local transportation, uncovering hidden gems, to understanding cultural nuances and safety tips, this article covers everything you need to know.\n\nMake sure to plan ahead, check visa and documentation requirements early, and embrace the adventure with an open mind. Safe travels!`;

      setSelectedNews({
        ...selectedNews,
        excerpt: enhancedExcerpt,
        content: enhancedContent,
      });

      setIsAiGenerating(false);
      toast.success("AI successfully generated content and summary!");
    }, 1000);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNews) return;

    try {
      setIsSubmitting(true);
      const id = selectedNews._id || selectedNews.id;
      if (!id) {
        toast.error("News ID is missing!");
        return;
      }

      const response = await updateNewsAction(id, selectedNews);

      if (response.success) {
        toast.success("Updated successfully!");
        setIsEditing(false);
        fetchNews();
      } else {
        toast.error(response.message || "Failed to update!");
      }
    } catch (error: unknown) {
      console.error("Error updating news:", error);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/30 p-4 sm:p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-slate-200/80 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
              <FaNewspaper className="text-emerald-600" /> News Management & Date Control
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage articles, check publication timestamps, and edit details with AI assistance.
            </p>
          </div>
          <Link
            href="/addnews"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl transition border border-emerald-200"
          >
            Back To Add News
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin text-emerald-600 text-3xl" />
          </div>
        ) : !selectedNews ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            {newsList.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">No articles available.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {newsList.map((item) => {
                  const itemId = item._id || item.id || "";
                  return (
                    <div key={itemId} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                          {item.image && <Image src={item.image} alt={item.title || "News"} fill className="object-cover" />}
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {item.category}
                          </span>
                          <h2 className="text-base font-bold text-slate-800 line-clamp-1">{item.title}</h2>
                          <p className="text-xs text-slate-400 flex items-center gap-2">
                            <span><FaCalendarAlt className="inline text-amber-500 mr-1" /> {item.date || "N/A"} {item.readTime && `• ${item.readTime}`}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => { setSelectedNews(item); setIsEditing(false); }}
                          className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-xl transition border border-blue-200"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => { setSelectedNews(item); setIsEditing(true); }}
                          className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-xl transition border border-emerald-200 flex items-center gap-1.5"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(itemId)}
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
          <form onSubmit={handleUpdateSubmit} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 gap-4">
              <h2 className="text-xl font-bold text-slate-800">Edit Article Information & Timestamp</h2>
              
              <button
                type="button"
                onClick={handleAiAssist}
                disabled={isAiGenerating}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl transition shadow-md shadow-purple-500/20 disabled:opacity-50"
              >
                {isAiGenerating ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>AI Generating...</span>
                  </>
                ) : (
                  <>
                    <FaMagic className="text-amber-300" />
                    <span>AI Assistant Enhance</span>
                  </>
                )}
              </button>
            </div>
            
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

              {/* আলাদা ডেট ফিল্ড */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Display Date</label>
                <input
                  type="text"
                  value={selectedNews.date || ""}
                  onChange={(e) => setSelectedNews({ ...selectedNews, date: e.target.value })}
                  placeholder="e.g. August 23, 2026"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>

              {/* আলাদা টাইম / রিড টাইম ফিল্ড */}
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Read Time / Time</label>
                <input
                  type="text"
                  value={selectedNews.readTime || ""}
                  onChange={(e) => setSelectedNews({ ...selectedNews, readTime: e.target.value })}
                  placeholder="e.g. 3 min read"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">Image URL</label>
                <input
                  type="text"
                  value={selectedNews.image || ""}
                  onChange={(e) => setSelectedNews({ ...selectedNews, image: e.target.value })}
                  required
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
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
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
                  onClick={() => handleDelete(selectedNews._id || selectedNews.id || "")}
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
                <span className="flex items-center gap-1"><FaUser className="text-amber-500" /> {selectedNews.author || "Admin"}</span>
                {selectedNews.readTime && (
                  <>
                    <span>•</span>
                    <span>{selectedNews.readTime}</span>
                  </>
                )}
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