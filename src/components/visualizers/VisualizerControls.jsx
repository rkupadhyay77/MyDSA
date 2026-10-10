/**
 * Reusable Visualizer Controls & Step Explanation Panel
 *
 * Provides Play/Pause, Previous Step, Next Step, Restart, Speed Selector,
 * Step Counter, and Plain-Language Explanation for all MyDSA visualisers.
 */

export default function VisualizerControls({
  currentStep,
  totalSteps,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onRestart,
  speed,
  onSpeedChange,
  stepTitle,
  stepExplanation,
  beginnerNote,
  showBeginnerNote,
}) {
  const progressPercent =
    totalSteps > 1 ? Math.round((currentStep / (totalSteps - 1)) * 100) : 100;

  return (
    <div className="viz-controls-wrapper">
      {/* Plain-language explanation of the current step */}
      <div className="viz-step-banner">
        <div className="viz-step-header">
          <span className="viz-step-badge">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <h4 className="viz-step-title">{stepTitle || 'Ready to step through'}</h4>
        </div>
        <p className="viz-step-text">{stepExplanation}</p>
        {showBeginnerNote && beginnerNote && (
          <div className="viz-beginner-callout">
            <strong>Beginner Intuition:</strong> {beginnerNote}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="viz-progress-track" aria-label="Animation progress">
        <div
          className="viz-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Playback Controls Row */}
      <div className="viz-toolbar">
        <div className="viz-btn-group">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onRestart}
            title="Restart from Step 1"
          >
            ↺ Restart
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onPrev}
            disabled={currentStep <= 0}
            title="Previous Step"
          >
            ◀ Prev
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm viz-play-btn"
            onClick={onPlayPause}
            title={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onNext}
            disabled={currentStep >= totalSteps - 1}
            title="Next Step"
          >
            Next ▶
          </button>
        </div>

        <div className="viz-speed-group">
          <span className="viz-speed-label">Speed:</span>
          {[0.5, 1, 1.5, 2].map((s) => (
            <button
              key={s}
              type="button"
              className={`viz-speed-chip ${speed === s ? 'active' : ''}`}
              onClick={() => onSpeedChange(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
