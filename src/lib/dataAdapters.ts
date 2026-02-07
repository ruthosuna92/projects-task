// nombre, plan, estado, equipo y el
// número de ítems por vencer (incidentes, RFI y tareas)

import {
  IncidentItem,
  IncidentStatus,
  Plan,
  ProjectStatus,
  type Project,
} from "@/types/projects";
import projectsMock from "@/lib/data/projects.mock.json";

type IncidentItemRaw = {
  item: IncidentItem;
  status: IncidentStatus;
  limitDate: string;
};

type RawProject = {
  _id: string;
  title: string;
  projectPlanData: {
    plan: Plan;
  };
  status: ProjectStatus;
  users: {
    name: string;
    lastName: string;
  }[];
  incidents?: IncidentItemRaw[];
  position?: {
    lat: number;
    lng: number;
  };
  city: string;
  address: string;
  img?: string;
};

const nextIncidents = (project: RawProject, today: Date) => {
  if (!project?.incidents?.length) return [];

  return project.incidents.filter((incident: IncidentItemRaw) => {
    const incidentDate = new Date(incident.limitDate);
    const isActive = incident.status === IncidentStatus.Active;
    return isActive && incidentDate >= today;
  });
};
const adaptProjectsData = (raw: RawProject[]): Project[] => {
  const today = new Date("2024-11-19T12:13:32.420"); // Fixed date for consistent results
  console.log(today)
  return raw.map((item: RawProject) => {
    const incidentsDue = nextIncidents(item, today);
    console.log(incidentsDue)
    const expiringItems = incidentsDue.reduce(
      (acc, incident: IncidentItemRaw) => {
        console.log(incident.item === IncidentItem.Task)
        if (incident.item === IncidentItem.Incident) acc.incidents += 1;
        if (incident.item === IncidentItem.RFI) acc.rfi += 1;
        if (incident.item === IncidentItem.Task) acc.tasks += 1;
        console.log(acc)
        return acc;
      },
        { incidents: 0, rfi: 0, tasks: 0 },
    );

    return {
      id: item._id,
      name: item.title,
      plan: item.projectPlanData.plan,
      status: item.status,
      team: item.users,
      expiringItems,
      location: {
        lat:
          item?.position && Number.isFinite(item.position.lat)
            ? item.position.lat
            : 0,
        lng:
          item?.position && Number.isFinite(item.position.lng)
            ? item.position.lng
            : 0,
        city: item.city,
        address: item.address,
      },
      imageUrl: item.img ?? "https://via.placeholder.com/150",
    } satisfies Project;
  });
};

export const projects: Project[] = adaptProjectsData(
  projectsMock as RawProject[],
);

console.log(projects);