import styled from "styled-components";
import { useProjectContext } from "@contexts/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@data/projectsData";
import { useState, useEffect, useRef } from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import Details from "./Details";
import ProjectInfo from "./ProjectInfo";
import { glass } from "@styles/globalStyles";

function ProjectPage() {
  const { projectVisible, selectedProject, setProjectState } =
    useProjectContext();

  const project =
    selectedProject != null
      ? (projectsData[selectedProject] as Record<string, any>)
      : null;

  const [iframeMounted, setIframeMounted] = useState(false);
  const directClose = useRef(false);

  // Reset when project closes
  useEffect(() => {
    if (!projectVisible) {
      setIframeMounted(false);
      directClose.current = false;
    }
  }, [projectVisible]);

  return (
    <AnimatePresence custom={directClose}>
      {projectVisible && (
        <ProjectPageWrapper
          key="projectPage"
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(10px)",
            borderRadius: "10rem",
          }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", borderRadius: "0" }}
          exit="exit"
          variants={{
            exit: () => ({
              opacity: 0,
              y: 25,
              filter: "blur(10px)",
              borderRadius: "10rem",
              transition: {
                duration: 0.3,
                ease: "easeOut",
                delay: directClose.current ? 0 : 0.3,
              },
            }),
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onAnimationComplete={() => {
            if (projectVisible) setIframeMounted(true);
          }}
        >
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              directClose.current = true;
              setProjectState({ projectVisible: false });
            }}
          >
            <Cross1Icon />
          </CloseButton>
          {project?.iframe ? (
            <IframeWrapper
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: iframeMounted ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
            >
              {iframeMounted && (
                <iframe
                  src={project?.iframeSrc}
                  title={project?.name}
                  allow="autoplay; fullscreen; xr-spatial-tracking; accelerometer; gyroscope; clipboard-read; clipboard-write"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </IframeWrapper>
          ) : (
            <>
              <Hero
                color={project?.color}
                $hasVideo={!!project?.heroVideo}
              >
                {project?.heroVideo ? (
                  <Video
                    src={project?.heroVideo}
                    $videoWidth={project?.heroVideoWidth}
                    autoPlay
                    muted
                    playsInline
                  />
                ) : (
                  <Image src={project?.heroSrc} />
                )}
                <Shadow />
              </Hero>
              <Details />
              <ProjectInfo />
            </>
          )}
        </ProjectPageWrapper>
      )}
    </AnimatePresence>
  );
}

export default ProjectPage;

const CloseButton = styled.button`
  position: sticky;
  top: 25px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: auto;
  margin-right: 25px;
  margin-bottom: -57px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  ${glass}
  padding: 9px;
  color: #fff;

  &:hover {
    opacity: 0.5;
    transition: all 0.2s ease;
  }
`;

const ProjectPageWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: #000000;
  display: flex;
  flex-direction: column;
`;

const IframeWrapper = styled.div`
  width: 100%;
  flex: 1;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const Hero = styled.div<{ color: any; $hasVideo?: boolean }>`
  width: 100%;
  height: 65%;
  background-color: ${({ color }) => color};
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;

  @media (max-width: 767px) {
    height: ${({ $hasVideo }) => ($hasVideo ? "45svh" : "40svh")};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 767px) {
    object-fit: cover;
    object-position: center;
  }
`;

const Video = styled.video<{ $videoWidth?: string }>`
  width: ${({ $videoWidth }) => $videoWidth || "100%"};
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Shadow = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  box-shadow: inset 0px 0px 15px 0px rgba(0, 0, 0, 0.5);
`;
