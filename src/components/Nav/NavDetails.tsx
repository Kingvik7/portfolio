import styled from "styled-components";
import { DividerVerticalIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { useProjectContext } from "@contexts/ProjectContext";
import { projectsData } from "@data/projectsData";
import NavList from "./NavList";

export default function Details() {
  const { selectedProject, setProjectState } = useProjectContext();
  return (
    <div className="details">
      {projectsData[selectedProject].shortName}
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
