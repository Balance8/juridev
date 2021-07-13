// libs/shared/mdx-elements/src/lib/mdx-elements.ts
import dynamic from 'next/dynamic';

import { CustomLink } from './custom-link/custom-link';

export const mdxElements = {
  a: CustomLink,
  Youtube: dynamic(() => import('./youtube/youtube')),
};
