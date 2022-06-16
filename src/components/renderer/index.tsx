import { useCallback, MouseEventHandler } from 'react'
import Renderer from './renderer'
import { useRecoilValue } from 'recoil'
import copyToClipboard from 'utils/copy-to-clipboard'
// import { ActionBar } from '../action'
// import { Copy, Settings, IconButton } from '../icons'
// import { ControlledPopup } from 'components/popup/popup'
// import SettingsPanel from 'components/settings'
import { rendererState as rendererIDState } from 'states/id'

// interface ShadowProps {
//   children: any
//   [p: string]: any
// }
// function Shadow(props: ShadowProps) {
//   const ref = useCallback((node: HTMLDivElement | null) => {
//     if (node !== null) {
//       const shadow = node.attachShadow({ mode: 'open' })
//       const style = document.createElement('style')
//       const styleContent = `
//       :host {
//         all: initial;
//       }
//       `
//       style.type = 'text/css'
//       style.appendChild(document.createTextNode(styleContent))
//       render(props.children, shadow)
//       shadow.appendChild(style)
//     }
//   }, [])
//   return <div ref={ref} />
// }

export default function ConfiguredRenderer() {
  const id = useRecoilValue(rendererIDState)
  const handleCopy = useCallback<MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>>(
    (e) => {
      if (document.querySelector(`#${id}`)) {
        copyToClipboard(document.querySelector(`#${id}`) as HTMLElement, true)
      }
    },
    [id]
  )

  // const [settingsOpened, setSettingsOpened] = useState<boolean>(false)
  // const handleClose = useCallback(() => setSettingsOpened(false), [])
  // const handleOpen = useCallback(() => setSettingsOpened(true), [])
  // const SettingsPanelPopup = useMemo(
  //   () => <ControlledPopup opened={settingsOpened} handleClose={handleClose} render={() => <SettingsPanel />} />,
  //   [settingsOpened, handleClose]
  // )

  return (
    <div className="flex flex-col items-center overflow-y-auto">
      {/* <ActionBar>
        <IconButton onClick={handleCopy} icon={<Copy />} />
        <IconButton onClick={handleOpen} icon={<Settings />} />
        {SettingsPanelPopup}
      </ActionBar> */}
      <p>
        <button
          type="button"
          onClick={handleCopy}
          className="bg-sky-600 text-blue-600 hover:text-blue-800 underline underline-offset-8 decoration-blue-50"
        >
          点这里复制
        </button>
        文本，然后粘贴到您的博客或者其他网站。
      </p>
      <Renderer />
    </div>
  )
}
