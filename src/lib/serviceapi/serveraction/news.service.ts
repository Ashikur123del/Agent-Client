"use server";

import { revalidatePath } from "next/cache";
import { NewsItem } from "@/types/news"; 

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/news`; 

export type NewsServerActionResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

// সকল নিউজ ফেচ করা
export async function getAllNewsAction(): Promise<NewsServerActionResponse<NewsItem[]>> {
  try {
    const res = await fetch(API_URL, {
      method: "GET",
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return { success: false, message: "Server returned non-JSON response." };
    }

    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || "Failed to load news list!" };
    }

    const items = Array.isArray(data) ? data : data.news || data.data || [];
    return { success: true, data: items };
  } catch (error: unknown) {
    console.error("Fetch News Error:", error);
    return { success: false, message: "Something went wrong!" };
  }
}

// নতুন নিউজ তৈরি করা এবং অটোমেটিক Date ও Time যুক্ত করা
export async function createNewsAction(formData: FormData): Promise<NewsServerActionResponse<NewsItem>> {
  try {
    // বর্তমান তারিখ এবং সময় যোগ করা (যেমন: "August 23, 2026, 1:06 PM")
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const fullDateTime = `${formattedDate}, ${formattedTime}`;

    if (!formData.has("date")) {
      formData.append("date", fullDateTime);
    }

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData, 
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return { success: false, message: "Server returned non-JSON response." };
    }

    const errorData = await res.json();
    if (!res.ok) {
      return { success: false, message: errorData?.error || errorData?.message || "Failed to add news on server." };
    }

    revalidatePath("/news");
    return { success: true, data: errorData };
  } catch (error: unknown) {
    console.error("Server Action Error:", error);
    return { success: false, message: "Something went wrong!" };
  }
}

// নিউজ আপডেট করা (PUT)
// src/app/actions/news.actions.ts (আপনার ফ্রন্টএন্ড প্রজেক্টে)

export async function updateNewsAction(id: string, payload: NewsItem | object): Promise<NewsServerActionResponse<NewsItem>> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH", // এখানে PUT এর বদলে অবশ্যই PATCH দিতে হবে কারণ ব্যাকএন্ডে router.patch ব্যবহার করা হয়েছে
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Non-JSON response received:", text);
      return { success: false, message: "Server error: Invalid response format." };
    }

    const result = await res.json();
    if (!res.ok) {
      return { success: false, message: result?.error || result?.message || "Failed to update news." };
    }

    revalidatePath("/news");
    revalidatePath(`/news/${id}`);

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Update News Error:", error);
    return { success: false, message: "Something went wrong!" };
  }
}

// নিউজ ডিলিট করা
export async function deleteNewsAction(id: string | number): Promise<NewsServerActionResponse> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return { success: false, message: "Failed to delete news." };
    }

    revalidatePath("/news");
    return { success: true, message: "News deleted successfully." };
  } catch (error: unknown) {
    console.error("Delete News Error:", error);
    return { success: false, message: "Something went wrong!" };
  }
}