import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import fs from 'fs';
import styles from './articles.module.css';

import {
  getParsedFileContentBySlug,
  renderMarkdown,
  MarkdownRenderingResult,
} from '@juridev/markdown';

interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_articles');

export function Article({ frontMatter, html }) {
  return (
    <div className="container flex flex-col justify-center mx-auto prose sm:prose-sm lg:prose-lg xl:prose-xl prose-indigo">
      {/* <div className=""> */}
      <article>
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
        <hr />

        <main className="" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}

export const getStaticProps: GetStaticProps<MarkdownRenderingResult> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  // read markdown file into content and frontmatter
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  // generate HTML
  const renderedHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderedHTML,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = fs
    .readdirSync(POSTS_PATH)
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.md?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Article;
