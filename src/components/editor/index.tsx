import { EditorState } from '@codemirror/state'
import { useCallback, useEffect } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { markdownState } from 'states/markdown'
import { write } from 'utils/markdown-storage'
import './editor.css'
import useCodeMirror from './use-codemirror'

function Editor() {
  const [markdown, setMarkdown] = useRecoilState(markdownState)
  const handleChange = useCallback((state: EditorState) => setMarkdown(state.doc.toString()), [setMarkdown])
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: markdown,
    onChange: handleChange,
  })

  const saveDocToStorageCallback = useRecoilCallback(
    ({ snapshot }) => async () => {
      const markdown = snapshot.getLoadable(markdownState).getValue()
      write(markdown)
    },
    []
  )

  useEffect(() => {
    window.addEventListener('unload', saveDocToStorageCallback)
  }, [saveDocToStorageCallback])

  useEffect(() => {
    if (editorView) {
      editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: markdown } })
    }
  }, [editorView, markdown])

  return <div className="editor-wrapper h-full" ref={refContainer}></div>
}

export default Editor
