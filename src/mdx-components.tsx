import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { Callout } from './components/callout';
import * as TabComponents from './components/tabs';
import Image from 'next/image';

const components = {
  ...defaultMdxComponents,
  ...TabComponents,
  Callout,
  Image,
} satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = typeof components;
}


export function getMDXComponents(
  overrides?: MDXComponents,
): MDXComponents {
  return {
    ...components,
    ...overrides,
  };
}
