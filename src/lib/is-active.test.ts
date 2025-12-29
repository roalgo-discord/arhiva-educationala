import { describe, it, expect } from 'vitest';
import { isActive, isTabActive } from './is-active';
import type { SidebarTab } from 'fumadocs-ui/utils/get-sidebar-tabs';

describe('isActive', () => {
  describe('exact matching', () => {
    it('should match exact URLs', () => {
      expect(isActive('/docs', '/docs')).toBe(true);
      expect(isActive('/about', '/about')).toBe(true);
      expect(isActive('/', '/')).toBe(true);
    });

    it('should match URLs with trailing slashes normalized', () => {
      expect(isActive('/docs/', '/docs')).toBe(true);
      expect(isActive('/docs', '/docs/')).toBe(true);
      expect(isActive('/docs/', '/docs/')).toBe(true);
    });

    it('should not match different URLs', () => {
      expect(isActive('/docs', '/blog')).toBe(false);
      expect(isActive('/about', '/contact')).toBe(false);
    });

    it('should handle root path correctly', () => {
      expect(isActive('/', '/')).toBe(true);
      expect(isActive('/', '/docs')).toBe(false);
      expect(isActive('/docs', '/')).toBe(false);
    });
  });

  describe('nested matching', () => {
    it('should match nested paths when nested=true', () => {
      expect(isActive('/docs', '/docs/intro', true)).toBe(true);
      expect(isActive('/docs', '/docs/intro/getting-started', true)).toBe(true);
      expect(isActive('/api', '/api/v1', true)).toBe(true);
    });

    it('should not match nested paths when nested=false', () => {
      expect(isActive('/docs', '/docs/intro', false)).toBe(false);
      expect(isActive('/docs', '/docs/intro/getting-started', false)).toBe(false);
    });

    it('should not match paths that start with same prefix but are not nested', () => {
      expect(isActive('/doc', '/docs', true)).toBe(false);
      expect(isActive('/api', '/api-docs', true)).toBe(false);
      expect(isActive('/test', '/testing', true)).toBe(false);
    });

    it('should handle trailing slashes in nested matching', () => {
      expect(isActive('/docs/', '/docs/intro', true)).toBe(true);
      expect(isActive('/docs', '/docs/intro/', true)).toBe(true);
      expect(isActive('/docs/', '/docs/intro/', true)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle empty strings', () => {
      expect(isActive('', '')).toBe(true);
      expect(isActive('', '/docs')).toBe(false);
      expect(isActive('/docs', '')).toBe(false);
    });

    it('should handle complex nested paths', () => {
      expect(isActive('/docs', '/docs/a/b/c/d/e', true)).toBe(true);
      expect(isActive('/docs/intro', '/docs/intro/step1/step2', true)).toBe(true);
    });

    it('should handle paths with query parameters', () => {
      expect(isActive('/docs', '/docs?page=1')).toBe(false);
      expect(isActive('/docs?page=1', '/docs?page=1')).toBe(true);
    });

    it('should handle paths with hash fragments', () => {
      expect(isActive('/docs', '/docs#section')).toBe(false);
      expect(isActive('/docs#section', '/docs#section')).toBe(true);
    });

    it('should handle multiple trailing slashes', () => {
      expect(isActive('/docs//', '/docs')).toBe(true);
      expect(isActive('/docs', '/docs//')).toBe(true);
    });
  });
});

describe('isTabActive', () => {
  describe('with url set', () => {
    it('should match exact pathname', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
        urls: new Set(['/docs']),
      };
      expect(isTabActive(tab, '/docs')).toBe(true);
    });

    it('should match URLs in the set', () => {
      const tab: SidebarTab = {
        title: 'Guides',
        url: '/guides',
        urls: new Set(['/guides', '/docs', '/tutorials']),
      };
      expect(isTabActive(tab, '/guides')).toBe(true);
      expect(isTabActive(tab, '/docs')).toBe(true);
      expect(isTabActive(tab, '/tutorials')).toBe(true);
      expect(isTabActive(tab, '/blog')).toBe(false);
    });

    it('should normalize trailing slashes', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
        urls: new Set(['/docs/']),
      };
      expect(isTabActive(tab, '/docs')).toBe(true);
      expect(isTabActive(tab, '/docs/')).toBe(true);
    });

    it('should handle empty URLs set', () => {
      const tab: SidebarTab = {
        title: 'Empty',
        url: '/empty',
        urls: new Set([]),
      };
      expect(isTabActive(tab, '/empty')).toBe(false);
      expect(isTabActive(tab, '/anything')).toBe(false);
    });
  });

  describe('without urls set', () => {
    it('should fall back to isActive with nested=true', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs',
      };
      expect(isTabActive(tab, '/docs')).toBe(true);
      expect(isTabActive(tab, '/docs/intro')).toBe(true);
      expect(isTabActive(tab, '/docs/intro/getting-started')).toBe(true);
      expect(isTabActive(tab, '/blog')).toBe(false);
    });

    it('should handle root URL', () => {
      const tab: SidebarTab = {
        title: 'Home',
        url: '/',
      };
      expect(isTabActive(tab, '/')).toBe(true);
      expect(isTabActive(tab, '/docs')).toBe(true);
    });

    it('should normalize trailing slashes', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs/',
      };
      expect(isTabActive(tab, '/docs')).toBe(true);
      expect(isTabActive(tab, '/docs/intro')).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle tabs with special characters', () => {
      const tab: SidebarTab = {
        title: 'API',
        url: '/api-v2',
        urls: new Set(['/api-v2', '/api_v2']),
      };
      expect(isTabActive(tab, '/api-v2')).toBe(true);
      expect(isTabActive(tab, '/api_v2')).toBe(true);
      expect(isTabActive(tab, '/api')).toBe(false);
    });

    it('should handle tabs with unicode characters', () => {
      const tab: SidebarTab = {
        title: 'Docs',
        url: '/docs/română',
        urls: new Set(['/docs/română']),
      };
      expect(isTabActive(tab, '/docs/română')).toBe(true);
    });
  });
});