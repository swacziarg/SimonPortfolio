import type { Project } from "../data/projects";
import { CipherVaultPuzzle } from "./CipherVaultPuzzle";
import { FlowControlPuzzle } from "./FlowControlPuzzle";
import { RecoveryRoutePuzzle } from "./RecoveryRoutePuzzle";
import { ReturnLoopPuzzle } from "./ReturnLoopPuzzle";

type ProjectCardProps = {
  project: Project;
  isSolved: boolean;
  puzzleMode: boolean;
  onSolve: (projectId: string) => void;
};

export function ProjectCard({
  project,
  isSolved,
  puzzleMode,
  onSolve,
}: ProjectCardProps) {
  const revealed = !puzzleMode || isSolved;
  const hasLinks = project.links.length > 0;

  function renderPuzzle() {
    const puzzleProps = {
      isSolved,
      onSolve: () => onSolve(project.id),
      previewMode: false,
    };

    switch (project.puzzleType) {
      case "cipher":
        return <CipherVaultPuzzle {...puzzleProps} />;
      case "recovery":
        return <RecoveryRoutePuzzle {...puzzleProps} />;
      case "flow":
        return <FlowControlPuzzle {...puzzleProps} />;
      case "loop":
        return <ReturnLoopPuzzle {...puzzleProps} />;
    }
  }

  return (
    <article
      className={`project-card ${revealed ? "is-revealed" : ""} ${
        puzzleMode ? "has-puzzle" : ""
      }`}
    >
      <div className="project-main">
        <div>
          <p className="small-label">{project.type}</p>
          <h3>{project.title}</h3>
          <p className="role-line">{project.role}</p>
        </div>
        <div className="stack-list">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <p className="project-summary">{project.summary}</p>
      </div>

      {puzzleMode ? <div className="project-puzzle">{renderPuzzle()}</div> : null}

      <div className="case-study" aria-live="polite">
        {revealed ? (
          <>
            <p>{project.revealCopy}</p>
            {hasLinks ? (
              <div className="project-links">
                {project.links.map((link) => (
                  <a href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="case-study-locked">
            <span>Case study locked</span>
          </div>
        )}
      </div>
    </article>
  );
}
