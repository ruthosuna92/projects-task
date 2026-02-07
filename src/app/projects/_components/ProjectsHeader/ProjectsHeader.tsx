import { selectTotalResultsCount } from "@/lib/projectSelectors/projectSelectors"
import { useProjects } from "@/store/useProjectsStore"


export default function ProjectsHeader() {

    console.log(useProjects().projectsById)

    const totalProjects = selectTotalResultsCount(useProjects.getState())
    return (
        <section>
            <h1>Mis proyectos</h1>
            <p>{totalProjects} proyectos</p>
        </section>
    )
}