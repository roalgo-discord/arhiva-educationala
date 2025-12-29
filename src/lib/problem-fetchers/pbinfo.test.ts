import { describe, it, expect } from 'vitest';
import { fetchPBInfo } from './pbinfo';

describe('fetchPBInfo', () => {
  describe('successful parsing', () => {
    it('should parse problem with slug', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma-elementelor');

      expect(result).toEqual({
        url: 'https://pbinfo.ro/probleme/123/suma-elementelor',
        platform: 'pbinfo',
        title: 'Suma Elementelor',
        source: 'PBInfo',
        fetched: false,
      });
    });

    it('should parse problem with multi-word slug', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/456/produse-de-numere-prime');

      expect(result).toEqual({
        url: 'https://pbinfo.ro/probleme/456/produse-de-numere-prime',
        platform: 'pbinfo',
        title: 'Produse De Numere Prime',
        source: 'PBInfo',
        fetched: false,
      });
    });

    it('should parse problem with single-word slug', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/789/factorial');

      expect(result).toEqual({
        url: 'https://pbinfo.ro/probleme/789/factorial',
        platform: 'pbinfo',
        title: 'Factorial',
        source: 'PBInfo',
        fetched: false,
      });
    });

    it('should parse problem without slug', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/999');

      expect(result).toEqual({
        url: 'https://pbinfo.ro/probleme/999',
        platform: 'pbinfo',
        title: 'Problem 999',
        source: 'PBInfo',
        fetched: false,
      });
    });

    it('should handle URLs with www prefix', async () => {
      const result = await fetchPBInfo('https://www.pbinfo.ro/probleme/123/suma');

      expect(result.platform).toBe('pbinfo');
      expect(result.title).toBe('Suma');
    });

    it('should handle URLs with trailing slash', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma/');

      expect(result.platform).toBe('pbinfo');
      expect(result.title).toBe('Suma');
    });

    it('should capitalize first letter of each word in slug', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/100/suma-de-numere');

      expect(result.title).toBe('Suma De Numere');
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid URL', async () => {
      await expect(fetchPBInfo('not a url')).rejects.toThrow('Invalid PBInfo URL');
    });

    it('should throw error for non-PBInfo URL', async () => {
      await expect(fetchPBInfo('https://example.com/probleme/123')).rejects.toThrow(
        'Invalid PBInfo URL'
      );
    });

    it('should throw error for PBInfo URL without problem ID', async () => {
      await expect(fetchPBInfo('https://pbinfo.ro/probleme')).rejects.toThrow('Invalid PBInfo URL');
    });

    it('should throw error for PBInfo URL with non-numeric ID', async () => {
      await expect(fetchPBInfo('https://pbinfo.ro/probleme/abc/suma')).rejects.toThrow(
        'Invalid PBInfo URL'
      );
    });

    it('should throw error for empty URL', async () => {
      await expect(fetchPBInfo('')).rejects.toThrow('Invalid PBInfo URL');
    });

    it('should throw error for malformed URL', async () => {
      await expect(fetchPBInfo('://invalid')).rejects.toThrow('Invalid PBInfo URL');
    });
  });

  describe('edge cases', () => {
    it('should handle problem ID with leading zeros', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/007/spy');

      expect(result.url).toContain('007');
      expect(result.title).toBe('Spy');
    });

    it('should handle very long problem IDs', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/999999999/test');

      expect(result.platform).toBe('pbinfo');
      expect(result.title).toBe('Test');
    });

    it('should handle slugs with numbers', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma-2-numere');

      expect(result.title).toBe('Suma 2 Numere');
    });

    it('should handle slugs with special characters in URL', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma-a-b');

      expect(result.title).toBe('Suma A B');
    });

    it('should always set fetched to false', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/test');

      expect(result.fetched).toBe(false);
    });

    it('should preserve original URL in result', async () => {
      const url = 'https://pbinfo.ro/probleme/123/suma-elementelor';
      const result = await fetchPBInfo(url);

      expect(result.url).toBe(url);
    });

    it('should handle http protocol', async () => {
      const result = await fetchPBInfo('http://pbinfo.ro/probleme/123/suma');

      expect(result.platform).toBe('pbinfo');
    });

    it('should handle query parameters (though unusual)', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma?lang=en');

      expect(result.platform).toBe('pbinfo');
    });

    it('should handle URL fragments', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma#description');

      expect(result.platform).toBe('pbinfo');
    });

    it('should handle single-character slugs', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/a');

      expect(result.title).toBe('A');
    });

    it('should handle empty slug (just ID)', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/');

      expect(result.title).toBe('Problem 123');
    });
  });

  describe('metadata validation', () => {
    it('should return valid ProblemMetadata schema', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma');

      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('platform');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('fetched');
      expect(typeof result.url).toBe('string');
      expect(typeof result.platform).toBe('string');
      expect(typeof result.title).toBe('string');
      expect(typeof result.source).toBe('string');
      expect(typeof result.fetched).toBe('boolean');
    });

    it('should not include tags by default', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma');

      expect(result.tags).toBeUndefined();
    });

    it('should not include difficulty by default', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma');

      expect(result.difficulty).toBeUndefined();
    });

    it('should not include error by default', async () => {
      const result = await fetchPBInfo('https://pbinfo.ro/probleme/123/suma');

      expect(result.error).toBeUndefined();
    });
  });
});