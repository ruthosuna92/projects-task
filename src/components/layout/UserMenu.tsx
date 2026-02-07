import { ChevronDown } from "lucide-react";
import HexBadge from "../ui/HexBadge";
import UserIcon from "../ui/UserIcon";
import styles from "./UserMenu.module.css";

interface UserMenuProps {
  name?: string;
  lastName?: string;
  role: string;
}

export default function UserMenu({ name = "John", lastName = "Doe", role = "Administrador" }: UserMenuProps) {
  return (
    <div className={styles.userMenu}>
      <HexBadge variant="primary">
        <UserIcon />
      </HexBadge>
      <div className={styles.userInfo}>
        <p>{name} {lastName}</p>
        <span>{role}</span>
      </div>
      <ChevronDown />

    </div>
  );
}
