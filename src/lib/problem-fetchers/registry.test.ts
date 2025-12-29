import { describe, it, expect } from 'vitest';
import { detectPlatform, parseProblemId, PLATFORMS } from './registry';

describe('PLATFORMS', () => {
  it('should contain all expected platforms', () => {
    const expectedPlatforms = [
      'kilonova',
      'codeforces',
      'pbinfo',
      'cses',
      'infoarena',
      'usaco',
      'oj.uz',
      'atcoder',
      'nerdarena',
      'unknown',
    ];
    
    expectedPlatforms.forEach(platform => {
      expect(PLATFORMS).toHaveProperty(platform);
    });
  });

  it('should have correct domain mappings', () => {
    expect(PLATFORMS.kilonova.domain).toBe('kilonova.ro');
    expect(PLATFORMS.codeforces.domain).toBe('codeforces.com');
    expect(PLATFORMS.pbinfo.domain).toBe('pbinfo.ro');
    expect(PLATFORMS.cses.domain).toBe('cses.fi');
    expect(PLATFORMS.infoarena.domain).toBe('infoarena.ro');
  });

  it('should have correct API support flags', () => {
    expect(PLATFORMS.kilonova.supportsAPI).toBe(true);
    expect(PLATFORMS.codeforces.supportsAPI).toBe(true);
    expect(PLATFORMS.pbinfo.supportsAPI).toBe(false);
    expect(PLATFORMS.cses.supportsAPI).toBe(false);
  });
});

