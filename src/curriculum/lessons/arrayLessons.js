/**
 * Level 2 Lessons: Arrays & Strings
 */

export const ARRAY_LESSONS = [
  {
    id: 'arrays-memory-and-operations',
    chapterId: 'chapter-arrays-core',
    levelId: 'level-2-arrays-strings',
    lessonNumber: '2.1',
    title: 'How Arrays Work in Memory: Indexing, Insertion, and Deletion',
    estimatedMinutes: 25,
    priority: 'Essential',
    isCoreInterview: true,
    nextLessonId: 'two-pointers-and-sliding-window',
    prevLessonId: 'complexity-classes-comparison',
    practiceProblemIds: [
      'two-sum-sorted',
      'max-subarray-kadane',
      'move-zeroes',
      'valid-palindrome-string',
    ],
    objectives: [
      'Visualise why arrays live in contiguous (side-by-side) slots in computer memory (RAM).',
      'Understand why reading `arr[i]` is instant O(1), regardless of whether `i` is 0 or 1,000,000.',
      'See why inserting or deleting at the front or middle of an array costs O(n) due to element shifting.',
      'Understand Swift Array value semantics (Copy-on-Write) vs reference arrays in other languages.',
    ],
    analogy: {
      title: 'A Row of Numbered Theatre Seats',
      summary:
        'An array is like a contiguous row of seats in a movie theatre numbered 0, 1, 2, 3, 4... with no gaps allowed.',
      details: [
        'Instant Lookup (O(1)): If your ticket says Seat #4, you walk straight to Seat #4. You do not need to ask the people in Seats 0, 1, 2, and 3 where Seat 4 is.',
        'Inserting at the Front (O(n)): Suppose Seats 0 through 4 are full, and a VIP insists on sitting in Seat 0. Everyone in Seat 4 moves to 5, Seat 3 moves to 4, Seat 2 moves to 3, Seat 1 moves to 2, and Seat 0 moves to 1! Every single person had to shift right.',
        'Deleting from the Front (O(n)): If Seat 0 leaves and theatre rules forbid empty gaps, everyone from Seat 1 to the end must shift one seat to the left.',
      ],
    },
    explanation: [
      {
        heading: '1. Why `arr[i]` Is O(1): The Memory Address Formula',
        body: 'When you create an array of 64-bit integers (8 bytes each) starting at RAM address 1000, the computer places `arr[0]` at 1000, `arr[1]` at 1008, `arr[2]` at 1016, and so on. To read `arr[i]`, the CPU simply calculates `1000 + (i * 8)` and jumps directly to that RAM address in 1 step! That is why random access by index is O(1).',
      },
      {
        heading: '2. Appending at the End vs Inserting in the Middle',
        body: 'Adding a new item to the very end of a dynamic array (`append` / `push_back`) doesn’t require shifting any existing items—so it takes O(1) amortised time. However, inserting at index 0 (`insert(at: 0)`) or removing from index 0 (`removeFirst()`) forces all remaining n - 1 elements to slide over by one slot, which costs O(n) time.',
      },
      {
        heading: '3. Important for Swift Developers: Value Types & Copy-on-Write',
        body: 'In Swift, `Array` is a `struct` (a value type), whereas in Java, Python, and JavaScript, arrays/lists are reference types. Does passing a Swift `Array` to a function copy all n elements immediately? No! Swift uses Copy-on-Write (CoW): copying only happens if you mutate the array while multiple variables share the buffer. When mutating an array in-place in Swift interviews, pass it as `inout [Int]`.',
      },
    ],
    beginnerModeExplanation: {
      title: "Explain Like I'm a Beginner: Array Speed Cheat Sheet",
      points: [
        'Reading or changing an item by its index number (`arr[3] = 99`): Always O(1) Instant.',
        'Adding or removing at the VERY END (`append` / `popLast`): O(1) Instant.',
        'Adding or removing at the BEGINNING or MIDDLE (`insert(at: 0)` / `remove(at: 0)`): O(n) Slow, because every element after it has to scoot over.',
        'Searching for a value in an unsorted array: O(n), because it might be hiding at the very last index.',
      ],
    },
    visualizerConfig: {
      type: 'array',
      defaultMode: 'operations',
      title: 'Interactive Array Memory, Insert, Delete & Two-Pointer Visualizer',
    },
    workedExample: {
      title: 'In-Place Array Compaction: Moving All Zeroes to the End',
      problemStatement: 'Given nums = [0, 1, 0, 3, 12], move all 0s to the end while keeping non-zero elements in their relative order, in-place.',
      sampleInput: 'nums = [0, 1, 0, 3, 12]',
      expectedOutput: '[1, 3, 12, 0, 0]',
      steps: [
        {
          step: 1,
          title: 'Why `remove(at:)` Inside a Loop Is a Trap (O(n²))',
          detail: 'If you call `remove(at: i)` every time you see a 0, each removal shifts all remaining elements left in O(n) time. If half the array is zeroes, that becomes O(n²)!',
        },
        {
          step: 2,
          title: 'The Write-Pointer Trick (O(n) Time, O(1) Space)',
          detail: 'Keep a pointer `writeIndex = 0`. Scan through the array with `readIndex`. Whenever `nums[readIndex] != 0`, swap `nums[writeIndex]` and `nums[readIndex]`, then increment `writeIndex`. Each element is touched at most once!',
        },
      ],
    },
    codeWalkthrough: {
      title: 'In-Place Array Manipulation Without O(n²) Shifting',
      codeByLanguage: {
        swift: `// Swift: Move Zeroes In-Place in O(n) Time, O(1) Space
// Note: 'inout' allows mutating the caller's array directly without allocation
func moveZeroes(_ nums: inout [Int]) {
    var writeIndex = 0
    for readIndex in 0..<nums.count {
        if nums[readIndex] != 0 {
            nums.swapAt(writeIndex, readIndex)
            writeIndex += 1
        }
    }
}`,
        python: `# Python: Move Zeroes In-Place in O(n) Time, O(1) Space
def move_zeroes(nums: list[int]) -> None:
    write_index = 0
    for read_index in range(len(nums)):
        if nums[read_index] != 0:
            nums[write_index], nums[read_index] = nums[read_index], nums[write_index]
            write_index += 1`,
        java: `// Java: Move Zeroes In-Place in O(n) Time, O(1) Space
public class ArrayOperations {
    public static void moveZeroes(int[] nums) {
        int writeIndex = 0;
        for (int readIndex = 0; readIndex < nums.length; readIndex++) {
            if (nums[readIndex] != 0) {
                int temp = nums[writeIndex];
                nums[writeIndex] = nums[readIndex];
                nums[readIndex] = temp;
                writeIndex++;
            }
        }
    }
}`,
        cpp: `// C++: Move Zeroes In-Place in O(n) Time, O(1) Space
#include <vector>
#include <utility>
using namespace std;

void moveZeroes(vector<int>& nums) {
    size_t writeIndex = 0;
    for (size_t readIndex = 0; readIndex < nums.size(); ++readIndex) {
        if (nums[readIndex] != 0) {
            swap(nums[writeIndex], nums[readIndex]);
            writeIndex++;
        }
    }
}`,
        javascript: `// JavaScript: Move Zeroes In-Place in O(n) Time, O(1) Space
function moveZeroes(nums) {
  let writeIndex = 0;
  for (let readIndex = 0; readIndex < nums.length; readIndex++) {
    if (nums[readIndex] !== 0) {
      const temp = nums[writeIndex];
      nums[writeIndex] = nums[readIndex];
      nums[readIndex] = temp;
      writeIndex++;
    }
  }
}`,
      },
      lineExplanations: [
        {
          lines: '3-4',
          title: 'Two Indices: `writeIndex` and `readIndex`',
          explanation:
            '`writeIndex` always points to the next slot where a non-zero number belongs. `readIndex` scans every element from left to right.',
        },
        {
          lines: '5-8',
          title: 'O(1) Swap Instead of O(n) Removal',
          explanation:
            'Whenever `nums[readIndex]` is non-zero, we swap it into `writeIndex` and advance `writeIndex` by 1. All zeroes naturally bubble behind `writeIndex` in a single O(n) pass!',
        },
      ],
    },
    complexity: {
      time: 'Index access: O(1) | Append at end: O(1) amortised | Insert/Delete at index i: O(n) | Single-pass compaction: O(n)',
      space: 'O(1) Auxiliary Space when mutating in-place with index pointers.',
      beginnerSummary:
        'Never call `remove(at:)` or `insert(at:)` inside a loop if you can use a `writeIndex` pointer to overwrite or swap elements in a single O(n) pass.',
    },
    commonMistakes: [
      {
        mistake: 'Index Out of Bounds Error (`nums[nums.count]`).',
        whyItHappens: 'Forgetting that an array of length `n` has valid indices `0` through `n - 1`.',
        fix: 'Always verify that your last valid index is `nums.count - 1` (or `nums.length - 1`), and guard against empty arrays (`if nums.isEmpty { return }`).',
      },
      {
        mistake: 'Calling `removeFirst()` in a `while` loop to process a queue.',
        whyItHappens: 'Using a standard array as a FIFO queue by removing index 0 each step.',
        fix: 'Each `removeFirst()` shifts the entire array in O(n). Processing n items takes O(n²)! Either advance a `headIndex` integer pointer or use a proper Queue/Deque.',
      },
    ],
    quiz: [
      {
        id: 'q1-array-mem',
        question: 'Why does accessing `arr[5000]` take the exact same O(1) time as accessing `arr[0]`?',
        options: [
          'The computer caches index 5000 automatically',
          'Array elements are stored contiguously in RAM, so the CPU computes `baseAddress + 5000 * elementSize` in one math step',
          'The CPU scans from 0 to 5000 so quickly that we ignore it',
          'Arrays use binary search to find index 5000',
        ],
        correctIndex: 1,
        explanation:
          'Contiguous memory allows direct address calculation (`base + index * stride`) in a single CPU instruction.',
      },
      {
        id: 'q2-array-mem',
        question: 'What is the time complexity of inserting a new element at index 0 of an array containing n elements?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctIndex: 2,
        explanation:
          'All n existing elements must shift one position to the right to free up index 0, taking O(n) time.',
      },
    ],
    summaryNotes: [
      'Arrays store elements contiguously in memory, unlocking O(1) index access.',
      'Inserting or deleting anywhere except the end requires shifting subsequent elements (O(n)).',
      'Use `readIndex` and `writeIndex` pointers to filter or compact arrays in-place in O(n) time and O(1) space.',
    ],
  },
  {
    id: 'two-pointers-and-sliding-window',
    chapterId: 'chapter-arrays-core',
    levelId: 'level-2-arrays-strings',
    lessonNumber: '2.2',
    title: 'Two Pointers, Sliding Window & Kadane’s Subarray Pattern',
    estimatedMinutes: 30,
    priority: 'Essential',
    isCoreInterview: true,
    nextLessonId: 'linked-lists-nodes-and-pointers',
    prevLessonId: 'arrays-memory-and-operations',
    practiceProblemIds: [
      'two-sum-sorted',
      'max-subarray-kadane',
      'move-zeroes',
      'valid-palindrome-string',
    ],
    objectives: [
      'Master opposite-end Two Pointers (`left` and `right`) for sorted arrays and palindromes.',
      'Understand how a Sliding Window avoids recomputing sums from scratch.',
      'Learn the intuition behind Kadane’s Algorithm for finding the maximum contiguous subarray sum in O(n).',
    ],
    analogy: {
      title: 'Tuning Dual Volume Knobs vs Guessing Every Combination',
      summary:
        'Imagine finding two numbers in a sorted list `[1, 3, 4, 6, 8, 11]` that add up to `10`.',
      details: [
        'Instead of testing every possible pair, put your Left hand on the smallest number (`1`) and your Right hand on the largest number (`11`).',
        'Their sum is `1 + 11 = 12`, which is TOO BIG (> 10). Since the list is sorted, moving your Left hand right would only make the sum even bigger! So you MUST move your Right hand one step left to `8`.',
        'Now `1 + 8 = 9`, which is TOO SMALL (< 10). Move your Left hand right to `3`. Next step: `3 + 8 = 11` (too big -> move Right to `6`), then `4 + 6 = 10` — Target found in 4 steps!',
      ],
    },
    explanation: [
      {
        heading: '1. Opposite-Direction Two Pointers (`left = 0`, `right = n - 1`)',
        body: 'Whenever an array is sorted (or you are checking symmetry like a Palindrome string), place `left` at the start and `right` at the end. On each iteration, either `left` increments or `right` decrements. Because they step toward each other and stop when `left >= right`, the loop runs at most n times: O(n) Time and O(1) Space!',
      },
      {
        heading: '2. Kadane’s Algorithm: Should I Extend the Previous Subarray or Start Fresh?',
        body: 'When looking for the contiguous subarray with the largest sum (e.g., in `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`), ask one question at every element `x`: "Does adding the previous running sum `currentSum` help `x`, or is `currentSum` negative baggage that drags `x` down?"\nIf `currentSum < 0`, throw it away and start fresh at `x`! Formally: `currentSum = max(x, currentSum + x)`. Track the highest `currentSum` seen in `maxSum`.',
      },
    ],
    beginnerModeExplanation: {
      title: "Explain Like I'm a Beginner: Why Kadane's Algorithm Works",
      points: [
        'Think of `currentSum` as your team’s score streak.',
        'If your running total drops below zero (becomes negative), carrying it forward to the next number will ONLY make the next number smaller!',
        'So whenever your running sum is negative, reset it to 0 before adding the next number—while always saving your all-time high score in `bestSum`.',
      ],
    },
    visualizerConfig: {
      type: 'array',
      defaultMode: 'two-pointers',
      title: 'Step-by-Step Two Pointers Convergence Visualizer',
    },
    workedExample: {
      title: 'Two Sum II on a Sorted Array',
      problemStatement: 'Given sorted numbers = [2, 4, 6, 9, 13] and target = 15, return the 0-based indices of the two numbers that add up to 15.',
      sampleInput: 'numbers = [2, 4, 6, 9, 13], target = 15',
      expectedOutput: '[1, 4] (because numbers[1] + numbers[4] = 4 + 13 = 17? Wait: numbers[2] + numbers[3] = 6 + 9 = 15 -> [2, 3])',
      steps: [
        {
          step: 1,
          title: 'Initialise Pointers: left = 0 (val 2), right = 4 (val 13)',
          detail: 'Sum = 2 + 13 = 15! Wait—in this case 2 + 13 equals 15 on the very first check! Let’s trace target = 13 instead: 2 + 13 = 15 (> 13), so decrement right to index 3 (val 9).',
        },
        {
          step: 2,
          title: 'left = 0 (val 2), right = 3 (val 9)',
          detail: 'Sum = 2 + 9 = 11 (< 13). Since 11 is too small, increment left to index 1 (val 4).',
        },
        {
          step: 3,
          title: 'left = 1 (val 4), right = 3 (val 9)',
          detail: 'Sum = 4 + 9 = 13 == target! Return indices [1, 3].',
        },
      ],
    },
    codeWalkthrough: {
      title: 'Two Sum on Sorted Array (O(n) Time, O(1) Space)',
      codeByLanguage: {
        swift: `// Swift: Two Pointers on a Sorted Array
func twoSumSorted(_ nums: [Int], _ target: Int) -> [Int] {
    var left = 0
    var right = nums.count - 1

    while left < right {
        let sum = nums[left] + nums[right]
        if sum == target {
            return [left, right]
        } else if sum < target {
            left += 1   // Need a larger sum -> move left pointer right
        } else {
            right -= 1  // Need a smaller sum -> move right pointer left
        }
    }
    return []
}`,
        python: `# Python: Two Pointers on a Sorted Array
def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    left = 0
    right = len(nums) - 1

    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []`,
        java: `// Java: Two Pointers on a Sorted Array
public class TwoPointers {
    public static int[] twoSumSorted(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                return new int[]{left, right};
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return new int[]{};
    }
}`,
        cpp: `// C++: Two Pointers on a Sorted Array
#include <vector>
using namespace std;

vector<int> twoSumSorted(const vector<int>& nums, int target) {
    int left = 0;
    int right = static_cast<int>(nums.size()) - 1;

    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {};
}`,
        javascript: `// JavaScript: Two Pointers on a Sorted Array
function twoSumSorted(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}`,
      },
      lineExplanations: [
        {
          lines: '3-4',
          title: 'Place Pointers at Opposite Ends',
          explanation:
            '`left` starts at index `0` (smallest element) and `right` starts at `nums.count - 1` (largest element).',
        },
        {
          lines: '6-14',
          title: 'Eliminate One Element Every Step',
          explanation:
            'If `sum < target`, `nums[left]` paired with even the largest remaining element is still too small, so we safely advance `left += 1`. If `sum > target`, we safely decrease `right -= 1`.',
        },
      ],
    },
    complexity: {
      time: 'O(n) — Each step moves either `left` rightwards or `right` leftwards, so at most n comparisons occur.',
      space: 'O(1) — Only two integer index variables (`left` and `right`) are used.',
      beginnerSummary:
        'Because the array is sorted, Two Pointers achieves O(n) time without needing an O(n) Hash Map!',
    },
    commonMistakes: [
      {
        mistake: 'Using Opposite-End Two Pointers on an UNSORTED array for Two Sum.',
        whyItHappens: 'Applying the `sum < target -> left += 1` rule when numbers are in random order.',
        fix: 'Moving `left` only guarantees a larger value if the array is sorted! For an unsorted array where you must return original indices, use a Hash Map (`O(n)` time, `O(n)` space).',
      },
      {
        mistake: 'Initialising `maxSum = 0` in Kadane’s Algorithm when all numbers in the array are negative.',
        whyItHappens: 'Assuming the maximum subarray sum is at least 0.',
        fix: 'For `[-5, -2, -9]`, the maximum non-empty subarray is `[-2]` (sum `-2`), not `0`! Always initialise `maxSum = nums[0]` and `currentSum = nums[0]`.',
      },
    ],
    quiz: [
      {
        id: 'q1-two-pointers',
        question: 'In a sorted array using Two Pointers (`left` and `right`), if `nums[left] + nums[right]` is GREATER than `target`, what should you do?',
        options: [
          'Increment `left` (`left += 1`)',
          'Decrement `right` (`right -= 1`)',
          'Increment both `left` and `right`',
          'Reset `left` to 0',
        ],
        correctIndex: 1,
        explanation:
          'Since the sum is too large and the array is sorted in ascending order, moving `right` one step to the left chooses a smaller number and reduces the sum.',
      },
      {
        id: 'q2-kadane',
        question: 'In Kadane’s Algorithm for Maximum Subarray Sum, if the array is `[-8, -3, -6]`, what should the function return?',
        options: ['0', '-3', '-17', '-8'],
        correctIndex: 1,
        explanation:
          'The subarray must contain at least one number. The largest single number (and thus largest subarray sum) is -3.',
      },
    ],
    summaryNotes: [
      'Sorted Array + Pair Sum → Opposite-end Two Pointers (`left = 0`, `right = n - 1`) in O(n) Time, O(1) Space.',
      'Palindrome Check → Compare `s[left]` and `s[right]` while moving inward.',
      'Maximum Subarray Sum (Kadane’s) → `currentSum = max(nums[i], currentSum + nums[i])`, initialised with `nums[0]`.',
    ],
  },
];
