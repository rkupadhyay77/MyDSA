import { BIG_O_PROBLEMS } from './bigOProblems.js';
import { ARRAY_PROBLEMS } from './arrayProblems.js';
import { LINKED_LIST_PROBLEMS } from './linkedListProblems.js';

export const ALL_PROBLEMS = [
  ...BIG_O_PROBLEMS,
  ...ARRAY_PROBLEMS,
  ...LINKED_LIST_PROBLEMS,
];

export function getProblemById(problemId) {
  return ALL_PROBLEMS.find((p) => p.id === problemId) || null;
}

export function getProblemsByChapterId(chapterId) {
  return ALL_PROBLEMS.filter((p) => p.chapterId === chapterId);
}