describe('detectPlatform', () => {
  describe('Kilonova', () => {
    it('should detect kilonova.ro URLs', () => {
      expect(detectPlatform('https://kilonova.ro/problems/123')).toBe('kilonova');
      expect(detectPlatform('http://kilonova.ro/tags/1')).toBe('kilonova');
      expect(detectPlatform('https://www.kilonova.ro/problems/456')).toBe('kilonova');
    });
  });

  describe('Codeforces', () => {
    it('should detect codeforces.com URLs', () => {
      expect(detectPlatform('https://codeforces.com/contest/1234/problem/A')).toBe('codeforces');
      expect(detectPlatform('https://codeforces.com/problemset/problem/1234/A')).toBe('codeforces');
      expect(detectPlatform('https://codeforces.com/gym/102345/problem/B')).toBe('codeforces');
    });
  });

  describe('PBInfo', () => {
    it('should detect pbinfo.ro URLs', () => {
      expect(detectPlatform('https://pbinfo.ro/probleme/123/suma')).toBe('pbinfo');
      expect(detectPlatform('http://www.pbinfo.ro/probleme/456/produse')).toBe('pbinfo');
    });
  });

  describe('CSES', () => {
    it('should detect cses.fi URLs', () => {
      expect(detectPlatform('https://cses.fi/problemset/task/1068')).toBe('cses');
      expect(detectPlatform('https://cses.fi/problemset/task/1083/')).toBe('cses');
    });
  });

  describe('InfoArena', () => {
    it('should detect infoarena.ro URLs', () => {
      expect(detectPlatform('https://infoarena.ro/problema/suma')).toBe('infoarena');
      expect(detectPlatform('http://www.infoarena.ro/problema/arbore')).toBe('infoarena');
    });
  });

  describe('USACO', () => {
    it('should detect usaco.org URLs', () => {
      expect(detectPlatform('http://www.usaco.org/index.php?page=viewproblem2&cpid=1234')).toBe('usaco');
      expect(detectPlatform('https://usaco.org/index.php?page=viewproblem2&cpid=5678')).toBe('usaco');
    });
  });

  describe('OJ.UZ', () => {
    it('should detect oj.uz URLs', () => {
      expect(detectPlatform('https://oj.uz/problem/view/JOI13_synchronization')).toBe('oj.uz');
      expect(detectPlatform('http://oj.uz/problem/view/CEOI15_teams')).toBe('oj.uz');
    });
  });

  describe('AtCoder', () => {
    it('should detect atcoder.jp URLs', () => {
      expect(detectPlatform('https://atcoder.jp/contests/abc123/tasks/abc123_a')).toBe('atcoder');
      expect(detectPlatform('https://atcoder.jp/contests/arc100/tasks/arc100_b')).toBe('atcoder');
    });
  });

  describe('NerdArena', () => {
    it('should detect nerdarena.ro URLs', () => {
      expect(detectPlatform('https://nerdarena.ro/problema/suma')).toBe('nerdarena');
      expect(detectPlatform('https://nerdarena.ro/probleme/123')).toBe('nerdarena');
    });
  });

  describe('unknown platforms', () => {
    it('should return unknown for unrecognized domains', () => {
      expect(detectPlatform('https://example.com/problem/123')).toBe('unknown');
      expect(detectPlatform('https://leetcode.com/problems/two-sum')).toBe('unknown');
      expect(detectPlatform('https://hackerrank.com/challenges/simple-array-sum')).toBe('unknown');
    });

    it('should return unknown for invalid URLs', () => {
      expect(detectPlatform('not a url')).toBe('unknown');
      expect(detectPlatform('')).toBe('unknown');
      expect(detectPlatform('://invalid')).toBe('unknown');
    });
  });

  describe('edge cases', () => {
    it('should handle URLs with www prefix', () => {
      expect(detectPlatform('https://www.kilonova.ro/problems/123')).toBe('kilonova');
      expect(detectPlatform('https://www.codeforces.com/contest/1234')).toBe('codeforces');
    });

    it('should handle URLs with trailing slashes', () => {
      expect(detectPlatform('https://kilonova.ro/problems/123/')).toBe('kilonova');
      expect(detectPlatform('https://cses.fi/problemset/task/1068/')).toBe('cses');
    });

    it('should handle URLs with query parameters', () => {
      expect(detectPlatform('https://kilonova.ro/problems/123?lang=en')).toBe('kilonova');
    });

    it('should handle URLs with fragments', () => {
      expect(detectPlatform('https://kilonova.ro/problems/123#description')).toBe('kilonova');
    });

    it('should handle URLs with different protocols', () => {
      expect(detectPlatform('http://kilonova.ro/problems/123')).toBe('kilonova');
      expect(detectPlatform('https://kilonova.ro/problems/123')).toBe('kilonova');
    });

    it('should handle case insensitivity', () => {
      expect(detectPlatform('https://KILONOVA.RO/problems/123')).toBe('kilonova');
      expect(detectPlatform('https://Codeforces.Com/contest/1234')).toBe('codeforces');
    });
  });
});

