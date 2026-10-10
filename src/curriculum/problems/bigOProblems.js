/**
 * Chapter 1 Coding Problems: DSA Intuition & Big O Complexity (3 Problems)
 */

export const BIG_O_PROBLEMS = [
  {
    id: 'sum-of-first-n',
    chapterId: 'chapter-big-o-foundations',
    levelId: 'level-1-foundations',
    title: 'Sum of 1 to N in O(1) Constant Time',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Big O & Complexity',
    estimatedMinutes: 10,
    description:
      'Given a positive integer `n`, return the sum of all integers from `1` to `n` inclusive (`1 + 2 + 3 + ... + n`).\n\nA simple loop takes `O(n)` time, which will be too slow when `n` reaches `1,000,000,000`. Write an optimal solution that runs in `O(1)` constant time and `O(1)` space.',
    realWorldContext:
      'In billing, analytics, and game level progression formulas, computing cumulative totals with a direct formula avoids looping millions of times per frame.',
    constraints: [
      '1 <= n <= 10^9',
      'Target Time Complexity: O(1)',
      'Target Space Complexity: O(1)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'n = 5',
        expectedOutput: '15',
        explanation: '1 + 2 + 3 + 4 + 5 = 15.',
      },
      {
        id: 'st-2',
        input: 'n = 100',
        expectedOutput: '5050',
        explanation: '100 * 101 / 2 = 5050.',
      },
      {
        id: 'st-3',
        input: 'n = 1',
        expectedOutput: '1',
        explanation: 'Single element edge case: sum from 1 to 1 is 1.',
      },
    ],
    hiddenTestsCount: 6,
    edgeCaseCategories: ['n = 1 minimum boundary', 'Large n = 10^9 64-bit integer range'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(1)',
      suboptimalTimeComplexity: 'O(n)',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['for ', 'while '],
        optimalKeywords: ['*', '/ 2', '// 2'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'Notice what happens when you pair the first and last numbers: (1 + n), (2 + n - 1), (3 + n - 2). Every pair adds up to the exact same value!',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'There are n numbers total, forming n / 2 pairs that each sum to (n + 1). Can you express this with a single multiplication and division?',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'Use Gauss’s formula: return n * (n + 1) / 2 (or // 2 in Python). Because it performs 3 arithmetic operations regardless of n, its time complexity is O(1).',
      },
    ],
    starterCode: {
      swift: `func sumOneToN(_ n: Int) -> Int {
    // Write your O(1) constant-time solution here
    
}`,
      python: `def sum_one_to_n(n: int) -> int:
    # Write your O(1) constant-time solution here
    pass`,
      java: `class Solution {
    public long sumOneToN(long n) {
        // Write your O(1) constant-time solution here
        return 0L;
    }
}`,
      cpp: `class Solution {
public:
    long long sumOneToN(long long n) {
        // Write your O(1) constant-time solution here
        return 0;
    }
};`,
      javascript: `function sumOneToN(n) {
  // Write your O(1) constant-time solution here
  
}`,
    },
    optimalSolution: {
      intuition:
        'Instead of adding numbers one by one in a loop (O(n)), we pair numbers from outside in: (1 + n) + (2 + n - 1) + ... This gives n * (n + 1) / 2 in a single O(1) expression.',
      lineByLineWalkthrough: [
        'Take input integer `n`.',
        'Multiply `n` by `(n + 1)` and divide by `2` using integer division.',
        'Return the result directly with zero loops and zero extra arrays.',
      ],
      dryRun: 'For n = 5: n * (n + 1) / 2 = 5 * 6 / 2 = 30 / 2 = 15.',
      complexityComparison:
        'A `for` loop from 1 to n takes O(n) time (1,000,000,000 operations when n = 10^9). Gauss’s formula takes O(1) time (3 arithmetic operations). Both use O(1) space.',
      codeByLanguage: {
        swift: `func sumOneToN(_ n: Int) -> Int {
    return n * (n + 1) / 2
}`,
        python: `def sum_one_to_n(n: int) -> int:
    return n * (n + 1) // 2`,
        java: `class Solution {
    public long sumOneToN(long n) {
        return n * (n + 1) / 2;
    }
}`,
        cpp: `class Solution {
public:
    long long sumOneToN(long long n) {
        return n * (n + 1) / 2;
    }
};`,
        javascript: `function sumOneToN(n) {
  return (n * (n + 1)) / 2;
}`,
      },
    },
  },
  {
    id: 'find-duplicate-efficiency',
    chapterId: 'chapter-big-o-foundations',
    levelId: 'level-1-foundations',
    title: 'Contains Duplicate (O(n²) vs O(n) Set Optimization)',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Big O & Complexity',
    estimatedMinutes: 15,
    description:
      'Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.\n\nFocus on avoiding an `O(n²)` nested loop by trading `O(n)` memory for `O(n)` time.',
    realWorldContext:
      'Checking whether a list of imported user IDs, SKUs, or email addresses contains duplicates before inserting into a database.',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
      'Target Time Complexity: O(n)',
      'Target Space Complexity: O(n)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'nums = [1, 2, 3, 1]',
        expectedOutput: 'true',
        explanation: 'The value 1 appears at index 0 and index 3.',
      },
      {
        id: 'st-2',
        input: 'nums = [1, 2, 3, 4]',
        expectedOutput: 'false',
        explanation: 'All 4 elements are unique.',
      },
      {
        id: 'st-3',
        input: 'nums = [7]',
        expectedOutput: 'false',
        explanation: 'A single element cannot have a duplicate.',
      },
    ],
    hiddenTestsCount: 8,
    edgeCaseCategories: ['Single element array', 'Negative numbers', '10^5 distinct elements'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n²)',
      targetSpaceComplexity: 'O(n)',
      efficiencyPatterns: {
        suboptimalKeywords: ['for j in', 'for (int j'],
        optimalKeywords: ['Set', 'set(', 'HashSet', 'unordered_set'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'Why is a nested loop slow? Because for every number, it scans the array again to check if we have seen it before.',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'What data structure lets you check "Have I seen this number already?" in O(1) constant time?',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'Create an empty Hash Set (`Set<Int>()` in Swift). Loop through `nums`: if the number is already in the Set, return `true`. Otherwise, insert it into the Set. If the loop finishes, return `false`.',
      },
    ],
    starterCode: {
      swift: `func containsDuplicate(_ nums: [Int]) -> Bool {
    // Write your O(n) time solution using a Set
    
}`,
      python: `def contains_duplicate(nums: list[int]) -> bool:
    # Write your O(n) time solution using a set
    pass`,
      java: `import java.util.*;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        // Write your O(n) time solution using a HashSet
        return false;
    }
}`,
      cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(const vector<int>& nums) {
        // Write your O(n) time solution using an unordered_set
        return false;
    }
};`,
      javascript: `function containsDuplicate(nums) {
  // Write your O(n) time solution using a Set
  
}`,
    },
    optimalSolution: {
      intuition:
        'A Hash Set provides O(1) average-time lookup and insertion. As we walk through the array once, we check if the current number is already in our `seen` set.',
      lineByLineWalkthrough: [
        'Initialise an empty Hash Set `seen`.',
        'Iterate over each `num` in `nums`.',
        'If `seen.contains(num)` is true, we found a duplicate—immediately return `true`.',
        'Otherwise insert `num` into `seen`.',
        'If the loop completes without matches, return `false`.',
      ],
      dryRun:
        'nums = [1, 2, 3, 1]:\n• num=1: seen={} -> insert 1 -> seen={1}\n• num=2: seen={1} -> insert 2 -> seen={1, 2}\n• num=3: seen={1, 2} -> insert 3 -> seen={1, 2, 3}\n• num=1: 1 is in seen! Return true.',
      complexityComparison:
        'Brute force nested loops: O(n²) Time, O(1) Space. Sorting first: O(n log n) Time. Hash Set: O(n) Time, O(n) Space.',
      codeByLanguage: {
        swift: `func containsDuplicate(_ nums: [Int]) -> Bool {
    var seen = Set<Int>()
    for num in nums {
        if seen.contains(num) {
            return true
        }
        seen.insert(num)
    }
    return false
}`,
        python: `def contains_duplicate(nums: list[int]) -> bool:
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
        java: `import java.util.*;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) {
                return true;
            }
        }
        return false;
    }
}`,
        cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(const vector<int>& nums) {
        unordered_set<int> seen;
        for (int num : nums) {
            if (seen.count(num)) return true;
            seen.insert(num);
        }
        return false;
    }
};`,
        javascript: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
      },
    },
  },
  {
    id: 'count-pairs-with-sum',
    chapterId: 'chapter-big-o-foundations',
    levelId: 'level-1-foundations',
    title: 'Has Pair With Target Sum (Complement Lookup)',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Big O & Complexity',
    estimatedMinutes: 15,
    description:
      'Given an unsorted array of integers `nums` and an integer `target`, return `true` if there exist two distinct indices `i` and `j` (`i != j`) such that `nums[i] + nums[j] == target`, or `false` otherwise.\n\nUpgrade the `O(n²)` all-pairs check into a single `O(n)` pass!',
    realWorldContext:
      'Matching gift-card balances or invoice items that exact-match a payment amount without comparing every item against every other item.',
    constraints: [
      '2 <= nums.length <= 10^5',
      '-10^9 <= nums[i], target <= 10^9',
      'Target Time Complexity: O(n)',
      'Target Space Complexity: O(n)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'nums = [3, 5, -4, 8, 11, 1, -1, 6], target = 10',
        expectedOutput: 'true',
        explanation: '11 + (-1) = 10.',
      },
      {
        id: 'st-2',
        input: 'nums = [4, 6], target = 10',
        expectedOutput: 'true',
        explanation: '4 + 6 = 10.',
      },
      {
        id: 'st-3',
        input: 'nums = [5, 2, 9], target = 10',
        expectedOutput: 'false',
        explanation: 'No two distinct elements sum to 10 (5 cannot be used twice unless 5 appears twice).',
      },
    ],
    hiddenTestsCount: 7,
    edgeCaseCategories: ['Target is 2 * nums[i] (must not reuse same index)', 'Negative numbers'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n²)',
      targetSpaceComplexity: 'O(n)',
      efficiencyPatterns: {
        suboptimalKeywords: ['for j in', 'for (int j'],
        optimalKeywords: ['Set', 'set(', 'HashSet', 'unordered_set', 'complement'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'If you are currently looking at `num = 4` and `target = 10`, what exact number do you need to pair with `4`? You need `10 - 4 = 6`!',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'Instead of searching the rest of the array for `complement = target - num`, check if `complement` is already in a Hash Set of numbers visited so far.',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'For each `num` in `nums`, compute `let complement = target - num`. Check `if seen.contains(complement) { return true }` BEFORE inserting `num` into `seen` (this also guarantees you never reuse the same element twice!).',
      },
    ],
    starterCode: {
      swift: `func hasPairWithSum(_ nums: [Int], _ target: Int) -> Bool {
    // Write your O(n) complement lookup solution here
    
}`,
      python: `def has_pair_with_sum(nums: list[int], target: int) -> bool:
    # Write your O(n) complement lookup solution here
    pass`,
      java: `import java.util.*;

