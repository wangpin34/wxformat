import React from 'react'
import { useRecoilValue } from 'recoil'
import { referLinksState } from 'states/markdown'
import { css } from 'styled-components'
import { isExternal } from 'utils/link'

function useReferLinkIndex(href: string) {
  const links = useRecoilValue(referLinksState)
  return links.findIndex(link => link.href === href)
}

function ReferLink({ children, href }: { children: any; href: string }) {
  const index = useReferLinkIndex(href)
  return (
    <span
      css={`
        color: #ff3502;
      `}
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

function InlineCode({ children, ...rest }: ComponentProps) {
  return (
    <code
      {...rest}
      css={`
        background-color: #eeeeee;
        padding: 0 4px;
        color: #ff3502;
      `}
    >
      {children}
    </code>
  )
}

function CodeBlock({ children, ...rest }: ComponentProps) {
  const { children: code, className: language } = children[0].props
  return (
    <pre
      data-language={language}
      {...rest}
      css={`
        background-color: rgba(0, 0, 0, 0.03);
        border: 1px solid #f0f0f0;
        color: #333;
        border-radius: 2;
        line-height: 26px;
        font-size: 14px;
        padding: 1em;
        overflow: auto;
      `}
    >
      <code>{code}</code>
    </pre>
  )
}

function H1({ children, ...rest }: ComponentProps) {
  return (
    <h1
      {...rest}
      css={`
        text-align: center;
        line-height: 1;
        font-size: 24px;
        margin: 80px 0 40px 0;
        font-weight: normal;
      `}
    >
      {children}
    </h1>
  )
}

function H2({ children, ...rest }: ComponentProps) {
  return (
    <h2
      {...rest}
      css={`
        text-align: left;

        line-height: 1.5;
        font-size: 18px;
        margin: 40px 0 20px 0;
        font-weight: normal;
      `}
    >
      {children}
    </h2>
  )
}

function A({ children, href, ...rest }: ComponentProps & { href: string }) {
  return isExternal(href) ? (
    <ReferLink href={href}>{children}</ReferLink>
  ) : (
    <a
      href={href}
      title={children}
      rel="noreferrer"
      target="_blank"
      {...rest}
      css={`
        color: #ff3502;
      `}
    >
      {children}
    </a>
  )
}

function Blockquote({ children, ...rest }: ComponentProps) {
  return (
    <blockquote
      {...rest}
      css={`
        text-align: left;
        color: rgb(91, 91, 91);
        margin: 20px 0 20px 0;
        padding: 1px 0 1px 10px;
        background: rgba(158, 158, 158, 0.1);
        border-left: 3px solid rgb(158, 158, 158);
      `}
    >
      {children}
    </blockquote>
  )
}

function P({ children, ...rest }: ComponentProps) {
  return (
    <p
      {...rest}
      css={`
        text-align: left;

        margin: 20px 0 20px 0;
      `}
    >
      {children}
    </p>
  )
}

function isReactElement(something: any) {
  return something.$$typeof === Symbol.for('react.element')
}

function isTableHead(something: any) {
  return isReactElement(something) && something.type === 'thead'
}

function isTableBody(something: any) {
  return isReactElement(something) && something.type === 'tbody'
}

const tableSegs = ['thead', 'tbody', 'tr', 'th', 'td']
type TableSegs = typeof tableSegs

interface StyleTree {
  style?: any
  children?: TableSegMapper
}

type TableSegMapper = {
  [key in TableSegs[number]]: StyleTree
}

const tableStyles: StyleTree = {
  children: {
    thead: {
      style: css`
        text-align: left;
        background-color: rgba(0, 0, 0, 0.05);
      `,
      children: {
        tr: {
          style: {},
          children: {
            th: {
              style: css`
                border: 1px solid #dfdfdf;
                padding: 4px 8px;
              `,
            },
          },
        },
      },
    },
    tbody: {
      style: css`
        text-align: left;
      `,
      children: {
        tr: {
          children: {
            td: {
              style: css`
                border: 1px solid #dfdfdf;
                padding: 4px 8px;
              `,
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
        child_thead => (
          <thead css={getStyle('thead')}>
            <tr>
              {React.Children.map(child_thead.props.children[0].props.children, child => (
                <td css={getStyle('thead.tr.th')}>{child.props.children}</td>
              ))}
            </tr>
          </thead>
        )
      )}
      {React.Children.map(
        children.find((child: any) => isTableBody(child)),
        child_body => (
          <tbody css={getStyle('tbody')}>
            {React.Children.map(child_body.props.children, tr => (
              <tr>
                {React.Children.map(tr.props.children, td => (
                  <td css={getStyle('tbody.tr.td')}>{td.props.children}</td>
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
  return children.filter(child => child.$$typeof === Symbol.for('react.element') && child.type === 'li')
}

const listStyles = css`
  text-align: left;

  margin: 20px 0 20px 0;
  padding-left: 20px;
  list-style: initial;
`

function Ol({ children, ...rest }: ComponentProps) {
  return (
    <ol
      {...rest}
      css={`
        ${listStyles}
        list-style: decimal;
      `}
    >
      {React.Children.map(getItems(children), child => (
        <li
          key={child.props.children}
          {...child.props.children}
          css={`
            text-align: left;
            color: #352a2a;
          `}
        >
          {child.props.children}
        </li>
      ))}
    </ol>
  )
}

function Ul({ children, ...rest }: ComponentProps) {
  return (
    <ul
      {...rest}
      css={`
        ${listStyles}
        list-style: initial;
      `}
    >
      {React.Children.map(getItems(children), child => (
        <li
          key={child.props.children}
          {...child.props.children}
          css={`
            text-align: left;
            color: #352a2a;
          `}
        >
          {child.props.children}
        </li>
      ))}
    </ul>
  )
}

function Img(props: ComponentProps) {
  return <img {...props} />
}

export { A, Blockquote, CodeBlock, H1, H2, InlineCode, Ol, P, ReferLink, Table, Ul, Img }
