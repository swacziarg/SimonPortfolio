import { useMemo, useState } from "react";

type LogicGateGardenProps = {
  puzzleMode: boolean;
};

type ReasoningStep = {
  id: string;
  label: string;
  detail: string;
};

const reasoningSteps: ReasoningStep[] = [
  {
    id: "systems",
    label: "Systems",
    detail: "Model the moving pieces",
  },
  {
    id: "reasoning",
    label: "Reasoning",
    detail: "Separate signal from assumption",
  },
  {
    id: "product",
    label: "Product",
    detail: "Pick the useful intervention",
  },
  {
    id: "data",
    label: "Data",
    detail: "Check whether it worked",
  },
];

const requiredSteps = reasoningSteps.map((step) => step.id);

export function LogicGateGarden({ puzzleMode }: LogicGateGardenProps) {
  const [selectedSteps, setSelectedSteps] = useState<string[]>([
    "systems",
    "product",
  ]);

  const pathOpen = useMemo(
    () => requiredSteps.every((stepId) => selectedSteps.includes(stepId)),
    [selectedSteps],
  );
  const displayedSteps = puzzleMode ? selectedSteps : requiredSteps;
  const revealed = !puzzleMode || pathOpen;

  function toggleStep(stepId: string) {
    setSelectedSteps((currentSteps) =>
      currentSteps.includes(stepId)
        ? currentSteps.filter((currentStepId) => currentStepId !== stepId)
        : [...currentSteps, stepId],
    );
  }

  return (
    <section className="section-block about-section" id="about">
      <div className="section-heading">
        <p className="eyebrow">About</p>
        <h2>Systems, Reasoning, Product</h2>
      </div>
      <div className="about-grid">
        <div className="reasoning-panel">
          <div className="puzzle-heading">
            <span>Reasoning Path</span>
            <span>{revealed ? "Positioning clear" : "Complete the path"}</span>
          </div>

          <div className="reasoning-grid">
            {reasoningSteps.map((step) => {
              const isActive = displayedSteps.includes(step.id);
              return (
                <button
                  className={`reasoning-step ${isActive ? "is-active" : ""}`}
                  disabled={!puzzleMode}
                  key={step.id}
                  onClick={() => toggleStep(step.id)}
                  type="button"
                >
                  <span className="reasoning-light" aria-hidden="true" />
                  <strong>{step.label}</strong>
                  <small>{step.detail}</small>
                </button>
              );
            })}
          </div>

          <div className="reasoning-thread" aria-hidden="true">
            {reasoningSteps.map((step) => (
              <span
                className={displayedSteps.includes(step.id) ? "is-active" : ""}
                key={step.id}
              />
            ))}
          </div>
        </div>

        <div className={`about-copy ${revealed ? "is-revealed" : ""}`}>
          <p className="small-label">University of Wisconsin-Madison</p>
          <h3>B.S. in Computer Science & Philosophy</h3>
          <p>Expected December 2026</p>
          <div className="reveal-box">
            <p>
              Computer Science gives me systems. Philosophy gives me reasoning.
              Product and data work are where I combine both.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
