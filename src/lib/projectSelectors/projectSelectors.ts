import { ProjectsState, SortOptions } from "@/store/useProjectsStore";
import { Project } from "@/types/projects";

export const selectProjectsById = (
  state: ProjectsState,
  ids: string[],
): Project[] => {
  return ids.map((id) => state.projectsById[id]).filter(Boolean);
};

export const selectSearch = (state: ProjectsState): string => {
  return state.search.trim().toLowerCase();
};

export const selectFilteredProjectIds = (state: ProjectsState): string[] => {
  const search = selectSearch(state);
  if (!search) return state.projectsIds;

  return state.projectsIds.filter((id) => {
    const project = state.projectsById[id]?.name.toLowerCase() ?? ""
    return project?.includes(search);
  });
};

export const selectSortedProjectIds = (state: ProjectsState): string[] => {
  const sortQuery = state.sort;
  const copiedIds = [...selectFilteredProjectIds(state)];

  if (sortQuery === SortOptions.Alphabetical) {
    return copiedIds.sort((a, b) => {
      const nameA = state.projectsById[a].name.toLowerCase() ?? ""
      const nameB = state.projectsById[b].name.toLowerCase() ?? ""
      return nameA.localeCompare(nameB);
    });
  }
  if (sortQuery === SortOptions.Incident) {
    return copiedIds.sort((a, b) => {
      const incidentsA = state.projectsById[a].expiringItems.incidents ?? 0
      const incidentsB = state.projectsById[b].expiringItems.incidents ?? 0
      return incidentsB - incidentsA; // Descending order
    });
  }
  if (sortQuery === SortOptions.Task) {
    return copiedIds.sort((a, b) => {
      const tasksA = state.projectsById[a].expiringItems.tasks ?? 0
      const tasksB = state.projectsById[b].expiringItems.tasks ?? 0
      return tasksB - tasksA; // Descending order
    });
  }
  if (sortQuery === SortOptions.RFI) {
    return copiedIds.sort((a, b) => {
      const rfiA = state.projectsById[a].expiringItems.rfi ?? 0
      const rfiB = state.projectsById[b].expiringItems.rfi ?? 0
      return rfiB - rfiA; // Descending order
    });
  } else {
    return copiedIds
  }
};

export const selectPagedProjectIds = (
  state: ProjectsState,
  page: number,
  pageSize: number,
): string[] => {
 const ids = selectSortedProjectIds(state);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return ids.slice(startIndex, endIndex);
}

export const selectVisibleProjects = (state: ProjectsState, page: number, pageSize: number): Project[] => {
    const pagedIds = selectPagedProjectIds(state, page, pageSize);
    return selectProjectsById(state, pagedIds);
}

export const selectTotalResultsCount = (state: ProjectsState): number => {
    return selectSortedProjectIds(state).length;
}