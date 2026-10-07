
export const getSliders = async () => {
  try {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/sliders`;

    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch sliders: ${res.status} ${res.statusText} from ${API_URL}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid sliders response");
    }

    return data;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return [];
  }
};


export const getNews = async () => {
  try {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/news`; // এখানে /api যুক্ত করা হয়েছে

    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch News");
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    } else if (data.news && Array.isArray(data.news)) { // sliders এর বদলে news দেওয়া হয়েছে
      return data.news;
    } else if (data.sliders && Array.isArray(data.sliders)) {
      return data.sliders;
    }

    return [];
  } catch (error) {
    console.error("Error fetching News:", error);
    return [];
  }
};




export const getGalleries = async () => {
  try {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/gallery`;

    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch galleries");
    }

    const data = await res.json();


    if (Array.isArray(data)) {
      return data;
    } else if (data.data && Array.isArray(data.data)) {
      return data.data;
    } else if (data.galleries && Array.isArray(data.galleries)) {
      return data.galleries;
    }

    return [];
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return [];
  }
};

