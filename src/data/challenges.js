export const CATEGORIES = ['Arrays','Strings','Hashing','Linked List','Stack','Queue','Trees','Graphs','Dynamic Programming','Sorting','Searching','Backtracking','Two Pointers','Sliding Window','Greedy','Heap','Tries','Union Find','Bit Manipulation','Math','Java','SQL'];
// [title, difficulty, category, minutes, statement, exampleIn, exampleOut, explanation, hint1, hint2, fn]
const RAW = [
['Two Sum','Easy','Arrays',15,'Given an array of integers and a target, return the indices of the two numbers that add up to the target.','nums=[2,7,11,15], target=9','[0,1]','nums[0]+nums[1]=9.','Store seen values in a hash map.','For each x, look up target-x.','twoSum'],
['Reverse String','Easy','Strings',10,'Reverse the given string in place and return it.','"hello"','"olleh"','Swap characters from both ends.','Use two pointers.','Stop when they meet.','reverseString'],
['Valid Parentheses','Easy','Stack',15,'Given a string of brackets ()[]{}, determine whether it is valid (properly opened and closed in order).','"()[]{}"','true','Every opener is closed by the same type in the right order.','A stack fits naturally.','Push openers, pop on closers.','isValid'],
['Binary Search','Easy','Searching',10,'Given a sorted array and a target, return the index of the target or -1.','nums=[-1,0,3,5,9,12], target=9','4','9 is at index 4.','Halve the range each step.','Watch out for overflow in mid.','search'],
['Merge Sorted Arrays','Easy','Arrays',15,'Merge two sorted arrays into a single sorted array.','[1,3,5], [2,4,6]','[1,2,3,4,5,6]','Compare heads of both arrays repeatedly.','Use two pointers.','Append leftovers at the end.','merge'],
['Longest Substring','Medium','Strings',25,'Find the length of the longest substring without repeating characters.','"abcabcbb"','3','"abc" is the longest.','Sliding window.','Track last-seen index per char.','lengthOfLongestSubstring'],
['Group Anagrams','Medium','Hashing',25,'Group the strings that are anagrams of each other.','["eat","tea","tan","ate","nat","bat"]','[["eat","tea","ate"],["tan","nat"],["bat"]]','Sorted letters form the same key.','Use a sorted string as a map key.','Map<String,List<String>>.','groupAnagrams'],
['Linked List Cycle','Medium','Linked List',20,'Determine whether a linked list contains a cycle.','head=[3,2,0,-4], pos=1','true','Tail connects back to node 1.','Two pointers at different speeds.','If they meet, there is a cycle.','hasCycle'],
['Binary Tree Traversal','Medium','Trees',25,'Return the inorder traversal of a binary tree.','root=[1,null,2,3]','[1,3,2]','Left, node, right.','Recursion is easiest.','Try it iteratively with a stack.','inorder'],
['Number of Islands','Medium','Graphs',30,'Count islands in a grid of 1s (land) and 0s (water).','[[1,1,0],[0,1,0],[0,0,1]]','2','Two connected land groups.','DFS/BFS from every unvisited land cell.','Mark visited cells.','numIslands'],
['Coin Change','Medium','Dynamic Programming',30,'Return the fewest coins needed to make an amount, or -1.','coins=[1,2,5], amount=11','3','5+5+1.','dp[a] = min(dp[a-c])+1.','Initialise with infinity.','coinChange'],
['Longest Increasing Subsequence','Hard','Dynamic Programming',40,'Return the length of the longest strictly increasing subsequence.','[10,9,2,5,3,7,101,18]','4','[2,3,7,101].','O(n^2) DP first.','Then try patience sorting + binary search.','lengthOfLIS'],
['Word Ladder','Hard','Graphs',45,'Find the length of the shortest transformation sequence from beginWord to endWord changing one letter at a time.','hit → cog','5','hit→hot→dot→dog→cog.','Shortest path means BFS.','Generate neighbours with wildcards.','ladderLength'],
['N-Queens','Hard','Backtracking',45,'Place n queens on an n×n board so none attack each other; return the number of solutions.','n=4','2','Two valid boards exist.','Place one queen per row.','Track columns and diagonals in sets.','totalNQueens'],
['Minimum Window Substring','Hard','Strings',45,'Return the smallest window of s that contains all characters of t.','s="ADOBECODEBANC", t="ABC"','"BANC"','Shortest window containing A, B and C.','Sliding window with counts.','Shrink when all needed chars are covered.','minWindow'],
['Queue Using Stacks','Easy','Queue',20,'Implement a FIFO queue using only two stacks.','push(1), push(2), pop()','1','The first pushed element leaves first.','Use an input and an output stack.','Move elements only when output is empty.','MyQueue'],
['Sort Colors','Medium','Sorting',20,'Sort an array of 0s, 1s and 2s in place.','[2,0,2,1,1,0]','[0,0,1,1,2,2]','Sorted by colour.','Dutch national flag.','Three pointers.','sortColors'],
['Java Streams Filter','Easy','Java',15,'Using Java Streams, return the squares of the even numbers in a list.','[1,2,3,4]','[4,16]','Only 2 and 4 are even.','filter() then map().','collect(Collectors.toList()).','evenSquares'],
['Second Highest Salary','Medium','SQL',20,'Write a SQL query to get the second highest distinct salary from Employee, or NULL.','Employee: 100, 200, 300','200','300 is highest, 200 is second.','Use DISTINCT with ORDER BY DESC.','LIMIT 1 OFFSET 1.','secondHighest'],
];
const toChallenge = ([title, difficulty, category, minutes, statement, exIn, exOut, expl, h1, h2, fn, source], i) => ({
  id: i + 1, title, difficulty, category, minutes, fn, statement, exIn, exOut, expl, hints: [h1, h2], source,
  xp: { Easy: 50, Medium: 100, Hard: 200 }[difficulty],
  inputFormat: 'A single test case is provided as function arguments (see the example).',
  outputFormat: 'Return the result described in the problem statement.',
  constraints: ['1 ≤ n ≤ 10^5', 'Aim for O(n) or O(n log n) where possible'],
});

