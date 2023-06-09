import React, { useMemo, ComponentType } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeReact from 'rehype-react'
import References from './references'
import { markdownState } from 'states/markdown'
import { rendererState as rendererIDState } from 'states/id'
import { P, H1, H2, CodeBlock, InlineCode, A, Blockquote, Table, Ol, Ul } from './elements'

import 'highlight.js/styles/github.css'
import { useRecoilValue } from 'recoil'

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkSlug)
  .use(remarkToc)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeReact, {
    createElement: React.createElement,
    components: {
      a: A as ComponentType<JSX.IntrinsicElements['a']>,
      blockquote: Blockquote as ComponentType<JSX.IntrinsicElements['blockquote']>,
      pre: CodeBlock as ComponentType<JSX.IntrinsicElements['pre']>,
      code: InlineCode as ComponentType<JSX.IntrinsicElements['strong']>,
      h1: H1 as ComponentType<JSX.IntrinsicElements['h1']>,
      h2: H2 as ComponentType<JSX.IntrinsicElements['h2']>,
      p: P as ComponentType<JSX.IntrinsicElements['p']>,
      table: Table as ComponentType<JSX.IntrinsicElements['table']>,
      ol: Ol as ComponentType<JSX.IntrinsicElements['ol']>,
      ul: Ul as ComponentType<JSX.IntrinsicElements['ul']>,
    },
  })

// const theme = {
//   fonts: {
//     body: "Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
//   },
// }

export default function Renderer() {
  const markdown = useRecoilValue(markdownState)
  const id = useRecoilValue(rendererIDState)
  //@ts-ignore
  const children = useMemo(() => (markdown ? processor.processSync(markdown).result.props.children : ''), [markdown])

  return (
    <div id={id} className="max-w-full p-6 shadow-lg bg-white">
      {children}
      <References />
    </div>
  )
}
