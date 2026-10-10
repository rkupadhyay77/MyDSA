import { useState, useEffect, useMemo } from 'react';
import VisualizerControls from './VisualizerControls.jsx';
import { useApp } from '../../app/AppContext.jsx';

export default function LinkedListVisualizer({ defaultMode = 'operations' }) {
  const { userState } = useApp();
  const [mode, setMode] = useState(defaultMode);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const steps = useMemo(() => {
    if (mode === 'operations') {
      return [
        {
          title: 'Initial Singly Linked List: 10 → 20 → 30 → nil',
          explanation:
            'Each node holds a value and a .next pointer to the following node. Notice their scattered RAM addresses (0xA10, 0xF40, 0xB80) — they do NOT sit side-by-side!',
          beginnerNote:
            'To insert 25 after 20, we do not move any existing nodes in RAM. We only rewire two pointers!',
          nodes: [
            { id: 'n1', val: 10, addr: '0xA10', nextLabel: '→ 20', roles: ['head'] },
            { id: 'n2', val: 20, addr: '0xF40', nextLabel: '→ 30', roles: [] },
            { id: 'n3', val: 30, addr: '0xB80', nextLabel: '→ nil', roles: ['tail'] },
          ],
          arrowDirs: ['→', '→', '→ nil'],
        },
        {
          title: 'Step 1: Walk curr Pointer to Predecessor Node (20)',
          explanation:
            'We start curr at head (10) and step once (curr = curr.next) so curr stands on node 20.',
          beginnerNote:
            'We keep head safely on 10 and use curr to walk to the insertion spot.',
          nodes: [
            { id: 'n1', val: 10, addr: '0xA10', nextLabel: '→ 20', roles: ['head'] },
            { id: 'n2', val: 20, addr: '0xF40', nextLabel: '→ 30', roles: ['curr'] },
            { id: 'n3', val: 30, addr: '0xB80', nextLabel: '→ nil', roles: ['tail'] },
          ],
          arrowDirs: ['→', '→', '→ nil'],
        },
        {
          title: 'Step 2: Allocate New Node (25) & Wire newNode.next = curr.next (30)',
          explanation:
            'Create newNode(25) at address 0xD90. FIRST, set newNode.next = curr.next so 25 points forward to 30!',
          beginnerNote:
            'Golden Rule: Always connect the new node’s outgoing arrow BEFORE changing curr.next, or you will lose node 30!',
          nodes: [
            { id: 'n1', val: 10, addr: '0xA10', nextLabel: '→ 20', roles: ['head'] },
            { id: 'n2', val: 20, addr: '0xF40', nextLabel: '→ 30 (old)', roles: ['curr'] },
            {
              id: 'nNew',
              val: 25,
              addr: '0xD90',
              nextLabel: '→ 30',
              roles: ['newNode'],
              highlight: true,
            },
            { id: 'n3', val: 30, addr: '0xB80', nextLabel: '→ nil', roles: ['tail'] },
          ],
          arrowDirs: ['→', '⋯', '→', '→ nil'],
        },
        {
          title: 'Step 3: Wire curr.next = newNode (20 → 25)',
          explanation:
            'Now set curr.next = newNode. The chain is smoothly rewired to 10 → 20 → 25 → 30 → nil in O(1) pointer operations!',
          beginnerNote:
            'Notice that node 30 stayed at address 0xB80 the entire time — zero element shifting!',
          nodes: [
            { id: 'n1', val: 10, addr: '0xA10', nextLabel: '→ 20', roles: ['head'] },
            { id: 'n2', val: 20, addr: '0xF40', nextLabel: '→ 25', roles: ['curr'] },
            {
              id: 'nNew',
              val: 25,
              addr: '0xD90',
              nextLabel: '→ 30',
              roles: ['inserted'],
              highlight: true,
            },
            { id: 'n3', val: 30, addr: '0xB80', nextLabel: '→ nil', roles: ['tail'] },
          ],
          arrowDirs: ['→', '→', '→', '→ nil'],
        },
      ];
    }

    if (mode === 'fast-slow') {
      return [
        {
          title: 'Start Fast & Slow Pointers at Head (Node 1)',
          explanation:
            'Both slow (Tortoise, +1 step) and fast (Hare, +2 steps) start at head (Node 1) of [1 → 2 → 3 → 4 → 5].',
          beginnerNote:
            'Because fast moves at 2x speed, when fast reaches the end, slow will be at the exact middle!',
          nodes: [
            { id: '1', val: 1, addr: '0x10', nextLabel: '→ 2', roles: ['slow', 'fast'] },
            { id: '2', val: 2, addr: '0x20', nextLabel: '→ 3', roles: [] },
            { id: '3', val: 3, addr: '0x30', nextLabel: '→ 4', roles: [] },
            { id: '4', val: 4, addr: '0x40', nextLabel: '→ 5', roles: [] },
            { id: '5', val: 5, addr: '0x50', nextLabel: '→ nil', roles: [] },
          ],
          arrowDirs: ['→', '→', '→', '→', '→ nil'],
        },
        {
          title: 'Iteration 1: slow moves to 2 (+1), fast jumps to 3 (+2)',
          explanation:
            'Since fast != nil and fast.next != nil, slow steps 1 → 2, and fast jumps 1 → 3.',
          beginnerNote: 'After 1 iteration: slow is at index 1, fast is at index 2.',
          nodes: [
            { id: '1', val: 1, addr: '0x10', nextLabel: '→ 2', roles: [] },
            { id: '2', val: 2, addr: '0x20', nextLabel: '→ 3', roles: ['slow'] },
            { id: '3', val: 3, addr: '0x30', nextLabel: '→ 4', roles: ['fast'] },
            { id: '4', val: 4, addr: '0x40', nextLabel: '→ 5', roles: [] },
            { id: '5', val: 5, addr: '0x50', nextLabel: '→ nil', roles: [] },
          ],
          arrowDirs: ['→', '→', '→', '→', '→ nil'],
        },
        {
          title: 'Iteration 2: slow moves to 3 (+1), fast jumps to 5 (+2)',
          explanation:
            'slow steps 2 → 3, and fast jumps 3 → 5. Now fast.next is nil, so the while loop terminates! Return slow (Node 3).',
          beginnerNote:
            'We found the middle node (3) in a single pass with O(1) memory — no need to count the list length first!',
          nodes: [
            { id: '1', val: 1, addr: '0x10', nextLabel: '→ 2', roles: [] },
            { id: '2', val: 2, addr: '0x20', nextLabel: '→ 3', roles: [] },
            {
              id: '3',
              val: 3,
              addr: '0x30',
              nextLabel: '→ 4',
              roles: ['slow (MIDDLE)'],
              highlight: true,
            },
            { id: '4', val: 4, addr: '0x40', nextLabel: '→ 5', roles: [] },
            { id: '5', val: 5, addr: '0x50', nextLabel: '→ nil', roles: ['fast (tail)'] },
          ],
          arrowDirs: ['→', '→', '→', '→', '→ nil'],
        },
      ];
    }

    // Default: In-Place Reversal mode
    return [
      {
        title: 'Initial State: prev = nil, curr = 10',
        explanation:
          'We want to reverse 10 → 20 → 30 → nil in-place. Start with prev = nil and curr = head (10).',
        beginnerNote:
          'Watch how each arrow flips from pointing right (→) to pointing left (←) one node at a time.',
        nodes: [
          { id: 'n1', val: 10, addr: '0xA10', nextLabel: '→ 20', roles: ['curr'] },
          { id: 'n2', val: 20, addr: '0xF40', nextLabel: '→ 30', roles: ['nextTemp'] },
          { id: 'n3', val: 30, addr: '0xB80', nextLabel: '→ nil', roles: [] },
        ],
        arrowDirs: ['→', '→', '→ nil'],
        prevStatus: 'prev = nil',
      },
      {
        title: 'Flip Node 10: 10.next = prev (nil), Advance prev=10, curr=20',
        explanation:
          '1) Save nextTemp = 20. 2) Flip 10.next = nil. 3) Move prev = 10. 4) Move curr = 20.',
        beginnerNote: 'Node 10 is now the new tail pointing to nil!',
        nodes: [
          {
            id: 'n1',
            val: 10,
            addr: '0xA10',
            nextLabel: '← nil',
            roles: ['prev'],
            highlight: true,
          },
          { id: 'n2', val: 20, addr: '0xF40', nextLabel: '→ 30', roles: ['curr'] },
          { id: 'n3', val: 30, addr: '0xB80', nextLabel: '→ nil', roles: ['nextTemp'] },
        ],
        arrowDirs: ['←', '→', '→ nil'],
        prevStatus: 'prev = Node(10)',
      },
      {
        title: 'Flip Node 20: 20.next = prev (10), Advance prev=20, curr=30',
        explanation:
          '1) Save nextTemp = 30. 2) Flip 20.next = 10. 3) Move prev = 20. 4) Move curr = 30.',
        beginnerNote: 'Now 20 points backward to 10 (20 → 10 → nil).',
        nodes: [
          {
            id: 'n1',
            val: 10,
            addr: '0xA10',
            nextLabel: '← nil',
            roles: [],
            highlight: true,
          },
          {
            id: 'n2',
            val: 20,
            addr: '0xF40',
            nextLabel: '← 10',
            roles: ['prev'],
            highlight: true,
          },
          { id: 'n3', val: 30, addr: '0xB80', nextLabel: '→ nil', roles: ['curr'] },
        ],
        arrowDirs: ['←', '←', '→ nil'],
        prevStatus: 'prev = Node(20)',
      },
      {
        title: 'Flip Node 30: 30.next = prev (20), curr becomes nil — Done!',
        explanation:
          '1) Save nextTemp = nil. 2) Flip 30.next = 20. 3) Move prev = 30. 4) Move curr = nil. Loop stops and we return prev (Node 30)!',
        beginnerNote:
          'When curr becomes nil, prev is standing on the new head (30 → 20 → 10 → nil).',
        nodes: [
          {
            id: 'n1',
            val: 10,
            addr: '0xA10',
            nextLabel: '← nil',
            roles: ['new tail'],
            highlight: true,
          },
          {
            id: 'n2',
            val: 20,
            addr: '0xF40',
            nextLabel: '← 10',
            roles: [],
            highlight: true,
          },
          {
            id: 'n3',
            val: 30,
            addr: '0xB80',
            nextLabel: '← 20',
            roles: ['prev (NEW HEAD)'],
            highlight: true,
          },
        ],
        arrowDirs: ['←', '←', '← HEAD'],
        prevStatus: 'curr = nil | return prev (30)',
      },
    ];
  }, [mode]);

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [mode]);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const intervalMs = Math.round(1500 / speed);
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
          <span className="badge badge-essential">Interactive Linked List Visualizer</span>
          <h3 className="visualizer-title">
            {mode === 'operations'
              ? 'Pointer Rewiring: O(1) Node Insertion'
              : mode === 'fast-slow'
              ? 'Fast & Slow Pointers (Tortoise and Hare)'
              : '3-Pointer In-Place Linked List Reversal'}
          </h3>
        </div>

        <div className="viz-mode-tabs">
          <button
            type="button"
            className={`viz-chip ${mode === 'operations' ? 'active' : ''}`}
            onClick={() => setMode('operations')}
          >
            Insert Node Rewiring
          </button>
          <button
            type="button"
            className={`viz-chip ${mode === 'reverse' ? 'active' : ''}`}
            onClick={() => setMode('reverse')}
          >
            In-Place Reversal
          </button>
          <button
            type="button"
            className={`viz-chip ${mode === 'fast-slow' ? 'active' : ''}`}
            onClick={() => setMode('fast-slow')}
          >
            Fast & Slow Pointers
          </button>
        </div>
      </div>

      {/* Linked List Stage */}
      <div className="viz-stage">
        {step.prevStatus && (
          <div className="viz-metrics-row">
            <div className="viz-metric-pill highlight">
              <span>Pointer State:</span>
              <strong>{step.prevStatus}</strong>
            </div>
          </div>
        )}

        <div className="viz-ll-chain">
          {step.nodes.map((node, idx) => (
            <div key={node.id} className="viz-ll-item">
              <div className="viz-ll-node-wrapper">
                {/* Pointer Badges Above Node */}
                <div className="viz-pointer-slot">
                  {node.roles.map((r) => (
                    <span
                      key={r}
                      className={`pointer-tag ${
                        r.includes('prev') || r.includes('HEAD')
                          ? 'pointer-match'
                          : r.includes('fast')
                          ? 'pointer-right'
                          : 'pointer-curr'
                      }`}
                    >
                      {r} ↓
                    </span>
                  ))}
                </div>

                {/* Two-compartment Node Card (val | next) */}
                <div className={`viz-ll-node ${node.highlight ? 'highlighted' : ''}`}>
                  <div className="ll-node-val">
                    <span className="ll-field-label">val</span>
                    <strong>{node.val}</strong>
                  </div>
                  <div className="ll-node-next">
                    <span className="ll-field-label">next</span>
                    <code>{node.nextLabel}</code>
                  </div>
                </div>

                <span className="cell-ram">RAM {node.addr}</span>
              </div>

              {/* Arrow between nodes */}
              <div className="viz-ll-arrow">
                <span>{step.arrowDirs[idx] || '→'}</span>
              </div>
            </div>
          ))}
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
