import RubricBreakdown from './RubricBreakdown.jsx';

export default function SubmissionResultCard({
  submission,
  onReviewOptimalSolution,
}) {
  if (!submission) return null;

  return (
    <div className="submission-result-card">
      {/* Explicit Prototype Mode Notice */}
      <div className="prototype-alert-banner">
        <strong>PROTOTYPE ASSESSMENT RESULT (Phase 1 MVP):</strong> No arbitrary code was
        executed in the browser. This assessment uses deterministic static pattern rules
        and scenario simulation. Real sandboxed execution (Judge0 / isolated worker)
        connects in Phase 2.
      </div>

      {/* Top Summary Banner */}
      <div className="submission-summary-header">
        <div>
          <span className="submission-status-tag">{submission.status}</span>
          <h3 className="submission-score-headline">
            Your solution scored {submission.totalScore}/{submission.maxScore}
          </h3>
          <p className="submission-meta-line">
            Language: <strong>{submission.language.toUpperCase()}</strong> • Tests Passed:{' '}
            <strong>
              {submission.passedTests} / {submission.totalTests}
            </strong>{' '}
            • Runtime: <strong>{submission.timeUsage}</strong> • Memory:{' '}
            <strong>{submission.memoryUsage}</strong>
          </p>
        </div>

        <div className="submission-big-score">
          <span className="big-score-num">{submission.totalScore}</span>
          <span className="big-score-denom">/ {submission.maxScore}</span>
        </div>
      </div>

      {/* Compiler / Runtime Error Panel if any */}
      {submission.compilerError && (
        <div className="compiler-error-box">
          <h4>Compilation / Syntax Diagnostic</h4>
          <pre>{submission.compilerError}</pre>
        </div>
      )}

      {/* Complexity Estimates (Explicitly Labelled as Heuristic) */}
      <div className="complexity-estimates-grid">
        <div className="complexity-estimate-box">
          <span className="estimate-label">Time Complexity (Heuristic Estimate)</span>
          <strong>{submission.estimatedTimeComplexity}</strong>
        </div>
        <div className="complexity-estimate-box">
          <span className="estimate-label">Space Complexity (Heuristic Estimate)</span>
          <strong>{submission.estimatedSpaceComplexity}</strong>
        </div>
        <p className="complexity-disclaimer">{submission.complexityNote}</p>
      </div>

      {/* 10-Point Rubric Breakdown */}
      <RubricBreakdown
        rubricBreakdown={submission.rubricBreakdown}
        totalScore={submission.totalScore}
        maxScore={submission.maxScore}
      />

      {/* Constructive Feedback Sections */}
      <div className="feedback-columns">
        <div className="feedback-box feedback-well">
          <h4>What you did well</h4>
          <ul>
            {submission.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="feedback-box feedback-improve">
          <h4>What needs improvement</h4>
          <ul>
            {submission.improvements.map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Attempt Hints & Optimal Solution Reveal CTA */}
      <div className="feedback-next-steps">
        <div>
          <h4>Hints for your next attempt</h4>
          <ul>
            {submission.nextAttemptHints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        {onReviewOptimalSolution && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onReviewOptimalSolution}
          >
            Review Optimal Reference Solution & Walkthrough →
          </button>
        )}
      </div>

      {/* Visible Sample Test Case Results */}
      {submission.sampleResults && submission.sampleResults.length > 0 && (
        <div className="sample-results-section">
          <h4>Visible Sample Test Cases</h4>
          <div className="sample-tests-table-wrap">
            <table className="sample-tests-table">
              <thead>
                <tr>
                  <th>Test Case</th>
                  <th>Input</th>
                  <th>Expected Output</th>
                  <th>Actual Output</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {submission.sampleResults.map((tr, idx) => (
                  <tr key={tr.id || idx}>
                    <td>Sample #{idx + 1}</td>
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
                      <span className={`test-badge ${tr.passed ? 'pass' : 'fail'}`}>
                        {tr.passed ? '✓ Passed' : '✗ Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
