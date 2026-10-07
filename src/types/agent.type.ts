// ডাটাবেজ থেকে পাওয়া Agent অবজেক্টের টাইপ
export interface Agent {
    id: string;
    name: string;
    fathersName: string;
    mobileNo: string;
    bkashNumber: string;
    whatsAppNumber: string,
    bankAccountNumber: string
    presentAddress: string;
    permanentAddress: string;
    emergencyName: string;
    emergencyRelation: string;
    emergencyMobile: string;
    emergencyAddress: string;
    photo?: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string,
}

// নতুন Agent তৈরি করার জন্য (Create Payload)
export interface CreateAgentInput {
    name: string;
    fathersName: string;
    mobileNo: string;
    whatsAppNumber?: string;
    bkashNumber?: string;
    bankAccountNumber?: string;
    presentAddress: string;
    permanentAddress: string;
    emergencyName: string;
    emergencyRelation: string;
    emergencyMobile: string;
    emergencyAddress: string;
    photo?: File | null;
}
// Agent আপডেট করার জন্য (Update Payload - Partial)
export interface UpdateAgentInput extends Partial<Omit<CreateAgentInput, "photo">> {
    photo?: File | string | null;
}

// API রেসপন্স টাইপসমূহ
export interface AgentResponse {
    message: string;
    newAgent?: Agent;
    updatedAgent?: Agent;
}