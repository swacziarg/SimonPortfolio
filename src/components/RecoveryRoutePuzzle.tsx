import { useState } from "react";

type RecoveryRoutePuzzleProps = {
  isSolved: boolean;
  onSolve: () => void;
  previewMode: boolean;
};

type Position = {
  row: number;
  col: number;
};

const grid = [
  [0, 2, -1, 0],
  [-1, 1, -2, 1],
  [2, 0, 1, -1],
  [-2, 2, 0, 0],
];

const start: Position = { row: 0, col: 0 };
const end: Position = { row: 3, col: 3 };
const initialMobility = 4;

function isSamePosition(first: Position, second: Position) {
  return first.row === second.row && first.col === second.col;
}

function isAdjacent(first: Position, second: Position) {
  return Math.abs(first.row - second.row) + Math.abs(first.col - second.col) === 1;
}

export function RecoveryRoutePuzzle({
  isSolved,
  onSolve,
  previewMode,
}: RecoveryRoutePuzzleProps) {
  const [position, setPosition] = useState(start);
  const [mobility, setMobility] = useState(initialMobility);
  const [blocked, setBlocked] = useState(false);
  const [path, setPath] = useState<Position[]>([start]);

  function reset() {
    setPosition(start);
    setMobility(initialMobility);
    setBlocked(false);
    setPath([start]);
  }

  function moveTo(nextPosition: Position) {
    if (!isAdjacent(position, nextPosition)) {
      return;
    }

    const nextMobility =
      mobility - 1 + grid[nextPosition.row][nextPosition.col];

    if (nextMobility < 0) {
      setBlocked(true);
      window.setTimeout(() => setBlocked(false), 280);
      return;
    }

    setPosition(nextPosition);
    setMobility(nextMobility);
    setPath((currentPath) => [...currentPath, nextPosition]);

    if (isSamePosition(nextPosition, end) && !isSolved) {
      onSolve();
    }
  }

  function handleBoardKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const deltas: Record<string, Position> = {
      ArrowUp: { row: -1, col: 0 },
      ArrowDown: { row: 1, col: 0 },
      ArrowLeft: { row: 0, col: -1 },
      ArrowRight: { row: 0, col: 1 },
    };
    const delta = deltas[event.key];

    if (!delta) {
      return;
    }

    event.preventDefault();
    const nextPosition = {
      row: position.row + delta.row,
      col: position.col + delta.col,
    };

    if (
      nextPosition.row >= 0 &&
      nextPosition.row < grid.length &&
      nextPosition.col >= 0 &&
      nextPosition.col < grid[0].length
    ) {
      moveTo(nextPosition);
    }
  }

  if (previewMode) {
    return (
      <div className="puzzle-shell decorative">
        <div className="puzzle-heading">
          <span>Recovery Route</span>
          <span>Open</span>
        </div>
        <div className="mini-maze" aria-hidden="true">
          {grid.flat().map((effect, index) => (
            <span key={`${effect}-${index}`}>{effect > 0 ? "+" : ""}{effect}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`puzzle-shell recovery ${blocked ? "is-blocked" : ""}`}>
      <div className="puzzle-heading">
        <span>Recovery Route</span>
        <span>{isSolved ? "Route open" : `Mobility ${mobility}`}</span>
      </div>
      <div className="route-instrument">
        <span className="route-chip">Start {initialMobility}</span>
        <span className="route-line" aria-hidden="true" />
        <span className="route-chip active">Mobility {mobility}</span>
        <span className="route-line" aria-hidden="true" />
        <span className="route-chip goal">Goal</span>
      </div>
      <div
        aria-label="Recovery route board"
        className="route-board"
        onKeyDown={handleBoardKeyDown}
        role="grid"
        tabIndex={0}
      >
        {grid.map((row, rowIndex) =>
          row.map((effect, colIndex) => {
            const tilePosition = { row: rowIndex, col: colIndex };
            const isPlayer = isSamePosition(position, tilePosition);
            const isEnd = isSamePosition(end, tilePosition);
            const isStart = isSamePosition(start, tilePosition);
            const isPath = path.some((pathPosition) =>
              isSamePosition(pathPosition, tilePosition),
            );
            const canMove = isAdjacent(position, tilePosition);
            return (
              <button
                aria-label={`Tile ${rowIndex + 1}, ${colIndex + 1}, effect ${effect}`}
                className={`route-tile ${isPlayer ? "has-player" : ""} ${
                  isEnd ? "is-end" : ""
                } ${isStart ? "is-start" : ""} ${isPath ? "is-path" : ""} ${
                  canMove ? "is-next" : ""
                } ${effect < 0 ? "is-drain" : effect > 0 ? "is-boost" : ""}`}
                disabled={!canMove}
                key={`${rowIndex}-${colIndex}`}
                onClick={() => moveTo(tilePosition)}
                role="gridcell"
                type="button"
              >
                <small>
                  {isPlayer ? "You" : isStart ? "Start" : isEnd ? "Goal" : ""}
                </small>
                <span>{effect > 0 ? `+${effect}` : effect}</span>
              </button>
            );
          }),
        )}
      </div>
      <div className="puzzle-actions">
        <button className="ghost-action compact" onClick={reset} type="button">
          Reset route
        </button>
        <button className="ghost-action compact" onClick={onSolve} type="button">
          Skip / Reveal case study
        </button>
      </div>
    </div>
  );
}