describe('parseProblemId', () => {
  describe('Kilonova', () => {
    it('should parse problem IDs from /problems/ URLs', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123', 'kilonova')).toBe('123');
      expect(parseProblemId('https://kilonova.ro/problems/456', 'kilonova')).toBe('456');
      expect(parseProblemId('https://kilonova.ro/problems/999999', 'kilonova')).toBe('999999');
    });

    it('should parse problem IDs from /tags/ URLs', () => {
      expect(parseProblemId('https://kilonova.ro/tags/1', 'kilonova')).toBe('1');
      expect(parseProblemId('https://kilonova.ro/tags/42', 'kilonova')).toBe('42');
    });

    it('should return null for invalid Kilonova URLs', () => {
      expect(parseProblemId('https://kilonova.ro/contests/123', 'kilonova')).toBeNull();
      expect(parseProblemId('https://kilonova.ro/problems/', 'kilonova')).toBeNull();
      expect(parseProblemId('https://kilonova.ro/problems/abc', 'kilonova')).toBeNull();
    });
  });

  describe('Codeforces', () => {
    it('should parse contest problem IDs', () => {
      expect(parseProblemId('https://codeforces.com/contest/1234/problem/A', 'codeforces')).toBe('1234A');
      expect(parseProblemId('https://codeforces.com/contest/1234/problem/B', 'codeforces')).toBe('1234B');
      expect(parseProblemId('https://codeforces.com/contest/1750/problem/D', 'codeforces')).toBe('1750D');
    });

    it('should parse problemset URLs', () => {
      expect(parseProblemId('https://codeforces.com/problemset/problem/1234/A', 'codeforces')).toBe('1234A');
      expect(parseProblemId('https://codeforces.com/problemset/problem/456/C', 'codeforces')).toBe('456C');
    });

    it('should parse gym problem IDs', () => {
      expect(parseProblemId('https://codeforces.com/gym/102345/problem/B', 'codeforces')).toBe('102345B');
      expect(parseProblemId('https://codeforces.com/gym/100001/problem/Z', 'codeforces')).toBe('100001Z');
    });

    it('should default to problem A when not specified', () => {
      expect(parseProblemId('https://codeforces.com/contest/1234', 'codeforces')).toBe('1234');
      expect(parseProblemId('https://codeforces.com/gym/102345', 'codeforces')).toBe('102345');
    });

    it('should handle problems with number suffixes', () => {
      expect(parseProblemId('https://codeforces.com/contest/1234/problem/A1', 'codeforces')).toBe('1234A1');
      expect(parseProblemId('https://codeforces.com/contest/1234/problem/B2', 'codeforces')).toBe('1234B2');
    });

    it('should return null for invalid Codeforces URLs', () => {
      expect(parseProblemId('https://codeforces.com/profile/tourist', 'codeforces')).toBeNull();
      expect(parseProblemId('https://codeforces.com/contests', 'codeforces')).toBeNull();
    });
  });

  describe('PBInfo', () => {
    it('should parse problem IDs', () => {
      expect(parseProblemId('https://pbinfo.ro/probleme/123/suma', 'pbinfo')).toBe('123');
      expect(parseProblemId('https://pbinfo.ro/probleme/456/produse-de-numere', 'pbinfo')).toBe('456');
      expect(parseProblemId('https://pbinfo.ro/probleme/789', 'pbinfo')).toBe('789');
    });

    it('should return null for invalid PBInfo URLs', () => {
      expect(parseProblemId('https://pbinfo.ro/', 'pbinfo')).toBeNull();
      expect(parseProblemId('https://pbinfo.ro/lectii', 'pbinfo')).toBeNull();
      expect(parseProblemId('https://pbinfo.ro/probleme/', 'pbinfo')).toBeNull();
    });
  });

  describe('CSES', () => {
    it('should parse task IDs', () => {
      expect(parseProblemId('https://cses.fi/problemset/task/1068', 'cses')).toBe('1068');
      expect(parseProblemId('https://cses.fi/problemset/task/1083', 'cses')).toBe('1083');
      expect(parseProblemId('https://cses.fi/problemset/task/2189', 'cses')).toBe('2189');
    });

    it('should return null for invalid CSES URLs', () => {
      expect(parseProblemId('https://cses.fi/problemset', 'cses')).toBeNull();
      expect(parseProblemId('https://cses.fi/', 'cses')).toBeNull();
      expect(parseProblemId('https://cses.fi/problemset/task/', 'cses')).toBeNull();
    });
  });

  describe('InfoArena', () => {
    it('should parse problem slugs', () => {
      expect(parseProblemId('https://infoarena.ro/problema/suma', 'infoarena')).toBe('suma');
      expect(parseProblemId('https://infoarena.ro/problema/arbore', 'infoarena')).toBe('arbore');
      expect(parseProblemId('https://infoarena.ro/problema/dijkstra', 'infoarena')).toBe('dijkstra');
    });

    it('should return null for invalid InfoArena URLs', () => {
      expect(parseProblemId('https://infoarena.ro/', 'infoarena')).toBeNull();
      expect(parseProblemId('https://infoarena.ro/problema/', 'infoarena')).toBeNull();
      expect(parseProblemId('https://infoarena.ro/concursuri', 'infoarena')).toBeNull();
    });
  });

  describe('USACO', () => {
    it('should parse problem IDs from query parameters', () => {
      expect(parseProblemId('http://www.usaco.org/index.php?page=viewproblem2&cpid=1234', 'usaco')).toBe('1234');
      expect(parseProblemId('http://www.usaco.org/index.php?page=viewproblem2&cpid=5678', 'usaco')).toBe('5678');
    });

    it('should return null when cpid parameter is missing', () => {
      expect(parseProblemId('http://www.usaco.org/index.php?page=viewproblem2', 'usaco')).toBeNull();
      expect(parseProblemId('http://www.usaco.org/index.php', 'usaco')).toBeNull();
    });
  });

  describe('OJ.UZ', () => {
    it('should parse problem IDs', () => {
      expect(parseProblemId('https://oj.uz/problem/view/JOI13_synchronization', 'oj.uz')).toBe('JOI13_synchronization');
      expect(parseProblemId('https://oj.uz/problem/view/CEOI15_teams', 'oj.uz')).toBe('CEOI15_teams');
      expect(parseProblemId('https://oj.uz/problem/view/IOI14_rail', 'oj.uz')).toBe('IOI14_rail');
    });

    it('should return null for invalid OJ.UZ URLs', () => {
      expect(parseProblemId('https://oj.uz/problem', 'oj.uz')).toBeNull();
      expect(parseProblemId('https://oj.uz/problem/view/', 'oj.uz')).toBeNull();
    });
  });

  describe('AtCoder', () => {
    it('should parse task IDs', () => {
      expect(parseProblemId('https://atcoder.jp/contests/abc123/tasks/abc123_a', 'atcoder')).toBe('abc123_a');
      expect(parseProblemId('https://atcoder.jp/contests/arc100/tasks/arc100_b', 'atcoder')).toBe('arc100_b');
      expect(parseProblemId('https://atcoder.jp/contests/agc050/tasks/agc050_d', 'atcoder')).toBe('agc050_d');
    });

    it('should return null for invalid AtCoder URLs', () => {
      expect(parseProblemId('https://atcoder.jp/contests/abc123', 'atcoder')).toBeNull();
      expect(parseProblemId('https://atcoder.jp/', 'atcoder')).toBeNull();
    });
  });

  describe('NerdArena', () => {
    it('should parse problem slugs from /problema/ URLs', () => {
      expect(parseProblemId('https://nerdarena.ro/problema/suma', 'nerdarena')).toBe('suma');
      expect(parseProblemId('https://nerdarena.ro/problema/dijkstra', 'nerdarena')).toBe('dijkstra');
    });

    it('should parse problem IDs from /probleme/ URLs', () => {
      expect(parseProblemId('https://nerdarena.ro/probleme/123', 'nerdarena')).toBe('123');
      expect(parseProblemId('https://nerdarena.ro/probleme/456', 'nerdarena')).toBe('456');
    });

    it('should return null for invalid NerdArena URLs', () => {
      expect(parseProblemId('https://nerdarena.ro/', 'nerdarena')).toBeNull();
      expect(parseProblemId('https://nerdarena.ro/problema/', 'nerdarena')).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle URLs with trailing slashes', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123/', 'kilonova')).toBe('123');
      expect(parseProblemId('https://cses.fi/problemset/task/1068/', 'cses')).toBe('1068');
    });

    it('should handle URLs with query parameters', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123?lang=en', 'kilonova')).toBe('123');
    });

    it('should handle URLs with fragments', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123#description', 'kilonova')).toBe('123');
    });

    it('should return null for malformed URLs', () => {
      expect(parseProblemId('not a url', 'kilonova')).toBeNull();
      expect(parseProblemId('', 'kilonova')).toBeNull();
    });

    it('should validate platform parameter', () => {
      // Should not throw but return null for invalid platforms
      expect(parseProblemId('https://kilonova.ro/problems/123', 'unknown')).toBeNull();
    });
  });
});