class Solution {
    public boolean hasPairWithSum(int[] nums, int target) {
        // Write your O(n) complement lookup solution here
        return false;
    }
}`,
      cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool hasPairWithSum(const vector<int>& nums, int target) {
        // Write your O(n) complement lookup solution here
        return false;
    }
};`,
      javascript: `function hasPairWithSum(nums, target) {
  // Write your O(n) complement lookup solution here
  
}`,
    },
    optimalSolution: {
      intuition:
        'Every equation `a + b = target` can be rewritten as `a = target - b`. By storing previous numbers in a Set, we only need one O(1) lookup per element.',
      lineByLineWalkthrough: [
        'Create an empty Set `seen`.',
        'Loop through each `num` in `nums`.',
        'Compute `complement = target - num`.',
        'If `complement` is in `seen`, return `true`.',
        'Insert `num` into `seen` and continue.',
      ],
      dryRun:
        'nums = [5, 2, 8], target = 10:\n• num=5: complement=5, seen={} -> insert 5 (Notice we did not match 5 with itself!)\n• num=2: complement=8, seen={5} -> insert 2\n• num=8: complement=2, seen={5, 2} -> 2 is in seen! Return true.',
      complexityComparison:
        'Checking all pairs takes O(n²) Time and O(1) Space. Using a complement Set takes O(n) Time and O(n) Space.',
      codeByLanguage: {
        swift: `func hasPairWithSum(_ nums: [Int], _ target: Int) -> Bool {
    var seen = Set<Int>()
    for num in nums {
        let complement = target - num
        if seen.contains(complement) {
            return true
        }
        seen.insert(num)
    }
    return false
}`,
        python: `def has_pair_with_sum(nums: list[int], target: int) -> bool:
    seen = set()
    for num in nums:
        complement = target - num
        if complement in seen:
            return True
        seen.add(num)
    return False`,
        java: `import java.util.*;

class Solution {
    public boolean hasPairWithSum(int[] nums, int target) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            int complement = target - num;
            if (seen.contains(complement)) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}`,
        cpp: `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool hasPairWithSum(const vector<int>& nums, int target) {
        unordered_set<int> seen;
        for (int num : nums) {
            int complement = target - num;
            if (seen.count(complement)) return true;
            seen.insert(num);
        }
        return false;
    }
};`,
        javascript: `function hasPairWithSum(nums, target) {
  const seen = new Set();
  for (const num of nums) {
    const complement = target - num;
    if (seen.has(complement)) return true;
    seen.add(num);
  }
  return false;
}`,
      },
    },
  },
];
