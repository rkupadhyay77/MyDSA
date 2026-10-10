/**
 * Storage Service — Phase 1 Prototype Persistence
 *
 * Uses browser localStorage with a clean async-ready interface so that
 * Phase 4 can swap or synchronise this layer with a real backend database
 * without rewriting React components.
 */

const STORAGE_KEY = 'mydsa_user_state_v1';

export const DEFAULT_USER_STATE = {
  storageMode: 'local_prototype', // Clearly distinguishes prototype localStorage from cloud account storage
  preferredLanguage: 'swift', // 'swift' | 'python' | 'java' | 'cpp' | 'javascript'
  theme: 'dark', // 'dark' | 'light'
  beginnerMode: true, // "Explain Like I'm a Beginner" mode
  streakDays: 3,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  lastLessonId: 'big-o-intuition',
  completedLessons: [], // Array of lesson IDs explicitly marked complete by the learner
  quizScores: {}, // { [lessonId]: { score, total, completedAt } }
  problemAttempts: {}, // { [problemId]: { attemptsCount, bestScore, solved, lastLanguage, lastCode, lastSubmittedAt } }
  submissions: [], // Array of submission records (most recent first)
  unlockedHints: {}, // { [problemId]: number (max hint level unlocked: 1, 2, 3) }
  revealedSolutions: {}, // { [problemId]: boolean }
  revisionNotes: {}, // { [lessonId]: string }
};

export function loadUserState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_USER_STATE };
    }
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_USER_STATE,
      ...parsed,
      storageMode: 'local_prototype',
    };
  } catch (err) {
    console.warn('Failed to read MyDSA state from localStorage:', err);
    return { ...DEFAULT_USER_STATE };
  }
}

export function saveUserState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (err) {
    console.warn('Failed to save MyDSA state to localStorage:', err);
    return false;
  }
}

export function resetUserState() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to reset MyDSA state:', err);
  }
  return { ...DEFAULT_USER_STATE };
}

export function exportUserStateJson(state) {
  return JSON.stringify(state, null, 2);
}
