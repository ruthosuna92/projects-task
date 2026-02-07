import { useProjects } from "@/store/useProjectsStore";
import ProjectsTitle from "./ProjectsTitle";

export default function ProjectsHeader() {
  console.log(useProjects().projectsById);

  return (
    <section>
      <ProjectsTitle />
    </section>
  );
}
