import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { join } from 'path';
import { readFile } from 'fs/promises';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  const cb = jest.fn();
  const timeout = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeout = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, timeout);

    expect(setTimeout).toHaveBeenCalledWith(cb, timeout);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, timeout);

    jest.advanceTimersByTime(timeout - 1);
    expect(cb).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(timeout);
    expect(cb).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const cb = jest.fn();
  const interval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setInterval = jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, interval);
    expect(setInterval).toHaveBeenCalledWith(cb, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(cb, interval);

    jest.advanceTimersByTime(interval - 1);
    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval * 3);
    expect(cb.mock.calls.length).toBeGreaterThanOrEqual(3);

    jest.advanceTimersByTime(interval * 6);
    expect(cb.mock.calls.length).toBeGreaterThanOrEqual(6);

    jest.advanceTimersByTime(interval * 12);
    expect(cb.mock.calls.length).toBeGreaterThanOrEqual(12);
  });
});

describe('readFileAsynchronously', () => {
  const mockExistsSync = existsSync as jest.MockedFunction<typeof existsSync>;
  const mockJoin = join as jest.MockedFunction<typeof join>;
  const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;

  const pathToFile = 'path/to/file';

  test('should call join with pathToFile', async () => {
    const fullPath = '/mock-path';

    mockJoin.mockReturnValue(fullPath);
    mockExistsSync.mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    mockExistsSync.mockReturnValue(false);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'content';

    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(fileContent);

    await expect(readFileAsynchronously(pathToFile)).resolves.toBe(fileContent);
  });
});
