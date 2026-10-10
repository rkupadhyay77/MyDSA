import { useState, useEffect, useMemo } from 'react';
import VisualizerControls from './VisualizerControls.jsx';
import { useApp } from '../../app/AppContext.jsx';

export default function BigOVisualizer({ defaultN = 8 }) {
  const { userState } = useApp();
  const [n, setN] = useState(defaultN);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const steps = useMemo(() => {
    const logN = Math.max(1, Math.ceil(Math.log2(n)));
    const nLogN = n * logN;
    const nSquared = n * n;

    const generated = [
      {
        title: `Input Size Set to n = ${n}`,
        explanation: `We have an input of ${n} items. Let's step through how many operations different algorithms perform on these ${n} items.`,
        beginnerNote: `Watch how the operation counter changes as we move from O(1) to O(n²).`,
        activeClass: 'init',
        activeCount: 0,
        counts: { o1: 0, oLogN: 0, oN: 0, oNLogN: 0, oN2: 0 },
        highlightCells: [],
      },
      {
        title: `1. O(1) Constant Time — 1 Operation`,
        explanation: `An O(1) algorithm (like reading array[0] or computing n * (n + 1) / 2) jumps straight to the answer in 1 step, even if n = ${n}.`,
        beginnerNote: `Even if you increased n to 1,000,000, this bar would still stay at 1 step!`,
        activeClass: 'O(1)',
        activeCount: 1,
        counts: { o1: 1, oLogN: 0, oN: 0, oNLogN: 0, oN2: 0 },
        highlightCells: [0],
      },
      {
        title: `2. O(log n) Logarithmic Time — ${logN} Operations`,
        explanation: `An O(log n) algorithm (like Binary Search) cuts the problem of size ${n} in half each step (${n} → ${Math.floor(n / 2)} → ... → 1), finishing in just ${logN} steps!`,
        beginnerNote: `Every time n doubles, O(log n) only adds 1 single extra step.`,
        activeClass: 'O(log n)',
        activeCount: logN,
        counts: { o1: 1, oLogN: logN, oN: 0, oNLogN: 0, oN2: 0 },
        highlightCells: Array.from({ length: logN }, (_, i) => i),
      },
      {
        title: `3. O(n) Linear Time — ${n} Operations`,
        explanation: `An O(n) single loop touches each of the ${n} items once. Total operations = ${n}.`,
        beginnerNote: `Fair scaling: 1 step per item in the input.`,
        activeClass: 'O(n)',
        activeCount: n,
        counts: { o1: 1, oLogN: logN, oN: n, oNLogN: 0, oN2: 0 },
        highlightCells: Array.from({ length: n }, (_, i) => i),
      },
      {
        title: `4. O(n log n) Fast Sorting Time — ${nLogN} Operations`,
        explanation: `Algorithms like Merge Sort split ${n} items ${logN} times and merge them, performing ${n} × ${logN} = ${nLogN} operations.`,
        beginnerNote: `This is the speed of built-in sorting (.sorted()). Much faster than O(n²) for large inputs!`,
        activeClass: 'O(n log n)',
        activeCount: nLogN,
        counts: { o1: 1, oLogN: logN, oN: n, oNLogN: nLogN, oN2: 0 },
        highlightCells: Array.from({ length: n }, (_, i) => i),
      },
      {
        title: `5. O(n²) Quadratic Nested Loop — ${nSquared} Operations!`,
        explanation: `A loop inside a loop compares every item with every item: ${n} × ${n} = ${nSquared} operations! Notice how much taller the O(n²) bar is compared to O(n).`,
        beginnerNote: `When n = 10,000, O(n) takes 10,000 steps, while O(n²) explodes to 100,000,000 steps!`,
        activeClass: 'O(n²)',
        activeCount: nSquared,
        counts: { o1: 1, oLogN: logN, oN: n, oNLogN: nLogN, oN2: nSquared },
        highlightCells: Array.from({ length: n }, (_, i) => i),
      },
    ];
    return generated;
  }, [n]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const intervalMs = Math.round(1400 / speed);
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPlaying, speed, steps.length]);

  const handleChangeN = (newN) => {
    setIsPlaying(false);
    setN(newN);
    setCurrentStep(5); // Jump to full comparison when changing N so user sees immediate effect
  };

  const step = steps[currentStep] || steps[0];
  const maxOps = n * n;

  const bars = [
    { key: 'o1', label: 'O(1) Constant', value: step.counts.o1, color: '#10b981', targetVal: 1 },
    {
      key: 'oLogN',
      label: 'O(log n) Logarithmic',
      value: step.counts.oLogN,
      color: '#06b6d4',
      targetVal: Math.max(1, Math.ceil(Math.log2(n))),
    },
    { key: 'oN', label: 'O(n) Linear', value: step.counts.oN, color: '#3b82f6', targetVal: n },
    {
      key: 'oNLogN',
      label: 'O(n log n) Sorting',
      value: step.counts.oNLogN,
      color: '#f59e0b',
      targetVal: n * Math.max(1, Math.ceil(Math.log2(n))),
    },
    {
      key: 'oN2',
      label: 'O(n²) Nested Loop',
      value: step.counts.oN2,
      color: '#ef4444',
      targetVal: n * n,
    },
  ];

  return (
    <div className="visualizer-card">
      <div className="visualizer-header">
        <div>
          <span className="badge badge-essential">Interactive Visualizer</span>
          <h3 className="visualizer-title">Big O Operation Counter & Scaling Explorer</h3>
        </div>
        <div className="viz-input-controls">
          <span className="viz-input-label">Customise Input Size (n):</span>
          {[4, 8, 12, 16, 24].map((val) => (
            <button
              key={val}
              type="button"
              className={`viz-chip ${n === val ? 'active' : ''}`}
              onClick={() => handleChangeN(val)}
            >
              n = {val}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Comparison Stage */}
      <div className="viz-stage big-o-stage">
        <div className="big-o-bars-container">
          {bars.map((bar) => {
            const widthPercent =
              bar.value > 0 ? Math.max(4, Math.round((bar.value / maxOps) * 100)) : 0;
            return (
              <div key={bar.key} className="big-o-bar-row">
                <div className="big-o-bar-meta">
                  <span className="big-o-bar-name">{bar.label}</span>
                  <span className="big-o-bar-count">
                    {bar.value > 0 ? `${bar.value} ops` : `— (target: ${bar.targetVal} ops)`}
                  </span>
                </div>
                <div className="big-o-bar-track">
                  <div
                    className="big-o-bar-fill"
                    style={{
                      width: `${widthPercent}%`,
                      backgroundColor: bar.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Input items strip */}
        <div className="big-o-items-strip">
          <div className="viz-caption">
            Input Elements (n = {n}) — Active Complexity Class:{' '}
            <strong>{step.activeClass}</strong>
          </div>
          <div className="viz-cells-row">
            {Array.from({ length: n }, (_, idx) => {
              const isHighlighted = step.highlightCells.includes(idx);
              return (
                <div
                  key={idx}
                  className={`viz-array-cell viz-cell-sm ${isHighlighted ? 'highlighted' : ''}`}
                >
                  <span className="cell-val">{idx + 1}</span>
                  <span className="cell-idx">[{idx}]</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <VisualizerControls
        currentStep={currentStep}
        totalSteps={steps.length}
        isPlaying={isPlaying}
        onPlayPause={() => {
          if (currentStep >= steps.length - 1) {
            setCurrentStep(0);
            setIsPlaying(true);
          } else {
            setIsPlaying((p) => !p);
          }
        }}
        onNext={() => {
          setIsPlaying(false);
          setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
        }}
        onPrev={() => {
          setIsPlaying(false);
          setCurrentStep((s) => Math.max(0, s - 1));
        }}
        onRestart={() => {
          setIsPlaying(false);
          setCurrentStep(0);
        }}
        speed={speed}
        onSpeedChange={setSpeed}
        stepTitle={step.title}
        stepExplanation={step.explanation}
        beginnerNote={step.beginnerNote}
        showBeginnerNote={userState.beginnerMode}
      />
    </div>
  );
}
