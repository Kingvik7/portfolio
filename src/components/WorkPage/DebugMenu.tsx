import styled from "styled-components";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { glass } from "@styles/globalStyles";

type ProjectItem = Record<string, unknown>;

function serializeValue(value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);
  const padInner = "  ".repeat(indent + 1);

  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") {
    if (value.includes("\n") || value.includes("`")) {
      return JSON.stringify(value);
    }
    return JSON.stringify(value);
  }
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value.map((v) => `${padInner}${serializeValue(v, indent + 1)},`);
    return `[\n${items.join("\n")}\n${pad}]`;
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const lines = entries.map(
      ([k, v]) => `${padInner}${k}: ${serializeValue(v, indent + 1)},`,
    );
    return `{\n${lines.join("\n")}\n${pad}}`;
  }

  return String(value);
}

function projectsToTypeScript(projects: ProjectItem[]): string {
  const items = projects.map((p) => `  ${serializeValue(p, 1)},`);
  return `export const projectsData = [\n${items.join("\n")}\n];\n`;
}

interface DebugMenuProps {
  projects: ProjectItem[];
  onReorder: (projects: ProjectItem[]) => void;
  onUpdate: (index: number, field: string, value: string) => void;
}

const EDITABLE_FIELDS = [
  "name",
  "shortName",
  "filter",
  "description",
  "tags",
  "longDescription",
];

export default function DebugMenu({
  projects,
  onReorder,
  onUpdate,
}: DebugMenuProps) {
  const [open, setOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const ts = projectsToTypeScript(projects);
    navigator.clipboard.writeText(ts).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [projects]);

  const moveProject = useCallback(
    (from: number, direction: -1 | 1) => {
      const to = from + direction;
      if (to < 0 || to >= projects.length) return;
      const next = [...projects];
      [next[from], next[to]] = [next[to], next[from]];
      onReorder(next);
      if (expandedIndex === from) setExpandedIndex(to);
      else if (expandedIndex === to) setExpandedIndex(from);
    },
    [projects, onReorder, expandedIndex],
  );

  return (
    <>
      <ToggleButton onClick={() => setOpen((o) => !o)} $open={open}>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: "inline-block" }}
        >
          ⚙
        </motion.span>
      </ToggleButton>

      <AnimatePresence>
        {open && (
          <Panel
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <PanelHeader>
              <span>Debug</span>
              <HeaderActions>
                <CopyBtn onClick={handleCopy} $copied={copied}>
                  {copied ? "Copied!" : "Copy data"}
                </CopyBtn>
                <CloseBtn onClick={() => setOpen(false)}>✕</CloseBtn>
              </HeaderActions>
            </PanelHeader>

            <ProjectList>
              {projects.map((project, index) => (
                <ProjectRow key={`${project.shortName}-${index}`}>
                  <RowHeader>
                    <ReorderButtons>
                      <MoveBtn
                        onClick={() => moveProject(index, -1)}
                        $disabled={index === 0}
                      >
                        ↑
                      </MoveBtn>
                      <MoveBtn
                        onClick={() => moveProject(index, 1)}
                        $disabled={index === projects.length - 1}
                      >
                        ↓
                      </MoveBtn>
                    </ReorderButtons>
                    <RowIndex>{index + 1}</RowIndex>
                    <RowName
                      onClick={() =>
                        setExpandedIndex(
                          expandedIndex === index ? null : index,
                        )
                      }
                    >
                      {(project.shortName as string) || (project.name as string)}
                      <Chevron $expanded={expandedIndex === index}>›</Chevron>
                    </RowName>
                  </RowHeader>

                  <AnimatePresence>
                    {expandedIndex === index && (
                      <FieldsContainer
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {EDITABLE_FIELDS.map((field) => {
                          const value = project[field];
                          if (value === undefined) return null;
                          const isLong =
                            field === "longDescription" ||
                            field === "description";
                          const isTags = field === "tags";
                          return (
                            <FieldGroup key={field}>
                              <FieldLabel>
                                {field}
                                {isTags && (
                                  <span style={{ opacity: 0.5 }}>
                                    {" "}
                                    (comma separated)
                                  </span>
                                )}
                              </FieldLabel>
                              {isLong ? (
                                <FieldTextarea
                                  value={String(value)}
                                  onChange={(e) =>
                                    onUpdate(index, field, e.target.value)
                                  }
                                  rows={3}
                                />
                              ) : (
                                <FieldInput
                                  value={
                                    isTags
                                      ? (value as string[]).join(", ")
                                      : String(value)
                                  }
                                  onChange={(e) =>
                                    onUpdate(
                                      index,
                                      field,
                                      isTags
                                        ? (e.target.value as unknown as string)
                                        : e.target.value,
                                    )
                                  }
                                />
                              )}
                            </FieldGroup>
                          );
                        })}
                      </FieldsContainer>
                    )}
                  </AnimatePresence>
                </ProjectRow>
              ))}
            </ProjectList>
          </Panel>
        )}
      </AnimatePresence>
    </>
  );
}

const ToggleButton = styled.button<{ $open: boolean }>`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 10000;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  ${glass}
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const Panel = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 340px;
  z-index: 9999;
  ${glass}
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 11px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CopyBtn = styled.button<{ $copied: boolean }>`
  background: ${({ $copied }) =>
    $copied ? "rgba(80, 200, 120, 0.15)" : "rgba(255, 255, 255, 0.06)"};
  border: 1px solid
    ${({ $copied }) =>
      $copied ? "rgba(80, 200, 120, 0.2)" : "rgba(255, 255, 255, 0.08)"};
  border-radius: 6px;
  color: ${({ $copied }) =>
    $copied ? "rgba(80, 200, 120, 0.9)" : "rgba(255, 255, 255, 0.5)"};
  font-size: 10px;
  padding: 4px 10px;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.3px;

  &:hover {
    background: ${({ $copied }) =>
      $copied ? "rgba(80, 200, 120, 0.15)" : "rgba(255, 255, 255, 0.1)"};
    color: ${({ $copied }) => ($copied ? "rgba(80, 200, 120, 0.9)" : "#fff")};
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const ProjectList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 2px;
  }
`;

const ProjectRow = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`;

const RowHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
`;

const ReorderButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const MoveBtn = styled.button<{ $disabled: boolean }>`
  background: none;
  border: none;
  color: ${({ $disabled }) =>
    $disabled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)"};
  font-size: 10px;
  line-height: 1;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  padding: 1px 3px;
  transition: color 0.15s;

  &:hover {
    color: ${({ $disabled }) => ($disabled ? "rgba(255, 255, 255, 0.1)" : "#fff")};
  }
`;

const RowIndex = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.2);
  min-width: 14px;
  text-align: center;
  font-variant-numeric: tabular-nums;
`;

const RowName = styled.button`
  flex: 1;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.15s;

  &:hover {
    color: #fff;
  }
`;

const Chevron = styled.span<{ $expanded: boolean }>`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.25);
  transition: transform 0.2s;
  transform: rotate(${({ $expanded }) => ($expanded ? "90deg" : "0deg")});
`;

const FieldsContainer = styled(motion.div)`
  overflow: hidden;
  padding: 0 14px 10px 44px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const FieldLabel = styled.label`
  font-size: 9px;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const inputStyles = `
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 11px;
  padding: 6px 8px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;

  &:focus {
    border-color: rgba(255, 255, 255, 0.15);
  }
`;

const FieldInput = styled.input`
  ${inputStyles}
`;

const FieldTextarea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  min-height: 48px;
`;
