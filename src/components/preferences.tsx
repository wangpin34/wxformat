import { ControlledPopup } from 'components/popup/popup'
import SettingsPanel from 'components/settings'
import React, { useCallback, useMemo, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { EditorTheme, availableThemesState, editorFontSizeState, editorThemeState } from 'states/preferences/editor'
import { ActionBar } from './action'
import { IconButton, Settings } from './icons'

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
        {availableThemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
      <label>Font Size</label>
      <input type="number" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value, 10))} />
      <div className="dropdown m-10">
        <label tabindex="0" className="btn m-1">
          Click
        </label>
        <div tabindex="0" className="dropdown-content p-4 shadow bg-base-100 rounded-box">
          <input type="text" placeholder="Search…" className="input input-sm input-bordered" />

          <div className="h-4"></div>

          <label className="label cursor-pointer">
            <span className="label-text">Bread</span>
            <input type="checkbox" checked className="checkbox" />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">Milk</span>
            <input type="checkbox" checked className="checkbox" />
          </label>

          <label className="label cursor-pointer">
            <span className="label-text">Apples</span>
            <input type="checkbox" checked className="checkbox" />
          </label>

          <div className="h-4"></div>

          <button className="btn btn-block btn-sm">Delete selected</button>
        </div>
      </div>
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
