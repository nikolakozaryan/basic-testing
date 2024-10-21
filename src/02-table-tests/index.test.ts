import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 10, b: 2, action: Action.Add, expected: 12 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 10, b: 2, action: '%', expected: null },
  { a: 10, b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('name', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
