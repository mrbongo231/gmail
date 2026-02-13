"use client";

import { useEffect, useState } from "react";

export default function MouseGradient() {
    const [pos, setPos] = useState({ x: 50, y: 50 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setPos({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                background: `
          radial-gradient(600px circle at ${pos.x}% ${pos.y}%, rgba(99, 102, 241, 0.07), transparent 50%),
          radial-gradient(800px circle at ${pos.x + 10}% ${pos.y - 10}%, rgba(168, 85, 247, 0.04), transparent 50%)
        `,
                transition: "background 0.3s ease-out",
            }}
        />
    );
}
