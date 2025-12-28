import { describe, it, expect } from 'vitest';
import { 
  createGenericFetcher, 
  fetchCSES, 
  fetchInfoarena, 
  fetchUSACO, 
  fetchOJUZ, 
  fetchAtCoder, 
  fetchNerdArena 
} from '../generic';

describe('createGenericFetcher', () => {
  describe('factory function', () => {
    it('should create a fetcher function', () => {
      const fetcher = createGenericFetcher('cses');
      expect(typeof fetcher).toBe('function');
    });

    it('should create fetchers for different platforms', () => {
      const platforms = ['cses', 'infoarena', 'usaco', 'oj.uz', 'atcoder', 'nerdarena'] as const;
      
      platforms.forEach(platform => {
        const fetcher = createGenericFetcher(platform);
        expect(typeof fetcher).toBe('function');
      });
    });
  });

  describe('created fetchers behavior', () => {
    it('should return correct metadata structure', async () => {
      const fetcher = createGenericFetcher('cses');
      const result = await fetcher('https://cses.fi/problemset/task/1068');

      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('platform');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('fetched');
    });

    it('should set correct platform', async () => {
      const fetcher = createGenericFetcher('infoarena');
      const result = await fetcher('https://infoarena.ro/problema/test');

      expect(result.platform).toBe('infoarena');
    });

    it('should set fetched to false', async () => {
      const fetcher = createGenericFetcher('usaco');
      const result = await fetcher('http://usaco.org/index.php?page=viewproblem2&cpid=123');

      expect(result.fetched).toBe(false);
    });

    it('should generate title from problem ID', async () => {
      const fetcher = createGenericFetcher('cses');
      const result = await fetcher('https://cses.fi/problemset/task/1068');

      expect(result.title).toBe('Problem 1068');
    });
  });
});

describe('fetchCSES', () => {
  it('should fetch CSES problem metadata', async () => {
    const result = await fetchCSES('https://cses.fi/problemset/task/1068');

    expect(result).toEqual({
      url: 'https://cses.fi/problemset/task/1068',
      platform: 'cses',
      title: 'Problem 1068',
      source: 'CSES',
      fetched: false,
    });
  });

  it('should handle different problem IDs', async () => {
    const result = await fetchCSES('https://cses.fi/problemset/task/9999');

    expect(result.title).toBe('Problem 9999');
  });

  it('should throw error for invalid URLs', async () => {
    await expect(fetchCSES('https://cses.fi/invalid')).rejects.toThrow('Invalid CSES URL');
  });

  it('should handle URLs with additional paths', async () => {
    await expect(fetchCSES('https://cses.fi/problemset/task/1068/stats')).rejects.toThrow();
  });
});

describe('fetchInfoarena', () => {
  it('should fetch InfoArena problem metadata', async () => {
    const result = await fetchInfoarena('https://infoarena.ro/problema/arbore');

    expect(result).toEqual({
      url: 'https://infoarena.ro/problema/arbore',
      platform: 'infoarena',
      title: 'Problem arbore',
      source: 'InfoArena',
      fetched: false,
    });
  });

  it('should handle different problem slugs', async () => {
    const result = await fetchInfoarena('https://infoarena.ro/problema/test-problem');

    expect(result.title).toBe('Problem test-problem');
  });

  it('should throw error for invalid URLs', async () => {
    await expect(fetchInfoarena('https://infoarena.ro/invalid')).rejects.toThrow(
      'Invalid InfoArena URL'
    );
  });

  it('should handle www subdomain', async () => {
    const result = await fetchInfoarena('https://www.infoarena.ro/problema/test');

    expect(result.platform).toBe('infoarena');
  });
});

describe('fetchUSACO', () => {
  it('should fetch USACO problem metadata', async () => {
    const result = await fetchUSACO('http://usaco.org/index.php?page=viewproblem2&cpid=123');

    expect(result).toEqual({
      url: 'http://usaco.org/index.php?page=viewproblem2&cpid=123',
      platform: 'usaco',
      title: 'Problem 123',
      source: 'USACO',
      fetched: false,
    });
  });

  it('should handle different cpid values', async () => {
    const result = await fetchUSACO('http://usaco.org/index.php?page=viewproblem2&cpid=999');

    expect(result.title).toBe('Problem 999');
  });

  it('should throw error when cpid is missing', async () => {
    await expect(fetchUSACO('http://usaco.org/index.php?page=viewproblem2')).rejects.toThrow(
      'Invalid USACO URL'
    );
  });

  it('should handle additional query parameters', async () => {
    const result = await fetchUSACO(
      'http://usaco.org/index.php?page=viewproblem2&cpid=456&other=param'
    );

    expect(result.title).toBe('Problem 456');
  });
});

