"use client";

import { useEffect, useState } from "react";

export function EmailDisplay({ className = "" }: { className?: string }) {
    const [isMounted, setIsMounted] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
        // Base64 encoded "afraim.afraim99" and "gmail.com"
        // Encoded to prevent any string scraping
        const u = atob("YWZyYWltLmFmcmFpbTk5");
        const d = atob("Z21haWwuY29t");
        setEmail(`${u}@${d}`);
    }, []);

    if (!isMounted) {
        // Render a placeholder that doesn't look like an email to bots
        return <span className={className}>Click to contact</span>;
    }

    return (
        <a href={`mailto:${email}`} className={className}>
            {email}
        </a>
    );
}
