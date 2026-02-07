import { User, UserRound } from "lucide-react";

interface UserIconProps {
  name?: string;
  lastName?: string;
  className?: string;
}

export default function UserIcon({ name, lastName, className }: UserIconProps) {
  if (name && lastName) {
    const initials = `${name[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

    return (
      <span className={className} aria-label={`${name} ${lastName}`}>
        {initials}
      </span>
    );
  }

  return (
   <UserRound />
  );
}