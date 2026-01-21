"use client";

import { useEffect, useState } from "react";

export function EmailDisplay({ email = "afraim.afraim99@gmail.com", className = "" }: { email?: string, className?: string }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    }, []);

    if (!isMounted) {
        return <span className={className}>Click to reveal email</span>;
    }

    return (
        <a href={`mailto:${email}`} className={className}>
            {email}
        </a>
    );
}
