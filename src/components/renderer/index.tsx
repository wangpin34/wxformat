import { MouseEventHandler, useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { rendererState as rendererIDState } from 'states/id'
import { useAddNotification } from 'states/notification'
import copyToClipboard from 'utils/copy-to-clipboard'
import Renderer from './renderer'

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

export default function RendererWrapper() {
  const addNotification = useAddNotification()
  const id = useRecoilValue(rendererIDState)
  const handleCopy = useCallback<MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>>(() => {
    if (document.querySelector(`#${id}`)) {
      copyToClipboard(document.querySelector(`#${id}`) as HTMLElement, true)
      addNotification({ type: 'success', text: '复制成功, 请在公众号编辑器中粘贴查看' })
    }
  }, [id])

  return (
    // <div className="flex flex-col items-center overflow-y-auto">
    <>
      <Renderer />
      <button className="btn btn-primary fixed right-1 bottom-1" onClick={handleCopy}>
        复制文本
      </button>
    </>
  )
}
