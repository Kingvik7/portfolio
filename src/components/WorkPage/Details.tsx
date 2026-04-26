import styled from "styled-components";
import { projectsData } from "@data/projectsData";
import { useProjectContext } from "@contexts/ProjectContext";
import Tag from "./Tag";

export default function Details() {
  const { selectedProject } = useProjectContext();
  const project = selectedProject != null ? projectsData[selectedProject] : null;

  return (
    <Wrapper>
      <Top>
        <Heading>
          <span>
            {" "}
            {Array.isArray(project?.filter)
              ? project.filter.join(" & ")
              : project?.filter}{" "}
            Work \
          </span>{" "}
          <br />
          {project?.name}
        </Heading>
        <VerticalDivider />
        <BottomGroup>
          <div className="title">Stack</div>
          <TagContainer>
            {project?.tags?.map((tag: string) => (
              <Tag key={tag} text={tag} />
            ))}
          </TagContainer>
        </BottomGroup>
        {project?.buttonCopy && (
          <Button
            download
            href={project?.href}
            target="_blank"
            rel="noreferrer"
          >
            {project?.buttonCopy}
          </Button>
        )}
      </Top>

      <Divider />

      <Bottom>
        <Description>{project?.longDescription}</Description>
      </Bottom>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 75%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 2rem;
  margin: 2rem auto;
  border-radius: 2.5rem;
  border: 1.5px solid transparent;
  background-color: #1a1a1a;
  background-image:
    linear-gradient(-45deg, #1a1a1a, #1a1a1a),
    linear-gradient(135deg, #2c2c2c, #0b0b0b 50%, #2c2c2c);
  background-origin: padding-box, border-box;
  background-clip: padding-box, border-box;
  box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.5);

  .title {
    font-size: 0.85rem;
    font-weight: bold;
  }

  @media (max-width: 767px) {
    width: calc(100% - 40px);
    max-width: none;
    padding: 1.5rem 1.5rem;
    border-radius: 1.5rem;
    box-sizing: border-box;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const Heading = styled.div`
  span {
    background: none;
    -webkit-background-clip: none;
    background-clip: none;
    -webkit-text-fill-color: #c2c2c2;
    font-size: 1rem;
    color: #c2c2c2;
    font-weight: 600;
  }

  line-height: 28px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

const VerticalDivider = styled.div`
  width: 1px;
  align-self: stretch;
  background-color: #2c2c2c;
`;

const Description = styled.div`
  font-size: 0.8rem;
  color: #ffffff;
  line-height: 1.5;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #2c2c2c;
`;

const Bottom = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BottomGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Button = styled.a`
  display: flex;
  justify-content: center;
  padding: 0.6rem 1.5rem;
  color: white;
  font-weight: 500;
  border-radius: 2.5rem;
  background-color: #db2777;
  transition: 0.3s ease;
  font-size: 12px;
  white-space: nowrap;
  margin-left: auto;

  @media (max-width: 767px) {
    margin-left: 0;
    align-self: flex-start;
  }

  &:hover {
    opacity: 0.5;
  }

  &:active {
    opacity: 0.75;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
