import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchProblemData } from './index';

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('fetchProblemData', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('platform detection', () => {
    it('should detect platform from URL', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma');

      expect(result.platform).toBe('pbinfo');
    });

    it('should handle unknown platforms', async () => {
      const result = await fetchProblemData('https://example.com/problem/123');

      expect(result.platform).toBe('unknown');
      expect(result.source).toBe('Unknown');
    });
  });

  describe('with providedData title', () => {
    it('should use provided title instead of fetching', async () => {
      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        title: 'Custom Title',
      });

      expect(result.title).toBe('Custom Title');
      expect(result.fetched).toBe(false);
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should merge provided data with base metadata', async () => {
      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        title: 'Custom Title',
        tags: ['custom', 'tags'],
        difficulty: { value: 1500, label: 'Medium' },
      });

      expect(result.title).toBe('Custom Title');
      expect(result.tags).toEqual(['custom', 'tags']);
      expect(result.difficulty).toEqual({ value: 1500, label: 'Medium' });
      expect(result.platform).toBe('kilonova');
      expect(result.fetched).toBe(false);
    });
  });

  describe('API-supported platforms', () => {
    it('should fetch from Kilonova API', async () => {
      const mockResponse = {
        id: 123,
        created_at: '2023-01-01',
        name: 'Test Problem',
        test_name: 'test',
        default_points: 100,
        visible: true,
        visible_tests: true,
        time_limit: 1000,
        memory_limit: 65536,
        source_size: 50000,
        source_credits: 'Author Name',
        score_scale: 100,
        console_input: false,
        score_precision: 2,
        published_at: '2023-01-01',
        scoring_strategy: 'sum',
        task_type: 'classic',
        communication_processes: 0,
        submitLanguages: [],
        tags: [
          { id: 1, name: 'math', type: 'topic' },
          { id: 2, name: 'greedy', type: 'topic' },
        ],
        statementVariants: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchProblemData('https://kilonova.ro/problems/123');

      expect(result.platform).toBe('kilonova');
      expect(result.title).toBe('Test Problem');
      expect(result.tags).toEqual(['math', 'greedy']);
      expect(result.source).toBe('Author Name');
      expect(result.fetched).toBe(true);
    });

    it('should fetch from Codeforces API', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 1234,
              index: 'A',
              name: 'CF Problem',
              rating: 1500,
              tags: ['dp', 'math'],
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchProblemData('https://codeforces.com/contest/1234/problem/A');

      expect(result.platform).toBe('codeforces');
      expect(result.title).toBe('A. CF Problem');
      expect(result.difficulty).toEqual({ value: 1500, label: '1500' });
      expect(result.tags).toEqual(['dp', 'math']);
      expect(result.fetched).toBe(true);
    });
  });

  describe('non-API platforms', () => {
    it('should use generic fetcher for PBInfo', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma');

      expect(result.platform).toBe('pbinfo');
      expect(result.title).toBe('Suma');
      expect(result.source).toBe('PBInfo');
      expect(result.fetched).toBe(false);
    });

    it('should use generic fetcher for CSES', async () => {
      const result = await fetchProblemData('https://cses.fi/problemset/task/1068');

      expect(result.platform).toBe('cses');
      expect(result.title).toBe('Problem 1068');
      expect(result.source).toBe('CSES');
      expect(result.fetched).toBe(false);
    });

    it('should use generic fetcher for InfoArena', async () => {
      const result = await fetchProblemData('https://infoarena.ro/problema/suma');

      expect(result.platform).toBe('infoarena');
      expect(result.title).toBe('Problem suma');
      expect(result.source).toBe('InfoArena');
      expect(result.fetched).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle API fetch errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchProblemData('https://kilonova.ro/problems/123');

      expect(result.platform).toBe('kilonova');
      expect(result.error).toBe('Failed to fetch Kilonova problem: Network error');
      expect(result.fetched).toBe(false);
    });

    it('should handle API returning invalid data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'data' }),
      });

      const result = await fetchProblemData('https://kilonova.ro/problems/123');

      expect(result.platform).toBe('kilonova');
      expect(result.error).toBeDefined();
      expect(result.fetched).toBe(false);
    });

    it('should include provided data even when fetch fails', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        tags: ['custom-tag'],
      });

      expect(result.tags).toEqual(['custom-tag']);
      expect(result.error).toBeDefined();
      expect(result.fetched).toBe(false);
    });
  });

  describe('providedData merging', () => {
    it('should merge API data with provided data', async () => {
      const mockResponse = {
        id: 123,
        created_at: '2023-01-01',
        name: 'API Title',
        test_name: 'test',
        default_points: 100,
        visible: true,
        visible_tests: true,
        time_limit: 1000,
        memory_limit: 65536,
        source_size: 50000,
        source_credits: 'API Author',
        score_scale: 100,
        console_input: false,
        score_precision: 2,
        published_at: '2023-01-01',
        scoring_strategy: 'sum',
        task_type: 'classic',
        communication_processes: 0,
        submitLanguages: [],
        tags: [{ id: 1, name: 'api-tag', type: 'topic' }],
        statementVariants: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        tags: ['custom-tag'],
        difficulty: { value: 1500, label: 'Medium' },
      });

      // Provided data should override API data
      expect(result.tags).toEqual(['custom-tag']);
      expect(result.difficulty).toEqual({ value: 1500, label: 'Medium' });
      // But API data should still be used for non-overridden fields
      expect(result.title).toBe('API Title');
      expect(result.source).toBe('API Author');
    });

    it('should prioritize provided data over API data', async () => {
      const mockResponse = {
        id: 123,
        created_at: '2023-01-01',
        name: 'API Title',
        test_name: 'test',
        default_points: 100,
        visible: true,
        visible_tests: true,
        time_limit: 1000,
        memory_limit: 65536,
        source_size: 50000,
        source_credits: 'API Author',
        score_scale: 100,
        console_input: false,
        score_precision: 2,
        published_at: '2023-01-01',
        scoring_strategy: 'sum',
        task_type: 'classic',
        communication_processes: 0,
        submitLanguages: [],
        tags: [{ id: 1, name: 'api-tag', type: 'topic' }],
        statementVariants: [],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        source: 'Custom Source',
      });

      expect(result.source).toBe('Custom Source');
    });
  });

  describe('edge cases', () => {
    it('should handle empty provided data object', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma', {});

      expect(result.platform).toBe('pbinfo');
      expect(result.title).toBe('Suma');
    });

    it('should handle undefined provided data', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma', undefined);

      expect(result.platform).toBe('pbinfo');
      expect(result.title).toBe('Suma');
    });

    it('should handle URLs with query parameters', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma?lang=en');

      expect(result.platform).toBe('pbinfo');
    });

    it('should handle URLs with fragments', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma#description');

      expect(result.platform).toBe('pbinfo');
    });

    it('should handle URLs with trailing slashes', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma/');

      expect(result.platform).toBe('pbinfo');
    });
  });

  describe('metadata validation', () => {
    it('should return valid ProblemMetadata', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma');

      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('platform');
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('fetched');
      expect(typeof result.url).toBe('string');
      expect(typeof result.platform).toBe('string');
      expect(typeof result.source).toBe('string');
      expect(typeof result.fetched).toBe('boolean');
    });

    it('should include all required fields', async () => {
      const result = await fetchProblemData('https://pbinfo.ro/probleme/123/suma', {
        title: 'Test',
        tags: ['tag1'],
        difficulty: { value: 1000, label: 'Easy' },
      });

      expect(result.url).toBeDefined();
      expect(result.platform).toBeDefined();
      expect(result.title).toBeDefined();
      expect(result.source).toBeDefined();
      expect(result.fetched).toBeDefined();
      expect(result.tags).toBeDefined();
      expect(result.difficulty).toBeDefined();
    });
  });

  describe('unknown platform handling', () => {
    it('should return base metadata for unknown platforms', async () => {
      const result = await fetchProblemData('https://unknown-site.com/problem/123');

      expect(result.platform).toBe('unknown');
      expect(result.source).toBe('Unknown');
      expect(result.fetched).toBe(false);
      expect(result.url).toBe('https://unknown-site.com/problem/123');
    });

    it('should not attempt to fetch for unknown platforms', async () => {
      await fetchProblemData('https://unknown-site.com/problem/123');

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });
});