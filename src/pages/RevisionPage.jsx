import { useState, useEffect } from 'react';
import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import { ALL_LESSONS } from '../curriculum/lessons/index.js';
import { ALL_PROBLEMS } from '../curriculum/problems/index.js';

export default function RevisionPage() {
  const { userState } = useApp();
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Timed Mock Interview Round state
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(30 * 60); // 30-minute mock round

  useEffect(() => {
    if (!timerRunning) return undefined;
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  const flashcards = [
    {
      topic: 'Big O & Complexity',
      question: 'When should you suspect an O(n²) algorithm will Time Out (TLE) in a coding interview?',
      answer:
        'When the constraint says n ≤ 10^5 (100,000). Since (10^5)² = 10^10 operations, it exceeds the ~10^8 operations/second limit. Aim for O(n) or O(n log n).',
    },
    {
      topic: 'Arrays & Memory',
      question: 'Why does inserting or deleting at index 0 of an Array take O(n) time?',
      answer:
        'Because Arrays occupy contiguous RAM slots with no gaps allowed. Inserting or deleting at index 0 forces all remaining n - 1 elements to shift one position.',
    },
    {
      topic: 'Two Pointers vs Hash Map',
      question: 'For Two Sum on an ALREADY SORTED array, why is Two Pointers preferred over a Hash Map?',
      answer:
        'Both run in O(n) time, but Two Pointers (`left = 0`, `right = n - 1`) uses O(1) constant extra memory, whereas a Hash Map uses O(n) extra memory.',
    },
    {
      topic: 'Kadane’s Algorithm',
      question: 'In Maximum Subarray Sum, why must `maxSum` be initialised to `nums[0]` instead of `0`?',
      answer:
        'If every number in the array is negative (e.g., `[-8, -3, -5]`), the maximum non-empty subarray sum is `-3`. Initialising `maxSum = 0` would wrongly return `0`!',
    },
    {
      topic: 'Linked Lists',
      question: 'What are the 4 pointer steps inside the `while` loop to reverse a Singly Linked List in-place?',
      answer:
        '1) `nextTemp = curr.next` (save next)\n2) `curr.next = prev` (flip arrow backward)\n3) `prev = curr` (advance prev)\n4) `curr = nextTemp` (advance curr). Finally return `prev`.',
    },
    {
      topic: 'Fast & Slow Pointers',
      question: 'How does Floyd’s Tortoise & Hare detect a cycle in O(1) memory?',
      answer:
        '`slow` advances 1 step and `fast` advances 2 steps. If a cycle exists, `fast` laps `slow` inside the cycle (`slow === fast`). If `fast` hits `nil`, there is no cycle.',
    },
  ];

  const currentCard = flashcards[cardIndex] || flashcards[0];
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="page-container">
      <div className="page-header-block">
        <div>
          <span className="eyebrow-label">Retention & Interview Simulation</span>
          <h1>Spaced Revision Flashcards & Timed Mock Interview</h1>
          <p>
            Review core DSA patterns with interactive flashcards, inspect your saved lesson
            notes, and practise under a realistic 30-minute technical interview timer.
          </p>
        </div>
      </div>

      {/* Interactive Flashcard Deck */}
      <div className="dashboard-panel">
        <div className="panel-header">
          <h2>Active Recall Concept Flashcards</h2>
          <span className="badge badge-essential">
            Card {cardIndex + 1} of {flashcards.length} ({currentCard.topic})
          </span>
        </div>

        <div
          className={`flashcard-box ${flipped ? 'flipped' : ''}`}
          onClick={() => setFlipped((f) => !f)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setFlipped((f) => !f);
          }}
        >
          <span className="flashcard-side-tag">
            {flipped ? '✅ Answer & Intuition' : '❓ Question (Click to Flip)'}
          </span>
          <p className="flashcard-text">
            {flipped ? currentCard.answer : currentCard.question}
          </p>
        </div>

        <div className="viz-toolbar" style={{ marginTop: '1rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setFlipped(false);
              setCardIndex((i) => (i - 1 + flashcards.length) % flashcards.length);
            }}
          >
            ◀ Previous Card
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setFlipped((f) => !f)}
          >
            {flipped ? 'Show Question' : 'Reveal Answer'}
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setFlipped(false);
              setCardIndex((i) => (i + 1) % flashcards.length);
            }}
          >
            Next Card ▶
          </button>
        </div>
      </div>

      {/* Timed Mock Interview Round */}
      <div className="dashboard-panel" style={{ marginTop: '1.5rem' }}>
        <div className="panel-header">
          <div>
            <h2>⏱ 30-Minute Timed Mock Interview Round</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Start the countdown timer, pick one Array problem and one Linked List problem
              below, and solve both without unlocking Hint 3!
            </p>
          </div>
          <div className="mock-timer-box">
            <span className="mock-timer-digits">
              {mins}:{secs}
            </span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setTimerRunning((r) => !r)}
            >
              {timerRunning ? '⏸ Pause Timer' : '▶ Start 30m Round'}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setTimerRunning(false);
                setSecondsLeft(30 * 60);
              }}
            >
              ↺ Reset
            </button>
          </div>
        </div>

        <div className="module-lessons-grid" style={{ marginTop: '1rem' }}>
          {ALL_PROBLEMS.slice(0, 3).map((prob) => (
            <div key={prob.id} className="module-detail-card">
              <span className="badge badge-track">{prob.topicTag}</span>
              <h4>{prob.title}</h4>
              <p className="module-prob-desc">{prob.description.slice(0, 95)}...</p>
              <Link to={`/problems/${prob.id}`} className="btn btn-secondary btn-sm">
                Launch in Editor →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Saved Notes */}
      <div className="dashboard-panel" style={{ marginTop: '1.5rem' }}>
        <h2>Your Saved Lesson Revision Notes</h2>
        <div className="revision-notes-grid">
          {ALL_LESSONS.map((lesson) => {
            const saved = userState.revisionNotes?.[lesson.id];
            return (
              <div key={lesson.id} className="saved-note-card">
                <h4>
                  Lesson {lesson.lessonNumber}: {lesson.title}
                </h4>
                <p>
                  {saved || (
                    <em style={{ color: 'var(--text-secondary)' }}>
                      No custom note saved yet. You can add one at the bottom of the lesson.
                    </em>
                  )}
                </p>
                <Link to={`/lessons/${lesson.id}`} className="btn btn-ghost btn-xs">
                  Open Lesson →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
