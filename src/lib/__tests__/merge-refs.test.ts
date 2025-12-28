import { describe, it, expect, vi } from 'vitest';
import { mergeRefs } from '../merge-refs';
import type * as React from 'react';

describe('mergeRefs', () => {
  describe('function refs', () => {
    it('should call all function refs with the value', () => {
      const ref1 = vi.fn();
      const ref2 = vi.fn();
      const ref3 = vi.fn();
      const value = { current: 'test' };

      const merged = mergeRefs(ref1, ref2, ref3);
      merged(value);

      expect(ref1).toHaveBeenCalledWith(value);
      expect(ref2).toHaveBeenCalledWith(value);
      expect(ref3).toHaveBeenCalledWith(value);
      expect(ref1).toHaveBeenCalledTimes(1);
      expect(ref2).toHaveBeenCalledTimes(1);
      expect(ref3).toHaveBeenCalledTimes(1);
    });

    it('should handle null as value', () => {
      const ref1 = vi.fn();
      const ref2 = vi.fn();

      const merged = mergeRefs(ref1, ref2);
      merged(null);

      expect(ref1).toHaveBeenCalledWith(null);
      expect(ref2).toHaveBeenCalledWith(null);
    });

    it('should handle undefined as value', () => {
      const ref1 = vi.fn();
      const ref2 = vi.fn();

      const merged = mergeRefs(ref1, ref2);
      merged(undefined);

      expect(ref1).toHaveBeenCalledWith(undefined);
      expect(ref2).toHaveBeenCalledWith(undefined);
    });
  });

  describe('object refs', () => {
    it('should set current property on object refs', () => {
      const ref1: React.RefObject<string> = { current: null };
      const ref2: React.RefObject<string> = { current: null };
      const value = 'test-value';

      const merged = mergeRefs(ref1, ref2);
      merged(value);

      expect(ref1.current).toBe(value);
      expect(ref2.current).toBe(value);
    });

    it('should update existing current values', () => {
      const ref1: React.RefObject<number> = { current: 1 };
      const ref2: React.RefObject<number> = { current: 2 };
      const newValue = 42;

      const merged = mergeRefs(ref1, ref2);
      merged(newValue);

      expect(ref1.current).toBe(newValue);
      expect(ref2.current).toBe(newValue);
    });

    it('should handle null as value for object refs', () => {
      const ref1: React.RefObject<string | null> = { current: 'old' };
      const ref2: React.RefObject<string | null> = { current: 'old' };

      const merged = mergeRefs(ref1, ref2);
      merged(null);

      expect(ref1.current).toBe(null);
      expect(ref2.current).toBe(null);
    });
  });

  describe('mixed refs', () => {
    it('should handle both function and object refs together', () => {
      const funcRef = vi.fn();
      const objRef: React.RefObject<string> = { current: null };
      const value = 'mixed-test';

      const merged = mergeRefs(funcRef, objRef);
      merged(value);

      expect(funcRef).toHaveBeenCalledWith(value);
      expect(objRef.current).toBe(value);
    });

    it('should handle multiple mixed refs', () => {
      const funcRef1 = vi.fn();
      const objRef1: React.RefObject<number> = { current: null };
      const funcRef2 = vi.fn();
      const objRef2: React.RefObject<number> = { current: null };
      const value = 123;

      const merged = mergeRefs(funcRef1, objRef1, funcRef2, objRef2);
      merged(value);

      expect(funcRef1).toHaveBeenCalledWith(value);
      expect(funcRef2).toHaveBeenCalledWith(value);
      expect(objRef1.current).toBe(value);
      expect(objRef2.current).toBe(value);
    });
  });

  describe('undefined refs', () => {
    it('should skip undefined refs without errors', () => {
      const ref1 = vi.fn();
      const ref2 = undefined;
      const ref3 = vi.fn();
      const value = 'test';

      const merged = mergeRefs(ref1, ref2, ref3);
      expect(() => merged(value)).not.toThrow();

      expect(ref1).toHaveBeenCalledWith(value);
      expect(ref3).toHaveBeenCalledWith(value);
    });

    it('should handle all undefined refs', () => {
      const merged = mergeRefs(undefined, undefined, undefined);
      expect(() => merged('value')).not.toThrow();
    });

    it('should handle empty refs array', () => {
      const merged = mergeRefs();
      expect(() => merged('value')).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle refs with different types', () => {
      const stringRef = vi.fn();
      const numberRef: React.RefObject<any> = { current: null };
      
      const merged = mergeRefs(stringRef, numberRef);
      merged('string-value');
      
      expect(stringRef).toHaveBeenCalledWith('string-value');
      expect(numberRef.current).toBe('string-value');
      
      merged(42);
      expect(stringRef).toHaveBeenCalledWith(42);
      expect(numberRef.current).toBe(42);
    });

    it('should handle being called multiple times', () => {
      const ref1 = vi.fn();
      const ref2: React.RefObject<string> = { current: null };

      const merged = mergeRefs(ref1, ref2);
      
      merged('first');
      expect(ref1).toHaveBeenCalledWith('first');
      expect(ref2.current).toBe('first');
      
      merged('second');
      expect(ref1).toHaveBeenCalledWith('second');
      expect(ref2.current).toBe('second');
      
      expect(ref1).toHaveBeenCalledTimes(2);
    });

    it('should handle readonly object refs', () => {
      const ref: React.RefObject<string> = { current: null };
      const merged = mergeRefs(ref);
      
      expect(() => merged('test')).not.toThrow();
      expect(ref.current).toBe('test');
    });
  });

  describe('real-world scenarios', () => {
    it('should work with DOM element refs', () => {
      const callbackRef = vi.fn();
      const objectRef: React.RefObject<HTMLDivElement | null> = { current: null };
      
      const mockDiv = document.createElement('div');
      const merged = mergeRefs(callbackRef, objectRef);
      
      merged(mockDiv);
      
      expect(callbackRef).toHaveBeenCalledWith(mockDiv);
      expect(objectRef.current).toBe(mockDiv);
    });

    it('should handle cleanup on unmount (null value)', () => {
      const callbackRef = vi.fn();
      const objectRef: React.RefObject<any> = { current: 'initial' };
      
      const merged = mergeRefs(callbackRef, objectRef);
      
      merged(null);
      
      expect(callbackRef).toHaveBeenCalledWith(null);
      expect(objectRef.current).toBe(null);
    });
  });
});