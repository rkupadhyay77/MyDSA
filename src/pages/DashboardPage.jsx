import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import { getLessonById, ALL_LESSONS } from '../curriculum/lessons/index.js';
import { ALL_PROBLEMS } from '../curriculum/problems/index.js';

export default function DashboardPage() {
  const { userState, analytics } = useApp();

  const lastLesson =
    getLessonById(userState.lastLessonId) || analytics.recommendedNextLesson;
  const recommendedLesson = analytics.recommendedNextLesson;

  // Identify topics due for revision (completed lessons or topics with score < 8)
  const revisionItems = ALL_LESSONS.filter((l) =>
    userState.completedLessons.includes(l.id)
  );

  return (
    <div className="page-container">
      {/* Storage Mode Notice */}
      <div className="storage-mode-banner">
        <div>
          <span className="badge badge-track">Prototype Persistence (localStorage)</span>
          <span className="storage-banner-text">
            Your progress, quiz scores, and code drafts are persisted locally in this browser.
            Database-backed user accounts & cross-device sync will be added in Phase 4.
          </span>
        </div>
        <Link to="/settings" className="btn btn-ghost btn-xs">
          Manage Storage →
        </Link>
      </div>

      {/* Top Welcome & Resume Banner */}
      <div className="dashboard-hero-banner">
        <div>
          <span className="eyebrow-label">Personal Learning Dashboard</span>
          <h1>Welcome back! Ready to master your next DSA pattern?</h1>
          <p>
            Preferred Language: <strong>{userState.preferredLanguage.toUpperCase()}</strong> •
            Beginner Mode: <strong>{userState.beginnerMode ? 'Enabled' : 'Off'}</strong>
          </p>
        </div>

        <div className="dashboard-resume-actions">
          {lastLesson && (
            <Link to={`/lessons/${lastLesson.id}`} className="btn btn-primary">
              ▶ Resume Lesson {lastLesson.lessonNumber}: {lastLesson.title}
            </Link>
          )}
          <Link to="/problems" className="btn btn-secondary">
            Practice Coding Problems ({analytics.solvedProblemsCount}/
            {analytics.totalProblemsCount})
          </Link>
        </div>
      </div>

      {/* 6 Core KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Overall Completion</span>
          <strong className="kpi-value">{analytics.courseCompletionPercent}%</strong>
          <span className="kpi-sub">
            {analytics.completedLessonsCount} of {analytics.totalAvailableLessons} Phase 1 lessons
          </span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Completed Chapters</span>
          <strong className="kpi-value">{analytics.completedChaptersCount} / 3</strong>
          <span className="kpi-sub">Core Phase 1 chapters</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Learning Streak</span>
          <strong className="kpi-value">🔥 {userState.streakDays} Days</strong>
          <span className="kpi-sub">Active today ({userState.lastActiveDate})</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Problems Attempted</span>
          <strong className="kpi-value">
            {analytics.attemptedProblemsCount} / {analytics.totalProblemsCount}
          </strong>
          <span className="kpi-sub">{userState.submissions.length} total submissions</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Problems Solved (≥7/10)</span>
          <strong className="kpi-value">
            {analytics.solvedProblemsCount} / {analytics.totalProblemsCount}
          </strong>
          <span className="kpi-sub">Across Big O, Arrays & Linked Lists</span>
        </div>

        <div className="kpi-card">
          <span className="kpi-label">Average Rubric Score</span>
          <strong className="kpi-value">
            {analytics.attemptedProblemsCount > 0 ? `${analytics.averageScore} / 10` : '— / 10'}
          </strong>
          <span className="kpi-sub">10-point rubric evaluation</span>
        </div>
      </div>

      {/* Two-Column Main Dashboard Grid */}
      <div className="dashboard-columns">
        {/* Left Column: Topic Readiness & Strengths/Weaknesses */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Interview Readiness & Topic Strengths</h2>
            <Link to="/analytics" className="btn btn-ghost btn-xs">
              Full Analytics →
            </Link>
          </div>

          <div className="topic-readiness-list">
            {analytics.topicStats.map((topic) => (
              <div key={topic.id} className="topic-readiness-item">
                <div className="topic-readiness-top">
                  <div>
                    <h4>{topic.name}</h4>
                    <span className="topic-meta-sub">
                      Lessons: {topic.lessonsDone}/{topic.lessonsTotal} • Problems Solved:{' '}
                      {topic.problemsSolved}/{topic.problemsTotal} • Avg Score:{' '}
                      {topic.avgTopicScore > 0 ? `${topic.avgTopicScore}/10` : 'Not graded'}
                    </span>
                  </div>
                  <span
                    className={`readiness-badge ${
                      topic.readinessPercent >= 80
                        ? 'ready-high'
                        : topic.readinessPercent > 0
                        ? 'ready-mid'
                        : 'ready-low'
                    }`}
                  >
                    {topic.readinessPercent}% • {topic.statusLabel}
                  </span>
                </div>
                <div className="readiness-bar-track">
                  <div
                    className="readiness-bar-fill"
                    style={{ width: `${topic.readinessPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Next Step */}
          {recommendedLesson && (
            <div className="recommended-next-box">
              <div>
                <span className="badge badge-essential">Recommended Next Lesson</span>
                <h4>
                  Lesson {recommendedLesson.lessonNumber}: {recommendedLesson.title}
                </h4>
                <p>Estimated time: {recommendedLesson.estimatedMinutes} mins</p>
              </div>
              <Link to={`/lessons/${recommendedLesson.id}`} className="btn btn-primary btn-sm">
                Start Lesson →
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Recent Submissions & Revision Due */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <h2>Recent Coding Submissions</h2>
            <Link to="/problems" className="btn btn-ghost btn-xs">
              All Problems →
            </Link>
          </div>

          {userState.submissions.length === 0 ? (
            <div className="empty-state-box">
              <p>No coding submissions yet.</p>
              <span>
                Try solving your first problem using our 10-point prototype rubric evaluator!
              </span>
              <div style={{ marginTop: '0.75rem' }}>
                <Link to="/problems/sum-of-first-n" className="btn btn-secondary btn-sm">
                  Solve: Sum of 1 to N in O(1) →
                </Link>
              </div>
            </div>
          ) : (
            <div className="recent-submissions-list">
              {userState.submissions.slice(0, 5).map((sub) => (
                <div key={sub.id} className="recent-sub-row">
                  <div>
                    <Link to={`/problems/${sub.problemId}`} className="recent-sub-title">
                      {sub.problemTitle}
                    </Link>
                    <div className="recent-sub-meta">
                      <span>{sub.language.toUpperCase()}</span> • <span>{sub.status}</span> •{' '}
                      <span>{new Date(sub.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <span
                    className={`score-pill ${
                      sub.totalScore >= 8
                        ? 'score-high'
                        : sub.totalScore >= 5
                        ? 'score-mid'
                        : 'score-low'
                    }`}
                  >
                    {sub.totalScore}/10
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Topics Due for Revision */}
          <div className="panel-header" style={{ marginTop: '1.5rem' }}>
            <h2>Topics Due for Revision</h2>
            <Link to="/revision" className="btn btn-ghost btn-xs">
              Open Revision Hub →
            </Link>
          </div>

          {revisionItems.length === 0 ? (
            <div className="empty-state-box">
              <p>Complete your first lesson to populate your Spaced Revision Queue.</p>
              <span>
                Lessons you mark complete will appear here with quick concept flashcards.
              </span>
            </div>
          ) : (
            <div className="revision-mini-list">
              {revisionItems.map((les) => (
                <div key={les.id} className="revision-mini-item">
                  <span>
                    ✓ {les.lessonNumber} {les.title}
                  </span>
                  <Link to={`/lessons/${les.id}`} className="btn btn-secondary btn-xs">
                    Review
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Problem Matrix */}
      <div className="dashboard-panel" style={{ marginTop: '1.5rem' }}>
        <div className="panel-header">
          <h2>Phase 1 Chapter Coding Checklist (11 Problems)</h2>
          <Link to="/problems" className="btn btn-secondary btn-xs">
            View Full Practice Directory →
          </Link>
        </div>

        <div className="problems-mini-grid">
          {ALL_PROBLEMS.map((prob) => {
            const attempt = userState.problemAttempts[prob.id];
            return (
              <Link
                key={prob.id}
                to={`/problems/${prob.id}`}
                className={`problem-mini-card ${attempt?.solved ? 'solved' : ''}`}
              >
                <div className="problem-mini-top">
                  <span className={`difficulty-tag diff-${prob.difficulty.toLowerCase()}`}>
                    {prob.difficulty}
                  </span>
                  <span className="problem-mini-score">
                    {attempt?.bestScore > 0 ? `Best: ${attempt.bestScore}/10` : 'Unattempted'}
                  </span>
                </div>
                <h4>{prob.title}</h4>
                <span className="problem-mini-topic">{prob.topicTag}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
