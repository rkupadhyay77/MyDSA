import { useState, useEffect } from 'react';
import { Link } from '../app/router.jsx';
import { useApp } from '../app/AppContext.jsx';
import { getProblemById, ALL_PROBLEMS } from '../curriculum/problems/index.js';
import CodeEditor from '../components/editor/CodeEditor.jsx';
import SubmissionResultCard from '../components/assessment/SubmissionResultCard.jsx';
import {
  PROTOTYPE_SCENARIOS,
  runPrototypeSampleTests,
  evaluatePrototypeSubmission,
} from '../services/prototypeEvaluator.js';

export default function CodingPracticePage({ problemId }) {
  const {
    userState,
    setPreferredLanguage,
    saveDraftCode,
    recordSubmission,
    unlockNextHint,
    revealOptimalSolution,
  } = useApp();

  const problem = getProblemById(problemId) || ALL_PROBLEMS[0];
  const language = userState.preferredLanguage || 'swift';

  const [leftTab, setLeftTab] = useState('description'); // 'description' | 'hints' | 'solution' | 'history'
  const [code, setCode] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('auto');
  const [sampleRunOutput, setSampleRunOutput] = useState(null);
  const [latestSubmission, setLatestSubmission] = useState(null);

  const savedDraftForProblemAndLang =
    userState.problemAttempts?.[problem.id]?.drafts?.[language];
  const starterForLang =
    problem.starterCode[language] || problem.starterCode.swift || '';
  const defaultSampleInput = problem.sampleTests[0]?.input || '';

  // Load saved draft or starter template when problem or language changes
  useEffect(() => {
    setCode(savedDraftForProblemAndLang || starterForLang);
    setCustomInput(defaultSampleInput);
    setSampleRunOutput(null);
    setLatestSubmission(null);
    // Intentionally only reset editor buffer when switching problem or language
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id, language]);

  const unlockedHintCount = userState.unlockedHints?.[problem.id] || 0;
  const isSolutionRevealed = !!userState.revealedSolutions?.[problem.id];
  const problemSubmissions = (userState.submissions || []).filter(
    (s) => s.problemId === problem.id
  );

  const handleCodeChange = (nextCode) => {
    setCode(nextCode);
    saveDraftCode(problem.id, language, nextCode);
  };

  const handleResetCode = () => {
    const starter = problem.starterCode[language] || '';
    setCode(starter);
    saveDraftCode(problem.id, language, starter);
    setSampleRunOutput(null);
  };

  const handleLoadReferenceCode = () => {
    const refCode = problem.optimalSolution.codeByLanguage[language] || '';
    setCode(refCode);
    saveDraftCode(problem.id, language, refCode);
  };

  const handleRunSampleTests = () => {
    const res = runPrototypeSampleTests({
      problem,
      code,
      language,
    });
    setSampleRunOutput(res);
    setLatestSubmission(null);
  };

  const handleSubmitSolution = () => {
    const result = evaluatePrototypeSubmission({
      problem,
      code,
      language,
      scenario: selectedScenario,
    });
    setLatestSubmission(result);
    setSampleRunOutput(null);
    recordSubmission(result, code);
  };

  const currentIdx = ALL_PROBLEMS.findIndex((p) => p.id === problem.id);
  const prevProblem = currentIdx > 0 ? ALL_PROBLEMS[currentIdx - 1] : null;
  const nextProblem =
    currentIdx < ALL_PROBLEMS.length - 1 ? ALL_PROBLEMS[currentIdx + 1] : null;

  return (
    <div className="page-container coding-practice-page">
      {/* Top Problem Navigation Bar */}
      <div className="practice-topbar">
        <div className="breadcrumb-row">
          <Link to="/problems" className="breadcrumb-link">
            ← All Practice Problems
          </Link>
          <span>/</span>
          <span className={`difficulty-tag diff-${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
          <strong>{problem.title}</strong>
        </div>

        <div className="practice-nav-btns">
          {prevProblem && (
            <Link to={`/problems/${prevProblem.id}`} className="btn btn-secondary btn-xs">
              ← Prev Problem
            </Link>
          )}
          {nextProblem && (
            <Link to={`/problems/${nextProblem.id}`} className="btn btn-secondary btn-xs">
              Next Problem →
            </Link>
          )}
        </div>
      </div>

      {/* Explicit Phase 1 Prototype Execution Notice */}
      <div className="prototype-workspace-banner">
        <div>
          <strong>Phase 1 Prototype Assessment Mode:</strong> For security, arbitrary code
          is never executed in the browser. Use <strong>Run Sample Tests</strong> or{' '}
          <strong>Submit Solution</strong> below to test static pattern checks and preview
          the 10-point grading rubric before Phase 2 connects our isolated Judge0 backend!
        </div>
      </div>

      {/* Split Workspace */}
      <div className="practice-split-grid">
        {/* LEFT PANE: Problem Description, Progressive Hints, Optimal Solution, History */}
        <div className="practice-left-pane">
          <div className="pane-tabs">
            <button
              type="button"
              className={`pane-tab-btn ${leftTab === 'description' ? 'active' : ''}`}
              onClick={() => setLeftTab('description')}
            >
              📄 Problem
            </button>
            <button
              type="button"
              className={`pane-tab-btn ${leftTab === 'hints' ? 'active' : ''}`}
              onClick={() => setLeftTab('hints')}
            >
              💡 Hints ({unlockedHintCount}/3)
            </button>
            <button
              type="button"
              className={`pane-tab-btn ${leftTab === 'solution' ? 'active' : ''}`}
              onClick={() => setLeftTab('solution')}
            >
              ★ Optimal Solution
            </button>
            <button
              type="button"
              className={`pane-tab-btn ${leftTab === 'history' ? 'active' : ''}`}
              onClick={() => setLeftTab('history')}
            >
              🕒 Submissions ({problemSubmissions.length})
            </button>
          </div>

          <div className="pane-body">
            {leftTab === 'description' && (
              <div className="problem-spec-content">
                <div className="problem-badges-line">
                  <span className="badge badge-essential">{problem.priority}</span>
                  <span className="badge badge-track">{problem.topicTag}</span>
                  <span className="level-hours-tag">⏱ ~{problem.estimatedMinutes}m</span>
                </div>

                <h2>{problem.title}</h2>
                <p className="problem-statement-text" style={{ whiteSpace: 'pre-line' }}>
                  {problem.description}
                </p>

                <div className="real-world-callout">
                  <strong>Why This Matters in Real Engineering:</strong>{' '}
                  {problem.realWorldContext}
                </div>

                <h3>Sample Test Cases</h3>
                <div className="sample-cases-stack">
                  {problem.sampleTests.map((st, idx) => (
                    <div key={st.id} className="sample-case-box">
                      <div className="sample-case-title">Example {idx + 1}</div>
                      <div className="sample-io-line">
                        <strong>Input:</strong> <code>{st.input}</code>
                      </div>
                      <div className="sample-io-line">
                        <strong>Output:</strong> <code>{st.expectedOutput}</code>
                      </div>
                      <div className="sample-exp-line">
                        <strong>Explanation:</strong> {st.explanation}
                      </div>
                    </div>
                  ))}
                </div>

                <h3>Constraints & Target Complexity</h3>
                <ul className="constraints-list">
                  {problem.constraints.map((c, i) => (
                    <li key={i}>
                      <code>{c}</code>
                    </li>
                  ))}
                </ul>

                <div className="rubric-preview-mini">
                  <h4>10-Point Grading Rubric for This Problem</h4>
                  <ul>
                    <li>
                      <strong>Correctness (0–6 pts):</strong> Public sample tests +{' '}
                      {problem.hiddenTestsCount} hidden assessment test cases
                    </li>
                    <li>
                      <strong>Algorithmic Efficiency (0–2 pts):</strong> Target{' '}
                      <code>{problem.rubric.targetTimeComplexity}</code> Time &{' '}
                      <code>{problem.rubric.targetSpaceComplexity}</code> Space
                    </li>
                    <li>
                      <strong>Edge-Case Handling (0–1 pt):</strong>{' '}
                      {problem.edgeCaseCategories.join(', ')}
                    </li>
                    <li>
                      <strong>Code Clarity & Maintainability (0–1 pt):</strong> Clean
                      structure and naming
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {leftTab === 'hints' && (
              <div className="hints-tab-content">
                <h3>Progressive Hints</h3>
                <p>
                  Unlock hints one step at a time so you can still experience the &ldquo;aha!&rdquo;
                  moment yourself before viewing the full solution.
                </p>

                <div className="hints-stack">
                  {problem.hints.map((hint, idx) => {
                    const isUnlocked = idx < unlockedHintCount;
                    return (
                      <div
                        key={hint.level}
                        className={`hint-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                      >
                        <div className="hint-card-header">
                          <strong>{hint.label}</strong>
                          <span className="badge badge-track">
                            {isUnlocked ? 'Unlocked' : 'Locked'}
                          </span>
                        </div>
                        {isUnlocked ? (
                          <p>{hint.text}</p>
                        ) : (
                          <p className="locked-placeholder">
                            Click the button below to reveal {hint.label}.
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {unlockedHintCount < 3 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => unlockNextHint(problem.id)}
                  >
                    🔓 Unlock Hint {unlockedHintCount + 1} of 3
                  </button>
                ) : (
                  <div className="all-hints-unlocked-box">
                    <p>All 3 hints unlocked! Still stuck?</p>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        revealOptimalSolution(problem.id);
                        setLeftTab('solution');
                      }}
                    >
                      View Optimal Solution Walkthrough →
                    </button>
                  </div>
                )}
              </div>
            )}

            {leftTab === 'solution' && (
              <div className="solution-tab-content">
                {!isSolutionRevealed && problemSubmissions.length === 0 ? (
                  <div className="solution-gate-box">
                    <h3>Try Submitting or Unlocking Hints First!</h3>
                    <p>
                      You learn best when you attempt the problem or read the progressive
                      hints before revealing the complete reference implementation.
                    </p>
                    <div className="solution-gate-actions">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setLeftTab('hints')}
                      >
                        Read Progressive Hints First
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => revealOptimalSolution(problem.id)}
                      >
                        Reveal Optimal Solution Anyway
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="optimal-solution-walkthrough">
                    <span className="badge badge-essential">Reference Solution & Analysis</span>
                    <h3>1. Core Intuition</h3>
                    <p>{problem.optimalSolution.intuition}</p>

                    <h3>2. Step-by-Step Algorithm Walkthrough</h3>
                    <ol className="walkthrough-ordered-list">
                      {problem.optimalSolution.lineByLineWalkthrough.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>

                    <h3>3. Sample Dry Run</h3>
                    <pre className="dry-run-box">{problem.optimalSolution.dryRun}</pre>

                    <h3>4. Complexity Comparison (Brute Force vs Optimal)</h3>
                    <p>{problem.optimalSolution.complexityComparison}</p>

                    <div className="ref-code-header">
                      <h3>
                        5. Optimal Implementation ({language.toUpperCase()})
                      </h3>
                      <button
                        type="button"
                        className="btn btn-secondary btn-xs"
                        onClick={handleLoadReferenceCode}
                      >
                        Copy into Editor →
                      </button>
                    </div>
                    <pre className="ref-code-pre">
                      <code>{problem.optimalSolution.codeByLanguage[language]}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {leftTab === 'history' && (
              <div className="history-tab-content">
                <h3>Submission History for {problem.title}</h3>
                {problemSubmissions.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>
                    No submissions recorded for this problem yet. Click{' '}
                    <strong>Submit Solution</strong> under the editor to evaluate your code!
                  </p>
                ) : (
                  <div className="recent-submissions-list">
                    {problemSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="recent-sub-row clickable"
                        onClick={() => setLatestSubmission(sub)}
                      >
                        <div>
                          <strong>{sub.status}</strong>
                          <div className="recent-sub-meta">
                            <span>{sub.language.toUpperCase()}</span> •{' '}
                            <span>
                              Passed {sub.passedTests}/{sub.totalTests} tests
                            </span>{' '}
                            • <span>{new Date(sub.timestamp).toLocaleTimeString()}</span>
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
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANE: Code Editor, Runner Controls, and Output / Rubric Panel */}
        <div className="practice-right-pane">
          <CodeEditor
            language={language}
            onLanguageChange={setPreferredLanguage}
            code={code}
            onChange={handleCodeChange}
            onReset={handleResetCode}
            onLoadReference={handleLoadReferenceCode}
          />

          {/* Runner Controls & Prototype Scenario Picker */}
          <div className="runner-control-panel">
            <div className="runner-inputs-row">
              <label className="custom-input-field">
                <span>Custom Sample Input:</span>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="viz-text-input"
                />
              </label>

              <label className="custom-input-field">
                <span>Prototype Rubric Mode:</span>
                <select
                  value={selectedScenario}
                  onChange={(e) => setSelectedScenario(e.target.value)}
                  className="editor-lang-select"
                >
                  {PROTOTYPE_SCENARIOS.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {sc.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="runner-buttons-row">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRunSampleTests}
              >
                ▶ Run Sample Tests (Debug)
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmitSolution}
              >
                ✓ Submit Solution (Score / 10)
              </button>
            </div>
          </div>

          {/* Output Panel: Sample Run OR Full 10-Point Rubric Assessment */}
          {sampleRunOutput && (
            <div className="sample-run-output-card">
              <div className="prototype-alert-banner">
                <strong>PROTOTYPE SAMPLE RUN:</strong> {sampleRunOutput.message}
              </div>

              {sampleRunOutput.compilerError ? (
                <div className="compiler-error-box">
                  <pre>{sampleRunOutput.compilerError}</pre>
                </div>
              ) : (
                <div className="sample-tests-table-wrap">
                  <table className="sample-tests-table">
                    <thead>
                      <tr>
                        <th>Sample Case</th>
                        <th>Input</th>
                        <th>Expected</th>
                        <th>Prototype Output</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleRunOutput.sampleResults.map((tr, i) => (
                        <tr key={i}>
                          <td>#{i + 1}</td>
                          <td>
                            <code>{tr.input}</code>
                          </td>
                          <td>
                            <code>{tr.expectedOutput}</code>
                          </td>
                          <td>
                            <code>{tr.actualOutput}</code>
                          </td>
                          <td>
                            <span
                              className={`test-badge ${tr.passed ? 'pass' : 'fail'}`}
                            >
                              {tr.passed ? '✓ Ready' : 'Incomplete'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {latestSubmission && (
            <SubmissionResultCard
              submission={latestSubmission}
              onReviewOptimalSolution={() => {
                revealOptimalSolution(problem.id);
                setLeftTab('solution');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
