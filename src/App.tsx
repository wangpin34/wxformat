import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import Root from 'components/root'

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

        let last = null
        let lastMinOffset = null
        for (const child of children) {
          const start = child.getAttribute('data-startline')
          const end = child.getAttribute('data-endline')

          let startNum = null
          let endNum = null
          let minOffset = null
          if (start) {
            startNum = parseInt(start)
            minOffset = Math.abs(startNum - lineNumber)
          }
          if (end) {
            endNum = parseInt(end)
            if (minOffset !== null) {
              minOffset = Math.min(Math.abs(endNum - lineNumber), minOffset)
            } else {
              minOffset = Math.abs(endNum - lineNumber)
            }
          }

          console.log(child, `start:${start}, end:${end}`)

          if (last !== null && lastMinOffset !== null && minOffset !== null && minOffset >= lastMinOffset) {
            // scroll to the last element
            console.log(`scroll to`, last)
            let percent = 0
            const start = last.getAttribute('data-startline')
            const end = last.getAttribute('data-endline')
            const startNum = parseInt(start!)
            const endNum = parseInt(end!)
            if (startNum !== endNum) {
              percent = (lineNumber - startNum) / (endNum - startNum)
            }
            const styles = getComputedStyle(last)
            const height = parseFloat(styles.height)
            //@ts-ignore
            desiredScrollTop = last.offsetTop + percent * height
            break
          } else {
            if (startNum !== null && endNum !== null && startNum <= lineNumber && endNum >= lineNumber) {
              console.log(`scroll to`, child)
              //scroll to the current element
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

          last = child
          lastMinOffset = minOffset
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
      <Root />
    </RecoilRoot>
  )
}

export default App
