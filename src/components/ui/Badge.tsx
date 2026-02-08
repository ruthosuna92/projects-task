import clsx from "clsx";
import styles from "./Badge.module.css"

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "active" | "orange" | "darkGray" | "primary" | "error";
}

export default function Badge({ variant = "default", children}: BadgeProps){
    return <div className={clsx(styles.badge, styles[variant])}>
       {children}
    </div>
}