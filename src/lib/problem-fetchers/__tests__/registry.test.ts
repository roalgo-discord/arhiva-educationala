import { describe, it, expect } from 'vitest';
import { detectPlatform, parseProblemId, PLATFORMS } from '../registry';

describe('PLATFORMS', () => {
  it('should have all required platforms defined', () => {
    expect(PLATFORMS).toHaveProperty('kilonova');
    expect(PLATFORMS).toHaveProperty('codeforces');
    expect(PLATFORMS).toHaveProperty('pbinfo');
    expect(PLATFORMS).toHaveProperty('cses');
    expect(PLATFORMS).toHaveProperty('infoarena');
    expect(PLATFORMS).toHaveProperty('usaco');
    expect(PLATFORMS).toHaveProperty('oj.uz');
    expect(PLATFORMS).toHaveProperty('atcoder');
    expect(PLATFORMS).toHaveProperty('nerdarena');
    expect(PLATFORMS).toHaveProperty('unknown');
  });

  it('should have correct configuration for each platform', () => {
    Object.entries(PLATFORMS).forEach(([key, config]) => {
      expect(config).toHaveProperty('name');
      expect(config).toHaveProperty('domain');
      expect(config).toHaveProperty('color');
      expect(config).toHaveProperty('supportsAPI');
      expect(typeof config.name).toBe('string');
      expect(typeof config.domain).toBe('string');
      expect(typeof config.color).toBe('string');
      expect(typeof config.supportsAPI).toBe('boolean');
    });
  });

  it('should have unique domains', () => {
    const domains = Object.values(PLATFORMS)
      .map(p => p.domain)
      .filter(d => d !== '');
    const uniqueDomains = new Set(domains);
    expect(domains.length).toBe(uniqueDomains.size);
  });
});

describe('detectPlatform', () => {
  describe('exact domain matches', () => {
    it('should detect Kilonova', () => {
      expect(detectPlatform('https://kilonova.ro/problems/123')).toBe('kilonova');
      expect(detectPlatform('http://kilonova.ro/problems/123')).toBe('kilonova');
    });

    it('should detect Codeforces', () => {
      expect(detectPlatform('https://codeforces.com/contest/123/problem/A')).toBe('codeforces');
      expect(detectPlatform('http://codeforces.com/problemset/problem/123/A')).toBe('codeforces');
    });

    it('should detect PBInfo', () => {
      expect(detectPlatform('https://pbinfo.ro/probleme/123/slug')).toBe('pbinfo');
      expect(detectPlatform('https://www.pbinfo.ro/probleme/123')).toBe('pbinfo');
    });

    it('should detect CSES', () => {
      expect(detectPlatform('https://cses.fi/problemset/task/123')).toBe('cses');
    });

    it('should detect InfoArena', () => {
      expect(detectPlatform('https://infoarena.ro/problema/test')).toBe('infoarena');
      expect(detectPlatform('https://www.infoarena.ro/problema/test')).toBe('infoarena');
    });

    it('should detect USACO', () => {
      expect(detectPlatform('http://usaco.org/index.php?page=viewproblem2&cpid=123')).toBe('usaco');
    });

    it('should detect OJ.UZ', () => {
      expect(detectPlatform('https://oj.uz/problem/view/JOI13_synchronization')).toBe('oj.uz');
    });

    it('should detect AtCoder', () => {
      expect(detectPlatform('https://atcoder.jp/contests/abc123/tasks/abc123_a')).toBe('atcoder');
    });

    it('should detect NerdArena', () => {
      expect(detectPlatform('https://nerdarena.ro/problema/test')).toBe('nerdarena');
      expect(detectPlatform('https://www.nerdarena.ro/probleme/123')).toBe('nerdarena');
    });
  });

  describe('subdomain support', () => {
    it('should detect platforms with subdomains', () => {
      expect(detectPlatform('https://www.kilonova.ro/problems/123')).toBe('kilonova');
      expect(detectPlatform('https://api.kilonova.ro/problems/123')).toBe('kilonova');
    });
  });

  describe('case insensitivity', () => {
    it('should handle uppercase domains', () => {
      expect(detectPlatform('https://KILONOVA.RO/problems/123')).toBe('kilonova');
      expect(detectPlatform('https://CodeForces.COM/contest/123')).toBe('codeforces');
    });

    it('should handle mixed case domains', () => {
      expect(detectPlatform('https://KiLoNoVa.Ro/problems/123')).toBe('kilonova');
    });
  });

  describe('unknown platforms', () => {
    it('should return unknown for unrecognized domains', () => {
      expect(detectPlatform('https://example.com/problem/123')).toBe('unknown');
      expect(detectPlatform('https://leetcode.com/problems/two-sum')).toBe('unknown');
      expect(detectPlatform('https://random-site.org/test')).toBe('unknown');
    });
  });

  describe('invalid URLs', () => {
    it('should return unknown for invalid URLs', () => {
      expect(detectPlatform('not-a-url')).toBe('unknown');
      expect(detectPlatform('')).toBe('unknown');
      expect(detectPlatform('javascript:alert(1)')).toBe('unknown');
    });

    it('should handle malformed URLs gracefully', () => {
      expect(detectPlatform('https://')).toBe('unknown');
      expect(detectPlatform('http:/kilonova.ro')).toBe('unknown');
    });
  });

  describe('edge cases', () => {
    it('should handle URLs with paths', () => {
      expect(detectPlatform('https://kilonova.ro/problems/123/solution')).toBe('kilonova');
    });

    it('should handle URLs with query parameters', () => {
      expect(detectPlatform('https://usaco.org/index.php?page=viewproblem2&cpid=123')).toBe('usaco');
    });

    it('should handle URLs with fragments', () => {
      expect(detectPlatform('https://kilonova.ro/problems/123#solution')).toBe('kilonova');
    });

    it('should handle URLs with ports', () => {
      expect(detectPlatform('https://kilonova.ro:8080/problems/123')).toBe('kilonova');
    });
  });
});

