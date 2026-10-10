/**
 * Level 1 Lessons: Programming & DSA Foundations (Big O & Complexity)
 */

export const BIG_O_LESSONS = [
  {
    id: 'big-o-intuition',
    chapterId: 'chapter-big-o-foundations',
    levelId: 'level-1-foundations',
    lessonNumber: '1.1',
    title: 'What DSA Is & How Big O Measures Speed and Memory',
    estimatedMinutes: 20,
    priority: 'Essential',
    isCoreInterview: true,
    nextLessonId: 'complexity-classes-comparison',
    prevLessonId: null,
    practiceProblemIds: ['sum-of-first-n', 'find-duplicate-efficiency', 'count-pairs-with-sum'],
    objectives: [
      'Understand what a Data Structure and an Algorithm actually mean in plain English.',
      'Learn why measuring wall-clock seconds is unreliable and why counting operations is better.',
      'Understand Big O notation as a "growth rate" when input size (n) grows large.',
      'Distinguish between Time Complexity (how many steps) and Space Complexity (how much extra memory).',
    ],
    analogy: {
      title: 'The Kitchen Pantry & Recipe Analogy',
      summary:
        'A Data Structure is how you organise ingredients in your kitchen (throw everything in one giant box vs labelled spice racks). An Algorithm is the step-by-step recipe you follow to cook a meal.',
      details: [
        'Imagine looking for cumin in a messy cardboard box of 500 unlabelled jars. You might have to pick up every jar one by one until you find it (up to 500 steps).',
        'Now imagine an alphabetical spice rack. You jump straight to the "C" shelf and grab cumin in 2 seconds.',
        'The ingredients did not change—only the way you organised them (the Data Structure) and the steps you used to search (the Algorithm).',
      ],
    },
    explanation: [
      {
        heading: '1. Why Not Just Measure Time in Seconds?',
        body: 'If you run the same program on a supercomputer and on an old budget phone, the supercomputer finishes in 0.01 seconds while the phone takes 2 seconds. Does that mean the algorithm changed? No! Because hardware speed, background apps, and battery mode vary, computer scientists do not measure algorithms in seconds. Instead, we count how many basic operations (comparisons, math steps, variable reads) the algorithm performs as the input size n grows.',
      },
      {
        heading: '2. What Does the "n" in Big O Mean?',
        body: 'The letter n simply stands for the size of your input. If you are searching through a contact list of 1,000 people, n = 1,000. If you are processing an array of 5,000,000 photos, n = 5,000,000. Big O notation—written like O(1), O(n), or O(n²)—answers one question: "When n gets 10 times bigger, how much harder does my code work?"',
      },
      {
        heading: '3. Why We Drop Constants and Small Terms',
        body: 'Suppose Algorithm A takes 3n + 5 steps, and Algorithm B takes n² steps. When n = 1,000,000, Algorithm A takes ~3 million steps, while Algorithm B takes 1 trillion steps! Whether Algorithm A does 1n or 3n steps barely changes the big picture compared to n². So in Big O, we drop constant multipliers (3n becomes O(n)) and keep only the fastest-growing term.',
      },
    ],
    beginnerModeExplanation: {
      title: "Explain Like I'm a Beginner: Big O in 60 Seconds",
      points: [
        'Think of Big O as a "scaling sticker" on your code, like an energy rating on a refrigerator.',
        'O(1) means "Instant": Whether you have 10 items or 10 million items, it takes the exact same number of steps (like grabbing the first card off a deck).',
        'O(n) means "Fair": 10x more items = 10x more work (like reading every page in a book once).',
        'O(n²) means "Danger Zone": 10x more items = 100x more work! This usually happens when you put a loop inside another loop over the same data.',
        'Space Complexity is just asking: "How many extra sticky notes (variables/arrays) did I have to create while solving the problem?"',
      ],
    },
    visualizerConfig: {
      type: 'big-o',
      defaultN: 8,
      title: 'Interactive Step Counter: Loop vs Formula vs Nested Loop',
    },
    workedExample: {
      title: 'Adding Numbers from 1 to n (When n = 5)',
      problemStatement: 'Given a positive integer n = 5, compute the sum 1 + 2 + 3 + 4 + 5.',
      sampleInput: 'n = 5',
      expectedOutput: '15',
      steps: [
        {
          step: 1,
          title: 'Approach A: The Loop Way — O(n) Time',
          detail: 'Start with total = 0. Add 1 (total=1), add 2 (total=3), add 3 (total=6), add 4 (total=10), add 5 (total=15). For n = 5, the loop ran 5 times. For n = 1,000,000,000, the loop runs 1 billion times!',
        },
        {
          step: 2,
          title: 'Approach B: Gauss’s Math Formula — O(1) Time',
          detail: 'Notice that (1 + 5) = 6, (2 + 4) = 6, and 3 is in the middle. Using the formula n * (n + 1) / 2: we compute 5 * 6 / 2 = 15 in a single calculation! Even if n = 1,000,000,000, it still takes just 1 multiplication, 1 addition, and 1 division.',
        },
      ],
    },
    codeWalkthrough: {
      title: 'Comparing O(n) Loop vs O(1) Formula Across Languages',
      codeByLanguage: {
        swift: `// Swift: Comparing O(n) Loop vs O(1) Constant Time
func sumWithLoop(_ n: Int) -> Int {
    var total = 0                 // 1 step: create accumulator variable
    for number in 1...n {         // Runs n times (ClosedRange 1 through n)
        total += number           // n steps: add current number
    }
    return total                  // 1 step: return result
}

func sumWithFormula(_ n: Int) -> Int {
    // Runs in O(1) constant time regardless of how large n is!
    return n * (n + 1) / 2
}`,
        python: `# Python: Comparing O(n) Loop vs O(1) Constant Time
def sum_with_loop(n: int) -> int:
    total = 0                     # 1 step: initialize total
    for number in range(1, n + 1):# Runs n times (1 to n inclusive)
        total += number           # n steps: add to total
    return total                  # 1 step: return result

def sum_with_formula(n: int) -> int:
    # Runs in O(1) constant time using integer division //
    return n * (n + 1) // 2`,
        java: `// Java: Comparing O(n) Loop vs O(1) Constant Time
public class SummationComparison {
    public static long sumWithLoop(long n) {
        long total = 0;                 // 1 step: allocate 64-bit integer
        for (long i = 1; i <= n; i++) { // Runs n times
            total += i;                 // n steps: add i to total
        }
        return total;                   // 1 step: return result
    }

    public static long sumWithFormula(long n) {
        // Runs in O(1) constant time
        return n * (n + 1) / 2;
    }
}`,
        cpp: `// C++: Comparing O(n) Loop vs O(1) Constant Time
long long sumWithLoop(long long n) {
    long long total = 0;                // 1 step: initialize accumulator
    for (long long i = 1; i <= n; ++i) {// Runs n times
        total += i;                     // n steps: accumulate sum
    }
    return total;                       // 1 step: return result
}

long long sumWithFormula(long long n) {
    // Runs in O(1) constant time
    return n * (n + 1) / 2;
}`,
        javascript: `// JavaScript: Comparing O(n) Loop vs O(1) Constant Time
function sumWithLoop(n) {
  let total = 0;                  // 1 step: initialize total
  for (let i = 1; i <= n; i++) {  // Runs n times
    total += i;                   // n steps: add i to total
  }
  return total;                   // 1 step: return result
}

function sumWithFormula(n) {
  // Runs in O(1) constant time
  return Math.floor((n * (n + 1)) / 2);
}`,
      },
      lineExplanations: [
        {
          lines: '1-7',
          title: 'The O(n) Linear Loop',
          explanation:
            'We initialise `total = 0` once, then the loop body executes once for every number from `1` to `n`. If `n` doubles, the number of additions doubles. That makes Time Complexity O(n) and Space Complexity O(1) because we only store `total` and the loop counter.',
        },
        {
          lines: '9-13',
          title: 'The O(1) Mathematical Shortcut',
          explanation:
            'Instead of stepping through every number, we compute `n * (n + 1) / 2` directly. The CPU executes three arithmetic operations whether `n` is 5 or 50,000,000. Both Time Complexity and Space Complexity are O(1).',
        },
        {
          lines: 'Swift Note',
          title: 'Swift ClosedRange (1...n) & Int Safety',
          explanation:
            'In Swift, `1...n` is a `ClosedRange<Int>` that does not allocate an array in memory—it simply increments a counter, keeping Space Complexity O(1). Also, Swift traps on integer overflow by default, which protects you from silent bugs when `n * (n + 1)` is huge!',
        },
      ],
    },
    complexity: {
      time: 'O(n) for the single loop; O(1) for the mathematical formula.',
      space: 'O(1) Auxiliary Space for both approaches because neither creates an array or grows memory with n.',
      beginnerSummary:
        'Time Complexity measures how the step count scales with n. Space Complexity measures how much new memory we allocate. Reusing a single `total` variable uses O(1) constant memory.',
    },
    commonMistakes: [
      {
        mistake: 'Thinking two separate loops in a row make O(n²).',
        whyItHappens: 'Beginners see two `for` loops in the same function and multiply them.',
        fix: 'Two separate loops one after another add up: O(n) + O(n) = O(2n), which simplifies to O(n). It is only O(n²) when one loop is nested INSIDE the other!',
      },
      {
        mistake: 'Ignoring hidden loops inside built-in helper methods.',
        whyItHappens: 'Calling `array.contains(x)` or `array.firstIndex(of: x)` inside a loop looks like 1 line of code.',
        fix: 'Checking if an unsorted array contains an element scans the array in O(n) time. Doing that inside an O(n) loop secretly creates an O(n²) algorithm!',
      },
    ],
    quiz: [
      {
        id: 'q1-big-o',
        question: 'A function loops through an array of n items once to find the largest number, and then loops through the same array a second time to count how many items equal that largest number. What is its Time Complexity?',
        options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
        correctIndex: 1,
        explanation:
          'Because the two loops run sequentially (one after the other, not nested), the total work is n + n = 2n steps. In Big O notation, we drop the constant 2, giving O(n).',
      },
      {
        id: 'q2-big-o',
        question: 'Which statement best describes Space Complexity?',
        options: [
          'How many lines of code your file contains on disk',
          'How much extra memory (RAM) your algorithm allocates as the input size n grows',
          'How many spaces vs tabs you use for indentation',
          'How fast your SSD loads the program',
        ],
        correctIndex: 1,
        explanation:
          'Space complexity measures the working memory (variables, new arrays, hash maps, call stack frames) your algorithm needs relative to the input size n.',
      },
      {
        id: 'q3-big-o',
        question: 'If you create a new array of size n to store a doubled copy of every input element, what is the auxiliary Space Complexity?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctIndex: 2,
        explanation:
          'Allocating a new array with n elements requires memory directly proportional to n, which is O(n) space.',
      },
    ],
    summaryNotes: [
      'Big O measures how step count (Time) and extra memory (Space) grow as input size n grows.',
      'Drop constants: O(2n + 10) is written simply as O(n).',
      'Sequential loops add (O(n) + O(n) = O(n)); nested loops multiply (O(n) * O(n) = O(n²)).',
      'Always check whether a built-in method (like `.contains()` or `.insert(at: 0)`) hides an O(n) scan.',
    ],
  },
  {
    id: 'complexity-classes-comparison',
    chapterId: 'chapter-big-o-foundations',
    levelId: 'level-1-foundations',
    lessonNumber: '1.2',
    title: 'Comparing O(1), O(log n), O(n), O(n log n), and O(n²)',
    estimatedMinutes: 25,
    priority: 'Essential',
    isCoreInterview: true,
    nextLessonId: 'arrays-memory-and-operations',
    prevLessonId: 'big-o-intuition',
    practiceProblemIds: ['sum-of-first-n', 'find-duplicate-efficiency', 'count-pairs-with-sum'],
    objectives: [
      'Recognise the 5 core complexity classes you will encounter in 95% of coding interviews.',
      'Understand why O(log n) is extraordinarily fast by visualising repeated halving.',
      'Learn how to use problem constraints (like n ≤ 10⁵) to immediately know which Big O target an interviewer expects.',
      'Spot the difference between an O(n²) brute-force solution and an O(n) or O(n log n) optimised solution.',
    ],
    analogy: {
      title: 'The Guessing Game (1 to 1,000,000)',
      summary:
        'Suppose a friend picks a secret number between 1 and 1,000,000 and tells you "Higher" or "Lower" after each guess.',
      details: [
        'If you guess 1, 2, 3, 4... in order (Linear O(n)), it could take you 1,000,000 guesses.',
        'If you always guess the middle number (500,000, then 250,000, then 125,000...), you cut the remaining possibilities in half every single time!',
        'How many times can you cut 1,000,000 in half before only 1 number is left? Just 20 times! That is the magic of O(log n).',
      ],
    },
    explanation: [
      {
        heading: '1. The Five Complexity Classes Ranked from Fastest to Slowest',
        body: '1) O(1) Constant: Array index lookup `arr[i]`, Hash Map lookup, Stack push/pop.\n2) O(log n) Logarithmic: Binary Search on a sorted array—cutting the problem in half each step.\n3) O(n) Linear: Single pass through an array, Two Pointers, Sliding Window.\n4) O(n log n) Linearithmic: Fast sorting algorithms like Merge Sort, Quick Sort (average), and Swift `.sorted()`.\n5) O(n²) Quadratic: Nested loops comparing every pair `(i, j)` in an array.',
      },
      {
        heading: '2. How to Read Interview Constraints Like a Cheat Sheet',
        body: 'In technical interviews and coding platforms, the maximum value of n tells you what complexity will pass within the ~1 second limit (~10⁸ operations):\n• If n ≤ 1,000: An O(n²) nested loop (1,000² = 1,000,000 steps) easily passes.\n• If n ≤ 100,000 (10⁵): O(n²) would take 10,000,000,000 (10 billion) steps and Time Out! You MUST aim for O(n log n) or O(n).\n• If n ≤ 10⁹: Even an O(n) loop is too slow. You need O(log n) or an O(1) math formula.',
      },
    ],
    beginnerModeExplanation: {
      title: "Explain Like I'm a Beginner: What Is a Logarithm (log n)?",
      points: [
        'Do not let the math word "logarithm" scare you! In computer science, log₂(n) just asks: "How many times can I divide n by 2 until I reach 1?"',
        'Start with n = 16: 16 → 8 → 4 → 2 → 1. We divided by 2 four times, so log₂(16) = 4.',
        'Double n to 32: 32 → 16 → 8 → 4 → 2 → 1. That is only 5 steps! Every time the input DOUBLES in size, an O(log n) algorithm only needs ONE extra step.',
      ],
    },
    visualizerConfig: {
      type: 'big-o',
      defaultN: 16,
      title: 'Compare All 5 Complexity Curves & Step Counts',
    },
    workedExample: {
      title: 'Checking if an Array Contains Any Duplicate Value',
      problemStatement: 'Given nums = [4, 2, 7, 1, 2], return true if any number appears more than once.',
      sampleInput: 'nums = [4, 2, 7, 1, 2]',
      expectedOutput: 'true (because 2 appears twice)',
      steps: [
        {
          step: 1,
          title: 'Brute Force: Compare Every Pair — O(n²) Time, O(1) Space',
          detail: 'Compare 4 with (2, 7, 1, 2), then compare 2 with (7, 1, 2) -> Match found! In the worst case (no duplicates), for n items we do n*(n-1)/2 comparisons, which is O(n²).',
        },
        {
          step: 2,
          title: 'Sort First, Then Check Neighbours — O(n log n) Time',
          detail: 'Sort the array into [1, 2, 2, 4, 7] in O(n log n) time. Now any duplicates sit right next to each other! One O(n) pass checks `nums[i] == nums[i+1]`.',
        },
        {
          step: 3,
          title: 'Hash Set Memory Trade-off — O(n) Time, O(n) Space',
          detail: 'Walk through the array once, adding each number to a Set (`seen`). Before adding, check if `seen.contains(num)`. Since Set lookup is O(1), the whole algorithm runs in O(n) time!',
        },
      ],
    },
    codeWalkthrough: {
      title: 'Three Ways to Detect Duplicates: O(n²) vs O(n)',
      codeByLanguage: {
        swift: `// Swift: O(n²) Nested Loop vs O(n) Set Lookup
func hasDuplicateBruteForce(_ nums: [Int]) -> Bool {
    for i in 0..<nums.count {
        for j in (i + 1)..<nums.count {
            if nums[i] == nums[j] { return true }
        }
    }
    return false
}

func hasDuplicateOptimal(_ nums: [Int]) -> Bool {
    var seen = Set<Int>()          // Hash Set for O(1) average lookup
    for num in nums {              // Single O(n) pass
        if seen.contains(num) {
            return true
        }
        seen.insert(num)
    }
    return false
}`,
        python: `# Python: O(n²) Nested Loop vs O(n) Set Lookup
def has_duplicate_brute_force(nums: list[int]) -> bool:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] == nums[j]:
                return True
    return False

def has_duplicate_optimal(nums: list[int]) -> bool:
    seen = set()                   # Hash Set for O(1) average lookup
    for num in nums:               # Single O(n) pass
        if num in seen:
            return True
        seen.add(num)
    return False`,
        java: `// Java: O(n²) Nested Loop vs O(n) HashSet Lookup
import java.util.HashSet;
import java.util.Set;

public class DuplicateChecker {
    public static boolean hasDuplicateBruteForce(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }

    public static boolean hasDuplicateOptimal(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) return true; // .add() returns false if already present
        }
        return false;
    }
}`,
        cpp: `// C++: O(n²) Nested Loop vs O(n) unordered_set Lookup
#include <vector>
#include <unordered_set>
using namespace std;

bool hasDuplicateBruteForce(const vector<int>& nums) {
    for (size_t i = 0; i < nums.size(); ++i) {
        for (size_t j = i + 1; j < nums.size(); ++j) {
            if (nums[i] == nums[j]) return true;
        }
    }
    return false;
}

bool hasDuplicateOptimal(const vector<int>& nums) {
    unordered_set<int> seen;
    for (int num : nums) {
        if (seen.count(num)) return true;
        seen.insert(num);
    }
    return false;
}`,
        javascript: `// JavaScript: O(n²) Nested Loop vs O(n) Set Lookup
function hasDuplicateBruteForce(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}

function hasDuplicateOptimal(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
      },
      lineExplanations: [
        {
          lines: '2-8',
          title: 'Nested Loops = O(n²) Time, O(1) Space',
          explanation:
            'For every index `i`, the inner loop `j` scans all remaining elements `(i + 1)..<n`. Total comparisons: (n - 1) + (n - 2) + ... + 1 = n(n - 1)/2, which scales as O(n²).',
        },
        {
          lines: '11-19',
          title: 'Trading O(n) Space for O(n) Time',
          explanation:
            'By storing visited numbers in a Hash Set (`Set<Int>` in Swift), checking whether a number was already seen takes O(1) constant time on average. The loop runs at most `n` times, reducing total time from O(n²) to O(n).',
        },
      ],
    },
    complexity: {
      time: 'Brute Force: O(n²) | Sorting: O(n log n) | Hash Set: O(n)',
      space: 'Brute Force: O(1) | Sorting: O(1) to O(n) | Hash Set: O(n)',
      beginnerSummary:
        'One of the most common interview patterns is trading a little bit of memory (O(n) space for a Set or Dictionary) to eliminate an inner loop and speed up time from O(n²) to O(n).',
    },
    commonMistakes: [
      {
        mistake: 'Using an Array instead of a Set to store `seen` items.',
        whyItHappens: 'Learners write `var seen = [Int]()` and call `seen.contains(num)`.',
        fix: '`Array.contains` checks every element one by one in O(n) time! Only `Set` or `Dictionary` / `HashMap` gives O(1) average lookup.',
      },
      {
        mistake: 'Starting the inner loop at `j = 0` instead of `j = i + 1` when checking pairs.',
        whyItHappens: 'Habitually writing `0..<n` for both loops.',
        fix: 'If `j` starts at `0`, when `i == j` you compare an element with itself (`nums[i] == nums[i]`), falsely reporting a duplicate every time!',
      },
    ],
    quiz: [
      {
        id: 'q1-classes',
        question: 'If an algorithm cuts the remaining search array in half on every iteration (like Binary Search), what is its Time Complexity?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctIndex: 1,
        explanation:
          'Repeatedly dividing the problem size by 2 takes log₂(n) steps, which is O(log n) logarithmic time.',
      },
      {
        id: 'q2-classes',
        question: 'For an array of n = 100,000 elements, roughly how many operations does an O(n²) algorithm perform?',
        options: ['100,000', '1,700,000', '10,000,000,000 (10 billion)', '20'],
        correctIndex: 2,
        explanation:
          '100,000² = 10,000,000,000 (10 billion), which takes several seconds and will trigger a Time Limit Exceeded (TLE) error in coding interviews.',
      },
    ],
    summaryNotes: [
      'Memorise the speed ranking: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ).',
      'Halving the problem at each step → O(log n).',
      'Sorting an array with standard library `.sorted()` → O(n log n).',
      'Trading O(n) memory for a Hash Set or Dictionary often upgrades an O(n²) solution to O(n).',
    ],
  },
];
