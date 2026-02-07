import clsx from "clsx";
import styles from "./HexBadge.module.css";

interface HexBadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "muted";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function HexBadge({
  children,
  variant = "primary",
  size = "md",
  className,
}: HexBadgeProps) {
  return (
    <div className={clsx(styles.hexBadge, styles[variant], styles[size], className)}>
      {children}
    </div>
  );
}