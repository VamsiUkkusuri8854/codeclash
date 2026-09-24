export const CATEGORIES = ['Arrays','Strings','Hashing','Linked List','Stack','Queue','Trees','Graphs','Dynamic Programming','Sorting','Searching','Backtracking','Java','SQL'];
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
export const CHALLENGES = RAW.map(([title, difficulty, category, minutes, statement, exIn, exOut, expl, h1, h2, fn], i) => ({
  id: i + 1, title, difficulty, category, minutes, fn, statement, exIn, exOut, expl, hints: [h1, h2],
  xp: { Easy: 50, Medium: 100, Hard: 200 }[difficulty],
  inputFormat: 'A single test case is provided as function arguments (see the example).',
  outputFormat: 'Return the result described in the problem statement.',
  constraints: ['1 ≤ n ≤ 10^5', 'Aim for O(n) or O(n log n) where possible'],
}));
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
