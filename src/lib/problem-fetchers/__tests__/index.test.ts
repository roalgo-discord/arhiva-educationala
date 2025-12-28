import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchProblemData } from '../index';

describe('fetchProblemData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('with provided title', () => {
    it('should skip API fetch when title is provided', async () => {
      global.fetch = vi.fn();

      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        title: 'Custom Title',
      });

      expect(result).toEqual({
        url: 'https://kilonova.ro/problems/123',
        platform: 'kilonova',
        title: 'Custom Title',
        source: 'Kilonova',
        fetched: false,
      });
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should preserve additional provided data', async () => {
      const result = await fetchProblemData('https://codeforces.com/contest/123/problem/A', {
        title: 'Custom',
        tags: ['custom-tag'],
        difficulty: { value: 1500, label: '1500' },
      });

      expect(result.title).toBe('Custom');
      expect(result.tags).toEqual(['custom-tag']);
      expect(result.difficulty).toEqual({ value: 1500, label: '1500' });
    });
  });

  describe('API fetching for supported platforms', () => {
    it('should fetch from Kilonova API', async () => {
      const mockResponse = {
        id: 123,
        created_at: '2023-01-01T00:00:00Z',
        name: 'API Fetched',
        test_name: 'test',
        default_points: 100,
        visible: true,
        visible_tests: false,
        time_limit: 1.0,
        memory_limit: 65536,
        source_size: 50000,
        source_credits: 'Test Source',
        score_scale: 1.0,
        console_input: false,
        score_precision: 3,
        published_at: '2023-01-01T00:00:00Z',
        scoring_strategy: 'sum',
        task_type: 'classic',
        communication_processes: 1,
        submitLanguages: [],
        tags: [],
        statementVariants: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchProblemData('https://kilonova.ro/problems/123');

      expect(result.title).toBe('API Fetched');
      expect(result.fetched).toBe(true);
      expect(global.fetch).toHaveBeenCalled();
    });

    it('should fetch from Codeforces API', async () => {
      const mockResponse = {
        status: 'OK',
        result: {
          problems: [
            {
              contestId: 123,
              index: 'A',
              name: 'CF Problem',
              rating: 1200,
              tags: ['dp'],
            },
          ],
        },
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchProblemData('https://codeforces.com/contest/123/problem/A');

      expect(result.title).toBe('A. CF Problem');
      expect(result.fetched).toBe(true);
    });

    it('should merge provided data with fetched data', async () => {
      const mockResponse = {
        id: 123,
        created_at: '2023-01-01T00:00:00Z',
        name: 'Fetched Title',
        test_name: 'test',
        default_points: 100,
        visible: true,
        visible_tests: false,
        time_limit: 1.0,
        memory_limit: 65536,
        source_size: 50000,
        source_credits: '',
        score_scale: 1.0,
        console_input: false,
        score_precision: 3,
        published_at: '2023-01-01T00:00:00Z',
        scoring_strategy: 'sum',
        task_type: 'classic',
        communication_processes: 1,
        submitLanguages: [],
        tags: ['fetched-tag'],
        statementVariants: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        source: 'Custom Source',
      });

      expect(result.title).toBe('Fetched Title');
      expect(result.source).toBe('Custom Source');
      expect(result.fetched).toBe(true);
    });
  });

  describe('fallback for unsupported platforms', () => {
    it('should return basic metadata for CSES', async () => {
      const result = await fetchProblemData('https://cses.fi/problemset/task/1068');

      expect(result).toEqual({
        url: 'https://cses.fi/problemset/task/1068',
        platform: 'cses',
        title: 'Problem 1068',
        source: 'CSES',
        fetched: false,
      });
    });

    it('should return basic metadata for InfoArena', async () => {
      const result = await fetchProblemData('https://infoarena.ro/problema/arbore');

      expect(result.platform).toBe('infoarena');
      expect(result.fetched).toBe(false);
    });

    it('should return basic metadata for unknown platforms', async () => {
      const result = await fetchProblemData('https://example.com/problem/123');

      expect(result.platform).toBe('unknown');
      expect(result.source).toBe('Unknown');
      expect(result.fetched).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should return metadata with error when API fetch fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('API Error'));

      const result = await fetchProblemData('https://kilonova.ro/problems/123');

      expect(result.fetched).toBe(false);
      expect(result.error).toBe('Failed to fetch Kilonova problem: API Error');
      expect(result.platform).toBe('kilonova');
    });

    it('should return metadata with error for network failures', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      const result = await fetchProblemData('https://codeforces.com/contest/123/problem/A');

      expect(result.fetched).toBe(false);
      expect(result.error).toContain('Failed to fetch Codeforces problem');
    });

    it('should handle non-Error rejections', async () => {
      global.fetch = vi.fn().mockRejectedValue('String error');

      const result = await fetchProblemData('https://kilonova.ro/problems/123');

      expect(result.fetched).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should preserve provided data even when fetch fails', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('API Error'));

      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        source: 'Custom Source',
        tags: ['tag1'],
      });

      expect(result.source).toBe('Custom Source');
      expect(result.tags).toEqual(['tag1']);
      expect(result.fetched).toBe(false);
    });
  });

  describe('platform detection', () => {
    it('should detect platform from URL', async () => {
      const urls = [
        { url: 'https://kilonova.ro/problems/1', platform: 'kilonova' },
        { url: 'https://codeforces.com/contest/1/problem/A', platform: 'codeforces' },
        { url: 'https://pbinfo.ro/probleme/1/test', platform: 'pbinfo' },
        { url: 'https://cses.fi/problemset/task/1', platform: 'cses' },
        { url: 'https://infoarena.ro/problema/test', platform: 'infoarena' },
      ];

      for (const { url, platform } of urls) {
        const result = await fetchProblemData(url, { title: 'Test' });
        expect(result.platform).toBe(platform);
      }
    });
  });

  describe('edge cases', () => {
    it('should handle empty provided data object', async () => {
      const result = await fetchProblemData('https://cses.fi/problemset/task/1068', {});

      expect(result.platform).toBe('cses');
      expect(result.fetched).toBe(false);
    });

    it('should handle URLs with query parameters', async () => {
      const result = await fetchProblemData('https://cses.fi/problemset/task/1068?lang=en', {
        title: 'Test',
      });

      expect(result.url).toBe('https://cses.fi/problemset/task/1068?lang=en');
    });

    it('should handle URLs with fragments', async () => {
      const result = await fetchProblemData('https://cses.fi/problemset/task/1068#solution', {
        title: 'Test',
      });

      expect(result.url).toBe('https://cses.fi/problemset/task/1068#solution');
    });

    it('should validate metadata schema', async () => {
      const result = await fetchProblemData('https://cses.fi/problemset/task/1068', {
        title: 'Test',
      });

      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('platform');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('fetched');
    });
  });

  describe('real-world scenarios', () => {
    it('should handle partial manual overrides', async () => {
      const mockResponse = {
        id: 123,
        created_at: '2023-01-01T00:00:00Z',
        name: 'Original',
        test_name: 'test',
        default_points: 100,
        visible: true,
        visible_tests: false,
        time_limit: 1.0,
        memory_limit: 65536,
        source_size: 50000,
        source_credits: '',
        score_scale: 1.0,
        console_input: false,
        score_precision: 3,
        published_at: '2023-01-01T00:00:00Z',
        scoring_strategy: 'sum',
        task_type: 'classic',
        communication_processes: 1,
        submitLanguages: [],
        tags: ['api-tag'],
        statementVariants: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchProblemData('https://kilonova.ro/problems/123', {
        difficulty: { value: 'hard', label: 'Hard' },
      });

      expect(result.title).toBe('Original'); // from API
      expect(result.tags).toEqual(['api-tag']); // from API
      expect(result.difficulty).toEqual({ value: 'hard', label: 'Hard' }); // from provided
    });
  });
});