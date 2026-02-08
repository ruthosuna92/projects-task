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
  createdAt: string;
  lastUpdated: string;
};

const PLACEHOLDER_IMAGE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='10' fill='%23F3F4F6'/%3E%3Cpath d='M18 46l10-12 8 10 6-7 14 19H18z' fill='%239CA3AF'/%3E%3Ccircle cx='24' cy='24' r='5' fill='%23D1D5DB'/%3E%3C/svg%3E";

const isValidHttpUrl = (value: unknown): value is string => {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  try {
    const url = new URL(trimmed);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const parseDate = (value: unknown): Date | null => {
  if (typeof value !== "string") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatTableDate = (value: unknown): string => {
  const date = parseDate(value);
  if (!date) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
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
  return raw.map((item: RawProject) => {
    const incidentsDue = nextIncidents(item, today);
    const expiringItems = incidentsDue.reduce(
      (acc, incident: IncidentItemRaw) => {
        if (incident.item === IncidentItem.Incident) acc.incidents += 1;
        if (incident.item === IncidentItem.RFI) acc.rfi += 1;
        if (incident.item === IncidentItem.Task) acc.tasks += 1;
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
      imageUrl: isValidHttpUrl(item.img) ? item.img : null,
      createdAt: formatTableDate(item.createdAt),
      lastUpdated: formatTableDate(item.lastUpdated),
    } satisfies Project;
  });
};

export const projects: Project[] = adaptProjectsData(
  projectsMock as RawProject[],
);