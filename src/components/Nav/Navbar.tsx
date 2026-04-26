import styled, { css } from "styled-components";
import { glass } from "@styles/globalStyles";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MixIcon } from "@radix-ui/react-icons";
import { useProjectContext } from "@contexts/ProjectContext";
import NavList from "./NavList";
import Details from "./NavDetails";

type ContentType = "icon" | "list" | "details";

export default function Navbar() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartTranslate = useRef(0);
  const translateXRef = useRef(0);
  const maxXRef = useRef(0);

  const [dockPosition, setDockPosition] = useState(0); // -1: left, 0: center, 1: right
  const [open, setOpen] = useState(false);
  const [maxX, setMaxX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [dropped, setDropped] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Content transition state
  const renderedContentRef = useRef<ContentType>("icon");
  const [renderedContent, setRenderedContent] = useState<ContentType>("icon");
  const [contentPhase, setContentPhase] = useState<
    "entering" | "visible" | "exiting"
  >("visible");

  const { projectVisible, setProjectState } = useProjectContext();

  // Motion blur on pill during project transitions
  const blurProgress = useMotionValue(0);
  const blurFilter = useTransform(
    blurProgress,
    [0, 0.5, 1],
    ["blur(0px)", "blur(2px)", "blur(0px)"],
  );

  // Track project transition so closing also gets the Dynamic Island animation
  const wasProjectRef = useRef(false);
  const [isProjectTransitioning, setIsProjectTransitioning] = useState(false);

  useEffect(() => {
    if (projectVisible && !wasProjectRef.current) {
      // Opening project
      setIsProjectTransitioning(true);
      wasProjectRef.current = true;
    } else if (!projectVisible && wasProjectRef.current) {
      // Closing project — keep the flag on during the animation
      setIsProjectTransitioning(true);
      wasProjectRef.current = false;
      const timer = setTimeout(() => setIsProjectTransitioning(false), 700);
      return () => clearTimeout(timer);
    }
  }, [projectVisible]);

  const targetContent: ContentType = projectVisible
    ? "details"
    : open
      ? "list"
      : "icon";

  const sizerRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState<number | null>(null);

  const getNavWidth = () => navRef.current?.getBoundingClientRect().width ?? 32;

  // Keep refs in sync
  useEffect(() => {
    translateXRef.current = translateX;
  }, [translateX]);
  useEffect(() => {
    maxXRef.current = maxX;
  }, [maxX]);

  // Measure content width via hidden sizer
  useEffect(() => {
    if (!sizerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setNavWidth(entry.contentRect.width + 32);
      }
    });
    observer.observe(sizerRef.current);
    return () => observer.disconnect();
  }, []);

  // Measure container
  useEffect(() => {
    const handleResize = () => {
      if (constraintsRef.current) {
        const w = constraintsRef.current.getBoundingClientRect().width / 2;
        setMaxX(w);
        maxXRef.current = w;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Drop in navbar, then open once it lands
  useEffect(() => {
    const dropTimer = setTimeout(() => {
      setDropped(true);
      setTimeout(() => setOpen(true), 600);
    }, 600);
    const closeTimer = setTimeout(() => setOpen(false), 4000);
    return () => {
      clearTimeout(dropTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  // Snap position when state changes
  useEffect(() => {
    if (dragging) return;
    // Wait a frame so the nav has resized to fit new content
    requestAnimationFrame(() => {
      const navWidth = getNavWidth();
      const currentMaxX = maxX - navWidth / 2;
      let targetX = 0;
      if (dockPosition === 1) targetX = currentMaxX;
      else if (dockPosition === -1) targetX = -currentMaxX;
      setTranslateX(targetX);
    });
  }, [open, projectVisible, maxX, dockPosition, dragging]);

  // Content transition (replaces AnimatePresence mode="wait")
  useEffect(() => {
    if (targetContent === renderedContentRef.current) {
      setContentPhase("visible");
      return;
    }

    let cancelled = false;

    const isProjectTransition =
      targetContent === "details" || renderedContentRef.current === "details";

    // Instantly hide and swap content — no visible exit fade
    setContentPhase("exiting");
    if (isProjectTransition) {
      blurProgress.set(0);
      animate(blurProgress, 1, { duration: 0.45, ease: "easeInOut" });
    }
    renderedContentRef.current = targetContent;
    setRenderedContent(targetContent);

    // Fade in after the pill has morphed
    const morphDelay = 150;

    const enterTimer = setTimeout(() => {
      if (cancelled) return;
      setContentPhase("entering");
    }, morphDelay);

    return () => {
      cancelled = true;
      clearTimeout(enterTimer);
    };
  }, [targetContent]);

  const snapToClosest = useCallback((posX: number) => {
    const nw = navRef.current?.getBoundingClientRect().width ?? 32;
    const mx = maxXRef.current;
    const currentMaxX = mx - nw / 2;
    const snapPoints = [-currentMaxX, 0, currentMaxX];
    const closest = snapPoints.reduce((prev, curr) =>
      Math.abs(curr - posX) < Math.abs(prev - posX) ? curr : prev,
    );

    if (closest === currentMaxX) setDockPosition(1);
    else if (closest === -currentMaxX) setDockPosition(-1);
    else setDockPosition(0);

    setTranslateX(closest);
  }, []);

  // Drag handlers
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragStartX.current = e.clientX;
      dragStartTranslate.current = translateXRef.current;
      isDragging.current = false;

      const handleMove = (ev: PointerEvent) => {
        const dx = ev.clientX - dragStartX.current;
        if (Math.abs(dx) > 3 && !isDragging.current) {
          isDragging.current = true;
          setDragging(true);
        }
        if (isDragging.current) {
          let newX = dragStartTranslate.current + dx;
          // Elastic clamping (matches dragElastic={0.15})
          const nw = navRef.current?.getBoundingClientRect().width ?? 32;
          const limit = maxXRef.current - nw / 2;
          if (newX > limit) newX = limit + (newX - limit) * 0.15;
          else if (newX < -limit) newX = -limit + (newX + limit) * 0.15;
          translateXRef.current = newX;
          setTranslateX(newX);
        }
      };

      const handleUp = () => {
        document.removeEventListener("pointermove", handleMove);
        document.removeEventListener("pointerup", handleUp);
        if (isDragging.current) {
          snapToClosest(translateXRef.current);
          setDragging(false);
        }
        setTimeout(() => {
          isDragging.current = false;
        }, 50);
      };

      document.addEventListener("pointermove", handleMove);
      document.addEventListener("pointerup", handleUp);
    },
    [snapToClosest],
  );

  const getTransform = () => {
    if (!dropped) return `translateX(${translateX}px) scale(0.98)`;
    return dragging
      ? `translateX(${translateX}px) scale(1.1)`
      : `translateX(${translateX}px)`;
  };

  const renderContent = () => {
    if (renderedContent === "details") return <Details />;
    if (renderedContent === "list") return <NavList />;
    return (
      <div className="nav-icon">
        <MixIcon color="var(--text-color)" width="1rem" height="1rem" />
      </div>
    );
  };

  // Sizer always shows the target content (no exit animation)
  const renderTargetContent = () => {
    if (targetContent === "details") return <Details />;
    if (targetContent === "list") return <NavList />;
    return (
      <div className="nav-icon">
        <MixIcon color="var(--text-color)" width="1rem" height="1rem" />
      </div>
    );
  };

  return (
    <NavbarWrapper ref={constraintsRef}>
      {/* Hidden sizer to measure target content width */}
      <Sizer ref={sizerRef}>{renderTargetContent()}</Sizer>
      <Nav
        ref={navRef}
        $dragging={dragging}
        $isProject={projectVisible || isProjectTransitioning}
        initial={false}
        animate={{
          width:
            navWidth != null
              ? navWidth + (projectVisible ? 5 : 0)
              : undefined,
        }}
        transition={
          projectVisible || isProjectTransitioning
            ? { type: "spring", stiffness: 130, damping: 16, mass: 1 }
            : { type: "spring", stiffness: 260, damping: 20, mass: 1 }
        }
        style={{
          opacity: dropped ? 1 : 0,
          transform: getTransform(),
          filter: blurFilter,
          paddingInline: projectVisible ? "2px" : undefined,
        }}
        onPointerDown={handlePointerDown}
        onMouseEnter={() => {
          if (!isDragging.current && !projectVisible) setOpen(true);
        }}
        onMouseLeave={() => {
          if (!projectVisible) setOpen(false);
        }}
        onClick={() => {
          if (!isDragging.current && !projectVisible) setOpen(true);
        }}
      >
        <ContentWrapper $phase={contentPhase}>
          {renderContent()}
        </ContentWrapper>
      </Nav>
    </NavbarWrapper>
  );
}

const ContentWrapper = styled.div<{
  $phase: "entering" | "visible" | "exiting";
}>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  opacity: ${(props) =>
    props.$phase === "entering" || props.$phase === "visible" ? 1 : 0};
  transition: ${(props) =>
    props.$phase === "exiting" ? "none" : "opacity 0.3s ease-out"};
`;

const navContentStyles = css`
  .nav-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--text-color);
    font-weight: 700;

    .nav-item {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      user-select: none;
      cursor: pointer;
    }
  }

  .details {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    font-weight: 900;
  }
`;

const Sizer = styled.div`
  position: absolute;
  visibility: hidden;
  pointer-events: none;
  height: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 0 16px;
  gap: 0.5rem;
  ${navContentStyles}
`;

const Nav = styled(motion.div)<{
  $dragging: boolean;
  $isProject: boolean;
}>`
  padding: 10px 5px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2rem;
  cursor: pointer;
  color: var(--text-color);
  ${glass}
  pointer-events: all;
  gap: 0.5rem;
  z-index: 15;
  overflow: hidden;
  user-select: none;
  touch-action: none;

  transition:
    opacity 0.6s ease-out,
    transform 0.5s cubic-bezier(0.25, 1, 0.5, 1),
    padding 0.35s cubic-bezier(0.25, 1, 0.5, 1),
    box-shadow 0.3s ease;

  ${(props) =>
    props.$isProject &&
    css`
      transition:
        opacity 0.6s ease-out,
        transform 0.6s cubic-bezier(0.4, 0, 0, 1),
        padding 0.6s cubic-bezier(0.4, 0, 0, 1),
        box-shadow 0.3s ease;
    `}

  ${(props) =>
    props.$dragging &&
    css`
      transition:
        opacity 0.6s ease-out,
        box-shadow 0.3s ease;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    `}

  ${navContentStyles}
`;

const NavbarWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: end;
  border-radius: 1rem;
  pointer-events: none;
`;
