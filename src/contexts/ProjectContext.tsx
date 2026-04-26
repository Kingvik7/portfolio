import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { projectsData } from "@data/projectsData";

function toSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface ProjectContextValue {
  selectedProject: number | null;
  projectVisible: boolean;
  setProjectState: (update: Partial<ProjectState>) => void;
}

interface ProjectState {
  selectedProject?: number | null;
  projectVisible?: boolean;
  customProjectVisible?: boolean;
  threeVisible?: boolean;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

function notifySwiftUI(update: ProjectState) {
  const event = new CustomEvent("stateChange", {
    detail: { updatedState: update },
  });
  window.dispatchEvent(event);
  if ((window as any).webkit) {
    (window as any).webkit.messageHandlers.stateHandler.postMessage(
      JSON.stringify(update),
    );
  }
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectVisible, setProjectVisible] = useState(false);

  // On mount, check URL for project param
  useEffect(() => {
    const projectParam = searchParams.get("project");
    if (projectParam) {
      const index = projectsData.findIndex(
        (p) => toSlug(p.shortName) === projectParam
      );
      if (index !== -1) {
        setSelectedProject(index);
        setProjectVisible(true);
      }
    }
  }, []);

  const setProjectState = useCallback((update: ProjectState) => {
    console.log("setProjectState called with:", update);
    if (update.selectedProject !== undefined)
      setSelectedProject(update.selectedProject);
    if (update.projectVisible !== undefined)
      setProjectVisible(update.projectVisible);

    // Sync URL
    if (update.projectVisible === false) {
      setSearchParams({}, { replace: true });
    } else if (update.selectedProject != null && update.projectVisible !== false) {
      const shortName = projectsData[update.selectedProject]?.shortName;
      if (shortName) {
        setSearchParams({ project: toSlug(shortName) }, { replace: true });
      }
    }

    notifySwiftUI(update);
  }, [setSearchParams]);

  return (
    <ProjectContext.Provider
      value={{ selectedProject, projectVisible, setProjectState }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjectContext() {
  const ctx = useContext(ProjectContext);
  if (!ctx)
    throw new Error("useProjectContext must be used within ProjectProvider");
  return ctx;
}
