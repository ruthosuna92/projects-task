import { Project } from "@/types/projects";
import { create } from "zustand";

export enum SortOptions {
  Alphabetical = "alphabetical",
  Incident = "incidents",
  Task = "task",
  RFI = "rfi",
  Default = "default",
}

export enum ViewOptions {
    Table = "table",
    Grid = "grid",
    Map = "map"
}

export interface ProjectsState {
  projectsById: Record<string, Project>;
  projectsIds: string[];
  search: string;
  sort: SortOptions;
  view: ViewOptions;
  selectedProjectId: string | null;
  // Actions:
  setProjects: (projects: Project[]) => void;
  setSearch: (value: string) => void;
  setSort: (sort: SortOptions) => void;
  setSelectedProjectId: (id: string | null) => void;
  setView: (view: ViewOptions) => void;
  resetUI: () => void;
}

export const useProjects = create<ProjectsState>((set) => ({
  projectsById: {} ,
  projectsIds: [] ,
  search: "",
  sort: SortOptions.Default,
  view: ViewOptions.Table,
    selectedProjectId: null,
// Actions:
setProjects: (projects: Project[]) =>
    set(() => ({
        projectsById: projects.reduce<Record<string, Project>>((acc, project) => {
            acc[project.id] = project;
            return acc;
        }, {}),
        projectsIds: projects.map((project) => project.id),
    })),
setSearch: (value: string) => set({ search: value }),
setSort: (sort: SortOptions) => set({ sort }),
setSelectedProjectId: (id: string | null) => set({ selectedProjectId: id }),
setView: (view: ViewOptions) => set({ view }),
resetUI: () =>
  set({
    search: "",
    sort: SortOptions.Default,
    selectedProjectId: null,
    view: ViewOptions.Table,
  }),
}));