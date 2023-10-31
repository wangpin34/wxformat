import 'highlight.js/styles/github.css'
import React, { ComponentType, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import rehypeHighlight from 'rehype-highlight'
import rehypeParse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkSlug from 'remark-slug'
import { rendererState as rendererIDState } from 'states/id'
import { markdownState } from 'states/markdown'
import { unified } from 'unified'
import { handlers } from 'utils/rehype-handlers/handlers'
import { A, Blockquote, CodeBlock, H1, H2, Img, InlineCode, Ol, P, Table, Ul } from './elements'
import './index.css'
import References from './references'
import { previewerPreferencesState } from 'states/preferences'
import { CSSProperties } from 'styled-components'

const processor1 = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkSlug)
  .use(remarkRehype, {
    //@ts-ignore
    handlers,
    allowDangerousHtml: true,
  })
  .use(rehypeStringify, { allowDangerousHtml: true })

const processor2 = unified()
  //@ts-ignore
  .use(rehypeParse, { fragment: true })
  .use(rehypeHighlight, {
    ignoreMissing: true,
    aliases: {
      typescript: ['ts'],
      javascript: ['js'],
      markdown: ['md'],
    },
  })
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
      img: Img as ComponentType<JSX.IntrinsicElements['img']>,
    },
  })

export default function Renderer() {
  const preferences = useRecoilValue(previewerPreferencesState)
  const markdown = useRecoilValue(markdownState)
  const id = useRecoilValue(rendererIDState)
  //@ts-ignore
  const children = useMemo(() => {
    if (!markdown) {
      return <></>
    }
    const html = processor1.processSync(markdown).toString()
    //@ts-ignore
    const node = processor2.processSync(html).result.props.children
    return node
  }, [markdown])

  const style = useMemo(
    () => ({
      '--font-size': `${preferences.fontSize}px`,
      '--color': preferences.color,
    }),
    [preferences]
  )

  return (
    <div id={id} className="max-w-full p-6  preview" style={style as CSSProperties}>
      {children}
      <References />
    </div>
  )
}
