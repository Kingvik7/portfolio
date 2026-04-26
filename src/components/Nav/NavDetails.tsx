import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { useProjectContext } from "@contexts/ProjectContext";
import { projectsData } from "@data/projectsData";
import NavList from "./NavList";

export default function Details() {
  const { selectedProject } = useProjectContext();
  const project = selectedProject != null ? projectsData[selectedProject] : null;
  return (
    <div className="details">
      {project?.shortName}
      <DividerVerticalIcon
        color="var(--text-color)"
        opacity={0.5}
        width="20px"
        height="20px"
      />
      <NavList />
    </div>
  );
}
