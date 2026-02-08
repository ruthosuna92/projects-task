"use client";

import * as React from "react";
import Button from "@/components/ui/Button";
import clsx from "clsx";
import styles from "./Select.module.css";

type SelectOption = {
  value: string;
  label: string;
};

export interface SelectProps {
  id?: string;
  items: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  trigger: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export default function Select({
  id,
  items,
  value,
  onValueChange,
  trigger,
  className,
  triggerClassName,
  menuClassName,
  itemClassName,
  ariaLabel,
  disabled = false,
}: SelectProps) {
  const generatedId = React.useId();
  const menuElementId = id ?? generatedId;

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const rootElement = rootRef.current;
      if (!rootElement) return;
      if (event.target instanceof Node && rootElement.contains(event.target)) return;
      setOpen(false);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleSelect = (nextValue: string) => {
    onValueChange(nextValue);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={clsx(styles.select, className)}>
      <Button
        type="button"
        variant="secondary"
        onClick={() => setOpen((nextOpen) => !nextOpen)}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuElementId}
        className={clsx(styles.selectTrigger, triggerClassName)}
      >
        {trigger}
      </Button>

      {open ? (
        <div id={menuElementId} role="menu" className={clsx(styles.selectMenu, menuClassName)}>
          {items.map((item) => {
            const isSelected = item.value === value;
            return (
              <button
                key={item.value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                className={clsx(styles.selectItem, itemClassName)}
                onClick={() => handleSelect(item.value)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}