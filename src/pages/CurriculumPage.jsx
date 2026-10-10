import { useState } from 'react';
import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import { CURRICULUM_LEVELS } from '../curriculum/curriculumData.js';
import { getLessonById } from '../curriculum/lessons/index.js';
import { getProblemById } from '../curriculum/problems/index.js';

export default function CurriculumPage() {
  const { userState } = useApp();
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [trackFilter, setTrackFilter] = useState('All');

  const filteredLevels = CURRICULUM_LEVELS.filter((level) => {
    const matchesPriority =
      priorityFilter === 'All' || level.priority === priorityFilter;
    const matchesTrack =
      trackFilter === 'All' ||
      (trackFilter === 'Core' && level.isCoreInterview) ||
      (trackFilter === 'Optional' && !level.isCoreInterview);
    return matchesPriority && matchesTrack;
  });

  return (
    <div className="page-container">
      <div className="page-header-block">
        <div>
          <span className="eyebrow-label">Data-Driven Syllabus</span>
          <h1>Complete 14-Level DSA Curriculum</h1>
          <p>
            Every topic is classified as <strong>Essential</strong>, <strong>Important</strong>, or{' '}
            <strong>Advanced</strong>, with a clear boundary between{' '}
            <strong>Core Interview Preparation</strong> (Levels 1–12, 14) and{' '}
            <strong>Optional Advanced Material</strong> (Level 13).
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-toolbar">
        <div className="filter-group">
          <span className="filter-label">Priority:</span>
          {['All', 'Essential', 'Important', 'Advanced'].map((p) => (
            <button
              key={p}
              type="button"
              className={`viz-chip ${priorityFilter === p ? 'active' : ''}`}
              onClick={() => setPriorityFilter(p)}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-label">Track:</span>
          {[
            { id: 'All', label: 'All Levels (14)' },
            { id: 'Core', label: 'Core Interview Prep (13)' },
            { id: 'Optional', label: 'Optional Advanced (1)' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              className={`viz-chip ${trackFilter === t.id ? 'active' : ''}`}
              onClick={() => setTrackFilter(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Levels Roadmap List */}
      <div className="curriculum-levels-stack">
        {filteredLevels.map((level) => (
          <div key={level.id} className="curriculum-level-card">
            <div className="level-card-header">
              <div>
                <div className="level-badges-row">
                  <span className="level-number-pill">Level {level.levelNumber}</span>
                  <span className={`badge badge-${level.priority.toLowerCase()}`}>
                    {level.priority}
                  </span>
                  <span className="badge badge-track">{level.track}</span>
                  <span className="level-hours-tag">⏱ ~{level.estimatedHours} hrs</span>
                </div>
                <h2>
                  <Link to={`/modules/${level.id}`} className="level-title-link">
                    {level.title}
                  </Link>
                </h2>
                <p className="level-subtitle">{level.subtitle}</p>
              </div>

              <div>
                <Link to={`/modules/${level.id}`} className="btn btn-secondary btn-sm">
                  View Module Details →
                </Link>
              </div>
            </div>

            {/* Syllabus Topics List */}
            <div className="level-topics-pills">
              {level.topicsSummary.map((topic, idx) => (
                <span key={idx} className="topic-pill">
                  • {topic}
                </span>
              ))}
            </div>

            {/* Chapters & Interactive Content inside Level */}
            {level.chapters.map((chapter) => (
              <div key={chapter.id} className="level-chapter-panel">
                <div className="chapter-panel-top">
                  <h4>{chapter.title}</h4>
                  <p>{chapter.description}</p>
                </div>

                {chapter.lessonIds.length > 0 ? (
                  <div className="chapter-content-columns">
                    {/* Interactive Lessons */}
                    <div className="chapter-col">
                      <h5>Interactive Lessons ({chapter.lessonIds.length})</h5>
                      <div className="chapter-items-list">
                        {chapter.lessonIds.map((lid) => {
                          const lesson = getLessonById(lid);
                          if (!lesson) return null;
                          const isCompleted = userState.completedLessons.includes(lid);
                          return (
                            <Link
                              key={lid}
                              to={`/lessons/${lid}`}
                              className="chapter-item-card"
                            >
                              <div>
                                <span className="item-code-num">
                                  Lesson {lesson.lessonNumber}
                                </span>
                                <strong>{lesson.title}</strong>
                              </div>
                              <span className={`status-pill ${isCompleted ? 'done' : ''}`}>
                                {isCompleted ? '✓ Completed' : `${lesson.estimatedMinutes}m`}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Coding Problems */}
                    <div className="chapter-col">
                      <h5>Coding Exercises ({chapter.problemIds.length})</h5>
                      <div className="chapter-items-list">
                        {chapter.problemIds.map((pid) => {
                          const prob = getProblemById(pid);
                          if (!prob) return null;
                          const attempt = userState.problemAttempts[pid];
                          return (
                            <Link
                              key={pid}
                              to={`/problems/${pid}`}
                              className="chapter-item-card"
                            >
                              <div>
                                <span
                                  className={`difficulty-tag diff-${prob.difficulty.toLowerCase()}`}
                                >
                                  {prob.difficulty}
                                </span>
                                <strong>{prob.title}</strong>
                              </div>
                              <span
                                className={`status-pill ${attempt?.solved ? 'done' : ''}`}
                              >
                                {attempt?.bestScore > 0
                                  ? `${attempt.bestScore}/10`
                                  : 'Solve →'}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="upcoming-chapter-banner">
                    <span>
                      📅 <strong>Planned for Phase 3 Curriculum Expansion:</strong> Syllabus
                      structure is registered in the data model. Complete Phase 1 Core Modules
                      (Levels 1, 2, and 5) first!
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
