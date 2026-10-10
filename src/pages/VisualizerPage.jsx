import { useState } from 'react';
import { Link } from '../app/router.jsx';
import BigOVisualizer from '../components/visualizers/BigOVisualizer.jsx';
import ArrayVisualizer from '../components/visualizers/ArrayVisualizer.jsx';
import LinkedListVisualizer from '../components/visualizers/LinkedListVisualizer.jsx';

export default function VisualizerPage() {
  const [activeTab, setActiveTab] = useState('big-o');

  const tabs = [
    {
      id: 'big-o',
      title: '1. Big O Complexity & Scaling',
      subtitle: 'Compare O(1), O(log n), O(n), O(n log n), and O(n²) step counts',
      lessonLink: '/lessons/big-o-intuition',
    },
    {
      id: 'array-ops',
      title: '2. Array Memory, Insertions & Two Pointers',
      subtitle: 'Visualise contiguous RAM addresses, O(n) right-shifts, Two Pointers, and Kadane',
      lessonLink: '/lessons/arrays-memory-and-operations',
    },
    {
      id: 'linked-list',
      title: '3. Singly Linked Lists & Fast/Slow Pointers',
      subtitle: 'Step through O(1) pointer rewiring, 3-pointer list reversal, and Tortoise & Hare',
      lessonLink: '/lessons/linked-lists-nodes-and-pointers',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="page-container">
      <div className="page-header-block">
        <div>
          <span className="eyebrow-label">Interactive Visual Learning</span>
          <h1>Algorithm Visualizer Studio</h1>
          <p>
            Pause, step forward, step backward, adjust playback speed, and customise inputs to
            build rock-solid visual intuition before writing code.
          </p>
        </div>
        <Link to={currentTab.lessonLink} className="btn btn-secondary btn-sm">
          Open Matching Lesson →
        </Link>
      </div>

      {/* Studio Switcher Tabs */}
      <div className="studio-tabs-grid">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`studio-tab-card ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <h4>{tab.title}</h4>
            <p>{tab.subtitle}</p>
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        {activeTab === 'big-o' && <BigOVisualizer defaultN={12} />}
        {activeTab === 'array-ops' && <ArrayVisualizer defaultMode="two-pointers" />}
        {activeTab === 'linked-list' && <LinkedListVisualizer defaultMode="reverse" />}
      </div>
    </div>
  );
}
