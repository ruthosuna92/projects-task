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

  page: number;
  pageSize: number;

  isLoading: boolean;

  setProjects: (projects: Project[]) => void;
  setSearch: (value: string) => void;
  setSort: (sort: SortOptions) => void;
  setSelectedProjectId: (id: string | null) => void;
  setView: (view: ViewOptions) => void;

  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;

  setIsLoading: (loading: boolean) => void;

  resetUI: () => void;
}

export const useProjects = create<ProjectsState>((set) => ({
  projectsById: {},
  projectsIds: [],
  search: "",
  sort: SortOptions.Default,
  view: ViewOptions.Table,
  selectedProjectId: null,

  page: 1,
  pageSize: 10,

  isLoading: false,

  setProjects: (projects: Project[]) =>
    set(() => ({
      projectsById: projects.reduce<Record<string, Project>>((acc, project) => {
        acc[project.id] = project;
        return acc;
      }, {}),
      projectsIds: projects.map((project) => project.id),
      page: 1,
    })),

  setSearch: (value: string) => set({ search: value, page: 1 }),
  setSort: (sort: SortOptions) => set({ sort, page: 1 }),
  setSelectedProjectId: (id: string | null) => set({ selectedProjectId: id }),
  setView: (view: ViewOptions) => set({ view }),

  setPage: (page: number) => set({ page }),
  setPageSize: (pageSize: number) => set({ pageSize, page: 1 }),

    setIsLoading: (loading: boolean) => set({isLoading: loading}),

  resetUI: () =>
    set({
      search: "",
      sort: SortOptions.Default,
      selectedProjectId: null,
      view: ViewOptions.Table,
      page: 1,
      pageSize: 10,
    }),
}));