import { useState } from "react";

import { api } from "../api.js";

export default function AuthForm({ onAuthenticated }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);
        const form = new FormData(event.currentTarget);
        const username = form.get("username");
        const password = form.get("password");

        try {
            if (isRegistering) {
                await api.register({
                    username,
                    email: form.get("email"),
                    password,
                });
            }
            const tokens = await api.login({ username, password });
            const user = await api.currentUser(tokens.access);
            onAuthenticated(user, tokens.access);
        } catch (requestError) {
            setError(requestError.message); 
        } finally {
            setItSubmitting(false);
        }
    }
}