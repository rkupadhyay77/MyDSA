import { useState, useEffect, useMemo } from 'react';
import VisualizerControls from './VisualizerControls.jsx';
import { useApp } from '../../app/AppContext.jsx';

export default function ArrayVisualizer({ defaultMode = 'operations' }) {
  const { userState } = useApp();
  const [mode, setMode] = useState(defaultMode);
  const [customArrayText, setCustomArrayText] = useState('2, 4, 6, 9, 11, 15');
  const [targetSum, setTargetSum] = useState(15);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const parsedArray = useMemo(() => {
    const nums = customArrayText
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n));
    return nums.length >= 2 ? nums.slice(0, 8) : [2, 4, 6, 9, 11, 15];
  }, [customArrayText]);

  const steps = useMemo(() => {
    if (mode === 'operations') {
      // Visualise inserting value 99 at index 1 of [10, 20, 30, 40]
      return [
        {
          title: 'Initial Contiguous Array in RAM',
          explanation:
            'Our array [10, 20, 30, 40] occupies 4 contiguous 8-byte slots in RAM (0x1000 to 0x1018). Suppose we want to insert 99 at index [1].',
          beginnerNote:
            'Because Seat [1] is currently taken by 20, we cannot overwrite 20! Everyone from index 1 to 3 must shift one slot to the right first.',
          cells: [10, 20, 30, 40, null],
          activeIndices: [],
          shiftedIndices: [],
          pointers: { targetIdx: 1 },
        },
        {
          title: 'Shift Step 1: Move Index [3] (40) → Index [4]',
          explanation:
            'We start from the back so we do not overwrite values! Element 40 at index [3] moves right into index [4].',
          beginnerNote:
            'If we shifted from left to right first, moving 20 onto 30 would erase 30 forever!',
          cells: [10, 20, 30, 40, 40],
          activeIndices: [3, 4],
          shiftedIndices: [4],
          pointers: { moving: 3, dest: 4 },
        },
        {
          title: 'Shift Step 2: Move Index [2] (30) → Index [3]',
          explanation: 'Next, element 30 at index [2] shifts right into index [3].',
          beginnerNote: 'That is 2 shift operations so far.',
          cells: [10, 20, 30, 30, 40],
          activeIndices: [2, 3],
          shiftedIndices: [3, 4],
          pointers: { moving: 2, dest: 3 },
        },
        {
          title: 'Shift Step 3: Move Index [1] (20) → Index [2]',
          explanation:
            'Element 20 at index [1] shifts right into index [2]. Now index [1] is free for our new value!',
          beginnerNote:
            'Every element from index 1 to the end had to move. For n elements, this costs O(n) time.',
          cells: [10, 20, 20, 30, 40],
          activeIndices: [1, 2],
          shiftedIndices: [2, 3, 4],
          pointers: { moving: 1, dest: 2 },
        },
        {
          title: 'Final Step: Write 99 into Index [1]',
          explanation:
            'We place 99 into index [1]. Final array: [10, 99, 20, 30, 40]. Insertion in the middle of an array is O(n) due to shifting.',
          beginnerNote:
            'Compare this with appending at the very end (index [4]), which requires ZERO shifts and runs in O(1) time!',
          cells: [10, 99, 20, 30, 40],
          activeIndices: [1],
          shiftedIndices: [2, 3, 4],
          pointers: { inserted: 1 },
        },
      ];
    }

    if (mode === 'kadane') {
      const kadaneArr = [-2, 1, -3, 4, -1, 2, 1, -5];
      const trace = [];
      let curr = kadaneArr[0];
      let best = kadaneArr[0];

      trace.push({
        title: `Start at Index [0] (Value = ${kadaneArr[0]})`,
        explanation: `Initialise currentSum = ${curr} and maxSum = ${best}.`,
        beginnerNote: `Always start maxSum at nums[0], never 0, in case all numbers are negative!`,
        cells: kadaneArr,
        activeIndices: [0],
        shiftedIndices: [],
        pointers: { i: 0 },
        metrics: { currentSum: curr, maxSum: best },
      });

      for (let i = 1; i < kadaneArr.length; i++) {
        const val = kadaneArr[i];
        const restarted = curr < 0;
        curr = Math.max(val, curr + val);
        best = Math.max(best, curr);
        trace.push({
          title: `Index [${i}] (Value = ${val}): ${
            restarted ? 'Reset & Start Fresh!' : 'Extend Subarray'
          }`,
          explanation: restarted
            ? `Previous currentSum was negative, which would only drag ${val} down. So we start fresh: currentSum = ${val}. Best maxSum = ${best}.`
            : `Adding ${val} to previous running sum gives currentSum = ${curr}. All-time maxSum = ${best}.`,
          beginnerNote: `At every step, Kadane's just picks the larger of (nums[i]) vs (currentSum + nums[i]).`,
          cells: kadaneArr,
          activeIndices: [i],
          shiftedIndices: [],
          pointers: { i },
          metrics: { currentSum: curr, maxSum: best },
        });
      }
      return trace;
    }

    // Default Two Pointers mode on sorted array
    const sorted = [...parsedArray].sort((a, b) => a - b);
    const trace = [];
    let left = 0;
    let right = sorted.length - 1;

    trace.push({
      title: `Place Two Pointers at Opposite Ends (target = ${targetSum})`,
      explanation: `Sorted array: [${sorted.join(', ')}]. Set left = 0 (value ${sorted[left]}) and right = ${right} (value ${sorted[right]}).`,
      beginnerNote: `Because the array is sorted, moving left→ increases the sum, and moving ←right decreases the sum.`,
      cells: sorted,
      activeIndices: [left, right],
      shiftedIndices: [],
      pointers: { left, right },
    });

    while (left < right) {
      const sum = sorted[left] + sorted[right];
      if (sum === targetSum) {
        trace.push({
          title: `Match Found! nums[${left}] + nums[${right}] = ${sorted[left]} + ${sorted[right]} = ${targetSum}`,
          explanation: `The sum equals target (${targetSum})! We return indices [${left}, ${right}] in O(n) time and O(1) space.`,
          beginnerNote: `We found the pair without checking all n² combinations!`,
          cells: sorted,
          activeIndices: [left, right],
          shiftedIndices: [left, right],
          pointers: { left, right, matched: true },
        });
        break;
      } else if (sum < targetSum) {
        trace.push({
          title: `Sum Too Small: ${sorted[left]} + ${sorted[right]} = ${sum} < ${targetSum}`,
          explanation: `Since ${sum} < ${targetSum}, we need a larger number. We increment left from ${left} to ${left + 1}.`,
          beginnerNote: `Moving right leftward would only make the sum smaller, so moving left rightward is our only choice.`,
          cells: sorted,
          activeIndices: [left, right],
          shiftedIndices: [],
          pointers: { left, right },
        });
        left++;
      } else {
        trace.push({
          title: `Sum Too Large: ${sorted[left]} + ${sorted[right]} = ${sum} > ${targetSum}`,
          explanation: `Since ${sum} > ${targetSum}, we need a smaller number. We decrement right from ${right} to ${right - 1}.`,
          beginnerNote: `We eliminate index ${right} permanently in 1 comparison.`,
          cells: sorted,
          activeIndices: [left, right],
          shiftedIndices: [],
          pointers: { left, right },
        });
        right--;
      }
    }

    if (left >= right && !trace[trace.length - 1]?.pointers?.matched) {
      trace.push({
        title: `Pointers Crossed (left = ${left}, right = ${right}) — No Pair Sums to ${targetSum}`,
        explanation: `left and right met without finding a pair that sums to ${targetSum}. Search completes in O(n) steps.`,
        beginnerNote: `Even when no pair exists, we checked at most n steps instead of n².`,
        cells: sorted,
        activeIndices: [left],
        shiftedIndices: [],
        pointers: { left, right },
      });
    }

    return trace;
  }, [mode, parsedArray, targetSum]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [mode, customArrayText, targetSum]);

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

  const step = steps[currentStep] || steps[0];

  return (
    <div className="visualizer-card">
      <div className="visualizer-header">
        <div>
          <span className="badge badge-essential">Interactive Array Visualizer</span>
          <h3 className="visualizer-title">
            {mode === 'operations'
              ? 'Contiguous RAM & O(n) Insertion Shifting'
              : mode === 'kadane'
              ? "Kadane's Maximum Subarray Sum Trace"
              : 'Opposite-End Two Pointers Explorer'}
          </h3>
        </div>

        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-chip ${mode === 'operations' ? 'active' : ''}`}
            onClick={() => setMode('operations')}
          >
            Insert & RAM Shift (O(n))
          </button>
          <button
            type="button"
            className={`viz-chip ${mode === 'two-pointers' ? 'active' : ''}`}
            onClick={() => setMode('two-pointers')}
          >
            Two Pointers (O(n))
          </button>
          <button
            type="button"
            className={`viz-chip ${mode === 'kadane' ? 'active' : ''}`}
            onClick={() => setMode('kadane')}
          >
            Kadane’s Subarray
          </button>
        </div>
      </div>

      {/* Custom Input Bar for Two Pointers */}
      {mode === 'two-pointers' && (
        <div className="viz-custom-input-bar">
          <label className="viz-custom-field">
            <span>Array (comma-separated):</span>
            <input
              type="text"
              value={customArrayText}
              onChange={(e) => setCustomArrayText(e.target.value)}
              className="viz-text-input"
              placeholder="2, 4, 6, 9, 11, 15"
            />
          </label>
          <label className="viz-custom-field">
            <span>Target Sum:</span>
            <input
              type="number"
              value={targetSum}
              onChange={(e) => setTargetSum(Number(e.target.value) || 0)}
              className="viz-num-input"
            />
          </label>
        </div>
      )}

      {/* Visual Array Stage */}
      <div className="viz-stage">
        {step.metrics && (
          <div className="viz-metrics-row">
            <div className="viz-metric-pill">
              <span>Running currentSum:</span>
              <strong>{step.metrics.currentSum}</strong>
            </div>
            <div className="viz-metric-pill highlight">
              <span>Best maxSum So Far:</span>
              <strong>{step.metrics.maxSum}</strong>
            </div>
          </div>
        )}

        <div className="viz-cells-row">
          {step.cells.map((val, idx) => {
            const isActive = step.activeIndices?.includes(idx);
            const isShifted = step.shiftedIndices?.includes(idx);
            const isLeft = step.pointers?.left === idx;
            const isRight = step.pointers?.right === idx;
            const isIter = step.pointers?.i === idx;
            const ramAddress = `0x${(0x1000 + idx * 8).toString(16).toUpperCase()}`;

            return (
              <div key={idx} className="viz-array-column">
                {/* Pointer labels above cell */}
                <div className="viz-pointer-slot">
                  {isLeft && <span className="pointer-tag pointer-left">left ↓</span>}
                  {isRight && <span className="pointer-tag pointer-right">right ↓</span>}
                  {isIter && <span className="pointer-tag pointer-curr">i ↓</span>}
                  {step.pointers?.inserted === idx && (
                    <span className="pointer-tag pointer-match">inserted ↓</span>
                  )}
                </div>

                {/* Array Box */}
                <div
                  className={`viz-array-cell ${isActive ? 'active' : ''} ${
                    isShifted ? 'shifted' : ''
                  } ${val === null ? 'empty-slot' : ''}`}
                >
                  <span className="cell-val">{val === null ? '—' : val}</span>
                  <span className="cell-idx">index [{idx}]</span>
                </div>

                {/* Contiguous RAM Address below cell */}
                <span className="cell-ram">{ramAddress}</span>
              </div>
            );
          })}
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
