import React from 'react'
import { useRecoilValue } from 'recoil'
import { referLinksState } from 'states/markdown'
import { H2 } from './elements'

export default function References() {
  const referLinks = useRecoilValue(referLinksState)

  if (referLinks.length < 1) {
    return null
  }
  return (
    <>
      <H2>References</H2>
      <p
        style={{
          textAlign: 'left',
          color: '#3f3f3f',
          lineHeight: 1.5,
          fontSize: '14px',
          margin: '20px 0 20px 0',
        }}
      >
        {referLinks.map(({ text, href }, index) => (
          <React.Fragment key={href}>
            <code
              css={`
                font-size: 90%;
                opacity: 0.6;
              `}
            >
              [{index + 1}]
            </code>
            &nbsp;{text}&nbsp;:&nbsp;
            <a
              href={href}
              target="__blank"
              rel="noopener noreferrer"
              css={`
                word-break: break-all;
              `}
            >
              {href}
            </a>
            <br />
          </React.Fragment>
        ))}
      </p>
    </>
  )
}
