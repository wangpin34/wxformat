import { useEffect, useState, useRef, useCallback } from 'react'
import { useRecoilState } from 'recoil'
//@ts-ignore
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import { markdownState } from 'states/markdown'
import { EditorTheme } from 'states/preferences/editor'

interface Props {
  theme: EditorTheme
  fontSize?: number
}

function Editor({ theme, fontSize = 14 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<any>(null)
  const [markdown, setMarkdown] = useRecoilState(markdownState)
  const [initialValue] = useState(markdown)
  const handleChange = useCallback(
    (instance) => {
      setMarkdown(instance.getValue())
    },
    [setMarkdown]
  )

  useEffect(() => {
    if (ref.current) {
      const editor = new CodeMirror(ref.current, {
        mode: {
          name: 'markdown',
          highlightFormatting: true,
        },
        value: initialValue, // not works, why?
        tabSize: 2,
      })
      editor.on('change', handleChange)
      editor.getDoc().setValue(initialValue)
      setEditor(editor)

      return () => {
        editor.off('change', handleChange)
      }
    }
  }, [ref, handleChange, initialValue])

  useEffect(() => {
    if (editor && theme) {
      editor?.setOption('theme', theme)
      require(`codemirror/theme/${theme}.css`)
    }
  }, [editor, theme])

  return (
    <div
      ref={ref}
      className="box-border overflow-y-auto border-2 border-gray-500 hover:border-purple-500"
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
