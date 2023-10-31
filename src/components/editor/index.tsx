import { EditorState } from '@codemirror/state'
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { markdownState } from 'states/markdown'
import './editor.css'
import useCodeMirror from './use-codemirror'

function Editor() {
  const [markdown, setMarkdown] = useRecoilState(markdownState)
  const handleChange = useCallback((state: EditorState) => setMarkdown(state.doc.toString()), [setMarkdown])
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: markdown,
    onChange: handleChange,
  })

  useEffect(() => {
    if (editorView) {
      editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: markdown } })
    }
  }, [editorView, markdown])

  return <div className="editor-wrapper h-full" ref={refContainer}></div>
}

export default Editor
