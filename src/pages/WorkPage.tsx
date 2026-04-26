import { motion } from "framer-motion";
import styled from "styled-components";
import { pageTransition } from "@utils/animations";
import ProjectsMap from "@components/WorkPage/ProjectMap";
import ProjectPage from "@components/WorkPage/ProjectPage";

function WorkPage() {
  return (
    <WorkPageWrapper
      initial={pageTransition?.initial}
      animate={pageTransition?.animate}
      exit={pageTransition?.exit}
    >
      <ProjectsMap />
      <ProjectPage />
    </WorkPageWrapper>
  );
}

export default WorkPage;

const WorkPageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  background-color: transparent;
  color: var(--text-color);
  font-family: bold;
  font-size: 2rem;
`;
