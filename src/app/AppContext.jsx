/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { loadUserState, saveUserState, resetUserState } from '../services/storageService.js';
import { ALL_LESSONS } from '../curriculum/lessons/index.js';
import { ALL_PROBLEMS } from '../curriculum/problems/index.js';
import { CURRICULUM_LEVELS } from '../curriculum/curriculumData.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [userState, setUserState] = useState(() => loadUserState());

  useEffect(() => {
    saveUserState(userState);
    document.documentElement.setAttribute('data-theme', userState.theme || 'dark');
  }, [userState]);

  const setPreferredLanguage = useCallback((lang) => {
    setUserState((prev) => ({ ...prev, preferredLanguage: lang }));
  }, []);

  const toggleTheme = useCallback(() => {
    setUserState((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  }, []);

  const setTheme = useCallback((theme) => {
    setUserState((prev) => ({ ...prev, theme }));
  }, []);

  const toggleBeginnerMode = useCallback(() => {
    setUserState((prev) => ({ ...prev, beginnerMode: !prev.beginnerMode }));
  }, []);

  const setLastLessonId = useCallback((lessonId) => {
    if (!lessonId) return;
    setUserState((prev) => {
      if (prev.lastLessonId === lessonId) return prev;
      return { ...prev, lastLessonId: lessonId };
    });
  }, []);

  const toggleLessonComplete = useCallback((lessonId) => {
    setUserState((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const nextCompleted = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return {
        ...prev,
        completedLessons: nextCompleted,
      };
    });
  }, []);

  const recordQuizScore = useCallback((lessonId, score, total) => {
    setUserState((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [lessonId]: {
          score,
          total,
          completedAt: new Date().toISOString(),
        },
      },
    }));
  }, []);

  const saveDraftCode = useCallback((problemId, language, code) => {
    setUserState((prev) => {
      const existing = prev.problemAttempts[problemId] || {
        attemptsCount: 0,
        bestScore: 0,
        solved: false,
        drafts: {},
      };
      return {
        ...prev,
        problemAttempts: {
          ...prev.problemAttempts,
          [problemId]: {
            ...existing,
            lastLanguage: language,
            lastCode: code,
            drafts: {
              ...(existing.drafts || {}),
              [language]: code,
            },
          },
        },
      };
    });
  }, []);

  const recordSubmission = useCallback((submissionResult, code) => {
    setUserState((prev) => {
      const { problemId, totalScore, language } = submissionResult;
      const existing = prev.problemAttempts[problemId] || {
        attemptsCount: 0,
        bestScore: 0,
        solved: false,
        drafts: {},
      };
      const bestScore = Math.max(existing.bestScore || 0, totalScore);
      const solved = existing.solved || totalScore >= 7;

      return {
        ...prev,
        problemAttempts: {
          ...prev.problemAttempts,
          [problemId]: {
            ...existing,
            attemptsCount: (existing.attemptsCount || 0) + 1,
            bestScore,
            solved,
            lastLanguage: language,
            lastCode: code,
            lastSubmittedAt: submissionResult.timestamp,
            drafts: {
              ...(existing.drafts || {}),
              [language]: code,
            },
          },
        },
        submissions: [submissionResult, ...(prev.submissions || [])].slice(0, 50),
      };
    });
  }, []);

  const unlockNextHint = useCallback((problemId) => {
    setUserState((prev) => {
      const current = prev.unlockedHints[problemId] || 0;
      const next = Math.min(3, current + 1);
      return {
        ...prev,
        unlockedHints: {
          ...prev.unlockedHints,
          [problemId]: next,
        },
      };
    });
  }, []);

  const revealOptimalSolution = useCallback((problemId) => {
    setUserState((prev) => ({
      ...prev,
      revealedSolutions: {
        ...prev.revealedSolutions,
        [problemId]: true,
      },
    }));
  }, []);

  const saveRevisionNote = useCallback((lessonId, note) => {
    setUserState((prev) => ({
      ...prev,
      revisionNotes: {
        ...prev.revisionNotes,
        [lessonId]: note,
      },
    }));
  }, []);

  const handleResetProgress = useCallback(() => {
    const fresh = resetUserState();
    setUserState(fresh);
  }, []);

  const analytics = useMemo(() => {
    const totalAvailableLessons = ALL_LESSONS.length;
    const completedLessonsCount = userState.completedLessons.length;
    const courseCompletionPercent =
      totalAvailableLessons > 0
        ? Math.round((completedLessonsCount / totalAvailableLessons) * 100)
        : 0;

    const totalProblemsCount = ALL_PROBLEMS.length;
    const attemptEntries = Object.entries(userState.problemAttempts || {}).filter(
      ([, data]) => (data.attemptsCount || 0) > 0
    );
    const attemptedProblemsCount = attemptEntries.length;
    const solvedProblemsCount = attemptEntries.filter(([, data]) => data.solved).length;

    const averageScore =
      attemptedProblemsCount > 0
        ? Number(
            (
              attemptEntries.reduce((acc, [, data]) => acc + (data.bestScore || 0), 0) /
              attemptedProblemsCount
            ).toFixed(1)
          )
        : 0;

    // Topic-wise analytics & readiness
    const topicGroups = [
      {
        id: 'level-1-foundations',
        name: 'Big O & Foundations',
        lessonIds: ['big-o-intuition', 'complexity-classes-comparison'],
        problemIds: ['sum-of-first-n', 'find-duplicate-efficiency', 'count-pairs-with-sum'],
      },
      {
        id: 'level-2-arrays-strings',
        name: 'Arrays, Strings & Two Pointers',
        lessonIds: ['arrays-memory-and-operations', 'two-pointers-and-sliding-window'],
        problemIds: [
          'two-sum-sorted',
          'max-subarray-kadane',
          'move-zeroes',
          'valid-palindrome-string',
        ],
      },
      {
        id: 'level-5-linked-lists',
        name: 'Linked Lists & Fast/Slow Pointers',
        lessonIds: ['linked-lists-nodes-and-pointers', 'linked-list-reversal-and-runners'],
        problemIds: [
          'reverse-linked-list',
          'middle-of-linked-list',
          'detect-linked-list-cycle',
          'merge-two-sorted-lists',
        ],
      },
    ];

    const topicStats = topicGroups.map((tg) => {
      const lessonsDone = tg.lessonIds.filter((id) =>
        userState.completedLessons.includes(id)
      ).length;
      const problemsSolved = tg.problemIds.filter(
        (pid) => userState.problemAttempts[pid]?.solved
      ).length;
      const scores = tg.problemIds
        .map((pid) => userState.problemAttempts[pid]?.bestScore)
        .filter((s) => typeof s === 'number' && s > 0);
      const avgTopicScore =
        scores.length > 0
          ? Number((scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1))
          : 0;

      const lessonWeight = (lessonsDone / tg.lessonIds.length) * 40;
      const problemWeight = (problemsSolved / tg.problemIds.length) * 60;
      const readinessPercent = Math.round(lessonWeight + problemWeight);

      let statusLabel = 'Not Started';
      if (readinessPercent >= 80) statusLabel = 'Strong (Interview Ready)';
      else if (readinessPercent >= 40) statusLabel = 'In Progress';
      else if (readinessPercent > 0) statusLabel = 'Needs Practice';

      return {
        ...tg,
        lessonsDone,
        lessonsTotal: tg.lessonIds.length,
        problemsSolved,
        problemsTotal: tg.problemIds.length,
        avgTopicScore,
        readinessPercent,
        statusLabel,
      };
    });

    const recommendedNextLesson =
      ALL_LESSONS.find((l) => !userState.completedLessons.includes(l.id)) ||
      ALL_LESSONS[0];

    const completedChaptersCount = CURRICULUM_LEVELS.flatMap((l) => l.chapters).filter(
      (ch) =>
        ch.lessonIds.length > 0 &&
        ch.lessonIds.every((lid) => userState.completedLessons.includes(lid))
    ).length;

    return {
      totalAvailableLessons,
      completedLessonsCount,
      completedChaptersCount,
      courseCompletionPercent,
      totalProblemsCount,
      attemptedProblemsCount,
      solvedProblemsCount,
      averageScore,
      topicStats,
      recommendedNextLesson,
    };
  }, [userState]);

  const value = {
    userState,
    analytics,
    setPreferredLanguage,
    toggleTheme,
    setTheme,
    toggleBeginnerMode,
    setLastLessonId,
    toggleLessonComplete,
    recordQuizScore,
    saveDraftCode,
    recordSubmission,
    unlockNextHint,
    revealOptimalSolution,
    saveRevisionNote,
    handleResetProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
