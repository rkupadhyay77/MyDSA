import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import { getLevelById, CURRICULUM_LEVELS } from '../curriculum/curriculumData.js';
import { getLessonById } from '../curriculum/lessons/index.js';
import { getProblemById } from '../curriculum/problems/index.js';

export default function ModulePage({ levelId }) {
  const { userState } = useApp();
  const level = getLevelById(levelId) || CURRICULUM_LEVELS[0];

  return (
    <div className="page-container">
      <div className="breadcrumb-row">
        <Link to="/curriculum" className="breadcrumb-link">
          ← All 14 Curriculum Levels
        </Link>
        <span>/</span>
        <span>Level {level.levelNumber}</span>
      </div>

      <div className="module-hero-card">
        <div className="level-badges-row">
          <span className="level-number-pill">Level {level.levelNumber}</span>
          <span className={`badge badge-${level.priority.toLowerCase()}`}>
            {level.priority}
          </span>
          <span className="badge badge-track">{level.track}</span>
          <span className="level-hours-tag">⏱ ~{level.estimatedHours} hrs</span>
        </div>
        <h1>{level.title}</h1>
        <p>{level.subtitle}</p>

        <div className="module-topics-box">
          <h4>Syllabus Topics Covered in Level {level.levelNumber}:</h4>
          <ul>
            {level.topicsSummary.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      {level.chapters.map((chapter) => (
        <div key={chapter.id} className="dashboard-panel" style={{ marginTop: '1.5rem' }}>
          <h2>{chapter.title}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            {chapter.description}
          </p>

          {chapter.lessonIds.length > 0 ? (
            <>
              <h3>Step-by-Step Interactive Lessons</h3>
              <div className="module-lessons-grid">
                {chapter.lessonIds.map((lid) => {
                  const lesson = getLessonById(lid);
                  if (!lesson) return null;
                  const isDone = userState.completedLessons.includes(lid);
                  return (
                    <div key={lid} className="module-detail-card">
                      <div className="module-detail-top">
                        <span className="badge badge-essential">
                          Lesson {lesson.lessonNumber}
                        </span>
                        <span className={`status-pill ${isDone ? 'done' : ''}`}>
                          {isDone ? '✓ Completed' : `${lesson.estimatedMinutes} mins`}
                        </span>
                      </div>
                      <h4>{lesson.title}</h4>
                      <ul className="module-obj-list">
                        {lesson.objectives.slice(0, 2).map((obj, idx) => (
                          <li key={idx}>{obj}</li>
                        ))}
                      </ul>
                      <Link to={`/lessons/${lid}`} className="btn btn-primary btn-sm">
                        {isDone ? 'Review Lesson →' : 'Start Interactive Lesson →'}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h3 style={{ marginTop: '2rem' }}>
                Chapter Coding Practice ({chapter.problemIds.length} Problems)
              </h3>
              <div className="module-lessons-grid">
                {chapter.problemIds.map((pid) => {
                  const prob = getProblemById(pid);
                  if (!prob) return null;
                  const attempt = userState.problemAttempts[pid];
                  return (
                    <div key={pid} className="module-detail-card">
                      <div className="module-detail-top">
                        <span
                          className={`difficulty-tag diff-${prob.difficulty.toLowerCase()}`}
                        >
                          {prob.difficulty}
                        </span>
                        <span className="status-pill">
                          {attempt?.bestScore > 0
                            ? `Best Score: ${attempt.bestScore}/10`
                            : '10-Point Rubric'}
                        </span>
                      </div>
                      <h4>{prob.title}</h4>
                      <p className="module-prob-desc">
                        {prob.description.slice(0, 120)}...
                      </p>
                      <Link to={`/problems/${pid}`} className="btn btn-secondary btn-sm">
                        Open Coding Editor →
                      </Link>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="empty-state-box">
              <h4>Planned for Phase 3 Curriculum Expansion</h4>
              <p>
                In Phase 1 MVP, we have populated Level 1 (Big O & Foundations), Level 2
                (Arrays & Strings), and Level 5 (Linked Lists) with full interactive
                lessons, visualizers, and 11 coding exercises.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <Link to="/modules/level-1-foundations" className="btn btn-primary btn-sm">
                  Go to Level 1: Big O
                </Link>
                <Link to="/modules/level-2-arrays-strings" className="btn btn-secondary btn-sm">
                  Go to Level 2: Arrays
                </Link>
                <Link to="/modules/level-5-linked-lists" className="btn btn-secondary btn-sm">
                  Go to Level 5: Linked Lists
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
