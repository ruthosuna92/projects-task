import styles from "./ProjectsGrid.module.css";
import { Project } from "@/types/projects";

interface ProjectsGridItemProps {
  project: Project;
}

export default function ProjectsGridItem({ project }: ProjectsGridItemProps) {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.title}>{project.name}</h3>
        <span className={styles.plan}>{project.plan}</span>
      </header>

      <div className={styles.status}>
        {project.status}
      </div>

      <div className={styles.meta}>
        <div>
          <strong>{project.expiringItems.incidents}</strong>
          <span>Incidencias</span>
        </div>
        <div>
          <strong>{project.expiringItems.rfi}</strong>
          <span>RFI</span>
        </div>
        <div>
          <strong>{project.expiringItems.tasks}</strong>
          <span>Tareas</span>
        </div>
      </div>
    </article>
  );
}