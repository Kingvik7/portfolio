import { useLocation, useOutlet } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useState } from "react";
import Navbar from "@components/Nav/Navbar";
import { ProjectProvider } from "@contexts/ProjectContext";
import Anim from "@components/WorkPage/Anim";

const AnimatedOutlet = (): React.JSX.Element => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait" initial={true}>
      {element && React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
};

function DefaultLayout() {
  const [animDone, setAnimDone] = useState(false);
  const handleAnimComplete = useCallback(() => setAnimDone(true), []);

  return (
    <ProjectProvider>
      <Wrapper>
        {animDone && <AnimatedOutlet />}
        {animDone && <Navbar />}
        <Anim onComplete={handleAnimComplete} />
      </Wrapper>
    </ProjectProvider>
  );
}

export default DefaultLayout;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
