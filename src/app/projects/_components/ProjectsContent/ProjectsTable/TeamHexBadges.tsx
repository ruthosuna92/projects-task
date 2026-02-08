import HexBadge from "@/components/ui/HexBadge";
import styles from "./TeamHexBadges.module.css";
import { TeamMember } from "@/types/projects";

type TeamHexBadgesProps = {
  team: TeamMember[];
};

function getInitials(member: TeamMember) {
  const first = member.name?.trim()?.[0] ?? "";
  const last = member.lastName?.trim()?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
}

export default function TeamHexBadges({ team }: TeamHexBadgesProps) {
  const visibleMembers = team.slice(0, 4);
  const remainingCount = Math.max(team.length - visibleMembers.length, 0);

  return (
    <div className={styles.teamBadges} aria-label={`Equipo: ${team.length} integrantes`}>
      {visibleMembers.map((member, index) => (
        <HexBadge size="sm" key={`${member.name}-${member.lastName}-${index}`} className={styles.badge}>
          {getInitials(member)}
        </HexBadge>
      ))}

      {remainingCount > 0 ? (
        <HexBadge size="sm" className={styles.badge}>+{remainingCount}</HexBadge>
      ) : null}
    </div>
  );
}