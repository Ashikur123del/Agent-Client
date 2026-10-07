"use server";

import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function createGalleryAction(formData: FormData) {
    try {
        // যেহেতু API_BASE_URL-এ /api আছে, তাই শুধু /gallery যোগ করলে হবে: .../api/gallery
        const response = await fetch(`${API_BASE_URL}/gallery`, {
            method: "POST",
            body: formData,
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const textResponse = await response.text();
            console.error("Backend returned non-JSON response:", textResponse);
            return { success: false, message: "Backend server error (HTML response received)" };
        }

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Failed to create gallery" };
        }

        revalidatePath("/gallery");
        revalidatePath("/admin/gallery");

        return { success: true, data: result.data };
    } catch (error: any) {
        console.error("Server Action Error (Create):", error);
        return { success: false, message: error.message || "Internal server error" };
    }
}

export async function updateGalleryAction(id: string, formData: FormData) {
    try {
        // এখানেও /gallery/${id} হবে
        const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
            method: "PATCH",
            body: formData,
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const textResponse = await response.text();
            console.error("Backend returned non-JSON response:", textResponse);
            return { success: false, message: "Backend server error (HTML response received)" };
        }

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Failed to update gallery" };
        }

        revalidatePath("/gallery");
        revalidatePath("/admin/gallery");

        return { success: true, data: result.data };
    } catch (error: any) {
        console.error("Server Action Error (Update):", error);
        return { success: false, message: error.message || "Internal server error" };
    }
}

export async function deleteGalleryAction(id: string) {
    try {
        // এখানেও /gallery/${id} হবে
        const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const textResponse = await response.text();
            console.error("Backend returned non-JSON response:", textResponse);
            return { success: false, message: "Backend server error (HTML response received)" };
        }

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Failed to delete gallery" };
        }

        revalidatePath("/gallery");
        revalidatePath("/admin/gallery");

        return { success: true, message: "Gallery deleted successfully" };
    } catch (error: any) {
        console.error("Server Action Error (Delete):", error);
        return { success: false, message: error.message || "Internal server error" };
    }
}