import React from 'react'
import { useRecoilValue } from 'recoil'
import { editorThemeState, editorFontSizeState } from 'states/preferences/editor'
import Editor from './editor'

export default function ConfiguredEditor() {
  const theme = useRecoilValue(editorThemeState)
  const fontSize = useRecoilValue(editorFontSizeState)

  return <Editor theme={theme} fontSize={fontSize} />
}
