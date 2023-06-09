import React from 'react'
import { useRecoilValue } from 'recoil'
import { editorFontSizeState } from 'states/preferences/editor'
import Editor from './editor'

export default function ConfiguredEditor() {
  const fontSize = useRecoilValue(editorFontSizeState)

  return <Editor fontSize={fontSize} />
}
