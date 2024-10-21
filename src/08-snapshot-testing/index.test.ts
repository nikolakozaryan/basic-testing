import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const elements = ['one', 'two', 'three'];
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const manualList = {
      value: 'one',
      next: {
        value: 'two',
        next: { value: 'three', next: { value: null, next: null } },
      },
    };

    expect(generateLinkedList(elements)).toStrictEqual(manualList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
