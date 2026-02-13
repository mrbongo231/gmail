"use client";

import { motion } from "framer-motion";

interface DraggableCardProps {
    icon: string;
    title: string;
    description: string;
    initialX: number;
    initialY: number;
    delay: number;
}

export default function DraggableCard({
    icon,
    title,
    description,
    initialX,
    initialY,
    delay,
}: DraggableCardProps) {
    return (
        <motion.div
            drag
            dragMomentum={true}
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            whileDrag={{ scale: 1.08, zIndex: 50 }}
            whileHover={{ scale: 1.03, y: -2 }}
            initial={{ opacity: 0, scale: 0.8, x: initialX, y: initialY }}
            animate={{ opacity: 1, scale: 1, x: initialX, y: initialY }}
            transition={{
                delay,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15,
            }}
            style={{
                position: "absolute",
                cursor: "grab",
                width: 180,
                padding: "20px 16px",
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: 16,
                userSelect: "none",
                touchAction: "none",
            }}
            className="draggable-card"
        >
            <div
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(99, 102, 241, 0.1)",
                    border: "1px solid rgba(99, 102, 241, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    marginBottom: 14,
                }}
            >
                {icon}
            </div>
            <h3
                style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                }}
            >
                {title}
            </h3>
            <p
                style={{
                    fontSize: 12,
                    color: "var(--color-text-tertiary)",
                    lineHeight: 1.5,
                }}
            >
                {description}
            </p>
        </motion.div>
    );
}
