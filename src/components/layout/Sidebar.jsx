import { useState } from 'react';
import { Link, useRouter } from '../../app/router.jsx';
import { useApp } from '../../app/AppContext.jsx';
import { CURRICULUM_LEVELS } from '../../curriculum/curriculumData.js';
import { getLessonById } from '../../curriculum/lessons/index.js';
import { getProblemById } from '../../curriculum/problems/index.js';

export default function Sidebar({ isOpen, onCloseMobile }) {
  const { path } = useRouter();
  const { userState, analytics } = useApp();

  // Default expand available Phase 1 levels (Level 1, 2, 5)
  const [expandedLevels, setExpandedLevels] = useState({
    'level-1-foundations': true,
    'level-2-arrays-strings': true,
    'level-5-linked-lists': true,
  });

  const toggleLevel = (levelId) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  const lastLesson =
    getLessonById(userState.lastLessonId) || analytics.recommendedNextLesson;

  return (
    <aside className={`app-sidebar ${isOpen ? 'open' : 'collapsed'}`} aria-label="Curriculum Sidebar">
      <div className="sidebar-top-card">
        <div className="sidebar-progress-row">
          <span>Course Progress</span>
          <strong>{analytics.courseCompletionPercent}%</strong>
        </div>
        <div className="sidebar-progress-bar">
          <div
            className="sidebar-progress-fill"
            style={{ width: `${analytics.courseCompletionPercent}%` }}
          />
        </div>
        {lastLesson && (
          <Link
            to={`/lessons/${lastLesson.id}`}
            className="btn btn-primary btn-sm sidebar-resume-btn"
            onClick={onCloseMobile}
          >
            ▶ Resume: {lastLesson.lessonNumber} {lastLesson.title.slice(0, 24)}...
          </Link>
        )}
      </div>

      <div className="sidebar-section-label">14-Level DSA Syllabus</div>

      <div className="sidebar-tree">
        {CURRICULUM_LEVELS.map((level) => {
          const isExpanded = !!expandedLevels[level.id];
          const allChapterLessons = level.chapters.flatMap((c) => c.lessonIds);
          const completedInLevel = allChapterLessons.filter((lid) =>
            userState.completedLessons.includes(lid)
          ).length;
          const isLevelComplete =
            allChapterLessons.length > 0 &&
            completedInLevel === allChapterLessons.length;

          return (
            <div key={level.id} className="sidebar-level-block">
              <button
                type="button"
                className={`sidebar-level-header ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleLevel(level.id)}
              >
                <div className="sidebar-level-title-wrap">
                  <span className="sidebar-level-num">L{level.levelNumber}</span>
                  <span className="sidebar-level-name">{level.title}</span>
                </div>
                <div className="sidebar-level-badges">
                  {level.status === 'available' ? (
                    <span className={`level-progress-chip ${isLevelComplete ? 'done' : ''}`}>
                      {isLevelComplete
                        ? '✓ Done'
                        : `${completedInLevel}/${allChapterLessons.length}`}
                    </span>
                  ) : (
                    <span className="level-upcoming-chip">Phase 3</span>
                  )}
                  <span className="chevron-icon">{isExpanded ? '▾' : '▸'}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="sidebar-level-body">
                  <div className="sidebar-level-meta">
                    <span className={`badge badge-${level.priority.toLowerCase()}`}>
                      {level.priority}
                    </span>
                    <span className="badge badge-track">{level.track}</span>
                  </div>

                  {level.chapters.map((chapter) => (
                    <div key={chapter.id} className="sidebar-chapter-box">
                      <Link
                        to={`/modules/${level.id}`}
                        className="sidebar-chapter-title"
                        onClick={onCloseMobile}
                      >
                        {chapter.title}
                      </Link>

                      {chapter.lessonIds.length > 0 ? (
                        <>
                          <div className="sidebar-sublist-heading">Interactive Lessons</div>
                          <ul className="sidebar-links-list">
                            {chapter.lessonIds.map((lid) => {
                              const lesson = getLessonById(lid);
                              if (!lesson) return null;
                              const isDone = userState.completedLessons.includes(lid);
                              const isActive = path === `/lessons/${lid}`;
                              return (
                                <li key={lid}>
                                  <Link
                                    to={`/lessons/${lid}`}
                                    className={`sidebar-item-link ${isActive ? 'active' : ''}`}
                                    onClick={onCloseMobile}
                                  >
                                    <span className={`check-circle ${isDone ? 'done' : ''}`}>
                                      {isDone ? '✓' : lesson.lessonNumber}
                                    </span>
                                    <span className="sidebar-item-text">{lesson.title}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>

                          <div className="sidebar-sublist-heading">
                            Coding Exercises ({chapter.problemIds.length})
                          </div>
                          <ul className="sidebar-links-list">
                            {chapter.problemIds.map((pid) => {
                              const prob = getProblemById(pid);
                              if (!prob) return null;
                              const attempt = userState.problemAttempts[pid];
                              const isActive = path === `/problems/${pid}`;
                              return (
                                <li key={pid}>
                                  <Link
                                    to={`/problems/${pid}`}
                                    className={`sidebar-item-link ${isActive ? 'active' : ''}`}
                                    onClick={onCloseMobile}
                                  >
                                    <span
                                      className={`check-circle ${
                                        attempt?.solved ? 'done' : ''
                                      }`}
                                    >
                                      {attempt?.solved ? '★' : '{ }'}
                                    </span>
                                    <span className="sidebar-item-text">{prob.title}</span>
                                    {attempt?.bestScore > 0 && (
                                      <span className="sidebar-score-tag">
                                        {attempt.bestScore}/10
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        <p className="sidebar-upcoming-note">
                          Syllabus topics mapped ({level.topicsSummary.length} topics). Interactive lessons unlock in Phase 3.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Prototype Persistence Footer */}
      <div className="sidebar-storage-footer">
        <span className="storage-dot" />
        <div>
          <strong>Prototype Local Storage</strong>
          <p>Saved in browser localStorage. Cloud account sync planned for Phase 4.</p>
        </div>
      </div>
    </aside>
  );
}
