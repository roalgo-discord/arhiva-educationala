import { describe, it, expect, vi } from 'vitest';
import { mergeRefs } from './merge-refs';
import type { MutableRefObject, RefCallback } from 'react';

describe('mergeRefs', () => {
  describe('function refs', () => {
    it('should call all function refs with the value', () => {
      const ref1 = vi.fn();
      const ref2 = vi.fn();
      const ref3 = vi.fn();
      
      const merged = mergeRefs(ref1, ref2, ref3);
      const element = document.createElement('div');
      
      merged(element);
      
      expect(ref1).toHaveBeenCalledWith(element);
      expect(ref2).toHaveBeenCalledWith(element);
      expect(ref3).toHaveBeenCalledWith(element);
      expect(ref1).toHaveBeenCalledTimes(1);
      expect(ref2).toHaveBeenCalledTimes(1);
      expect(ref3).toHaveBeenCalledTimes(1);
    });

    it('should call refs with null when unmounting', () => {
      const ref1 = vi.fn();
      const ref2 = vi.fn();
      
      const merged = mergeRefs(ref1, ref2);
      
      merged(null);
      
      expect(ref1).toHaveBeenCalledWith(null);
      expect(ref2).toHaveBeenCalledWith(null);
    });
  });

  describe('object refs', () => {
    it('should set current property on object refs', () => {
      const ref1: MutableRefObject<HTMLDivElement | null> = { current: null };
      const ref2: MutableRefObject<HTMLDivElement | null> = { current: null };
      
      const merged = mergeRefs(ref1, ref2);
      const element = document.createElement('div');
      
      merged(element);
      
      expect(ref1.current).toBe(element);
      expect(ref2.current).toBe(element);
    });

    it('should handle null values', () => {
      const ref1: MutableRefObject<HTMLDivElement | null> = { current: document.createElement('div') };
      const ref2: MutableRefObject<HTMLDivElement | null> = { current: document.createElement('div') };
      
      const merged = mergeRefs(ref1, ref2);
      
      merged(null);
      
      expect(ref1.current).toBeNull();
      expect(ref2.current).toBeNull();
    });
  });

  describe('mixed refs', () => {
    it('should handle both function and object refs', () => {
      const funcRef = vi.fn();
      const objRef: MutableRefObject<HTMLDivElement | null> = { current: null };
      
      const merged = mergeRefs(funcRef, objRef);
      const element = document.createElement('div');
      
      merged(element);
      
      expect(funcRef).toHaveBeenCalledWith(element);
      expect(objRef.current).toBe(element);
    });

    it('should handle multiple mixed refs', () => {
      const funcRef1 = vi.fn();
      const objRef1: MutableRefObject<HTMLDivElement | null> = { current: null };
      const funcRef2 = vi.fn();
      const objRef2: MutableRefObject<HTMLDivElement | null> = { current: null };
      
      const merged = mergeRefs(funcRef1, objRef1, funcRef2, objRef2);
      const element = document.createElement('div');
      
      merged(element);
      
      expect(funcRef1).toHaveBeenCalledWith(element);
      expect(funcRef2).toHaveBeenCalledWith(element);
      expect(objRef1.current).toBe(element);
      expect(objRef2.current).toBe(element);
    });
  });

  describe('undefined refs', () => {
    it('should handle undefined refs gracefully', () => {
      const ref1 = vi.fn();
      const ref2 = undefined;
      const ref3 = vi.fn();
      
      const merged = mergeRefs(ref1, ref2, ref3);
      const element = document.createElement('div');
      
      expect(() => merged(element)).not.toThrow();
      expect(ref1).toHaveBeenCalledWith(element);
      expect(ref3).toHaveBeenCalledWith(element);
    });

    it('should handle all undefined refs', () => {
      const merged = mergeRefs(undefined, undefined, undefined);
      const element = document.createElement('div');
      
      expect(() => merged(element)).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle no refs', () => {
      const merged = mergeRefs();
      const element = document.createElement('div');
      
      expect(() => merged(element)).not.toThrow();
    });

    it('should handle single ref', () => {
      const ref = vi.fn();
      const merged = mergeRefs(ref);
      const element = document.createElement('div');
      
      merged(element);
      
      expect(ref).toHaveBeenCalledWith(element);
    });

    it('should handle refs being called multiple times', () => {
      const ref1 = vi.fn();
      const ref2: MutableRefObject<HTMLDivElement | null> = { current: null };
      
      const merged = mergeRefs(ref1, ref2);
      const element1 = document.createElement('div');
      const element2 = document.createElement('span');
      
      merged(element1);
      merged(element2);
      
      expect(ref1).toHaveBeenCalledTimes(2);
      expect(ref1).toHaveBeenNthCalledWith(1, element1);
      expect(ref1).toHaveBeenNthCalledWith(2, element2);
      expect(ref2.current).toBe(element2);
    });

    it('should handle different element types', () => {
      const ref = vi.fn();
      const merged = mergeRefs(ref);
      
      const div = document.createElement('div');
      const input = document.createElement('input');
      const button = document.createElement('button');
      
      merged(div);
      merged(input);
      merged(button);
      
      expect(ref).toHaveBeenCalledWith(div);
      expect(ref).toHaveBeenCalledWith(input);
      expect(ref).toHaveBeenCalledWith(button);
    });

    it('should maintain ref order of execution', () => {
      const callOrder: number[] = [];
      const ref1 = vi.fn(() => callOrder.push(1));
      const ref2 = vi.fn(() => callOrder.push(2));
      const ref3 = vi.fn(() => callOrder.push(3));
      
      const merged = mergeRefs(ref1, ref2, ref3);
      const element = document.createElement('div');
      
      merged(element);
      
      expect(callOrder).toEqual([1, 2, 3]);
    });
  });

  describe('type safety', () => {
    it('should work with different ref types', () => {
      const divRef: MutableRefObject<HTMLDivElement | null> = { current: null };
      const elementRef: RefCallback<HTMLElement> = vi.fn();
      
      const merged = mergeRefs(divRef, elementRef);
      const element = document.createElement('div');
      
      merged(element);
      
      expect(divRef.current).toBe(element);
      expect(elementRef).toHaveBeenCalledWith(element);
    });
  });
});