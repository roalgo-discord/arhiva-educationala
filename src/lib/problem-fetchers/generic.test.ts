import { describe, it, expect } from 'vitest';
import {
  createGenericFetcher,
  fetchCSES,
  fetchInfoarena,
  fetchUSACO,
  fetchOJUZ,
  fetchAtCoder,
  fetchNerdArena,
} from './generic';

describe('createGenericFetcher', () => {
  describe('factory function', () => {
    it('should create a fetcher for a given platform', () => {
      const fetcher = createGenericFetcher('cses');

      expect(typeof fetcher).toBe('function');
    });

    it('should create fetchers that return ProblemMetadata', async () => {
      const fetcher = createGenericFetcher('cses');
      const result = await fetcher('https://cses.fi/problemset/task/1068');

      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('platform');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('fetched');
    });

    it('should set correct platform in metadata', async () => {
      const fetcher = createGenericFetcher('infoarena');
      const result = await fetcher('https://infoarena.ro/problema/suma');

      expect(result.platform).toBe('infoarena');
    });

    it('should set correct source in metadata', async () => {
      const fetcher = createGenericFetcher('usaco');
      const result = await fetcher('http://www.usaco.org/index.php?page=viewproblem2&cpid=1234');

      expect(result.source).toBe('USACO');
    });

    it('should always set fetched to false', async () => {
      const fetcher = createGenericFetcher('atcoder');
      const result = await fetcher('https://atcoder.jp/contests/abc123/tasks/abc123_a');

      expect(result.fetched).toBe(false);
    });

    it('should generate title from problem ID', async () => {
      const fetcher = createGenericFetcher('cses');
      const result = await fetcher('https://cses.fi/problemset/task/1068');

      expect(result.title).toBe('Problem 1068');
    });
  });

  describe('error handling', () => {
    it('should throw error for invalid URLs', async () => {
      const fetcher = createGenericFetcher('cses');

      await expect(fetcher('not a url')).rejects.toThrow('Invalid CSES URL');
    });

    it('should throw error for wrong platform URL', async () => {
      const fetcher = createGenericFetcher('cses');

      await expect(fetcher('https://codeforces.com/contest/1234')).rejects.toThrow(
        'Invalid CSES URL'
      );
    });

    it('should throw error for URLs without problem ID', async () => {
      const fetcher = createGenericFetcher('infoarena');

      await expect(fetcher('https://infoarena.ro/')).rejects.toThrow('Invalid InfoArena URL');
    });

    it('should include platform name in error messages', async () => {
      const fetcher = createGenericFetcher('nerdarena');

      await expect(fetcher('https://example.com')).rejects.toThrow('Invalid NerdArena URL');
    });
  });
});

describe('fetchCSES', () => {
  it('should fetch CSES problems', async () => {
    const result = await fetchCSES('https://cses.fi/problemset/task/1068');

    expect(result.platform).toBe('cses');
    expect(result.source).toBe('CSES');
    expect(result.title).toBe('Problem 1068');
    expect(result.fetched).toBe(false);
  });

  it('should handle different task IDs', async () => {
    const result1 = await fetchCSES('https://cses.fi/problemset/task/1083');
    const result2 = await fetchCSES('https://cses.fi/problemset/task/2189');

    expect(result1.title).toBe('Problem 1083');
    expect(result2.title).toBe('Problem 2189');
  });

  it('should throw error for invalid CSES URLs', async () => {
    await expect(fetchCSES('https://cses.fi/problemset')).rejects.toThrow('Invalid CSES URL');
  });
});

describe('fetchInfoarena', () => {
  it('should fetch InfoArena problems', async () => {
    const result = await fetchInfoarena('https://infoarena.ro/problema/suma');

    expect(result.platform).toBe('infoarena');
    expect(result.source).toBe('InfoArena');
    expect(result.title).toBe('Problem suma');
    expect(result.fetched).toBe(false);
  });

  it('should handle different problem slugs', async () => {
    const result1 = await fetchInfoarena('https://infoarena.ro/problema/arbore');
    const result2 = await fetchInfoarena('https://infoarena.ro/problema/dijkstra');

    expect(result1.title).toBe('Problem arbore');
    expect(result2.title).toBe('Problem dijkstra');
  });

  it('should throw error for invalid InfoArena URLs', async () => {
    await expect(fetchInfoarena('https://infoarena.ro/')).rejects.toThrow('Invalid InfoArena URL');
  });
});

