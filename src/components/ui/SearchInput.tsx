"use client";

import { Search } from "lucide-react";
import styles from "./SearchInput.module.css"
import clsx from "clsx";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Buscar",
  ariaLabel = "Buscar",
  className,
}: SearchInputProps) {
  return (
    <div className={clsx(styles.searchInput, className)}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={styles.input}
      />
      <Search className={styles.icon} size={18} aria-hidden="true" />
    </div>
  );
}