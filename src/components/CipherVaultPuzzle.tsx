import { useEffect, useMemo, useState } from "react";

type CipherVaultPuzzleProps = {
  isSolved: boolean;
  onSolve: () => void;
  previewMode: boolean;
};

const target = "SYNC";
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function letterDistance(guess: string[]) {
  return guess.reduce((distance, letter, index) => {
    return (
      distance +
      Math.abs(alphabet.indexOf(letter) - alphabet.indexOf(target[index]))
    );
  }, 0);
}

function cycleLetter(letter: string, direction: 1 | -1) {
  const index = alphabet.indexOf(letter);
  return alphabet[(index + direction + alphabet.length) % alphabet.length];
}

export function CipherVaultPuzzle({
  isSolved,
  onSolve,
  previewMode,
}: CipherVaultPuzzleProps) {
  const [guess, setGuess] = useState(["A", "A", "A", "A"]);
  const distance = useMemo(() => letterDistance(guess), [guess]);
  const stability = Math.max(0, 1 - distance / 62);

  useEffect(() => {
    if (distance === 0 && !isSolved) {
      onSolve();
    }
  }, [distance, isSolved, onSolve]);

  function updateLetter(index: number, direction: 1 | -1) {
    setGuess((currentGuess) =>
      currentGuess.map((letter, letterIndex) =>
        letterIndex === index ? cycleLetter(letter, direction) : letter,
      ),
    );
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      updateLetter(index, 1);
    }

    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      updateLetter(index, -1);
    }
  }

  if (previewMode) {
    return (
      <div className="puzzle-shell decorative">
        <div className="puzzle-heading">
          <span>Cipher Vault</span>
          <span>Unlocked</span>
        </div>
        <div className="decorative-bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`puzzle-shell cipher ${isSolved ? "is-solved" : ""}`}
      style={{ "--stability": stability } as React.CSSProperties}
    >
      <div className="puzzle-heading">
        <span>Cipher Vault</span>
        <span>Distance {distance}</span>
      </div>
      <div className="cipher-grid" aria-label="Four letter cipher">
        {guess.map((letter, index) => (
          <div className="cipher-column" key={`${letter}-${index}`}>
            <button
              aria-label={`Increase letter ${index + 1}`}
              className="mini-button"
              onClick={() => updateLetter(index, 1)}
              type="button"
            >
              +
            </button>
            <button
              aria-label={`Cipher letter ${index + 1}: ${letter}`}
              className="cipher-tile"
              onKeyDown={(event) => handleKeyDown(event, index)}
              type="button"
            >
              {letter}
            </button>
            <button
              aria-label={`Decrease letter ${index + 1}`}
              className="mini-button"
              onClick={() => updateLetter(index, -1)}
              type="button"
            >
              -
            </button>
          </div>
        ))}
      </div>
      <div className="signal-meter" aria-hidden="true">
        <span />
      </div>
      <button className="ghost-action compact" onClick={onSolve} type="button">
        Skip / Reveal case study
      </button>
    </div>
  );
}
