import { useEffect, useMemo, useState } from "react";

type ReturnLoopPuzzleProps = {
  isSolved: boolean;
  onSolve: () => void;
  previewMode: boolean;
};

const targetStages = ["Discover", "Shop", "Offer", "Return", "Repeat"];
const initialSlots = ["Discover", "Shop", "", "Return", ""];
const initialTray = ["Repeat", "Offer"];

export function ReturnLoopPuzzle({
  isSolved,
  onSolve,
  previewMode,
}: ReturnLoopPuzzleProps) {
  const [slots, setSlots] = useState(initialSlots);
  const [tray, setTray] = useState(initialTray);
  const [selectedTile, setSelectedTile] = useState<string | null>(null);

  const complete = useMemo(
    () => slots.every((stage, index) => stage === targetStages[index]),
    [slots],
  );

  useEffect(() => {
    if (complete && !isSolved) {
      const timer = window.setTimeout(onSolve, 720);
      return () => window.clearTimeout(timer);
    }
  }, [complete, isSolved, onSolve]);

  function selectTrayTile(tile: string) {
    setSelectedTile(tile);
  }

  function placeTile(index: number) {
    const currentStage = slots[index];
    const isFixedStage = Boolean(initialSlots[index]);

    if (currentStage && !isFixedStage) {
      setSlots((currentSlots) =>
        currentSlots.map((stage, stageIndex) =>
          stageIndex === index ? "" : stage,
        ),
      );
      setTray((currentTray) => [...currentTray, currentStage]);
      return;
    }

    if (!selectedTile || currentStage) {
      return;
    }

    setSlots((currentSlots) =>
      currentSlots.map((stage, stageIndex) =>
        stageIndex === index ? selectedTile : stage,
      ),
    );
    setTray((currentTray) => currentTray.filter((tile) => tile !== selectedTile));
    setSelectedTile(null);
  }

  if (previewMode) {
    return (
      <div className="puzzle-shell decorative">
        <div className="puzzle-heading">
          <span>Return Loop</span>
          <span>Complete</span>
        </div>
        <div className="loop-orbit compact-loop" aria-hidden="true">
          {targetStages.map((stage) => (
            <span key={stage}>{stage}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`puzzle-shell loop ${complete ? "is-complete" : ""}`}>
      <div className="puzzle-heading">
        <span>Grocery Return Loop</span>
        <span>{complete ? "Customer returning" : "Aisle path ready"}</span>
      </div>
      <div className="store-context">
        <span>Storefront</span>
        <span>Cart</span>
        <span>Offer shelf</span>
        <span>Checkout</span>
        <span>Next trip</span>
      </div>
      <div className="loop-direction" aria-hidden="true">
        Discover -&gt; Shop -&gt; Offer -&gt; Return -&gt; Repeat
      </div>
      <div className="loop-orbit" aria-label="Customer return loop">
        {slots.map((stage, index) => (
          <button
            aria-label={stage ? `${stage} stage` : `Empty loop slot ${index + 1}`}
            className={`loop-slot slot-${index} ${stage ? "is-filled" : ""}`}
            disabled={Boolean(stage && initialSlots[index])}
            key={`${stage || "empty"}-${index}`}
            onClick={() => placeTile(index)}
            type="button"
          >
            {stage || "Place"}
          </button>
        ))}
        <span className="loop-token" aria-hidden="true" />
      </div>
      <div className="tray-row" aria-label="Loop tiles">
        <span className="tray-label">Missing shelf signs</span>
        {tray.map((tile) => (
          <button
            className={`tray-tile ${selectedTile === tile ? "is-selected" : ""}`}
            key={tile}
            onClick={() => selectTrayTile(tile)}
            type="button"
          >
            {tile}
          </button>
        ))}
      </div>
      <button className="ghost-action compact" onClick={onSolve} type="button">
        Skip / Reveal case study
      </button>
    </div>
  );
}
