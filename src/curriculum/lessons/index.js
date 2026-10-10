import { BIG_O_LESSONS } from './bigOLessons.js';
import { ARRAY_LESSONS } from './arrayLessons.js';
import { LINKED_LIST_LESSONS } from './linkedListLessons.js';

export const ALL_LESSONS = [
  ...BIG_O_LESSONS,
  ...ARRAY_LESSONS,
  ...LINKED_LIST_LESSONS,
];

export function getLessonById(lessonId) {
  return ALL_LESSONS.find((l) => l.id === lessonId) || null;
}

export function getLessonsByChapterId(chapterId) {
  return ALL_LESSONS.filter((l) => l.chapterId === chapterId);
}