describe('parseProblemId', () => {
  describe('Kilonova', () => {
    it('should parse problem URLs', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123', 'kilonova')).toBe('123');
      expect(parseProblemId('https://kilonova.ro/problems/456/edit', 'kilonova')).toBe('456');
    });

    it('should parse tag URLs', () => {
      expect(parseProblemId('https://kilonova.ro/tags/789', 'kilonova')).toBe('789');
    });

    it('should return null for invalid URLs', () => {
      expect(parseProblemId('https://kilonova.ro/invalid', 'kilonova')).toBe(null);
      expect(parseProblemId('https://kilonova.ro/', 'kilonova')).toBe(null);
    });
  });

  describe('Codeforces', () => {
    it('should parse contest problem URLs', () => {
      expect(parseProblemId('https://codeforces.com/contest/123/problem/A', 'codeforces')).toBe('123A');
      expect(parseProblemId('https://codeforces.com/contest/456/problem/B1', 'codeforces')).toBe('456B1');
    });

    it('should parse problemset URLs', () => {
      expect(parseProblemId('https://codeforces.com/problemset/problem/789/C', 'codeforces')).toBe('789C');
    });

    it('should parse gym URLs', () => {
      expect(parseProblemId('https://codeforces.com/gym/102134/problem/A', 'codeforces')).toBe('102134A');
    });

    it('should handle URLs without problem index', () => {
      expect(parseProblemId('https://codeforces.com/contest/123', 'codeforces')).toBe('123');
    });

    it('should return null for invalid URLs', () => {
      expect(parseProblemId('https://codeforces.com/invalid', 'codeforces')).toBe(null);
    });
  });

  describe('PBInfo', () => {
    it('should parse problem URLs', () => {
      expect(parseProblemId('https://pbinfo.ro/probleme/123/test-problem', 'pbinfo')).toBe('123');
      expect(parseProblemId('https://pbinfo.ro/probleme/456', 'pbinfo')).toBe('456');
    });

    it('should return null for invalid URLs', () => {
      expect(parseProblemId('https://pbinfo.ro/invalid', 'pbinfo')).toBe(null);
      expect(parseProblemId('https://pbinfo.ro/', 'pbinfo')).toBe(null);
    });
  });

  describe('CSES', () => {
    it('should parse task URLs', () => {
      expect(parseProblemId('https://cses.fi/problemset/task/1068', 'cses')).toBe('1068');
      expect(parseProblemId('https://cses.fi/problemset/task/9999/solution', 'cses')).toBe('9999');
    });

    it('should return null for invalid URLs', () => {
      expect(parseProblemId('https://cses.fi/problemset/list', 'cses')).toBe(null);
    });
  });

  describe('InfoArena', () => {
    it('should parse problem URLs', () => {
      expect(parseProblemId('https://infoarena.ro/problema/arbore', 'infoarena')).toBe('arbore');
      expect(parseProblemId('https://infoarena.ro/problema/test-slug', 'infoarena')).toBe('test-slug');
    });

    it('should return null for invalid URLs', () => {
      expect(parseProblemId('https://infoarena.ro/invalid', 'infoarena')).toBe(null);
    });
  });

  describe('USACO', () => {
    it('should parse USACO URLs with cpid parameter', () => {
      expect(parseProblemId('http://usaco.org/index.php?page=viewproblem2&cpid=123', 'usaco')).toBe('123');
      expect(parseProblemId('http://www.usaco.org/index.php?page=viewproblem2&cpid=456&other=param', 'usaco')).toBe('456');
    });

    it('should return null when cpid is missing', () => {
      expect(parseProblemId('http://usaco.org/index.php?page=viewproblem2', 'usaco')).toBe(null);
      expect(parseProblemId('http://usaco.org/', 'usaco')).toBe(null);
    });
  });

  describe('OJ.UZ', () => {
    it('should parse problem view URLs', () => {
      expect(parseProblemId('https://oj.uz/problem/view/JOI13_synchronization', 'oj.uz')).toBe('JOI13_synchronization');
      expect(parseProblemId('https://oj.uz/problem/view/test-problem', 'oj.uz')).toBe('test-problem');
    });

    it('should return null for invalid URLs', () => {
      expect(parseProblemId('https://oj.uz/problems', 'oj.uz')).toBe(null);
    });
  });

  describe('AtCoder', () => {
    it('should parse task URLs', () => {
      expect(parseProblemId('https://atcoder.jp/contests/abc123/tasks/abc123_a', 'atcoder')).toBe('abc123_a');
      expect(parseProblemId('https://atcoder.jp/contests/arc100/tasks/arc100_b', 'atcoder')).toBe('arc100_b');
    });

    it('should return null for invalid URLs', () => {
      expect(parseProblemId('https://atcoder.jp/contests/abc123', 'atcoder')).toBe(null);
    });
  });

  describe('NerdArena', () => {
    it('should parse problema URLs', () => {
      expect(parseProblemId('https://nerdarena.ro/problema/test', 'nerdarena')).toBe('test');
      expect(parseProblemId('https://nerdarena.ro/problema/my-problem', 'nerdarena')).toBe('my-problem');
    });

    it('should parse probleme URLs', () => {
      expect(parseProblemId('https://nerdarena.ro/probleme/123', 'nerdarena')).toBe('123');
    });

    it('should return null for invalid URLs', () => {
      expect(parseProblemId('https://nerdarena.ro/invalid', 'nerdarena')).toBe(null);
    });
  });

  describe('invalid inputs', () => {
    it('should handle invalid URLs gracefully', () => {
      expect(parseProblemId('not-a-url', 'kilonova')).toBe(null);
      expect(parseProblemId('', 'codeforces')).toBe(null);
    });

    it('should handle unknown platforms', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123', 'unknown')).toBe(null);
    });
  });

  describe('edge cases', () => {
    it('should handle URLs with extra slashes', () => {
      expect(parseProblemId('https://kilonova.ro//problems//123', 'kilonova')).toBe('123');
    });

    it('should handle URLs with trailing slashes', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123/', 'kilonova')).toBe('123');
    });

    it('should handle URLs with query parameters', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123?tab=solution', 'kilonova')).toBe('123');
    });

    it('should handle URLs with fragments', () => {
      expect(parseProblemId('https://kilonova.ro/problems/123#description', 'kilonova')).toBe('123');
    });
  });
});