// Uncomment the code below and write your tests
// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {});

  test('should call callback only after timeout', () => {});
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {});

  test('should call callback multiple times after multiple intervals', () => {});
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {});

  test('should return null if file does not exist', async () => {});

  test('should return file content if file exists', async () => {});
});
