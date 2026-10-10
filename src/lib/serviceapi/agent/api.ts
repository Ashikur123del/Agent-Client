import {
    Agent,
    CreateAgentInput,
    UpdateAgentInput,
} from "@/types/agent.type";

/**
 * Development → সরাসরি backend URL
 * Production  → relative path (Next.js rewrite দিয়ে backend-এ যাবে → same-origin)
 */
const API_BASE_URL =
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
        : "";

/**
 * ১. সব এজেন্ট (Admin Only)
 */
export async function getAllAgents(): Promise<Agent[]> {
    const response = await fetch(`${API_BASE_URL}/api/agents`, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || err.message || "Failed to fetch agents");
    }

    return response.json();
}

/**
 * ২. আইডি দিয়ে একজন এজেন্ট (Admin Only)
 */
export async function getAgentById(id: string): Promise<Agent> {
    const response = await fetch(`${API_BASE_URL}/api/agents/${id}`, {
        method: "GET",
        credentials: "include",
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || err.message || "Agent not found");
    }

    return response.json();
}

/**
 * ৩. এজেন্ট লগইন (মোবাইল + পাসওয়ার্ড)
 */
export const verifyAgent = async (mobileNo: string, password?: string) => {
    const res = await fetch(`${API_BASE_URL}/api/agents/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ mobileNo, password }),
    });

    if (!res.ok) {
        let errorMessage = "Failed to verify agent";
        try {
            const err = await res.json();
            errorMessage = err.error || err.message || errorMessage;
        } catch {
            errorMessage = `Server Error (${res.status}): Route or verification failed`;
        }
        throw new Error(errorMessage);
    }

    return await res.json();
};

/**
 * ৪. নতুন এজেন্ট রেজিস্ট্রেশন (Public)
 */
export async function createAgent(
    data: CreateAgentInput
): Promise<{ message: string; newAgent: Agent }> {
    const formData = new FormData();
    const authData = data as CreateAgentInput & {
        email?: string;
        password?: string;
    };

    formData.append("name", data.name);
    formData.append("fathersName", data.fathersName);
    formData.append("mobileNo", data.mobileNo);
    formData.append("presentAddress", data.presentAddress);
    formData.append("permanentAddress", data.permanentAddress);
    formData.append("emergencyName", data.emergencyName);
    formData.append("emergencyRelation", data.emergencyRelation);
    formData.append("emergencyMobile", data.emergencyMobile);
    formData.append("emergencyAddress", data.emergencyAddress);

    if (authData.email) formData.append("email", authData.email);
    if (authData.password) formData.append("password", authData.password);

    if (data.whatsAppNumber) formData.append("whatsAppNumber", data.whatsAppNumber);
    if (data.bkashNumber) formData.append("bkashNumber", data.bkashNumber);
    if (data.bankAccountNumber) {
        formData.append("bankAccountNumber", data.bankAccountNumber);
    }

    if (data.photo) formData.append("photo", data.photo);

    const response = await fetch(`${API_BASE_URL}/api/agents`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(
            resData.error || resData.message || "Failed to create agent"
        );
    }

    return resData;
}

/**
 * ৫. এজেন্ট আপডেট (Admin Only)
 */
export async function updateAgent(
    id: string,
    data: UpdateAgentInput
): Promise<{ message: string; updatedAgent: Agent }> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            if (key === "photo" && value instanceof File) {
                formData.append("photo", value);
            } else if (typeof value === "string") {
                formData.append(key, value);
            }
        }
    });

    const response = await fetch(`${API_BASE_URL}/api/agents/${id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.error || "Failed to update agent");
    }

    return resData;
}

/**
 * ৬. এজেন্ট ডিলিট (Admin Only)
 */
export async function deleteAgent(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/agents/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.error || "Failed to delete agent");
    }

    return resData;
}

/**
 * ৭. Agent nijer profile (GET /me)
 */
export async function getMyAgentProfile(): Promise<Agent> {
    const response = await fetch(`${API_BASE_URL}/api/agents/me`, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
    });

    const resData = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            resData.error || resData.message || "Failed to load profile"
        );
    }

    return resData;
}

/**
 * ৮. Agent nijer profile edit (PATCH /me)
 */
const MY_PROFILE_FIELDS = [
    "name",
    "fathersName",
    "mobileNo",
    "whatsAppNumber",
    "bkashNumber",
    "bankAccountNumber",
    "presentAddress",
    "permanentAddress",
    "emergencyName",
    "emergencyRelation",
    "emergencyMobile",
    "emergencyAddress",
] as const;

export async function updateMyAgentProfile(
    data: UpdateAgentInput
): Promise<{ message: string; updatedAgent: Agent }> {
    const formData = new FormData();

    for (const key of MY_PROFILE_FIELDS) {
        const value = (data as Record<string, unknown>)[key];
        if (typeof value === "string") formData.append(key, value);
    }

    if (data.photo instanceof File) formData.append("photo", data.photo);

    const response = await fetch(`${API_BASE_URL}/api/agents/me`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
    });

    const resData = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(
            resData.error || resData.message || "Failed to update profile"
        );
    }

    return resData;
}