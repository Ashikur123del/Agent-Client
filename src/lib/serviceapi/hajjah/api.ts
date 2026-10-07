// hajjah/api.ts  (FRONTEND)
// Backend: /api/hajjah (GET, POST, PUT, PATCH, DELETE + status review)

import type {
    Hajjah,
    HajjahFormInput,
    HajjahFilters,
    HajjahListResponse,
    HajjahStatus,
    HajjahStatusCounts,
} from "../../../types/hajjah.type";

// Onno file theke ekhan theke-o type import korte parben
export type {
    Hajjah,
    HajjahFormInput,
    HajjahFilters,
    HajjahListResponse,
    HajjahStatus,
    HajjahStatusCounts,
} from "../../../types/hajjah.type";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const BASE = `${API_URL}/api/hajjah`;

// =====================================================
// Error
// =====================================================
export class ApiError extends Error {
    status: number;
    missingFields?: string[];
    invalidFields?: string[];

    constructor(
        status: number,
        message: string,
        extra?: { missingFields?: string[]; invalidFields?: string[] }
    ) {
        super(message);
        this.status = status;
        this.missingFields = extra?.missingFields;
        this.invalidFields = extra?.invalidFields;
    }
}

// Toast e dekhanor moto ekta message banay
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof ApiError) {
        if (error.missingFields?.length)
            return `${error.message}: ${error.missingFields.join(", ")}`;
        if (error.invalidFields?.length)
            return `${error.message}: ${error.invalidFields.join(", ")}`;
        return error.message;
    }
    if (error instanceof Error) return error.message;
    return "Something went wrong";
};

// =====================================================
// Helpers
// =====================================================
async function request<T>(path: string, init?: RequestInit): Promise<T> {
    let res: Response;

    try {
        res = await fetch(`${BASE}${path}`, {
            credentials: "include", // better-auth cookie pathanor jonno (admin route e lage)
            cache: "no-store",
            ...init,
        });
    } catch {
        throw new ApiError(0, "Server er shathe connect kora jachche na");
    }

    const body = await res.json().catch(() => null);

    if (!res.ok) {
        throw new ApiError(
            res.status,
            body?.error || `Request failed (${res.status})`,
            {
                missingFields: body?.missingFields,
                invalidFields: body?.invalidFields,
            }
        );
    }

    return body as T;
}

// Photo ache bole JSON na, FormData pathate hoy
function buildFormData(
    data: Partial<HajjahFormInput>,
    photo?: File | null
): FormData {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        fd.append(key, String(value));
    });

    if (photo) fd.append("photo", photo); // backend: upload.single("photo")

    return fd;
}


export async function getHajjahs(
    filters: HajjahFilters = {}
): Promise<HajjahListResponse> {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;
        params.append(key, String(value));
    });

    const qs = params.toString();
    return request<HajjahListResponse>(qs ? `?${qs}` : "");
}


export async function getHajjahStats(): Promise<HajjahStatusCounts> {
    return request<HajjahStatusCounts>("/stats");
}


export async function getHajjahById(id: string): Promise<Hajjah> {
    return request<Hajjah>(`/${id}`);
}

// =====================================================
// POST create (status auto PENDING)
// =====================================================
export async function createHajjah(
    data: HajjahFormInput,
    photo?: File | null
): Promise<{ message: string; newHajjah: Hajjah }> {
    return request("", {
        method: "POST",
        body: buildFormData(data, photo),
    });
}

// =====================================================
// PUT full update (shob required field pathate hobe)
// =====================================================
export async function replaceHajjah(
    id: string,
    data: HajjahFormInput,
    photo?: File | null
): Promise<{ message: string; updatedHajjah: Hajjah }> {
    return request(`/${id}`, {
        method: "PUT",
        body: buildFormData(data, photo),
    });
}

// =====================================================
// PATCH partial update (shudhu jeta change korben seta pathan)
// =====================================================
export async function updateHajjah(
    id: string,
    data: Partial<HajjahFormInput>,
    photo?: File | null
): Promise<{ message: string; updatedHajjah: Hajjah }> {
    return request(`/${id}`, {
        method: "PATCH",
        body: buildFormData(data, photo),
    });
}

// =====================================================
// PATCH status: Approve / Reject / Reopen (Admin only)
// =====================================================
export async function reviewHajjah(
    id: string,
    status: HajjahStatus,
    rejectReason?: string
): Promise<{ message: string; hajjah: Hajjah }> {
    return request(`/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, rejectReason }),
    });
}

export const approveHajjah = (id: string) => reviewHajjah(id, "APPROVED");

export const rejectHajjah = (id: string, reason: string) =>
    reviewHajjah(id, "REJECTED", reason);

export const reopenHajjah = (id: string) => reviewHajjah(id, "PENDING");

// =====================================================
// DELETE
// =====================================================
export async function deleteHajjah(id: string): Promise<{ message: string }> {
    return request(`/${id}`, { method: "DELETE" });
}