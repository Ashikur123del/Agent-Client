import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaClock, FaNewspaper, FaUser } from "react-icons/fa";
import ServiceHero from "../services/ServiceHero";


export const dynamic = "force-dynamic";

async function getNews() {
  try {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/news`;

    const res = await fetch(API_URL, {
      cache: "no-store", 
    });

    if (!res.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await res.json();
    
    if (Array.isArray(data)) {
      return data;
    } else if (data.news && Array.isArray(data.news)) {
      return data.news;
    } else if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

export default async function NewsPage() {
  const newsData = await getNews();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 text-slate-800">
    
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute -right-48 top-1/3 h-[500px] w-[500px] rounded-full bg-amber-200/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
      </div>

      <ServiceHero
        title="Travel News"
        subtitle="Stay Updated"
        icon={<FaNewspaper />}
        description="Latest updates on visas, flights, tours, and travel tips from our experts."
        bgImage="https://assets3.thrillist.com/v1/image/2795146/1200x630/flatten;crop_down;webp=auto;jpeg_quality=70"
      />

      {/* News Grid Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/50 border-b border-emerald-100/50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-1.5 rounded-full shadow-sm border border-amber-200/50">
              Latest Updates
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Recent Travel{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                News & Articles
              </span>
            </h2>
          </div>

      
          {newsData.length === 0 ? (
            <div className="text-center py-12 bg-white/60 backdrop-blur-md rounded-3xl border border-slate-200 max-w-xl mx-auto">
              <p className="text-slate-500 font-medium">No news articles found at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {newsData.map((item: any) => {
                const itemId = item.id || item._id;
                const newsSlug = item.slug || itemId;

                return (
                  <article
                    key={itemId}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-white to-emerald-50/20 shadow-md shadow-slate-200/50 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <Link href={`/news/${newsSlug}`} className="block">
                        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-50 to-amber-50/30">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            priority={item.featured}
                          />
                          <div
                            className={`absolute top-3 left-3 bg-gradient-to-r ${item.categoryColor || "from-amber-500 to-orange-500"} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}
                          >
                            {item.category}
                          </div>
                          {item.featured && (
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                              🔥 Featured
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt className="w-3 h-3 text-amber-500" /> {item.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FaClock className="w-3 h-3 text-amber-500" /> {item.readTime || "3 min read"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FaUser className="w-3 h-3 text-amber-500" /> {item.author || "Travel Desk"}
                          </span>
                        </div>

                        <Link href={`/news/${newsSlug}`}>
                          <h3 className="text-slate-900 font-bold text-xl group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </h3>
                        </Link>

                        <p className="mt-2.5 text-slate-600 text-sm line-clamp-3 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-0">
                      <Link
                        href={`/news/${newsSlug}`}
                        className="inline-flex items-center gap-2 text-emerald-700 hover:text-amber-700 text-sm font-bold group-hover:gap-3 transition-all"
                      >
                        Read More <FaArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}