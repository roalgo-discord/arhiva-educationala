import { beforeAll, afterEach, afterAll } from 'vitest';

// Mock fetch globally for tests
global.fetch = vi.fn();

beforeAll(() => {
  // Setup before all tests
});

afterEach(() => {
  // Clear all mocks after each test
  vi.clearAllMocks();
});

afterAll(() => {
  // Cleanup after all tests
  vi.restoreAllMocks();
});