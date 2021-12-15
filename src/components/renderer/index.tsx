import { useMemo, useCallback, MouseEventHandler, useRef, useEffect } from 'react'
import { render } from 'react-dom'
import Renderer from './renderer'
import { useRecoilValue, RecoilRoot } from 'recoil'
import { markdownState } from 'states/markdown'
import copyToClipboard from 'utils/copy-to-clipboard'
import { ActionBar } from '../action'
import { Copy, DownloadCloud, Settings, IconButton } from '../icons'
import { rendererState as rendererIDState } from 'states/id'

interface ShadowProps {
  children: any
  [p: string]: any
}
function Shadow(props: ShadowProps) {
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      const shadow = node.attachShadow({ mode: 'open' })
      const style = document.createElement('style')
      const styleContent = `
      :host {
        all: initial;
      }
      `
      style.type = 'text/css'
      style.appendChild(document.createTextNode(styleContent))
      render(props.children, shadow)
      shadow.appendChild(style)
    }
  }, [])
  return <div ref={ref} />
}

export default function ConfiguredRenderer() {
  const ref = useRef<HTMLDivElement>(null)
  const id = useRecoilValue(rendererIDState)
  const handleCopy = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      if (document.querySelector(`#${id}`)) {
        copyToClipboard(document.querySelector(`#${id}`) as HTMLElement)
      }
    },
    [id]
  )

  return (
    <div className="h-screen max-h-screen overflow-y-auto">
      <ActionBar>
        <IconButton onClick={handleCopy} icon={<Copy />} />
        <IconButton onClick={handleCopy} icon={<DownloadCloud />} />
        <IconButton onClick={handleCopy} icon={<Settings />} />
      </ActionBar>
      <Renderer />
    </div>
  )
}
