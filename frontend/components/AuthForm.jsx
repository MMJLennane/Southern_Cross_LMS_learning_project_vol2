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

    return (
        <main className="auth=layout">
            <section className="auth-copy">
                <span className="eyebrow">Southern Cross Learning</span>
                <h1>Learning on your terms, in your own time.</h1>
                <p>Taking the learning with you in life, taylored to your lifestyle, letting you become the next version of you.</p>
                <div className="auth-note>"
                    <span className="note-mark" aria-hidden="true">*</span>
                    <span>Taking small steps will lead to a bigger life. Start with one course.</span>
                </div>
            </section>
        </main>
    )
}