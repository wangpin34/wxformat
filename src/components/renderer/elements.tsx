import React from 'react'
import { isExternal } from 'utils/link'
import { useRecoilValue } from 'recoil'
import { referLinksState } from 'states/markdown'

function useReferLinkIndex(href: string) {
  const links = useRecoilValue(referLinksState)
  return links.findIndex((link) => link.href === href)
}

function ReferLink({ children, href }: { children: any; href: string }) {
  const index = useReferLinkIndex(href)
  return (
    <span
      style={{
        textAlign: 'left',
        color: '#ff3502',
        lineHeight: 1.5,
        fontSize: '16px',
      }}
    >
      {children}
      <sup>[{index > -1 ? index + 1 : '!'}]</sup>
    </span>
  )
}

interface ComponentProps {
  children: any
  props?: any
}

function InlineCode({ children }: ComponentProps) {
  return (
    <strong
      style={{
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
      style={{
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
      style={{
        textAlign: 'center',
        color: '#3f3f3f',
        lineHeight: 1,
        fontSize: '24px',
        margin: '80px 0 40px 0',
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
      style={{
        textAlign: 'left',
        color: '#3f3f3f',
        lineHeight: 1.5,
        fontSize: '18px',
        margin: '40px 0 20px 0',
        fontWeight: 'bold',
      }}
    >
      {children}
    </h2>
  )
}

function A({ children, href }: ComponentProps & { href: string }) {
  return isExternal(href) ? (
    <ReferLink href={href}>{children}</ReferLink>
  ) : (
    <a
      href={href}
      title={children}
      style={{
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
      style={{
        textAlign: 'left',
        color: 'rgb(91, 91, 91)',
        lineHeight: 1.5,
        fontSize: '16px',
        margin: '20px 0 20px 0',
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
  return <p style={{ textAlign: 'left', color: '#3f3f3f', lineHeight: 1.6, fontSize: '16px', margin: '20px 0 20px 0' }}>{children}</p>
}

function isReactElement(something: any) {
  return something.$$typeof === Symbol.for('react.element')
}

function isTableHead(something: any) {
  return isReactElement(something) && something.type === 'thead'
}
function isTh(something: any) {
  return isReactElement(something) && something.type === 'th'
}

function isTableBody(something: any) {
  return isReactElement(something) && something.type === 'tbody'
}

function isTr(something: any) {
  return isReactElement(something) && something.type === 'tr'
}
function isTd(something: any) {
  return isReactElement(something) && something.type === 'td'
}

const tableSegs = ['thead', 'tbody', 'tr', 'th', 'td']
type TableSegs = typeof tableSegs

interface StyleTree {
  style?: React.CSSProperties
  children?: TableSegMapper
}

type TableSegMapper = {
  [key in TableSegs[number]]: StyleTree
}

const tableStyles: StyleTree = {
  children: {
    thead: {
      style: { textAlign: 'left', color: '#3f3f3f', lineHeight: 1.5, fontSize: '16px', background: 'rgba(0,0,0,0.05)' },
      children: {
        tr: {
          style: {},
          children: {
            th: {
              style: {
                textAlign: 'left',
                color: '#3f3f3f',
                lineHeight: 1.5,
                fontSize: '80%',
                border: '1px solid #dfdfdf',
                padding: '4px 8px',
              },
            },
          },
        },
      },
    },
    tbody: {
      style: {
        textAlign: 'left',
        color: '#3f3f3f',
        lineHeight: 1.5,
        fontSize: '16px',
      },
      children: {
        tr: {
          children: {
            td: {
              style: {
                color: '#3f3f3f',
                lineHeight: 1.5,
                fontSize: '80%',
                border: '1px solid #dfdfdf',
                padding: '4px 8px',
              },
            },
          },
        },
      },
    },
  },
}

function getStyle(path: string) {
  const segments = path.split('.')
  let index = 0
  let current: StyleTree | undefined = tableStyles
  while (segments[index] && current) {
    current = current.children && current.children[segments[index]]
    index++
  }
  return current?.style
}

function Table({ children }: ComponentProps & { children: any[] }) {
  return (
    <table>
      {React.Children.map(
        children.find((child: any) => isTableHead(child)),
        (child_thead) => (
          <thead style={getStyle('thead')}>
            <tr>
              {React.Children.map(child_thead.props.children[0].props.children, (child) => (
                <td style={getStyle('thead.tr.th')}>{child.props.children}</td>
              ))}
            </tr>
          </thead>
        )
      )}
      {React.Children.map(
        children.find((child: any) => isTableBody(child)),
        (child_body) => (
          <tbody style={getStyle('tbody')}>
            {React.Children.map(child_body.props.children, (tr) => (
              <tr>
                {React.Children.map(tr.props.children, (td) => (
                  <td style={getStyle('tbody.tr.td')}>{td.props.children}</td>
                ))}
              </tr>
            ))}
          </tbody>
        )
      )}
    </table>
  )
}

function getItems(children: any[]) {
  return children.filter((child) => child.$$typeof === Symbol.for('react.element') && child.type === 'li')
}

function Ol({ children }: ComponentProps) {
  return (
    <ol
      style={{
        textAlign: 'left',
        color: '#3f3f3f',
        lineHeight: 1.5,
        fontSize: '16px',
        margin: '20px 0 20px 0',
        paddingLeft: 20,
        listStyle: 'decimal',
      }}
    >
      {React.Children.map(getItems(children), (child) => (
        <li
          key={child.props.children}
          {...child.props.children}
          style={{
            textAlign: 'left',
            color: '#352a2a',
            lineHeight: 1.5,
            fontSize: '16px',
          }}
        >
          {child.props.children}
        </li>
      ))}
    </ol>
  )
}

function Ul({ children }: ComponentProps) {
  return (
    <ul
      style={{
        textAlign: 'left',
        color: '#3f3f3f',
        lineHeight: 1.5,
        fontSize: '16px',
        margin: '20px 0 20px 0',
        paddingLeft: 20,
        listStyle: 'initial',
      }}
    >
      {React.Children.map(getItems(children), (child) => (
        <li
          key={child.props.children}
          {...child.props.children}
          style={{
            textAlign: 'left',
            color: '#352a2a',
            lineHeight: 1.5,
            fontSize: '16px',
          }}
        >
          {child.props.children}
        </li>
      ))}
    </ul>
  )
}

export { P, H1, H2, CodeBlock, InlineCode, A, Blockquote, ReferLink, Table, Ol, Ul }
