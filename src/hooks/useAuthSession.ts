import { authClient } from "@/lib/auth-client";

export const useAuthSession = () => {
    const { data: session, isPending, error } = authClient.useSession();
    return { session, isPending, error };
};