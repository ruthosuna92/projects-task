import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import ProjectsSearch from "./ProjectsSearch";
import ProjectsSort from "./ProjectsSort";
import ProjectsViewToggle from "./ProjectsViewToggle";
import styles from "./ProjectsHeaderActions.module.css";

export default function ProjectsHeaderActions() {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <ProjectsSort />
        <ProjectsViewToggle />
      </div>
      <div className={styles.column}>
        <ProjectsSearch />
        <Button variant="primary">
          <Plus size={18} aria-hidden="true" />
          <span>Crear proyecto</span>
        </Button>
      </div>
    </div>
  );
}
