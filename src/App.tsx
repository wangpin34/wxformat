/** @jsxImportSource theme-ui */
import { ThemeProvider } from 'theme-ui'
import React, { useEffect, useState, useRef, useCallback, ChangeEvent, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
//@ts-ignore
import Renderer from 'components/renderer'
import editorThemes from 'constants/editorThemes'
import { markdownState } from 'states/markdown'
import Editor from 'components/editor'

const preferences = {
  theme: 'idea',
}

function App() {
  const [theme, setTheme] = useState<string>(preferences.theme || editorThemes[0])
  const onThemeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
  }, [])
  const markdown = useRecoilValue(markdownState)
  const MomizedRenderer = useMemo(() => <Renderer markdown={markdown} />, [markdown])

  return (
    <div>
      <div id="preferences">
        <select value={theme} onChange={onThemeChange}>
          {editorThemes.map((theme) => (
            <option value={theme} key={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>

      <div className="xl:container mx-auto p-2 grid grid-cols-2 gap-8">
        <Editor theme={theme} />
        {MomizedRenderer}
      </div>
    </div>
  )
}

export default App
