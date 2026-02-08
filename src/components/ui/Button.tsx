import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(styles.button, styles[variant], className)}
    >
      {children}
    </button>
  );
}
