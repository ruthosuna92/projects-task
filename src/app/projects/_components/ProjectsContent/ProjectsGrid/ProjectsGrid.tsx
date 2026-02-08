"use client";

import styles from "./ProjectsGrid.module.css";
import { useProjects } from "@/store/useProjectsStore";
import { selectVisibleProjects } from "@/lib/projectSelectors/projectSelectors";
import ProjectsGridItem from "./ProjectsGridItem";

export default function ProjectsGrid() {
  const projectsState = useProjects();

  // todo: use real logic for pagination
  const page = 1;
  const pageSize = 12;

  const projects = selectVisibleProjects(
    projectsState,
    page,
    pageSize
  );

  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <ProjectsGridItem
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}