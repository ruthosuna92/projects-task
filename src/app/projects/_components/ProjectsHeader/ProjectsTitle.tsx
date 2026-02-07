import { selectTotalResultsCount } from "@/lib/projectSelectors/projectSelectors";
import { useProjects } from "@/store/useProjectsStore";
import style from "./ProjectsTitle.module.css";
import Badge from "@/components/ui/Badge";

export default function ProjectsTitle() {
  const totalProjects = selectTotalResultsCount(useProjects.getState());
  return (
    <div className={style.titleContainer}>
      <h1>Mis proyectos</h1>
      <Badge >{totalProjects} Proyectos</Badge>
    </div>
  );
}
