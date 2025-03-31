if(!import.meta.env.VITE_STRINGPLAY_CORE_URL) {
    console.error("Server error: Invalid server configuration");
}

export const DEFAULT_TROUPE_ID = "me";
export const API_CLIENT_URL = import.meta.env.VITE_STRINGPLAY_CORE_URL as string || "https://api.stringplay.cloudydaiyz.com";