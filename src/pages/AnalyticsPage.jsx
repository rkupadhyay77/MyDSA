import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import { ALL_PROBLEMS } from '../curriculum/problems/index.js';

export default function AnalyticsPage() {
  const { userState, analytics } = useApp();

  const strongTopics = analytics.topicStats.filter((t) => t.readinessPercent >= 70);
  const focusTopics = analytics.topicStats.filter((t) => t.readinessPercent < 70);

  return (
    <div className="page-container">
      <div className="page-header-block">
        <div>
          <span className="eyebrow-label">Performance & Readiness</span>
          <h1>Progress, Rubric Analytics & Interview Readiness</h1>
          <p>
            Track your topic-by-topic mastery, rubric score distribution, and areas that need
            additional practice before technical interviews.
          </p>
        </div>
      </div>

      {/* Summary KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-label">Lessons Completed</span>
          <strong className="kpi-value">
            {analytics.completedLessonsCount} / {analytics.totalAvailableLessons}
          </strong>
          <span className="kpi-sub">{analytics.courseCompletionPercent}% of Phase 1 Core</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Problems Solved</span>
          <strong className="kpi-value">
            {analytics.solvedProblemsCount} / {analytics.totalProblemsCount}
          </strong>
          <span className="kpi-sub">Score ≥ 7/10 required</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-label">Average Rubric Score</span>
          <strong className="kpi-value">
            {analytics.attemptedProblemsCount > 0 ? `${analytics.averageScore}/10` : '—'}
          </strong>
          <span className="kpi-sub">Across {analytics.attemptedProblemsCount} attempted problems</span>
        </div>
      </div>

      {/* Strengths vs Areas to Improve */}
      <div className="dashboard-columns" style={{ marginTop: '1.5rem' }}>
        <div className="dashboard-panel">
          <h2>💪 Topic Strengths (≥70% Readiness)</h2>
          {strongTopics.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>
              Complete lessons and solve problems in a chapter to build your first Strong topic!
            </p>
          ) : (
            <ul className="analytics-topic-list">
              {strongTopics.map((t) => (
                <li key={t.id}>
                  <strong>{t.name}</strong> — {t.readinessPercent}% Ready (Avg Score:{' '}
                  {t.avgTopicScore}/10)
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dashboard-panel">
          <h2>🎯 Focus Areas Needing Practice</h2>
          {focusTopics.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>
              All Phase 1 core topics are above 70% readiness!
            </p>
          ) : (
            <ul className="analytics-topic-list">
              {focusTopics.map((t) => (
                <li key={t.id}>
                  <strong>{t.name}</strong> — {t.readinessPercent}% Ready ({t.lessonsDone}/
                  {t.lessonsTotal} lessons, {t.problemsSolved}/{t.problemsTotal} problems solved)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Problem-by-Problem Score Matrix */}
      <div className="dashboard-panel" style={{ marginTop: '1.5rem' }}>
        <h2>Problem-by-Problem Rubric Score Matrix</h2>
        <div className="sample-tests-table-wrap">
          <table className="sample-tests-table">
            <thead>
              <tr>
                <th>Problem</th>
                <th>Topic</th>
                <th>Difficulty</th>
                <th>Target Complexity</th>
                <th>Attempts</th>
                <th>Best Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ALL_PROBLEMS.map((p) => {
                const att = userState.problemAttempts[p.id];
                return (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.title}</strong>
                    </td>
                    <td>{p.topicTag}</td>
                    <td>{p.difficulty}</td>
                    <td>
                      <code>{p.rubric.targetTimeComplexity}</code>
                    </td>
                    <td>{att?.attemptsCount || 0}</td>
                    <td>
                      {att?.bestScore > 0 ? (
                        <span className="score-pill score-high">{att.bestScore}/10</span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td>
                      <Link to={`/problems/${p.id}`} className="btn btn-secondary btn-xs">
                        Practice →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
