import { describe, it, expect } from 'vitest';
import { fetchPBInfo } from '../pbinfo';

describe('fetchPBInfo', () => {
  describe('successful parsing', () => {
    it('should parse problem URL with slug', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/test-problem');

      expect(result).toEqual({
        url: 'https://pbinfo.ro/probleme/123/test-problem',
        platform: 'pbinfo',
        title: 'Test Problem',
        source: 'PBInfo',
        fetched: false,
      });
    });

    it('should handle multi-word slugs', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/456/suma-numerelor-prime');

      expect(result.title).toBe('Suma Numerelor Prime');
    });

    it('should handle single-word slugs', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/789/sortare');

      expect(result.title).toBe('Sortare');
    });

    it('should handle problem URL without slug', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/999');

      expect(result.title).toBe('Problem 999');
    });
  });

  describe('title capitalization', () => {
    it('should capitalize first letter of each word', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/100/arbore-binar');

      expect(result.title).toBe('Arbore Binar');
    });

    it('should handle slugs with numbers', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/200/problema-2023');

      expect(result.title).toBe('Problema 2023');
    });

    it('should handle slugs with single letters', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/300/a-b-c');

      expect(result.title).toBe('A B C');
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid URL format', async () => {
      await expect(fetchPBInfo('https://pbinfo.ro/invalid')).rejects.toThrow('Invalid PBInfo URL');
    });

    it('should throw error for URL without problem ID', async () => {
      await expect(fetchPBInfo('https://pbinfo.ro/probleme/')).rejects.toThrow('Invalid PBInfo URL');
    });

    it('should throw error for completely invalid URL', async () => {
      await expect(fetchPBInfo('not-a-url')).rejects.toThrow();
    });

    it('should throw error for wrong domain', async () => {
      await expect(fetchPBInfo('https://example.com/probleme/123')).rejects.toThrow(
        'Invalid PBInfo URL'
      );
    });
  });

  describe('edge cases', () => {
    it('should handle URLs with trailing slashes', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/test/');

      expect(result.url).toBe('https://pbinfo.ro/probleme/123/test/');
      expect(result.platform).toBe('pbinfo');
    });

    it('should handle URLs with query parameters', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/test?tab=solution');

      expect(result.title).toBe('Test');
    });

    it('should handle very long slugs', async () => {
      const longSlug = 'a-'.repeat(50) + 'problem';
      const result = await fetchPBInfo(`https://pbinfo.ro/probleme/123/${longSlug}`);

      expect(result.title).toContain('Problem');
    });

    it('should handle slugs with special characters', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/test-problem-2_0');

      // Should still extract slug even with underscores
      expect(result.platform).toBe('pbinfo');
    });

    it('should set fetched flag to false', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/test');

      expect(result.fetched).toBe(false);
    });
  });

  describe('URL variations', () => {
    it('should handle www subdomain', async () => {
      const result = await fetchPBInfo('https://www.pbinfo.ro/probleme/123/test');

      expect(result.platform).toBe('pbinfo');
    });

    it('should handle http protocol', async () => {
      const result = await fetchPBInfo('http://pbinfo.ro/probleme/123/test');

      expect(result.platform).toBe('pbinfo');
    });

    it('should handle mixed case domain', async () => {
      const result = await fetchPBInfo('https://PBInfo.RO/probleme/123/test');

      expect(result.platform).toBe('pbinfo');
    });
  });
});