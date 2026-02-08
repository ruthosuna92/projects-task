import { useProjects } from "@/store/useProjectsStore";
import ProjectsTitle from "./ProjectsTitle";
import styles from "./ProjectsHeader.module.css";
import ProjectsHeaderActions from "./ProjectsHeaderActions/ProjectsHeaderActions";

export default function ProjectsHeader() {
  console.log(useProjects().projectsById);

  return (
    <section className={styles.projectsContainer}>
      <ProjectsTitle />
     <ProjectsHeaderActions />
    </section>
  );
}
