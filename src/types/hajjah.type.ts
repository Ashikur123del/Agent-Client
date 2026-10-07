// hajjah/hajjah.type.ts  (FRONTEND)

export type HajjahStatus = "PENDING" | "APPROVED" | "REJECTED";

// Form theke jei data backend e pathano hoy (HajjahAdd er formData, shudhu `agree` bade)
export interface HajjahFormInput {
    // Personal
    name: string;
    fathersName: string;
    mothersName?: string;
    dob: string; // "YYYY-MM-DD"
    gender?: string;
    maritalStatus?: string;
    nidNo: string;
    mobileNo: string;
    whatsappNo?: string;
    district?: string;
    presentAddress: string;
    permanentAddress?: string;

    // Passport
    passportNo: string;
    passportIssueDate?: string;
    passportExpiry: string;
    passportIssuePlace?: string;

    // Mahram
    mahramName?: string;
    mahramRelation?: string;
    mahramMobile?: string;
    mahramPassportNo?: string;

    // Health & Emergency
    bloodGroup?: string;
    medicalConditions?: string;
    meningitisVaccine?: boolean;
    emergencyContactName: string;
    emergencyContactRelation?: string;
    emergencyContactPhone: string;

    // Travel
    travelDate?: string;
    roomType?: string;
    previousHajj?: boolean;
    specialAssistance?: string;
    notes?: string;

    // Package & Payment
    packageType?: string;
    totalAmount?: string | number;
    paidAmount?: string | number;
    paymentMethod?: string;
    paymentNumber?: string;
    transactionId?: string;
    referredBy?: string;

    // Agent
    agentId?: string;
}

// Backend theke jei data ashe
export interface Hajjah {
    id: string;
    slNo: number;

    // Review
    status: HajjahStatus;
    reviewedById: string | null;
    reviewedAt: string | null;
    rejectReason: string | null;

    // Personal
    name: string;
    fathersName: string;
    mothersName: string | null;
    dob: string;
    gender: string;
    maritalStatus: string;
    nidNo: string;
    mobileNo: string;
    whatsappNo: string | null;
    district: string | null;
    presentAddress: string;
    permanentAddress: string | null;
    photo: string | null;

    // Passport
    passportNo: string;
    passportIssueDate: string | null;
    passportExpiry: string;
    passportIssuePlace: string | null;

    // Mahram
    mahramName: string | null;
    mahramRelation: string | null;
    mahramMobile: string | null;
    mahramPassportNo: string | null;

    // Health & Emergency
    bloodGroup: string;
    medicalConditions: string | null;
    meningitisVaccine: boolean;
    emergencyContactName: string;
    emergencyContactRelation: string;
    emergencyContactPhone: string;

    // Travel
    travelDate: string | null;
    roomType: string;
    previousHajj: boolean;
    specialAssistance: string | null;
    notes: string | null;

    // Package & Payment
    packageType: string;
    totalAmount: number;
    paidAmount: number;
    paymentMethod: string;
    paymentNumber: string | null;
    transactionId: string | null;
    referredBy: string | null;

    // Agent
    agentId: string | null;
    agent?: { id: string; name: string; mobileNo: string } | null;

    createdAt: string;
    updatedAt: string;
}

export interface HajjahFilters {
    name?: string;
    mobileNo?: string;
    search?: string; // name ba mobile, duita theke ekshathe
    status?: HajjahStatus;
    page?: number;
    limit?: number;
}

export interface HajjahListResponse {
    data: Hajjah[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export type HajjahStatusCounts = Record<HajjahStatus, number>;