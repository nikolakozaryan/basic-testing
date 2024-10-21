import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: Action.Add })).toBe(13);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: Action.Subtract })).toBe(7);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: Action.Multiply })).toBe(30);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({ a: 10, b: 3, action: Action.Divide }),
    ).toBeCloseTo(3.33);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: Action.Exponentiate })).toBe(
      1000,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 10, b: 3, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 10, b: '3', action: Action.Add })).toBeNull();
  });
});
