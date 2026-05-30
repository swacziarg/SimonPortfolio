import { useEffect, useMemo, useState } from "react";

type FlowControlPuzzleProps = {
  isSolved: boolean;
  onSolve: () => void;
  previewMode: boolean;
};

type PipelineModule = {
  id: string;
  label: string;
  detail: string;
};

const pipelineModules: PipelineModule[] = [
  {
    id: "staging",
    label: "Excel staging",
    detail: "Clean daily export",
  },
  {
    id: "dashboard",
    label: "Power BI",
    detail: "Refresh KPI view",
  },
  {
    id: "validation",
    label: "SQL validation",
    detail: "Check usage records",
  },
  {
    id: "automation",
    label: "Power Automate",
    detail: "Schedule delivery",
  },
];

const requiredPath = ["validation", "staging", "automation", "dashboard"];

function getExpectedModule(selectedPath: string[]) {
  return requiredPath[selectedPath.length];
}

export function FlowControlPuzzle({
  isSolved,
  onSolve,
  previewMode,
}: FlowControlPuzzleProps) {
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [reroutedModule, setReroutedModule] = useState<string | null>(null);

  const complete = useMemo(
    () =>
      selectedPath.length === requiredPath.length &&
      requiredPath.every((moduleId, index) => selectedPath[index] === moduleId),
    [selectedPath],
  );

  useEffect(() => {
    if ((complete || previewMode) && !isSolved) {
      const timer = window.setTimeout(onSolve, 520);
      return () => window.clearTimeout(timer);
    }
  }, [complete, isSolved, onSolve, previewMode]);

  function chooseModule(moduleId: string) {
    if (complete || selectedPath.includes(moduleId)) {
      return;
    }

    if (moduleId !== getExpectedModule(selectedPath)) {
      setReroutedModule(moduleId);
      window.setTimeout(() => setReroutedModule(null), 320);
      return;
    }

    setSelectedPath((currentPath) => [...currentPath, moduleId]);
  }

  function reset() {
    setSelectedPath([]);
    setReroutedModule(null);
  }

  const activePath = previewMode ? requiredPath : selectedPath;
  const pathLive = complete || previewMode;

  return (
    <div className={`puzzle-shell flow ${pathLive ? "is-connected" : ""}`}>
      <div className="puzzle-heading">
        <span>Reporting Pipeline</span>
        <span>{pathLive ? "Dashboard live" : "Route daily records"}</span>
      </div>

      <div className="record-queue" aria-label="Daily usage record queue">
        <span>Daily usage records</span>
        <span>Validation gate</span>
        <span>Leadership dashboard</span>
      </div>

      <div className="pipeline-board" aria-label="Reporting pipeline modules">
        {pipelineModules.map((module) => {
          const activeIndex = activePath.indexOf(module.id);
          const isActive = activeIndex >= 0;
          const isExpected = module.id === getExpectedModule(selectedPath);
          return (
            <button
              aria-label={`Add ${module.label} to reporting pipeline`}
              className={`pipeline-module ${isActive ? "is-active" : ""} ${
                isExpected ? "is-expected" : ""
              } ${reroutedModule === module.id ? "is-rerouted" : ""}`}
              disabled={isActive || pathLive}
              key={module.id}
              onClick={() => chooseModule(module.id)}
              type="button"
            >
              <span>{isActive ? activeIndex + 1 : ""}</span>
              <strong>{module.label}</strong>
              <small>{module.detail}</small>
            </button>
          );
        })}
      </div>

      <div className="pipeline-output" aria-live="polite">
        <span>Records checked</span>
        <span>Refresh scheduled</span>
        <span>{pathLive ? "KPI dashboard ready" : "Waiting for route"}</span>
      </div>

      <div className="puzzle-actions">
        <button className="ghost-action compact" onClick={reset} type="button">
          Reset pipeline
        </button>
        <button className="ghost-action compact" onClick={onSolve} type="button">
          Skip / Reveal case study
        </button>
      </div>
    </div>
  );
}
