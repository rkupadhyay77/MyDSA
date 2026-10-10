/**
 * 10-Point Rubric Breakdown Component
 *
 * Displays:
 * - Correctness against tests: 0–6 points
 * - Algorithmic efficiency: 0–2 points
 * - Edge-case handling: 0–1 point
 * - Code clarity and maintainability: 0–1 point
 */

export default function RubricBreakdown({ rubricBreakdown, totalScore, maxScore = 10 }) {
  if (!rubricBreakdown) return null;

  const items = [
    {
      key: 'correctness',
      label: 'Correctness Against Tests',
      ...rubricBreakdown.correctness,
    },
    {
      key: 'efficiency',
      label: 'Algorithmic Efficiency (Time & Space)',
      ...rubricBreakdown.efficiency,
    },
    {
      key: 'edgeCases',
      label: 'Edge-Case Handling',
      ...rubricBreakdown.edgeCases,
    },
    {
      key: 'clarity',
      label: 'Code Clarity & Maintainability',
      ...rubricBreakdown.clarity,
    },
  ];

  return (
    <div className="rubric-card">
      <div className="rubric-header">
        <h4>Automatic 10-Point Rubric Breakdown</h4>
        <span className={`score-pill ${totalScore >= 8 ? 'score-high' : totalScore >= 5 ? 'score-mid' : 'score-low'}`}>
          Total: {totalScore} / {maxScore}
        </span>
      </div>

      <div className="rubric-rows">
        {items.map((item) => {
          const pct = item.max > 0 ? Math.round((item.earned / item.max) * 100) : 0;
          return (
            <div key={item.key} className="rubric-row">
              <div className="rubric-row-top">
                <span className="rubric-criterion">{item.label}</span>
                <span className="rubric-points">
                  <strong>{item.earned}</strong> / {item.max} pts
                </span>
              </div>
              <div className="rubric-bar-track">
                <div
                  className={`rubric-bar-fill ${pct === 100 ? 'full' : pct > 0 ? 'partial' : 'zero'}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="rubric-reason">{item.reason}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
