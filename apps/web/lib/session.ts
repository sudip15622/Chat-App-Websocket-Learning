import { SessionPayload } from "@/types/types";

export async function createSession (payload: SessionPayload) {
    localStorage.setItem("session", payload.access_token);
}

export async function getSession () {
    const session = localStorage.getItem("session");
    return session;
}

export async function deleteSession () {
    localStorage.removeItem("session");
}