const CORE = RAW.map((item) => [...item, 'CodeClash core']);
const PATTERNS = [
  ['Pair Sum', 'Arrays', 'Find two values that satisfy a target relation.', 'values=[2,7,11], target=9', '[0,1]', 'Use a complementary-value lookup.', 'Store values as you scan.', 'Return indices, not values.'],
  ['Range Update', 'Arrays', 'Apply several inclusive range updates and return the final values.', 'values=[0,0,0,0], updates=[[1,3,2]]', '[0,2,2,2]', 'A difference array turns each update into two boundary changes.', 'Restore the running total.', 'Keep indices inside the array.'],
  ['Frequency Counter', 'Hashing', 'Return the most frequent value, breaking ties by first appearance.', 'values=[4,1,4,2,1,4]', '4', 'Count first, then scan for the stable tie break.', 'Use a map for counts.', 'Do not sort away first appearance.'],
  ['Window Maximum', 'Sliding Window', 'Return the maximum value in every window of a fixed size.', 'values=[1,3,-1,-3,5,3], k=3', '[3,3,5,5]', 'A monotonic deque keeps the current maximum at its front.', 'Remove expired indices.', 'Discard smaller values from the back.'],
  ['Two Pointer Pair', 'Two Pointers', 'Find whether a sorted array contains a pair with the requested sum.', 'values=[1,2,4,7], target=6', 'true', 'Move the left or right pointer according to the sum.', 'Start at both ends.', 'The input is sorted.'],
  ['Merge Intervals', 'Sorting', 'Merge overlapping closed intervals and return disjoint intervals.', 'ranges=[[1,3],[2,6],[8,10]]', '[[1,6],[8,10]]', 'Sort by start, then extend the current interval while ranges overlap.', 'Compare with the last output range.', 'Append the finished range.'],
  ['Kth Largest', 'Heap', 'Return the kth largest value in an unsorted array.', 'values=[3,2,1,5,6,4], k=2', '5', 'Maintain a min-heap of size k.', 'The heap root is the answer.', 'Discard smaller candidates.'],
  ['Prefix Query', 'Arrays', 'Answer subarray sum queries for a fixed integer array.', 'values=[2,4,1,3], query=[1,3]', '8', 'Prefix sums answer each query in constant time.', 'Build one extra prefix slot.', 'Subtract the left boundary.'],
  ['Anagram Check', 'Strings', 'Determine whether two strings contain the same character counts.', 'a="listen", b="silent"', 'true', 'Equal frequency maps imply an anagram.', 'Count both strings.', 'Lengths must match.'],
  ['Palindrome Window', 'Strings', 'Return the longest palindromic substring.', 'text="babad"', '"bab"', 'Expand around every possible center.', 'Try odd and even centers.', 'Keep the longest range.'],
  ['Decode Ways', 'Dynamic Programming', 'Count valid decodings of a digit string using one or two digits.', 'digits="226"', '3', 'Let dp[i] represent ways to decode the prefix ending at i.', 'Reject invalid zeroes.', 'Check one and two digit transitions.'],
  ['Minimum Path', 'Dynamic Programming', 'Find the minimum cost path from the top-left to the bottom-right of a grid.', 'grid=[[1,3,1],[1,5,1],[4,2,1]]', '7', 'Each cell keeps its value plus the cheaper predecessor.', 'Initialize the first row and column.', 'Only move right or down.'],
  ['Activity Selection', 'Greedy', 'Select the maximum number of non-overlapping activities.', 'activities=[[1,2],[2,4],[3,5]]', '2', 'Choose the activity that finishes earliest.', 'Sort by finish time.', 'Reject overlapping starts.'],
  ['Gas Route', 'Greedy', 'Find a starting station that completes a circular route, or -1.', 'gas=[1,2,3], cost=[2,2,1]', '2', 'If the running balance fails, the next station is the only possible restart.', 'Track total balance.', 'Reset after a negative prefix.'],
  ['Connected Components', 'Union Find', 'Count connected components in an undirected graph.', 'n=5, edges=[[0,1],[1,2],[3,4]]', '2', 'Union endpoints and count distinct roots.', 'Initialize one set per vertex.', 'Path compression keeps finds fast.'],
  ['Shortest Grid Path', 'Graphs', 'Find the shortest four-direction path through open grid cells.', 'grid=[[0,0,1],[1,0,0]], start=[0,0], end=[1,2]', '3', 'Breadth-first search visits cells by distance.', 'Queue positions with their distance.', 'Mark cells when enqueued.'],
  ['Tree Level Order', 'Trees', 'Return the values of a binary tree grouped by depth.', 'root=[3,9,20,null,null,15,7]', '[[3],[9,20],[15,7]]', 'Process one queue layer at a time.', 'Record the layer length.', 'Enqueue children after reading a node.'],
  ['Lowest Common Ancestor', 'Trees', 'Find the lowest shared ancestor of two nodes in a binary tree.', 'root=[3,5,1,6,2,0,8], p=5, q=1', '3', 'A postorder search reports when both targets appear below a node.', 'Return found nodes upward.', 'A node can be an ancestor of itself.'],
  ['Valid Stack Order', 'Stack', 'Determine whether a pop sequence can be produced from a push sequence.', 'pushed=[1,2,3], popped=[2,3,1]', 'true', 'Simulate pushes and pop whenever the stack top matches.', 'Use one stack.', 'Finish by checking the stack is empty.'],
  ['Queue Simulation', 'Queue', 'Process commands in FIFO order and return all values removed.', 'commands=[push(4),push(8),pop(),pop()]', '[4,8]', 'A queue removes the oldest pending value first.', 'Use a head index for efficient removal.', 'Preserve command order.'],
  ['Word Prefix', 'Tries', 'Return the longest common prefix of a list of words.', 'words=["flower","flow","flight"]', '"fl"', 'Compare characters while every word has the same next character.', 'Use the shortest word as a bound.', 'Stop at the first mismatch.'],
  ['Bit Count', 'Bit Manipulation', 'Return the number of set bits in a non-negative integer.', 'value=13', '3', 'Repeatedly clear the lowest set bit.', 'Use value & (value - 1).', 'Zero has no set bits.'],
  ['Prime Count', 'Math', 'Count primes strictly smaller than a given limit.', 'limit=10', '4', 'Sieve multiples beginning at the square of each prime.', 'Mark composites in a boolean array.', 'Return the count of unmarked values.'],
  ['Subsets', 'Backtracking', 'Return every subset of a list of distinct values.', 'values=[1,2]', '[[],[1],[2],[1,2]]', 'Choose or skip each value during the recursion.', 'Backtrack after each choice.', 'Copy the current path.'],
  ['N Rooks', 'Backtracking', 'Count ways to place n non-attacking rooks on an n by n board.', 'n=3', '6', 'Place one rook per row and track used columns.', 'Backtrack by row.', 'Each column can be used once.'],
];
const SOURCES = ['LeetCode-style', 'GeeksforGeeks-style', 'CodeChef-style'];
const PRACTICE = Array.from({ length: 20 }, (_, variant) => PATTERNS.map(([name, category, statement, exIn, exOut, expl, h1, h2], pattern) => {
  const difficulty = variant % 5 < 2 ? 'Easy' : variant % 5 < 4 ? 'Medium' : 'Hard';
  const suffix = variant + 1;
  return [`${name} Practice ${suffix}`, difficulty, category, difficulty === 'Easy' ? 15 : difficulty === 'Medium' ? 25 : 40,
    statement, exIn, exOut, expl, h1, h2, `${name.replace(/[^A-Za-z]/g, '').toLowerCase()}${suffix}_${pattern}`, SOURCES[(variant + pattern) % SOURCES.length]];
})).flat().map((item, i) => { item[0] = `Practice ${i + 1}: ${item[0]}`; return item; });
export const CHALLENGES = [...CORE, ...PRACTICE].map(toChallenge);
const signature = (c, lang) => {
  if (c.fn === 'twoSum') return {
    Java: `public static int[] ${c.fn}(int[] nums, int target)`,
    Python: `def ${c.fn}(nums, target)`,
    'C++': `vector<int> ${c.fn}(vector<int>& nums, int target)`,
    JavaScript: `function ${c.fn}(nums, target)`,
  }[lang];
  return {
    Java: `public static int ${c.fn}(int[] input)`,
    Python: `def ${c.fn}(data)`,
    'C++': `int ${c.fn}(vector<int>& data)`,
    JavaScript: `function ${c.fn}(data)`,
  }[lang];
};
export const starter = (c, lang) => ({
  Java: `public class Solution {\n    ${signature(c, lang)} {\n        // Input example: ${c.exIn}\n        // TODO: write your solution\n        return ${c.fn === 'twoSum' ? 'new int[0]' : '0'};\n    }\n}`,
  Python: `${signature(c, lang)}:\n    # Input example: ${c.exIn}\n    # TODO: write your solution\n    pass`,
  'C++': `#include <bits/stdc++.h>\nusing namespace std;\n\n${signature(c, lang)} {\n    // Input example: ${c.exIn}\n    // TODO: write your solution\n    return ${c.fn === 'twoSum' ? '{}' : '0'};\n}`,
  JavaScript: `${signature(c, lang)} {\n  // Input example: ${c.exIn}\n  // TODO: write your solution\n}`,
})[lang];
export const LANGS = ['Java', 'Python', 'C++', 'JavaScript'];
