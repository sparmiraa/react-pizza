export type Role = "USER" | "ADMIN";

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    roles: Role[];
}

export interface UserState {
    user: UserProfile | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}