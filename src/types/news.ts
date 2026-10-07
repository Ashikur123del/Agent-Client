export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryColor: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  featured: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  
  _id?: string; 
}