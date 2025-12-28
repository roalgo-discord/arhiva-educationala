import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchKilonova } from '../kilonova';

describe('fetchKilonova', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('successful API responses', () => {
    it('should fetch problem data successfully', async () => {
      const mockResponse = {
        id: 123,
        created_at: '2023-01-01T00:00:00Z',
        name: 'Test Problem',
        test_name: 'test',
        default_points: 100,
        visible: true,
        visible_tests: false,
        time_limit: 1.0,
        memory_limit: 65536,
        source_size: 50000,
        source_credits: 'OJI 2023',
        score_scale: 1.0,
        console_input: false,
        score_precision: 3,
        published_at: '2023-01-01T00:00:00Z',
        scoring_strategy: 'sum',
        task_type: 'classic',
        communication_processes: 1,
        submitLanguages: [
          { internal_name: 'cpp', printable_name: 'C++' },
        ],
        tags: [
          { id: 1, name: 'dp', type: 'algorithm' },
          { id: 2, name: 'greedy', type: 'algorithm' },
        ],
        statementVariants: [
          {
            language: 'ro',
            format: 'markdown',
            type: 'statement',
            permalink: '/statement',
            renderURL: '/render',
            lastUpdatedAt: '2023-01-01T00:00:00Z',
          },
        ],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchKilonova('https://kilonova.ro/problems/123');

      expect(result).toEqual({
        url: 'https://kilonova.ro/problems/123',
        platform: 'kilonova',
        title: 'Test Problem',
        source: 'OJI 2023',
        tags: ['dp', 'greedy'],
        fetched: true,
      });
    });

    it('should handle problems without source credits', async () => {
      const mockResponse = {
        id: 456,
        created_at: '2023-01-01T00:00:00Z',
        name: 'Another Problem',
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
        tags: [],
        statementVariants: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchKilonova('https://kilonova.ro/problems/456');

      expect(result.source).toBe('Kilonova');
    });

    it('should handle empty tags array', async () => {
      const mockResponse = {
        id: 789,
        created_at: '2023-01-01T00:00:00Z',
        name: 'No Tags',
        test_name: 'test',
        default_points: 100,
        visible: true,
        visible_tests: false,
        time_limit: 1.0,
        memory_limit: 65536,
        source_size: 50000,
        source_credits: 'Test',
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

      const result = await fetchKilonova('https://kilonova.ro/problems/789');

      expect(result.tags).toEqual([]);
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid URL format', async () => {
      await expect(fetchKilonova('https://kilonova.ro/invalid')).rejects.toThrow(
        'Invalid Kilonova URL'
      );
    });

    it('should throw error when API returns non-OK status', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(fetchKilonova('https://kilonova.ro/problems/999')).rejects.toThrow(
        'API returned 404'
      );
    });

    it('should throw error for invalid API response schema', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ invalid: 'response' }),
      } as Response);

      await expect(fetchKilonova('https://kilonova.ro/problems/123')).rejects.toThrow(
        'Invalid Kilonova API response'
      );
    });

    it('should handle network errors', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

      await expect(fetchKilonova('https://kilonova.ro/problems/123')).rejects.toThrow(
        'Failed to fetch Kilonova problem: Network error'
      );
    });

    it('should handle non-Error rejections', async () => {
      global.fetch = vi.fn().mockRejectedValue('String error');

      await expect(fetchKilonova('https://kilonova.ro/problems/123')).rejects.toThrow(
        'Failed to fetch Kilonova problem: Unknown error'
      );
    });
  });

  describe('URL parsing', () => {
    it('should parse problem URLs', async () => {
      const mockResponse = {
        id: 123,
        created_at: '2023-01-01T00:00:00Z',
        name: 'Test',
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
        tags: [],
        statementVariants: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await fetchKilonova('https://kilonova.ro/problems/123');
      
      expect(global.fetch).toHaveBeenCalledWith(
        'https://kilonova.ro/api/v2/problems/123',
        expect.objectContaining({
          headers: {
            Accept: 'application/json',
          },
        })
      );
    });

    it('should handle URLs with different subpaths', async () => {
      await expect(fetchKilonova('https://kilonova.ro/problems/123/edit')).rejects.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle problems with multiple tags of different types', async () => {
      const mockResponse = {
        id: 100,
        created_at: '2023-01-01T00:00:00Z',
        name: 'Multi Tag',
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
        tags: [
          { id: 1, name: 'dp', type: 'algorithm' },
          { id: 2, name: 'hard', type: 'difficulty' },
          { id: 3, name: 'graph', type: 'algorithm' },
        ],
        statementVariants: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchKilonova('https://kilonova.ro/problems/100');

      expect(result.tags).toEqual(['dp', 'hard', 'graph']);
    });

    it('should handle very large problem IDs', async () => {
      const mockResponse = {
        id: 999999,
        created_at: '2023-01-01T00:00:00Z',
        name: 'Large ID',
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
        tags: [],
        statementVariants: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await fetchKilonova('https://kilonova.ro/problems/999999');

      expect(result.title).toBe('Large ID');
    });
  });
});