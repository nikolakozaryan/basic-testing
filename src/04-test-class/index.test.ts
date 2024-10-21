import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('account', () => {
  const money = 42;
  let account: BankAccount = getBankAccount(money);

  afterEach(() => {
    account = getBankAccount(money);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(money);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const recepient = getBankAccount(money);

    expect(() => account.transfer(100, recepient)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(account.deposit(money).getBalance()).toBe(money * 2);
  });

  test('should withdraw money', () => {
    const moneyToWithdraw = 10;

    expect(account.withdraw(moneyToWithdraw).getBalance()).toBe(
      money - moneyToWithdraw,
    );
  });

  test('should transfer money', () => {
    const moneyToTransfer = 10;
    const recepient = getBankAccount(0);

    expect(account.transfer(moneyToTransfer, recepient).getBalance()).toBe(
      money - moneyToTransfer,
    );
    expect(recepient.getBalance()).toBe(moneyToTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetched = await account.fetchBalance();

    if (fetched !== null) {
      expect(typeof fetched).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 50;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
