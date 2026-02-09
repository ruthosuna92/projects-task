import styles from "./ProjectsTable.module.css";
import { ProjectStatus, type Project } from "@/types/projects";
import { Clock, RefreshCcw } from "lucide-react";
import Badge from "@/components/ui/Badge";
import TeamHexBadges from "./TeamHexBadges";
import { useProjects } from "@/store/useProjectsStore";

type ProjectsTableRowProps = {
  project: Project;
};

export default function ProjectsTableRow({ project }: ProjectsTableRowProps) {

  const setSelectedProjectId = useProjects((s) => s.setSelectedProjectId);
  const selectedProject = useProjects((s)=> s.selectedProjectId)
  
  return (
    <tr data-selected={selectedProject === project.id ? "true" : "false"} className={styles.row} onClick={() => setSelectedProjectId(project.id)}>
      <td className={styles.td}>
        <div className={styles.projectCell}>
          <div className={styles.projectImage}></div>

          <div className={styles.projectInfo}>
            <div className={styles.projectNameRow}>
              <span className={styles.projectName}>{project.name}</span>
            </div>

            <div className={styles.projectMeta}>
              <div className={styles.projectTime}>
              <Clock size={10} />
              <span>{project.createdAt}</span>

              </div>
              <div className={styles.projectTime}>
              <RefreshCcw size={10} />
              <span>{project.lastUpdated}</span>

              </div>
            </div>
          </div>
        </div>
      </td>
      <td className={styles.td}>
        {project.plan === "big" ? (
          <Badge variant="primary">Grande</Badge>
        ) : (
          <Badge variant="orange">Pequeño</Badge>
        )}
      </td>
      <td className={styles.state}>
        {project.status === ProjectStatus.Active && (
          <Badge variant="active">Activo</Badge>
        )}

        {project.status === ProjectStatus.Pending && (
          <Badge variant="default">Pago pendiente</Badge>
        )}

        {project.status === ProjectStatus.Inactive && (
          <Badge variant="darkGray">Inactivo</Badge>
        )}

        {project.status === ProjectStatus.Suspended && (
          <Badge variant="error">Suspendido</Badge>
        )}
      </td>
      <td className={styles.td}>
        <TeamHexBadges team={project.team} />
      </td>
      <td className={styles.td}>
        <div className={styles.expiringItems}>
          <div className={styles.expiringItem}>
            <span className={styles.expiringValue}>
              {project.expiringItems.incidents}
            </span>
            <span className={styles.expiringLabel}>Incidencias</span>
          </div>

          <div className={styles.expiringItem}>
            <span className={styles.expiringValue}>
              {project.expiringItems.rfi}
            </span>
            <span className={styles.expiringLabel}>RFI</span>
          </div>

          <div className={styles.expiringItem}>
            <span className={styles.expiringValue}>
              {project.expiringItems.tasks}
            </span>
            <span className={styles.expiringLabel}>Tareas</span>
          </div>
        </div>
      </td>
    </tr>
  );
}
