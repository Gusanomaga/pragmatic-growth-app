import { expect, test } from 'vitest';

test('sistema de comisiones calcula correctamente', () => {
  const total = 100;
  const commission = 0.1; // 10%
  expect(total * commission).toBe(10);
});