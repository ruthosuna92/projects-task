
"use client";

import SearchInput from "@/components/ui/SearchInput";
import { useProjects } from "@/store/useProjectsStore";

export default function ProjectsSearch() {
  const search = useProjects((state) => state.search);
  const setSearch = useProjects((state) => state.setSearch);

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder="Buscar"
      ariaLabel="Buscar proyectos"
    />
  );
}