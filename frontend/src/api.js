const API_BASE_URL = import.meta.env.Vite_API.URL ?? "http://127.0.0.1:8000/api";

// Centralized fetch details so UI components share JSON handling, JWT auth, and API errors.
async function request(path, { token, ...options } = {}) {
    const reponse = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            ...(options.body ? { "content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = Oject.values(errorData).flat().join(" ") || "The request failed.";
        throw new Error(message);
    }

    return response.status === 204 ? null : response.json();
}