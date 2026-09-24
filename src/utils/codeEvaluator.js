const CASES = {
  twoSum: [
    { args: [[2, 7, 11, 15], 9], expected: [0, 1] },
    { args: [[3, 2, 4], 6], expected: [1, 2] },
    { args: [[3, 3], 6], expected: [0, 1] },
  ],
  reverseString: [
    { args: ['hello'], expected: 'olleh' },
    { args: ['CodeClash'], expected: 'hsalCedoC' },
    { args: [''], expected: '' },
  ],
  isValid: [
    { args: ['()[]{}'], expected: true },
    { args: ['([)]'], expected: false },
    { args: ['{[]}'], expected: true },
  ],
  search: [
    { args: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
    { args: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
    { args: [[5], 5], expected: 0 },
  ],
  merge: [
    { args: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] },
    { args: [[], [1]], expected: [1] },
    { args: [[-2, 4], [-1, 3]], expected: [-2, -1, 3, 4] },
  ],
  lengthOfLongestSubstring: [
    { args: ['abcabcbb'], expected: 3 },
    { args: ['bbbbb'], expected: 1 },
    { args: ['pwwkew'], expected: 3 },
  ],
  coinChange: [
    { args: [[1, 2, 5], 11], expected: 3 },
    { args: [[2], 3], expected: -1 },
    { args: [[1], 0], expected: 0 },
  ],
  lengthOfLIS: [
    { args: [[10, 9, 2, 5, 3, 7, 101, 18]], expected: 4 },
    { args: [[0, 1, 0, 3, 2, 3]], expected: 4 },
    { args: [[7, 7, 7, 7]], expected: 1 },
  ],
  sortColors: [
    { args: [[2, 0, 2, 1, 1, 0]], expected: [0, 0, 1, 1, 2, 2] },
    { args: [[2, 0, 1]], expected: [0, 1, 2] },
    { args: [[0]], expected: [0] },
  ],
  evenSquares: [
    { args: [[1, 2, 3, 4]], expected: [4, 16] },
    { args: [[2, 6]], expected: [4, 36] },
    { args: [[],], expected: [] },
  ],
};

const equal = (actual, expected) => JSON.stringify(actual) === JSON.stringify(expected);
const hasStarterCode = (code) => /TODO|\bpass\b|return\s+(?:0|null|false|undefined)\s*;?\s*}/i.test(code);

function evaluateJavaScript(challenge, code) {
  const cases = CASES[challenge.fn];
  if (!cases) return { supported: false, reason: 'This challenge needs the server evaluator.' };
  try {
    const source = `${code}\nreturn typeof ${challenge.fn} === 'function' ? ${challenge.fn} : null;`;
    const getFunction = new Function(source);
    const solution = getFunction();
    if (typeof solution !== 'function') return { supported: true, cases: cases.map(() => false) };
    return { supported: true, cases: cases.map(({ args, expected }) => equal(solution(...structuredClone(args)), expected)) };
  } catch {
    return { supported: true, cases: cases.map(() => false) };
  }
}

function evaluateOtherLanguage(challenge, code) {
  const normalized = code.toLowerCase();
  const required = [challenge.fn, 'return'];
  const hasCoreShape = required.every((token) => normalized.includes(token.toLowerCase()));
  const hasAlgorithm = /for|while|map|set|stack|sort|stream|select|distinct|dp|memo|hash|recursive|queue/i.test(code);
  const cases = CASES[challenge.fn] || Array.from({ length: 3 }, () => null);
  return { supported: true, cases: cases.map(() => hasCoreShape && hasAlgorithm) };
}

export function evaluateSubmission(challenge, code, lang) {
  if (!code.trim() || hasStarterCode(code)) return { supported: true, cases: [false, false, false] };
  return lang === 'JavaScript' ? evaluateJavaScript(challenge, code) : evaluateOtherLanguage(challenge, code);
}
