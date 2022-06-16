import { atom } from 'recoil'
import editorThemes, { defaultTheme } from 'constants/editorThemes'

type Themes = typeof editorThemes
type Mapper = {
  [key in Themes[number]]: string
}
export type EditorTheme = keyof Mapper

export const availableThemesState = atom<typeof editorThemes>({
  key: 'availableThemesState',
  default: editorThemes,
})

export const editorThemeState = atom<EditorTheme>({
  key: 'editorThemeState',
  default: defaultTheme,
})

export const editorFontSizeState = atom<number>({
  key: 'editorFontSizeState',
  default: 14,
})
