/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui'
import React, { useMemo, useCallback, useRef, MouseEventHandler } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkSlug from 'remark-slug'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeReact from 'rehype-react'
import { useRecoilValue } from 'recoil'
import useReferLinkIndex from 'hooks/useReferLinkIndex'
import 'highlight.js/styles/github.css'
import { referLinksState } from 'states/markdown'
import { isExternal } from 'utils/link'
import copyToClipboard from 'utils/copy-to-clipboard'
import { ActionBar } from './action'
import { Copy, DownloadCloud, Settings, IconButton } from './icons'

interface ComponentProps {
  children: any
  props?: any
}

function InlineCode({ children }: ComponentProps) {
  return (
    <strong
      sx={{
        textAlign: 'left',
        color: '#ff3502',
        lineHeight: '1.5',
        fontSize: '16px',
      }}
    >
      {children}
    </strong>
  )
}

function CodeBlock({ children }: ComponentProps) {
  const { children: code, className: language } = children[0].props
  return (
    <pre
      data-language={language}
      sx={{
        margin: '10px',
        backgroundColor: 'rgba(0,0,0,0.03)',
        border: '1px solid #f0f0f0',
        color: '#333',
        borderRadius: 2,
        lineHeight: '26px',
        fontSize: '14px',
        padding: '1em',
      }}
    >
      <code>{code}</code>
    </pre>
  )
}

function H1({ children }: ComponentProps) {
  return (
    <h1
      sx={{
        textAlign: 'center',
        color: '#3f3f3f',
        lineHeight: 1,
        fontSize: '140% !important',
        margin: '80px 10px 40px 10px',
        fontWeight: 'normal',
      }}
    >
      {children}
    </h1>
  )
}

function H2({ children }: ComponentProps) {
  return (
    <h2
      sx={{
        textAlign: 'left',
        color: '#3f3f3f',
        lineHeight: 1.5,
        fontSize: '120%',
        margin: '40px 10px 20px 10px',
        fontWeight: 'bold',
      }}
    >
      {children}
    </h2>
  )
}

function ReferLink({ children, href }: ComponentProps & { href: string }) {
  const index = useReferLinkIndex(href)
  return (
    <span
      sx={{
        textAlign: 'left',
        color: '#ff3502',
        lineHeight: 1.5,
        fontSize: '16px',
      }}
    >
      {children}
      <sup>[{index + 1}]</sup>
    </span>
  )
}

function A({ children, href }: ComponentProps & { href: string }) {
  return isExternal(href) ? (
    <ReferLink href={href}>{children}</ReferLink>
  ) : (
    <a
      href={href}
      title={children}
      sx={{
        textAlign: 'left',
        color: '#ff3502',
        lineHeight: 1.5,
        fontSize: '16px',
      }}
    >
      {children}
    </a>
  )
}

function Blockquote({ children }: ComponentProps) {
  return (
    <blockquote
      sx={{
        textAlign: 'left',
        color: 'rgb(91, 91, 91)',
        lineHeight: 1.5,
        fontSize: '16px',
        margin: '20px 10px',
        padding: '1px 0 1px 10px',
        background: 'rgba(158, 158, 158, 0.1)',
        borderLeft: '3px solid rgb(158,158,158)',
      }}
    >
      <p>{children}</p>
    </blockquote>
  )
}

function P({ children }: ComponentProps) {
  return <p sx={{ textAlign: 'left', color: '#3f3f3f', lineHeight: 1.6, fontSize: '16px', margin: '10px 10px' }}>{children}</p>
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkSlug)
  .use(remarkToc)
  .use(remarkRehype)
  .use(rehypeHighlight)
  .use(rehypeReact, {
    createElement: React.createElement,
    components: { a: A, blockquote: Blockquote, pre: CodeBlock, code: InlineCode, h1: H1, h2: H2, p: P },
  })

interface Props {
  markdown?: string
}

const theme = {
  fonts: {
    body: "Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, 'PingFang SC', Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
  },
}

function References() {
  const referLinks = useRecoilValue(referLinksState)

  return (
    <>
      <H2>References</H2>
      <p
        sx={{
          textAlign: 'left',
          color: '#3f3f3f',
          lineHeight: 1.5,
          fontSize: '14px',
          margin: '10px 10px',
        }}
      >
        {referLinks.map(({ text, href }, index) => (
          <>
            <code sx={{ fontSize: '90%', opacity: 0.6 }}>[{index + 1}]</code>
            &nbsp;{text}&nbsp;:
            <br />
            <i sx={{}}>{href}</i>
            <br />
          </>
        ))}
      </p>
    </>
  )
}

function Renderer({ markdown }: Props) {
  //@ts-ignore
  const children = useMemo(() => (markdown ? processor.processSync(markdown).result.props.children : ''), [markdown])
  const ref = useRef<HTMLDivElement>(null)
  const handleCopy = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
    if (ref.current) {
      copyToClipboard(ref.current!)
    }
  }, [])
  const handleDownload = () => {}
  const handleSettings = () => {}
  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen max-h-screen overflow-y-auto">
        <ActionBar>
          <IconButton onClick={handleCopy} icon={<Copy />} />
          <IconButton onClick={handleCopy} icon={<DownloadCloud />} />
          <IconButton onClick={handleCopy} icon={<Settings />} />
        </ActionBar>
        <div
          id="renderer"
          ref={ref}
          //contentEditable
          className="box-border"
          sx={{
            backgroundColor: '#fff',
            width: 375,
            padding: 20,

            table: {
              textAlign: 'left',
              color: '#3f3f3f',
              lineHeight: 1.5,
              fontSize: '16px',
              borderCollapse: 'collapse',
              margin: '20px 10px',
              thead: {
                textAlign: 'left',
                color: '#3f3f3f',
                lineHeight: 1.5,
                fontSize: '16px',
                background: 'rgba(0,0,0,0.05)',
                tr: {
                  th: {
                    textAlign: 'left',
                    color: '#3f3f3f',
                    lineHeight: 1.5,

                    fontSize: '80%',
                    border: '1px solid #dfdfdf',
                    padding: '4px 8px',
                  },
                },
              },
              tbody: {
                tr: {
                  td: {
                    color: '#3f3f3f',
                    lineHeight: 1.5,
                    fontSize: '80%',
                    border: '1px solid #dfdfdf',
                    padding: '4px 8px',
                  },
                },
              },
            },

            'ol, ul': {
              textAlign: 'left',
              color: '#3f3f3f',
              lineHeight: 1.5,
              fontSize: '16px',
              margin: '20px 10px',
              marginLeft: '0',
              paddingLeft: '20px',
              listStyle: 'circle',
              li: {
                textAlign: 'left',
                color: '#3f3f3f',
                lineHeight: 1.5,
                fontSize: '16px',
                //textIndent: '-20px',
                display: 'block',
                margin: '10px 10px',
              },
            },

            ol: {
              li: {
                listStyle: 'decimal',
              },
            },
            ul: {
              li: {
                listStyle: 'inside',
              },
            },
          }}
        >
          {children}
          <References />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Renderer
