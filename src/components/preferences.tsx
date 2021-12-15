import React, { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editorThemeState, availableThemesState, EditorTheme, editorFontSizeState } from 'states/preferences/editor'

function Editor() {
  const availableThemes = useRecoilValue(availableThemesState)
  const [theme, setTheme] = useRecoilState(editorThemeState)
  const handleThemeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTheme(e.target.value as EditorTheme)
    },
    [setTheme]
  )

  const [fontSize, setFontSize] = useRecoilState(editorFontSizeState)

  return (
    <p>
      <select value={theme} onChange={handleThemeChange}>
        {availableThemes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      <label>Font Size</label>
      <input type="number" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value, 10))} />
    </p>
  )
}

function Proferences() {
  return (
    <section>
      <Editor />
    </section>
  )
}

export default Proferences
