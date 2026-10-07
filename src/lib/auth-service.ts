import { authClient } from "./auth-client";


export interface SignUpData {
    email: string;
    password: string;
    name: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export type SuccessCallback = () => void;
export type ErrorCallback = (msg: string) => void;


export const handleSignUp = async (
    data: SignUpData, 
    onSuccess?: SuccessCallback, 
    onError?: ErrorCallback
) => {
    try {
        await authClient.signUp.email(
            {
                email: data.email,
                password: data.password,
                name: data.name,
            },
            {
                onSuccess: () => {
                    if (onSuccess) onSuccess();
                },
                onError: (ctx) => {
                    if (onError) onError(ctx.error.message || "Registration failed.");
                },
            }
        );
    } catch (err) {
        if (onError) onError("An unexpected error occurred.");
    }
};

// 2. Sign In Function
export const handleSignIn = async (
    data: SignInData, 
    onSuccess?: SuccessCallback, 
    onError?: ErrorCallback
) => {
    try {
        await authClient.signIn.email(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess: () => {
                    if (onSuccess) onSuccess();
                },
                onError: (ctx) => {
                    if (onError) onError(ctx.error.message || "Invalid email or password.");
                },
            }
        );
    } catch (err) {
        if (onError) onError("An unexpected error occurred.");
    }
};

// 3. Sign Out Function
export const handleSignOut = async (onSuccess?: SuccessCallback) => {
    await authClient.signOut({
        fetchOptions: {
            onSuccess: () => {
                if (onSuccess) onSuccess();
            },
        },
    });
};

