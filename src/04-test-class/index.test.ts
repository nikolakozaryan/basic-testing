// Uncomment the code below and write your tests
// import { getBankAccount } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {});

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {});

  test('should throw error when transferring more than balance', () => {});

  test('should throw error when transferring to the same account', () => {});

  test('should deposit money', () => {});

  test('should withdraw money', () => {});

  test('should transfer money', () => {});

  test('fetchBalance should return number in case if request did not failed', async () => {});

  test('should set new balance if fetchBalance returned number', async () => {});

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {});
});
