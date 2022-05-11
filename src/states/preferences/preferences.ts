import { atom, selector } from 'recoil'
import editorThemes from 'constants/editorThemes'

type Themes = typeof editorThemes
type Mapper = {
  [key in Themes[number]]: string
}
export type EditorTheme = keyof Mapper

export const availableThemesState = atom<typeof editorThemes>({
  key: 'availableThemesState',
  default: editorThemes,
})

const defaultTheme: EditorTheme = 'idea'

export const editorThemeState = atom<EditorTheme>({
  key: 'editorThemeState',
  default: defaultTheme,
})

interface EditorPreferences {
  theme: EditorTheme
  fontSize: number
}

export const editorPreferencesState = atom<EditorPreferences>({
  key: 'editorPreferencesState',
  default: {
    theme: editorThemes[0],
    fontSize: 16,
  },
})

enum FontWeight {
  Lighter = 'lighter',
  Normal = 'normal',
  Bold = 'bold',
  Bolder = 'bolder',
}

interface Font {
  size: number | string
  lineHeight: number | string
  weight: FontWeight | number
}

type Color = string

type TextPreferences = Font & { color: Color }

function createTextPreferences(
  size: number | string,
  lineHeight: number | string = 1.5,
  weight: FontWeight | number = FontWeight.Normal,
  color: Color = '#3f3f3f'
) {
  return { size, lineHeight, weight, color } as TextPreferences
}

interface RendererPreferences {
  fonts?: {
    head1?: TextPreferences
    head2?: TextPreferences
    p?: TextPreferences
    blockquote?: TextPreferences
    achor?: TextPreferences
    strong?: TextPreferences
    inlineCode?: TextPreferences
    image?: {
      width: 'fullwidth' | number
      position: 'left' | 'center' | 'right'
    }
    //Todo, codeblock
  }
}

const defaultRendererTheme: RendererPreferences = {
  fonts: {
    head1: createTextPreferences('140%', 1),
    head2: createTextPreferences('120%', 1.5, FontWeight.Bold),
    p: createTextPreferences('16px', 1.6, FontWeight.Bold),
  },
}

interface RendererSettings {
  theme: RendererPreferences
  config?: RendererPreferences
}

const defaultRenderSettings: RendererSettings = {
  theme: defaultRendererTheme,
}

export const rendererSettingsState = atom<RendererSettings>({
  key: 'rendererSettingsState',
  default: defaultRenderSettings,
})
