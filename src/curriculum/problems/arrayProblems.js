/**
 * Chapter 2 Coding Problems: Arrays & Strings (4 Problems)
 */

export const ARRAY_PROBLEMS = [
  {
    id: 'two-sum-sorted',
    chapterId: 'chapter-arrays-core',
    levelId: 'level-2-arrays-strings',
    title: 'Two Sum II — Input Array Is Sorted',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Arrays & Two Pointers',
    estimatedMinutes: 15,
    description:
      'Given a **0-indexed** array of integers `numbers` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific `target` number.\n\nReturn the 0-based indices of the two numbers `[index1, index2]` (`index1 < index2`). Your solution must use only `O(1)` extra space.',
    realWorldContext:
      'Finding two sorted price points or timestamps that match a target duration without allocating extra hash tables in memory-constrained mobile devices.',
    constraints: [
      '2 <= numbers.length <= 10^5',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order',
      'Target Time Complexity: O(n)',
      'Target Space Complexity: O(1)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'numbers = [2, 7, 11, 15], target = 9',
        expectedOutput: '[0, 1]',
        explanation: 'numbers[0] + numbers[1] = 2 + 7 = 9, so return [0, 1].',
      },
      {
        id: 'st-2',
        input: 'numbers = [2, 3, 4], target = 6',
        expectedOutput: '[0, 2]',
        explanation: 'numbers[0] + numbers[2] = 2 + 4 = 6, so return [0, 2].',
      },
      {
        id: 'st-3',
        input: 'numbers = [-3, -1, 0, 4, 8], target = 3',
        expectedOutput: '[1, 3]',
        explanation: '-1 + 4 = 3 at indices 1 and 3.',
      },
    ],
    hiddenTestsCount: 8,
    edgeCaseCategories: ['Negative numbers', 'Duplicate values forming the target', 'Large sorted array'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n²)',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['for j in', 'for (int j'],
        optimalKeywords: ['left', 'right', 'while'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'Because the array is already sorted, the smallest value is at index 0 and the largest value is at index n - 1.',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'Place `left = 0` and `right = numbers.count - 1`. Look at `sum = numbers[left] + numbers[right]`. How should you move the pointers if `sum` is too big vs too small?',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'While `left < right`: if `sum == target`, return `[left, right]`. If `sum < target`, increment `left` to increase the sum. If `sum > target`, decrement `right` to decrease the sum.',
      },
    ],
    starterCode: {
      swift: `func twoSumSorted(_ numbers: [Int], _ target: Int) -> [Int] {
    // Use opposite-end Two Pointers for O(n) Time and O(1) Space
    
}`,
      python: `def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    # Use opposite-end Two Pointers for O(n) Time and O(1) Space
    pass`,
      java: `class Solution {
    public int[] twoSumSorted(int[] numbers, int target) {
        // Use opposite-end Two Pointers for O(n) Time and O(1) Space
        return new int[]{};
    }
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSumSorted(const vector<int>& numbers, int target) {
        // Use opposite-end Two Pointers for O(n) Time and O(1) Space
        return {};
    }
};`,
      javascript: `function twoSumSorted(numbers, target) {
  // Use opposite-end Two Pointers for O(n) Time and O(1) Space
  
}`,
    },
    optimalSolution: {
      intuition:
        'In a sorted array, comparing the sum of the extreme ends (`left` and `right`) against `target` immediately tells us which end can never be part of the answer.',
      lineByLineWalkthrough: [
        'Initialise `left = 0` and `right = numbers.count - 1`.',
        'Loop while `left < right`.',
        'Calculate `sum = numbers[left] + numbers[right]`.',
        'If `sum == target`, return `[left, right]`.',
        'If `sum < target`, move `left += 1`; otherwise move `right -= 1`.',
      ],
      dryRun:
        'numbers = [2, 3, 4], target = 6:\n• left=0 (2), right=2 (4): sum = 2 + 4 = 6 == target -> return [0, 2].',
      complexityComparison:
        'Nested loops take O(n²) Time. A Hash Map takes O(n) Time but wastes O(n) Space. Two Pointers achieves O(n) Time and O(1) Space.',
      codeByLanguage: {
        swift: `func twoSumSorted(_ numbers: [Int], _ target: Int) -> [Int] {
    var left = 0
    var right = numbers.count - 1
    while left < right {
        let sum = numbers[left] + numbers[right]
        if sum == target {
            return [left, right]
        } else if sum < target {
            left += 1
        } else {
            right -= 1
        }
    }
    return []
}`,
        python: `def two_sum_sorted(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []`,
        java: `class Solution {
    public int[] twoSumSorted(int[] numbers, int target) {
        int left = 0, right = numbers.length - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return new int[]{left, right};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{};
    }
}`,
        cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSumSorted(const vector<int>& numbers, int target) {
        int left = 0, right = static_cast<int>(numbers.size()) - 1;
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) return {left, right};
            if (sum < target) left++;
            else right--;
        }
        return {};
    }
};`,
        javascript: `function twoSumSorted(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
      },
    },
  },
  {
    id: 'max-subarray-kadane',
    chapterId: 'chapter-arrays-core',
    levelId: 'level-2-arrays-strings',
    title: 'Maximum Subarray Sum (Kadane’s Algorithm)',
    difficulty: 'Medium',
    priority: 'Essential',
    topicTag: 'Arrays & Subarrays',
    estimatedMinutes: 20,
    description:
      'Given an integer array `nums`, find the contiguous non-empty subarray (containing at least one number) which has the **largest sum** and return *its sum*.',
    realWorldContext:
      'Identifying the most profitable contiguous time window in financial stock returns or peak sensor signal intervals.',
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      'Target Time Complexity: O(n)',
      'Target Space Complexity: O(1)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        expectedOutput: '6',
        explanation: 'The subarray [4, -1, 2, 1] has the largest sum = 6.',
      },
      {
        id: 'st-2',
        input: 'nums = [1]',
        expectedOutput: '1',
        explanation: 'Single element array has sum 1.',
      },
      {
        id: 'st-3',
        input: 'nums = [-8, -3, -6, -2, -5]',
        expectedOutput: '-2',
        explanation: 'When all numbers are negative, the largest non-empty subarray is [-2].',
      },
    ],
    hiddenTestsCount: 9,
    edgeCaseCategories: ['All negative numbers (must not return 0!)', 'Single element array', 'Alternating peaks'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n²)',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['for j in', 'for (int j'],
        optimalKeywords: ['max(', 'Math.max', 'current'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'If your running subarray sum becomes negative, does keeping it ever help increase the sum of the elements that follow?',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'At each element `nums[i]`, you have two choices: either extend the previous subarray (`currentSum + nums[i]`) or start a brand new subarray at `nums[i]`.',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'Initialise `currentSum = nums[0]` and `maxSum = nums[0]` (crucial for all-negative arrays!). Loop `i` from `1` to `n - 1`: set `currentSum = max(nums[i], currentSum + nums[i])` and `maxSum = max(maxSum, currentSum)`.',
      },
    ],
    starterCode: {
      swift: `func maxSubArray(_ nums: [Int]) -> Int {
    // Implement Kadane's Algorithm in O(n) Time, O(1) Space
    
}`,
      python: `def max_sub_array(nums: list[int]) -> int:
    # Implement Kadane's Algorithm in O(n) Time, O(1) Space
    pass`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Implement Kadane's Algorithm in O(n) Time, O(1) Space
        return 0;
    }
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(const vector<int>& nums) {
        // Implement Kadane's Algorithm in O(n) Time, O(1) Space
        return 0;
    }
};`,
      javascript: `function maxSubArray(nums) {
  // Implement Kadane's Algorithm in O(n) Time, O(1) Space
  
}`,
    },
    optimalSolution: {
      intuition:
        'A negative prefix sum only reduces the total of any subarray that comes after it. So whenever `currentSum < 0`, we discard it and start fresh at the current element.',
      lineByLineWalkthrough: [
        'Start both `currentSum` and `maxSum` at `nums[0]` (handles all-negative inputs safely).',
        'Iterate from index `1` to the end of `nums`.',
        'Update `currentSum = max(nums[i], currentSum + nums[i])`.',
        'Update `maxSum = max(maxSum, currentSum)`.',
        'Return `maxSum`.',
      ],
      dryRun:
        'nums = [-2, 1, -3, 4]:\n• i=0: curr=-2, max=-2\n• i=1 (val 1): curr=max(1, -2+1)=1, max=1\n• i=2 (val -3): curr=max(-3, 1-3)=-2, max=1\n• i=3 (val 4): curr=max(4, -2+4)=4, max=4.',
      complexityComparison:
        'Testing every subarray pair `(i, j)` takes O(n²) Time. Kadane’s Algorithm visits each number once in O(n) Time and O(1) Space.',
      codeByLanguage: {
        swift: `func maxSubArray(_ nums: [Int]) -> Int {
    guard !nums.isEmpty else { return 0 }
    var currentSum = nums[0]
    var maxSum = nums[0]

    for i in 1..<nums.count {
        currentSum = max(nums[i], currentSum + nums[i])
        maxSum = max(maxSum, currentSum)
    }
    return maxSum
}`,
        python: `def max_sub_array(nums: list[int]) -> int:
    current_sum = nums[0]
    max_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
        java: `class Solution {
    public int maxSubArray(int[] nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }
}`,
        cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(const vector<int>& nums) {
        int currentSum = nums[0];
        int maxSum = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};`,
        javascript: `function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}`,
      },
    },
  },
  {
    id: 'move-zeroes',
    chapterId: 'chapter-arrays-core',
    levelId: 'level-2-arrays-strings',
    title: 'Move Zeroes In-Place (Read/Write Pointers)',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Arrays & In-Place Compaction',
    estimatedMinutes: 15,
    description:
      'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements.\n\nNote that you must do this **in-place** without making a copy of the array, and without calling `remove(at:)` inside a loop.',
    realWorldContext:
      'Compacting deleted or inactive slots in a fixed-size memory buffer without allocating a second buffer.',
    constraints: [
      '1 <= nums.length <= 10^4',
      '-2^31 <= nums[i] <= 2^31 - 1',
      'Target Time Complexity: O(n)',
      'Target Space Complexity: O(1)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'nums = [0, 1, 0, 3, 12]',
        expectedOutput: '[1, 3, 12, 0, 0]',
        explanation: 'Non-zero elements 1, 3, 12 stay in order at the front; zeroes move to the end.',
      },
      {
        id: 'st-2',
        input: 'nums = [0]',
        expectedOutput: '[0]',
        explanation: 'Single zero remains [0].',
      },
      {
        id: 'st-3',
        input: 'nums = [4, 2, 9]',
        expectedOutput: '[4, 2, 9]',
        explanation: 'Array with no zeroes remains unchanged.',
      },
    ],
    hiddenTestsCount: 6,
    edgeCaseCategories: ['All zeroes', 'No zeroes', 'Single element'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n²)',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['.remove(', '.splice('],
        optimalKeywords: ['swap', 'write', 'nonZero'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'Instead of pushing zeroes to the back one by one, focus on pulling non-zero numbers to the front!',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'Maintain a pointer `writeIndex = 0` that tracks where the next non-zero element should be placed.',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'Loop `readIndex` from `0` to `nums.count - 1`. Whenever `nums[readIndex] != 0`, swap `nums[writeIndex]` with `nums[readIndex]` and increment `writeIndex += 1`.',
      },
    ],
    starterCode: {
      swift: `func moveZeroes(_ nums: inout [Int]) {
    // Mutate nums in-place in O(n) Time and O(1) Space
    
}`,
      python: `def move_zeroes(nums: list[int]) -> None:
    # Mutate nums in-place in O(n) Time and O(1) Space
    pass`,
      java: `class Solution {
    public void moveZeroes(int[] nums) {
        // Mutate nums in-place in O(n) Time and O(1) Space
        
    }
}`,
      cpp: `#include <vector>
