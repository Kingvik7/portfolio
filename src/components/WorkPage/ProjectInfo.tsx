import styled from "styled-components";
import { projectsData } from "@data/projectsData";
import { useProjectContext } from "@contexts/ProjectContext";

type ProjectSection = {
  heading?: string;
  blockData?: { name: string; description: string }[];
  image?: string;
  imageWidth?: number;
  imageAlign?: "left" | "right" | "center";
  centerImage?: boolean;
  noImageRadius?: boolean;
  video?: string;
  videoPoster?: string;
};

export default function ProjectInfo() {
  const { selectedProject } = useProjectContext();
  const project = selectedProject != null ? projectsData[selectedProject] : null;
  const sections = (project as { data?: ProjectSection[] } | null)?.data;

  return (
    <ProjectInfoWrapper>
      {sections?.map((section: ProjectSection, index: number) => {
        const isEven = index % 2 === 0;

        return (
          <Section key={index}>
            {section.heading && (
              <SectionHeader $align={isEven ? "left" : "right"}>
                <SectionNumber $align={isEven ? "left" : "right"}>
                  0{index + 1}
                </SectionNumber>
                <Title>{section.heading}</Title>
              </SectionHeader>
            )}

            {section?.blockData && (
              <ContentArea>
                {section.blockData.map((block, i: number) => (
                  <TextBlock key={i}>
                    <BlockName>{block.name}</BlockName>
                    <BlockDivider />
                    <BlockDescription>{block.description}</BlockDescription>
                  </TextBlock>
                ))}
              </ContentArea>
            )}

            {(section.image || section.video) && (
              <ImageWrapper
                $width={section.video ? 100 : section.imageWidth}
                $align={
                  section.centerImage
                    ? "center"
                    : section.imageAlign || (isEven ? "right" : "left")
                }
                $noRadius={section.noImageRadius}
              >
                {section.video ? (
                  <video
                    loop
                    muted
                    playsInline
                    controls
                    src={section.video}
                    poster={section.videoPoster}
                  />
                ) : (
                  <img alt="Image" src={section.image} />
                )}
              </ImageWrapper>
            )}
          </Section>
        );
      })}
    </ProjectInfoWrapper>
  );
}

const ProjectInfoWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  gap: 4rem;
  padding: 2rem 0;
  margin: 3rem auto 6rem;
  font-family:
    "sfpro",
    system-ui,
    -apple-system,
    sans-serif;

  @media (max-width: 767px) {
    width: 100%;
    padding: 1rem 20px;
    gap: 3rem;
    margin: 2rem auto 4rem;
    box-sizing: border-box;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-top: 4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.14);

  &:first-child {
    padding-top: 0;
    border-top: none;
  }

  @media (max-width: 767px) {
    gap: 1.5rem;
    padding-top: 2.5rem;
  }
`;

const SectionHeader = styled.div<{ $align: "left" | "right" }>`
  display: flex;
  flex-direction: column;
  align-self: ${({ $align }) =>
    $align === "right" ? "flex-end" : "flex-start"};

  @media (max-width: 767px) {
    align-self: flex-start;
  }
`;

const SectionNumber = styled.div<{ $align: "left" | "right" }>`
  text-align: ${({ $align }) => $align};

  font-family:
    "sfpro",
    system-ui,
    -apple-system,
    sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 0;

  @media (max-width: 767px) {
    text-align: left;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 1.3;

  @media (max-width: 767px) {
    font-size: 1.25rem;
  }
`;

const ContentArea = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 3rem;
  width: 100%;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const BlockDivider = styled.div`
  width: 1.5rem;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 1px;
`;

const BlockName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.01em;
`;

const BlockDescription = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.75;
  font-family:
    "sfpro",
    system-ui,
    -apple-system,
    sans-serif;

  @media (max-width: 767px) {
    font-size: 0.85rem;
    line-height: 1.6;
  }
`;

const ImageWrapper = styled.div<{
  $width?: number;
  $align: "left" | "right" | "center";
  $noRadius?: boolean;
}>`
  width: ${({ $width }) => ($width ? `${$width}%` : "85%")};
  align-self: ${({ $align }) =>
    $align === "center"
      ? "center"
      : $align === "right"
        ? "flex-end"
        : "flex-start"};
  border-radius: ${({ $noRadius }) => ($noRadius ? "0" : "0.75rem")};
  overflow: hidden;

  @media (max-width: 767px) {
    width: 100%;
  }

  img,
  video {
    display: block;
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: ${({ $noRadius }) => ($noRadius ? "0" : "0.75rem")};
    filter: brightness(0.75);
  }
`;
