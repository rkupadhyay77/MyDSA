/**
 * Phase 1 Prototype Rubric & Static Structure Inspector
 *
 * IMPORTANT ARCHITECTURE NOTE:
 * Per security requirements, arbitrary user code is NEVER executed in the browser.
 * In Phase 1 (Frontend MVP), this evaluator performs deterministic static code pattern
 * inspection and generates clearly labelled Prototype Assessment Results to test the
 * 10-point rubric UI, feedback cards, and progress tracking before Phase 2 connects
 * the isolated sandboxed backend runner (e.g., Judge0).
 */

export const PROTOTYPE_SCENARIOS = [
  {
    id: 'auto',
    label: 'Auto-Inspect My Code (Static Pattern Preview)',
    description: 'Analyses your editor code structure against problem rubric patterns.',
  },
  {
    id: 'optimal',
    label: 'Simulate 10/10 Optimal Pass',
    description: 'Previews full marks across Correctness (6/6), Efficiency (2/2), Edge Cases (1/1), and Clarity (1/1).',
  },
  {
    id: 'suboptimal',
    label: 'Simulate 7/10 Correct but Suboptimal (TLE on Large Input)',
    description: 'Previews a solution that passes normal tests but loses Efficiency points due to nested loops.',
  },
  {
    id: 'edge_case',
    label: 'Simulate 6/10 Edge-Case Failure',
    description: 'Previews a solution that works on sample inputs but fails boundary edge cases.',
  },
  {
    id: 'compile_error',
    label: 'Simulate 0/10 Compilation / Syntax Error',
    description: 'Previews compiler diagnostic output when syntax or types are invalid.',
  },
];

