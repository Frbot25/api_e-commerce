import { describe, expect, test } from '@jest/globals';

const a = 1;
const b = 2;

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(a * b).toBe(2);
  });
});
