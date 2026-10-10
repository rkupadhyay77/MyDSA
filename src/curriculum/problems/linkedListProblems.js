/**
 * Chapter 5 Coding Problems: Linked Lists (4 Problems)
 */

export const LINKED_LIST_PROBLEMS = [
  {
    id: 'reverse-linked-list',
    chapterId: 'chapter-linked-lists-core',
    levelId: 'level-5-linked-lists',
    title: 'Reverse a Singly Linked List In-Place',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Linked Lists & Pointers',
    estimatedMinutes: 15,
    description:
      'Given the `head` of a singly linked list, reverse the list **in-place** and return the reversed list’s new head.\n\nDo not allocate a new array of values—rewire the `.next` pointers directly in `O(1)` auxiliary space.',
    realWorldContext:
      'Reversing undo-history chains, packet buffers, or call-chain stacks without copying node payloads in memory.',
    constraints: [
      'The number of nodes in the list is in the range [0, 5000]',
      '-5000 <= Node.val <= 5000',
      'Target Time Complexity: O(n)',
      'Target Space Complexity: O(1)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'head = [1, 2, 3, 4, 5]',
        expectedOutput: '[5, 4, 3, 2, 1]',
        explanation: 'All next pointers are flipped backward; 5 becomes the new head.',
      },
      {
        id: 'st-2',
        input: 'head = [1, 2]',
        expectedOutput: '[2, 1]',
        explanation: '2 -> 1 -> nil.',
      },
      {
        id: 'st-3',
        input: 'head = []',
        expectedOutput: '[]',
        explanation: 'Empty list (nil head) returns nil.',
      },
    ],
    hiddenTestsCount: 8,
    edgeCaseCategories: ['Empty list (head == nil)', 'Single node list [1]', '5000 nodes'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n) with O(n) extra array allocation',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['append(', 'push_back('],
        optimalKeywords: ['prev', 'curr', 'next'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'As you visit each node `curr`, you want to redirect `curr.next` so it points to the previous node `prev` instead of the next node.',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'If you overwrite `curr.next = prev` immediately, you lose the reference to the rest of the list! Save `let nextTemp = curr.next` first.',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'Start with `prev = nil` and `curr = head`. While `curr != nil`: 1) `nextTemp = curr.next`, 2) `curr.next = prev`, 3) `prev = curr`, 4) `curr = nextTemp`. Finally, return `prev`.',
      },
    ],
    starterCode: {
      swift: `// Definition for singly-linked list:
// final class ListNode {
//     var val: Int
//     var next: ListNode?
//     init(_ val: Int, _ next: ListNode? = nil) { self.val = val; self.next = next }
// }

func reverseList(_ head: ListNode?) -> ListNode? {
    // Reverse the linked list in-place in O(n) Time and O(1) Space
    
}`,
      python: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverse_list(head: ListNode | None) -> ListNode | None:
    # Reverse the linked list in-place in O(n) Time and O(1) Space
    pass`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        // Reverse the linked list in-place in O(n) Time and O(1) Space
        return null;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Reverse the linked list in-place in O(n) Time and O(1) Space
        return nullptr;
    }
};`,
      javascript: `function reverseList(head) {
  // Reverse the linked list in-place in O(n) Time and O(1) Space
  
}`,
    },
    optimalSolution: {
      intuition:
        'Using three pointers (`prev`, `curr`, `nextTemp`), we walk down the list once and flip each node’s outgoing arrow backward as we go.',
      lineByLineWalkthrough: [
        'Initialise `prev = nil` (since the old head will become the new tail pointing to nil) and `curr = head`.',
        'Loop while `curr` is not `nil`.',
        'Store `nextTemp = curr.next` before breaking the forward link.',
        'Flip `curr.next = prev`.',
        'Advance `prev = curr` and `curr = nextTemp`.',
        'Return `prev` (the new head).',
      ],
      dryRun:
        'head = [1 -> 2 -> nil]:\n• Step 1: nextTemp=2, 1.next=nil, prev=1, curr=2\n• Step 2: nextTemp=nil, 2.next=1, prev=2, curr=nil\n• Return prev (2 -> 1 -> nil).',
      complexityComparison:
        'Recursive reversal takes O(n) Time and O(n) Call Stack Space. Iterative 3-pointer reversal takes O(n) Time and O(1) Space.',
      codeByLanguage: {
        swift: `func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var curr = head

    while let node = curr {
        let nextTemp = node.next
        node.next = prev
        prev = node
        curr = nextTemp
    }
    return prev
}`,
        python: `def reverse_list(head: ListNode | None) -> ListNode | None:
    prev = None
    curr = head
    while curr is not None:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    return prev`,
        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr != nullptr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};`,
        javascript: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
      },
    },
  },
  {
    id: 'middle-of-linked-list',
    chapterId: 'chapter-linked-lists-core',
    levelId: 'level-5-linked-lists',
    title: 'Middle of the Linked List (Fast & Slow Pointers)',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Fast & Slow Pointers',
    estimatedMinutes: 15,
    description:
      'Given the `head` of a singly linked list, return the **middle node** of the linked list.\n\nIf there are two middle nodes (when the list length is even), return the **second middle** node.',
    realWorldContext:
      'Splitting a linked list into two halves for Merge Sort on Linked Lists or finding the pivot of a streaming chain in one pass.',
    constraints: [
      'The number of nodes in the list is in the range [1, 100]',
      '1 <= Node.val <= 100',
      'Target Time Complexity: O(n) (Single pass)',
      'Target Space Complexity: O(1)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'head = [1, 2, 3, 4, 5]',
        expectedOutput: 'Node(3) -> [3, 4, 5]',
        explanation: 'The middle node of a 5-node list is node 3.',
      },
      {
        id: 'st-2',
        input: 'head = [1, 2, 3, 4, 5, 6]',
        expectedOutput: 'Node(4) -> [4, 5, 6]',
        explanation: 'With 6 nodes, the middle nodes are 3 and 4; return the second middle node (4).',
      },
    ],
    hiddenTestsCount: 6,
    edgeCaseCategories: ['Single node [1]', 'Two nodes [1, 2]', 'Even vs odd length lists'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n) with O(n) array copy',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['append(', 'Array('],
        optimalKeywords: ['slow', 'fast'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'Can you traverse the list with two pointers moving at different speeds so that when the faster pointer hits the end, the slower pointer is in the middle?',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'Start `slow = head` and `fast = head`. Move `slow` by 1 step and `fast` by 2 steps in each iteration.',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'Loop `while fast != nil && fast?.next != nil`: set `slow = slow?.next` and `fast = fast?.next?.next`. When the loop ends, `slow` points directly to the middle node (and automatically lands on the second middle for even lengths!).',
      },
    ],
    starterCode: {
      swift: `func middleNode(_ head: ListNode?) -> ListNode? {
    // Use Fast & Slow pointers in O(n) Time, O(1) Space
    
}`,
      python: `def middle_node(head: ListNode | None) -> ListNode | None:
    # Use Fast & Slow pointers in O(n) Time, O(1) Space
    pass`,
      java: `class Solution {
    public ListNode middleNode(ListNode head) {
        // Use Fast & Slow pointers in O(n) Time, O(1) Space
        return null;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        // Use Fast & Slow pointers in O(n) Time, O(1) Space
        return nullptr;
    }
};`,
      javascript: `function middleNode(head) {
  // Use Fast & Slow pointers in O(n) Time, O(1) Space
  
}`,
    },
    optimalSolution: {
      intuition:
        'Because `fast` travels twice as fast as `slow`, when `fast` covers the full length `n`, `slow` has covered `n / 2`.',
      lineByLineWalkthrough: [
        'Initialise `slow = head` and `fast = head`.',
        'Continue while `fast != nil` and `fast.next != nil`.',
        'Advance `slow` by 1 node and `fast` by 2 nodes.',
        'Return `slow`.',
      ],
      dryRun:
        'head = [1, 2, 3, 4]:\n• Start: slow=1, fast=1\n• Step 1: slow=2, fast=3\n• Step 2: slow=3, fast=nil (loop ends) -> returns Node(3), the second middle!',
      complexityComparison:
        'Copying nodes into an array takes O(n) Space. Counting length in pass 1 and walking to n/2 in pass 2 takes two passes. Fast/Slow pointers do it in 1 pass and O(1) Space.',
      codeByLanguage: {
        swift: `func middleNode(_ head: ListNode?) -> ListNode? {
    var slow = head
    var fast = head
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
    }
    return slow
}`,
        python: `def middle_node(head: ListNode | None) -> ListNode | None:
    slow = head
    fast = head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
    return slow`,
        java: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }
};`,
        javascript: `function middleNode(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
      },
    },
  },
  {
    id: 'detect-linked-list-cycle',
    chapterId: 'chapter-linked-lists-core',
    levelId: 'level-5-linked-lists',
    title: 'Detect Cycle in a Linked List (Floyd’s Tortoise & Hare)',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Fast & Slow Pointers',
    estimatedMinutes: 15,
    description:
      'Given `head`, the head of a linked list, determine if the linked list has a **cycle** in it.\n\nReturn `true` if there is a cycle in the linked list, or `false` otherwise. Solve it using `O(1)` memory.',
    realWorldContext:
      'Detecting circular dependency loops or corrupted pointer chains in memory allocators and graph references.',
    constraints: [
      'The number of nodes in the list is in the range [0, 10^4]',
      '-10^5 <= Node.val <= 10^5',
      'Target Time Complexity: O(n)',
      'Target Space Complexity: O(1)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'head = [3, 2, 0, -4], tail connects to index 1 (node 2)',
        expectedOutput: 'true',
        explanation: 'There is a cycle where tail (-4) points back to node 2.',
      },
      {
        id: 'st-2',
        input: 'head = [1, 2], tail connects to nil',
        expectedOutput: 'false',
        explanation: 'The list terminates at nil with no cycle.',
      },
    ],
    hiddenTestsCount: 7,
    edgeCaseCategories: ['Empty list', 'Single node pointing to itself', 'Duplicate node values without a cycle'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n)',
      suboptimalTimeComplexity: 'O(n) with O(n) Set memory',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['Set<', 'HashSet'],
        optimalKeywords: ['slow', 'fast', '===', 'is fast'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'If a list has a cycle, a single walker pointer will loop forever. How can two pointers moving at different speeds detect that they are on a circular track?',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'Move `slow` by 1 step and `fast` by 2 steps. If `fast` reaches `nil`, there is no cycle. If a cycle exists, `fast` will eventually catch up to `slow`!',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'Inside `while fast != nil && fast?.next != nil`, advance `slow` and `fast` first, then check if they point to the exact same node instance (`if slow === fast` in Swift/JS, `slow is fast` in Python).',
      },
    ],
    starterCode: {
      swift: `func hasCycle(_ head: ListNode?) -> Bool {
    // Use Floyd's Fast & Slow Pointers in O(n) Time and O(1) Space
    
}`,
      python: `def has_cycle(head: ListNode | None) -> bool:
    # Use Floyd's Fast & Slow Pointers in O(n) Time and O(1) Space
    pass`,
      java: `public class Solution {
    public boolean hasCycle(ListNode head) {
        // Use Floyd's Fast & Slow Pointers in O(n) Time and O(1) Space
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        // Use Floyd's Fast & Slow Pointers in O(n) Time and O(1) Space
        return false;
    }
};`,
      javascript: `function hasCycle(head) {
  // Use Floyd's Fast & Slow Pointers in O(n) Time and O(1) Space
  
}`,
    },
    optimalSolution: {
      intuition:
        'Once both pointers enter the cycle, `fast` closes the distance to `slow` by exactly 1 node per step, so they are guaranteed to land on the same node.',
      lineByLineWalkthrough: [
        'Start `slow = head` and `fast = head`.',
        'While `fast` and `fast.next` are not null, advance `slow` by 1 and `fast` by 2.',
        'Check reference identity (`slow === fast`). If equal, return `true`.',
        'If the loop finishes (`fast` hit null), return `false`.',
      ],
      dryRun:
        'head = 3 -> 2 -> 0 -> -4 -> (back to 2):\n• Step 1: slow=2, fast=0\n• Step 2: slow=0, fast=2\n• Step 3: slow=-4, fast=-4 -> slow === fast! Return true.',
      complexityComparison:
        'Storing visited nodes in a Hash Set requires O(n) extra memory. Floyd’s Tortoise & Hare uses only 2 pointers (O(1) memory).',
      codeByLanguage: {
        swift: `func hasCycle(_ head: ListNode?) -> Bool {
    var slow = head
    var fast = head

    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
        if slow === fast {
            return true
        }
    }
    return false
}`,
        python: `def has_cycle(head: ListNode | None) -> bool:
    slow = head
    fast = head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
        java: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
        cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`,
        javascript: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      },
    },
  },
  {
    id: 'merge-two-sorted-lists',
    chapterId: 'chapter-linked-lists-core',
    levelId: 'level-5-linked-lists',
    title: 'Merge Two Sorted Linked Lists (Dummy Head Pattern)',
    difficulty: 'Easy',
    priority: 'Essential',
    topicTag: 'Linked Lists & Dummy Node',
    estimatedMinutes: 20,
    description:
      'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list by splicing together the nodes of the first two lists, and return the head of the merged linked list.',
    realWorldContext:
      'Merging two chronological event streams or sorted run segments in external merge sort.',
    constraints: [
      'The number of nodes in both lists is in the range [0, 50]',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order',
      'Target Time Complexity: O(n + m)',
      'Target Space Complexity: O(1)',
    ],
    sampleTests: [
      {
        id: 'st-1',
        input: 'list1 = [1, 2, 4], list2 = [1, 3, 4]',
        expectedOutput: '[1, 1, 2, 3, 4, 4]',
        explanation: 'Nodes are spliced in non-decreasing order.',
      },
      {
        id: 'st-2',
        input: 'list1 = [], list2 = [0]',
        expectedOutput: '[0]',
        explanation: 'Merging an empty list with [0] yields [0].',
      },
    ],
    hiddenTestsCount: 7,
    edgeCaseCategories: ['Both lists empty', 'One list empty', 'All elements of list1 smaller than list2'],
    rubric: {
      correctnessMax: 6,
      efficiencyMax: 2,
      edgeCasesMax: 1,
      clarityMax: 1,
      targetTimeComplexity: 'O(n + m)',
      suboptimalTimeComplexity: 'O((n + m) log(n + m))',
      targetSpaceComplexity: 'O(1)',
      efficiencyPatterns: {
        suboptimalKeywords: ['.sort('],
        optimalKeywords: ['dummy', 'tail', 'while'],
      },
    },
    hints: [
      {
        level: 1,
        label: 'Hint 1: Identify the Pattern',
        text: 'Handling the very first node of the merged list often requires messy `if/else` code. How can a temporary placeholder node at the start simplify this?',
      },
      {
        level: 2,
        label: 'Hint 2: Suggest an Approach',
        text: 'Create `let dummy = ListNode(0)` and `var tail = dummy`. Compare `l1.val` and `l2.val`, attach the smaller node to `tail.next`, and advance that list pointer and `tail`.',
      },
      {
        level: 3,
        label: 'Hint 3: Explain the Algorithm',
        text: 'Once either `l1` or `l2` becomes `nil`, simply attach the remaining non-nil list directly to `tail.next` (`tail.next = l1 ?? l2`), and return `dummy.next`!',
      },
    ],
    starterCode: {
      swift: `func mergeTwoLists(_ list1: ListNode?, _ list2: ListNode?) -> ListNode? {
    // Use a Dummy Head node to splice list1 and list2 in O(n + m) Time, O(1) Space
    
}`,
      python: `def merge_two_lists(list1: ListNode | None, list2: ListNode | None) -> ListNode | None:
    # Use a Dummy Head node to splice list1 and list2 in O(n + m) Time, O(1) Space
    pass`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Use a Dummy Head node to splice list1 and list2 in O(n + m) Time, O(1) Space
        return null;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Use a Dummy Head node to splice list1 and list2 in O(n + m) Time, O(1) Space
        return nullptr;
    }
};`,
      javascript: `function mergeTwoLists(list1, list2) {
  // Use a Dummy Head node to splice list1 and list2 in O(n + m) Time, O(1) Space
  
}`,
    },
    optimalSolution: {
      intuition:
        'A Dummy node acts as a fixed anchor before the real head so every node attachment looks identical (`tail.next = smallerNode`). At the end, `dummy.next` is the real merged head.',
      lineByLineWalkthrough: [
        'Create `dummy = ListNode(0)` and `tail = dummy`.',
        'While both `l1` and `l2` are non-null, attach the one with the smaller `val` to `tail.next` and advance that pointer.',
        'Advance `tail = tail.next`.',
        'After the loop, attach whichever list still has nodes remaining (`tail.next = l1 ?? l2`).',
        'Return `dummy.next`.',
      ],
      dryRun:
        'l1 = [1, 4], l2 = [2, 3]:\n• dummy -> 1 (l1=4)\n• dummy -> 1 -> 2 (l2=3)\n• dummy -> 1 -> 2 -> 3 (l2=nil)\n• attach remaining l1 (4) -> return 1 -> 2 -> 3 -> 4.',
      complexityComparison:
        'In-place splicing with a Dummy Node runs in O(n + m) Time and O(1) Auxiliary Space.',
      codeByLanguage: {
        swift: `func mergeTwoLists(_ list1: ListNode?, _ list2: ListNode?) -> ListNode? {
    let dummy = ListNode(0)
    var tail: ListNode? = dummy
    var l1 = list1
    var l2 = list2

    while let n1 = l1, let n2 = l2 {
        if n1.val <= n2.val {
            tail?.next = n1
            l1 = n1.next
        } else {
            tail?.next = n2
            l2 = n2.next
        }
        tail = tail?.next
    }
    tail?.next = l1 ?? l2
    return dummy.next
}`,
        python: `def merge_two_lists(list1: ListNode | None, list2: ListNode | None) -> ListNode | None:
    dummy = ListNode(0)
    tail = dummy
    l1, l2 = list1, list2

    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next

    tail.next = l1 if l1 is not None else l2
    return dummy.next`,
        java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = (list1 != nullptr) ? list1 : list2;
        return dummy.next;
    }
};`,
        javascript: `function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 !== null ? list1 : list2;
  return dummy.next;
}`,
      },
    },
  },
];
