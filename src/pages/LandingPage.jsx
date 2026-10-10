import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import BigOVisualizer from '../components/visualizers/BigOVisualizer.jsx';

export default function LandingPage() {
  const { userState, analytics } = useApp();

  return (
    <div className="page-container landing-page">
      {/* Hero Section */}
      <section className="hero-card">
        <div className="hero-badge-row">
          <span className="badge badge-essential">Beginner to Product Interview Ready</span>
          <span className="badge badge-track">Swift • Python • Java • C++ • JS</span>
        </div>

        <h1 className="hero-title">
          Finally Understand Data Structures & Algorithms —{' '}
          <span className="text-gradient">Step by Step, Visually.</span>
        </h1>

        <p className="hero-subtitle">
          Built for developers who struggle with abstract DSA theory, have forgotten their
          fundamentals, or are preparing for product-company interviews (especially iOS / Swift
          and full-stack engineers). No jargon walls—every concept starts with a real-world
          analogy, an interactive step-by-step animation, and a 10-point rubric assessment.
        </p>

        <div className="hero-cta-row">
          <Link to="/lessons/big-o-intuition" className="btn btn-primary btn-lg">
            Start Lesson 1.1: Big O Intuition →
          </Link>
          <Link to="/dashboard" className="btn btn-secondary btn-lg">
            Open Learning Dashboard
          </Link>
          <Link to="/problems/two-sum-sorted" className="btn btn-secondary btn-lg">
            Try Coding Practice
          </Link>
        </div>

        <div className="hero-quick-metrics">
          <div className="hero-metric">
            <strong>14 Levels</strong>
            <span>Structured Core vs Advanced Syllabus</span>
          </div>
          <div className="hero-metric">
            <strong>Interactive</strong>
            <span>Step-by-Step Visualisers</span>
          </div>
          <div className="hero-metric">
            <strong>5 Languages</strong>
            <span>First-Class Swift, Python, Java, C++, JS</span>
          </div>
          <div className="hero-metric">
            <strong>10-Point Rubric</strong>
            <span>Correctness, Efficiency, Edge Cases & Clarity</span>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="pillars-grid">
        <div className="pillar-card">
          <div className="pillar-icon">🧠</div>
          <h3>1. Everyday Analogies & Beginner Mode</h3>
          <p>
            Every lesson explains the problem in plain English first, uses a real-world analogy,
            and includes a toggleable <strong>&ldquo;Explain Like I&rsquo;m a Beginner&rdquo;</strong>{' '}
            callout.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-icon">🎬</div>
          <h3>2. Pause, Step & Inspect Animations</h3>
          <p>
            Watch pointers move across arrays, see RAM addresses shift during insertions, and
            trace linked list arrows flipping direction one step at a time.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-icon">🍎</div>
          <h3>3. Language-Independent + Modern Swift</h3>
          <p>
            Currently set to <strong>{userState.preferredLanguage.toUpperCase()}</strong>. Switch
            between Swift, Python, Java, C++, and JavaScript anytime—lessons and starter templates
            adapt automatically.
          </p>
        </div>

        <div className="pillar-card">
          <div className="pillar-icon">🎯</div>
          <h3>4. Transparent 10-Point Rubric Feedback</h3>
          <p>
            Understand the difference between a <em>correct but O(n²) slow</em> solution (7/10)
            and an <em>optimal O(n)</em> solution (10/10) with progressive hints.
          </p>
        </div>
      </section>

      {/* Live Interactive Preview right on the Landing Page */}
      <section className="landing-preview-section">
        <div className="section-heading-row">
          <div>
            <h2>Try an Interactive Visualizer Right Now</h2>
            <p>
              Click <strong>Play</strong>, <strong>Next ▶</strong>, or change <code>n</code> below
              to see why O(1) and O(log n) beat O(n²) nested loops.
            </p>
          </div>
          <Link to="/visualizer" className="btn btn-secondary btn-sm">
            Open Full Visualizer Studio →
          </Link>
        </div>

        <BigOVisualizer defaultN={8} />
      </section>

      {/* Quick Jump into Phase 1 Completed Modules */}
      <section className="landing-modules-section">
        <h2>Start Learning — Phase 1 Interactive Modules</h2>
        <div className="module-cards-grid">
          <div className="module-preview-card">
            <span className="badge badge-essential">Level 1 • Essential</span>
            <h3>DSA Foundations & Big O Complexity</h3>
            <p>
              Learn how computers count operations, compare O(1) to O(n²), and solve 3 foundational
              efficiency problems.
            </p>
            <div className="module-card-links">
              <Link to="/lessons/big-o-intuition" className="btn btn-primary btn-sm">
                Start Lesson 1.1
              </Link>
              <Link to="/problems/sum-of-first-n" className="btn btn-secondary btn-sm">
                Practice (3 Problems)
              </Link>
            </div>
          </div>

          <div className="module-preview-card">
            <span className="badge badge-essential">Level 2 • Essential</span>
            <h3>Arrays, Strings & Two Pointers</h3>
            <p>
              Visualise contiguous RAM addresses, O(n) insertion shifting, Opposite-End Two
              Pointers, and Kadane’s Subarray Algorithm.
            </p>
            <div className="module-card-links">
              <Link to="/lessons/arrays-memory-and-operations" className="btn btn-primary btn-sm">
                Start Lesson 2.1
              </Link>
              <Link to="/problems/two-sum-sorted" className="btn btn-secondary btn-sm">
                Practice (4 Problems)
              </Link>
            </div>
          </div>

          <div className="module-preview-card">
            <span className="badge badge-essential">Level 5 • Essential</span>
            <h3>Linked Lists & Fast/Slow Pointers</h3>
            <p>
              Master reference nodes (`ListNode`), safe pointer rewiring, 3-pointer in-place
              reversal, and Floyd’s Tortoise & Hare cycle detection.
            </p>
            <div className="module-card-links">
              <Link
                to="/lessons/linked-lists-nodes-and-pointers"
                className="btn btn-primary btn-sm"
              >
                Start Lesson 5.1
              </Link>
              <Link to="/problems/reverse-linked-list" className="btn btn-secondary btn-sm">
                Practice (4 Problems)
              </Link>
            </div>
          </div>
        </div>

        <div className="landing-bottom-bar">
          <span>
            Your Current Progress: <strong>{analytics.completedLessonsCount}</strong> /{' '}
            {analytics.totalAvailableLessons} Lessons Completed •{' '}
            <strong>{analytics.solvedProblemsCount}</strong> / {analytics.totalProblemsCount}{' '}
            Problems Solved
          </span>
          <Link to="/curriculum" className="btn btn-secondary btn-sm">
            Explore Full 14-Level Syllabus →
          </Link>
        </div>
      </section>
    </div>
  );
}