describe('fetchUSACO', () => {
  it('should fetch USACO problems', async () => {
    const result = await fetchUSACO('http://www.usaco.org/index.php?page=viewproblem2&cpid=1234');

    expect(result.platform).toBe('usaco');
    expect(result.source).toBe('USACO');
    expect(result.title).toBe('Problem 1234');
    expect(result.fetched).toBe(false);
  });

  it('should handle different problem IDs', async () => {
    const result1 = await fetchUSACO('http://www.usaco.org/index.php?page=viewproblem2&cpid=5678');
    const result2 = await fetchUSACO('http://www.usaco.org/index.php?page=viewproblem2&cpid=9999');

    expect(result1.title).toBe('Problem 5678');
    expect(result2.title).toBe('Problem 9999');
  });

  it('should throw error for USACO URLs without cpid', async () => {
    await expect(fetchUSACO('http://www.usaco.org/index.php?page=viewproblem2')).rejects.toThrow(
      'Invalid USACO URL'
    );
  });
});

describe('fetchOJUZ', () => {
  it('should fetch OJ.UZ problems', async () => {
    const result = await fetchOJUZ('https://oj.uz/problem/view/JOI13_synchronization');

    expect(result.platform).toBe('oj.uz');
    expect(result.source).toBe('OJ.UZ');
    expect(result.title).toBe('Problem JOI13_synchronization');
    expect(result.fetched).toBe(false);
  });

  it('should handle different problem IDs', async () => {
    const result1 = await fetchOJUZ('https://oj.uz/problem/view/CEOI15_teams');
    const result2 = await fetchOJUZ('https://oj.uz/problem/view/IOI14_rail');

    expect(result1.title).toBe('Problem CEOI15_teams');
    expect(result2.title).toBe('Problem IOI14_rail');
  });

  it('should throw error for invalid OJ.UZ URLs', async () => {
    await expect(fetchOJUZ('https://oj.uz/problem')).rejects.toThrow('Invalid OJ.UZ URL');
  });
});

describe('fetchAtCoder', () => {
  it('should fetch AtCoder problems', async () => {
    const result = await fetchAtCoder('https://atcoder.jp/contests/abc123/tasks/abc123_a');

    expect(result.platform).toBe('atcoder');
    expect(result.source).toBe('AtCoder');
    expect(result.title).toBe('Problem abc123_a');
    expect(result.fetched).toBe(false);
  });

  it('should handle different contest types', async () => {
    const result1 = await fetchAtCoder('https://atcoder.jp/contests/arc100/tasks/arc100_b');
    const result2 = await fetchAtCoder('https://atcoder.jp/contests/agc050/tasks/agc050_d');

    expect(result1.title).toBe('Problem arc100_b');
    expect(result2.title).toBe('Problem agc050_d');
  });

  it('should throw error for invalid AtCoder URLs', async () => {
    await expect(fetchAtCoder('https://atcoder.jp/contests/abc123')).rejects.toThrow(
      'Invalid AtCoder URL'
    );
  });
});

describe('fetchNerdArena', () => {
  it('should fetch NerdArena problems from /problema/', async () => {
    const result = await fetchNerdArena('https://nerdarena.ro/problema/suma');

    expect(result.platform).toBe('nerdarena');
    expect(result.source).toBe('NerdArena');
    expect(result.title).toBe('Problem suma');
    expect(result.fetched).toBe(false);
  });

  it('should fetch NerdArena problems from /probleme/', async () => {
    const result = await fetchNerdArena('https://nerdarena.ro/probleme/123');

    expect(result.platform).toBe('nerdarena');
    expect(result.source).toBe('NerdArena');
    expect(result.title).toBe('Problem 123');
  });

  it('should handle different problem slugs', async () => {
    const result1 = await fetchNerdArena('https://nerdarena.ro/problema/dijkstra');
    const result2 = await fetchNerdArena('https://nerdarena.ro/probleme/456');

    expect(result1.title).toBe('Problem dijkstra');
    expect(result2.title).toBe('Problem 456');
  });

  it('should throw error for invalid NerdArena URLs', async () => {
    await expect(fetchNerdArena('https://nerdarena.ro/')).rejects.toThrow('Invalid NerdArena URL');
  });
});

describe('edge cases', () => {
  it('should handle URLs with trailing slashes', async () => {
    const result = await fetchCSES('https://cses.fi/problemset/task/1068/');

    expect(result.platform).toBe('cses');
  });

  it('should handle URLs with query parameters', async () => {
    const result = await fetchCSES('https://cses.fi/problemset/task/1068?lang=en');

    expect(result.platform).toBe('cses');
  });

  it('should handle URLs with fragments', async () => {
    const result = await fetchCSES('https://cses.fi/problemset/task/1068#description');

    expect(result.platform).toBe('cses');
  });

  it('should preserve original URL in result', async () => {
    const url = 'https://cses.fi/problemset/task/1068';
    const result = await fetchCSES(url);

    expect(result.url).toBe(url);
  });

  it('should handle http protocol', async () => {
    const result = await fetchInfoarena('http://infoarena.ro/problema/suma');

    expect(result.platform).toBe('infoarena');
  });
});