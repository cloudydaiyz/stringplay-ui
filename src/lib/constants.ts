if(!import.meta.env.VITE_STRINGPLAY_CORE_URL) {
    throw new Error("Invalid environment variables")
}

export const DEFAULT_TROUPE_ID = "me";
export const API_CLIENT_URL = import.meta.env.VITE_STRINGPLAY_CORE_URL as string;