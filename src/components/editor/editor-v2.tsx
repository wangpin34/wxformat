import useCodeMirror from './use-codemirror'
import { EditorState } from '@codemirror/state'
import React, { useCallback, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { initialMarkdownState, markdownState } from 'states/markdown'
import './editor.css'

function Editor() {
  const setMarkdown = useSetRecoilState(markdownState)
  const initialMarkdown = useRecoilValue(initialMarkdownState)
  const handleChange = useCallback((state: EditorState) => setMarkdown(state.doc.toString()), [setMarkdown])
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialMarkdown,
    onChange: handleChange,
  })

  useEffect(() => {
    if (editorView) {
      editorView.dispatch({ changes: { from: 0, to: editorView.state.doc.length, insert: initialMarkdown } })
    }
  }, [editorView, initialMarkdown])

  return <div className="editor-wrapper" ref={refContainer}></div>
}

export default Editor
