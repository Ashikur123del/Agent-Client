
import Image from "next/image";
import { FaCalendarAlt, FaClock, FaUser, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

interface NewsItem {
  id?: string;
  slug: string;
  title: string;
  category: string;
  categoryColor?: string;
  excerpt: string;
  content: string;
  date?: string;
  readTime?: string;
  author?: string;
  image?: string;
  featured?: boolean;
}

interface NewsDetailClientProps {
  news: NewsItem;
}

export default function NewsDetailClient({ news }: NewsDetailClientProps) {
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <Link href="/news" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 font-semibold">
        <FaArrowLeft /> Back to News
      </Link>

      <div className="max-w-4xl mx-auto space-y-6">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${news.categoryColor || "from-amber-500 to-orange-500"}`}>
          {news.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">{news.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 border-y border-slate-700 py-3">
          <span className="flex items-center gap-1"><FaCalendarAlt className="text-amber-400" /> {news.date || "N/A"}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><FaClock className="text-amber-400" /> {news.readTime || "3 min read"}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><FaUser className="text-amber-400" /> {news.author || "Travel Desk"}</span>
        </div>

        {news.image && (
          <div className="relative h-80 sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image src={news.image} alt={news.title} fill className="object-cover" priority />
          </div>
        )}

        <div className="text-lg text-emerald-200 font-medium bg-emerald-950/50 p-6 rounded-xl border border-emerald-800/50">
          {news.excerpt}
        </div>

        <div className="text-slate-200 text-base leading-relaxed space-y-4 whitespace-pre-line">
          {news.content}
        </div>
      </div>
    </div>
  );
}