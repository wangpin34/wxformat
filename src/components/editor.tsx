/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui'
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useRecoilState } from 'recoil'
//@ts-ignore
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/markdown/markdown.js'
import { markdownState } from 'states/markdown'

interface Props {
  theme?: string
}

function Editor({ theme }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<any>(null)
  const [markdown, setMarkdown] = useRecoilState(markdownState)
  const initialValue = useMemo(() => markdown, [])
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
    if (editor) {
      editor?.setOption('theme', theme)
      require(`codemirror/theme/${theme}.css`)
    }
  }, [editor, theme])

  return (
    <ThemeProvider theme={{}}>
      <div
        ref={ref}
        className="h-screen max-h-screen box-border overflow-y-auto border-2 border-gray-500 hover:border-purple-500"
        sx={{
          '& > .CodeMirror': {
            height: '100%',
          },
        }}
      ></div>
    </ThemeProvider>
  )
}

export default Editor
