

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const BASE = `${API_URL}/api/payments`;

export type PaymentRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface PaymentRequestItem {
    id: string;
    hajjahId: string;
    amount: number;
    method: string;
    paymentNumber?: string | null;
    transactionId?: string | null;
    note?: string | null;
    status: PaymentRequestStatus;
    rejectReason?: string | null;
    createdAt: string;
    reviewedAt?: string | null;
    hajjah?: {
        id: string;
        name: string;
        slNo: number;
        mobileNo: string;
        totalAmount: number;
        paidAmount: number;
    } | null;
    agent?: { id: string; name: string; mobileNo: string } | null;
}

export interface PaymentRequestListResponse {
    data: PaymentRequestItem[];
    meta: { total: number; page: number; limit: number; totalPages: number };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
    let res: Response;
    try {
        res = await fetch(`${BASE}${path}`, {
            credentials: "include",
            cache: "no-store",
            ...init,
        });
    } catch {
        throw new Error("Server er shathe connect kora jachche na");
    }

    const body = await res.json().catch(() => null);
    if (!res.ok) {
        throw new Error(body?.error || `Request failed (${res.status})`);
    }
    return body as T;
}

// Agent: admin er kache payment request pathay
export function createPaymentRequest(input: {
    hajjahId: string;
    amount: number;
    method: string;
    paymentNumber?: string;
    transactionId?: string;
    note?: string;
}) {
    return request<{ message: string; request: PaymentRequestItem }>("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
}

// Agent: nijer request | Admin: shob request
export function getPaymentRequests(
    filters: { status?: PaymentRequestStatus; page?: number; limit?: number } = {}
) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
        if (
            v !== undefined &&
            v !== null &&
            (typeof v !== "string" || v.length > 0)
        ) {
            params.append(k, String(v));
        }
    });
    const qs = params.toString();
    return request<PaymentRequestListResponse>(qs ? `?${qs}` : "");
}

// Admin: approve ba reject
export function reviewPaymentRequest(
    id: string,
    status: "APPROVED" | "REJECTED",
    rejectReason?: string
) {
    return request<{ message: string; request: PaymentRequestItem }>(`/${id}/review`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, rejectReason }),
    });
}

// Agent: nijer pending request cancel
export function cancelPaymentRequest(id: string) {
    return request<{ message: string }>(`/${id}`, { method: "DELETE" });
}