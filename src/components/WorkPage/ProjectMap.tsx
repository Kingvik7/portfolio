import styled from "styled-components";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Tag from "./Tag";
import { useProjectContext } from "@contexts/ProjectContext";
import { projectsData } from "@data/projectsData";
import { glass } from "@styles/globalStyles";

// Each page layout defines its item count and a function to get the card size by index
const PAGE_LAYOUTS: {
  size: number;
  getSize: (i: number) => "featured" | "wide" | "standard";
}[] = [
  // Page 0: featured (2x2) + 2 standard
  { size: 3, getSize: (i) => (i === 0 ? "featured" : "standard") },
  // Page 1: row 1 = wide + standard, row 2 = 3 standard
  { size: 5, getSize: (i) => (i === 0 ? "wide" : "standard") },
  // Page 2: row 1 = standard + wide, row 2 = wide + standard
  { size: 4, getSize: (i) => (i === 1 || i === 2 ? "wide" : "standard") },
];

// Fallback for any pages beyond the defined layouts
const FALLBACK_LAYOUT = { size: 6, getSize: () => "standard" as const };

function useIsMobile(breakpoint = 767) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= breakpoint,
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

let isInitialLoad = true;

export default function ProjectsMap() {
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(0);
  const directionRef = useRef(1);
  const isFilterChange = useRef(false);
  const isPageChange = useRef(false);
  const animateBorder = useRef(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [projects] = useState(projectsData);
  const { setProjectState } = useProjectContext();
  const initialLoadRef = useRef(isInitialLoad);

  useEffect(() => {
    isInitialLoad = false;
  }, []);

  const filters = ["All", "Dev", "Design"];

  const filtered = useMemo(
    () =>
      projects.filter(
        (project) =>
          selectedFilter === "All" ||
          (Array.isArray(project.filter)
            ? project.filter.includes(selectedFilter)
            : project.filter === selectedFilter),
      ),
    [selectedFilter, projects],
  );

  // Build page boundaries from layouts
  const { totalPages, pageStart, pageEnd, layout } = useMemo(() => {
    if (isMobile) {
      const p = Math.max(filtered.length, 1);
      const s = Math.min(currentPage, filtered.length - 1);
      return {
        totalPages: p,
        pageStart: s,
        pageEnd: s + 1,
        layout: { size: 1, getSize: () => "standard" as const },
      };
    }

    let remaining = filtered.length;
    let pages = 0;
    let start = 0;
    const starts: number[] = [];

    while (remaining > 0) {
      const l =
        pages < PAGE_LAYOUTS.length ? PAGE_LAYOUTS[pages] : FALLBACK_LAYOUT;
      starts.push(start);
      const count = Math.min(l.size, remaining);
      start += count;
      remaining -= count;
      pages++;
    }

    const p = Math.max(pages, 1);
    const s = starts[currentPage] ?? 0;
    const currentLayout =
      currentPage < PAGE_LAYOUTS.length
        ? PAGE_LAYOUTS[currentPage]
        : FALLBACK_LAYOUT;
    const e = s + Math.min(currentLayout.size, filtered.length - s);

    return { totalPages: p, pageStart: s, pageEnd: e, layout: currentLayout };
  }, [filtered, currentPage, isMobile]);

  const pageItems = filtered.slice(pageStart, pageEnd);

  const goToPage = (page: number) => {
    isFilterChange.current = false;
    isPageChange.current = true;
    animateBorder.current = false;
    directionRef.current = page > currentPage ? 1 : -1;
    setCurrentPage(page);
  };

  // Reset page when filter changes
  const handleFilter = (filter: string) => {
    isFilterChange.current = true;
    isPageChange.current = false;
    animateBorder.current = true;
    setCurrentPage(0);
    setSelectedFilter(filter);
  };

  return (
    <>
      <ProjectsWrapper
        initial={initialLoadRef.current ? { scale: 0.97 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Controls>
          <div className="left">
            <Title>
              <AnimatePresence mode="wait">
                <motion.span
                  key={selectedFilter}
                  initial={{ opacity: 0, y: 5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -5, filter: "blur(4px)" }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {selectedFilter}
                </motion.span>
              </AnimatePresence>
            </Title>
            <Divider />
          </div>
          <Filters>
            <LayoutGroup>
              {filters.map((filter, index) => (
                <div
                  className={`filter ${selectedFilter === filter ? "active" : ""}`}
                  onClick={() => handleFilter(filter)}
                  key={index}
                >
                  {selectedFilter === filter && (
                    <motion.div
                      className="filter-pill"
                      layoutId="filter-pill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="filter-label">{filter}</span>
                </div>
              ))}
            </LayoutGroup>
          </Filters>
        </Controls>
        <GridContainer>
          <AnimatePresence
            mode="wait"
            initial={false}
            custom={directionRef.current}
          >
            <ProjectGrid
              key={`${selectedFilter}-${currentPage}`}
              custom={directionRef.current}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{
                enter: (d: number) =>
                  isPageChange.current
                    ? { opacity: 0, x: 20 * d, filter: "blur(6px)" }
                    : { opacity: 0, scale: 0.99, filter: "blur(6px)" },
                center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
                exit: (d: number) =>
                  isPageChange.current
                    ? { opacity: 0, x: -20 * d, filter: "blur(6px)" }
                    : { opacity: 0, scale: 0.98, filter: "blur(6px)" },
              }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {pageItems.map((project, i) => {
                const originalIndex = projects.findIndex(
                  (p) => p.name === project.name,
                );
                const size = layout.getSize(i);
                return (
                  <ProjectCard
                    key={project.name}
                    $size={size}
                    $animateBorder={animateBorder.current}
                    $initialLoad={initialLoadRef.current}
                    onClick={() => {
                      console.log(
                        "card clicked:",
                        project.shortName,
                        originalIndex,
                      );
                      const p = project as Record<string, unknown>;
                      if (p?.custom) {
                        setProjectState({
                          customProjectVisible: true,
                          projectVisible: true,
                          selectedProject: originalIndex,
                        });
                      } else if (p?.three) {
                        setProjectState({
                          threeVisible: true,
                          projectVisible: true,
                          selectedProject: originalIndex,
                        });
                      } else {
                        if (
                          project.shortName === "Usability" ||
                          project.shortName === "Cerebranium"
                        ) {
                          window.open(project.href, "_blank");
                        } else {
                          setProjectState({
                            projectVisible: true,
                            selectedProject: originalIndex,
                          });
                        }
                      }
                    }}
                  >
                    <img
                      alt={project.name}
                      src={project.imageSrc}
                      className="project-image"
                    />
                    <CardOverlay className="card-overlay">
                      <ProjectTitle>{project.name}</ProjectTitle>
                      <TagContainer>
                        {project.tags?.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </TagContainer>
                    </CardOverlay>
                  </ProjectCard>
                );
              })}
            </ProjectGrid>
          </AnimatePresence>
        </GridContainer>
        <Dots>
          <DotGroup>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Dot
                key={i}
                $active={i === currentPage}
                onClick={() => goToPage(i)}
              />
            ))}
          </DotGroup>
          <ArrowButtons>
            <ArrowButton
              onClick={() => goToPage(Math.max(0, currentPage - 1))}
              $disabled={currentPage === 0}
            >
              <ChevronLeftIcon />
            </ArrowButton>
            <ArrowButton
              onClick={() =>
                goToPage(Math.min(totalPages - 1, currentPage + 1))
              }
              $disabled={currentPage === totalPages - 1}
            >
              <ChevronRightIcon />
            </ArrowButton>
          </ArrowButtons>
        </Dots>
      </ProjectsWrapper>
      {/* <DebugMenu
        projects={projects as Record<string, unknown>[]}
        onReorder={handleReorder}
        onUpdate={handleFieldUpdate}
      /> */}
    </>
  );
}

const ProjectsWrapper = styled(motion.div)`
  width: 70%;
  max-width: 1150px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 50px;

  @media (max-width: 767px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;

  span {
    display: inline-block;
  }

  @media only screen and (max-width: 767px) {
    font-size: 1.75rem;
  }
`;

const Divider = styled.div`
  width: 100px;
  height: 1px;
  background-color: #ffffff56;
  border-radius: 1rem;
`;

const GridContainer = styled.div`
  position: relative;

  @media (max-width: 767px) {
    height: 275px;
  }
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 14rem);
  grid-auto-flow: dense;
  gap: 1rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    height: 100%;
  }
`;

const ProjectCard = styled.div<{
  $size: "featured" | "standard" | "wide";
  $animateBorder: boolean;
  $initialLoad: boolean;
}>`
  position: relative;
  cursor: pointer;
  border-radius: 1.5rem;
  overflow: hidden;

  grid-row: ${({ $size }) => ($size === "featured" ? "span 2" : "span 1")};
  grid-column: ${({ $size }) =>
    $size === "featured" || $size === "wide" ? "span 2" : "span 1"};

  @media (max-width: 767px) {
    grid-row: span 1;
    grid-column: span 1;
  }

  border: 1px solid transparent;
  background-color: #1a1a1a;
  background-image:
    linear-gradient(-45deg, #1a1a1a, #1a1a1a),
    linear-gradient(var(--border-angle), #2c2c2c, #0b0b0b 50%, #2c2c2c);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  --border-angle: 135deg;
  ${({ $animateBorder, $initialLoad }) =>
    $animateBorder &&
    `animation: borderRotate 0.6s ease-in-out ${$initialLoad ? "0.6s" : "0.3s"} forwards; --border-angle: 45deg;`}

  @keyframes borderRotate {
    from {
      --border-angle: 90deg;
    }
    to {
      --border-angle: 135deg;
    }
  }

  .project-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      transform 0.6s ease,
      filter 0.6s ease;
  }

  &:hover .project-image {
    transform: scale(1.04);
  }

  &:hover .card-overlay {
    opacity: 1;
    transform: translateY(0);
  }

  &:active {
    opacity: 0.75;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1.25rem;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  opacity: 0;
  transform: translateY(4px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;

  @media (max-width: 767px) {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProjectTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const DotGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ArrowButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ArrowButton = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 50%;
  ${glass}
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  color: ${({ $disabled }) =>
    $disabled ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.7)"};
  transition: all 0.25s ease;

  &:hover {
    color: ${({ $disabled }) =>
      $disabled ? "rgba(255, 255, 255, 0.15)" : "#ffffff"};
  }

  &:active {
    opacity: 0.75;
  }
`;

const Dot = styled.div<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "15px" : "5px")};
  height: 5px;
  border-radius: 1rem;
  background-color: ${({ $active }) =>
    $active ? "#ffffff" : "rgba(255, 255, 255, 0.25)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:active {
    opacity: 0.75;
  }
`;

const Controls = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 10px;

    @media only screen and (max-width: 767px) {
      align-items: start;
    }
  }
`;

const Filters = styled.div`
  display: flex;
  gap: 0px;
  padding: 6px;
  border-radius: 2.75rem;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 12px;
  ${glass}

  .filter {
    position: relative;
    color: rgba(255, 255, 255, 0.55);
    padding: 4px 16px;
    border-radius: 2.5rem;
    transition: color 0.25s ease;
    user-select: none;
  }

  .filter:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  .active {
    color: #fff;
  }

  .filter-pill {
    position: absolute;
    inset: 0;
    border-radius: 2.5rem;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.3);
  }

  .filter-label {
    position: relative;
    z-index: 1;
  }
`;
