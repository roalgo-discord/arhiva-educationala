import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchCodeforces } from './codeforces';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('fetchCodeforces', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('URL parsing', () => {
    it('should parse contest URLs', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'Test Problem',
              rating: 1500,
              tags: ['math', 'greedy'],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCodeforces('https://codeforces.com/contest/1234/problem/A');

      expect(result).toEqual({
        url: 'https://codeforces.com/contest/1234/problem/A',
        platform: 'codeforces',
        title: 'A. Test Problem',
        difficulty: {
          value: 1500,
          label: '1500',
        },
        tags: ['math', 'greedy'],
        source: 'Codeforces 1234',
        fetched: true,
      });
    });

    it('should parse problemset URLs', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 456,
              index: 'B',
              name: 'Another Problem',
              rating: 1700,
              tags: ['dp', 'implementation'],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCodeforces('https://codeforces.com/problemset/problem/456/B');

      expect(result.title).toBe('B. Another Problem');
      expect(result.source).toBe('Codeforces 456');
    });

    it('should parse gym URLs', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 102345,
              index: 'C',
              name: 'Gym Problem',
              tags: ['graphs'],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCodeforces('https://codeforces.com/gym/102345/problem/C');

      expect(result.title).toBe('C. Gym Problem');
      expect(result.source).toBe('Codeforces 102345');
    });

    it('should handle problems with number suffixes', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1750,
              index: 'D1',
              name: 'Problem D1',
              rating: 2000,
              tags: ['binary search'],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCodeforces('https://codeforces.com/contest/1750/problem/D1');

      expect(result.title).toBe('D1. Problem D1');
    });

    it('should default to problem A when not specified', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'Default Problem',
              rating: 800,
              tags: [],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCodeforces('https://codeforces.com/contest/1234');

      expect(result.title).toBe('A. Default Problem');
    });
  });

  describe('API responses', () => {
    it('should handle problems without rating', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'Unrated Problem',
              tags: ['constructive algorithms'],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCodeforces('https://codeforces.com/contest/1234/problem/A');

      expect(result.difficulty).toBeUndefined();
    });

    it('should handle problems with empty tags', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'No Tags Problem',
              rating: 900,
              tags: [],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCodeforces('https://codeforces.com/contest/1234/problem/A');

      expect(result.tags).toEqual([]);
    });

    it('should handle multiple problems in response', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'Problem A',
              rating: 800,
              tags: ['math'],
            },
            {
              contestId: 1234,
              index: 'B',
              name: 'Problem B',
              rating: 1200,
              tags: ['dp'],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchCodeforces('https://codeforces.com/contest/1234/problem/B');

      expect(result.title).toBe('B. Problem B');
      expect(result.difficulty?.value).toBe(1200);
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid URLs', async () => {
      await expect(fetchCodeforces('https://codeforces.com/profile/tourist')).rejects.toThrow(
        'Invalid Codeforces URL'
      );
    });

    it('should throw error for malformed URLs', async () => {
      await expect(fetchCodeforces('not a url')).rejects.toThrow('Invalid Codeforces URL');
    });

    it('should throw error when API returns non-OK status', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(fetchCodeforces('https://codeforces.com/contest/1234/problem/A')).rejects.toThrow(
        'API returned 500'
      );
    });

    it('should throw error when API status is FAILED', async () => {
      const mockResponse = {
        status: 'FAILED',
        result: {
          problems: [],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await expect(fetchCodeforces('https://codeforces.com/contest/1234/problem/A')).rejects.toThrow(
        'API returned error status'
      );
    });

    it('should throw error when problem not found in API response', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 5678,
              index: 'A',
              name: 'Different Problem',
              rating: 1000,
              tags: [],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await expect(fetchCodeforces('https://codeforces.com/contest/1234/problem/A')).rejects.toThrow(
        'Problem not found in API response'
      );
    });

    it('should throw error for invalid API response schema', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              // Missing required fields
              contestId: 1234,
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await expect(fetchCodeforces('https://codeforces.com/contest/1234/problem/A')).rejects.toThrow(
        'Invalid Codeforces API response'
      );
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(fetchCodeforces('https://codeforces.com/contest/1234/problem/A')).rejects.toThrow(
        'Failed to fetch Codeforces problem: Network error'
      );
    });

    it('should handle fetch throwing non-Error', async () => {
      mockFetch.mockRejectedValueOnce('String error');

      await expect(fetchCodeforces('https://codeforces.com/contest/1234/problem/A')).rejects.toThrow(
        'Failed to fetch Codeforces problem: Unknown error'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle URLs with trailing slashes', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'Test',
              rating: 1000,
              tags: [],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await expect(
        fetchCodeforces('https://codeforces.com/contest/1234/problem/A/')
      ).resolves.toBeDefined();
    });

    it('should handle URLs with query parameters', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'Test',
              rating: 1000,
              tags: [],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await expect(
        fetchCodeforces('https://codeforces.com/contest/1234/problem/A?locale=en')
      ).resolves.toBeDefined();
    });

    it('should make API call with correct headers', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'Test',
              rating: 1000,
              tags: [],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await fetchCodeforces('https://codeforces.com/contest/1234/problem/A');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://codeforces.com/api/problemset.problems',
        expect.objectContaining({
          headers: {
            Accept: 'application/json',
          },
        })
      );
    });
  });
});