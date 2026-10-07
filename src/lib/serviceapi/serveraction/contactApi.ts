const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL}/api/contacts`;

export const contactApi = {
  // ১. নতুন মেসেজ পাঠানো (POST)
  async sendMessage(formData: {
    name: string;
    phone: string;
    email?: string;
    service?: string;
    message: string;
  }) {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to send message");
    }
    return data;
  },

  // ২. সব মেসেজ ফেচ করা - ড্যাশবোর্ডের জন্য (GET)
  async getAllMessages() {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch messages");
    }
    return data;
  },

  // ৩. একটি নির্দিষ্ট মেসেজ দেখা (GET by ID)
  async getMessageById(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch message");
    }
    return data;
  },

  // ৪. মেসেজের স্ট্যাটাস আপডেট করা (PATCH)
  async updateMessageStatus(id: string, isRead: boolean) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isRead }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update status");
    }
    return data;
  },

  // ৫. সম্পূর্ণ মেসেজ এডিট/আপডেট করা (PATCH)
  async updateMessage(id: string, formData: { name: string; phone: string; email?: string; service?: string; message: string }) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update message");
    }
    return data;
  },

  // ৬. মেসেজ ডিলিট করা (DELETE)
  async deleteMessage(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete message");
    }
    return data;
  },
};