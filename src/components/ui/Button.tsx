import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  shape?: "default" | "round";
  size?: "md" | "sm";
}

export default function Button({
  children,
  variant = "primary",
  shape = "default",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        styles[variant],
        styles[shape],
        styles[size],
        className
      )}
    >
      {children}
    </button>
  );
}