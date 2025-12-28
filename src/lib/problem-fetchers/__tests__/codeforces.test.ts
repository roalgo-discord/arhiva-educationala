import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCodeforces } from '../codeforces';

describe('fetchCodeforces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('successful API responses', () => {
    it('should fetch problem data successfully', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 123,
              index: 'A',
              name: 'Test Problem',
              rating: 1200,
              tags: ['dp', 'greedy'],
              type: 'PROGRAMMING',
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchCodeforces('https://codeforces.com/contest/123/problem/A');

      expect(result).toEqual({
        url: 'https://codeforces.com/contest/123/problem/A',
        platform: 'codeforces',
        title: 'A. Test Problem',
        difficulty: {
          value: 1200,
          label: '1200',
        },
        tags: ['dp', 'greedy'],
        source: 'Codeforces 123',
        fetched: true,
      });
    });

    it('should handle problems without rating', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 456,
              index: 'B',
              name: 'Another Problem',
              tags: ['math'],
              type: 'PROGRAMMING',
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchCodeforces('https://codeforces.com/contest/456/problem/B');

      expect(result.difficulty).toBeUndefined();
      expect(result.title).toBe('B. Another Problem');
    });

    it('should handle problems with multichar indices', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 789,
              index: 'A1',
              name: 'Subproblem',
              rating: 1500,
              tags: ['implementation'],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchCodeforces('https://codeforces.com/contest/789/problem/A1');

      expect(result.title).toBe('A1. Subproblem');
    });

    it('should handle empty tags array', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 100,
              index: 'C',
              name: 'No Tags Problem',
              tags: [],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchCodeforces('https://codeforces.com/contest/100/problem/C');

      expect(result.tags).toEqual([]);
    });
  });

  describe('URL parsing', () => {
    it('should parse contest URLs', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 123,
              index: 'A',
              name: 'Test',
              tags: [],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await fetchCodeforces('https://codeforces.com/contest/123/problem/A');
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should parse problemset URLs', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 456,
              index: 'B',
              name: 'Test',
              tags: [],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await fetchCodeforces('https://codeforces.com/problemset/problem/456/B');
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should parse gym URLs', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 102134,
              index: 'A',
              name: 'Test',
              tags: [],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await fetchCodeforces('https://codeforces.com/gym/102134/problem/A');
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should default to index A when not specified', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 999,
              index: 'A',
              name: 'Default Problem',
              tags: [],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await fetchCodeforces('https://codeforces.com/contest/999');
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid URL format', async () => {
      await expect(fetchCodeforces('https://invalid-url.com/problem')).rejects.toThrow(
        'Invalid Codeforces URL'
      );
    });

    it('should throw error when API returns non-OK status', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(fetchCodeforces('https://codeforces.com/contest/123/problem/A')).rejects.toThrow(
        'API returned 404'
      );
    });

    it('should throw error when API status is FAILED', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'FAILED',
          result: { problems: [] },
        }),
      } as Response);

      await expect(fetchCodeforces('https://codeforces.com/contest/123/problem/A')).rejects.toThrow(
        'API returned error status'
      );
    });

    it('should throw error when problem is not found in response', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: 'OK',
          result: {
            problems: [
              {
                contestId: 999,
                index: 'Z',
                name: 'Wrong Problem',
                tags: [],
              },
            ],
          },
        }),
      } as Response);

      await expect(fetchCodeforces('https://codeforces.com/contest/123/problem/A')).rejects.toThrow(
        'Problem not found in API response'
      );
    });

    it('should throw error for invalid API response schema', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          invalid: 'response',
        }),
      } as Response);

      await expect(fetchCodeforces('https://codeforces.com/contest/123/problem/A')).rejects.toThrow(
        'Invalid Codeforces API response'
      );
    });

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(fetchCodeforces('https://codeforces.com/contest/123/problem/A')).rejects.toThrow(
        'Failed to fetch Codeforces problem: Network error'
      );
    });

    it('should handle fetch throwing non-Error objects', async () => {
      global.fetch = vi.fn().mockRejectedValue('String error');

      await expect(fetchCodeforces('https://codeforces.com/contest/123/problem/A')).rejects.toThrow(
        'Failed to fetch Codeforces problem: Unknown error'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle very large contest IDs', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 999999999,
              index: 'A',
              name: 'Test',
              tags: [],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchCodeforces('https://codeforces.com/contest/999999999/problem/A');
      expect(result.source).toBe('Codeforces 999999999');
    });

    it('should handle problems with many tags', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 100,
              index: 'A',
              name: 'Test',
              tags: Array(20).fill('tag'),
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchCodeforces('https://codeforces.com/contest/100/problem/A');
      expect(result.tags).toHaveLength(20);
    });

    it('should handle URLs with different protocols', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 123,
              index: 'A',
              name: 'Test',
              tags: [],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await fetchCodeforces('http://codeforces.com/contest/123/problem/A');
      expect(global.fetch).toHaveBeenCalled();
    });
  });
});