function stripCommentsAndWhitespace(code) {
  return code
    .replace(/\/\/.*$/gm, '')
    .replace(/#.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim();
}

function hasBalancedDelimiters(code) {
  let braces = 0;
  let parens = 0;
  for (const ch of code) {
    if (ch === '{') braces++;
    if (ch === '}') braces--;
    if (ch === '(') parens++;
    if (ch === ')') parens--;
    if (braces < 0 || parens < 0) return false;
  }
  return braces === 0 && parens === 0;
}

export function runPrototypeSampleTests({ problem, code, language }) {
  const cleaned = stripCommentsAndWhitespace(code);
  const starterCleaned = stripCommentsAndWhitespace(problem.starterCode[language] || '');

  if (!cleaned || cleaned === starterCleaned || cleaned.endsWith('pass') || cleaned.endsWith('return 0;') || cleaned.endsWith('return false;')) {
    return {
      isPrototypePreview: true,
      mode: 'sample_run',
      status: 'INCOMPLETE_STARTER',
      language,
      message:
        'Prototype Sample Runner: Your editor still contains the starter template placeholder. Write your implementation or click "Load Reference Solution" to preview passing sample tests.',
      sampleResults: problem.sampleTests.map((t) => ({
        ...t,
        passed: false,
        actualOutput: '(Unchanged starter template / empty return)',
        executionTimeMs: '— (Prototype)',
      })),
    };
  }

  if (!hasBalancedDelimiters(code)) {
    return {
      isPrototypePreview: true,
      mode: 'sample_run',
      status: 'COMPILATION_ERROR',
      language,
      compilerError: `SyntaxError (${language.toUpperCase()} Static Check): Unbalanced parentheses '(' or curly braces '{' detected in source code.`,
      sampleResults: [],
    };
  }

  return {
    isPrototypePreview: true,
    mode: 'sample_run',
    status: 'SAMPLE_PREVIEW_READY',
    language,
    message:
      'PROTOTYPE SAMPLE RUN: Static structure valid. Real code compilation & stdout verification will execute via the isolated Phase 2 backend sandbox.',
    sampleResults: problem.sampleTests.map((t) => ({
      ...t,
      passed: true,
      actualOutput: `${t.expectedOutput} (Simulated Prototype Match)`,
      executionTimeMs: '2 ms (Simulated)',
    })),
  };
}

export function evaluatePrototypeSubmission({
  problem,
  code,
  language,
  scenario = 'auto',
}) {
  const cleaned = stripCommentsAndWhitespace(code);
  const starterCleaned = stripCommentsAndWhitespace(problem.starterCode[language] || '');

  // Determine effective scenario when 'auto' is selected
  let effectiveScenario = scenario;
  if (scenario === 'auto') {
    if (!hasBalancedDelimiters(code)) {
      effectiveScenario = 'compile_error';
    } else if (!cleaned || cleaned === starterCleaned) {
      effectiveScenario = 'incomplete';
    } else {
      const subKeywords = problem.rubric?.efficiencyPatterns?.suboptimalKeywords || [];
      const optKeywords = problem.rubric?.efficiencyPatterns?.optimalKeywords || [];
      const hasSuboptimal = subKeywords.some((kw) => code.includes(kw));
      const hasOptimal = optKeywords.some((kw) => code.includes(kw));

      if (hasSuboptimal && !hasOptimal) {
        effectiveScenario = 'suboptimal';
      } else if (hasOptimal) {
        effectiveScenario = 'optimal';
      } else {
        effectiveScenario = 'edge_case';
      }
    }
  }

  const totalTests = problem.sampleTests.length + (problem.hiddenTestsCount || 6);

  if (effectiveScenario === 'compile_error') {
    return {
      id: `sub-${Date.now()}`,
      problemId: problem.id,
      problemTitle: problem.title,
      language,
      timestamp: new Date().toISOString(),
      isPrototypePreview: true,
      scenarioUsed: effectiveScenario,
      status: 'Compilation Error',
      totalScore: 0,
      maxScore: 10,
      passedTests: 0,
      totalTests,
      compilerError:
        'error: expected "}" or ")" at end of declaration block. Verify that all brackets and return statements match the function signature.',
      timeUsage: 'N/A',
      memoryUsage: 'N/A',
      estimatedTimeComplexity: 'N/A (Did not compile)',
      estimatedSpaceComplexity: 'N/A',
      complexityNote: 'Heuristic static estimate — code did not compile.',
      rubricBreakdown: {
        correctness: { earned: 0, max: 6, reason: '0 tests executed due to compilation error.' },
        efficiency: { earned: 0, max: 2, reason: 'Efficiency can only be graded on compiling solutions.' },
        edgeCases: { earned: 0, max: 1, reason: 'Edge-case tests could not run.' },
        clarity: { earned: 0, max: 1, reason: 'Syntax errors prevented structural evaluation.' },
      },
      sampleResults: [],
      strengths: ['You started structuring your solution in ' + language.toUpperCase() + '.'],
      improvements: [
        'Fix the syntax/delimiter error shown in the compiler diagnostic panel.',
        'Ensure your function returns the exact type declared in the signature.',
      ],
      nextAttemptHints: [
        problem.hints[0]?.text || 'Check the function signature and starter template.',
      ],
    };
  }

  if (effectiveScenario === 'incomplete') {
    return {
      id: `sub-${Date.now()}`,
      problemId: problem.id,
      problemTitle: problem.title,
      language,
      timestamp: new Date().toISOString(),
      isPrototypePreview: true,
      scenarioUsed: effectiveScenario,
      status: 'Incomplete Implementation',
      totalScore: 1,
      maxScore: 10,
      passedTests: 0,
      totalTests,
      compilerError: null,
      timeUsage: '1 ms (Prototype)',
      memoryUsage: '14.2 MB (Prototype)',
      estimatedTimeComplexity: 'Unimplemented Starter Template',
      estimatedSpaceComplexity: 'O(1)',
      complexityNote: 'Static heuristic check detected unchanged starter template.',
      rubricBreakdown: {
        correctness: { earned: 0, max: 6, reason: 'Starter template returned placeholder values on all test cases.' },
        efficiency: { earned: 0, max: 2, reason: 'Core algorithm logic has not been written yet.' },
        edgeCases: { earned: 0, max: 1, reason: 'Boundary inputs failed.' },
        clarity: { earned: 1, max: 1, reason: 'Valid function signature and clean formatting.' },
      },
      sampleResults: problem.sampleTests.map((t) => ({
        ...t,
        passed: false,
        actualOutput: 'Placeholder return',
      })),
      strengths: ['Function signature and syntax structure are valid.'],
      improvements: [
        'Your editor still holds the starter code template without the algorithm implementation.',
        `Aim for ${problem.rubric.targetTimeComplexity} time complexity and ${problem.rubric.targetSpaceComplexity} space complexity.`,
      ],
      nextAttemptHints: [
        problem.hints[0]?.text,
        problem.hints[1]?.text,
      ].filter(Boolean),
    };
  }

  if (effectiveScenario === 'suboptimal') {
    return {
      id: `sub-${Date.now()}`,
      problemId: problem.id,
      problemTitle: problem.title,
      language,
      timestamp: new Date().toISOString(),
      isPrototypePreview: true,
      scenarioUsed: effectiveScenario,
      status: 'Suboptimal Efficiency (Correct on Small Inputs)',
      totalScore: 7,
      maxScore: 10,
      passedTests: totalTests - 2,
      totalTests,
      compilerError: null,
      timeUsage: '840 ms (Simulated Large Input)',
      memoryUsage: '16.4 MB (Prototype)',
      estimatedTimeComplexity: `Heuristic Estimate: ${problem.rubric.suboptimalTimeComplexity || 'O(n²)'}`,
      estimatedSpaceComplexity: `Heuristic Estimate: ${problem.rubric.targetSpaceComplexity || 'O(1)'}`,
      complexityNote:
        'Heuristic static estimate based on loop/operation structure. Exact runtime profiling requires the Phase 2 execution sandbox.',
      rubricBreakdown: {
        correctness: {
          earned: 5,
          max: 6,
          reason: `Passed ${totalTests - 2}/${totalTests} tests. Timed out on 2 large-scale stress tests.`,
        },
        efficiency: {
          earned: 0,
          max: 2,
          reason: `Detected ${problem.rubric.suboptimalTimeComplexity} approach instead of target ${problem.rubric.targetTimeComplexity}.`,
        },
        edgeCases: {
          earned: 1,
          max: 1,
          reason: `Handled boundary cases (${problem.edgeCaseCategories.slice(0, 2).join(', ')}).`,
        },
        clarity: {
          earned: 1,
          max: 1,
          reason: 'Code is readable with clear variable names and indentation.',
        },
      },
      sampleResults: problem.sampleTests.map((t) => ({
        ...t,
        passed: true,
        actualOutput: t.expectedOutput,
      })),
      strengths: [
        'Your solution works correctly for normal and small inputs.',
        'Boundary and edge-case inputs produce the expected output.',
        'Your implementation is easy to follow and cleanly structured.',
      ],
      improvements: [
        `Your approach uses extra passes or nested work, giving ${problem.rubric.suboptimalTimeComplexity} time complexity instead of ${problem.rubric.targetTimeComplexity}.`,
        'Important distinction: Your solution is logically CORRECT on functional tests, but INEFFICIENT when n grows large.',
      ],
      nextAttemptHints: [
        problem.hints[1]?.text,
        problem.hints[2]?.text,
      ].filter(Boolean),
    };
  }

  if (effectiveScenario === 'edge_case') {
    return {
      id: `sub-${Date.now()}`,
      problemId: problem.id,
      problemTitle: problem.title,
      language,
      timestamp: new Date().toISOString(),
      isPrototypePreview: true,
      scenarioUsed: effectiveScenario,
      status: 'Partial Pass (Edge Case Needs Attention)',
      totalScore: 6,
      maxScore: 10,
      passedTests: totalTests - 3,
      totalTests,
      compilerError: null,
      timeUsage: '18 ms (Prototype)',
      memoryUsage: '15.1 MB (Prototype)',
      estimatedTimeComplexity: `Heuristic Estimate: ${problem.rubric.targetTimeComplexity}`,
      estimatedSpaceComplexity: `Heuristic Estimate: ${problem.rubric.targetSpaceComplexity}`,
      complexityNote:
        'Heuristic static estimate — verify with Phase 2 backend test suite.',
      rubricBreakdown: {
        correctness: {
          earned: 4,
          max: 6,
          reason: `Passed sample tests, but failed hidden boundary test cases.`,
        },
        efficiency: {
          earned: 1,
          max: 2,
          reason: 'Good overall structure, though key pattern keywords were only partially detected.',
        },
        edgeCases: {
          earned: 0,
          max: 1,
          reason: `Check edge cases: ${problem.edgeCaseCategories.join(', ')}.`,
        },
        clarity: {
          earned: 1,
          max: 1,
          reason: 'Readable formatting and structure.',
        },
      },
      sampleResults: problem.sampleTests.map((t, idx) => ({
        ...t,
        passed: idx < problem.sampleTests.length - 1,
        actualOutput: idx < problem.sampleTests.length - 1 ? t.expectedOutput : 'Edge-case mismatch (Prototype)',
      })),
      strengths: [
        'Your solution handles standard inputs and avoids obvious syntax issues.',
        'Good variable naming and indentation.',
      ],
      improvements: [
        `One or more edge cases need verification: ${problem.edgeCaseCategories.join('; ')}.`,
        `Double-check that your algorithm uses the expected pattern (${problem.topicTag}).`,
      ],
      nextAttemptHints: [
        problem.hints[2]?.text || problem.hints[0]?.text,
      ].filter(Boolean),
    };
  }

  // Optimal scenario (10/10)
  return {
    id: `sub-${Date.now()}`,
    problemId: problem.id,
    problemTitle: problem.title,
    language,
    timestamp: new Date().toISOString(),
    isPrototypePreview: true,
    scenarioUsed: 'optimal',
    status: 'Optimal Solution (Prototype Rubric Preview)',
    totalScore: 10,
    maxScore: 10,
    passedTests: totalTests,
    totalTests,
    compilerError: null,
    timeUsage: '4 ms (Prototype)',
    memoryUsage: '14.8 MB (Prototype)',
    estimatedTimeComplexity: `Heuristic Estimate: ${problem.rubric.targetTimeComplexity} (Optimal)`,
    estimatedSpaceComplexity: `Heuristic Estimate: ${problem.rubric.targetSpaceComplexity} (Optimal)`,
    complexityNote:
      'Heuristic static estimate matching target pattern. Real sandboxed execution will verify runtime in Phase 2.',
    rubricBreakdown: {
      correctness: {
        earned: 6,
        max: 6,
        reason: `All ${totalTests}/${totalTests} public and hidden test cases passed in prototype preview.`,
      },
      efficiency: {
        earned: 2,
        max: 2,
        reason: `Matches optimal ${problem.rubric.targetTimeComplexity} time and ${problem.rubric.targetSpaceComplexity} space pattern.`,
      },
      edgeCases: {
        earned: 1,
        max: 1,
        reason: `Handles boundary cases (${problem.edgeCaseCategories.join(', ')}).`,
      },
      clarity: {
        earned: 1,
        max: 1,
        reason: 'Clean, idiomatic structure with clear control flow.',
      },
    },
    sampleResults: problem.sampleTests.map((t) => ({
      ...t,
      passed: true,
      actualOutput: t.expectedOutput,
    })),
    strengths: [
      `Achieves optimal ${problem.rubric.targetTimeComplexity} time complexity and ${problem.rubric.targetSpaceComplexity} space complexity.`,
      'Cleanly handles boundary inputs and edge cases.',
      `Follows idiomatic ${language.toUpperCase()} conventions.`,
    ],
    improvements: [
      'Great work! Compare your implementation with the Reference Optimal Solution below to see if you can make the variable names even more self-documenting during a live interview.',
    ],
    nextAttemptHints: [
      'Try explaining your solution out loud in 60 seconds as if speaking to an interviewer!',
    ],
  };
}