describe('fetchOJUZ', () => {
  it('should fetch OJ.UZ problem metadata', async () => {
    const result = await fetchOJUZ('https://oj.uz/problem/view/JOI13_synchronization');

    expect(result).toEqual({
      url: 'https://oj.uz/problem/view/JOI13_synchronization',
      platform: 'oj.uz',
      title: 'Problem JOI13_synchronization',
      source: 'OJ.UZ',
      fetched: false,
    });
  });

  it('should handle different problem IDs', async () => {
    const result = await fetchOJUZ('https://oj.uz/problem/view/test-problem');

    expect(result.title).toBe('Problem test-problem');
  });

  it('should throw error for invalid URLs', async () => {
    await expect(fetchOJUZ('https://oj.uz/problems')).rejects.toThrow('Invalid OJ.UZ URL');
  });

  it('should handle IDs with underscores', async () => {
    const result = await fetchOJUZ('https://oj.uz/problem/view/CEOI15_nuclearia');

    expect(result.title).toBe('Problem CEOI15_nuclearia');
  });
});

describe('fetchAtCoder', () => {
  it('should fetch AtCoder problem metadata', async () => {
    const result = await fetchAtCoder('https://atcoder.jp/contests/abc123/tasks/abc123_a');

    expect(result).toEqual({
      url: 'https://atcoder.jp/contests/abc123/tasks/abc123_a',
      platform: 'atcoder',
      title: 'Problem abc123_a',
      source: 'AtCoder',
      fetched: false,
    });
  });

  it('should handle different contest types', async () => {
    const result = await fetchAtCoder('https://atcoder.jp/contests/arc100/tasks/arc100_b');

    expect(result.title).toBe('Problem arc100_b');
  });

  it('should throw error for invalid URLs', async () => {
    await expect(fetchAtCoder('https://atcoder.jp/contests/abc123')).rejects.toThrow(
      'Invalid AtCoder URL'
    );
  });

  it('should handle AGC contests', async () => {
    const result = await fetchAtCoder('https://atcoder.jp/contests/agc050/tasks/agc050_a');

    expect(result.title).toBe('Problem agc050_a');
  });
});

describe('fetchNerdArena', () => {
  it('should fetch NerdArena problem metadata with problema', async () => {
    const result = await fetchNerdArena('https://nerdarena.ro/problema/test');

    expect(result).toEqual({
      url: 'https://nerdarena.ro/problema/test',
      platform: 'nerdarena',
      title: 'Problem test',
      source: 'NerdArena',
      fetched: false,
    });
  });

  it('should handle probleme URLs', async () => {
    const result = await fetchNerdArena('https://nerdarena.ro/probleme/123');

    expect(result.title).toBe('Problem 123');
  });

  it('should throw error for invalid URLs', async () => {
    await expect(fetchNerdArena('https://nerdarena.ro/invalid')).rejects.toThrow(
      'Invalid NerdArena URL'
    );
  });

  it('should handle www subdomain', async () => {
    const result = await fetchNerdArena('https://www.nerdarena.ro/problema/test');

    expect(result.platform).toBe('nerdarena');
  });
});

describe('error handling across all fetchers', () => {
  const fetchers = [
    { name: 'CSES', fn: fetchCSES, invalidUrl: 'https://cses.fi/invalid' },
    { name: 'InfoArena', fn: fetchInfoarena, invalidUrl: 'https://infoarena.ro/invalid' },
    { name: 'USACO', fn: fetchUSACO, invalidUrl: 'http://usaco.org/index.php' },
    { name: 'OJ.UZ', fn: fetchOJUZ, invalidUrl: 'https://oj.uz/invalid' },
    { name: 'AtCoder', fn: fetchAtCoder, invalidUrl: 'https://atcoder.jp/invalid' },
    { name: 'NerdArena', fn: fetchNerdArena, invalidUrl: 'https://nerdarena.ro/invalid' },
  ];

  fetchers.forEach(({ name, fn, invalidUrl }) => {
    it(`${name} should throw error for invalid URL`, async () => {
      await expect(fn(invalidUrl)).rejects.toThrow();
    });

    it(`${name} should throw error for malformed URL`, async () => {
      await expect(fn('not-a-url')).rejects.toThrow();
    });
  });
});

describe('edge cases', () => {
  it('should handle URLs with query parameters', async () => {
    const result = await fetchCSES('https://cses.fi/problemset/task/1068?lang=en');

    expect(result.url).toBe('https://cses.fi/problemset/task/1068?lang=en');
  });

  it('should handle URLs with fragments', async () => {
    const result = await fetchInfoarena('https://infoarena.ro/problema/test#description');

    expect(result.url).toBe('https://infoarena.ro/problema/test#description');
  });

  it('should handle URLs with trailing slashes', async () => {
    const result = await fetchOJUZ('https://oj.uz/problem/view/test/');

    expect(result.platform).toBe('oj.uz');
  });

  it('should handle very long problem IDs', async () => {
    const longId = 'a'.repeat(100);
    const result = await fetchOJUZ(`https://oj.uz/problem/view/${longId}`);

    expect(result.title).toBe(`Problem ${longId}`);
  });

  it('should handle numeric problem IDs as strings', async () => {
    const result = await fetchCSES('https://cses.fi/problemset/task/1068');

    expect(result.title).toBe('Problem 1068');
    expect(typeof result.title).toBe('string');
  });
});