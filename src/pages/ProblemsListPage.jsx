import { useState } from 'react';
import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import { ALL_PROBLEMS } from '../curriculum/problems/index.js';

export default function ProblemsListPage() {
  const { userState } = useApp();
  const [topicFilter, setTopicFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filtered = ALL_PROBLEMS.filter((p) => {
    const matchTopic =
      topicFilter === 'All' ||
      (topicFilter === 'Big O' && p.levelId === 'level-1-foundations') ||
      (topicFilter === 'Arrays' && p.levelId === 'level-2-arrays-strings') ||
      (topicFilter === 'Linked Lists' && p.levelId === 'level-5-linked-lists');
    const matchDiff =
      difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    return matchTopic && matchDiff;
  });

  return (
    <div className="page-container">
      <div className="page-header-block">
        <div>
          <span className="eyebrow-label">Hands-On Coding Practice</span>
          <h1>Coding Problems & 10-Point Rubric Assessments</h1>
          <p>
            Every completed chapter includes 3–4 curated coding exercises supporting{' '}
            <strong>Swift, Python, Java, C++, and JavaScript</strong> with progressive hints and
            a transparent 10-point scoring rubric.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-toolbar">
        <div className="filter-group">
          <span className="filter-label">Chapter Topic:</span>
          {['All', 'Big O', 'Arrays', 'Linked Lists'].map((t) => (
            <button
              key={t}
              type="button"
              className={`viz-chip ${topicFilter === t ? 'active' : ''}`}
              onClick={() => setTopicFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">Difficulty:</span>
          {['All', 'Easy', 'Medium'].map((d) => (
            <button
              key={d}
              type="button"
              className={`viz-chip ${difficultyFilter === d ? 'active' : ''}`}
              onClick={() => setDifficultyFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Problems Table / Cards */}
      <div className="problems-directory-list">
        {filtered.map((prob, index) => {
          const attempt = userState.problemAttempts[prob.id];
          return (
            <div key={prob.id} className="problem-directory-row">
              <div className="problem-dir-left">
                <span className={`check-circle ${attempt?.solved ? 'done' : ''}`}>
                  {attempt?.solved ? '✓' : index + 1}
                </span>
                <div>
                  <div className="problem-dir-badges">
                    <span
                      className={`difficulty-tag diff-${prob.difficulty.toLowerCase()}`}
                    >
                      {prob.difficulty}
                    </span>
                    <span className="badge badge-track">{prob.topicTag}</span>
                    <span className="level-hours-tag">
                      Target: {prob.rubric.targetTimeComplexity} Time,{' '}
                      {prob.rubric.targetSpaceComplexity} Space
                    </span>
                  </div>
                  <h3>
                    <Link to={`/problems/${prob.id}`} className="level-title-link">
                      {prob.title}
                    </Link>
                  </h3>
                  <p className="problem-dir-desc">
                    {prob.description.split('\n')[0]}
                  </p>
                </div>
              </div>

              <div className="problem-dir-right">
                <div className="problem-dir-score">
                  <span>Best Rubric Score</span>
                  <strong>
                    {attempt?.bestScore > 0 ? `${attempt.bestScore} / 10` : '— / 10'}
                  </strong>
                </div>
                <Link to={`/problems/${prob.id}`} className="btn btn-primary btn-sm">
                  {attempt?.attemptsCount > 0 ? 'Continue Practice →' : 'Solve Problem →'}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
