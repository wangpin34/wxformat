import React, { useCallback, useState, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { editorThemeState, availableThemesState, EditorTheme, editorFontSizeState } from 'states/preferences/editor'
import { ActionBar } from './action'
import { Settings, IconButton } from './icons'
import { ControlledPopup } from 'components/popup/popup'
import SettingsPanel from 'components/settings'

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
    <>
      <select value={theme} onChange={handleThemeChange}>
        {availableThemes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      <label>Font Size</label>
      <input type="number" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value, 10))} />
    </>
  )
}

function Proferences() {
  const [settingsOpened, setSettingsOpened] = useState<boolean>(false)
  const handleClose = useCallback(() => setSettingsOpened(false), [])
  const handleOpen = useCallback(() => setSettingsOpened(true), [])
  const SettingsPanelPopup = useMemo(
    () => <ControlledPopup opened={settingsOpened} handleClose={handleClose} render={() => <SettingsPanel />} />,
    [settingsOpened, handleClose]
  )
  return (
    <ActionBar>
      <Editor />

      <IconButton onClick={handleOpen} icon={<Settings />} className="hidden" />
      {SettingsPanelPopup}
    </ActionBar>
  )
}

export default Proferences