#include <utility>
using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        // Mutate nums in-place in O(n) Time and O(1) Space
        
    }
};`,
      javascript: `function moveZeroes(nums) {
  // Mutate nums in-place in O(n) Time and O(1) Space
  
}`,
    },
    optimalSolution: {
      intuition:
        'Every time `readIndex` encounters a non-zero value, swapping it into `writeIndex` places the non-zero value in its final sorted position and pushes any zero that was at `writeIndex` forward.',
      lineByLineWalkthrough: [
        'Initialise `writeIndex = 0`.',
        'Loop `readIndex` across all indices of `nums`.',
        'If `nums[readIndex] != 0`, swap `nums[writeIndex]` and `nums[readIndex]`, then increment `writeIndex`.',
      ],
      dryRun:
        'nums = [0, 1, 0, 3]:\n• read=0 (0): skip\n• read=1 (1): swap(0, 1) -> [1, 0, 0, 3], write=1\n• read=2 (0): skip\n• read=3 (3): swap(1, 3) -> [1, 3, 0, 0], write=2.',
      complexityComparison:
        'Removing zeroes with `remove(at:)` inside a loop shifts the array repeatedly in O(n²) Time. The Read/Write pointer swap runs in O(n) Time and O(1) Space.',
      codeByLanguage: {
        swift: `func moveZeroes(_ nums: inout [Int]) {
    var writeIndex = 0
    for readIndex in 0..<nums.count {
        if nums[readIndex] != 0 {
            nums.swapAt(writeIndex, readIndex)
            writeIndex += 1
        }
    }
}`,
        python: `def move_zeroes(nums: list[int]) -> None:
    write_index = 0
    for read_index in range(len(nums)):
        if nums[read_index] != 0:
            nums[write_index], nums[read_index] = nums[read_index], nums[write_index]
            write_index += 1`,
        java: `class Solution {
    public void moveZeroes(int[] nums) {
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
        cpp: `#include <vector>
#include <utility>
using namespace std;

class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        size_t writeIndex = 0;
        for (size_t readIndex = 0; readIndex < nums.size(); ++readIndex) {
            if (nums[readIndex] != 0) {
                swap(nums[writeIndex], nums[readIndex]);
                writeIndex++;
            }
        }
    }
};`,
        javascript: `function moveZeroes(nums) {
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
    },
  },
  {
    id: 'valid-palindrome-string',
    chapterId: 'chapter-arrays-core',
    levelId: 'level-2-arrays-strings',
    title: 'Valid Alphanumeric Palindrome (String Two Pointers)',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Strings & Two Pointers',
    estimatedMinutes: 15,
    description:
      'A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.',
    realWorldContext:
      'Normalising and comparing text tokens, DNA sequences, or symmetrical identifiers while ignoring punctuation and casing.',
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters',
      'Target Time Complexity: O(n)',
      'Target Space Complexity: O(1) (or O(n) for character array conversion in Swift)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 's = "A man, a plan, a canal: Panama"',
        expectedOutput: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.',
      },
      {
        id: 'st-2',
        input: 's = "race a car"',
        expectedOutput: 'false',
        explanation: '"raceacar" is not a palindrome.',
      },
      {
        id: 'st-3',
        input: 's = " "',
        expectedOutput: 'true',
        explanation: 'An empty string after removing non-alphanumeric characters reads the same forward and backward.',
      },
    ],
    hiddenTestsCount: 7,
    edgeCaseCategories: ['Only spaces and punctuation', 'Mixed digits and letters', 'Single character'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n²)',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['insert(at: 0'],
        optimalKeywords: ['left', 'right', 'lowercased', 'lower'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'To check if a sequence reads the same forward and backward, compare characters from the outside in using `left` and `right` pointers.',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'Skip any character at `left` or `right` that is not a letter or number. Once both point to valid alphanumeric characters, compare their lowercase versions.',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm (Swift Tip Included)',
        text: 'In Swift, indexing a `String` repeatedly with `s.index(s.startIndex, offsetBy: i)` is O(n) per lookup! Convert to `let chars = Array(s)` once for O(1) indexing, then run Two Pointers (`left = 0`, `right = chars.count - 1`).',
      },
    ],
    starterCode: {
      swift: `func isPalindrome(_ s: String) -> Bool {
    // Tip: Convert s to Array(s) for O(1) character indexing in Swift
    
}`,
      python: `def is_palindrome(s: str) -> bool:
    # Use Two Pointers (left and right) to check palindrome in O(n) time
    pass`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        // Use Two Pointers (left and right) to check palindrome in O(n) time
        return false;
    }
}`,
      cpp: `#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(const string& s) {
        // Use Two Pointers (left and right) to check palindrome in O(n) time
        return false;
    }
};`,
      javascript: `function isPalindrome(s) {
  // Use Two Pointers (left and right) to check palindrome in O(n) time
  
}`,
    },
    optimalSolution: {
      intuition:
        'Using `left` and `right` pointers, we advance past spaces and punctuation until both pointers land on alphanumeric characters, then compare them case-insensitively.',
      lineByLineWalkthrough: [
        'Start `left` at the beginning and `right` at the end of the string.',
        'While `left < right`, advance `left` if `s[left]` is not alphanumeric, and decrement `right` if `s[right]` is not alphanumeric.',
        'Compare lowercase `s[left]` and `s[right]`. If they differ, return `false`.',
        'Advance both pointers (`left += 1`, `right -= 1`).',
      ],
      dryRun:
        's = "Aba":\n• left=0 ("A"), right=2 ("a"): lower("A") == lower("a") -> match!\n• left=1, right=1 -> loop ends -> return true.',
      complexityComparison:
        'In Swift, using `s.index(s.startIndex, offsetBy: i)` inside a loop accidentally makes string traversal O(n²) because Swift `Character`s are variable-width UTF-8 grapheme clusters. Converting `Array(s)` or stepping `String.Index` directly keeps it O(n)!',
      codeByLanguage: {
        swift: `func isPalindrome(_ s: String) -> Bool {
    let chars = Array(s)
    var left = 0
    var right = chars.count - 1

    while left < right {
        while left < right && !chars[left].isLetter && !chars[left].isNumber {
            left += 1
        }
        while left < right && !chars[right].isLetter && !chars[right].isNumber {
            right -= 1
        }
        if chars[left].lowercased() != chars[right].lowercased() {
            return false
        }
        left += 1
        right -= 1
    }
    return true
}`,
        python: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
        java: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
                left++;
            }
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
                right--;
            }
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,
        cpp: `#include <string>
#include <cctype>
using namespace std;

class Solution {
public:
    bool isPalindrome(const string& s) {
        int left = 0, right = static_cast<int>(s.size()) - 1;
        while (left < right) {
            while (left < right && !isalnum(static_cast<unsigned char>(s[left]))) left++;
            while (left < right && !isalnum(static_cast<unsigned char>(s[right]))) right--;
            if (tolower(static_cast<unsigned char>(s[left])) != tolower(static_cast<unsigned char>(s[right]))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
};`,
        javascript: `function isPalindrome(s) {
  const isAlphaNum = (c) => /^[a-z0-9]$/i.test(c);
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !isAlphaNum(s[left])) left++;
    while (left < right && !isAlphaNum(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
      },
    },
  },
];
