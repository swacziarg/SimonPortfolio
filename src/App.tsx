import { useState } from "react";
import { EarlierSignals } from "./components/EarlierSignals";
import { LogicGateGarden } from "./components/LogicGateGarden";
import { ProjectCard } from "./components/ProjectCard";
import { PuzzleModeToggle } from "./components/PuzzleModeToggle";
import { projects } from "./data/projects";

function App() {
  const [puzzleMode, setPuzzleMode] = useState(false);
  const [solvedProjects, setSolvedProjects] = useState<Set<string>>(
    () => new Set(),
  );

  function solveProject(projectId: string) {
    setSolvedProjects((currentSolvedProjects) => {
      const nextSolvedProjects = new Set(currentSolvedProjects);
      nextSolvedProjects.add(projectId);
      return nextSolvedProjects;
    });
  }

  return (
    <div className={`app-shell ${puzzleMode ? "puzzle-mode" : ""}`}>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="Simon Wacziarg home">
          SW
        </a>
        <nav aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#earlier-work">Earlier Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <PuzzleModeToggle enabled={puzzleMode} onToggle={setPuzzleMode} />
      </header>

      <main id="top">
        <section className="hero-panel" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">Portfolio</p>
            <h1 id="hero-title">Simon Wacziarg</h1>
            <p>
              CS + Philosophy at UW-Madison. I build product-minded data
              systems, apps, and analytics tools.
            </p>
          </div>
          <div className="hero-device" aria-hidden="true">
            <span className="device-grid" />
            <span className="device-tile tile-a" />
            <span className="device-tile tile-b" />
            <span className="device-tile tile-c" />
            <span className="device-route" />
          </div>
        </section>

        <section className="section-block" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Projects</p>
            <h2>{puzzleMode ? "Playable Systems" : "Selected Work"}</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard
                isSolved={solvedProjects.has(project.id)}
                key={project.id}
                onSolve={solveProject}
                project={project}
                puzzleMode={puzzleMode}
              />
            ))}
          </div>
        </section>

        <EarlierSignals />
        <LogicGateGarden puzzleMode={puzzleMode} />

        <section className="section-block contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Open Channels</h2>
          </div>
          <div className="contact-grid">
            <a href="https://github.com/swacziarg/">GitHub</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
