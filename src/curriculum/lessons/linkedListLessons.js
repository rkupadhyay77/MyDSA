/**
 * Level 5 Lessons: Linked Lists
 */

export const LINKED_LIST_LESSONS = [
  {
    id: 'linked-lists-nodes-and-pointers',
    chapterId: 'chapter-linked-lists-core',
    levelId: 'level-5-linked-lists',
    lessonNumber: '5.1',
    title: 'Nodes, Pointers & Why Singly Linked Lists Don’t Need Contiguous Memory',
    estimatedMinutes: 25,
    priority: 'Essential',
    isCoreInterview: true,
    nextLessonId: 'linked-list-reversal-and-runners',
    prevLessonId: 'two-pointers-and-sliding-window',
    practiceProblemIds: [
      'reverse-linked-list',
      'middle-of-linked-list',
      'detect-linked-list-cycle',
      'merge-two-sorted-lists',
    ],
    objectives: [
      'Understand what a Node is (`val` + `next` reference) and why Linked Lists can scatter across RAM.',
      'Compare Arrays vs Linked Lists: why Linked Lists lose O(1) index lookup (`list[i]`) but gain O(1) insertion/deletion when you hold a node reference.',
      'Learn why Linked List nodes in Swift MUST be defined with `class` (reference type) rather than `struct` (value type).',
      'Trace pointer rewiring for inserting and deleting nodes without creating orphan nodes or infinite loops.',
    ],
    analogy: {
      title: 'A Treasure Hunt with Clue Cards',
      summary:
        'Unlike theatre seats that sit side-by-side in a row (an Array), a Linked List is like a scavenger hunt where each clue card holds a prize (`val`) and the hiding spot of the NEXT card (`next`).',
      details: [
        'You only hold the location of the very first clue card (`head`).',
        'To reach Clue #4, you cannot teleport! You MUST start at `head` (Clue #1), read where Clue #2 is hidden, go to Clue #2 to find Clue #3, and finally reach Clue #4. That is why finding the k-th node takes O(n) time.',
        'But what if you want to insert a new Clue Card right after Clue #1? You do NOT have to move Clues #2, #3, or #4! You simply write Clue #2’s address on your new card, and update Clue #1 to point to your new card. Zero shifting—O(1) time!',
      ],
    },
    explanation: [
      {
        heading: '1. Anatomy of a Singly Linked List Node',
        body: 'Every node is a small object in memory containing two things:\n1) `val`: The data stored inside the node (e.g., an integer `10`).\n2) `next`: A pointer or reference to the next `ListNode` in the chain—or `nil` / `null` / `None` if this node is the tail (end of the list).',
      },
      {
        heading: '2. Why Swift Uses `class ListNode` and Optional `ListNode?`',
        body: 'In Swift, a `struct` cannot directly contain a stored property of its own type because its memory size would be infinite! More importantly, Linked Lists rely on shared references (two variables pointing to the exact same node in memory). Therefore, we define `final class ListNode` and make `var next: ListNode?` an Optional so the last node can safely point to `nil`.',
      },
      {
        heading: '3. The Golden Rule of Pointer Rewiring',
        body: 'Before you overwrite `current.next = newNode`, ask yourself: "Did I save what `current.next` used to point to?" If you overwrite `current.next` first without saving the rest of the chain, you lose the reference to the remainder of the list forever! Always connect `newNode.next = current.next` FIRST, and then set `current.next = newNode`.',
      },
    ],
    beginnerModeExplanation: {
      title: "Explain Like I'm a Beginner: Arrays vs Linked Lists",
      points: [
        'Need to jump straight to item #500 (`items[500]`)? Use an Array (O(1)). A Linked List takes 500 steps (O(n)).',
        'Need to insert or delete at the very front (`head`) millions of times? A Singly Linked List does it in O(1) by changing 1 pointer! A standard Array shifts everything in O(n).',
        'Never lose `head`! If you move `head = head?.next` to walk through a list, you lost the start of the list. Always create a temporary walker variable `var curr = head`.',
      ],
    },
    visualizerConfig: {
      type: 'linked-list',
      defaultMode: 'operations',
      title: 'Interactive Node & Pointer Rewiring Visualizer (Traverse, Insert, Delete)',
    },
    workedExample: {
      title: 'Inserting Value 25 After Node 20 in [10 -> 20 -> 30]',
      problemStatement: 'Given head pointing to 10 -> 20 -> 30 -> nil, insert a new node with value 25 right after 20.',
      sampleInput: '10 -> 20 -> 30, insert 25 after 20',
      expectedOutput: '10 -> 20 -> 25 -> 30',
      steps: [
        {
          step: 1,
          title: 'Locate the Predecessor Node (`curr` at 20)',
          detail: 'Start `curr = head` (10) and step once (`curr = curr.next`) so `curr` points to node 20.',
        },
        {
          step: 2,
          title: 'Point New Node (25) to 30 First',
          detail: 'Create `newNode = ListNode(25)`. Set `newNode.next = curr.next` (which is node 30). Now both `curr` and `newNode` point to 30.',
        },
        {
          step: 3,
          title: 'Update Node 20 to Point to New Node (25)',
          detail: 'Set `curr.next = newNode`. Now the chain is 10 -> 20 -> 25 -> 30 -> nil!',
        },
      ],
    },
    codeWalkthrough: {
      title: 'Defining ListNode, Traversing & Inserting Safely',
      codeByLanguage: {
        swift: `// Swift: Singly Linked List Node Definition & Operations
final class ListNode {
    var val: Int
    var next: ListNode?

    init(_ val: Int, _ next: ListNode? = nil) {
        self.val = val
        self.next = next
    }
}

// Prepend at Head in O(1) Time
func insertAtHead(_ head: ListNode?, _ val: Int) -> ListNode {
    let newNode = ListNode(val)
    newNode.next = head
    return newNode
}

// Traverse and collect values in O(n) Time
func toArray(_ head: ListNode?) -> [Int] {
    var result: [Int] = []
    var curr = head               // Use a walker pointer so we don't lose head
    while let node = curr {       // Swift optional binding unwraps safely
        result.append(node.val)
        curr = node.next
    }
    return result
}`,
        python: `# Python: Singly Linked List Node Definition & Operations
class ListNode:
    def __init__(self, val: int = 0, next_node=None):
        self.val = val
        self.next = next_node

def insert_at_head(head: ListNode | None, val: int) -> ListNode:
    new_node = ListNode(val)
    new_node.next = head
    return new_node

def to_array(head: ListNode | None) -> list[int]:
    result = []
    curr = head
    while curr is not None:
        result.append(curr.val)
        curr = curr.next
    return result`,
        java: `// Java: Singly Linked List Node Definition & Operations
import java.util.ArrayList;
import java.util.List;

public class ListNode {
    public int val;
    public ListNode next;

    public ListNode(int val) {
        this.val = val;
        this.next = null;
    }

    public static ListNode insertAtHead(ListNode head, int val) {
        ListNode newNode = new ListNode(val);
        newNode.next = head;
        return newNode;
    }

    public static List<Integer> toArray(ListNode head) {
        List<Integer> result = new ArrayList<>();
        ListNode curr = head;
        while (curr != null) {
            result.add(curr.val);
            curr = curr.next;
        }
        return result;
    }
}`,
        cpp: `// C++: Singly Linked List Node Definition & Operations
#include <vector>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* insertAtHead(ListNode* head, int val) {
    ListNode* newNode = new ListNode(val);
    newNode->next = head;
    return newNode;
}

vector<int> toArray(ListNode* head) {
    vector<int> result;
    ListNode* curr = head;
    while (curr != nullptr) {
        result.push_back(curr->val);
        curr = curr->next;
    }
    return result;
}`,
        javascript: `// JavaScript: Singly Linked List Node Definition & Operations
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function insertAtHead(head, val) {
  const newNode = new ListNode(val);
  newNode.next = head;
  return newNode;
}

function toArray(head) {
  const result = [];
  let curr = head;
  while (curr !== null) {
    result.push(curr.val);
    curr = curr.next;
  }
  return result;
}`,
      },
      lineExplanations: [
        {
          lines: '2-9',
          title: 'Reference Type `ListNode` with Optional `next`',
          explanation:
            'Each `ListNode` holds its `val` and a nullable reference `next` to the following node. When `next` is `nil`/`null`, we have reached the end of the list.',
        },
        {
          lines: '12-16',
          title: 'O(1) Insertion at Head',
          explanation:
            'Creating `newNode` and setting `newNode.next = head` takes 2 operations regardless of whether the list has 3 nodes or 3 million nodes.',
        },
        {
          lines: '21-25',
          title: 'Safe Traversal with `while let node = curr`',
          explanation:
            'In Swift, `while let node = curr` unwraps the optional safely until `curr` becomes `nil`, preventing null-pointer crashes.',
        },
      ],
    },
    complexity: {
      time: 'Insert/Delete at Head: O(1) | Search or Access k-th node: O(n) | Delete given predecessor: O(1)',
      space: 'O(1) auxiliary space for traversal and pointer rewiring.',
      beginnerSummary:
        'Linked Lists shine when you insert or splice nodes at known positions in O(1), but they require O(n) sequential stepping to find a position by index.',
    },
    commonMistakes: [
      {
        mistake: 'Accessing `curr.next.val` without checking if `curr.next` is `nil`/`null`.',
        whyItHappens: 'Assuming at least two nodes exist in the list.',
        fix: 'Always guard with `while curr != nil && curr?.next != nil` (or optional chaining `curr?.next?.val` in Swift) before dereferencing `.next`.',
      },
      {
        mistake: 'Creating a cycle by setting `newNode.next = newNode` or overwriting `curr.next` too early.',
        whyItHappens: 'Doing `curr.next = newNode` before `newNode.next = curr.next`.',
        fix: 'Draw the arrows first! Always wire the new node’s outgoing arrow (`newNode.next`) before changing the incoming arrow (`curr.next`).',
      },
    ],
    quiz: [
      {
        id: 'q1-ll-basics',
        question: 'What happens if you execute `curr.next = newNode` BEFORE `newNode.next = curr.next` when inserting in the middle of a Singly Linked List?',
        options: [
          'The list is reversed automatically',
          'You lose the reference to the rest of the list that came after `curr`',
          'Nothing changes; order does not matter',
          'The compiler throws a syntax error',
        ],
        correctIndex: 1,
        explanation:
          '`curr.next` was the only pointer holding the remainder of the chain. Overwriting it first orphans the rest of the list.',
      },
      {
        id: 'q2-ll-swift',
        question: 'In Swift, why do we define `ListNode` as a `class` rather than a `struct`?',
        options: [
          'Because structs cannot store integers',
          'Because linked list nodes require reference semantics and recursive pointer links (`next: ListNode?`)',
          'Because classes are faster than structs in every case',
          'Because structs cannot have initialisers',
        ],
        correctIndex: 1,
        explanation:
          'Linked Lists depend on shared node references and recursive `next: ListNode?` pointers, which require reference semantics (`class`).',
      },
    ],
    summaryNotes: [
      'A Singly Linked List node stores `val` and `next`.',
      'Always use a temporary `curr` pointer to traverse so you never lose `head`.',
      'Wire `newNode.next = curr.next` BEFORE `curr.next = newNode`.',
      'Use a Dummy Head (`let dummy = ListNode(0); dummy.next = head`) whenever the head node itself might be modified or replaced.',
    ],
  },
  {
    id: 'linked-list-reversal-and-runners',
    chapterId: 'chapter-linked-lists-core',
    levelId: 'level-5-linked-lists',
    lessonNumber: '5.2',
    title: 'Reversing a Linked List & Fast/Slow Pointers (Tortoise and Hare)',
    estimatedMinutes: 30,
    priority: 'Essential',
    isCoreInterview: true,
    nextLessonId: null,
    prevLessonId: 'linked-lists-nodes-and-pointers',
    practiceProblemIds: [
      'reverse-linked-list',
      'middle-of-linked-list',
      'detect-linked-list-cycle',
      'merge-two-sorted-lists',
    ],
    objectives: [
      'Master the 3-pointer (`prev`, `curr`, `nextTemp`) in-place Linked List reversal pattern.',
      'Understand Floyd’s Fast & Slow Pointer technique (`slow` moves 1 step, `fast` moves 2 steps).',
      'Find the exact middle of a Linked List in a single pass without counting length first.',
      'Detect whether a Linked List contains a cycle in O(n) time and O(1) space.',
    ],
    analogy: {
      title: 'Two Runners on a Track (The Tortoise and the Hare)',
      summary:
        'Imagine a Slow runner (1 metre/sec) and a Fast runner (2 metres/sec) starting together at the beginning of a path.',
      details: [
        'Finding the Middle: If the path is a straight 100-metre line, when the Fast runner reaches the 100m finish line, where is the Slow runner? Exactly at the 50m halfway mark!',
        'Detecting a Loop (Cycle): What if the path curves into a closed circular track? The Fast runner will never hit an end (`nil`). Instead, the Fast runner will eventually lap the Slow runner from behind and land on the exact same spot!',
      ],
    },
    explanation: [
      {
        heading: '1. In-Place Reversal with Three Pointers (`prev`, `curr`, `nextTemp`)',
        body: 'To reverse `1 -> 2 -> 3 -> nil` into `3 -> 2 -> 1 -> nil` without creating new nodes:\nStart with `prev = nil` and `curr = head`. At each node:\n1) Save the next node before breaking the link: `let nextTemp = curr.next`\n2) Reverse the arrow backward: `curr.next = prev`\n3) Step `prev` forward: `prev = curr`\n4) Step `curr` forward: `curr = nextTemp`\nWhen `curr` becomes `nil`, `prev` is standing on the new head (`3`)!',
      },
      {
        heading: '2. Fast and Slow Pointers (`slow = slow?.next`, `fast = fast?.next?.next`)',
        body: 'By advancing `slow` by 1 node and `fast` by 2 nodes inside `while fast != nil && fast?.next != nil`:\n• If the list has no cycle, `fast` reaches the end in n/2 iterations and `slow` sits right on the middle node.\n• If a cycle exists, `fast` enters the cycle and closes the gap to `slow` by 1 node on every step—guaranteeing they meet inside the cycle in O(n) time and O(1) space!',
      },
    ],
    beginnerModeExplanation: {
      title: "Explain Like I'm a Beginner: The 4-Line Reversal Rhythm",
      points: [
        'Memorise the chain of hand-offs for reversing a list: `nextTemp` -> `curr.next` -> `prev` -> `curr` -> `nextTemp`.',
        'Notice how each variable on the right-hand side of a line becomes the left-hand side of the very next line!',
        'Line 1: `let nextTemp = curr.next` (Save the future)',
        'Line 2: `curr.next = prev` (Flip the arrow)',
        'Line 3: `prev = curr` (Move prev up)',
        'Line 4: `curr = nextTemp` (Move curr up)',
      ],
    },
    visualizerConfig: {
      type: 'linked-list',
      defaultMode: 'reverse',
      title: 'Step-by-Step In-Place Linked List Reversal Visualizer',
    },
    workedExample: {
      title: 'Reversing [10 -> 20 -> 30 -> nil] Step by Step',
      problemStatement: 'Reverse the singly linked list 10 -> 20 -> 30 -> nil in-place and return the new head.',
      sampleInput: '10 -> 20 -> 30 -> nil',
      expectedOutput: '30 -> 20 -> 10 -> nil',
      steps: [
        {
          step: 1,
          title: 'Initial State: prev = nil, curr = 10',
          detail: 'Save `nextTemp = 20`. Flip `10.next = nil`. Advance `prev = 10`, `curr = 20`. Partial reversed list: `10 -> nil`.',
        },
        {
          step: 2,
          title: 'Second Iteration: prev = 10, curr = 20',
          detail: 'Save `nextTemp = 30`. Flip `20.next = 10`. Advance `prev = 20`, `curr = 30`. Partial reversed list: `20 -> 10 -> nil`.',
        },
        {
          step: 3,
          title: 'Third Iteration: prev = 20, curr = 30',
          detail: 'Save `nextTemp = nil`. Flip `30.next = 20`. Advance `prev = 30`, `curr = nil`. Loop ends and we return `prev` (30)!',
        },
      ],
    },
    codeWalkthrough: {
      title: 'In-Place Reversal & Fast/Slow Middle Finder',
      codeByLanguage: {
        swift: `// Swift: In-Place Linked List Reversal — O(n) Time, O(1) Space
func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var curr = head

    while let node = curr {
        let nextTemp = node.next  // 1. Save next node
        node.next = prev          // 2. Reverse pointer backward
        prev = node               // 3. Advance prev to current node
        curr = nextTemp           // 4. Advance curr to saved next node
    }
    return prev                   // prev is now the new head!
}

// Fast & Slow Pointers: Find Middle Node in O(n) Time, O(1) Space
func middleNode(_ head: ListNode?) -> ListNode? {
    var slow = head
    var fast = head
    while fast != nil && fast?.next != nil {
        slow = slow?.next
        fast = fast?.next?.next
    }
    return slow
}`,
        python: `# Python: In-Place Linked List Reversal & Middle Finder
def reverse_list(head: ListNode | None) -> ListNode | None:
    prev = None
    curr = head

    while curr is not None:
        next_temp = curr.next     # 1. Save next node
        curr.next = prev          # 2. Reverse pointer backward
        prev = curr               # 3. Advance prev
        curr = next_temp          # 4. Advance curr
    return prev

def middle_node(head: ListNode | None) -> ListNode | None:
    slow = head
    fast = head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
    return slow`,
        java: `// Java: In-Place Linked List Reversal & Middle Finder
public class LinkedListPatterns {
    public static ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next; // 1. Save next node
            curr.next = prev;              // 2. Reverse pointer
            prev = curr;                   // 3. Advance prev
            curr = nextTemp;               // 4. Advance curr
        }
        return prev;
    }

    public static ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`,
        cpp: `// C++: In-Place Linked List Reversal & Middle Finder
ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* curr = head;

    while (curr != nullptr) {
        ListNode* nextTemp = curr->next; // 1. Save next node
        curr->next = prev;               // 2. Reverse pointer
        prev = curr;                     // 3. Advance prev
        curr = nextTemp;                 // 4. Advance curr
    }
    return prev;
}

ListNode* middleNode(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast != nullptr && fast->next != nullptr) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
        javascript: `// JavaScript: In-Place Linked List Reversal & Middle Finder
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next; // 1. Save next node
    curr.next = prev;           // 2. Reverse pointer
    prev = curr;                // 3. Advance prev
    curr = nextTemp;            // 4. Advance curr
  }
  return prev;
}

function middleNode(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,
      },
      lineExplanations: [
        {
          lines: '6-11',
          title: 'The 4-Step Pointer Reversal Loop',
          explanation:
            'We save `node.next` in `nextTemp`, flip `node.next` to point to `prev`, and shift both `prev` and `curr` one step forward. When `curr` hits `nil`, `prev` points to the former tail (now the new head).',
        },
        {
          lines: '18-21',
          title: 'Loop Guard `fast != nil && fast?.next != nil`',
          explanation:
            'Because `fast` jumps two steps (`fast?.next?.next`), we must verify both `fast` and `fast.next` are non-nil before jumping.',
        },
      ],
    },
    complexity: {
      time: 'O(n) — Both In-Place Reversal and Fast/Slow Pointers visit each node at most once.',
      space: 'O(1) — Only pointer variables (`prev`, `curr`, `nextTemp` or `slow`, `fast`) are used.',
      beginnerSummary:
        'Avoid copying a Linked List into an Array just to reverse it or find its middle—that wastes O(n) extra memory when three pointers can do it in O(1) memory!',
    },
    commonMistakes: [
      {
        mistake: 'Returning `curr` instead of `prev` at the end of `reverseList`.',
        whyItHappens: 'Forgetting that the `while` loop stops specifically when `curr` becomes `nil`!',
        fix: 'At the moment the loop terminates, `curr` is `nil` and `prev` holds the last real node (the new head). Always `return prev`.',
      },
      {
        mistake: 'Using `===` vs `==` when checking if two nodes are the SAME node in a cycle.',
        whyItHappens: 'Comparing `slow.val == fast.val` instead of comparing node identity.',
        fix: 'Two different nodes can hold the same integer value! In cycle detection, compare node references (`slow === fast` in Swift/JS, `slow is fast` in Python, `slow == fast` reference equality in Java/C++).',
      },
    ],
    quiz: [
      {
        id: 'q1-ll-reverse',
        question: 'When the `while` loop in iterative `reverseList` finishes, what is the value of `curr` and what should the function return?',
        options: [
          '`curr` is the new head; return `curr`',
          '`curr` is `nil`/`null`; return `prev`',
          '`curr` is the old head; return `nextTemp`',
          '`curr` is the middle node; return `curr`',
        ],
        correctIndex: 1,
        explanation:
          'The loop condition `while curr != nil` only stops when `curr` steps past the tail and becomes `nil`. `prev` is sitting on the new head.',
      },
      {
        id: 'q2-ll-fastslow',
        question: 'In Floyd’s Cycle Detection algorithm, what is the auxiliary Space Complexity compared to storing visited nodes in a Hash Set?',
        options: [
          'O(1) for Fast/Slow Pointers vs O(n) for a Hash Set',
          'O(n) for both',
          'O(log n) for Fast/Slow Pointers',
          'O(n²) for Fast/Slow Pointers',
        ],
        correctIndex: 0,
        explanation:
          'Fast and Slow pointers only use 2 node references (`O(1)` memory), whereas a Hash Set stores up to `n` node references (`O(n)` memory).',
      },
    ],
    summaryNotes: [
      'Iterative Reversal uses `prev = nil`, `curr = head`, and inside the loop: `nextTemp = curr.next; curr.next = prev; prev = curr; curr = nextTemp`, returning `prev`.',
      'Fast & Slow Pointers (`slow` +1, `fast` +2) find the middle node or detect cycles in O(n) Time and O(1) Space.',
      'In Swift, compare node reference identity with `===` (`if slow === fast`).',
    ],
  },
];
