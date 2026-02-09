"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, LogOut } from "lucide-react";

import HexBadge from "../ui/HexBadge";
import styles from "./UserMenu.module.css";

interface UserMenuProps {
  fallbackRole?: string;
}

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserMenu({ fallbackRole = "Administrador" }: UserMenuProps) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const fullName = useMemo(() => {
    const name = session?.user?.name?.trim();
    if (name) return name;

    const email = session?.user?.email?.trim();
    if (email) return email.split("@")[0];

    return "Usuario";
  }, [session?.user?.name, session?.user?.email]);

  const role = (session?.user as any)?.role ?? fallbackRole;

  const initials = useMemo(() => getInitials(fullName), [fullName]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setIsOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const isLoading = status === "loading";

  return (
    <div ref={rootRef} className={styles.wrapper}>
      <button
        type="button"
        className={styles.userMenu}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        disabled={isLoading}
      >
        <HexBadge variant="primary">
          <span className={styles.initials} aria-hidden="true">
            {initials}
          </span>
          <span className="sr-only">Usuario</span>
        </HexBadge>

        <div className={styles.userInfo}>
          <p className={styles.name}>{isLoading ? "Cargando..." : fullName}</p>
          <span className={styles.role}>{role}</span>
        </div>

        <ChevronDown className={styles.chevron} aria-hidden="true" />
      </button>

      {isOpen ? (
        <div className={styles.menu} role="menu" aria-label="Menú de usuario">
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut size={16} aria-hidden="true" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}