import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
//@ts-ignore
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/theme/material.css'
import { markdownState, initialMarkdownState } from 'states/markdown'
import './editor.css'

interface Props {
  fontSize?: number
}

function Editor({ fontSize = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const editorRef = useRef<CodeMirror.Editor>()
  const initialMarkdown = useRecoilValue(initialMarkdownState)
  const setMarkdown = useSetRecoilState(markdownState)
  const [initialValue] = useState(initialMarkdown)

  const handleChange = useCallback(
    (instance: CodeMirror.Editor, changeObj: CodeMirror.EditorChange) => {
      const next = instance.getDoc().getValue()
      setMarkdown(next)
    },
    [setMarkdown]
  )

  useEffect(() => {
    editorRef.current ? editorRef.current.getDoc().setValue(initialMarkdown) : null
  }, [initialMarkdown])

  useEffect(() => {
    if (ref.current && !editorRef.current) {
      const editor = CodeMirror(ref.current, {
        mode: {
          name: 'markdown',
          highlightFormatting: true,
        },
        theme: 'material',
        value: initialValue,
        tabSize: 2,
      })
      console.log(`registered change handler on codemirror editor`)
      editor.on('change', handleChange)
      editorRef.current = editor

      return () => {
        editor.off('change', handleChange)
      }
    }
  }, [handleChange, initialValue])

  return (
    <div
      ref={ref}
      className="editor box-border overflow-y-auto border-2 border-gray-500 hover:border-purple-500"
      css={`
        font-size: ${fontSize}px;
        & > .CodeMirror {
          height: 100%;
        }
      `}
    ></div>
  )
}

export default Editor
