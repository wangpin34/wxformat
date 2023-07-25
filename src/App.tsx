import { useEffect } from 'react'
import Editor from 'components/editor'
import Renderer from 'components/renderer'
import TitleBar from 'components/title-bar'
import { RecoilRoot } from 'recoil'
import NotificationMgmt from 'components/notification'

function App() {
  useEffect(() => {
    let isScrollEditor = false
    let isScrollPreviewer = false

    const editorContainer = document.querySelector('#editor-container')
    const previewContainer = document.querySelector('#preview-container')

    const scrollPreviewerByLine = (lineNumber: number, totalLines: number) => {
      console.debug(`scroll preview to line[${lineNumber}], totalLines: ${totalLines}`)
      if (previewContainer) {
        if (lineNumber === 1) {
          previewContainer.scrollTop = 0
          return
        }
        if (lineNumber >= totalLines) {
          previewContainer.scrollTop = previewContainer.scrollHeight
          return
        }

        let desiredScrollTop = -1
        const children = previewContainer.querySelectorAll('.preview > [data-startline]')
        for (const child of children) {
          const start = child.getAttribute('data-startline')
          const end = child.getAttribute('data-endline')

          if (start && end) {
            const startNum = parseInt(start)
            const endNum = parseInt(end)

            if (startNum <= lineNumber && endNum >= lineNumber) {
              let percent = 0
              if (startNum !== endNum) {
                percent = (lineNumber - startNum) / (endNum - startNum)
              }
              const styles = getComputedStyle(child)
              const height = parseFloat(styles.height)
              //@ts-ignore
              desiredScrollTop = child.offsetTop + percent * height
              break
            }
          }
        }
        if (desiredScrollTop < 0) {
          return
        }
        previewContainer.scrollTop = desiredScrollTop
      }
    }

    const editorScrollListener = (e: Event) => {
      if (isScrollPreviewer) {
        isScrollPreviewer = false
        return
      }
      isScrollEditor = true
      const node = e.target as HTMLDivElement
      const { top: pTop, bottom: pBottom } = node.getBoundingClientRect()
      const lines = node.querySelectorAll('.cm-line')
      const last = lines[lines.length - 1]
      const { top, bottom } = last.getBoundingClientRect()
      if (top >= pTop && bottom <= pBottom) {
        scrollPreviewerByLine(lines.length, lines.length)
        return
      }
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const { top, bottom } = line.getBoundingClientRect()

        if (top >= pTop && bottom <= pBottom) {
          scrollPreviewerByLine(i + 1, lines.length)
          break
        }
      }
    }

    const previewScrollListener = (e: Event) => {
      if (isScrollEditor) {
        isScrollEditor = false
        return
      }
      isScrollPreviewer = true

      const node = e.target as HTMLDivElement
      const scrollTop = node.scrollTop
      if (scrollTop === 0) {
        return
      }
      if (scrollTop + node.clientHeight >= node.scrollHeight) {
        return
      }
      const children = node.querySelectorAll('.preview > [data-startline]')
      for (const child of children) {
        //@ts-ignore
        if (scrollTop >= child.offsetTop && scrollTop <= child.offsetTop + child.clientHeight) {
          //@ts-ignore
          const percent = (scrollTop - child.offsetTop) / child.clientHeight
          const startLine = parseInt(child.getAttribute('data-startline') as string)
          const endLine = parseInt(child.getAttribute('data-endline') as string)
          let targetLine = startLine
          if (startLine !== endLine) {
            targetLine = startLine + Math.ceil((endLine - startLine) * percent)
          }

          if (editorContainer && targetLine > 0) {
            const lines = Array.from(editorContainer.querySelectorAll('.cm-line'))
            const line = lines[targetLine - 1]

            //@ts-ignore
            editorContainer.scrollTop = line.offsetTop
          }

          break
        }
      }
    }

    if (editorContainer && previewContainer) {
      editorContainer!.addEventListener('scroll', editorScrollListener, false)
      previewContainer!.addEventListener('scroll', previewScrollListener, false)
      return () => {
        editorContainer!.removeEventListener('scroll', editorScrollListener)
        previewContainer!.removeEventListener('scroll', previewScrollListener)
      }
    }
  }, [])

  return (
    //@ts-ignore
    <RecoilRoot>
      <div className="h-screen max-h-screen">
        <TitleBar />
        <div className="h-screen max-h-screen pt-[68px] xl:container mx-auto  grid grid-cols-2 gap-8">
          <div className="max-h-full overflow-auto" id="editor-container">
            <Editor />
          </div>
          <div className="max-h-full overflow-auto" id="preview-container">
            <Renderer />
          </div>
        </div>
        <NotificationMgmt />
      </div>
    </RecoilRoot>
  )
}

export default App
