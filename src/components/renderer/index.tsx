import { useMemo, useState, useCallback, MouseEventHandler, useRef, useEffect } from 'react'
import { render } from 'react-dom'
import Renderer from './renderer'
import { useRecoilValue, RecoilRoot } from 'recoil'
import { markdownState } from 'states/markdown'
import copyToClipboard from 'utils/copy-to-clipboard'
import { ActionBar } from '../action'
import { Copy, DownloadCloud, Settings, IconButton } from '../icons'
import Popup, { ControlledPopup } from 'components/popup/popup'
import SettingsPanel from 'components/settings'
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

  const [settingsOpened, setSettingsOpened] = useState<boolean>(false)
  const handleClose = useCallback(() => setSettingsOpened(false), [])
  const handleOpen = useCallback(() => setSettingsOpened(true), [])
  const SettingsPanelPopup = useMemo(
    () => <ControlledPopup opened={settingsOpened} handleClose={handleClose} render={(props) => <SettingsPanel />} />,
    [settingsOpened, handleClose]
  )

  return (
    <div className="h-screen max-h-screen overflow-y-auto">
      <ActionBar>
        <IconButton onClick={handleCopy} icon={<Copy />} />
        <IconButton onClick={handleOpen} icon={<Settings />} />
        {SettingsPanelPopup}
      </ActionBar>
      <Renderer />
    </div>
  )
}
