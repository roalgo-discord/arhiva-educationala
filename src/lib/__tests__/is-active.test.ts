import { describe, it, expect } from 'vitest';
import { isActive, isTabActive } from '../is-active';
import type { SidebarTab } from 'fumadocs-ui/utils/get-sidebar-tabs';

describe('isActive', () => {
  describe('exact matching', () => {
    it('should return true for exact URL match', () => {
      expect(isActive('/docs', '/docs')).toBe(true);
      expect(isActive('/about', '/about')).toBe(true);
      expect(isActive('/', '/')).toBe(true);
    });

    it('should return false for non-matching URLs', () => {
      expect(isActive('/docs', '/about')).toBe(false);
      expect(isActive('/docs/intro', '/docs/guide')).toBe(false);
    });

    it('should normalize trailing slashes', () => {
      expect(isActive('/docs/', '/docs')).toBe(true);
      expect(isActive('/docs', '/docs/')).toBe(true);
      expect(isActive('/docs/', '/docs/')).toBe(true);
    });

    it('should not normalize root path trailing slash', () => {
      expect(isActive('/', '/')).toBe(true);
    });
  });

  describe('nested matching', () => {
    it('should return true for nested paths when nested=true', () => {
      expect(isActive('/docs', '/docs/intro', true)).toBe(true);
      expect(isActive('/docs', '/docs/intro/getting-started', true)).toBe(true);
      expect(isActive('/api', '/api/users', true)).toBe(true);
    });

    it('should return false for non-nested paths when nested=true', () => {
      expect(isActive('/docs', '/documentation', true)).toBe(false);
      expect(isActive('/api', '/apis', true)).toBe(false);
    });

    it('should only match exact when nested=false', () => {
      expect(isActive('/docs', '/docs/intro', false)).toBe(false);
      expect(isActive('/docs', '/docs', false)).toBe(true);
    });

    it('should handle nested matching with trailing slashes', () => {
      expect(isActive('/docs/', '/docs/intro', true)).toBe(true);
      expect(isActive('/docs', '/docs/intro/', true)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings', () => {
      expect(isActive('', '')).toBe(true);
      expect(isActive('', '/docs')).toBe(false);
      expect(isActive('/docs', '')).toBe(false);
    });

    it('should handle URLs with query parameters', () => {
      expect(isActive('/docs?tab=1', '/docs?tab=1')).toBe(true);
      expect(isActive('/docs?tab=1', '/docs?tab=2')).toBe(false);
    });

    it('should handle URLs with hashes', () => {
      expect(isActive('/docs#intro', '/docs#intro')).toBe(true);
      expect(isActive('/docs#intro', '/docs#guide')).toBe(false);
    });

    it('should handle complex nested paths', () => {
      expect(isActive('/docs/api', '/docs/api/v1/users', true)).toBe(true);
      expect(isActive('/docs/api/v1', '/docs/api/v2/users', true)).toBe(false);
    });

    it('should handle similar but different paths', () => {
      expect(isActive('/doc', '/docs', true)).toBe(false);
      expect(isActive('/api', '/api-docs', true)).toBe(false);
    });
  });
});

describe('isTabActive', () => {
  describe('with urls set', () => {
    it('should return true if pathname is in urls set', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
        urls: new Set(['/docs', '/docs/intro', '/docs/guide']),
      };

      expect(isTabActive(tab, '/docs')).toBe(true);
      expect(isTabActive(tab, '/docs/intro')).toBe(true);
      expect(isTabActive(tab, '/docs/guide')).toBe(true);
    });

    it('should return false if pathname is not in urls set', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
        urls: new Set(['/docs', '/docs/intro']),
      };

      expect(isTabActive(tab, '/about')).toBe(false);
      expect(isTabActive(tab, '/docs/advanced')).toBe(false);
    });

    it('should normalize trailing slashes when checking urls', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
        urls: new Set(['/docs/', '/docs/intro/']),
      };

      expect(isTabActive(tab, '/docs')).toBe(true);
      expect(isTabActive(tab, '/docs/intro')).toBe(true);
    });
  });

  describe('without urls set', () => {
    it('should use isActive with nested=true', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
      };

      expect(isTabActive(tab, '/docs')).toBe(true);
      expect(isTabActive(tab, '/docs/intro')).toBe(true);
      expect(isTabActive(tab, '/docs/intro/getting-started')).toBe(true);
    });

    it('should return false for non-nested paths', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
      };

      expect(isTabActive(tab, '/about')).toBe(false);
      expect(isTabActive(tab, '/documentation')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle empty urls set', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
        urls: new Set([]),
      };

      expect(isTabActive(tab, '/docs')).toBe(false);
      expect(isTabActive(tab, '/docs/intro')).toBe(false);
    });

    it('should handle root path', () => {
      const tab: SidebarTab = {
        title: 'Home',
        url: '/',
      };

      expect(isTabActive(tab, '/')).toBe(true);
      expect(isTabActive(tab, '/docs')).toBe(true);
    });
  });
});