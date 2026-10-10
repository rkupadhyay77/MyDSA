import { useState, useEffect } from 'react';
import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import { getLessonById, ALL_LESSONS } from '../curriculum/lessons/index.js';
import { getProblemById } from '../curriculum/problems/index.js';
import { SUPPORTED_LANGUAGES } from '../curriculum/curriculumData.js';
import BigOVisualizer from '../components/visualizers/BigOVisualizer.jsx';
import ArrayVisualizer from '../components/visualizers/ArrayVisualizer.jsx';
import LinkedListVisualizer from '../components/visualizers/LinkedListVisualizer.jsx';

export default function LessonPage({ lessonId }) {
  const {
    userState,
    setPreferredLanguage,
    toggleBeginnerMode,
    setLastLessonId,
    toggleLessonComplete,
    recordQuizScore,
    saveRevisionNote,
  } = useApp();

  const lesson = getLessonById(lessonId) || ALL_LESSONS[0];
  const isCompleted = userState.completedLessons.includes(lesson.id);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Personal revision note state
  const [noteText, setNoteText] = useState('');
  const [noteSavedToast, setNoteSavedToast] = useState(false);

  useEffect(() => {
    setLastLessonId(lesson.id);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setNoteText(userState.revisionNotes?.[lesson.id] || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id, setLastLessonId]);

  const lang = userState.preferredLanguage || 'swift';
  const codeSample =
    lesson.codeWalkthrough.codeByLanguage[lang] ||
    lesson.codeWalkthrough.codeByLanguage.swift;

  const handleSelectOption = (qId, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleCheckQuiz = () => {
    let correctCount = 0;
    lesson.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    setQuizSubmitted(true);
    recordQuizScore(lesson.id, correctCount, lesson.quiz.length);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  const handleSaveNote = () => {
    saveRevisionNote(lesson.id, noteText);
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 2000);
  };

  const nextLesson = lesson.nextLessonId ? getLessonById(lesson.nextLessonId) : null;
  const prevLesson = lesson.prevLessonId ? getLessonById(lesson.prevLessonId) : null;

  return (
    <div className="page-container lesson-page">
      {/* Top Breadcrumb & Status Bar */}
      <div className="lesson-topbar">
        <div className="breadcrumb-row">
          <Link to="/curriculum" className="breadcrumb-link">
            Curriculum
          </Link>
          <span>/</span>
          <Link to={`/modules/${lesson.levelId}`} className="breadcrumb-link">
            {lesson.levelId}
          </Link>
          <span>/</span>
          <span>Lesson {lesson.lessonNumber}</span>
        </div>

        <div className="lesson-topbar-actions">
          <button
            type="button"
            className={`btn btn-sm ${userState.beginnerMode ? 'btn-primary' : 'btn-secondary'}`}
            onClick={toggleBeginnerMode}
          >
            {userState.beginnerMode
              ? '💡 Explain Like I’m a Beginner: ON'
              : '💡 Turn ON Beginner Mode'}
          </button>

          <button
            type="button"
            className={`btn btn-sm ${isCompleted ? 'btn-success' : 'btn-secondary'}`}
            onClick={() => toggleLessonComplete(lesson.id)}
          >
            {isCompleted ? '✓ Completed (Click to Unmark)' : '○ Mark Lesson Complete'}
          </button>
        </div>
      </div>

      {/* Lesson Hero Title */}
      <header className="lesson-hero-card">
        <div className="level-badges-row">
          <span className="badge badge-essential">Lesson {lesson.lessonNumber}</span>
          <span className="badge badge-track">{lesson.priority}</span>
          <span className="level-hours-tag">⏱ {lesson.estimatedMinutes} mins</span>
        </div>
        <h1>{lesson.title}</h1>
      </header>

      {/* 1. Learning Objectives */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">1</span>
          <h2>Learning Objectives</h2>
        </div>
        <ul className="objectives-checklist">
          {lesson.objectives.map((obj, idx) => (
            <li key={idx}>{obj}</li>
          ))}
        </ul>
      </section>

      {/* 2. Real-World Analogy */}
      <section className="lesson-section-card analogy-card">
        <div className="section-num-header">
          <span className="section-num-pill">2</span>
          <h2>Real-World Analogy: {lesson.analogy.title}</h2>
        </div>
        <p className="analogy-lead">{lesson.analogy.summary}</p>
        <div className="analogy-steps-grid">
          {lesson.analogy.details.map((detail, idx) => (
            <div key={idx} className="analogy-step-box">
              <span className="analogy-step-num">Part {idx + 1}</span>
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Beginner-Friendly Explanation + "Explain Like I'm a Beginner" Callout */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">3</span>
          <h2>Step-by-Step Concept Explanation</h2>
        </div>

        {userState.beginnerMode && lesson.beginnerModeExplanation && (
          <div className="eli5-highlight-box">
            <div className="eli5-header">
              <span>💡 {lesson.beginnerModeExplanation.title}</span>
              <span className="badge badge-essential">Beginner Mode Active</span>
            </div>
            <ul>
              {lesson.beginnerModeExplanation.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="explanation-blocks">
          {lesson.explanation.map((block, idx) => (
            <div key={idx} className="explanation-item">
              <h3>{block.heading}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{block.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Animation / Visualizer */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">4</span>
          <h2>Interactive Step-by-Step Visualisation</h2>
        </div>
        <p className="section-sub-intro">
          Use <strong>Play</strong>, <strong>Next ▶</strong>, <strong>◀ Prev</strong>, and{' '}
          <strong>Restart</strong> below to animate the concept one step at a time.
        </p>

        {lesson.visualizerConfig.type === 'big-o' && (
          <BigOVisualizer defaultN={lesson.visualizerConfig.defaultN || 8} />
        )}
        {lesson.visualizerConfig.type === 'array' && (
          <ArrayVisualizer defaultMode={lesson.visualizerConfig.defaultMode || 'operations'} />
        )}
        {lesson.visualizerConfig.type === 'linked-list' && (
          <LinkedListVisualizer
            defaultMode={lesson.visualizerConfig.defaultMode || 'operations'}
          />
        )}
      </section>

      {/* 5. Worked Example */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">5</span>
          <h2>Worked Example: {lesson.workedExample.title}</h2>
        </div>
        <div className="worked-example-meta">
          <div>
            <strong>Problem:</strong> {lesson.workedExample.problemStatement}
          </div>
          <div className="worked-io-row">
            <span>
              <strong>Sample Input:</strong> <code>{lesson.workedExample.sampleInput}</code>
            </span>
            <span>
              <strong>Expected Result:</strong>{' '}
              <code>{lesson.workedExample.expectedOutput}</code>
            </span>
          </div>
        </div>
        <div className="worked-steps-list">
          {lesson.workedExample.steps.map((ws) => (
            <div key={ws.step} className="worked-step-card">
              <div className="worked-step-title">
                <span className="badge badge-track">Trace {ws.step}</span>
                <strong>{ws.title}</strong>
              </div>
              <p>{ws.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Step-by-Step Code Explanation */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">6</span>
          <h2>Line-by-Line Code Walkthrough: {lesson.codeWalkthrough.title}</h2>
        </div>

        {/* Language Selector Tabs */}
        <div className="code-lang-tabs">
          {SUPPORTED_LANGUAGES.map((l) => (
            <button
              key={l.id}
              type="button"
              className={`viz-chip ${lang === l.id ? 'active' : ''}`}
              onClick={() => setPreferredLanguage(l.id)}
            >
              {l.name}
            </button>
          ))}
        </div>

        <div className="lesson-code-split">
          <div className="lesson-code-block">
            <pre>
              <code>
                {codeSample.split('\n').map((line, i) => (
                  <div key={i} className="walkthrough-code-line">
                    <span className="walkthrough-line-num">{i + 1}</span>
                    <span className="walkthrough-line-text">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          <div className="lesson-line-explanations">
            <h4>Line-by-Line Breakdown</h4>
            {lesson.codeWalkthrough.lineExplanations.map((le, idx) => (
              <div key={idx} className="line-exp-card">
                <span className="line-exp-badge">Lines {le.lines}</span>
                <h5>{le.title}</h5>
                <p>{le.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Time and Space Complexity */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">7</span>
          <h2>Time & Space Complexity (In Plain Language)</h2>
        </div>
        <div className="complexity-cards-row">
          <div className="complexity-info-box">
            <span className="complexity-box-label">⏱ Time Complexity</span>
            <strong>{lesson.complexity.time}</strong>
          </div>
          <div className="complexity-info-box">
            <span className="complexity-box-label">💾 Space Complexity</span>
            <strong>{lesson.complexity.space}</strong>
          </div>
        </div>
        <p className="complexity-plain-summary">{lesson.complexity.beginnerSummary}</p>
      </section>

      {/* 8. Common Mistakes */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">8</span>
          <h2>Common Mistakes & How to Avoid Them</h2>
        </div>
        <div className="mistakes-grid">
          {lesson.commonMistakes.map((cm, idx) => (
            <div key={idx} className="mistake-card">
              <h4>⚠️ {cm.mistake}</h4>
              <p>
                <strong>Why it happens:</strong> {cm.whyItHappens}
              </p>
              <p className="mistake-fix">
                <strong>✅ How to fix it:</strong> {cm.fix}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Quick Knowledge-Check Quiz */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">9</span>
          <h2>Quick Knowledge-Check Quiz</h2>
        </div>

        <div className="quiz-questions-stack">
          {lesson.quiz.map((q, qIdx) => {
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correctIndex;
            return (
              <div key={q.id} className="quiz-question-card">
                <h4>
                  Question {qIdx + 1}: {q.question}
                </h4>
                <div className="quiz-options-list">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let statusClass = '';
                    if (quizSubmitted) {
                      if (optIdx === q.correctIndex) statusClass = 'correct';
                      else if (isSelected) statusClass = 'wrong';
                    }
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        className={`quiz-option-btn ${isSelected ? 'selected' : ''} ${statusClass}`}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                      >
                        <span className="opt-letter">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className={`quiz-explanation-box ${isCorrect ? 'pass' : 'fail'}`}>
                    <strong>
                      {isCorrect ? '✓ Correct!' : '✗ Not quite — here is why:'}
                    </strong>{' '}
                    {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="quiz-actions-row">
          {!quizSubmitted ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCheckQuiz}
              disabled={Object.keys(selectedAnswers).length === 0}
            >
              Check Quiz Answers
            </button>
          ) : (
            <button type="button" className="btn btn-secondary" onClick={handleResetQuiz}>
              ↺ Retake Quiz
            </button>
          )}
        </div>
      </section>

      {/* 10. Hands-On Coding Practice */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">10</span>
          <h2>Hands-On Coding Exercises for This Chapter</h2>
        </div>
        <p className="section-sub-intro">
          Apply what you just learned in our interactive coding editor with progressive hints
          and automatic 10-point rubric feedback.
        </p>

        <div className="module-lessons-grid">
          {lesson.practiceProblemIds.map((pid) => {
            const prob = getProblemById(pid);
            if (!prob) return null;
            const attempt = userState.problemAttempts[pid];
            return (
              <div key={pid} className="module-detail-card">
                <div className="module-detail-top">
                  <span className={`difficulty-tag diff-${prob.difficulty.toLowerCase()}`}>
                    {prob.difficulty}
                  </span>
                  <span className="status-pill">
                    {attempt?.bestScore > 0
                      ? `Best Score: ${attempt.bestScore}/10`
                      : '10-Point Rubric'}
                  </span>
                </div>
                <h4>{prob.title}</h4>
                <p className="module-prob-desc">{prob.description.slice(0, 110)}...</p>
                <Link to={`/problems/${pid}`} className="btn btn-primary btn-sm">
                  Solve in {lang.toUpperCase()} →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. Summary & Revision Notes */}
      <section className="lesson-section-card">
        <div className="section-num-header">
          <span className="section-num-pill">11</span>
          <h2>Summary & Personal Revision Notes</h2>
        </div>
        <ul className="summary-bullet-list">
          {lesson.summaryNotes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>

        <div className="personal-notes-box">
          <label htmlFor="lesson-revision-note">
            <strong>Your Personal Revision Takeaway (Saved Locally):</strong>
          </label>
          <textarea
            id="lesson-revision-note"
            rows={3}
            className="revision-textarea"
            placeholder="Write a 1-sentence reminder for your future interview revision..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <div className="personal-notes-actions">
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleSaveNote}>
              Save Revision Note
            </button>
            {noteSavedToast && <span className="saved-toast">✓ Saved to local storage!</span>}
          </div>
        </div>
      </section>

      {/* End of Lesson Completion & Next Lesson Footer */}
      <footer className="lesson-completion-footer">
        <div className="completion-cta-box">
          <div>
            <h3>Finished studying Lesson {lesson.lessonNumber}?</h3>
            <p>
              Chapters are never marked complete automatically just for opening them. Click
              below when you feel confident with the concepts and quiz!
            </p>
          </div>

          <button
            type="button"
            className={`btn btn-lg ${isCompleted ? 'btn-success' : 'btn-primary'}`}
            onClick={() => toggleLessonComplete(lesson.id)}
          >
            {isCompleted ? '✓ Lesson Completed (Click to Undo)' : '✓ Mark Lesson as Complete'}
          </button>
        </div>

        <div className="lesson-nav-links">
          {prevLesson ? (
            <Link to={`/lessons/${prevLesson.id}`} className="btn btn-secondary">
              ← Previous: {prevLesson.lessonNumber} {prevLesson.title}
            </Link>
          ) : (
            <span />
          )}

          {nextLesson ? (
            <Link to={`/lessons/${nextLesson.id}`} className="btn btn-primary">
              Next Lesson: {nextLesson.lessonNumber} {nextLesson.title} →
            </Link>
          ) : (
            <Link to="/problems" className="btn btn-primary">
              Proceed to Chapter Coding Problems →
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
