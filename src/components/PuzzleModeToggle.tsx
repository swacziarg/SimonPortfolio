type PuzzleModeToggleProps = {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
};

export function PuzzleModeToggle({
  enabled,
  onToggle,
}: PuzzleModeToggleProps) {
  return (
    <label className="mode-toggle">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(event) => onToggle(event.target.checked)}
      />
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
      <span>Puzzle Mode</span>
    </label>
  );
}
