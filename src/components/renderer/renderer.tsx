/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react'
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
    components: { a: A, blockquote: Blockquote, pre: CodeBlock, code: InlineCode, h1: H1, h2: H2, p: P, table: Table, ol: Ol, ul: Ul },
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
    <div
      id={id}
      //contentEditable
      className="box-border"
      style={{
        backgroundColor: '#fff',
        padding: '40px',
        width: 375,
      }}
    >
      {children}
      <References />
    </div>
  )
}
