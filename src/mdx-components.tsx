import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

const components = defaultMdxComponents satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}

export function getMDXComponents(
  overrides?: MDXComponents,
): MDXComponents {
  return {
    ...useMDXComponents(),
    ...overrides,
  };
}
